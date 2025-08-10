import React, { useState, useEffect } from 'react';

import { Form, Input, InputNumber, Button } from 'antd';
import { addProduct } from '../api';

const AddProductForm = ({ onAdd }) => {
  const onFinish = (values) => {
    addProduct(values)
      .then(() => {
        onAdd();
      })
      .catch(() => alert('Ошибка добавления'));
  };

  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Название" />
      </Form.Item>
      <Form.Item name="price" rules={[{ required: true }]}>
        <InputNumber placeholder="Цена" />
      </Form.Item>
      <Form.Item name="image" rules={[{ required: true }]}>
        <Input placeholder="URL изображения" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Добавить</Button>
    </Form>
  );
};

export default AddProductForm;
