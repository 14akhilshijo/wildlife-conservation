const mongoose = require('mongoose');

const communityAlertSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  alertType: {
    type: String,
    enum: ['wildlife-conflict', 'fire', 'flood', 'other'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  alertTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CommunityAlert', communityAlertSchema);
