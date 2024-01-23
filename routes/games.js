var express = require('express');
var router = express.Router();
let cors = require('cors');

router.use(cors());

const games = [
  {
    id: '1',
    gameName: "Baldur's Gate 3",
    developer: 'Larian',
    published: 2023,
    installed: false,
  },
  {
    id: '2',
    gameName: 'Civilization VI',
    developer: 'Firaxis Games',
    published: 2016,
    installed: false,
  },
  {
    id: '3',
    gameName: 'Valheim',
    developer: 'Iron Gate',
    published: 2021,
    installed: true,
  },
  {
    id: '4',
    gameName: 'Elder Scrolls Online',
    developer: 'ZOS Interactive',
    published: 2012,
    installed: false,
  },
];

router.get('/', (req, res) => {
  res.json(games);
});

router.get('/:gameId', (req, res) => {
  let index = req.params.gameId;
  let game = games.find((game) => game.id == index);
  res.send(game);
});

router.get('/addGame', function (req, res, next) {
  let pageSection = `
    <h2>Add new Game to Library</h2>

    <form action="savegame" method="post">
    <div>
        <label>
            <span>Name of the Game: </span>
            <input type="text" name="gameName" class="textfield" />
        </label>
    </div>
    <div>
        <label>
            <span>Name of the Developer: </span>
            <input type="text" name="developer" class="textfield" />
        </label>
    </div>
    <div>
        <label>
            <span>Year of Release: </span>
            <input type="number" name="published" class="textfield" />
        </label>
    </div>
    <input type="submit" value="Add game">
    </form>`;

  let addGameForm = generateHTML(pageSection, 'Add new game to Library');
  res.send(addGameForm);
});

router.post('/savegame', function (req, res) {
  let yearPublished = Number(req.body.published);

  let newGame = {
    gameName: req.body.gameName,
    developer: req.body.developer,
    published: yearPublished,
    installed: false,
  };

  games.push(newGame);

  let pageSection = `
    <h2>${req.body.gameName} added to your library</h2>
    Name: ${req.body.gameName}<br> 
    Developer: ${req.body.developer}<br> 
    Year Published: ${req.body.published}
    `;

  let gameinfo = generateHTML(pageSection, req.body.gameName + ' added');

  res.send(gameinfo);
});

router.patch('/:gameId/install', function (req, res) {
  let index = req.params.gameId;
  let game = games.find((game) => game.id == index);
  game.installed = true;
  res.send(game);
});

router.patch('/:gameId/uninstall', function (req, res) {
  let index = req.params.gameId;
  let game = games.find((game) => game.id == index);
  game.installed = false;
  res.send(game);
});

module.exports = router;
