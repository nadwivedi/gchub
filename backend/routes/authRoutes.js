const express = require('express');
const router = express.Router();
const {
  handelUserSignup,
  handelUserLogin,
  handleUserLogout,
  generateResetPassOTP,
  submitResetPassOTP,
  isloggedin,
  handleGoogleAuth,
  updateMobileNumber,
} = require('../controllers/authController');

// Public authentication routes
router.post('/signup', handelUserSignup);
router.post('/login', handelUserLogin);
router.post('/logout', handleUserLogout);

// Password reset routes
router.post('/forgot-password', generateResetPassOTP);
router.post('/reset-password', submitResetPassOTP);

// Google OAuth route
router.post('/google', handleGoogleAuth);

// Check authentication status
router.get('/me', isloggedin);

// Update mobile number (for Google users without phone)
router.put('/mobile', updateMobileNumber);

module.exports = router;