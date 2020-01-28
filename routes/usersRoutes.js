const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {

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

    res.render('login', { navBarLinks: navBarLinks });
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
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

    res.render('register', { navBarLinks: navBarLinks });
});

// Register
router.post('/register', (req, res) => {


    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors/* ,
            name,
            email,
            password,
            password2 */
        });

        console.log("error!!!!!!!!!!");

    } else {
        db.user.findOne({ where: { email: email } }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new db.user({
                    name,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        db.user.create({
                            name: newUser.name,
                            email: newUser.email,
                            password: newUser.password
                        })
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }

});

// Login
router.post('/login', (req, res, next) => {




    const { email, password } = req.body;
    let errors = [];

    if (!email || !password) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('login', {
            errors,
            email,
            password
        });
        console.log("error!!!!!!!!!!");
    } else {
        passport.authenticate('local', {
            successRedirect: '/cars/add',
            failureRedirect: '/users/login'
        })(req, res, next);
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;
