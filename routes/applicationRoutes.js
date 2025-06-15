const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');


const {
  submitApplication,
  getDashboardStats,
  getSuggestedJobs,
} = require('../controllers/advancedFeatureController');

// Apply to a job
router.post('/apply', authenticate, submitApplication);
// Suggested jobs
router.get('/suggested', authenticate, getSuggestedJobs);
// Dashboard stats
router.get('/dashboard', authenticate, getDashboardStats);

module.exports = router;