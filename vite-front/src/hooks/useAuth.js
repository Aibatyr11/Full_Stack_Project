import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(localStorage.getItem('user') || '');

  const login = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setUser('');
    localStorage.removeItem('user');
  };

  return { user, login, logout };
};
