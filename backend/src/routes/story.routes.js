
const express = require('express');
const storyController = require('../controllers/story.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', storyController.getAllStories);
router.get('/cultural-tags/:tag', storyController.getStoriesByTag);
router.get('/region/:regionName', storyController.getStoriesByRegion);
router.get('/search/:query', storyController.searchStories);
router.get('/:id', storyController.getStoryById);

// Protected routes
router.use(authMiddleware.protect);

// Create story
router.post('/', storyController.createStory);

// Update story (owner or admin)
router.put('/:id', storyController.updateStory);

// Delete story (owner or admin)
router.delete('/:id', storyController.deleteStory);

module.exports = router;
