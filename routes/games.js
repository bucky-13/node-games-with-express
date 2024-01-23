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

router.post('/savegame', function (req, res) {
  let yearPublished = Number(req.body.published);

  let newGame = {
    id: games.length + 1,
    gameName: req.body.gameName,
    developer: req.body.developer,
    published: yearPublished,
    installed: false,
  };

  games.push(newGame);
  res.send(newGame);
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
