/* =================================
SERVER.JS FILE
==================================== */

// Require express library
const express = require('express');

// Require the path module which is a core nodejs module to manipulate file paths
const path = require('path');

// Require our config/db.js file for database connection
const connectDB = require('./config/db');


const app = express();

// Connect to our database
connectDB();

// BodyParser is now included in the express library
app.use(express.json({
  extended: false,
}));


// Define and require my AUTH route.
app.use('/api/auth', require('./routes/api/auth'));
// Define and require my POSTS route.
app.use('/api/posts', require('./routes/api/posts'));
// Define and require my PROFILE route.
app.use('/api/profile', require('./routes/api/profile'));
// Define and require my USERS route.
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
