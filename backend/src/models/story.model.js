
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Story title is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Story content is required']
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator information is required']
    },
    mediaType: {
      type: String,
      enum: ['text', 'audio', 'video', 'mixed'],
      default: 'text'
    },
    mediaUrls: [String],
    relatedProducts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    culturalTags: [String],
    region: String,
    language: String,
    aiGenerated: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    }
  },
  {
    timestamps: true
  }
);

// Add full-text search index
storySchema.index({ 
  title: 'text', 
  content: 'text', 
  culturalTags: 'text',
  region: 'text'
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
