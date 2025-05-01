
const Product = require('../models/product.model');
const AppError = require('../utils/appError');

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Artisan
exports.createProduct = async (req, res, next) => {
  try {
    // Add artisan ID from authenticated user
    req.body.artisan = req.user.id;

    // Calculate eco score if materials are provided but eco score is not
    if (req.body.materials && (!req.body.ecoScore || !req.body.ecoScore.score)) {
      const ecoScore = calculateEcoScore(req.body.materials);
      req.body.ecoScore = {
        score: ecoScore,
        materialsSustainability: ecoScore,
        productionProcess: Math.min(ecoScore + 1, 10), // Slightly higher than overall score
        packaging: Math.max(ecoScore - 1, 0), // Slightly lower than overall score
        transportFootprint: Math.max(ecoScore - 0.5, 0) // Slightly lower than overall score
      };
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to calculate eco score based on materials
const calculateEcoScore = (materials) => {
  if (!materials || !Array.isArray(materials) || materials.length === 0) {
    return 5; // Default middle score
  }

  // Define eco scores for different material types
  const materialScores = {
    'recycled': 9,
    'natural': 7,
    'synthetic': 3,
    'upcycled': 8,
    'organic': 8,
    'biodegradable': 8
  };

  // Calculate average score
  let totalScore = 0;
  let scoredMaterials = 0;

  materials.forEach(material => {
    if (materialScores[material]) {
      totalScore += materialScores[material];
      scoredMaterials++;
    }
  });

  if (scoredMaterials === 0) return 5; // Default if no recognized materials

  return Math.round((totalScore / scoredMaterials) * 10) / 10; // Round to 1 decimal place
};

// @route   GET /api/products
// @desc    Get all products
// @access  Public
exports.getAllProducts = async (req, res, next) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Filter by status - only return published products for non-admins
    if (!req.user || req.user.role !== 'admin') {
      queryObj.status = 'published';
    }

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const products = await query.populate('artisan', 'name profileImage location');

    // Get total count for pagination
    const total = await Product.countDocuments(JSON.parse(queryStr));

    res.status(200).json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/products/preview/:id
// @desc    Get product preview data
// @access  Private/Owner
exports.getProductPreview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('artisan', 'name profileImage location');

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Check ownership
    if (product.artisan._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You are not authorized to view this product preview', 403));
    }

    // Return only the data needed for the preview card
    const previewData = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      category: product.category,
      artisan: {
        name: product.artisan.name,
        location: product.artisan.location,
        profileImage: product.artisan.profileImage
      },
      ecoScore: product.ecoScore,
      status: product.status
    };

    res.status(200).json({
      success: true,
      data: { product: previewData }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('artisan', 'name profileImage location bio')
      .populate('stories');

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Check if product is published or user is admin/the artisan
    if (product.status !== 'published' &&
        (!req.user ||
         (req.user.role !== 'admin' &&
          req.user.id !== product.artisan.id))) {
      return next(new AppError('Product not available', 404));
    }

    res.status(200).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Owner/Admin
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Check ownership or admin status
    if (product.artisan.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You are not authorized to update this product', 403));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: { product }
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Owner/Admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Check ownership or admin status
    if (product.artisan.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You are not authorized to delete this product', 403));
    }

    await product.remove();

    res.status(200).json({
      success: true,
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/products/:id/fair-price
// @desc    Add a fair price rating
// @access  Private/Buyer
exports.addFairPriceRating = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating) {
      return next(new AppError('Please provide a rating', 400));
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Add rating to community ratings
    product.fairPriceData = product.fairPriceData || {};
    product.fairPriceData.communityRatings = product.fairPriceData.communityRatings || [];

    // Check if user has already rated
    const existingRatingIndex = product.fairPriceData.communityRatings.findIndex(
      r => r.userId.toString() === req.user.id
    );

    if (existingRatingIndex >= 0) {
      // Update existing rating
      product.fairPriceData.communityRatings[existingRatingIndex].rating = rating;
      product.fairPriceData.communityRatings[existingRatingIndex].comment = comment;
    } else {
      // Add new rating
      product.fairPriceData.communityRatings.push({
        userId: req.user.id,
        rating,
        comment
      });
    }

    // Calculate suggested price based on average of ratings
    const totalRatings = product.fairPriceData.communityRatings.reduce(
      (sum, item) => sum + item.rating, 0
    );

    product.fairPriceData.suggestedPrice = totalRatings / product.fairPriceData.communityRatings.length;

    await product.save();

    res.status(200).json({
      success: true,
      data: {
        fairPriceData: product.fairPriceData
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/products/search/:query
// @desc    Search products
// @access  Public
exports.searchProducts = async (req, res, next) => {
  try {
    const { query } = req.params;

    const products = await Product.find(
      {
        $text: { $search: query },
        status: 'published'
      },
      {
        score: { $meta: 'textScore' }
      }
    )
    .sort({ score: { $meta: 'textScore' } })
    .populate('artisan', 'name profileImage');

    res.status(200).json({
      success: true,
      count: products.length,
      data: { products }
    });
  } catch (error) {
    next(error);
  }
};
