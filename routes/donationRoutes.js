const express = require('express');
const router = express.Router();
const {
  createDonation,
  getDonations,
  updateDonation,
  deleteDonation
} = require('../controllers/donationController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
  .get(protect, authorize('admin'), getDonations)
  .post(protect, createDonation);

router.route('/:id')
  .put(protect, authorize('admin'), updateDonation)
  .delete(protect, authorize('admin'), deleteDonation);

module.exports = router;
