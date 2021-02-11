
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const passport = require("passport");
const util = require('util');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Routers
var indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const createRouter = require('./routes/create');
const detailsRouter = require('./routes/details');
const notFound404Router = require('./routes/404');
const createAccessoryRouter = require('./routes/createAccessory');
const attachAccessoryRouter = require('./routes/attachAccessory');
const editCubeRouter = require('./routes/editCube');
const deleteCubeRouter = require('./routes/deleteCube');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const searchRouter = require('./routes/search');


var app = express();

require('dotenv').config();
//MongoDB connection (protected)
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res) => console.log("Database connected!"))
.catch(err => console.error(err));

  //passport session setup
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:8080/auth/google/return',
    realm: 'http://localhost:8080/',
    clientID: process.env.AUTH_CLIENT_ID,
  },
  function (identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");
hbs.registerHelper("isEqual", (a, b) => {
  return a === b;
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.session({
//   secret: 'keyboard cat'
// }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/404', notFound404Router);
app.use('/about', aboutRouter);
app.use('/create', createRouter);
app.use('/details', detailsRouter);
app.use('/create-accessory', createAccessoryRouter);
app.use('/attach-accessory', attachAccessoryRouter);
app.use('/edit-cube', editCubeRouter);
app.use('/delete-cube', deleteCubeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/search', searchRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404Page');
});

module.exports = app;
