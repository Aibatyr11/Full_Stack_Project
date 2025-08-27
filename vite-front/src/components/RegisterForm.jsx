import React, { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { UserAddOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { register } from '../api';

const { Title } = Typography;

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await register(values);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Ошибка регистрации');

      message.success('Пользователь успешно зарегистрирован! 🚀 Теперь войдите через форму входа.');
    } catch (err) {
      message.error(err.message || 'Ошибка при регистрации');
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
        background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        textAlign: 'center',
      }}
    >
      <Title level={3} style={{ marginBottom: 25 }}>
        ✨ Регистрация
      </Title>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[{ required: true, message: 'Введите имя пользователя' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Имя пользователя" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Введите пароль" size="large" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<UserAddOutlined />}
            size="large"
            loading={loading}
            block
            style={{
              borderRadius: 12,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg,#52c41a,#13c2c2)',
            }}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
