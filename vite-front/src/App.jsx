// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';

import './App.css';

function App() {
  const { user, token, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home user={user} onLogout={logout} /> : <Auth onLogin={login} />} />
        <Route path="/profile" element={<Profile onLogout={logout} />} />
        <Route path="/cart" element={<Cart onLogout={logout} />} />
      </Routes>
    </Router>
  );
}

export default App;
