const express = require('express');
const db = require('../config/database.js');
//const unique = require('array-unique');
//const equal = require('deep-equal');
const utils = require('../utils/utils');

const router = express.Router();

router.get('/', (req, res) => {

    let navBarLinks = [];
    if (res.locals.currentUser && res.locals.currentUser == '9953274d-da9b-49d1-bc02-ae91ce553561') {
        console.log("user1:" + res.locals.currentUser);
        navBarLinks.push({ hrefVal: '/admin/makes', linkName: 'Makes' });
        navBarLinks.push({ hrefVal: '/admin/models', linkName: 'Models' });
        navBarLinks.push({ hrefVal: '/admin/manageVehicles/' + res.locals.currentUser, linkName: 'Vehicles' });
        navBarLinks.push({ hrefVal: '/admin/listScheduledTestDrives/' + res.locals.currentUser, linkName: 'Test Drives' });
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else if (res.locals.currentUser && res.locals.currentUser != '9953274d-da9b-49d1-bc02-ae91ce553561') {
        console.log("user2:" + res.locals.currentUser);
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/admin/listScheduledTestDrives/' + res.locals.currentUser, linkName: 'Test Drives' });
        navBarLinks.push({ hrefVal: '/admin/manageVehicles/' + res.locals.currentUser, linkName: 'My Vehicles' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else {
        console.log("user3:" + res.locals.currentUser);
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/register', linkName: 'Register' });
        navBarLinks.push({ hrefVal: '/users/login', linkName: 'Login' });
    };

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
        carMakeArray = utils(carsArray, 'carMake');
        res.render('index', { carMakeArray: carMakeArray, navBarLinks: navBarLinks/* , vCount: carsArray.length */ });
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
        carModelsArray = utils(carsArray, 'carModel');
        res.send({ carModelsArray: carModelsArray/* , vCount: carsArray.length */ });
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
        carYearsArray = utils(carsArray, 'carYear');
        console.log("TCL: carYearsArray", carYearsArray)
        res.send({ carYearsArray: carYearsArray/* , vCount: carsArray.length */ });
    });
});

module.exports = router;
