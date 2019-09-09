/* =================================
API POSTS PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// READ / GET api/posts
router.get('/', (req, res) => {
  res.send('Posts Route ( / )');
});

module.exports = router;
