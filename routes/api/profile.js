/* =================================
API PROFILE PAGE C/R/U/D
==================================== */

// Require Express Library
const express = require('express');

// Use the router function in the express library
const router = express.Router();

// Require request package to make the process of requesting info from github a little bit easier
const request = require('request');

// Require config library
const config = require('config');

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

// UPDATE / ADD ONE EXPERIENCE / PUT api/profile/experience
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

// UPDATE / ADD ONE EDUCATION / PUT api/profile/education
router.put('/education', [auth,
  [
    check('school', 'School field is required').not().isEmpty(),
    check('degree', 'Degree field is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date field is required').not().isEmpty(),
  ]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  // Build a new Education object
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.education.unshift(newEdu);

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

// DELETE ONE EXPERIENCE / DELETE api/profile/experience/:id
router.delete('/experience/:id', auth, async (req, res) => {
  try {
    // Get the profile by userId
    const profile = await Profile.findOne({ user: req.user.id });

    // New array without the deleted experience
    const updatedExperience = profile.experience.filter((element) => element.id !== req.params.id);

    // Updating the profile experiences with the new updatedExperience
    profile.experience = updatedExperience;

    // Save to database
    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

// DELETE ONE EDUCATION / DELETE api/profile/education/:id
router.delete('/education/:id', auth, async (req, res) => {
  try {
    // Get the profile by userId
    const profile = await Profile.findOne({ user: req.user.id });

    // New array without the deleted education
    const updatedEducation = profile.education.filter((element) => element.id !== req.params.id);

    // Updating the profile educations with the new updatedEducation
    profile.education = updatedEducation;

    // Save to database
    await profile.save();

    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

/* =================================
          GITHUB GET REQUEST
==================================== */

// READ / GET GITHUB PROFILE
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=6&
      sort=created:asc&
      client_id=${config.get('githubClientId')}&
      client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    return await request(options, (error, response, body) => {
      if (error) {
        return console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Github profile, not found!' });
      }
      return res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
