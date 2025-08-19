// express-server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // позже вынеси в .env

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('authMiddleware: нет заголовка Authorization');
    return res.status(401).json({ message: 'Нет токена' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('authMiddleware: неверный формат заголовка Authorization:', authHeader);
    return res.status(401).json({ message: 'Неверный формат токена' });
  }

  const token = parts[1];
  console.log('authMiddleware: TOKEN:', token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('authMiddleware: decoded', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('authMiddleware: JWT error', err.message);
    return res.status(401).json({ message: 'Неверный или просроченный токен' });
  }
};
