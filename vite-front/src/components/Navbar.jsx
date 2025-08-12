import React from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { label: 'Товары', key: '/' },
    { label: 'Профиль', key: '/profile' },
    {
      label: (
        <Badge count={cartCount} size="small">
          <ShoppingCartOutlined style={{ fontSize: 18 }} /> Корзина
        </Badge>
      ),
      key: '/cart'
    },
    { label: 'Выйти', key: 'logout' },
  ];

  const handleClick = (e) => {
    if (e.key === 'logout') {
      onLogout();
    } else {
      navigate(e.key);
    }
  };

  return (
    <Menu
      mode="horizontal"
      theme="light"
      onClick={handleClick}
      style={{ marginBottom: 24, borderRadius: 8 }}
      items={menuItems}
    />
  );
};

export default Navbar;
