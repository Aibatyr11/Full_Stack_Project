import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Input, InputNumber, message, Space } from 'antd';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();

  const fetchProducts = () => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => message.error('Ошибка при загрузке товаров'));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFinish = (values) => {
    fetch('http://localhost:3001/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then(() => {
        message.success('Товар добавлен');
        form.resetFields();
        fetchProducts();
      })
      .catch(() => message.error('Ошибка при добавлении товара'));
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:3001/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        message.success('Товар удалён');
        fetchProducts();
      })
      .catch(() => message.error('Ошибка при удалении товара'));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
    },
    {
      title: 'Изображение',
      dataIndex: 'image',
      render: (url) => <img src={url} alt="img" width={60} />,
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => deleteProduct(record.id)}>
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Товары</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 5 }}
      />

      <h3 style={{ marginTop: 30 }}>Добавить новый товар</h3>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Название" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Цена" name="price" rules={[{ required: true }]}>
          <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Ссылка на изображение" name="image">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Products;
