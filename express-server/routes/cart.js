const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// Получить корзину пользователя
router.get("/", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT p.id, p.name, p.price, p.image, c.quantity
    FROM cart c
    JOIN products p ON p.id = c.product_id
    WHERE c.user_id = ?
  `;
  db.all(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Добавить товар в корзину (или увеличить количество)
router.post("/", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  if (!productId) return res.status(400).json({ error: "productId обязателен" });

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, product_id)
    DO UPDATE SET quantity = quantity + excluded.quantity
  `;
  db.run(sql, [userId, productId, quantity], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Изменить количество
router.put("/:productId", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { quantity } = req.body;
  const productId = req.params.productId;

  if (quantity <= 0) {
    db.run("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ success: true });
    });
  } else {
    db.run("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?", [quantity, userId, productId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  }
});

// Удалить товар
router.delete("/:productId", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  db.run("DELETE FROM cart WHERE user_id = ? AND product_id = ?", [userId, productId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
