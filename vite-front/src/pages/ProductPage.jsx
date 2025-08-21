import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api";
import Navbar from "../components/Navbar";

const ProductPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const products = await fetchProducts();
      const found = products.find((p) => String(p.id) === String(id));
      setProduct(found || null);
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div>
        <Navbar user={user} onLogout={onLogout} />
        <p style={{ padding: 20, textAlign: "center", fontSize: "18px" }}>
          Товар не найден
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Navbar user={user} onLogout={onLogout} />

      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          overflow: "hidden",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
            marginBottom: "30px",
          }}
        >
          {/* Фото товара */}
          <div
            style={{
              flex: "1 1 40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "inset 0 0 15px rgba(0,0,0,0.05)",
              background: "#fff",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "208px", // уменьшено на 20%
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Информация о товаре */}
          <div style={{ flex: "1 1 55%" }}>
            <h1
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                fontWeight: "600",
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#4A4A4A",
              }}
            >
              {product.price} ₸
            </p>

            <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>Описание</h3>
            <p style={{ lineHeight: "1.6", color: "#555" }}>
              {product.description || "Описание скоро появится..."}
            </p>
          </div>
        </div>

        {/* Видеообзор */}
        {product.youtube_link && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              Видеообзор
            </h3>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                width: "80%",
                paddingBottom: "45%", // чтобы видео было пропорционально
                height: 0,
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "transparent", // убран белый фон
              }}
            >
              <iframe
                src={product.youtube_link.replace("watch?v=", "embed/")}
                title="Видеообзор"
                frameBorder="0"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
