const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');
const { forwardAuthenticated } = require('../config/auth');
const utils = require('../utils/utils');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {

    res.render('login', { navBarLinks: utils.navBarFiller(res) });
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register', { navBarLinks: utils.navBarFiller(res) });
});

// Register
router.post('/register', (req, res) => {


    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all form fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            navBarLinks: utils.navBarFiller(res)
        });

    } else {
        db.user.findOne({ where: { email: email } }).then(user => {
            if (user) {
                errors.push({ msg: 'Email address is already registered!' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    navBarLinks: utils.navBarFiller(res)
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

                                let success = [];
                                success.push({ msg: 'You were successfuly registered. Try to login!' });
                                res.render('login', { success: success, navBarLinks: utils.navBarFiller(res) });
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
        errors.push({ msg: 'Fill all form fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('login', {
            errors,
            email,
            password,
            navBarLinks: utils.navBarFiller(res)
        });
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
