const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

// список магазинов
router.get('/', (req, res) => {
  db.all('SELECT * FROM stores ORDER BY name', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// создать магазин
router.post('/', auth, (req, res) => {
  const { name, phone, address } = req.body;
  if (!name) return res.status(400).json({ error: 'name обязателен' });

  db.run(
    'INSERT INTO stores (name, phone, address) VALUES (?, ?, ?)',
    [name, phone || null, address || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, phone, address });
    }
  );
});

module.exports = router;
