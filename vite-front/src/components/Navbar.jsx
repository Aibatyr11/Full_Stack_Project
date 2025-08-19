import React, { useState } from 'react';
import { Menu, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import AddProductForm from './AddProductForm';

const Navbar = ({ user, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">Главная</Link>
        </Menu.Item>
        
        <Menu.Item key="profile">
          <Link to="/profile">Профиль</Link>
        </Menu.Item>

        
        <Menu.Item key="addProduct">
            <Button type="primary" onClick={openModal}>
              Добавить товар
            </Button>
        </Menu.Item>
        

        <Menu.Item key="cart">
          <Link to="/cart">Корзина</Link>
        </Menu.Item>

        <Menu.Item key="logout" onClick={onLogout} style={{ marginLeft: 'auto' }}>
          Выйти
        </Menu.Item>
      </Menu>

      {/* 🔥 Модальное окно для добавления товара */}
      <Modal
        title="Добавить новый товар"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <AddProductForm onAdd={closeModal} />
      </Modal>
    </>
  );
};

export default Navbar;
