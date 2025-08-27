// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { message, Card, Avatar, Button, Row, Col, Modal, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", description: "", avatar: "" });
  const navigate = useNavigate();

  // Загружаем профиль
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Неавторизован");
      return;
    }

    fetch("http://localhost:3001/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          message.error("Требуется вход");
          handleLogout();
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setForm(data);
      })
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  // Логаут
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/");
  };

  // Загружаем избранное
  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/favorites`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Ошибка загрузки избранного");
      return res.json();
    } catch (err) {
      console.error("Ошибка loadFavorites:", err);
      return [];
    }
  };

  useEffect(() => {
    if (profile) {
      loadFavorites().then((fav) => {
        setFavorites(fav);
      });
    }
  }, [profile]);

  // Сохранение изменений
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Ошибка обновления");

      const updated = await res.json();
      setProfile(updated);
      message.success("Данные обновлены ✅");
      setEditOpen(false);
    } catch (err) {
      message.error("Ошибка сохранения");
    }
  };

  if (!profile) return <p style={{ textAlign: "center" }}>Загрузка...</p>;

  return (
    <div style={{ background: "#f4f9ff", minHeight: "100vh", paddingBottom: 50 }}>
      <Navbar user={profile.username} onLogout={handleLogout} />

      {/* Карточка профиля */}
      <Card
        style={{
          maxWidth: 700,
          margin: "30px auto",
          textAlign: "center",
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg,#e3f2fd,#ffffff)",
        }}
      >
        <Avatar
          size={120}
          src={profile.avatar || ""}
          style={{
            marginBottom: 16,
            border: "4px solid #1890ff",
          }}
        />
        <h2 style={{ margin: 0, fontWeight: 700 }}>{profile.username}</h2>
        <p style={{ margin: "5px 0", color: "#555" }}>
          <strong>Email:</strong> {profile.email || "Не указано"}
        </p>
        <p style={{ margin: "5px 0", color: "#555" }}>
          <strong>Описание:</strong> {profile.description || "—"}
        </p>
        
        <div style={{ marginTop: 15, display: "flex", justifyContent: "center", gap: 10 }}>
          <Button type="primary" onClick={() => setEditOpen(true)}>
            ✏️ Редактировать
          </Button>
          <Button danger onClick={handleLogout}>
            Выйти из аккаунта
          </Button>
        </div>
      </Card>

      {/* Избранные товары */}
      <Card
        title={<h3 style={{ margin: 0 }}>❤️ Избранное</h3>}
        style={{
          maxWidth: 1000,
          margin: "30px auto",
          borderRadius: 16,
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        {favorites.length > 0 ? (
          <Row gutter={[20, 20]}>
            {favorites.map((f) => (
              <Col key={f.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    textAlign: "center",
                    transition: "transform 0.25s ease",
                  }}
                  bodyStyle={{ padding: "10px 15px" }}
                  cover={
                    <Link to={`/product/${f.id}`}>
                      <img
                        src={f.image || "https://via.placeholder.com/150"}
                        alt={f.name}
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "contain",
                          background: "#fff",
                          padding: 10,
                          transition: "transform 0.3s",
                        }}
                      />
                    </Link>
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <Link
                    to={`/product/${f.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p style={{ margin: "5px 0", fontWeight: "600" }}>{f.name}</p>
                    <p style={{ margin: 0, fontWeight: "bold", color: "#1890ff" }}>
                      {f.price} ₸
                    </p>
                  </Link>
                  <Button
                    danger
                    size="small"
                    style={{ marginTop: 8 }}
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        await fetch(
                          `http://localhost:3001/api/favorites/${f.id}`,
                          {
                            method: "DELETE",
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );
                        setFavorites(favorites.filter((item) => item.id !== f.id));
                      } catch (err) {
                        console.error("Ошибка удаления:", err);
                      }
                    }}
                  >
                    Удалить
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p style={{ textAlign: "center", color: "#888", padding: "20px 0" }}>
            Нет избранных товаров
          </p>
        )}
      </Card>

      {/* Модалка редактирования */}
      <Modal
        title="Редактирование профиля"
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={handleSave}
      >
        <Input
          style={{ marginBottom: 10 }}
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Имя пользователя"
        />
        <Input
          style={{ marginBottom: 10 }}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <Input
          style={{ marginBottom: 10 }}
          value={form.avatar}
          onChange={(e) => setForm({ ...form, avatar: e.target.value })}
          placeholder="Ссылка на аватар"
        />
        <Input.TextArea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Описание"
        />
      </Modal>
    </div>
  );
};

export default Profile;
