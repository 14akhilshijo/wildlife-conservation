const Donation = require('../models/Donation');


const createDonation = async (req, res) => {
    const { donorName, amount, project, date } = req.body;

    // Ensure that the user is logged in and authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    // Check if all required fields are present
    if (!donorName || !amount || !date || !project) {
        return res.status(400).json({ message: 'Missing required fields: donorName, amount, date, and project' });
    }

    // Create the donation record
    const donation = await Donation.create({
      donorName,  // Ensure donorName is correctly passed here
      amount,
      project,
      date,  // Ensure date is correctly passed here
      donationDate: new Date(),
    });

    // Emit real-time donation update (for Admins)
    const io = req.app.get('io');
    io.emit('new-donation', donation);

    res.status(201).json(donation);
};

module.exports = {
  createDonation,
};






// Get all donations (for Admins)
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('user', 'name email');
    
    if (!donations.length) {
      return res.status(404).json({ message: 'No donations found' });
    }

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error: error.message });
  }
};

// Update a donation (Admin only - marking as completed or failed)
const updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedDonation = await Donation.findByIdAndUpdate(id, update, { new: true });

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation', error: error.message });
  }
};

// Delete a donation (Admin only)
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ message: 'Donation record removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error: error.message });
  }
};

module.exports = {
  createDonation,
  getDonations,
  updateDonation,
  deleteDonation,
};
