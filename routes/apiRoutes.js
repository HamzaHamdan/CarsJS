const Car = require('../models/Car');
const express = require('express');
const router = express.Router();

router.get('/getAll', function (req, res) {
    Car.findAll({}).then(function (result) {
        res.json(result);
    });
});

module.exports = router;