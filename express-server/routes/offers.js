// express-server/routes/offers.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

/**
 * Получить предложения по товару
 * GET /api/products/:productId/offers
 */
router.get('/products/:productId/offers', (req, res) => {
  const productId = req.params.productId;

  const sql = `
    SELECT sp.id, sp.price, sp.stock, sp.url, sp.updated_at,
           s.id AS store_id, s.name AS store_name, s.phone, s.address
    FROM store_products sp
    JOIN stores s ON s.id = sp.store_id
    WHERE sp.product_id = ?
    ORDER BY sp.price ASC
  `;
  db.all(sql, [productId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/**
 * Создать/обновить предложение магазина по товару
 * POST /api/offers
 * body: { storeId, productId, price, stock, url }
 * upssert по (store_id, product_id)
 */
router.post('/offers', auth, (req, res) => {
  const { storeId, productId, price, stock = 0, url = null } = req.body;
  if (!storeId || !productId || !price)
    return res.status(400).json({ error: 'storeId, productId, price обязательны' });

  const sql = `
    INSERT INTO store_products (store_id, product_id, price, stock, url)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(store_id, product_id)
    DO UPDATE SET
      price = excluded.price,
      stock = excluded.stock,
      url = excluded.url,
      updated_at = CURRENT_TIMESTAMP
  `;
  db.run(sql, [storeId, productId, price, stock, url], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

/**
 * Удалить предложение
 * DELETE /api/offers/:id
 */
router.delete('/offers/:id', auth, (req, res) => {
  db.run('DELETE FROM store_products WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
