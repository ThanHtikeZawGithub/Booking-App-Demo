const express = require('express');
const {registerUser,
        loginUser,
        getUserProfile,
        logoutUser
        } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile
router.get('/profile', getUserProfile);

// Logout user
router.post('/logout', logoutUser);

module.exports = router;