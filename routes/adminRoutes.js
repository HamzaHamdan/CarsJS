const express = require('express');
const router = express.Router();
const CarMake = require('../models/CarMake');

router.get('/makes', (req, res) => {
    let carMakesArray = [];
    CarMake.findAll({}).then((result) => {
        result.forEach((make) => {
            carMakesArray.push(make.dataValues.make);
        });
        res.render('makes', { carMakesArray: carMakesArray });
    });
});

router.post('/addMake', (req, res) => {
    CarMake.create({ make: req.body.makeName }).then(function () {
        let carMakesArray = [];
        CarMake.findAll({}).then((result) => {
            result.forEach((make) => {
                carMakesArray.push(make.dataValues.make);
            });
        });
    });
});

module.exports = router;