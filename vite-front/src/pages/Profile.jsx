// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { message, Card, Avatar, Button } from 'antd';
import Navbar from '../components/Navbar';

const Profile = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('Неавторизован');
      return;
    }

    fetch('http://localhost:3001/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (res) => {
        if (res.status === 401) {
          message.error('Требуется вход');
          onLogout?.();
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then(setProfile)
      .catch(err => console.error('Profile fetch error:', err));
  }, []);

  if (!profile) return <p>Загрузка...</p>;

  return (
    <>
      <Navbar
        user={profile.username}
        onLogout={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/';
        }}
      />

      <Card style={{ maxWidth: 600, margin: '20px auto', textAlign: 'center' }}>
        <Avatar
          size={120}
          src={profile.avatar || 'https://via.placeholder.com/150'}
          style={{ marginBottom: 16 }}
        />
        <h2>{profile.username}</h2>
        <p><strong>Email:</strong> {profile.email || 'Не указано'}</p>
        <p><strong>Описание:</strong> {profile.description || '—'}</p>
        <div style={{ marginTop: 16 }}>
          <Button danger onClick={() => onLogout?.()}>Выйти</Button>
        </div>
      </Card>
    </>
  );
};

export default Profile;
