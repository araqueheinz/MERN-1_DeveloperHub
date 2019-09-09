// Require Mongoose Library to set up the database
const mongoose = require('mongoose');

// Require the config library
const config = require('config');

// We are going to get the mongo URI from the default.json file
const db = config.get('mongoURI');

// To connect to the database
const connectDB = async () => {
  // We need a way to show if we failed, so we we used a try catch
  try {
    // DeprecationWarning: pass option { useNewUrlParser: true } to MongoClient.connect
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('Mongo DB connected');
  } catch (error) {
    console.error(error.message);
    // Exit Process With Failure
    process.exit(1);
  }
};

module.exports = connectDB;
