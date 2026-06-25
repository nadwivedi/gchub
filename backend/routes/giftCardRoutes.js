const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { addListing, getListings, deleteListing } = require('../controllers/giftCardController');

router.post('/', protect, addListing);
router.get('/', protect, getListings);
router.delete('/:id', protect, deleteListing);

module.exports = router;
