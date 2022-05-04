const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError');



const createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRepairValidations = [
  body('date')
    .notEmpty()
    .withMessage('date cannot be empty')
    .trim()
    .isDate()
    .withMessage('Must be a valid date')
  ,
  body('computerNumber')
    .notEmpty()
    .withMessage('computerNumber cannot be empty'),
  body('comments')
    .notEmpty()
    .withMessage('comments cannot be empty')
    .isLength({ min: 8, max: 100 })
    .withMessage('comments must be at least 8 characters long and maximum 100 characters')
  ,
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 404));
  }

  next();
};

module.exports = {
  createUserValidations,
  createRepairValidations,
  checkValidations,
};