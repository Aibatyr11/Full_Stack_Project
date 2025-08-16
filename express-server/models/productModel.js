const db = require('../db');

const Product = {
  // Получаем все товары с названием категории
  getAll: (callback) => {
    db.all(`
      SELECT p.id, p.name, p.price, p.image, p.category_id, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `, [], (err, rows) => {
      callback(err, rows);
    });
  },

  // Получаем товар по ID с категорией
  getById: (id, callback) => {
    db.get(`
      SELECT p.id, p.name, p.price, p.image, p.category_id, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id], (err, row) => {
      callback(err, row);
    });
  },

  // Создание нового товара
  create: (data, callback) => {
    const { name, price, image, category_id } = data;
    db.run(
      'INSERT INTO products (name, price, image, category_id) VALUES (?, ?, ?, ?)',
      [name, price, image, category_id],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },

  // Удаление товара
  delete: (id, callback) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      callback(err);
    });
  }
};

module.exports = Product;
