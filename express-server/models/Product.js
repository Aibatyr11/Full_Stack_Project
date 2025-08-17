const db = require('../db');

const Product = {
  // Получение всех товаров
  getAll: (callback) => {
    db.all(
      `SELECT products.id, products.name, products.price, products.image, products.category_id,
              products.description, products.youtube_link,
              categories.name AS category_name
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
    `SELECT products.id, products.name, products.price, products.image, products.category_id,
            products.description, products.youtube_link,
            categories.name AS category_name
     FROM products
     LEFT JOIN categories ON products.category_id = categories.id
     WHERE products.id = ?`,
    [id],
    (err, row) => {
      if (err || !row) return callback(err, row);

      // подтягиваем фотки
      db.all(
        `SELECT url FROM product_images WHERE product_id = ?`,
        [id],
        (imgErr, images) => {
          if (imgErr) return callback(imgErr);
          row.images = images.map(i => i.url);
          callback(null, row);
        }
      );
    }
  );
},

  // Создание нового товара
  create: (data, callback) => {
    const { name, price, image, category_id, description, youtube_link } = data;
    db.run(
      `INSERT INTO products (name, price, image, category_id, description, youtube_link)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, price, image, category_id, description, youtube_link],
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
