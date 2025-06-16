const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true },
  password: String,
  profile: {
    bio: String,
    image: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String
    }
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExtendedUser', UserSchema);
