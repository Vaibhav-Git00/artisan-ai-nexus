
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative']
    },
    fairPriceData: {
      suggestedPrice: Number,
      communityRatings: [{
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }]
    },
    images: [String],
    category: {
      type: String,
      required: [true, 'Product category is required']
    },
    materials: {
      type: [String],
      default: []
    },
    tags: [String],
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Artisan information is required']
    },
    stock: {
      type: Number,
      default: 1,
      min: [0, 'Stock cannot be negative']
    },
    ecoScore: {
      score: {
        type: Number,
        min: 0,
        max: 10
      },
      materialsSustainability: {
        type: Number,
        min: 0,
        max: 10
      },
      productionProcess: {
        type: Number,
        min: 0,
        max: 10
      },
      packaging: {
        type: Number,
        min: 0,
        max: 10
      },
      transportFootprint: {
        type: Number,
        min: 0,
        max: 10
      }
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'published', 'rejected'],
      default: 'draft'
    },
    storyVideo: {
      type: String,
      default: null
    },
    storyVideoType: {
      type: String,
      enum: ['youtube', 'vimeo', 'upload', null],
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Add full-text search index
productSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  tags: 'text'
});

// Virtual field for related stories
productSchema.virtual('stories', {
  ref: 'Story',
  localField: '_id',
  foreignField: 'relatedProducts'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
