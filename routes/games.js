var express = require('express');
var router = express.Router();
let cors = require('cors');

const fs = require('fs');

router.use(cors());

router.get('/', (req, res) => {
  fs.readFile('games.json', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const games = JSON.parse(data);
      res.send(games);
    }
  });
});

router.get('/:gameId', (req, res) => {
  fs.readFile('games.json', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const games = JSON.parse(data);
      let index = req.params.gameId;
      let game = games.find((game) => game.id == index);
      res.send(game);
    }
  });
});

router.post('/savegame', function (req, res) {
  fs.readFile('games.json', function (err, data) {
    if (err) {
      console.log(err);

      if (err.code == 'ENOENT') {
        console.log('file does not exist');

        let games = {
          id: `1`,
          gameName: req.body.gameName,
          developer: req.body.developer,
          published: yearPublished,
          installed: false,
        };

        fs.writeFile(
          'games.json',
          JSON.stringify(games, null, 2),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
        res.send(games);
        return;
      }
      res.send('404, things went wrong');
    } else {
      const games = JSON.parse(data);

      let yearPublished = Number(req.body.published);

      let newGame = {
        id: `${games.length + 1}`,
        gameName: req.body.gameName,
        developer: req.body.developer,
        published: yearPublished,
        installed: false,
      };

      games.push(newGame);

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
      res.send(newGame);
    }
  });
});

router.patch('/:gameId/install', function (req, res) {
  fs.readFile('games.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const games = JSON.parse(data);
      let index = req.params.gameId;
      let game = games.find((game) => game.id == index);
      game.installed = true;

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );

      res.send(game);
      return;
    }
  });
});

router.patch('/:gameId/uninstall', function (req, res) {
  fs.readFile('games.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const games = JSON.parse(data);
      let index = req.params.gameId;
      let game = games.find((game) => game.id == index);
      game.installed = false;

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );

      res.send(game);
      return;
    }
  });
});

router.delete('/:gameId', (req, res) => {
  fs.readFile('games.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let games = JSON.parse(data);
      let index = req.params.gameId;
      let deletedGame = games.find((game) => game.id == index);
      games = games.filter((game) => game.id != index);

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
      res.send(deletedGame);
    }
  });
});

module.exports = router;
