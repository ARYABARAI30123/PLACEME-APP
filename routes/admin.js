const express = require('express');
const protect = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const { getAllStudents, getAllCompanies, getAllUsers } = require('../controllers/adminController');

const router = express.Router();

// Protect admin routes and allow only admin to access
router.use(protect);
router.use(roleMiddleware(['admin']));  // Only admin role can access

// Get all students
router.get('/students', getAllStudents);

// Get all companies
router.get('/companies', getAllCompanies);

// Get all users
router.get('/users', getAllUsers);

module.exports = router;
