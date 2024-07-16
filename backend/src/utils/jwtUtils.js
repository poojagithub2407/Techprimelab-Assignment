const jwt = require('jsonwebtoken');
const jwtSecret = 'poojaDayal'; 

function generateToken(user) {
    const payload = { user: { id: user._id } };
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

module.exports = { generateToken };
