const { Repair } = require('../models/repair.model')
const { User } = require('../models/user.model')

const { catchAsync } = require('../utils/catchAsync');

const getAllPendingRepairs = catchAsync(async (req, res) => {
    //SELECT * from users
    const repairs = await Repair.findAll({
      where: {
      status: 'pending',
      },
      include: [{ model: User }],
    });

    res.status(200).json({
      repairs
    });
});

const createAppointment = catchAsync(async (req, res) => {
  const { date,
      userId,
      computerNumber,
      comments
    } = req.body

  const newAppointment = await Repair.create({ date, userId,computerNumber, comments});

  res.status(201).json({ newAppointment });
});

const getPendingRepairByID = catchAsync(async (req, res) => {

    //middleware added new data to request - we detructure here
    const { repair } = req
    
    res.status(200).json({
      repair
    });
});

const updateRepairStatus = catchAsync(async (req, res) => {

    const { repair } = req

    //fields to update
    const { status } = req.body

    if (status !== 'completed') {
      return res.status(400).json({"error": "Bad request"})
    }
    
    await repair.update({status})
    res.status(200).json({ status: 'success' });
});

const cancelRepair = catchAsync(async (req, res) => {

    const { repair } = req
    
    await repair.update({status: 'canceled'})

    res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllPendingRepairs,
  createAppointment,
  getPendingRepairByID,
  updateRepairStatus,
  cancelRepair
};
