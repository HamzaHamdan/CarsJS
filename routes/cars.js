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

    const newCar = {
      carVinNum: req.body.carVinNum,
      carMake: req.body.carMake,
      carModel: req.body.carModel,
      carYear: req.body.carYear,
      carColor: req.body.carColor,
      carMilage: req.body.carMilage
    };

    const pathToImages = [];

    files.forEach(function (element) {

      pathToImages.push(element.path.replace('\public', ''));

    });

    Car.create(newCar).then(() => {
      res.render('detailedview', { newCar: newCar, images: pathToImages, navBarLinks: navBarLinks });
    });


  };
});

module.exports = router;
