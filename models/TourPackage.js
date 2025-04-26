const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerPerson: {
    type: Number,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
  tourDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'completed'],
    default: 'available',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('TourPackage', tourPackageSchema);
