/* =================================
API PROFILE PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// READ / GET api/profile
router.get('/', (req, res) => {
  res.send('Profile Route ( / )');
});

module.exports = router;
