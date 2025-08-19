import React from "react";
import { Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const Navbar = ({ user, onLogout }) => {
  return (
    <div style={{ borderBottom: "1px solid #eee", marginBottom: 20 }}>
      {/* Верхняя линия */}
      <div
        style={{
          background: "#d2ebf5ff",
          padding: "5px 40px",
          fontSize: 12,
          display: "flex",
          justifyContent: "space-between",
          color: "#555",
        }}
      >
        <span>+7 777 777 77 77 · Доставка и оплата · Пункты выдачи</span>
        <span>Войти | Корзина</span>
      </div>

      {/* Нижняя линия */}
      <Row
        align="middle"
        style={{
          padding: "15px 40px",
          background: "#fff",
        }}
      >
        <Col flex="150px">
          <Link to="/" style={{ fontSize: 20, fontWeight: "bold", color: "#b68257" }}>
            LOFT
          </Link>
        </Col>

        <Col flex="auto" style={{ textAlign: "center" }}>
          <Input.Search
            placeholder="Поиск"
            style={{ maxWidth: 400 }}
          />
        </Col>

        <Col flex="200px" style={{ textAlign: "right" }}>
          <Link to="/profile" style={{ marginRight: 20 }}>
            <UserOutlined style={{ fontSize: 20 }} />
          </Link>
          <Link to="/cart">
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </Link>
        </Col>
      </Row>

      {/* Меню */}
      <div
        style={{
          background: "#b0d7f0ff",
          padding: "10px 40px",
          display: "flex",
          gap: 20,
          color: "#fff",
          fontWeight: 500,
        }}
      >
        <Link to="/" style={{ color: "#fff" }}>Каталог</Link>
        <span>О компании</span>
        <span>Оплата</span>
        <span style={{ marginLeft: "auto" }} onClick={onLogout}>Выйти</span>
      </div>
    </div>
  );
};

export default Navbar;
