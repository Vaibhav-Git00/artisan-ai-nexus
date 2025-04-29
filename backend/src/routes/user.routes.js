
const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

// Public route to get artisans
router.get('/artisans', userController.getArtisans);

// Admin only routes
router.use(authMiddleware.restrictTo('admin'));

router.route('/')
  .get(userController.getAllUsers);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
