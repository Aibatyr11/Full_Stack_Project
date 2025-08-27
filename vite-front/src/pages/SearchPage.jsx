import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchProducts } from "../api";
import Navbar from "../components/Navbar";
import { Row, Col, Card } from "antd";

const { Meta } = Card;

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
    <div style={{ background: "#f4f9ff", minHeight: "100vh" }}>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: 30 }}>
        <h2
          style={{
            marginBottom: 30,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "#1890ff",
          }}
        >
          Результаты поиска: <span style={{ color: "#333" }}>{query}</span>
        </h2>

        {results.length === 0 ? (
          <p
            style={{
              fontSize: 18,
              color: "#888",
              textAlign: "center",
              marginTop: 50,
            }}
          >
            Ничего не найдено 😔
          </p>
        ) : (
          <Row gutter={[24, 24]} justify="center">
            {results.map((product, index) => {
              const productId =
                product.id || product._id || product.productId || index;

              return (
                <Col key={productId} xs={24} sm={12} md={8} lg={6}>
                  <Link
                    to={`/product/${productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      hoverable
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                        transition: "transform 0.25s ease",
                      }}
                      bodyStyle={{ padding: "16px" }}
                      cover={
                        <div
                          style={{
                            height: 240,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#fff",
                          }}
                        >
                          <img
                            alt={product.title}
                            src={product.image}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain", 
                              transition: "transform 0.4s ease",
                            }}
                            className="product-image"
                          />
                        </div>
                      }
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1)";
                      }}
                    >
                      <Meta
                        title={
                          <span style={{ fontWeight: 600, color: "#333" }}>
                            {product.title}
                          </span>
                        }
                        description={
                          <span
                            style={{
                              fontWeight: 700,
                              color: "#1890ff",
                              fontSize: 16,
                            }}
                          >
                            {product.price} ₸
                          </span>
                        }
                      />
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
