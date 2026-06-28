const express = require('express');
const router = express.Router();
const { getAllListings, addListing, deleteListing, updateListingStatus } = require('../controllers/adminGiftCardController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getAllListings)
  .post(addListing);

router.delete('/:id', deleteListing);
router.patch('/:id/status', updateListingStatus);

module.exports = router;
