const express = require('express');
const { getAllPendingRepairs,
  createAppointment,
  getPendingRepairByID,
  cancelRepair,
  updateRepairStatus
} = require('../controllers/repairs.controllers')

const { serviceExists } = require('../middlewares/repairs.middlewares')

const router = express.Router()

router.route('/')
  .get(getAllPendingRepairs)
  .post(createAppointment)

router.route('/:id')
  .get(serviceExists, getPendingRepairByID)
  .patch(serviceExists, updateRepairStatus)
  .delete(serviceExists, cancelRepair)

module.exports = {repairsRouter: router}