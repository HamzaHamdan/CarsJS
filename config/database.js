const Sequelize = require('sequelize');

module.exports = new Sequelize('cars_db', 'root', '#Tortas77!', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});
