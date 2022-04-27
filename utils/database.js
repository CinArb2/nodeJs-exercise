//connecting to database
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'Colombia2022',
  port: 8000,
  database: 'users',
  logging: false,
});

module.exports = { db };