const API_URL = 'http://localhost:3001/api';

export const login = (credentials) =>
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

export const register = (credentials) =>
  fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

export const fetchProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());

export const addProduct = (product) =>
  fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

export const deleteProduct = (id) =>
  fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });


export const fetchCategories = async () => {
  const res = await fetch('http://localhost:3001/api/categories');
  if (!res.ok) throw new Error('Ошибка загрузки категорий');
  return res.json();
};


export const fetchProductById = (id) =>
  fetch(`${API_URL}/products/${id}`).then(res => res.json());




// получить избранные товары
export const fetchFavorites = async () => {
  const token = localStorage.getItem("token"); // токен из localStorage
  const res = await fetch(`${API_URL}/favorites`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 передаем токен
    },
  });
  return res.json();
};

// добавить в избранное
export const addFavorite = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });
  return res.json();
};

// удалить из избранного
export const removeFavorite = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/favorites/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};




export const fetchCart = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return res.json();
};

export const updateCartItem = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
};

export const removeCartItem = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
