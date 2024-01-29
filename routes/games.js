var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
let cors = require('cors');
const multer = require('multer');
const path = require('path');
// let fs = require('fs');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

// const upload = multer({ dest: 'public/images' });
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    fs.readFile('games.json', function (err, data) {
      if (err) {
        console.log('err ', err);
      } else {
        const games = JSON.parse(data);
        let index = req.params.gameId;
        let game = games.find((game) => game.id == index);
        let imgName = game.gameName
          .replace(/[^a-z0-9\s]/gi, '')
          .replace(/[_\s]/g, '-');

        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, imgName + '.' + ext);
      }
    });
  },
});

const upload = multer({ storage: storage });

const fs = require('fs');

router.use(cors());

router.get('/', (req, res) => {
  fs.readFile('games.json', function (err, data) {
    if (err) {
      console.log('err ', err);
    } else {
      const games = JSON.parse(data);
      res.send(games);
    }
  });
});

router.get('/:gameId/upload', (req, res) => {
  fs.readFile('games.json', (err, data) => {
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

router.get('/:gameId', (req, res) => {
  fs.readFile('games.json', function (err, data) {
    if (err) {
      console.log('err ', err);
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
      console.log('err ', err);

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
              console.log('err ', err);
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
        id: uuidv4(),
        gameName: req.body.gameName,
        developer: req.body.developer,
        published: yearPublished,
        installed: false,
        image: '',
      };

      games.push(newGame);

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log('err ', err);
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
      console.log('err ', err);
    } else {
      const games = JSON.parse(data);
      let index = req.params.gameId;
      let game = games.find((game) => game.id == index);
      game.installed = game.installed ? false : true;

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log('err ', err);
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
      console.log('err ', err);
    } else {
      let games = JSON.parse(data);
      let index = req.params.gameId;
      let deletedGame = games.find((game) => game.id == index);
      games = games.filter((game) => game.id != index);
      let imagePath = deletedGame.image;
      fs.unlinkSync(imagePath);

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log('err ', err);
          }
        }
      );
      res.send(deletedGame);
    }
  });
});

router.post('/:gameId/saveimage', upload.single('image'), (req, res) => {
  fs.readFile('games.json', (err, data) => {
    if (err) {
      console.log('err', err);
    } else {
      let games = JSON.parse(data);
      let index = req.params.gameId;
      let game = games.find((game) => game.id == index);
      game.image = `http://localhost:3000/images/${req.file.filename}`;

      fs.writeFile(
        'games.json',
        JSON.stringify(games, null, 2),
        function (err) {
          if (err) {
            console.log('err', err);
          }
        }
      );
      res.send(game);
    }
  });
});

module.exports = router;
