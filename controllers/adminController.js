// controllers/adminController.js
const jwt = require('jsonwebtoken');
const WildlifeSighting = require('../models/WildlifeSighting');  // Assuming you have a model for wildlife sightings
const Donation = require('../models/Donation');  // Assuming you have a model for donations
const TourPackage = require('../models/TourPackage');  // Assuming you have a model for tour packages

const ADMIN_USERNAME = 'admin';  // Fixed username for the admin
const ADMIN_PASSWORD = 'Akhil@123';  // Fixed password for the admin

// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });  // 30 days expiration
};

// Admin Login Route
exports.adminLogin = (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match the fixed values
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Generate a token for the admin
    const token = generateToken(ADMIN_USERNAME); // We can just use the username as the id

    res.json({
      message: 'Admin logged in successfully!',
      token,  // Send the token to the admin
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials!' });
  }
};

// Admin Dashboard Route
exports.getAdminDashboard = (req, res) => {
  // Logic to fetch dashboard data
  res.json({ message: 'Welcome to the Admin Dashboard!' });
};

// Approve or verify wildlife sightings
exports.verifySighting = async (req, res) => {
    const { sightingId } = req.params;
    try {
        const sighting = await WildlifeSighting.findById(sightingId);
        if (!sighting) {
            return res.status(404).json({ message: 'Sighting not found' });
        }

        sighting.verified = true; // Approving the sighting
        await sighting.save();
        res.json({ message: 'Sighting verified successfully', sighting });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying sighting', error: error.message });
    }
};
// View all donations
exports.viewAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations', error: error.message });
    }
};

// Create new tour package
exports.createTourPackage = async (req, res) => {
    const { title, description, location, pricePerPerson, availableSlots, tourDate } = req.body;
    
    try {
        const newPackage = new TourPackage({
            title,
            description,
            location,
            pricePerPerson,
            availableSlots,
            tourDate,
        });

        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tour package', error: error.message });
    }
};

