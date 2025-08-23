// src/pages/ProductPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, message, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { fetchProductById, fetchProductOffers, addToCart } from "../api";
import "./ProductPage.css";

const ProductPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Ant Design v5 — нужно через useNotification()
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const prod = await fetchProductById(id);
        const offers = await fetchProductOffers(id);
        setProduct({ ...prod, offers });
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
        message.error("Не удалось загрузить товар");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async (offer) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Нужно войти в аккаунт");
      return;
    }
    try {
      await addToCart(offer.offer_id, 1);

      // ✅ красивое уведомление
      api.success({
        message: "Товар добавлен в корзину 🛒",
        description: `${product.name} (${offer.store_name}) успешно добавлен.`,
        placement: "bottomRight",
        icon: <ShoppingCartOutlined style={{ color: "#52c41a" }} />,
        duration: 3.5,
        btn: (
          <Link to="/cart">
            <Button type="primary" size="small">
              Перейти в корзину
            </Button>
          </Link>
        ),
      });
    } catch (err) {
      console.error("Ошибка добавления в корзину:", err);
      message.error("Ошибка при добавлении в корзину");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar user={user} onLogout={onLogout} />
        <p className="not-found">Загрузка...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar user={user} onLogout={onLogout} />
        <p className="not-found">Товар не найден</p>
      </div>
    );
  }

  return (
    <div>
      {/* нужно вставить contextHolder */}
      {contextHolder}
      <Navbar user={user} onLogout={onLogout} />
      <div className="page-wrapper">
        <div className="product-card">
          {/* фото + инфо */}
          <div className="product-header">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="info">
              <h1>{product.name}</h1>
              <p className="price">{product.price} ₸</p>
            </div>
          </div>

          {/* описание */}
          <div className="product-description">
            <h3>Описание</h3>
            <p>{product.description || "Описание скоро появится..."}</p>
          </div>

          {/* видео */}
          {product.youtube_link && (
            <div>
              <h3>Видеообзор</h3>
              <div className="video-wrapper">
                <iframe
                  src={product.youtube_link.replace("watch?v=", "embed/")}
                  title="Видеообзор"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* таблица офферов */}
          <h3 style={{ marginTop: "30px" }}>Цены в магазинах</h3>
          <div className="offers">
            <table>
              <thead>
                <tr>
                  <th>Магазин</th>
                  <th>Цена</th>
                  <th>Наличие</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {product.offers?.map((o) => (
                  <tr key={o.offer_id}>
                    <td>
                      <strong>{o.store_name}</strong>
                      {(o.address || o.phone) && (
                        <div className="offer-meta">
                          {o.address || ""} {o.phone ? ` · ${o.phone}` : ""}
                        </div>
                      )}
                    </td>
                    <td>{o.price} ₸</td>
                    <td>{o.stock > 0 ? "в наличии" : "нет"}</td>
                    <td>
                      {o.stock > 0 && (
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleAddToCart(o)}
                        >
                          В корзину 🛒
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* кнопка назад */}
          <Link to="/" style={{ display: "inline-block", marginTop: 20 }}>
            ← Назад
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
