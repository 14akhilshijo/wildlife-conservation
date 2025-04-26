const PlantationLog = require('../models/PlantationLog');

// Create a new plantation log (for users)
const createPlantationLog = async (req, res) => {
  const { resourceType, quantity, location, dateLogged } = req.body;

  const plantationLog = await PlantationLog.create({
    user: req.user._id,
    resourceType,
    quantity,
    location,
    dateLogged,
  });

  // Emit real-time update (for Admins)
  const io = req.app.get('io');
  io.emit('new-plantation-log', plantationLog);

  res.status(201).json(plantationLog);
};

// Get all plantation logs (for Admins or Public view)
const getPlantationLogs = async (req, res) => {
  const plantationLogs = await PlantationLog.find().populate('user', 'name email');
  res.json(plantationLogs);
};

// Update a plantation log (Admins can approve or reject logs)
const updatePlantationLog = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const updatedLog = await PlantationLog.findByIdAndUpdate(id, update, { new: true });
  res.json(updatedLog);
};

// Delete a plantation log (Admin only)
const deletePlantationLog = async (req, res) => {
  await PlantationLog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plantation log removed' });
};

module.exports = {
  createPlantationLog,
  getPlantationLogs,
  updatePlantationLog,
  deletePlantationLog,
};
