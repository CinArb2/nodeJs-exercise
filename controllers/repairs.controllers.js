const { Repair } = require('../models/repair.model')
const {User} = require('../models/user.model')

const getAllPendingRepairs = async (req, res) => {
  try {
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

  } catch (error) {
    console.log(error);
  }
}

const createAppointment = async (req, res) => {
  try {
    const { date,
      userId,
      computerNumber,
      comments
    } = req.body

  const newAppointment = await Repair.create({ date, userId,computerNumber, comments});

  res.status(201).json({ newAppointment });
  } catch (error) {
    console.log(error)
  }
}

const getPendingRepairByID = async (req, res) => {

  try {

    //middleware added new data to request - we detructure here
    const { repair } = req
    
    res.status(200).json({
      repair
    });
  } catch (error) {
    console.log(error)
  }
}

const updateRepairStatus = async (req, res) => {
  try {
    const { repair } = req

    //fields to update
    const { status } = req.body

    if (status !== 'completed') {
      return res.status(400).json({"error": "Bad request"})
    }
    
    await repair.update({status})
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
}

const cancelRepair = async (req, res) => {
  try {
    const { repair } = req
    
    await repair.update({status: 'canceled'})

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllPendingRepairs,
  createAppointment,
  getPendingRepairByID,
  updateRepairStatus,
  cancelRepair
};
