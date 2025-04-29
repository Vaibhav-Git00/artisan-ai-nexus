
const Story = require('../models/story.model');
const AppError = require('../utils/appError');

// @route   POST /api/stories
// @desc    Create a story
// @access  Private
exports.createStory = async (req, res, next) => {
  try {
    // Add creator ID from authenticated user
    req.body.creator = req.user.id;
    
    const story = await Story.create(req.body);
    
    res.status(201).json({
      success: true,
      data: { story }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/stories
// @desc    Get all stories
// @access  Public
exports.getAllStories = async (req, res, next) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);
    
    // Filter by status - only return published stories for non-owners
    if (!req.user) {
      queryObj.status = 'published';
    }
    
    let query = Story.find(queryObj);
    
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit)
      .populate('creator', 'name profileImage')
      .populate('relatedProducts', 'name images');
    
    // Execute query
    const stories = await query;
    
    // Get total count for pagination
    const total = await Story.countDocuments(queryObj);
    
    res.status(200).json({
      success: true,
      count: stories.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: { stories }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/stories/:id
// @desc    Get story by ID
// @access  Public/Private
exports.getStoryById = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('creator', 'name profileImage location bio')
      .populate('relatedProducts', 'name images price');
    
    if (!story) {
      return next(new AppError('Story not found', 404));
    }
    
    // Check if story is published or user is the creator
    if (story.status !== 'published' && 
        (!req.user || 
         (req.user.id !== story.creator.id && 
          req.user.role !== 'admin'))) {
      return next(new AppError('Story not available', 404));
    }
    
    res.status(200).json({
      success: true,
      data: { story }
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/stories/:id
// @desc    Update story
// @access  Private/Owner/Admin
exports.updateStory = async (req, res, next) => {
  try {
    let story = await Story.findById(req.params.id);
    
    if (!story) {
      return next(new AppError('Story not found', 404));
    }
    
    // Check ownership or admin status
    if (story.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You are not authorized to update this story', 403));
    }
    
    story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: { story }
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/stories/:id
// @desc    Delete story
// @access  Private/Owner/Admin
exports.deleteStory = async (req, res, next) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return next(new AppError('Story not found', 404));
    }
    
    // Check ownership or admin status
    if (story.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You are not authorized to delete this story', 403));
    }
    
    await Story.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/stories/cultural-tags/:tag
// @desc    Get stories by cultural tag
// @access  Public
exports.getStoriesByTag = async (req, res, next) => {
  try {
    const { tag } = req.params;
    
    const stories = await Story.find({ 
      culturalTags: tag,
      status: 'published'
    })
    .populate('creator', 'name profileImage')
    .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: stories.length,
      data: { stories }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/stories/region/:regionName
// @desc    Get stories by region
// @access  Public
exports.getStoriesByRegion = async (req, res, next) => {
  try {
    const { regionName } = req.params;
    
    const stories = await Story.find({ 
      region: new RegExp(regionName, 'i'),
      status: 'published'
    })
    .populate('creator', 'name profileImage')
    .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: stories.length,
      data: { stories }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/stories/search/:query
// @desc    Search stories
// @access  Public
exports.searchStories = async (req, res, next) => {
  try {
    const { query } = req.params;
    
    const stories = await Story.find(
      { 
        $text: { $search: query },
        status: 'published' 
      },
      { 
        score: { $meta: 'textScore' } 
      }
    )
    .sort({ score: { $meta: 'textScore' } })
    .populate('creator', 'name profileImage');
    
    res.status(200).json({
      success: true,
      count: stories.length,
      data: { stories }
    });
  } catch (error) {
    next(error);
  }
};
