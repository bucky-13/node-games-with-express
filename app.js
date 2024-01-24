var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');

var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static('/stylesheets/style.css'));

app.use('/', indexRouter);
app.use('/games', gamesRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

module.exports = app;
