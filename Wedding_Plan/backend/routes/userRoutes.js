const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/userControllers');  // Import controllers
const { check, validationResult } = require('express-validator');  // Import express-validator functions
const authMiddleware = require('../middleware/authMiddleware');    // JWT Auth Middleware

// =========================
// User Registration Route
// =========================
router.post(
  '/register',
  [
    // Input Validation Rules
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Send validation errors to the client
    }
    next();  // If validation passes, proceed to the registerUser controller
  },
  registerUser  // Controller method for handling user registration
);

// =========================
// User Login Route
// =========================
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // If validation passes, proceed to the loginUser controller
  },
  loginUser  // Controller method for handling user login
);

// =========================
// Get User Profile Route (Protected)
// =========================
router.get('/profile', authMiddleware, getUserProfile);  // JWT protected route

// =========================
// Update User Profile Route (Protected)
// =========================
router.put(
  '/profile',
  authMiddleware,
  [
    check('username', 'Username must not be empty').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('password', 'Password must be at least 12 characters').optional().isLength({ min: 12 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // If validation passes, proceed to the updateUserProfile controller
  },
  updateUserProfile  // Controller method for updating user profile
);

module.exports = router;
