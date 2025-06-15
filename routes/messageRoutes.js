const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { sendMessage } = require('../controllers/advancedFeatureController');

// ✅ Define the route
router.post('/send', authenticate, sendMessage);

module.exports = router;
