const express = require('express');
const router = express.Router();
const db = require('../db');

// список товаров
router.get('/', (req, res) => {
  db.all('SELECT * FROM products ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// товар по id
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Товар не найден' });
    res.json(row);
  });
});

// предложения (магазины) по товару
router.get('/:id/offers', (req, res) => {
  db.all(`
    SELECT sp.id   AS offer_id,
           s.name  AS store_name,
           s.phone,
           s.address,
           sp.price,
           sp.stock,
           sp.url,
           sp.updated_at
    FROM store_products sp
    JOIN stores s ON s.id = sp.store_id
    WHERE sp.product_id = ?
    ORDER BY sp.price ASC
  `, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
