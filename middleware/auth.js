/* =================================
 AUTH MIDDLEWARE FUNCTION
==================================== */

// Require jsonwebtoken library
const jwt = require('jsonwebtoken');

// Require config library
const config = require('config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ mgs: 'No Token! Authorization denied' });
  }

  // Verify Token
  try {
    // Decode json token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
