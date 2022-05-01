const { db } = require('../utils/database')
const { DataTypes } = require('sequelize')

const Repair = db.define('repair', {
  // Model attributes are defined here
  id: {
    autoIncrement: true, //managed by postgres
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  computerNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});


module.exports = { Repair }