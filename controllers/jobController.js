const Job = require('../models/job');

// @desc    Post a new freelance job
// @route   POST /api/jobs
// @access  Private
const postJob = async (req, res) => {
  try {
    const { title, description, budget, deadline, skills } = req.body;

    // Validate required fields
    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: 'All fields except skills are required' });
    }

    // Optional: Validate that skills is an array
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array of strings' });
    }

    const newJob = new Job({
      title,
      description,
      budget,
      deadline,
      skills, // ✅ Added skills here
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

// ✅ @desc    Get all freelance jobs
// ✅ @route   GET /api/jobs
// ✅ @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  postJob,
  getJobs,
};
