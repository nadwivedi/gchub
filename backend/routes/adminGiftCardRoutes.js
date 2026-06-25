const express = require('express');
const router = express.Router();
const { getAllListings, addListing, deleteListing } = require('../controllers/adminGiftCardController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getAllListings)
  .post(addListing);

router.delete('/:id', deleteListing);

module.exports = router;
