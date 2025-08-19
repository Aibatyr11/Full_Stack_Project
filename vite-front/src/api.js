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
