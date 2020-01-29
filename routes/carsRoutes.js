const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const multer = require('multer');
const db = require('../config/database');
const utils = require('../utils/utils');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//images upload to the server
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage });

router.get('/add', ensureAuthenticated, (req, res) => {

  db.make.findAll({})
    .then((carMake) => {

      const carMakeArray = [];

      carMake.forEach((element) => {
        const carMakeObject = {
          carMakeName: element.dataValues.make,
          carMakeId: element.dataValues.id,
        };
        carMakeArray.push(carMakeObject);
      });
      //console.log(carMakeArray);
      res.render('add', { user: req.user, carMakeArray: carMakeArray, navBarLinks: utils.navBarFiller(res) });

    })
    .catch(err => console.log(err));

});

router.post('/addPageGetMakeModels', function (req, res) {
  let carModelsArray = [];
  var makeId = req.body.makeName;
  db.model.findAll({ where: { carMakeId: makeId } }).then(function (modelResult) {
    modelResult.forEach(function (element) {
      //console.log(element.dataValues.model);
      const carModelObject = {
        modelName: element.dataValues.model,
        modelId: element.dataValues.id
      };
      //console.log(carModelObject);
      carModelsArray.push(carModelObject);
    });
    res.send({ carModelsArray: carModelsArray });
  });
});

router.post('/search', function (req, res) {


  let errors = [];


  if (typeof req.body.carsMakeDDL == 'undefined' || typeof req.body.carsModelDDL == 'undefined' || typeof req.body.carsYearDDL == 'undefined' || req.body.carsYearDDL == 'ALL' || req.body.carsModelDDL == 'ALL') {
    errors.push({ msg: 'Fill in all form fields!' });
  }

  if (errors.length > 0) {
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
      res.render('index', { errors: errors, carMakeArray: carMakeArray, navBarLinks: utils.navBarFiller(res) });
    });
  } else {
    let carsArray = [];
    //console.log(req.body);
    db.car.findAll({
      include: [{
        model: db.make,
        where: { id: req.body.carsMakeDDL }
      },
      {
        model: db.model,
        where: { id: req.body.carsModelDDL }
      }],
      where: { carYear: req.body.carsYearDDL }
    }).then(function (result) {
      result.forEach((element) => {
        //console.log(element.dataValues);
        const carObject = {
          id: element.dataValues.id,
          carVinNum: element.dataValues.carVinNum,
          carYear: element.dataValues.carYear,
          carColor: element.dataValues.carColor,
          carMilage: element.dataValues.carMilage,
          carPrice: element.dataValues.carPrice,
          createdAt: element.dataValues.createdAt,
          updatedAt: element.dataValues.updatedAt,
          carMakeId: element.dataValues.carMakeId,
          carModelId: element.dataValues.carModelId,
          userId: element.dataValues.userId,
          make: element.dataValues.carMake.dataValues.make,
          model: element.dataValues.carModel.dataValues.model
        };
        //console.log(carObject);
        carsArray.push(carObject);
      });
      //console.log(carsArray.length);
      res.render('search', { carsArray: carsArray, navBarLinks: utils.navBarFiller(res) });
    });
  }

});

router.get('/bookings/:carId/:vinNum', function (req, res) {
  const carDetailsObject = { carId: req.params.carId, vinNum: req.params.vinNum };

  res.render('bookdrive', { carDetailsObject, navBarLinks: utils.navBarFiller(res) });
});

router.post('/scheduleTestDrive', (req, res) => {

  let errors = [];
  if (!req.body.dateFieldSearchFrom || !req.body.customerEmail) {
    errors.push({ msg: 'Fill in all form field!' });
  }

  if (errors.length > 0) {
    //console.log(errors);
    const carDetailsObject = {
      vinNum: req.body.vinNumber,
      carId: req.body.carId
    }
    res.render('bookdrive', { errors, carDetailsObject: carDetailsObject });
  } else {
    const schedule = {
      date: req.body.dateFieldSearchFrom,
      notes: req.body.notesField,
      vinNumber: req.body.vinNumber,
      carId: req.body.carId,
      email: req.body.customerEmail
    };

    db.schedule.create(schedule).then((result) => {
      let success = [];
      success.push({ msg: 'Your test drive was successfuly scheduled.' });
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
        res.render('index', { carMakeArray: carMakeArray, success: success, navBarLinks: utils.navBarFiller(res) });
      });
    });
  }
});

