var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ev = require('express-validator');
var mongoose = require('mongoose');
var logger = require('morgan');
var config = require('config');
var connectionString = config.get('mongoUri');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect(connectionString, function(err) {
    if (err) return console.log(err);
    console.log('Mongoose Connected');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true, limit:'50mb'
}));

app.use(bodyParser.json({
    limit: "50mb"
}));    



app.use(ev([]));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

function middleWare(req,res,next){
	console.error("<================================================>");
    //console.log("Headers:=>", req.headers);
    console.log("Body.Params:=>", req.params);
    console.log("Query:=>", req.query);
    console.log("Body:=>", req.body);
    console.error("<================================================>");
    next();
}
app.use(middleWare);


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
