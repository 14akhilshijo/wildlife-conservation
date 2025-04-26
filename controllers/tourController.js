const TourPackage = require('../models/TourPackage');

// Create a new tour package (Admin only)
const createTourPackage = async (req, res) => {
  const { title, description, location, pricePerPerson, availableSlots, tourDate } = req.body;

  const tourPackage = await TourPackage.create({
    title,
    description,
    location,
    pricePerPerson,
    availableSlots,
    tourDate,
  });

  res.status(201).json(tourPackage);
};

// Get all tour packages (Public view)
const getTourPackages = async (req, res) => {
  const tourPackages = await TourPackage.find();
  res.json(tourPackages);
};

// Update a tour package (Admin only)
const updateTourPackage = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const updatedTour = await TourPackage.findByIdAndUpdate(id, update, { new: true });
  res.json(updatedTour);
};

// Delete a tour package (Admin only)
const deleteTourPackage = async (req, res) => {
  await TourPackage.findByIdAndDelete(req.params.id);
  res.json({ message: 'Tour package removed' });
};

module.exports = {
  createTourPackage,
  getTourPackages,
  updateTourPackage,
  deleteTourPackage,
};
