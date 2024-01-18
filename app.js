var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var userArray = require('./routes/userArray');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static('/stylesheets/style.css'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/userArray', userArray);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const users = [
  {
    _id: 1,
    userName: 'Simon',
    password: 'bajs',
  },
  {
    _id: 2,
    userName: 'Ramona',
    password: 'ramms',
  },
  {
    _id: 3,
    userName: 'tim',
    password: 'tim',
  },
  {
    _id: 4,
    userName: 'Colin',
    password: 'password',
  },
];

function generateHTML(pageBody, title) {
  let htmlBase = `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/stylesheets/style.css">
      </head>
      <body>
        <h1>Buckys node.js & Express experiments</h1>

        <h2>Games:</h2>
        <a href="/games">View games section</a>

        ${pageBody}
      </body>
    </html>
    `;
  return htmlBase;
}

function checkLogin(userNameSent, passwordSent) {
  let doesUserExist = false;
  let isPasswordCorrect = false;
  for (let i = 0; i < users.length; i++) {
    let userName = users[i].userName;
    let password = users[i].password;
    if (userName === userNameSent) {
      doesUserExist = true;
    }
    if (doesUserExist === true) {
      if (password === passwordSent) {
        isPasswordCorrect = true;
      }
    }
    if (doesUserExist && isPasswordCorrect) {
      return [true, users[i]];
    }
  }
  if (!doesUserExist || !isPasswordCorrect) {
    return [false, 0];
  }
}

app.post('/loginScreen', function (req, res) {
  let userNameSent = req.body.userName;
  let passwordSent = req.body.password;

  let loginSuccessful = checkLogin(userNameSent, passwordSent);

  if (loginSuccessful[0]) {
    let userID = loginSuccessful[1]._id;

    let pageBody = `
    <h2>Login Successful!</h2>
    <a href="/welcome">Return to start page</a>
    `;

    let loginscreen = generateHTML(pageBody, 'Login Successful!');

    res.send(loginscreen);
  } else {
    let pageBody = `
    <h2>Login failed</h2>
    <a href="/">Return to start page</a>
    `;

    let loginscreen = generateHTML(pageBody, 'Login Successful!');

    res.send(loginscreen);
  }
});

module.exports = app;
