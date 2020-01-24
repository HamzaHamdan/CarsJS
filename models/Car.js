const Sequelize = require('sequelize');
const db = require('../config/database');

const Car = db.define('car', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vin: {
    type: Sequelize.STRING
  },
  makeId: {
    type: Sequelize.STRING
  },
  modelId: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  milage: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  }
});

module.exports = Car;
