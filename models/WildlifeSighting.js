const mongoose = require('mongoose');

const wildlifeSightingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  photo: String,
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  sightedAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('WildlifeSighting', wildlifeSightingSchema);
