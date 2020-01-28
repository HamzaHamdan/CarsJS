const express = require('express');
const db = require('../config/database.js');
//const unique = require('array-unique');
//const equal = require('deep-equal');
const utils = require('../utils/utils');

const router = express.Router();

router.get('/', (req, res) => {

    let carsArray = [];
    let carMakeArray = [];
    db.car.findAll({ include: [db.make, db.model] }).then(function (result) {
        result.forEach((element) => {
            const carObject = {
                carMake: element.dataValues.carMake.dataValues.make,
                carMakeId: element.dataValues.carMakeId
            };
            carsArray.push(carObject);
        });
        carMakeArray = utils.arrayDuplicateRemover(carsArray, 'carMake');
        res.render('index', { carMakeArray: carMakeArray, navBarLinks: utils.navBarFiller(res) });
    });
});

router.post('/getMakeModels', function (req, res) {
    let carsArray = [];
    let carModelsArray = [];
    db.car.findAll({ include: [db.make, db.model], where: { carMakeId: req.body.makeId } }).then(function (result) {
        result.forEach((element) => {
            const carObject = {
                carModel: element.dataValues.carModel.dataValues.model,
                carModelId: element.dataValues.carModelId
            };
            carsArray.push(carObject);
        });
        carModelsArray = utils.arrayDuplicateRemover(carsArray, 'carModel');
        res.send({ carModelsArray: carModelsArray });
    });
});

router.post('/getModelYears', function (req, res) {

    var makeId = req.body.makeId;
    var modelId = req.body.modelId;

    let carsArray = [];
    let carYearsArray = [];
    db.car.findAll({ include: [db.make, db.model], where: { carMakeId: makeId, carModelId: modelId } }).then(function (result) {
        result.forEach((element) => {
            const carObject = {
                carYear: element.dataValues.carYear
            };
            carsArray.push(carObject);
        });
        carYearsArray = utils.arrayDuplicateRemover(carsArray, 'carYear');
        //console.log("TCL: carYearsArray", carYearsArray)
        res.send({ carYearsArray: carYearsArray });
    });
});

module.exports = router;
