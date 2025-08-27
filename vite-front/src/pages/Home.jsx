import React, { useEffect, useState } from "react";
import { fetchCategories } from "../api";
import Navbar from "../components/Navbar";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Home = ({ user, onLogout }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const goToCategory = (id) => navigate(`/category/${id}`);

  return (
    <div style={{ background: "#f7faff", minHeight: "100vh" }}>
      <Navbar user={user} onLogout={onLogout} />

      {/* 🔥 Верхний баннер */}
      <Row
        gutter={16}
        style={{
          padding: "20px 40px",
          marginBottom: 30,
        }}
      >
        <Col span={16}>
          <Card
            hoverable
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            }}
            cover={
              <img
                alt="Баннер"
                src="/banners/5867942.jpg"
                style={{
                  height: 400,
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            }
          />
        </Col>
        <Col span={8}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Card
                hoverable
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                cover={
                  <img
                    alt="Баннер"
                    src="/banners/678.jpg"
                    style={{
                      height: 190,
                      objectFit: "cover",
                      borderRadius: 16,
                    }}
                  />
                }
              />
            </Col>
            <Col span={24}>
              <Card
                hoverable
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                cover={
                  <img
                    alt="Баннер"
                    src="/banners/1111.jpg"
                    style={{
                      height: 190,
                      objectFit: "cover",
                      borderRadius: 16,
                    }}
                  />
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 🔥 Категории */}
      <div style={{ padding: "0 40px 40px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontSize: 28,
            fontWeight: 700,
            color: "#333",
            position: "relative",
          }}
        >
          Категории товаров
          <span
            style={{
              display: "block",
              width: 80,
              height: 4,
              background: "#1890ff",
              margin: "10px auto 0",
              borderRadius: 2,
            }}
          />
        </h2>
        <Row gutter={[24, 24]} justify="center">
          {categories.slice(0, 6).map((cat) => (
            <Col key={cat.id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                  height: "100%",
                }}
                cover={
                  <img
                    alt={cat.name}
                    src={
                      cat.image ||
                      "https://via.placeholder.com/240x160?text=No+Image"
                    }
                    style={{
                      height: 200,
                      objectFit: "contain",
                      background: "#fff",
                      padding: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => goToCategory(cat.id)}
                  />
                }
                onClick={() => goToCategory(cat.id)}
                bodyStyle={{ padding: "15px" }}
              >
                <Meta
                  title={cat.name}
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
