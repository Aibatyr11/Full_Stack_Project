import React, { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';

const { Title } = Typography;

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.username);
        onLogin(data.username, data.token);
        message.success('Добро пожаловать 👋');
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
    <div
      style={{
        maxWidth: 420,
        margin: '60px auto',
        padding: '40px 30px',
        borderRadius: 16,
        background: 'linear-gradient(145deg, #f0f0f0, #fafafa)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        textAlign: 'center',
      }}
    >
      <Title level={3} style={{ marginBottom: 25 }}>
        🔐 Вход в аккаунт
      </Title>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Введите логин"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Введите пароль"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            size="large"
            loading={loading}
            block
            style={{
              borderRadius: 12,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg,#1890ff,#722ed1)',
            }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
