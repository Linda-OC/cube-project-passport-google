
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const createRouter = require('./routes/create');
const detailsRouter = require('./routes/details');
const notFound404Router = require('./routes/404');
const createAccessoryRouter = require('./routes/createAccessory');
const attachAccessoryRouter = require('./routes/attachAccessory');
const editCubeRouter = require('./routes/editCube');
const deleteCubeRouter = require('./routes/deleteCube');



var app = express();

//hide sensitive info such as mongo connection details in a .env file - create a file in root dir, name it ".env" , install npm dotenv and then require it as early as possible
require('dotenv').config();
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((res) => console.log("Database connected!"))
  .catch(err => console.error(err));

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/404', notFound404Router);
app.use('/about', aboutRouter);
app.use('/create', createRouter);
app.use('/details', detailsRouter);
app.use('/createAccessory', createAccessoryRouter);
app.use('/attach-accessory', attachAccessoryRouter);
app.use('/edit-cube', editCubeRouter);
app.use('/delete-cube', deleteCubeRouter);


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
  res.render('404');
});

module.exports = app;
