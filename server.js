// SERVER.JS FILE

// Require express library
const express = require('express');

// Require our config/db.js file for database connection
const connectDB = require('./config/db');

const app = express();

// Connect to our database
connectDB();

app.get('/', (req, res) => {
  res.send('Api Running');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
