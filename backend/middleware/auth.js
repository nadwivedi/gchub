const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Authentication middleware
const protect = async (req, res, next) => {
  try {
    let token = null;
    let adminToken = null;

    // Check for token in header first
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for tokens in cookies
    else if (req.cookies) {
      if (req.cookies.token) token = req.cookies.token;
      if (req.cookies.admin_token) adminToken = req.cookies.admin_token;
    }

    if (!token && !adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    let user = null;
    let adminUser = null;

    // Try verifying regular user token
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        user = await User.findById(decoded.userId);
        if (user && user.isActive) {
          User.updateOne({ _id: user._id }, { lastActivity: new Date() }).exec();
        } else {
          user = null;
        }
      } catch (error) {
        if (!adminToken) {
          if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired. Please login again.' });
          }
          return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
        }
      }
    }

    // Try verifying admin token
    if (adminToken) {
      try {
        const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET || 'your-secret-key');
        adminUser = await User.findById(decodedAdmin.userId);
        if (adminUser && adminUser.isActive) {
          User.updateOne({ _id: adminUser._id }, { lastActivity: new Date() }).exec();
        } else {
          adminUser = null;
        }
      } catch (error) {
        if (!user) {
          if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired. Please login again.' });
          }
          return res.status(401).json({ success: false, message: 'Invalid token. Please login again.' });
        }
      }
    }

    if (!user && !adminUser) {
      return res.status(401).json({
        success: false,
        message: 'Token is no longer valid. User not found.'
      });
    }

    // Store both on req object
    req.user = user || adminUser;
    req.adminUser = adminUser;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Admin authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // If route requires admin and we have an adminUser that matches the role, prioritize it
    if (req.adminUser && roles.includes(req.adminUser.role)) {
      req.user = req.adminUser;
      return next();
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      // No token provided, continue without user
      req.user = null;
      return next();
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Get user from token
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = user;
      } else {
        req.user = null;
      }

      next();
    } catch (error) {
      // Token is invalid but we don't fail, just continue without user
      req.user = null;
      next();
    }
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    req.user = null;
    next();
  }
};

// Rate limiting middleware for login attempts
const loginLimiter = (req, res, next) => {
  // This is a simple in-memory rate limiter
  // In production, you'd want to use Redis or a proper rate limiting solution
  
  const attempts = req.app.locals.loginAttempts || {};
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  // Clean old attempts
  Object.keys(attempts).forEach(key => {
    if (now - attempts[key].firstAttempt > windowMs) {
      delete attempts[key];
    }
  });

  if (!attempts[ip]) {
    attempts[ip] = {
      count: 1,
      firstAttempt: now
    };
  } else {
    attempts[ip].count++;
    
    if (attempts[ip].count > maxAttempts) {
      return res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.'
      });
    }
  }

  req.app.locals.loginAttempts = attempts;
  next();
};

// Middleware to check if user owns the resource
const checkResourceOwnership = (resourceField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // For user-specific resources, check ownership
    const userId = req.params.userId || req.user._id;

    if (userId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  loginLimiter,
  checkResourceOwnership
};