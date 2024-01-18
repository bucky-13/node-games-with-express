var express = require('express');
var router = express.Router();

const fs = require('fs');

router.use(express.json());

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

/* GET users listing. */
router.get('/', function (req, res, next) {
  let pageBody = `
  <form action="users/loginScreen" method="post">
    <h2>Login:</h2>
    <div>
      <label>
        <span>Username:</span>
        <input type="text" name="userName" class="textfield" />
      </label>
    </div>
    <div>
      <label>
        <span>Password:</span>
        <input type="password" name="password" class="textfield" />
      </label>
    </div>
    <input type="submit" value="Login">
  </form>
  `;
  let loginScreen = generateHTML(pageBody, 'Login');

  res.send(loginScreen);
});

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
      if (password === passwordSent) isPasswordCorrect = true;
    }
    if (doesUserExist && isPasswordCorrect) {
      return [true, users[i]];
    }
  }
}

router.post('/loginScreen', function (req, res) {
  let userNameSent = req.body.userName;
  let passwordSent = req.body.password;

  let loginSuccessful = checkLogin(userNameSent, passwordSent);

  if (loginSuccessful[0]) {
    let userID = loginSuccessful[1]._id;

    res.send('success!');
  } else {
    res.send('fail!');
  }
});

module.exports = router;
