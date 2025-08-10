const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'your_secret_key'; // замени на .env позже

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await new Promise(resolve =>
    User.findUserByUsername(username, (err, user) => resolve(user))
  );
  if (userExists) return res.status(400).json({ message: 'Пользователь уже существует' });

  const hashed = await bcrypt.hash(password, 10);
  User.createUser(username, hashed, (err, id) => {
    if (err) return res.status(500).json({ message: 'Ошибка регистрации' });
    res.status(201).json({ message: 'Пользователь зарегистрирован', id });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findUserByUsername(username, async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Неверный логин' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Неверный пароль' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });
  });
};
