const { db } = require('../utils/database')
const { DataTypes } = require('sequelize')

const User = db.define('user', {
  // Model attributes are defined here
  id: {
    autoIncrement: true, //managed by postgres
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  }
});


module.exports = { User }

