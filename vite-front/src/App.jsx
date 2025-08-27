import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import AddProductPage from './pages/AddProductPage';
import './App.css';

function App() {
  const { user, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home user={user} onLogout={logout} /> : <Auth onLogin={login} />} />
        <Route path="/profile" element={<Profile onLogout={logout} />} />
        <Route path="/cart" element={<Cart onLogout={logout} />} />
        <Route path="/category/:id" element={<CategoryPage user={user} onLogout={logout} />} />
        <Route path="/product/:id" element={<ProductPage user={user} onLogout={logout} />} />
        <Route path="/search" element={<SearchPage user={user} onLogout={logout} />} />

        <Route path="/add-product" element={<AddProductPage user={user} onLogout={logout} />} />
      </Routes>
    </Router>
  );
}

export default App;
