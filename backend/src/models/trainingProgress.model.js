const mongoose = require('mongoose');

const trainingProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainingModule',
      required: [true, 'Module ID is required']
    },
    progress: {
      type: Number,
      required: [true, 'Progress percentage is required'],
      min: 0,
      max: 100,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    resourcesDownloaded: [
      {
        resourceId: String,
        downloadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    notes: String
  },
  {
    timestamps: true
  }
);

// Compound index to ensure a user can only have one progress record per module
trainingProgressSchema.index({ user: 1, module: 1 }, { unique: true });

const TrainingProgress = mongoose.model('TrainingProgress', trainingProgressSchema);

module.exports = TrainingProgress;
