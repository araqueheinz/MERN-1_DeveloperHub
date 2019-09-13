/* =================================
API PROFILE PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Require our validation functions from the express library
const { check, validationResult } = require('express-validator');

// Require our Auth middleware
const auth = require('../../middleware/auth');

// Require our Profile model
const Profile = require('../../models/Profile');

// Require our User model
const User = require('../../models/User');

// CREATE / POST api/profile/
router.post('/', [auth, [
  check('status', 'Status field is required').not().isEmpty(),
  check('skills', 'Skills filed is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  // Check and Build profile object
  const profileFields = {};

  profileFields.user = req.user.id;

  if (company) {
    profileFields.company = company;
  }
  if (website) {
    profileFields.website = website;
  }
  if (location) {
    profileFields.location = location;
  }
  if (bio) {
    profileFields.bio = bio;
  }
  if (status) {
    profileFields.status = status;
  }
  if (githubusername) {
    profileFields.githubusername = githubusername;
  }
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }

  // Check and Build social object
  profileFields.social = {};

  if (youtube) {
    profileFields.social.youtube = youtube;
  }
  if (twitter) {
    profileFields.social.twitter = twitter;
  }
  if (facebook) {
    profileFields.social.facebook = facebook;
  }
  if (linkedin) {
    profileFields.social.linkedin = linkedin;
  }
  if (instagram) {
    profileFields.social.instagram = instagram;
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // If there IS a profile already then update it
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );
      return res.json(profile);
    }

    // If there is NO profile then Create one
    profile = new Profile(profileFields);

    // save it to the database
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

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
