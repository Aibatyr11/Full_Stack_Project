import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';
import Navbar from '../components/Navbar';
import { Card, Spin, message } from 'antd';

const ProductPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(id)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        message.error('Ошибка загрузки товара');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spin style={{ display: 'block', margin: '50px auto' }} />;

  if (!product) return <p style={{ textAlign: 'center' }}>Товар не найден</p>;

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ maxWidth: 600, margin: '20px auto' }}>
        <Card
          cover={<img alt={product.name} src={product.image} style={{ objectFit: 'cover', maxHeight: 400 }} />}
        >
          <h2>{product.name}</h2>
          <p><b>Цена:</b> {product.price} ₸</p>
          <p><b>Категория:</b> {product.category_id}</p>
          <p><b>ID:</b> {product.id}</p>
        </Card>
      </div>
    </>
  );
};

export default ProductPage;
