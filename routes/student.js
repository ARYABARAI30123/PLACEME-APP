const express = require('express');
const protect = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const { uploadResume, updateProfile } = require('../controllers/studentController');

const router = express.Router();

// Protect student routes and allow only students to access
router.use(protect);
router.use(roleMiddleware(['student']));  // Only student role can access

// Upload resume and update profile
router.put('/profile', uploadResume, updateProfile);

module.exports = router;
