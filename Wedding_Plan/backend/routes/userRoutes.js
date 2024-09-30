const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserProfile } = require('../controllers/userControllers');  // Adjusted import
const authMiddleware = require('../middleware/authMiddleware');

// User routes
router.post('/login', loginUser);                  // POST route for user login
router.post('/register', registerUser);            // POST route for user registration
router.get('/profile', authMiddleware, getUserProfile);  // GET user profile with auth

module.exports = router;

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user instance
      user = new User({
        username,
        email,
        password,  // Will be hashed via the schema hook
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
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Get user profile (Protected route)
const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  