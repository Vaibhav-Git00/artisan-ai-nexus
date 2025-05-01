const express = require('express');
const trainingController = require('../controllers/training.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', trainingController.getAllModules);
router.get('/featured', trainingController.getFeaturedModules);
router.get('/category/:category', trainingController.getModulesByCategory);
router.get('/:id', trainingController.getModuleById);

// Protected routes
router.use(authMiddleware.protect);

// Track progress and downloads
router.post('/:id/progress', trainingController.updateProgress);
router.post('/:id/resource/:resourceId', trainingController.trackResourceDownload);
router.get('/progress', trainingController.getUserProgress);

// Admin only routes
router.use(authMiddleware.restrictTo('admin'));

// CRUD operations for admins
router.post('/', trainingController.createModule);
router.put('/:id', trainingController.updateModule);
router.delete('/:id', trainingController.deleteModule);

module.exports = router;
