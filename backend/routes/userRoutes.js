const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwtUtils'); // Import JWT utility function
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email and password (assuming password is hashed in the database)
    let user = await User.findOne({ email, password }).select('-password');

    if (user) {
      // Generate JWT token
      const token = generateToken(user);

      // Return the user object and token
      res.json({ user, token });
    } else {
      // Return error if no user found
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
