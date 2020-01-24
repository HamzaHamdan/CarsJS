const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const carsUrlRoutes = require('./routes/cars.js');
const usersRoutes = require('./routes/users.js');
const apiRoutes = require('./routes/apiRoutes');
const indexRoutes = require('./routes/index.js');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

require('./config/passport')(passport);

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);

app.use('/cars', carsUrlRoutes);

app.use('/users', usersRoutes);

<<<<<<< HEAD
app.use('/api', apiRoutes);
=======
app.use('/api', require('./routes/apiRoutes'));
>>>>>>> e29c8b34d9d77748c1406587631cdea9aeb3b938

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
