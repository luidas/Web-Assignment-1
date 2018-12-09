var express = require("express");
var http = require("http");
var websocket = require("ws");

var messages = require("./public/javascripts/messages");

var gameStatus = require("./statTracker");
var Battleship = require("./battleship");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
http.createServer(app).listen(port);

app.get("/", function(req, res){
    res.sendFile("splash.html", {root: "./public"});
});

app.get("/play", function(req, res){
    res.sendFile("game.html", {root: "./public"});
});

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};//property: websocket, value: game

/*
 * regularly clean up the websockets object
 */ 
setInterval(function() {
    for(let i in websockets){
        if(websockets.hasOwnProperty(i)){
            let gameObj = websockets[i];
            //if the gameObj has a final status, the game is complete/aborted
            if(gameObj.finalStatus!=null){
                console.log("\tDeleting element "+i);
                delete websockets[i];
            }
        }
    }
}, 50000);

var currentGame = new Battleship(gameStatus.gamesInitialized++);
var connectionID = 0;//each websocket receives a unique ID

wss.on("connection", function connection(ws) {
    
    console.log("player connected");

    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });

})
    
//server.listen(port);