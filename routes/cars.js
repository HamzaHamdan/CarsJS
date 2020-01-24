const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const multer = require('multer');

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

  let navBarLinks = [];
  if (res.locals.currentUser) {
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

  res.render('add', { user: req.user, navBarLinks: navBarLinks });
});

router.post('/search', function (req, res) {
  res.render('search');
});

router.post('/add', upload.array('carImagesUploader', 5), (req, res, next) => {


  let navBarLinks = [];
  if (res.locals.currentUser) {
    console.log("not null");
    navBarLinks.push({ hrefVal: '', linkName: 'Search' });
    navBarLinks.push({ hrefVal: '/users/logout', linkName: 'Logout' });
  } else {
    console.log("null");
    navBarLinks.push({ hrefVal: '/', linkName: 'Search' });
    navBarLinks.push({ hrefVal: '/cars/add', linkName: 'List your Car' });
    navBarLinks.push({ hrefVal: '/users/register', linkName: 'Register' });
    navBarLinks.push({ hrefVal: '/users/login', linkName: 'Login' });
  };

  // global variable data defined in server.js
  console.log(res.locals.currentUser);

  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400;
    return next(error);
  } else {

    /* connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("connected as id " + connection.threadId);
    }); */


    const newCar = {
      carVinNum: req.body.carVinNum,
      carMake: req.body.carMake,
      carModel: req.body.carModel,
      carYear: req.body.carYear,
      carColor: req.body.carColor,
      carMilage: req.body.carMilage
    };

    /* connection.query('insert into cars (carVinNum, carMake, carModel, carYear, carColor, carMilage) values (?,?,?,?,?, ?)', [newCar.carVinNum, newCar.carMake, newCar.carModel, newCar.carColor, newCar.carMilage, newCar.carYear], function (err, result) {
      if (err) throw err;
    }); */

    const pathToImages = [];

    files.forEach(function (element) {

      /* connection.query('insert into images (carVinNum, image) values (?,?)', [newCar.carVinNum, element.path], function (err, result) {
        if (err) throw err;
      }); */

      pathToImages.push(element.path.replace('\public', ''));

    });

    res.render('detailedview', { newCar: newCar, images: pathToImages, navBarLinks: navBarLinks });

  };
});

module.exports = router;
