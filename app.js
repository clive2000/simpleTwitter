/*jslint node: true */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var post = require('./routes/post');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');


var app = express();

//setup ejs-mate for ejs layout
var engine = require('ejs-mate')
app.engine('ejs',engine);

// view engine setup 
// Set view engine to ejs and all view is under views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index);
app.get('/hello', index);
app.get('/u/:user', user); //get /u/[user]
app.post('/post',post);
app.get('/reg',reg);
app.post('/reg',reg);
app.get('/login',login);
app.post('/login',login);
app.get('logout',logout);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;