// controllers/productsController.js
const Product = require('../models/Product');

const getAllProducts = (req, res) => {
  Product.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const getProductById = (req, res) => {
  Product.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Товар не найден' });
    res.json(row);
  });
};

const createProduct = (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
};

const deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct
};
