const express = require('express');
const router = express.Router();
const CarMake = require('../models/CarMake');
const passport = require('passport');

router.get('/makes', passport.authenticate('local', { failureRedirect: '/error' }),

    function (req, res) {
        let carMakesArray = [];
        CarMake.findAll({}).then(
            (result) => {
                result.forEach((make) => {
                    carMakesArray.push(make.dataValues.make);
                });
                res.render('makes', { carMakesArray: carMakesArray })
            }
        );
    });



/* router.get('/makes', (req, res) => {

    let navBarLinks = [];
    if (res.locals.currentUser && res.locals.currentUser == 1) {
        console.log("not null");
        navBarLinks.push({ hrefVal: '/admin/makes', linkName: 'Makes' });
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else if (res.locals.currentUser && res.locals.currentUser != 1) {
        console.log("not null");
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
    } else {
        console.log("null");
        navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
        navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
        navBarLinks.push({ hrefVal: '/users/register', linkName: 'Register' });
        navBarLinks.push({ hrefVal: '/users/login', linkName: 'Login' });
    };

    let carMakesArray = [];
    CarMake.findAll({}).then((result) => {
        result.forEach((make) => {
            carMakesArray.push(make.dataValues.make);
        });
        res.render('makes', { carMakesArray: carMakesArray, navBarLinks: navBarLinks });
    });
}); */

router.post('/addMake', (req, res) => {
    console.log(req.body.makeName);
    CarMake.create({ make: req.body.makeName }).then(function () {
        let carMakesArray = [];
        CarMake.findAll({}).then((result) => {
            result.forEach((make) => {
                carMakesArray.push(make.dataValues.make);
            });
            res.render('makes', { carMakesArray: carMakesArray });
        });
    });
});

router.post('/deleteMake', (req, res) => {
    console.log(req.body.makeId);
    CarMake.destroy({ where: { make: req.body.makeId } }).then(function () {
        let carMakesArray = [];
        CarMake.findAll({}).then((result) => {
            result.forEach((make) => {
                carMakesArray.push(make.dataValues.make);
            });
            res.render('makes', { carMakesArray: carMakesArray });
        });
    });
});

module.exports = router;