router.get('/viewMoreDetails/:carId', function (req, res) {

  let pathToImages = [];
  let carDetailsObject = [];

  db.car.findOne({
    include: [{
      model: db.make
    },
    {
      model: db.model
    }], where: { id: req.params.carId }
  }).then((element) => {

    //console.log(carResult);

    const carObject = {
      id: element.dataValues.id,
      carVinNum: element.dataValues.carVinNum,
      carYear: element.dataValues.carYear,
      carColor: element.dataValues.carColor,
      carMilage: element.dataValues.carMilage,
      carPrice: element.dataValues.carPrice,
      createdAt: element.dataValues.createdAt,
      updatedAt: element.dataValues.updatedAt,
      carMakeId: element.dataValues.carMakeId,
      carModelId: element.dataValues.carModelId,
      userId: element.dataValues.userId,
      make: element.dataValues.carMake.dataValues.make,
      model: element.dataValues.carModel.dataValues.model
    };

    db.image.findAll({ where: { carVinNum: element.dataValues.carVinNum } }).then((imageResult) => {
      imageResult.forEach((imageElement) => {
        //console.log(imageElement.dataValues.image.replace('\public', ''));
        pathToImages.push(imageElement.dataValues.image.replace('\public', ''));
      });
      //console.log(pathToImages);
      res.render('moredetailsview', { pathToImages: pathToImages, carObject: carObject, navBarLinks: utils.navBarFiller(res) });
    });

  }).catch((err) => {
    if (err) throw err;
  });
});


router.post('/detailedview', upload.array('carImagesUploader', 5), (req, res, next) => {

  let errors = [];

  const files = req.files;

  if (files.length == 0) {
    errors.push({ msg: 'Make sure to upload a few pictures!' });
  }

  if (!req.body.addCarMakeDDL || !req.body.addCarModelDDL || !req.body.carYear || !req.body.carColor || !req.body.carVinNum || !req.body.carMilage || !req.body.carPrice) {
    errors.push({ msg: 'Fill all form fields!' });
  }

  if (errors.length > 0) {
    let carMakeArray = [];

    db.make.findAll({})
      .then((carMake) => {

        const carMakeArray = [];

        carMake.forEach((element) => {
          const carMakeObject = {
            carMakeName: element.dataValues.make,
            carMakeId: element.dataValues.id,
          };
          carMakeArray.push(carMakeObject);
        });
        //console.log(carMakeArray);
        res.render('add', { user: req.user, carMakeArray: carMakeArray, errors: errors, navBarLinks: utils.navBarFiller(res) });

      })
      .catch(err => console.log(err));


  } else {
    //console.log(req.body);

    const newCar = {
      carVinNum: req.body.carVinNum,
      carMakeId: req.body.addCarMakeDDL,
      carModelId: req.body.addCarModelDDL,
      carYear: req.body.carYear,
      carColor: req.body.carColor,
      carMilage: req.body.carMilage,
      carPrice: req.body.carPrice,
      userId: res.locals.currentUser
    };

    console.log(newCar);
    db.car.create(newCar).then(() => {
      //const pathToImages = [];
      files.forEach(function (element) {
        db.image.create({ image: element.path, carVinNum: newCar.carVinNum }).then(() => {
          // pathToImages.push(element.path.replace('\public', ''));
          let success = [];
          success.push({ msg: 'Your vehicle was added successfuly to the system. You can add another vehicle or use My Vehicles and Test Drives links above to check the status of your vehicles and scheduled test drvies.' });
          res.render('add', { success: success, navBarLinks: utils.navBarFiller(res) });
        });
      });
    });

  }
});

module.exports = router;
