const db = require('../db');

const Product = {
  getAll: (callback) => {
    db.all(
      `SELECT products.id, products.name, products.price, products.image, products.category_id, categories.name AS category_name
       FROM products
       LEFT JOIN categories ON products.category_id = categories.id`,
      [],
      (err, rows) => {
        callback(err, rows);
      }
    );
  },

  getById: (id, callback) => {
    db.get(
      `SELECT products.id, products.name, products.price, products.image, products.category_id, categories.name AS category_name
       FROM products
       LEFT JOIN categories ON products.category_id = categories.id
       WHERE products.id = ?`,
      [id],
      (err, row) => {
        callback(err, row);
      }
    );
  },

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

  delete: (id, callback) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      callback(err);
    });
  }
};

module.exports = Product;
