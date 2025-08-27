// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, InputNumber, message, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { fetchCart, updateCartItem, removeCartItem } from "../api";

// Приведение цены к числу
const parsePrice = (p) => {
  if (!p) return 0;
  return Number(String(p).replace(/[^\d.-]/g, "")) || 0;
};

const Cart = ({ onLogout }) => {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      if (!Array.isArray(data)) {
        console.error("Некорректный ответ сервера:", data);
        throw new Error("Некорректный ответ");
      }
      setCart(data);
    } catch (err) {
      setCart([]);
      message.error("Ошибка загрузки корзины");
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (cartId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeCartItem(cartId);
        message.info("Товар удалён");
      } else {
        await updateCartItem(cartId, quantity);
      }
      loadCart();
    } catch {
      message.error("Не удалось изменить количество");
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await removeCartItem(cartId);
      message.info("Товар удалён из корзины");
      loadCart();
    } catch {
      message.error("Ошибка удаления товара");
    }
  };

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((sum, item) => {
        const price = parsePrice(item.price);
        const qty = Number(item.quantity) || 0;
        return sum + price * qty;
      }, 0)
    : 0;

  const columns = [
    {
      title: "Название",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Магазин",
      dataIndex: "store_name",
      key: "store_name",
      render: (text) => <span style={{ color: "#888" }}>{text}</span>,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (p) => (
        <span style={{ fontWeight: "bold", color: "#1890ff" }}>
          {parsePrice(p)} ₸
        </span>
      ),
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
      render: (q, record) => (
        <InputNumber
          min={1}
          value={Number(q)}
          onChange={(v) => handleQuantityChange(record.cart_id, v)}
        />
      ),
    },
    {
      title: "Сумма",
      key: "sum",
      render: (_, r) => (
        <span style={{ fontWeight: "bold" }}>
          {parsePrice(r.price) * Number(r.quantity)} ₸
        </span>
      ),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, r) => (
        <Button danger type="primary" onClick={() => handleRemove(r.cart_id)}>
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <div style={{ background: "#f7faff", minHeight: "100vh", paddingBottom: 40 }}>
      <Navbar onLogout={onLogout} />

      {/* Заголовок */}
      <div
        style={{
          background: "linear-gradient(135deg, #a8d0f6ff, #40a9ff)",
          padding: "30px 20px",
          textAlign: "center",
          color: "white",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: 30,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <ShoppingCartOutlined style={{ fontSize: 36, marginBottom: 10 }} />
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Моя корзина</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Проверьте товары перед заказом</p>
      </div>

      {/* Таблица */}
      <Card
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          padding: 20,
        }}
      >
        <Table
          rowKey="cart_id"
          dataSource={Array.isArray(cart) ? cart : []}
          columns={columns}
          pagination={false}
          bordered={false}
          footer={() => (
            <div
              style={{
                textAlign: "right",
                fontSize: 18,
                fontWeight: "bold",
                padding: "10px 0",
                borderTop: "2px solid #f0f0f0",
              }}
            >
              Итого:{" "}
              <span style={{ color: "#1890ff" }}>
                {totalPrice.toLocaleString()} ₸
              </span>
            </div>
          )}
        />
      </Card>
    </div>
  );
};

export default Cart;
