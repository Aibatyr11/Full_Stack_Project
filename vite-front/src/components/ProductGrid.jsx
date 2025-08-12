import React from 'react';
import { Card, Row, Col, Button } from 'antd';

const { Meta } = Card;

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={
              <img
                alt={product.name}
                src={product.image || 'https://via.placeholder.com/240x160?text=No+Image'}
                style={{
                  height: 160,
                  width: '100%',
                  objectFit: 'contain',
                  backgroundColor: '#fff',
                  transition: 'transform 0.8s ease' // анимация картинки
                }}
                className="product-image"
              />


            }
            actions={[
              <Button type="primary" onClick={() => onAddToCart(product)}>
                Добавить в корзину
              </Button>,
            ]}
          >
            <Meta title={product.name} description={`Цена: ${product.price} ₸`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
