const Sequelize = require('sequelize');
const db = require('../config/database');

const CarMake = db.define('carMake', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    make: {
        type: Sequelize.STRING
    }
});

module.exports = CarMake;
