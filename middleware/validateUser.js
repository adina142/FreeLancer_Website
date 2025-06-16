const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('username').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    next();
  }
];
