const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Mongoose model
const authMiddleware = require('../middleware/auth'); // Optional: protect route

// @route   POST /api/jobs
// @desc    Post a new freelance job
// @access  Private (optional)
router.post('/', authMiddleware, async (req, res) => {
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
      postedBy: req.user.id, // if using auth
    });

    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
