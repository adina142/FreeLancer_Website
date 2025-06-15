const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Application = require('../models/Application');
const authenticate = require('../middleware/auth');

// Dashboard analytics
router.get('/client', authenticate, async (req, res) => {
  const jobs = await Job.find({ postedBy: req.user.id });
  const jobIds = jobs.map(job => job._id);
  const applications = await Application.find({ job: { $in: jobIds } });

  res.json({
    totalJobs: jobs.length,
    totalApplications: applications.length,
  });
});

router.get('/freelancer', authenticate, async (req, res) => {
  const applications = await Application.find({ freelancer: req.user.id });

  res.json({
    totalApplications: applications.length,
    accepted: applications.filter(app => app.status === 'Accepted').length,
    pending: applications.filter(app => app.status === 'Pending').length,
  });
});

module.exports = router;
