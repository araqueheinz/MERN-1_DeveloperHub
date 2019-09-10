/* =================================
API AUTH PAGE
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Require our Auth middleware
const auth = require('../../middleware/auth');

// Require our User model
const User = require('../../models/User');

// READ / GET api/auth
router.get('/', auth, async (req, res) => {
  try {
    // `req.user.id` comes from the middleware auth where we set `req.user = decoded.user`
    // Return user info except password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Api Error', error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
