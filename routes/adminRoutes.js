const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware'); // Assuming protect and admin are middleware functions
const { getAdminDashboard, verifySighting, adminLogin, viewAllDonations } = require('../controllers/adminController'); // All imports from adminController
const { createTourPackage } = require('../controllers/tourController'); // Assuming createTourPackage is handled in tourController
const { createDonation } = require('../controllers/donationController'); // Assuming donationController handles donation-related actions

// Admin Login Route
router.post('/login', adminLogin);  // Admin login route

// Admin Dashboard Route
router.get('/dashboard', protect, admin, getAdminDashboard);  // Protected admin route

// Approve a wildlife sighting
router.put('/sightings/:sightingId/verify', protect, admin, verifySighting);

// View all donations (Admin only)
router.get('/donations', protect, admin, viewAllDonations);  // Admin can view donations

// Create a new donation (Admin only)
router.post('/donations', protect, admin, createDonation); // Admin can create donations

// Create a new tour package (Admin only)
router.post('/tour-packages', protect, admin, createTourPackage);

module.exports = router;
