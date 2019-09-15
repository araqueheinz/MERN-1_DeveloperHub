/* eslint-disable consistent-return */
/* =================================
API AUTH PAGE
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Use the check & validationResult functions from the express-validator library
const { check, validationResult } = require('express-validator');

// Require jsonwebtoken library
const jwt = require('jsonwebtoken');

// Require bcrypt library
const bcrypt = require('bcryptjs');

// Require config library
const config = require('config');

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

// POST / AUTH - LOGIN / AUTHENTICATE USER GET TOKEN
router.post('/', [
  // APPLY VALIDATION MIDDLEWARE
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // Check if new user already exists
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid User Email or Password' }] });
    }

    // Check User password with submitted password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid User Email or Password' }] });
    }

    // We go the user set a payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
