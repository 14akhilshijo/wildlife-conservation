const CommunityAlert = require('../models/CommunityAlert');

// Create a new community alert (for users)
const createAlert = async (req, res) => {
  const { alertType, description, location, alertTime } = req.body;

  const alert = await CommunityAlert.create({
    user: req.user._id,
    alertType,
    description,
    location,
    alertTime,
  });

  // Emit real-time alert (for Admins)
  const io = req.app.get('io');
  io.emit('new-community-alert', alert);

  res.status(201).json(alert);
};

// Get all community alerts (Admin view)
const getAlerts = async (req, res) => {
  const alerts = await CommunityAlert.find().populate('user', 'name email');
  res.json(alerts);
};

// Update a community alert (Admins can update the status)
const updateAlert = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const updatedAlert = await CommunityAlert.findByIdAndUpdate(id, update, { new: true });
  res.json(updatedAlert);
};

// Delete a community alert (Admin only)
const deleteAlert = async (req, res) => {
  await CommunityAlert.findByIdAndDelete(req.params.id);
  res.json({ message: 'Alert removed' });
};

module.exports = {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert,
};
