const mongoose = require('mongoose');

const rescueCaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  animalSpecies: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  rescuedAt: {
    type: Date,
    required: true,
  },
  recoveryStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('RescueCase', rescueCaseSchema);
