const RescueCase = require('../models/RescueCase');

// Create a new rescue case
const createRescueCase = async (req, res) => {
  const { animalSpecies, condition, location, rescuedAt } = req.body;

  const rescueCase = await RescueCase.create({
    user: req.user._id,
    animalSpecies,
    condition,
    location,
    rescuedAt,
  });

  // Emit real-time alert
  const io = req.app.get('io');
  io.emit('new-rescue', rescueCase);

  res.status(201).json(rescueCase);
};

// Get all rescue cases (Admin or Public view)
const getRescueCases = async (req, res) => {
  const rescueCases = await RescueCase.find().populate('user', 'name email');
  res.json(rescueCases);
};

// Update a rescue case (Admin update recovery status)
const updateRescueCase = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const updatedRescue = await RescueCase.findByIdAndUpdate(id, update, { new: true });
  res.json(updatedRescue);
};

// Delete a rescue case
const deleteRescueCase = async (req, res) => {
  await RescueCase.findByIdAndDelete(req.params.id);
  res.json({ message: 'Rescue case removed' });
};

module.exports = {
  createRescueCase,
  getRescueCases,
  updateRescueCase,
  deleteRescueCase,
};
