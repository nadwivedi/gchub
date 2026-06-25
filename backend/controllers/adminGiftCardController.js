const GiftCardListing = require('../models/GiftCardListing');

const getAllListings = async (req, res) => {
  try {
    const listings = await GiftCardListing.find()
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const addListing = async (req, res) => {
  try {
    const { brand, balance, code, expiry, pin } = req.body;

    if (!brand || !balance || !code || !expiry) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const listing = new GiftCardListing({ user: req.user._id, brand, balance, code, expiry, pin });
    const saved = await listing.save();

    res.status(201).json({
      success: true,
      message: 'Gift card listed successfully',
      data: saved
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await GiftCardListing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { getAllListings, addListing, deleteListing };
