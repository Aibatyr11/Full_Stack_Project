import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import ProductGrid from '../components/ProductGrid';
import AddProductForm from '../components/AddProductForm';
import Navbar from '../components/Navbar';
import { message } from 'antd';

const Home = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    fetchProducts().then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    message.success(`${product.name} добавлен в корзину`);
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <h2>Товары</h2>
      <ProductGrid products={products} onAddToCart={handleAddToCart} />

      {user === 'admin' && (
        <>
          <h3 style={{ marginTop: 24 }}>Добавить новый товар</h3>
          <AddProductForm onAdd={loadProducts} />
        </>
      )}
    </>
  );
};

export default Home;
