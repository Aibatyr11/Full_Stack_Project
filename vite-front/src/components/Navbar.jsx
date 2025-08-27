import React, { useEffect, useState } from "react";
import { Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { fetchCategories } from "../api";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div style={{ borderBottom: "1px solid #e5e5e5", marginBottom: 20, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
      {/* Верхняя линия */}
      <div
        style={{
          background: "#f5f7fa",
          padding: "6px 40px",
          fontSize: 13,
          display: "flex",
          justifyContent: "space-between",
          color: "#666",
        }}
      >
        <span>+7 777 777 77 77 · Доставка и оплата · Пункты выдачи</span>
      </div>

      {/* Нижняя линия */}
      <Row
        align="middle"
        style={{
          padding: "15px 40px",
          background: "#fff",
        }}
      >
        <Col flex="auto" style={{ textAlign: "center" }}>
          <Input.Search
            placeholder="Поиск товаров..."
            style={{ maxWidth: 400 }}
            allowClear
            onSearch={handleSearch}
          />
        </Col>

        <Col flex="200px" style={{ textAlign: "right" }}>
          <Link to="/profile" style={{ marginRight: 20, color: "#333" }}>
            <UserOutlined style={{ fontSize: 22 }} />
          </Link>
          <Link to="/cart" style={{ color: "#333" }}>
            <ShoppingCartOutlined style={{ fontSize: 22 }} />
          </Link>
        </Col>
      </Row>

      {/* Меню */}
      <div
        style={{
          background: "#1976d2",
          padding: "12px 40px",
          display: "flex",
          gap: 20,
          color: "#fff",
          fontWeight: 500,
          flexWrap: "wrap",
        }}
      >
        <Link to="/" style={{ color: "#fff", transition: "0.3s" }}>Каталог</Link>

        {categories.slice(0, 6).map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            style={{
              color: "#fff",
              transition: "0.3s",
            }}
          >
            {cat.name}
          </Link>
        ))}

        
      </div>
    </div>
  );
};

export default Navbar;
