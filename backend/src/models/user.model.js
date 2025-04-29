
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password should be at least 6 characters long'],
      select: false
    },
    role: {
      type: String,
      enum: ['artisan', 'buyer', 'admin'],
      default: 'buyer'
    },
    bio: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    profileImage: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual field for products (if an artisan)
userSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'artisan'
});

// Virtual field for stories
userSchema.virtual('stories', {
  ref: 'Story',
  localField: '_id',
  foreignField: 'creator'
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
