import React, { useState, useEffect } from 'react';

import { Table, Button } from 'antd';
import { deleteProduct } from '../api';

const ProductTable = ({ products, onDelete }) => {
  const handleDelete = (id) => {
    deleteProduct(id).then(() => onDelete());
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Цена', dataIndex: 'price', key: 'price' },
    {
      title: 'Изображение',
      dataIndex: 'image',
      render: (src) => <img src={src} alt="img" width="50" />,
    },
    {
      title: 'Действия',
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>Удалить</Button>
      ),
    },
  ];

  return <Table dataSource={products} columns={columns} rowKey="id" />;
};

export default ProductTable;
