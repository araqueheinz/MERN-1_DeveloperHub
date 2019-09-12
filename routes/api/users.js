/* =================================
API USERS PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Require the gravatar library
const gravatar = require('gravatar');

// Require bcrypt library
const bcrypt = require('bcryptjs');

// Require jsonwebtoken library
const jwt = require('jsonwebtoken');

// Require config library
const config = require('config');

// Use the check & validationResult functions from the express-validator library
const { check, validationResult } = require('express-validator');

// Require our USER model
const User = require('../../models/User');


// CREATE / POST api/users
router.post('/', [
// APPLY VALIDATION MIDDLEWARE
  check('name', 'Name field is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    // Check if new user already exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    // Get user Gravatar
    const avatar = gravatar.url(email, {
      // Size
      s: '200',
      // Rating
      r: 'pg',
      // Default
      d: 'mm',
    });

    // Create a new instance of User
    user = new User({
      name,
      email,
      avatar,
      password,
    });

    // Generate a salt and Hash / Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save to the database
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (error, token) => {
        if (error) {
          return error;
        }
        return res.json({ token });
      },
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

module.exports = router;
