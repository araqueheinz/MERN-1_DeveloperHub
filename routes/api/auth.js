/* =================================
API AUTH PAGE
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// READ / GET api/auth
router.get('/', (req, res) => {
  res.send('Auth Route ( / )');
});

module.exports = router;
