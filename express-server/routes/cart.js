const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

// получить корзину текущего пользователя
router.get('/', auth, (req, res) => {
  const userId = req.user.id;

  db.all(`
    SELECT 
      c.id         AS cart_id,
      c.quantity   AS quantity,
      sp.id        AS store_product_id,
      sp.price     AS price,
      p.name       AS product_name,
      s.name       AS store_name
    FROM cart c
    JOIN store_products sp ON c.store_product_id = sp.id
    JOIN products p        ON sp.product_id     = p.id
    JOIN stores s          ON sp.store_id       = s.id
    WHERE c.user_id = ?
    ORDER BY c.id DESC
  `, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// добавить в корзину
router.post('/', auth, (req, res) => {
  const userId = req.user.id;
  const { storeProductId, quantity } = req.body;

  if (!storeProductId || !Number(quantity)) {
    return res.status(400).json({ error: 'storeProductId и quantity обязательны' });
  }

  db.run(`
    INSERT INTO cart (user_id, store_product_id, quantity)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, store_product_id)
    DO UPDATE SET quantity = quantity + excluded.quantity
  `, [userId, storeProductId, Number(quantity)], function (err) {
    if (err) {
      console.error('Ошибка при добавлении в корзину:', err.message);
      return res.status(500).json({ error: err.message });
    }

    // возвращаем cart_id
    db.get(`SELECT id as cart_id FROM cart WHERE user_id=? AND store_product_id=?`, 
      [userId, storeProductId], 
      (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, cart_id: row.cart_id });
      }
    );
  });
});


// изменить количество
router.put('/:cartId', auth, (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.params;
  const { quantity } = req.body;

  if (!Number(quantity)) {
    return res.status(400).json({ error: 'quantity обязателен и должен быть числом' });
  }

  if (Number(quantity) <= 0) {
    db.run(`DELETE FROM cart WHERE id = ? AND user_id = ?`, [cartId, userId], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ success: true, removed: true });
    });
  } else {
    db.run(`
      UPDATE cart SET quantity = ? 
      WHERE id = ? AND user_id = ?
    `, [Number(quantity), cartId, userId], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  }
});

// удалить из корзины
router.delete('/:cartId', auth, (req, res) => {
  const userId = req.user.id;
  const { cartId } = req.params;

  db.run(`DELETE FROM cart WHERE id = ? AND user_id = ?`, [cartId, userId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
