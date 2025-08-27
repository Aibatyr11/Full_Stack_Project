// express-server/models/userModel.js
const db = require('../db');

exports.createUser = (username, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(sql, [username, hashedPassword], function (err) {
    callback(err, this?.lastID);
  });
};

exports.findUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};

exports.findUserById = (id, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], callback);
};


exports.updateUser = (id, data, callback) => {
  const { username, email, description, avatar } = data;
  db.run(
    `UPDATE users 
     SET username = COALESCE(?, username), 
         email = COALESCE(?, email), 
         description = COALESCE(?, description), 
         avatar = COALESCE(?, avatar) 
     WHERE id = ?`,
    [username, email, description, avatar, id],
    function (err) {
      if (err) return callback(err);

      db.get(`SELECT id, username, email, description, avatar FROM users WHERE id = ?`, [id], (err, user) => {
        if (err) return callback(err);
        callback(null, user);
      });
    }
  );
};