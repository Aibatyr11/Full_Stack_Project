import React from "react";
import Navbar from "../components/Navbar";
import AddProductForm from "../components/AddProductForm";

const AddProductPage = ({ user, onLogout }) => {
  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <div style={{ padding: "20px" }}>
        <h2>Добавить новый товар</h2>
        <AddProductForm onAdd={() => alert("Товар добавлен!")} />
      </div>
    </div>
  );
};

export default AddProductPage;
