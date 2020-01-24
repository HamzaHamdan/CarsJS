const Sequelize = require('sequelize');
const db = require('../config/database');

const Car = db.define('car', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carVinNum: {
    type: Sequelize.STRING
  },
  makeId: {
    type: Sequelize.STRING
  },
  modelId: {
    type: Sequelize.STRING
  },
  carYear: {
    type: Sequelize.STRING
  },
  carColor: {
    type: Sequelize.STRING
  },
  carMilage: {
    type: Sequelize.STRING
  },
  carPrice: {
    type: Sequelize.STRING
  }
});

module.exports = Car;
