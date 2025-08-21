const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

// получить все избранные товары пользователя
router.get("/", authMiddleware, (req, res) => {
  const userId = req.user.id; // 👈 берём id из токена

  const sql = `
    SELECT p.id, p.name, p.price, p.image
    FROM favorites f
    JOIN products p ON p.id = f.product_id
    WHERE f.user_id = ?
  `;
  db.all(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// добавить в избранное
router.post("/", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) return res.status(400).json({ error: "productId обязателен" });

  const sql = "INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)";
  db.run(sql, [userId, productId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// удалить из избранного
router.delete("/:productId", authMiddleware, (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;

  const sql = "DELETE FROM favorites WHERE user_id = ? AND product_id = ?";
  db.run(sql, [userId, productId], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
