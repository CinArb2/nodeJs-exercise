const { User } = require('../models/user.model')

// Utils
const { catchAsync } = require('../utils/catchAsync');


const getAllUsers = catchAsync(async (req, res, next) => {
  //SELECT * from users
  const users = await User.findAll();

  res.status(200).json({
    users
  });
});

const createNewUser = catchAsync(async (req, res, next) => {

  const {name, email, password, role} = req.body

  //Simple INSERT query
  const newUser = await User.create(
    {
      name,
      email,
      password,
      role
    })

  res.status(201).json({ newUser });
  
});

const getUserByID = catchAsync(async (req, res, next) => {


    //middleware added new data to request - we detructure here
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

module.exports = {
  getAllUsers,
  createNewUser,
  getUserByID,
  updateUser,
  deleteUser
};
