const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
