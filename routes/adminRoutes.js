const express = require('express');
const router = express.Router();
const db = require('../config/database.js');
const utils = require('../utils/utils');

router.get('/makes', function (req, res) {

    db.make.findAll({}).then(
        (result) => {
            let carMakesArray = [];
            //let makesMap = new Map();
            result.forEach((make) => {
                carMakesArray.push(make.dataValues);
                console.log(make.dataValues);
            });
            //console.log(carMakesArray);
            res.render('makes', { carMakesArray: carMakesArray, navBarLinks: utils.navBarFiller(res) });
        }
    );
});

router.post('/manageMakes', (req, res) => {
    //console.log("1");
    let errors = [];
    if (!req.body.makeName || typeof req.body.makeName == 'undefined') {
        //console.log("2");
        errors.push({ msg: 'Fill in all form fields!' });
        //console.log(errors);

        db.make.findAll({}).then(
            (result) => {
                let carMakesArray = [];
                //let makesMap = new Map();
                result.forEach((make) => {
                    carMakesArray.push(make.dataValues);
                    //console.log(make.dataValues);
                });
                //console.log(carMakesArray);
                res.render('makes', { carMakesArray: carMakesArray, errors: errors, navBarLinks: utils.navBarFiller(res) });
            }
        );

    } else {

        //console.log("3");
        db.make.create({ make: req.body.makeName }).then(function () {
            db.make.findAll({}).then(
                (result) => {
                    let carMakesArray = [];
                    //let makesMap = new Map();
                    result.forEach((make) => {
                        carMakesArray.push(make.dataValues);
                        //console.log(make.dataValues);
                    });
                    //console.log(carMakesArray);
                    res.render('makes', { carMakesArray: carMakesArray, navBarLinks: utils.navBarFiller(res) });
                }
            );

        }).catch(function (err) {
            //console.log("4");
            console.log("Error!: " + err.message);
        });
    }

});

router.delete('/manageMakes/:makeId', (req, res) => {
    //console.log(req.params.makeId);
    db.make.destroy({ where: { id: req.params.makeId } }).then(function () {
        //res.status('makes');
        res.status(200).end();
    });
});

router.delete('/deleteTestDrive', (req, res) => {
    //console.log(req.body.testId);
    db.schedule.destroy({ where: { id: req.body.testId } }).then(function () {
        res.render('listtestdrives');
    });
});

router.get('/models', function (req, res) {

    let carMakesModelsArray = [];
    let carMakesArray = [];

    db.model.findAll({ include: [db.make] }).then(function (result) {
        result.forEach((element) => {
            carMakesModelsArray.push({
                id: element.dataValues.id,
                model: element.dataValues.model,
                carMakeId: element.dataValues.carMakeId,
                carMake: element.dataValues.carMake.dataValues.make,
                createdAt: element.dataValues.createdAt
            });
        });

        db.make.findAll({}).then((result) => {
            result.forEach((element) => {
                carMakesArray.push(element.dataValues);
            });
            res.render('models', { navBarLinks: utils.navBarFiller(res), carMakesModelsArray: carMakesModelsArray, carMakesArray: carMakesArray });
        });

    });
});

