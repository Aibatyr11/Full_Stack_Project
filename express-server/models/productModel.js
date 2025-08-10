const db = require('../db');

const Product = {
  getAll: (callback) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      callback(err, rows);
    });
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  },

  create: (data, callback) => {
    const { name, price, image } = data;
    db.run(
      'INSERT INTO products (name, price, image) VALUES (?, ?, ?)',
      [name, price, image],
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
