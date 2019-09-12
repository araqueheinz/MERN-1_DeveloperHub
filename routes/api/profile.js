/* =================================
API PROFILE PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Require our Auth middleware
const auth = require('../../middleware/auth');

// Require our Profile model
const Profile = require('../../models/Profile');

// Require our User model
const User = require('../../models/User');

// READ / GET api/profile/me
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'No profile exists for this user' });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Mistake');
  }
});

module.exports = router;
