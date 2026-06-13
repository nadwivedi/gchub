const express = require('express');
const router = express.Router();
const { addListing, getListings, deleteListing } = require('../controllers/giftCardController');

router.post('/', addListing);
router.get('/', getListings);
router.delete('/:id', deleteListing);

module.exports = router;
