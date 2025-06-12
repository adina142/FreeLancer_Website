const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/jobs
// @desc    Post a new freelance job
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, budget, deadline, skills } = req.body;

    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ message: 'All fields except skills are required' });
    }

    // Optional validation for skills array
    if (skills && !Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array of strings' });
    }

    const newJob = new Job({
      title,
      description,
      budget,
      deadline,
      skills, // ✅ Include skills
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs
// @desc    Get all freelance jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

module.exports = router;
