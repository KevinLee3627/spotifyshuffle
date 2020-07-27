const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');
const queryString = require('query-string');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api')

require('express-async-errors');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  name: 'session',
  secret: (process.env.MODE === 'PROD') ? process.env.cookieSecretProd : process.env.cookieSecretDev,
  maxAge: 1000*60*60,
  httpOnly: true,
  sameSite: true,
  secure: (process.env.MODE === 'PROD') ? true : false
}));
// app.use(express.static(path.join(__dirname, 'public'))); //For express!
app.use(express.static(path.join(__dirname, 'client/build')));// Handle React routing, return all requests to React app

/*--------- ROUTERS ----------*/
app.use('/api', apiRouter);
app.use('/', indexRouter);


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
  res.render('error');
});

module.exports = app;
