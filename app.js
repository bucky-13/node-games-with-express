var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static("/stylesheets/style.css"));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

app
  .get( '*', function( req, res ) {
    res.sendFile( path.join( __dirname, 'client', 'index.html' ));
  });

module.exports = app;
