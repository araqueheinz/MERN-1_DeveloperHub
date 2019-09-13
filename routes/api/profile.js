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


/* =================================
          CREATE C/R/U/D
==================================== */

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

/* =================================
          READ C/R/U/D
==================================== */

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
    return res.status(500).send('Server Error');
  }
});

// READ ONE PROFILE BY USER ID / GET api/profile
router.get('/user/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'No profile exists for this user' });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'No profile exists for this user' });
    }
    return res.status(500).send('Server Error');
  }
});

// READ ALL / GET api/profile
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

/* =================================
          UPDATE C/R/U/D
==================================== */

router.put('/experience', [auth,
  [
    check('title', 'Title field is required').not().isEmpty(),
    check('company', 'Company field is required').not().isEmpty(),
    check('from', 'From date field is required').not().isEmpty(),
  ]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  } = req.body;

  // Build a new Experience object
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.experience.unshift(newExp);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

/* =================================
          DELETE C/R/U/D
==================================== */

// DELETE ONE PROFILE & USER / DELETE api/profile
router.delete('/', auth, async (req, res) => {
  try {
    // Deleting profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Deleting User
    await User.findOneAndRemove({ _id: req.user.id });
    return res.json({ msg: 'Profile and User has been deleted' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});


module.exports = router;
