const TrainingModule = require('../models/training.model');
const TrainingProgress = require('../models/trainingProgress.model');
const AppError = require('../utils/appError');

// @route   GET /api/training
// @desc    Get all training modules
// @access  Public
exports.getAllModules = async (req, res, next) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Filter by language
    if (!queryObj.contentLanguage) {
      queryObj.contentLanguage = 'english'; // Default to English
    }

    // Filter by status
    queryObj.status = 'published';

    // Build query
    let query = TrainingModule.find(queryObj);

    // Sort
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

    query = query.skip(skip).limit(limit);

    // Execute query
    const modules = await query;

    // Get total count for pagination
    const total = await TrainingModule.countDocuments(queryObj);

    // If user is authenticated, get their progress
    if (req.user) {
      const userProgressPromises = modules.map(async (module) => {
        const progress = await TrainingProgress.findOne({
          user: req.user.id,
          module: module._id
        });

        return {
          ...module.toObject(),
          progress: progress ? progress.progress : 0,
          completed: progress ? progress.completed : false
        };
      });

      const modulesWithProgress = await Promise.all(userProgressPromises);

      return res.status(200).json({
        success: true,
        count: modulesWithProgress.length,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        data: { modules: modulesWithProgress }
      });
    }

    res.status(200).json({
      success: true,
      count: modules.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: { modules }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/training/category/:category
// @desc    Get modules by category
// @access  Public
exports.getModulesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const contentLanguage = req.query.contentLanguage || 'english';

    const modules = await TrainingModule.find({
      category,
      contentLanguage,
      status: 'published'
    });

    // If user is authenticated, get their progress
    if (req.user) {
      const userProgressPromises = modules.map(async (module) => {
        const progress = await TrainingProgress.findOne({
          user: req.user.id,
          module: module._id
        });

        return {
          ...module.toObject(),
          progress: progress ? progress.progress : 0,
          completed: progress ? progress.completed : false
        };
      });

      const modulesWithProgress = await Promise.all(userProgressPromises);

      return res.status(200).json({
        success: true,
        count: modulesWithProgress.length,
        data: { modules: modulesWithProgress }
      });
    }

    res.status(200).json({
      success: true,
      count: modules.length,
      data: { modules }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/training/featured
// @desc    Get featured modules
// @access  Public
exports.getFeaturedModules = async (req, res, next) => {
  try {
    const contentLanguage = req.query.contentLanguage || 'english';

    const modules = await TrainingModule.find({
      featured: true,
      contentLanguage,
      status: 'published'
    }).limit(5);

    // If user is authenticated, get their progress
    if (req.user) {
      const userProgressPromises = modules.map(async (module) => {
        const progress = await TrainingProgress.findOne({
          user: req.user.id,
          module: module._id
        });

        return {
          ...module.toObject(),
          progress: progress ? progress.progress : 0,
          completed: progress ? progress.completed : false
        };
      });

      const modulesWithProgress = await Promise.all(userProgressPromises);

      return res.status(200).json({
        success: true,
        count: modulesWithProgress.length,
        data: { modules: modulesWithProgress }
      });
    }

    res.status(200).json({
      success: true,
      count: modules.length,
      data: { modules }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/training/:id
// @desc    Get module by ID
// @access  Public
exports.getModuleById = async (req, res, next) => {
  try {
    const module = await TrainingModule.findById(req.params.id);

    if (!module) {
      return next(new AppError('Module not found', 404));
    }

    // If user is authenticated, get their progress
    if (req.user) {
      const progress = await TrainingProgress.findOne({
        user: req.user.id,
        module: module._id
      });

      const moduleWithProgress = {
        ...module.toObject(),
        progress: progress ? progress.progress : 0,
        completed: progress ? progress.completed : false
      };

      return res.status(200).json({
        success: true,
        data: { module: moduleWithProgress }
      });
    }

    res.status(200).json({
      success: true,
      data: { module }
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/training
// @desc    Create a new training module
// @access  Private/Admin
exports.createModule = async (req, res, next) => {
  try {
    const module = await TrainingModule.create(req.body);

    res.status(201).json({
      success: true,
      data: { module }
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/training/:id
// @desc    Update a training module
// @access  Private/Admin
exports.updateModule = async (req, res, next) => {
  try {
    const module = await TrainingModule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!module) {
      return next(new AppError('Module not found', 404));
    }

    res.status(200).json({
      success: true,
      data: { module }
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/training/:id
// @desc    Delete a training module
// @access  Private/Admin
exports.deleteModule = async (req, res, next) => {
  try {
    const module = await TrainingModule.findById(req.params.id);

    if (!module) {
      return next(new AppError('Module not found', 404));
    }

    await TrainingModule.findByIdAndDelete(req.params.id);

    // Also delete all progress records for this module
    await TrainingProgress.deleteMany({ module: req.params.id });

    res.status(200).json({
      success: true,
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/training/:id/progress
// @desc    Update user's progress for a module
// @access  Private
exports.updateProgress = async (req, res, next) => {
  try {
    const { progress, completed } = req.body;

    // Validate module exists
    const module = await TrainingModule.findById(req.params.id);
    if (!module) {
      return next(new AppError('Module not found', 404));
    }

    // Find or create progress record
    let progressRecord = await TrainingProgress.findOne({
      user: req.user.id,
      module: req.params.id
    });

    if (progressRecord) {
      // Update existing record
      progressRecord.progress = progress;
      progressRecord.completed = completed || progress === 100;
      progressRecord.lastAccessed = Date.now();
      await progressRecord.save();
    } else {
      // Create new record
      progressRecord = await TrainingProgress.create({
        user: req.user.id,
        module: req.params.id,
        progress,
        completed: completed || progress === 100,
        lastAccessed: Date.now()
      });
    }

    res.status(200).json({
      success: true,
      data: { progress: progressRecord }
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/training/:id/resource/:resourceId
// @desc    Track resource download
// @access  Private
exports.trackResourceDownload = async (req, res, next) => {
  try {
    const { id, resourceId } = req.params;

    // Validate module exists
    const module = await TrainingModule.findById(id);
    if (!module) {
      return next(new AppError('Module not found', 404));
    }

    // Validate resource exists
    const resource = module.resources.find(r => r._id.toString() === resourceId);
    if (!resource) {
      return next(new AppError('Resource not found', 404));
    }

    // Find or create progress record
    let progressRecord = await TrainingProgress.findOne({
      user: req.user.id,
      module: id
    });

    if (progressRecord) {
      // Check if resource already downloaded
      const alreadyDownloaded = progressRecord.resourcesDownloaded.some(
        r => r.resourceId === resourceId
      );

      if (!alreadyDownloaded) {
        progressRecord.resourcesDownloaded.push({
          resourceId,
          downloadedAt: Date.now()
        });
        progressRecord.lastAccessed = Date.now();
        await progressRecord.save();
      }
    } else {
      // Create new record
      progressRecord = await TrainingProgress.create({
        user: req.user.id,
        module: id,
        progress: 0,
        completed: false,
        lastAccessed: Date.now(),
        resourcesDownloaded: [
          {
            resourceId,
            downloadedAt: Date.now()
          }
        ]
      });
    }

    res.status(200).json({
      success: true,
      data: {
        fileUrl: resource.fileUrl,
        progress: progressRecord
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/training/progress
// @desc    Get user's progress for all modules
// @access  Private
exports.getUserProgress = async (req, res, next) => {
  try {
    const progress = await TrainingProgress.find({ user: req.user.id })
      .populate('module', 'title category level thumbnail');

    res.status(200).json({
      success: true,
      count: progress.length,
      data: { progress }
    });
  } catch (error) {
    next(error);
  }
};
