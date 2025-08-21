// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, message } from 'antd';
import Navbar from '../components/Navbar';

import { fetchCart, updateCartItem, removeCartItem } from '../api';

// Функция для приведения цены к числу
const parsePrice = (p) => {
  if (!p) return 0;
  return Number(String(p).replace(/[^\d.-]/g, "")) || 0;
};

const Cart = ({ onLogout }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setCart(data);
    } catch {
      message.error("Ошибка загрузки корзины");
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity <= 0) {
      await removeCartItem(id);
      message.info("Товар удалён");
    } else {
      await updateCartItem(id, quantity);
    }
    loadCart();
  };

  const handleRemove = async (id) => {
    await removeCartItem(id);
    message.info('Товар удалён из корзины');
    loadCart();
  };

  // Считаем общую сумму
  const totalPrice = cart.reduce((sum, item) => {
    const price = parsePrice(item.price);
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Цена', dataIndex: 'price', key: 'price', render: (p) => `${parsePrice(p)} ₸` },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (q, record) => (
        <InputNumber
          min={1}
          value={Number(q)}
          onChange={(v) => handleQuantityChange(record.id, v)}
        />
      )
    },
    { title: 'Сумма', key: 'sum', render: (_, r) => `${parsePrice(r.price) * Number(r.quantity)} ₸` },
    { title: 'Действие', key: 'action', render: (_, r) => <Button danger onClick={() => handleRemove(r.id)}>Удалить</Button> }
  ];

  return (
    <>
      <Navbar onLogout={onLogout} />
      <h2>Корзина</h2>
      <Table
        rowKey="id"
        dataSource={cart}
        columns={columns}
        pagination={false}
        footer={() => <strong>Итого: {totalPrice} ₸</strong>}
      />
    </>
  );
};

export default Cart;
