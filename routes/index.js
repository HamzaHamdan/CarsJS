const express = require('express');
const Car = require('../models/Car');
const CarMake = require('../models/CarMake');
const CarModel = require('../models/CarModel');

const router = express.Router();

router.get('/', (req, res) => {

    let navBarLinks = [];
    if (res.locals.currentUser) {
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

            res.render('index', { carMakeArray: carMakeArray, navBarLinks: navBarLinks });

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
                res.send(carModelsArray);
            });
        });
});

module.exports = router;
