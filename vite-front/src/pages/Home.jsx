import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../api';
import Navbar from '../components/Navbar';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Home = ({ user, onLogout }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const goToCategory = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Категории товаров</h2>

      <Row gutter={[16, 16]} justify="center">
        {categories.map(cat => (
          <Col key={cat.id} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={
                <img
                  alt={cat.name}
                  src={cat.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                  style={{ height: 200, objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => goToCategory(cat.id)}
                />
              }
            >
              <Meta title={cat.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
