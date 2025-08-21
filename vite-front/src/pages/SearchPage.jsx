import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchProducts } from "../api"; // твоя функция получения товаров
import Navbar from "../components/Navbar";
import { Row, Col, Card } from "antd";

const SearchPage = ({ user, onLogout }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const products = await fetchProducts();
      const filtered = products.filter((p) => {
        const text = p.title || p.name || "";
        return text.toLowerCase().includes(query.toLowerCase());
      });

      setResults(filtered);
    };
    loadData();
  }, [query]);

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: 20 }}>
        <h2>Результаты поиска: {query}</h2>
        {results.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          <Row gutter={[16, 16]}>
            {results.map((product, index) => {
              console.log("Товар:", product); // смотри в консоли браузера
              const productId =
                product.id || product._id || product.productId || index;

              return (
                <Col key={productId} xs={24} sm={12} md={8} lg={6}>
                  <Link
                    to={`/product/${productId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={product.title}
                          src={product.image}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                      }
                    >
                      <h3>{product.title}</h3>
                      <p>{product.price} ₸</p>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
