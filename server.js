/* =================================
SERVER.JS FILE
==================================== */

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

// Define and require my AUTH route.
app.use('/api/auth', require('./routes/api/auth'));
// Define and require my POSTS route.
app.use('/api/posts', require('./routes/api/posts'));
// Define and require my PROFILE route.
app.use('/api/profile', require('./routes/api/profile'));
// Define and require my USERS route.
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
