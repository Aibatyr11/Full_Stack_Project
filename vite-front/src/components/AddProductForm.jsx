import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { addProduct, fetchCategories } from '../api';

const AddProductForm = ({ onAdd }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

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

      {/* 🔥 выпадающий список категорий */}
      <Form.Item name="category_id" rules={[{ required: true }]}>
        <Select placeholder="Выберите категорию" style={{ width: 180 }}>
          {categories.map(cat => (
            <Select.Option key={cat.id} value={cat.id}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">Добавить</Button>
    </Form>
  );
};

export default AddProductForm;
