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
    <>
      <Navbar user={user} onLogout={onLogout} />

      {/* 🔥 Верхний баннер (статичные фото) */}
      <Row gutter={16} style={{ padding: "0 40px", marginBottom: 30 }}>
        <Col span={16}>
          <Card
            hoverable
            cover={
              <img
                alt="Баннер"
                src="/banners/5867942.jpg"
                style={{ height: 400, objectFit: "cover" }}
              />
            }
          />
        </Col>
        <Col span={8}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Card
                hoverable
                cover={
                  <img
                    alt="Баннер"
                    src="/banners/678.jpg"
                    style={{ height: 190, objectFit: "cover" }}
                  />
                }
              />
            </Col>
            <Col span={24}>
              <Card
                hoverable
                cover={
                  <img
                    alt="Баннер"
                    src="/banners/1111.jpg"
                    style={{ height: 190, objectFit: "cover" }}
                  />
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* 🔥 Категории */}
      <div style={{ padding: "0 40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Категории товаров
        </h2>
        <Row gutter={[16, 16]}>
          {categories.map((cat) => (
            <Col key={cat.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
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
                      cursor: "pointer",
                    }}
                    onClick={() => goToCategory(cat.id)}
                  />
                }
                onClick={() => goToCategory(cat.id)}
              >
                <Meta title={cat.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
