const express = require('express');
const protect = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const { postJobOpening } = require('../controllers/companyController');

const router = express.Router();

// Protect company routes and allow only companies to access
router.use(protect);
router.use(roleMiddleware(['company']));  // Only company role can access

// Post a new job opening
router.post('/job', postJobOpening);

module.exports = router;
