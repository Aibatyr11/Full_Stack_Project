import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Button, message } from "antd";

import { fetchProducts, fetchCategories, addFavorite, addToCart } from "../api";
import Navbar from "../components/Navbar";
import "../components/ProductGrid.css"; // стили карточек

const CategoryPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  // фильтр и сортировка
  const [brandInput, setBrandInput] = useState(""); // текст в поле ввода
  const [brand, setBrand] = useState(""); // применённый фильтр
  const [sort, setSort] = useState("cheap"); // теперь "сначала дешёвые" по умолчанию

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCategories().then((cats) => {
      const found = cats.find((c) => c.id === parseInt(id));
      setCategory(found);
    });
  }, [id]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Нужно войти в аккаунт");
      return;
    }
    try {
      await addToCart(product.id);
      message.success(`${product.name} добавлен в корзину`);
    } catch {
      message.error("Ошибка при добавлении в корзину");
    }
  };

  const handleAddToFavorites = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Нужно войти в аккаунт");
      return;
    }
    try {
      await addFavorite(product.id);
      message.success(`${product.name} добавлен в избранное`);
    } catch (e) {
      message.error(e.message);
    }
  };

  // фильтрация по категории
  let catProducts = products.filter((p) => p.category_id === parseInt(id));

  // фильтрация по бренду
  if (brand.trim() !== "") {
    catProducts = catProducts.filter((p) =>
      p.name.toLowerCase().includes(brand.toLowerCase())
    );
  }

  // сортировка
  catProducts = [...catProducts];
  if (sort === "expensive") {
    catProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sort === "cheap") {
    catProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: "30px 50px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: 26 }}>
          {category ? category.name : "Категория"}
        </h2>

        {/* Панель фильтров */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            background: "#f9f9f9",
            padding: "15px 20px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          {/* Фильтр по бренду */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label>Бренд:</label>
            <input
              type="text"
              placeholder="Например: Samsung"
              value={brandInput}
              onChange={(e) => setBrandInput(e.target.value)}
              style={{
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
            <Button
              type="primary"
              onClick={() => setBrand(brandInput)}
              style={{ padding: "0 15px" }}
            >
              Фильтровать
            </Button>
          </div>

          {/* Сортировка */}
          <div>
            <label style={{ marginRight: 10 }}>Сортировать:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            >
              <option value="default">По умолчанию</option>
              <option value="cheap">Сначала дешёвые</option>
              <option value="expensive">Сначала дорогие</option>
            </select>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {catProducts.length > 0 ? (
            catProducts.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <div className="product-card">
                  <Link to={`/product/${product.id}`}>
                    <div className="product-image-container">
                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/240x160?text=No+Image"
                        }
                        alt={product.name}
                        className="product-image"
                      />
                    </div>
                  </Link>

                  <div className="product-info">
                    <h3 className="product-title">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="product-price">{product.price} ₸</p>
                  </div>

                  <Button block onClick={() => handleAddToFavorites(product)}>
                    ❤️ В избранное
                  </Button>

                  <Button
                    block
                    type="primary"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    В корзину
                  </Button>
                </div>
              </Col>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%", color: "#888" }}>
              Нет товаров в этой категории
            </p>
          )}
        </Row>
      </div>
    </>
  );
};

export default CategoryPage;
