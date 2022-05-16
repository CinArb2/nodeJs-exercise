const express = require('express');

const {protectToken, protectRole} = require('../middlewares/users.middlewares')

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

router.use('/', protectToken)

router.post('/', createRepairValidations, checkValidations, createAppointment)

router.use('/', protectRole)

router.get('/', getAllPendingRepairs)

router.route('/:id')
  .get(serviceExists, getPendingRepairByID)
  .patch(serviceExists, updateRepairStatus)
  .delete(serviceExists, cancelRepair)

module.exports = {repairsRouter: router}