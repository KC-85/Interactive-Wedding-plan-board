const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sanitize = require('mongo-sanitize');

// =========================
// Register a New User
// =========================
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Sanitize inputs to prevent NoSQL injections
    const sanitizedEmail = sanitize(email);
    const sanitizedUsername = sanitize(username);

    // Check if the user already exists
    let user = await User.findOne({ email: sanitizedEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user instance
    user = new User({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password,  // Password will be hashed via the User model pre-save hook
    });

    // Save the new user
    await user.save();

    // Generate a token for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Error in registerUser: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// =========================
// User Login Function
// =========================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sanitize the email input
    const sanitizedEmail = sanitize(email);

    // Find the user by email
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Use the custom `matchPassword` method defined in the User model to validate the password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, sign a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user details to the client
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(`Error in loginUser: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// =========================
// Get User Profile (Protected Route)
// =========================
const getUserProfile = async (req, res) => {
  try {
    // Find the authenticated user by ID, excluding the password field
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(`Error in getUserProfile: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// =========================
// Update User Profile (Protected Route)
// =========================
const updateUserProfile = async (req, res) => {
  try {
    // Find the authenticated user by ID
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided in the request body
    if (req.body.username) {
      user.username = sanitize(req.body.username);
    }
    if (req.body.email) {
      user.email = sanitize(req.body.email);
    }
    if (req.body.password) {
      user.password = req.body.password;  // Password will be hashed via the User model pre-save hook
    }

    // Save the updated user information
    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error(`Error in updateUserProfile: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export all controller functions
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
