
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const { createSendToken } = require('../utils/jwtUtils');
const { validationResult } = require('express-validator');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
exports.register = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return next(new AppError('User already exists', 400));
    }
    
    // Create new user
    user = await User.create({
      name,
      email,
      password,
      role: role || 'buyer' // Default to 'buyer' if not specified
    });
    
    // Send token
    createSendToken(user, 201, res);
    
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/auth/login
// @desc    Log in user
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    
    // Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
    
    // Send token
    createSendToken(user, 200, res);
    
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // User is already available in req.user from the auth middleware
    res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/auth/update-me
// @desc    Update user profile
// @access  Private
exports.updateMe = async (req, res, next) => {
  try {
    // Filter out fields that shouldn't be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'bio', 'location');
    
    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to filter object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};
