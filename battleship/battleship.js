/* every game has two players, identified by their WebSocket */
var battleship = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.playerAboard = null;
    this.playerBboard = null;
    this.id = gameID;
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
};

/*
 * The game can be in a number of different states.
 */
battleship.prototype.transitionStates = {};
battleship.prototype.transitionStates["0 JOINT"] = 0;
battleship.prototype.transitionStates["1 JOINT"] = 1;
battleship.prototype.transitionStates["2 KASEK"] = 2;
battleship.prototype.transitionStates["TILE HIT"] = 3;
battleship.prototype.transitionStates["A"] = 4; //A won
battleship.prototype.transitionStates["B"] = 5; //B won
battleship.prototype.transitionStates["ABORTED"] = 6;

module.exports = battleship;