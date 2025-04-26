const express = require('express');
const router = express.Router();
const {
  createPlantationLog,
  getPlantationLogs,
  updatePlantationLog,
  deletePlantationLog
} = require('../controllers/plantationController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getPlantationLogs)
  .post(protect, createPlantationLog);

router.route('/:id')
  .put(protect, authorize('admin'), updatePlantationLog)
  .delete(protect, authorize('admin'), deletePlantationLog);

module.exports = router;
