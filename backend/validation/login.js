const { body, validationResult } = require('express-validator');

exports.validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8 })
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

