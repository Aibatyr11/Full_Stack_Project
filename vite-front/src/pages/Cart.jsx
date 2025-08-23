// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, message } from 'antd';
import Navbar from '../components/Navbar';
import { fetchCart, updateCartItem, removeCartItem } from '../api';

// Приведение цены к числу
const parsePrice = (p) => {
  if (!p) return 0;
  return Number(String(p).replace(/[^\d.-]/g, "")) || 0;
};

const Cart = ({ onLogout }) => {
  const [cart, setCart] = useState([]);

  // Загружаем корзину
  const loadCart = async () => {
    try {
      const data = await fetchCart();
      if (!Array.isArray(data)) {
        console.error("Некорректный ответ сервера:", data);
        throw new Error("Некорректный ответ");
      }
      setCart(data);
    } catch (err) {
      setCart([]); // важно: сбрасываем корзину, чтобы не ломало reduce
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
      message.info('Товар удалён из корзины');
      loadCart();
    } catch {
      message.error("Ошибка удаления товара");
    }
  };

  // Общая сумма
  const totalPrice = Array.isArray(cart)
    ? cart.reduce((sum, item) => {
        const price = parsePrice(item.price);
        const qty = Number(item.quantity) || 0;
        return sum + price * qty;
      }, 0)
    : 0;

  const columns = [
    { title: "Название", dataIndex: "product_name", key: "product_name" },
    { title: "Магазин", dataIndex: "store_name", key: "store_name" },
    { title: "Цена", dataIndex: "price", key: "price", render: (p) => `${parsePrice(p)} ₸` },
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
      )
    },
    {
      title: "Сумма",
      key: "sum",
      render: (_, r) => `${parsePrice(r.price) * Number(r.quantity)} ₸`
    },
    {
      title: "Действие",
      key: "action",
      render: (_, r) => (
        <Button danger onClick={() => handleRemove(r.cart_id)}>
          Удалить
        </Button>
      )
    }
  ];

  return (
    <>
      <Navbar onLogout={onLogout} />
      <h2>Корзина</h2>
      <Table
        rowKey="cart_id"
        dataSource={Array.isArray(cart) ? cart : []}
        columns={columns}
        pagination={false}
        footer={() => <strong>Итого: {totalPrice} ₸</strong>}
      />
    </>
  );
};

export default Cart;
