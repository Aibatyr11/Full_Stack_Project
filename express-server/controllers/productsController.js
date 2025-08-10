const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(products);
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.getById(id, (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ message: 'Продукт не найден' });
    res.json(product);
  });
};

exports.createProduct = (req, res) => {
  const data = req.body;
  Product.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Продукт создан', id: result.id });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Продукт удалён' });
  });
};
