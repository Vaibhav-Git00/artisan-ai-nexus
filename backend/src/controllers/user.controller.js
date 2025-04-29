
const User = require('../models/user.model');
const AppError = require('../utils/appError');

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/users/:id
// @desc    Update user (admin only)
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/users/:id
// @desc    Delete user (admin only)
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/users/artisans
// @desc    Get all artisans
// @access  Public
exports.getArtisans = async (req, res, next) => {
  try {
    const artisans = await User.find({ role: 'artisan' });
    
    res.status(200).json({
      success: true,
      count: artisans.length,
      data: { artisans }
    });
  } catch (error) {
    next(error);
  }
};
