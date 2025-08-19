// express-server/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'your_secret_key'; // потом в .env

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username и password обязательны' });

  const userExists = await new Promise(resolve =>
    User.findUserByUsername(username, (err, user) => resolve(user))
  );

  if (userExists) return res.status(400).json({ message: 'Пользователь уже существует' });

  const hashed = await bcrypt.hash(password, 10);
  User.createUser(username, hashed, (err, id) => {
    if (err) {
      console.error('register: db error', err);
      return res.status(500).json({ message: 'Ошибка регистрации' });
    }
    res.status(201).json({ message: 'Пользователь зарегистрирован', id });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'username и password обязательны' });

  User.findUserByUsername(username, async (err, user) => {
    if (err) {
      console.error('login: db error', err);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
    if (!user) return res.status(401).json({ message: 'Неверный логин или пароль' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Неверный логин или пароль' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, username: user.username });
  });
};

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  User.findUserById(userId, (err, user) => {
    if (err) return res.status(500).json({ message: 'Ошибка сервера' });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json({
      username: user.username,
      email: user.email || '',
      description: user.description || '',
      avatar: user.avatar || 'https://bogatyr.club/uploads/posts/2023-02/5559/thumbs/1677456625_bogatyr-club-p-avatarki-na-chernom-fone-foni-4.jpg'
    });
  });
};
