var express = require("express");
var http = require("http");
var websocket = require("ws");

var messages = require("./public/javascripts/messages");

var gameStatus = require("./statTracker");
var Battleship = require("./battleship");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile("splash.html", { root: "./public" });
});

app.get("/play", function (req, res) {
    res.sendFile("game.html", { root: "./public" });
});

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};//property: websocket, value: game

/*
 * regularly clean up the websockets object
 */
setInterval(function () {
    for (let i in websockets) {
        if (websockets.hasOwnProperty(i)) {
            let gameObj = websockets[i];
            //if the gameObj has a final status, the game is complete/aborted
            if (gameObj.finalStatus != null) {
                console.log("\tDeleting element " + i);
                delete websockets[i];
            }
        }
    }
}, 50000);

var currentGame = new Battleship(gameStatus.gamesInitialized++);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection", function connection(ws) {

    let con = ws;
    con.id = connectionID++;
    let playerType = currentGame.addPlayer(con);
    websockets[con.id] = currentGame;
    console.log("Player %s placed in game %s as %s", con.id, currentGame.id, playerType);

    /*
     * client receives the enemy board (if already available)
     */
    if (playerType == "A" && currentGame.getBboard() != null) {
        let msg = messages.O_SHIP_SETUP;
        msg.data = currentGame.getBboard();
        con.send(JSON.stringify(msg));
    }

    /*
     * client receives the enemy board (if already available)
     */
    if (playerType == "B" && currentGame.getAboard() != null) {
        let msg = messages.O_SHIP_SETUP;
        msg.data = currentGame.getAboard();
        con.send(JSON.stringify(msg));
    }
    if (!currentGame.hasTwoConnectedPlayers()) {
        let msg = messages.T_WAITING;
        con.send(JSON.stringify(msg));
    }

    /*
     * once we have two players, there is no way back; 
     * a new game object is created;
     * if a player now leaves, the game is aborted (player is not preplaced)
     */
    if (currentGame.hasTwoConnectedPlayers()) {
        currentGame = new Battleship(gameStatus.gamesInitialized++);
    }

    con.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });

    con.on("close", function (code) {

        /*
         * code 1001 means almost always closing initiated by the client;
         * source: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
         */
        console.log(con.id + " disconnected ...");

        if (code == "1001") {
            /*
            * if possible, abort the game; if not, the game is already completed
            */
            let gameObj = websockets[con.id];

            if (gameObj.isValidTransition(gameObj.gameState, "ABORTED")) {
                gameObj.setStatus("ABORTED");
                gameStatus.gamesAborted++;

                /*
                 * determine whose connection remains open;
                 * close it
                 */
                try {
                    gameObj.playerA.close();
                    gameObj.playerA = null;
                }
                catch (e) {
                    console.log("Player A closing: " + e);
                }

                try {
                    gameObj.playerB.close();
                    gameObj.playerB = null;
                }
                catch (e) {
                    console.log("Player B closing: " + e);
                }
            }

        }
    });

})


server.listen(port)