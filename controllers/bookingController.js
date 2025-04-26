const Booking = require('../models/Booking');

// Create a new booking (User only)
const createBooking = async (req, res) => {
  const { tourPackage, numberOfPersons } = req.body;

  const tour = await TourPackage.findById(tourPackage);
  if (!tour) return res.status(404).json({ message: 'Tour not found' });

  if (tour.availableSlots < numberOfPersons) {
    return res.status(400).json({ message: 'Not enough slots available' });
  }

  const totalAmount = tour.pricePerPerson * numberOfPersons;

  const booking = await Booking.create({
    user: req.user._id,
    tourPackage,
    numberOfPersons,
    totalAmount,
    bookingDate: new Date(),
  });

  // Update available slots in the tour package
  tour.availableSlots -= numberOfPersons;
  await tour.save();

  res.status(201).json(booking);
};

// Get all bookings (Admin or User view)
const getBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name email').populate('tourPackage', 'title location');
  res.json(bookings);
};

// Cancel a booking (User or Admin)
const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  booking.status = 'cancelled';
  await booking.save();

  // Restore available slots in the tour package
  const tour = await TourPackage.findById(booking.tourPackage);
  tour.availableSlots += booking.numberOfPersons;
  await tour.save();

  res.json(booking);
};

module.exports = {
  createBooking,
  getBookings,
  cancelBooking,
};
