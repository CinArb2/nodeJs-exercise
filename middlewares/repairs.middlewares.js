// Models
const { Repair } = require('../models/repair.model')

const serviceExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id, status: 'pending' } });
    
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Repair not found given that id',
      });
    }

    // Add user data to the req object
    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { serviceExists };