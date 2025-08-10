import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { login } from '../api';

const LoginForm = ({ onLogin }) => {
  const onFinish = (values) => {
    login(values)
      .then(res => {
        if (!res.ok) throw new Error('Неверные данные');
        return res.json();
      })
      .then(data => {
        onLogin(values.username);
      })
      .catch(() => alert('Ошибка входа'));
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Имя пользователя" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Пароль" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Войти</Button>
    </Form>
  );
};

export default LoginForm;
