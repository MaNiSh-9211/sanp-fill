require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // Added for cookie parsing
const connectDB = require('./config/db');
const authenticate = require('./middleware/authenticate'); // Import authentication middleware

const app = express();
app.use(express.urlencoded({ extended: true }));  // Add this to parse URL-encoded data
// app.use(express.json()); // This is the default middleware to handle JSON data in POST requests
app.use(express.json()); // Handle JSON data in POST requests
app.use(cors());
app.use(cookieParser()); // Use cookie-parser middleware

// Connect to the database
connectDB();

// Add route for keylogs
app.use('/api/keylogs', require('./routes/keylogs'));

// API routes
app.use('/api/auth', require('./routes/auth')); // Ensure you're passing the correct route

// Serve login page when no JWT is present
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/login.html'));
});

// Protect the '/dashboard.html' route by checking JWT authentication
app.get('/dashboard.html', authenticate, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dashboard.html')); // Serve the dashboard page if authenticated
});

// // Serve the login page if not authenticated
// app.get('/login.html', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/login.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
