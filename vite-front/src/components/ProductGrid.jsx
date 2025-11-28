import React from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import './ProductGrid.css'; // отдельные стили

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Row gutter={[24, 24]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <div className="product-card">
            {/* Фото */}
            <Link to={`/product/${product.id}`}>
              <div className="product-image-container">
                <img
                  src={product.image || 'https://via.placeholder.com/240x160?text=No+Image'}
                  alt={product.name}
                  className="product-image"
                />
              </div>
            </Link>

            {/* Текст */}
            <div className="product-info">
              <h3 className="product-title">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
              <p className="product-price">{product.price} ₸</p>
            </div>

            {/* Кнопка */}
            <Button
              block
              type="primary"
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
            >
              В корзину
            </Button>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;
