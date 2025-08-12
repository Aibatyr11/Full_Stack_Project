// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const LoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        // data: { token, username }
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.username);
        onLogin(data.username, data.token); // используем хук useAuth.login
        message.success('Успешный вход');
      } else {
        message.error(data.message || 'Ошибка входа');
      }
    } catch (err) {
      message.error('Сервер не отвечает');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item name="username" label="Имя пользователя" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
