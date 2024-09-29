const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes with JWT authentication
router.post('/', authMiddleware, createBoard);
router.get('/', authMiddleware, getBoards);

module.exports = router;