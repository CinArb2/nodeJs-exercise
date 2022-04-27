const { User } = require('../models/user.model')


const getAllUsers = async (req, res) => {
  try {
    //SELECT * from users
    const users = await User.findAll();

    res.status(200).json({
      users
    });

  } catch (error) {
    console.log(error);
  }
}

const createNewUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

const getUserByID = async (req, res) => {

  try {

    //middleware added new data to request - we detructure here
    const { user } = req
    
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const { user } = req

    //fields to update
    const { name, email } = req.body
    
    await user.update({name, email})

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const { user } = req
    
    await user.update({status: 'deleted'})

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUserByID,
  updateUser,
  deleteUser
};
