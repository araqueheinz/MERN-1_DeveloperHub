/* =================================
API USERS PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// READ / GET api/users
router.get('/', (req, res) => {
  res.send('Users Route ( / )');
});

module.exports = router;
