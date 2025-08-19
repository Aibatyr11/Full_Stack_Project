import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../api";
import Navbar from "../components/Navbar";
import { Row, Col, Button, message } from "antd";
import "../components/ProductGrid.css"; // стили карточек

const CategoryPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCategories().then((cats) => {
      const found = cats.find((c) => c.id === parseInt(id));
      setCategory(found);
    });
  }, [id]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    message.success(`${product.name} добавлен в корзину`);
  };

  const catProducts = products.filter((p) => p.category_id === parseInt(id));

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: "30px 50px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: 26 }}>
          {category ? category.name : "Категория"}
        </h2>

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
