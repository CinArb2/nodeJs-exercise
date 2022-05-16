const express = require('express');

const { getAllUsers,
  createNewUser,
  getUserByID,
  updateUser,
  deleteUser,
  login
} = require('../controllers/users.controllers')

// Middlewares
const { userExists,
  protectToken,
  protectAccountOwner,
  protectRole} = require('../middlewares/users.middlewares')
const {createUserValidations, checkValidations } = require('../middlewares/validations.middlewares')

//creating router object
const router = express.Router()

router.post('/login', login)
router.post('/', createUserValidations, checkValidations, createNewUser)

router.use('/', protectToken)

router.get('/', getAllUsers)

router.route('/:id')
  .get(protectRole, userExists, getUserByID)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser)

module.exports = {usersRouter: router}