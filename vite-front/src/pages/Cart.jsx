import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, message } from 'antd';
import Navbar from '../components/Navbar';

const Cart = ({ onLogout }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      handleRemove(id);
      return;
    }
    const newCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    updateCart(newCart);
  };

  const handleRemove = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
    message.info('Товар удалён из корзины');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price} ₸`
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      )
    },
    {
      title: 'Сумма',
      key: 'sum',
      render: (_, record) => `${record.price * record.quantity} ₸`
    },
    {
      title: 'Действие',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => handleRemove(record.id)}>
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
