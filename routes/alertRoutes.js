const express = require('express');
const router = express.Router();
const {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert
} = require('../controllers/alertController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getAlerts)
  .post(protect, createAlert);

router.route('/:id')
  .put(protect, authorize('admin'), updateAlert)
  .delete(protect, authorize('admin'), deleteAlert);

module.exports = router;
