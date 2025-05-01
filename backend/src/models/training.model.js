const mongoose = require('mongoose');

const trainingModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Module description is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['photography', 'pricing', 'packaging', 'marketing', 'orders', 'shipping']
    },
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: ['beginner', 'intermediate', 'advanced']
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute']
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail image is required']
    },
    contentLanguage: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['english', 'hindi'],
      default: 'english'
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required']
    },
    resources: [
      {
        title: {
          type: String,
          required: true
        },
        fileUrl: {
          type: String,
          required: true
        },
        fileType: {
          type: String,
          enum: ['pdf', 'doc', 'xls', 'ppt', 'zip', 'other'],
          default: 'pdf'
        },
        description: String
      }
    ],
    learningPoints: [String],
    featured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published'
    }
  },
  {
    timestamps: true
  }
);

// Add full-text search index
trainingModuleSchema.index({
  title: 'text',
  description: 'text',
  category: 'text',
  learningPoints: 'text'
});

const TrainingModule = mongoose.model('TrainingModule', trainingModuleSchema);

module.exports = TrainingModule;
