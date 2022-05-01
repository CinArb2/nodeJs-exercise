const express = require('express');

const { getAllUsers,
  createNewUser,
  getUserByID,
  updateUser,
  deleteUser
} = require('../controllers/users.controllers')

// Middlewares
const {userExists} = require('../middlewares/users.middlewares')
const {createUserValidations, checkValidations } = require('../middlewares/validations.middlewares')

//creating router object
const router = express.Router()

//route() for those methods that share same endpoint

router.route('/')
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, createNewUser)

router.route('/:id')
  .get(userExists, getUserByID)
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser)

module.exports = {usersRouter: router}