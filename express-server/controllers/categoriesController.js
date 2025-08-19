const Category = require('../models/Category');

exports.getAllCategories = (req, res) => {
  Category.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createCategory = (req, res) => {
  Category.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(result);
  });
};
