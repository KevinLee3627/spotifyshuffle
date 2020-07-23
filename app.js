var createError = require('http-errors');
var express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
const apiRouter = require('./routes/api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); //For express!
app.use(express.static(path.join(__dirname, 'client/build')));// Handle React routing, return all requests to React app

/*--------- ROUTERS ----------*/
app.use('/', indexRouter);
app.use('/api', apiRouter);

/*--------- SPOTIFY ----------*/
const axios = require('axios');
const spotify_url = 'https://accounts.spotify.com/api/token';
const to_encode = `${process.env.clientID}:${process.env.clientSecret}`;
const encoded_auth = Buffer.from(to_encode).toString('base64');
function getToken() {
    axios({
        method: 'post',
        url: spotify_url,
        headers: {
            'Authorization': `Basic ${encoded_auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {'grant_type': 'client_credentials'}
    }).then( (res) => {
        console.log(res.data);
        app.locals.spotify_token = res.data.access_token
        // console.log(app.locals);
        console.log('End of app.js logs');
    }).catch( (err) => {
        console.log('error with getting token');
        // console.log(err);
    })
}
// getToken();
setInterval( () => {
    getToken();
}, 1000*60*60)

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
