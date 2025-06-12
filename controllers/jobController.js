const Job = require('../models/job');

// @desc    Post a new freelance job
// @route   POST /api/jobs
// @access  Private (requires authMiddleware)
const postJob = async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;

    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newJob = new Job({
      title,
      description,
      budget,
      deadline,
      postedBy: req.user.id,
    });

    await newJob.save();

    res.status(201).json({
      message: 'Job posted successfully',
      job: newJob
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  postJob,
};
