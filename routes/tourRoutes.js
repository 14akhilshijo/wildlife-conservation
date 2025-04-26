const express = require('express');
const router = express.Router();
const {
  createTourPackage,
  getTourPackages,
  updateTourPackage,
  deleteTourPackage
} = require('../controllers/tourController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(getTourPackages)
  .post(protect, authorize('admin'), createTourPackage);

router.route('/:id')
  .put(protect, authorize('admin'), updateTourPackage)
  .delete(protect, authorize('admin'), deleteTourPackage);

module.exports = router;
