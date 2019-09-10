/* =================================
API USERS PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Use the check & validationResult functions from the express-validator library
const { check, validationResult } = require('express-validator/check');

// CREATE / POST api/users
router.post('/', [
// APPLY VALIDATION MIDDLEWARE
  check('name', 'Name field is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send('Users Route ( / )');
});

module.exports = router;
