const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  budget: Number,
  timeline: {
    start: Date,
    end: Date
  },
  milestones: [{
    name: String,
    dueDate: Date,
    isCompleted: Boolean
  }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
