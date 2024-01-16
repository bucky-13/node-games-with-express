var express = require('express');
var router = express.Router();

const games = [
    {
        gameName: "Baldur's Gate 3",
        developer: "Larian",
        published: 2023,
        installed: false,
    },
    {
        gameName: "Civilization VI",
        developer: "Fixaris Games",
        published: 2016,
        installed: false
    },
    {
        gameName: "Valheim",
        developer: "Iron Gate",
        published: 2021,
        installed: true
    },
    {
        gameName: "Elder Scrolls Online",
        developer: "ZOS Interactive",
        published: 2012,
        installed: false
    },
]

function generateHTML(pageBody, title) {
    let htmlBase = `
        <html>
    <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/stylesheets/style.css">
    </head>
    <body>
    ${pageBody}
    </body>
    </html>
    `
    return htmlBase;
}

function displayGamesList() {
    let gamesList = '';

    for (let i = 0; i < games.length; i++) {
    
          gamesList = gamesList +  `
        <li>
        <ul>
        <li><a href="games/${i}"><h3>${games[i].gameName}</h3></a></li>
        <li>${games[i].developer}</li>
        <li>${games[i].published}</li>
        <li>Installed? ${games[i].installed ? 'Yes' : 'No'}</li>
        </ul>
        </li>`
        console.log(gamesList);
    }
    return gamesList;
}

router.get('/', function (req, res, next) {
    let gameList = displayGamesList();

    let pageSection = `<div>
    <a href="games/addGame">Add new Game</a>
    <h1>Games Library</h1>
    <ul>
    ${gameList}
    </ul>
    </div>`

    let printGames = generateHTML(pageSection, 'Games Library')
    
    res.send(printGames);
})


router.get('/addGame', function (req, res, next) {

    let pageSection = `<a href="/games">View Games List</a>
    <h2>Add new Game to Library</h2>

    <form action="savegame" method="post">
    <label>
    <span>Name of the Game: </span>
    <input type="text" name="gameName"></input>
    </label><br>
    <label>
    <span>Name of the Developer: </span>
    <input type="text" name="developer"></input>
    </label><br>
    <label>
    <span>Year of Release: </span>
    <input type="number" name="published"></input>
    </label><br>
    <input type="submit" value="Add game"></input>
    </form>`

    let addGameForm = generateHTML(pageSection, 'Add new game to Library')
    res.send(addGameForm);
})

router.post('/savegame', function (req, res) {

    let yearPublished = Number(req.body.published)

    let newGame = { gameName: req.body.gameName, developer: req.body.developer, published: yearPublished, installed: false }

    games.push(newGame);

    let pageSection = `
    <a href="/games">View Games List</a><br>
    <h2>${req.body.gameName} added to your library</h2>
    Name: ${req.body.gameName}<br> 
    Developer: ${req.body.developer}<br> 
    Year Published: ${req.body.published}
    `

    let gameinfo = generateHTML(pageSection, req.body.gameName + ' added')

    res.send(gameinfo)
})


router.get('/:gameId', function (req, res) {
    let index = req.params.gameId;
    let game = games[index];
    let link = 'install';

    if (game.installed) {
        link = 'uninstall';
    } else {
        link = 'install';
    }

    let pageSection = `
    <a href="/games">View Games List</a><br>
    <a href="/games/addGame">Add new Game</a>
    <h2>${game.gameName}</h2>
    <p>Developer: ${game.developer}</p>
    <p>Year released: ${game.published}</p>
    <p>Is it installed? ${game.installed ? 'Yes' : 'No'}</p>
    <a href="${index}/${link}"><button>${game.installed ? 'Uninstall Game' : 'Install game'}</button></a>
    `

    let displayGame = generateHTML(pageSection, game.gameName)
    res.send(displayGame);
})

router.get('/:gameId/install', function (req, res) {

    let index = req.params.gameId;
    let game = games[index];

    game.installed = true;

    let pageSection = `
    <a href="/games">View Games List</a><br>
    <a href="/games/addGame">Add new Game</a>
    <h2>Success!</h2>
    <p>${game.gameName} has successfully been installed!</p>
    <a href="/games/${index}"><button>Back to ${game.gameName}</button></a>
    `

    let displayConfirmation = generateHTML(pageSection, game.gameName + ' installed!')

    res.send(displayConfirmation)
})

router.get('/:gameId/uninstall', function (req, res) {
    let index = req.params.gameId;
    let game = games[index];
    game.installed = false;

    let pageSection = `
    <a href="/games">View Games List</a><br>
    <a href="/games/addGame">Add new Game</a>
    <h2>Success!</h2>
    <p>${game.gameName} has successfully been uninstalled!</p>
    <a href="/games/${index}"><button>Back to ${game.gameName}</button></a>
    `

    let displayConfirmation = generateHTML(pageSection, game.gameName + ' uninstalled!')
    res.send(displayConfirmation)
})

module.exports = router;
