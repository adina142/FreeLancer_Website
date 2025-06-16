const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['client', 'freelancer'], default: 'client' },
  skills: [String],
  rating: Number,
  isVerified: Boolean
});

module.exports = mongoose.model('User', UserSchema);
