const db = require('../db');

exports.createUser = (username, hashedPassword, callback) => {
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(sql, [username, hashedPassword], function(err) {
    callback(err, this?.lastID);
  });
};

exports.findUserByUsername = (username, callback) => {
  db.get('SELECT * FROM users WHERE username = ?', [username], callback);
};
