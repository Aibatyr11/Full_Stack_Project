const db = require('../db');

const Category = {
  getAll: (callback) => {
    db.all('SELECT * FROM categories', [], (err, rows) => {
      callback(err, rows);
    });
  },

  create: (data, callback) => {
    const { name, image } = data;
    db.run(
      'INSERT INTO categories (name, image) VALUES (?, ?)',
      [name, image],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  }
};

module.exports = Category;
