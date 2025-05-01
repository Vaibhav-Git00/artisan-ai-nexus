
const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/search/:query', productController.searchProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.use(authMiddleware.protect);

// Get product preview (owner or admin)
router.get('/preview/:id', productController.getProductPreview);

// Create product (artisans only)
router.post(
  '/',
  authMiddleware.restrictTo('artisan', 'admin'),
  productController.createProduct
);

// Update product (owner or admin)
router.put('/:id', productController.updateProduct);

// Delete product (owner or admin)
router.delete('/:id', productController.deleteProduct);

// Fair price rating (buyers only)
router.post(
  '/:id/fair-price',
  authMiddleware.restrictTo('buyer', 'admin'),
  productController.addFairPriceRating
);

module.exports = router;
