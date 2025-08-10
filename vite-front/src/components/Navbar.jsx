import React from 'react';
import { Menu } from 'antd';

const Navbar = ({ onLogout }) => {
  const menuItems = [
    { label: 'Товары', key: 'products' },
    { label: 'Корзина', key: 'cart' },
    { label: 'Профиль', key: 'profile' },
    { label: 'Вход / Регистрация', key: 'auth' },
    { label: 'Создать товар', key: 'create' },
    { label: 'Выйти', key: 'logout' },
  ];

  const handleClick = (e) => {
    if (e.key === 'logout') {
      onLogout();
    } else {
      console.log('Навигация:', e.key);
      // Пока просто лог, позже можно сделать setPage или React Router
    }
  };

  return (
    <Menu
      mode="horizontal"
      theme="light"
      onClick={handleClick}
      items={menuItems}
    />
  );
};

export default Navbar;
