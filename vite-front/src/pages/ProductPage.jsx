import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../api';
import Navbar from '../components/Navbar';
import { Rate, Spin } from 'antd';

const ProductPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    fetchProducts().then((products) => {
      const found = products.find((p) => p.id === parseInt(id));
      setProduct(found);
      setMainImage(found?.image || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (!product) return <p style={{ textAlign: 'center' }}>Товар не найден</p>;

  // пока для примера — одна и та же картинка несколько раз
    // Берем массив картинок
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image].filter(Boolean); // если только одно фото


  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: 20 }}>
        <div
          style={{
            display: 'flex',
            gap: 40,
            maxWidth: 1300,
            margin: '0 auto',
            alignItems: 'flex-start',
          }}
        >
          {/* Блок с фото */}
          <div style={{ flex: 1, maxWidth: 500 }}>
            {/* Большое изображение */}
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: 6,
                padding: 10,
                textAlign: 'center',
                marginBottom: 10,
                backgroundColor: '#fff',
              }}
            >
              <img
                src={mainImage || 'https://via.placeholder.com/500x500?text=No+Image'}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: 450, objectFit: 'contain' }}
              />
            </div>

            {/* Превью */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img)}
                  style={{
                    border: mainImage === img ? '2px solid #1890ff' : '1px solid #ddd',
                    borderRadius: 4,
                    padding: 4,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={img}
                    alt={`preview-${index}`}
                    style={{ width: 70, height: 70, objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>

            <p style={{ marginTop: 10, color: '#666', textAlign: 'center' }}>
              Чтобы увеличить, нажмите на картинку
            </p>
          </div>

          {/* Блок с инфо */}
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: 10 }}>{product.name}</h1>
            <Rate disabled defaultValue={4} />
            <p style={{ fontSize: 22, fontWeight: 'bold', marginTop: 15, color: '#1890ff' }}>
              Цена: {product.price} ₸
            </p>

            {/* YouTube (если есть) */}
            {product.youtube_link && (
              <div style={{ margin: '20px 0' }}>
                <iframe
                  width="100%"
                  height="315"
                  src={product.youtube_link}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: 6 }}
                ></iframe>
              </div>
            )}

            {/* Описание */}
            <div style={{ marginTop: 20, lineHeight: 1.6 }}>
              <h3>Описание</h3>
              <p>{product.description  || 'Описание товара отсутствует.'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
