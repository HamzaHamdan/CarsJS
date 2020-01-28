const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const carsUrlRoutes = require('./routes/carsRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const apiRoutes = require('./routes/apiRoutes');
const indexRoutes = require('./routes/indexRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const db = require('./config/database.js');

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

app.use('/api', apiRoutes);

app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));

db.sequelize.sync().then(() => {
  app.listen(PORT, console.log(`Server listening on port ${PORT}`));
});
