const express = require('express');

const { getAllPendingRepairs,
  createAppointment,
  getPendingRepairByID,
  cancelRepair,
  updateRepairStatus
} = require('../controllers/repairs.controllers')

// Middlewares
const { serviceExists } = require('../middlewares/repairs.middlewares')
const {createRepairValidations, checkValidations } = require('../middlewares/validations.middlewares')

const router = express.Router()

router.route('/')
  .get(getAllPendingRepairs)
  .post(createRepairValidations, checkValidations, createAppointment)

router.route('/:id')
  .get(serviceExists, getPendingRepairByID)
  .patch(serviceExists, updateRepairStatus)
  .delete(serviceExists, cancelRepair)

module.exports = {repairsRouter: router}