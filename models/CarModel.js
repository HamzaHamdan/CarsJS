const Sequelize = require('sequelize');
const db = require('../config/database');

const CarModel = db.define('carModel', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    makeId: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    }
});

module.exports = CarModel;
