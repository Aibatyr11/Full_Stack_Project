import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api';
import ProductGrid from '../components/ProductGrid';
import Navbar from '../components/Navbar';
import { message } from 'antd';

const CategoryPage = ({ user, onLogout }) => {
  const { id } = useParams(); // category_id из URL
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCategories().then(cats => {
      const found = cats.find(c => c.id === parseInt(id));
      setCategory(found);
    });
  }, [id]);

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

  // фильтруем товары по category_id
  const catProducts = products.filter(p => p.category_id === parseInt(id));

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
        {category ? category.name : 'Категория'}
      </h2>

      {catProducts.length > 0 ? (
        <ProductGrid products={catProducts} onAddToCart={handleAddToCart} />
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>Нет товаров в этой категории</p>
      )}
    </>
  );
};

export default CategoryPage;
