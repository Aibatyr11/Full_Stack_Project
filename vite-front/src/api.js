const API_URL = 'http://localhost:3001/api';
// ===== auth (как было) =====
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

// ===== products =====
export const fetchProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());



// ===== stores =====
export const fetchStores = () =>
  fetch(`${API_URL}/stores`).then(r => r.json());

// ===== favorites (как было) =====
export const fetchFavorites = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/favorites`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

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

// ===== CART =====


export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Ошибка загрузки товара");
  return res.json();
};

export const fetchProductOffers = async (productId) => {
  const res = await fetch(`${API_URL}/products/${productId}/offers`);
  if (!res.ok) throw new Error("Ошибка загрузки предложений");
  return res.json();
};

export const addToCart = async (storeProductId, quantity = 1) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({
      storeProductId: Number(storeProductId),
      quantity: Number(quantity),
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Ошибка добавления в корзину");
  return data;
};

// Корзина
export const fetchCart = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart`, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!res.ok) throw new Error("Ошибка загрузки корзины");
  return res.json();
};


export const updateCartItem = async (cartId, quantity) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  return res.json();
};

export const removeCartItem = async (cartId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/cart/${cartId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};


// прочее (если используешь)
export const addProduct = (product) =>
  fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

export const deleteProduct = (id) =>
  fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Ошибка загрузки категорий');
  return res.json();
};
