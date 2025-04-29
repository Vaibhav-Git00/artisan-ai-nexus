
const jwt = require('jsonwebtoken');

exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d'
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = this.signToken(user._id);
  
  // Remove sensitive data
  user.password = undefined;
  
  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user
    }
  });
};
