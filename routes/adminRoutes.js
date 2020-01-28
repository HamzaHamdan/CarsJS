const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

router.get('/makes', function (req, res) {

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

    db.make.findAll({}).then(
        (result) => {
            let carMakesArray = [];
            //let makesMap = new Map();
            result.forEach((make) => {
                carMakesArray.push(make.dataValues);
                console.log(make.dataValues);
            });
            //console.log(carMakesArray);
            res.render('makes', { carMakesArray: carMakesArray, navBarLinks: navBarLinks });
        }
    );
});

router.post('/addMake', (req, res) => {
    console.log("1");
    let errors = [];
    if (!req.body.makeName || typeof req.body.makeName == 'undefined') {
        console.log("2");
        errors.push({ msg: 'Fill in all form fields!' });
        console.log(errors);

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

        db.make.findAll({}).then(
            (result) => {
                let carMakesArray = [];
                //let makesMap = new Map();
                result.forEach((make) => {
                    carMakesArray.push(make.dataValues);
                    console.log(make.dataValues);
                });
                //console.log(carMakesArray);
                res.render('makes', { carMakesArray: carMakesArray, errors: errors, navBarLinks: navBarLinks });
            }
        );

    } else {

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



        console.log("3");
        db.make.create({ make: req.body.makeName }).then(function () {
            db.make.findAll({}).then(
                (result) => {
                    let carMakesArray = [];
                    //let makesMap = new Map();
                    result.forEach((make) => {
                        carMakesArray.push(make.dataValues);
                        console.log(make.dataValues);
                    });
                    //console.log(carMakesArray);
                    res.render('makes', { carMakesArray: carMakesArray, navBarLinks: navBarLinks });
                }
            );

        }).catch(function (err) {
            console.log("4");
            console.log("Error!: " + err.message);
        });
    }

});

router.delete('/deleteMake', (req, res) => {
    console.log(req.body.makeId);
    db.make.destroy({ where: { id: req.body.makeId } }).then(function () {
        res.render('makes');
    });
});

router.delete('/deleteTestDrive', (req, res) => {
    console.log(req.body.testId);
    db.schedule.destroy({ where: { id: req.body.testId } }).then(function () {
        res.render('listtestdrives');
    });
});

router.get('/models', function (req, res) {

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
            res.render('models', { navBarLinks: navBarLinks, carMakesModelsArray: carMakesModelsArray, carMakesArray: carMakesArray });
        });

    });
});

router.post('/addModel', (req, res) => {



    let errors = [];
    if (!req.body.modelName || typeof req.body.modelName == 'undefined') {

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
                res.render('models', { navBarLinks: navBarLinks, errors: errors, carMakesModelsArray: carMakesModelsArray, carMakesArray: carMakesArray });
            });

        });

    } else {



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

        let carMakesModelsArray = [];
        let carMakesArray = [];
        console.log(req.body);
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
                        console.log(carMakesArray);
                        res.render('models', { navBarLinks: navBarLinks, carMakesModelsArray: carMakesModelsArray, carMakesArray: carMakesArray });
                    });
                });
            });
        });
    }
});

router.delete('/addModel', (req, res) => {
    console.log("###################################");
    db.model.destroy({ where: { id: req.body.modelId } }).then(function () {
        console.log(req.body.modelId);
        res.render('models');
    });
});

router.delete('/deleteCar', (req, res) => {
    db.car.destroy({ where: { id: req.body.carId } }).then(function () {
        res.render('manageVehicles');
    });
});

router.get('/listScheduledTestDrives/:userId', function (req, res) {

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

    if (req.params.userId == '9953274d-da9b-49d1-bc02-ae91ce553561') {
        db.schedule.findAll({}).then(
            (result) => {
                let schedulesArray = [];
                result.forEach((schedule) => {
                    schedulesArray.push(schedule.dataValues);
                });
                res.render('listtestdrives', { schedulesArray: schedulesArray, navBarLinks: navBarLinks });
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
                    res.render('listtestdrives', { schedulesArray: schedulesArray, navBarLinks: navBarLinks });
                }
            );
        });
    }
});

router.get('/manageVehicles/:userId', function (req, res) {

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


    if (req.params.userId == '9953274d-da9b-49d1-bc02-ae91ce553561') {
        db.car.findAll({}).then(
            (result) => {
                let vehiclesArray = [];
                result.forEach((car) => {
                    vehiclesArray.push(car.dataValues);
                });
                console.log(vehiclesArray);
                res.render('manageVehicles', { vehiclesArray: vehiclesArray, navBarLinks: navBarLinks });
            }
        );
    } else if (req.params.userId && req.params.userId != '9953274d-da9b-49d1-bc02-ae91ce553561') {
        db.car.findAll({ where: { userId: res.locals.currentUser } }).then(
            (result) => {
                let vehiclesArray = [];
                result.forEach((car) => {
                    vehiclesArray.push(car.dataValues);
                });
                console.log(vehiclesArray);
                res.render('manageVehicles', { vehiclesArray: vehiclesArray, navBarLinks: navBarLinks });
            }
        );
    }

});

module.exports = router;