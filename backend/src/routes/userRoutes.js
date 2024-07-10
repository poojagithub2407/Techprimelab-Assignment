const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwtUtils'); // Import JWT utility function
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    let user = await User.findOne({ email, password }).select('-password');

    if (user) {
      const token = generateToken(user);

      res.json({ user, token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
