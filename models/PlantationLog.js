const mongoose = require('mongoose');

const plantationLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resourceType: {
    type: String,
    enum: ['timber', 'medicinal', 'saplings', 'other'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  dateLogged: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PlantationLog', plantationLogSchema);
