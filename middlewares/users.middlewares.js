const jwt = require('jsonwebtoken')
require('dotenv').config()

// Models
const { User } = require('../models/user.model');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const protectToken = catchAsync(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new AppError('session invalid', 403))
  }

  //hasta aqui tenemos un token, solo texto, pero no sabemos si es valido o no

  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
  
  //ejemplo de lo que me devuelve decodedToken: { id: 2, iat: 1652110486, exp: 1652715286 }

  //validamos que el usuario que hizo la peticion exista en la aplicacion y que su cuenta siga siendo activa
  
  const userSession = await User.findOne({
    where: {id: decodedToken.id, status: 'active' }
  });

  if (!userSession) {
    return next(new AppError('The owner not longer available', 403))
  }
  
  req.userSession = userSession
  next();
})

const protectRole = catchAsync(async (req, res, next) => {
  const { userSession } = req

  if (userSession.role !== 'employee') {
    return next(new AppError('you are not authorized', 403))
  }

  next()
})

const protectAccountOwner = catchAsync(async (req, res, next) => {
  
  const { userSession, user } = req
  
  if (userSession.id !== user.id) {
    return next(new AppError('you are not authorized', 403))
  }

  next()
})

const userExists = catchAsync(async (req, res, next) => {

  const { id } = req.params;
    
  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] },
  });
    
  if (!user) {
    return next(new AppError('User does not exist with given Id', 404));
  }

  // Add user data to the req object
  req.user = user;
  next();
});


module.exports = {
  userExists,
  protectToken,
  protectRole,
  protectAccountOwner
};