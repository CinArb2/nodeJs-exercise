// Models
const { Repair } = require('../models/repair.model')

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const serviceExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id, status: 'pending' } });
  
  if (!repair) {
    return next(new AppError('Repair not found given that id', 404));
  }

  // Add user data to the req object
  req.repair = repair;
  next();
});

module.exports = { serviceExists };