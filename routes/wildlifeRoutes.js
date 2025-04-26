const express = require('express');
const router = express.Router();
const {
  createSighting,
  getSightings,
  updateSighting,
  deleteSighting
} = require('../controllers/wildlifeController');

const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Add photo upload support
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/')
  .get(getSightings)
  .post(protect, upload.single('photo'), createSighting);

router.route('/:id')
  .put(protect, authorize('admin'), updateSighting)
  .delete(protect, authorize('admin'), deleteSighting);

module.exports = router;
