import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { register } from '../api';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    register(values)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка регистрации');
        message.success('Пользователь зарегистрирован');
      })
      .catch(() => message.error('Ошибка при регистрации'))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '0 auto',
      padding: '20px',
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