router.post('/addModel', (req, res) => {



    let errors = [];
    if (!req.body.modelName || typeof req.body.modelName == 'undefined') {

        errors.push({ msg: 'Fill in all form fields' });

        let carMakesModelsArray = [];
        let carMakesArray = [];

        db.model.findAll({ include: [db.make] }).then(function (result) {
            result.forEach((element) => {
                carMakesModelsArray.push({
                    id: element.dataValues.id,
                    model: element.dataValues.model,
                    carMakeId: element.dataValues.carMakeId,
                    carMake: element.dataValues.carMake.dataValues.make,
                    createdAt: element.dataValues.createdAt
                });
            });

            db.make.findAll({}).then((result) => {
                result.forEach((element) => {
                    carMakesArray.push(element.dataValues);
                });
                res.render('models', { navBarLinks: utils.navBarFiller(res), errors: errors, carMakesModelsArray: carMakesModelsArray, carMakesArray: carMakesArray });
            });

        });

    } else {

        let carMakesModelsArray = [];
        let carMakesArray = [];
        //console.log(req.body);
        db.make.findOne({ where: { id: req.body.makeId } }).then((result) => {
            db.model.create({ model: req.body.modelName, carMakeId: result.dataValues.id }).then(function () {
                db.model.findAll({ include: [db.make] }).then(function (result) {
                    result.forEach((element) => {
                        carMakesModelsArray.push({
                            id: element.dataValues.id,
                            model: element.dataValues.model,
                            carMakeId: element.dataValues.carMakeId,
                            carMake: element.dataValues.carMake.dataValues.make,
                            createdAt: element.dataValues.createdAt
                        });
                    });

                    db.make.findAll({}).then((result) => {
                        result.forEach((element) => {
                            carMakesArray.push(element.dataValues);
                        });
                        //console.log(carMakesArray);
                        res.render('models', { navBarLinks: utils.navBarFiller(res), carMakesModelsArray: carMakesModelsArray, carMakesArray: carMakesArray });
                    });
                });
            });
        });
    }
});

router.delete('/manageModels/:modelId', (req, res) => {
    db.model.destroy({ where: { id: req.params.modelId } }).then(function () {
        //console.log(req.params.modelId);
        //res.render('models');
        res.status(200).end();
    });
});

router.delete('/deleteCar', (req, res) => {
    db.car.destroy({ where: { id: req.body.carId } }).then(function () {
        res.render('manageVehicles');
    });
});

router.get('/listScheduledTestDrives/:userId', function (req, res) {


    if (req.params.userId == '9953274d-da9b-49d1-bc02-ae91ce553561') {
        db.schedule.findAll({}).then(
            (result) => {
                let schedulesArray = [];
                result.forEach((schedule) => {
                    schedulesArray.push(schedule.dataValues);
                });
                res.render('listtestdrives', { schedulesArray: schedulesArray, navBarLinks: utils.navBarFiller(res) });
            }
        );
    } else if (req.params.userId && req.params.userId != '9953274d-da9b-49d1-bc02-ae91ce553561') {
        let schedulesArray = [];
        let carsArray = [];
        db.car.findAll({ where: { userId: req.params.userId } }).then((result) => {
            result.forEach((element) => {
                carsArray.push(element.dataValues.id);
            });

            db.schedule.findAll({ where: { carId: carsArray } }).then(
                (result) => {
                    result.forEach((schedule) => {
                        schedulesArray.push(schedule.dataValues);
                    });
                    res.render('listtestdrives', { schedulesArray: schedulesArray, navBarLinks: utils.navBarFiller(res) });
                }
            );
        });
    }
});

router.get('/manageVehicles/:userId', function (req, res) {

    if (req.params.userId == '9953274d-da9b-49d1-bc02-ae91ce553561') {
        db.car.findAll({}).then(
            (result) => {
                let vehiclesArray = [];
                result.forEach((car) => {
                    vehiclesArray.push(car.dataValues);
                });
                //console.log(vehiclesArray);
                res.render('manageVehicles', { vehiclesArray: vehiclesArray, navBarLinks: utils.navBarFiller(res) });
            }
        );
    } else if (req.params.userId && req.params.userId != '9953274d-da9b-49d1-bc02-ae91ce553561') {
        db.car.findAll({ where: { userId: res.locals.currentUser } }).then(
            (result) => {
                let vehiclesArray = [];
                result.forEach((car) => {
                    vehiclesArray.push(car.dataValues);
                });
                //console.log(vehiclesArray);
                res.render('manageVehicles', { vehiclesArray: vehiclesArray, navBarLinks: utils.navBarFiller(res) });
            }
        );
    }

});

module.exports = router;