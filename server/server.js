// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const cookieParser = require('cookie-parser'); // Added for cookie parsing
// const connectDB = require('./config/db');
// const authenticate = require('./middleware/authenticate'); // Import authentication middleware

// const app = express();
// app.use(express.urlencoded({ extended: true }));  // Add this to parse URL-encoded data
// // app.use(express.json()); // This is the default middleware to handle JSON data in POST requests
// app.use(express.json()); // Handle JSON data in POST requests
// app.use(cors());
// app.use(cookieParser()); // Use cookie-parser middleware

// // Connect to the database
// connectDB();

// // Add route for keylogs
// app.use('/api/keylogs', require('./routes/keylogs'));

// // API routes
// app.use('/api/auth', require('./routes/auth')); // Ensure you're passing the correct route

// // Serve login page when no JWT is present
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/login.html'));
// });

// // Protect the '/dashboard.html' route by checking JWT authentication
// app.get('/dashboard.html', authenticate, (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dashboard.html')); // Serve the dashboard page if authenticated
// });

// // Send response audio
// app.get('/audio/send', authenticate, (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/sounds/send-response.mp3'));
// });

// // Delete question audio
// app.get('/audio/delete-question', authenticate, (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/sounds/delete-question.mp3'));
// });

// // Delete response audio
// app.get('/audio/delete-response', authenticate, (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/sounds/delete-response.mp3'));
// });

// app.get('/audio/error', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/sounds/error.mp3'));
// });

// app.get('/audio/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/sounds/login.mp3'));
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authenticate = require('./middleware/authenticate');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to the database
connectDB();

// API routes
app.use('/api/keylogs', require('./routes/Keylogs'));
app.use('/api/auth', require('./routes/auth'));

// Get absolute path to project root
const rootDir = path.resolve(__dirname, '../../');

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'login.html'));
});

// Serve dashboard if authenticated
app.get('/dashboard.html', authenticate, (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'dashboard.html'));
});

// Serve audio files (some require auth, some don't)
app.get('/audio/send', authenticate, (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'sounds', 'send-response.mp3'));
});

app.get('/audio/delete-question', authenticate, (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'sounds', 'delete-question.mp3'));
});

app.get('/audio/delete-response', authenticate, (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'sounds', 'delete-response.mp3'));
});

app.get('/audio/error', (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'sounds', 'error.mp3'));
});

app.get('/audio/login', (req, res) => {
  res.sendFile(path.join(rootDir, 'client', 'sounds', 'login.mp3'));
});

// DO NOT listen — just export app for serverless
module.exports = app;
