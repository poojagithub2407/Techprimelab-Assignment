const { generateToken } = require('../utils/jwtUtils');
const User = require('../models/User');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password }).select('-password');
    if (user) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  login,
};
