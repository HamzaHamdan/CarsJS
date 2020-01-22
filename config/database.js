const Sequelize = require('sequelize');

module.exports = new Sequelize('cars_db', 'root', 'Admin123$#', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3315
});
