// src/hooks/useAuth.js
import { useState } from 'react';

export const useAuth = () => {
  // храним username и token
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (username, tokenValue) => {
    setUser(username);
    setToken(tokenValue);
    localStorage.setItem('user', username);
    localStorage.setItem('token', tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, token, login, logout };
};
