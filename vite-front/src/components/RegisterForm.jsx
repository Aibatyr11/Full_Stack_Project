import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { register } from '../api';

const RegisterForm = () => {
  const onFinish = (values) => {
    register(values)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка регистрации');
        alert('Пользователь зарегистрирован');
      })
      .catch(() => alert('Ошибка при регистрации'));
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Имя пользователя" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Пароль" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
    </Form>
  );
};

export default RegisterForm;
