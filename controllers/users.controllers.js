const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../models/user.model')

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError')

const getAllUsers = catchAsync(async (req, res, next) => {
  //SELECT * from users
  const users = await User.findAll({
    attributes: {exclude: ['password']}
  });

  res.status(200).json({
    users
  });
});

const createNewUser = catchAsync(async (req, res, next) => {

  const {name, email, password, role} = req.body

  const salt = await bcrypt.genSalt(12)
  const hashPwd = await bcrypt.hash(password, salt)

  //Simple INSERT query
  const newUser = await User.create(
    {
      name,
      email,
      password: hashPwd,
      role
    })
  
  //remove password from response not db
  newUser.password = undefined
  
  res.status(201).json({ newUser });
  
});

const getUserByID = catchAsync(async (req, res, next) => {

    const { user } = req
    
    res.status(200).json({
      user,
    });
});

const updateUser = catchAsync(async (req, res, next)  => {

    const { user } = req

    //fields to update
    const { name, email } = req.body
    
    await user.update({name, email})

    res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next)  => {

    const { user } = req
    
    await user.update({status: 'deleted'})

    res.status(200).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body

  const user = await User.findOne({
    where: {email, status: 'active'}
  })
  
  if (!user) {
    return next(new AppError('invalid credentials', 400))
  }

  const decode = await bcrypt.compare(password, user.password)

  if (!decode) {
    return next(new AppError('invalid credentials', 400))
  }

  // Generate JWT
  const token = await jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN,}
  );

  user.password = undefined

  res.status(200).json({token, user})

})

module.exports = {
  getAllUsers,
  createNewUser,
  getUserByID,
  updateUser,
  deleteUser,
  login
};
