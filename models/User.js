/* =================================
MODELS USER FILE
==================================== */

// Require the mongoose library
const mongoose = require('mongoose');

// Create our new UserSchema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
