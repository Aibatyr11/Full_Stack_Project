import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import ProductGrid from '../components/ProductGrid';
import AddProductForm from '../components/AddProductForm';
import Navbar from '../components/Navbar';

const Home = ({ user, onLogout }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    fetchProducts().then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Добавлено в корзину:', product);
    // тут будет корзина
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
