const WildlifeSighting = require('../models/WildlifeSighting');

// Create a new sighting
const createSighting = async (req, res) => {
  const { species, location, sightedAt } = req.body;
  const photo = req.file?.path || null;

  const sighting = await WildlifeSighting.create({
    user: req.user._id,
    species,
    location,
    sightedAt,
    photo,
  });

  // Emit real-time update
  const io = req.app.get('io');
  io.emit('new-sighting', sighting);

  res.status(201).json(sighting);
};

// Get all sightings (Admin or Public Map)
const getSightings = async (req, res) => {
  const sightings = await WildlifeSighting.find().populate('user', 'name email');
  res.json(sightings);
};

// Update a sighting (Admin verify or edit)
const updateSighting = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const updated = await WildlifeSighting.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};

// Delete a sighting
const deleteSighting = async (req, res) => {
  await WildlifeSighting.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sighting removed' });
};

module.exports = {
  createSighting,
  getSightings,
  updateSighting,
  deleteSighting,
};
