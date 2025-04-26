const express = require('express');
const router = express.Router();
const {
  createRescueCase,
  getRescueCases,
  updateRescueCase,
  deleteRescueCase
} = require('../controllers/rescueController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getRescueCases)
  .post(protect, createRescueCase);

router.route('/:id')
  .put(protect, authorize('admin'), updateRescueCase)
  .delete(protect, authorize('admin'), deleteRescueCase);

module.exports = router;
         