const express = require('express');
const Car = require('../models/Car');
const CarMake = require('../models/CarMake');
const CarModel = require('../models/CarModel');
const sequelize = require('../config/database')

const router = express.Router();

router.get('/', (req, res) => {

    let navBarLinks = [];
    if (res.locals.currentUser && res.locals.currentUser == 1) {
        console.log("not null");
        navBarLinks.push({ hrefVal: '/admin/makes', linkName: 'Makes' });
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else if (res.locals.currentUser && res.locals.currentUser != 1) {
        console.log("not null");
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else {
        console.log("null");
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/register', linkName: 'Register' });
        navBarLinks.push({ hrefVal: '/users/login', linkName: 'Login' });
    };

    let carMakeArray = [];
    CarMake.findAll({})
        .then((carMake) => {

            carMake.forEach((element) => {
                carMakeArray.push(element.dataValues.make);
            });

            /* Car.aggregate('carYear', 'DISTINCT', { plain: false }).then((yearResult) => {

                console.log(yearResult);

                res.render('index', { carMakeArray: carMakeArray, yearResult: yearResult, navBarLinks: navBarLinks });
            }); */


            Car.findAll({
                attributes: [[sequelize.fn('DISTINCT', sequelize.col('carYear')), 'carYear']],
                where: {}
            }).then(data => {
                let yearResult = [];
                yearResult.push(1952);
                res.render('index', { carMakeArray: carMakeArray, yearResult: yearResult, navBarLinks: navBarLinks });
                console.log(yearResult);
            });


        })
        .catch(err => console.log(err));
});

router.post('/getMakeModels', function (req, res) {
    let carModelsArray = [];

    var makeName = req.body.makeName;

    CarMake.findAll({ where: { make: makeName } }).then(
        function (result) {
            CarModel.findAll({ where: { makeId: result[0].dataValues.id } }).then(function (result) {
                result.forEach(function (element) {
                    carModelsArray.push(element.dataValues.model);
                });


                let carYearArray = [];
                Car.findAll({
                    attributes: [[sequelize.fn('DISTINCT', sequelize.col('carYear')), 'carYear']],
                    where: { makeId: makeName }
                }).then(data => {
                    data.forEach((element) => {
                        console.log(element.dataValues.carYear);
                        carYearArray.push(element.dataValues.carYear);
                    });
                    //console.log(data);
                    res.send({ carModelsArray: carModelsArray, carYearArray: carYearArray });
                });

            });
        });
});

module.exports = router;
