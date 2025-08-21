// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { message, Card, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);

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
          onLogout?.();
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        console.log("📌 PROFILE FROM /me:", data);
        setProfile(data);
      })
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  // Локальная функция загрузки избранного
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

  // Загружаем избранное, когда профиль есть
  useEffect(() => {
    if (profile) {
      loadFavorites().then((fav) => {
        console.log("📌 FAVORITES RESPONSE:", fav);
        setFavorites(fav);
      });
    }
  }, [profile]);

  if (!profile) return <p>Загрузка...</p>;

  return (
    <>
      <Navbar
        user={profile.username}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
      />

      {/* Карточка профиля */}
      <Card style={{ maxWidth: 600, margin: "20px auto", textAlign: "center" }}>
        <Avatar
          size={120}
          src={profile.avatar || ""}
          style={{ marginBottom: 16 }}
        />
        <h2>{profile.username}</h2>
        <p>
          <strong>Email:</strong> {profile.email || "Не указано"}
        </p>
        <p>
          <strong>Описание:</strong> {profile.description || "—"}
        </p>
        <p>
          <strong>ID пользователя:</strong> {profile.id}
        </p>
      </Card>

      {/* Избранные товары */}
      <Card title="Избранное" style={{ maxWidth: 800, margin: "20px auto" }}>
        {favorites.length > 0 ? (
          favorites.map((f) => (
            <div
              key={f.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Link to={`/product/${f.id}`}>
                <img
                  src={f.image || "https://via.placeholder.com/80"}
                  alt={f.name}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    marginRight: 15,
                    cursor: "pointer",
                  }}
                />
              </Link>

              <div style={{ flex: 1 }}>
                <Link
                  to={`/product/${f.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p style={{ margin: 0, fontWeight: "500" }}>{f.name}</p>
                </Link>
                <p style={{ margin: 0, fontWeight: "bold" }}>{f.price} ₸</p>
              </div>

              <Button
                danger
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    await fetch(`http://localhost:3001/api/favorites/${f.id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setFavorites(favorites.filter((item) => item.id !== f.id));
                  } catch (err) {
                    console.error("Ошибка удаления:", err);
                  }
                }}
              >
                Удалить
              </Button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            Нет избранных товаров
          </p>
        )}
      </Card>
    </>
  );
};

export default Profile;
