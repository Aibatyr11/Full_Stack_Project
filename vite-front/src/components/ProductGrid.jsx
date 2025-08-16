import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={
              <Link to={`/product/${product.id}`}>
                <img
                  alt={product.name}
                  src={product.image || 'https://via.placeholder.com/240x160?text=No+Image'}
                  style={{
                    height: 160,
                    width: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#fff',
                    transition: 'transform 0.3s ease'
                  }}
                  className="product-image"
                />
              </Link>
            }
            actions={[
              <Button type="primary" onClick={() => onAddToCart(product)}>
                Добавить в корзину
              </Button>,
            ]}
          >
            <Meta
              title={<Link to={`/product/${product.id}`}>{product.name}</Link>}
              description={`Цена: ${product.price} ₸`}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
