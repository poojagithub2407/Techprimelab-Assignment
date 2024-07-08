// src/utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'default_secret'; // Use a secure random string in production

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    password:user.password
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Adjust expiresIn as per your requirements
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
