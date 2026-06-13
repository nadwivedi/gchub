const mongoose = require('mongoose');

const giftCardListingSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  balance: {
    type: Number,
    required: [true, 'Balance amount is required'],
    min: [1, 'Balance must be at least 1']
  },
  code: {
    type: String,
    required: [true, 'Gift card code is required'],
    trim: true
  },
  expiry: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'expired'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GiftCardListing', giftCardListingSchema);
