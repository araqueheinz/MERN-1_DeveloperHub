// Require Mongoose Library to set up the database
const mongoose = require('mongoose');

// Require the config library
const config = require('config');

// check if we are in development or production
const env = process.env.NODE_ENV || 'development';

// If we are in development using local database,
// Else We are going to get the mongo URI from the default.json file
let db;

if (env === 'development') {
  db = 'mongodb://localhost:27017/developerHub';
} else {
  db = config.get('mongoURI');
}

// To connect to the database
const connectDB = async () => {
  // We need a way to show if we failed, so we we used a try catch
  try {
    await mongoose.connect(db, {
      // DeprecationWarning: pass option { useNewUrlParser: true } to MongoClient.connect
      useNewUrlParser: true,
      // DeprecationWarning: Use createIndexes instead
      useCreateIndex: true,
      // DeprecationWarning: Mongoose: `findOneAndUpdate()`
      // and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated
      useFindAndModify: false,
    });
    console.log('Mongo DB connected');
  } catch (error) {
    console.error(error.message);
    // Exit Process With Failure
    process.exit(1);
  }
};

module.exports = connectDB;
