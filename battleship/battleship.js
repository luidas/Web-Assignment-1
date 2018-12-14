/* every game has two players, identified by their WebSocket */
var battleship = function (gameID) {
    this.playerA = null;
    this.playerB = null;
    this.playerAboard = null;
    this.playerBboard = null;
    this.id = gameID;
    this.gameState = "0 JOINT"; //"A" means A won, "B" means B won, "ABORTED" means the game was aborted
    this.AHit = 0;
    this.BHit = 0;
    this.boards = 0;
};

/*
 * The game can be in a number of different states.
 */
battleship.prototype.transitionStates = {};
battleship.prototype.transitionStates["0 JOINT"] = 0;
battleship.prototype.transitionStates["1 JOINT"] = 1;
battleship.prototype.transitionStates["2 JOINT"] = 2;
battleship.prototype.transitionStates["A WON"] = 3; //A won
battleship.prototype.transitionStates["B WON"] = 4; //B won
battleship.prototype.transitionStates["ABORTED"] = 5;

/*
 * Not all game states can be transformed into each other;
 * the matrix contains the valid transitions.
 * They are checked each time a state change is attempted.
 */
battleship.prototype.transitionMatrix = [
    [0, 1, 0, 0, 0, 0],   //0 JOINT
    [1, 0, 1, 0, 0, 0],   //1 JOINT
    [0, 0, 0, 1, 1, 1],   //2 JOINT (note: once we have two players, there is no way back!)
    [0, 0, 0, 0, 0, 0],   //A WON
    [0, 0, 0, 0, 0, 0],   //B WON
    [0, 0, 0, 0, 0, 0]    //ABORTED
];

battleship.prototype.isValidTransition = function (from, to) {

    console.assert(typeof from == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof from);
    console.assert(typeof to == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof to);
    console.assert(from in battleship.prototype.transitionStates == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, from);
    console.assert(to in battleship.prototype.transitionStates == true, "%s: Expecting %s to be a valid transition state", arguments.callee.name, to);


    let i, j;
    if (!(from in battleship.prototype.transitionStates)) {
        return false;
    }
    else {
        i = battleship.prototype.transitionStates[from];
    }

    if (!(to in battleship.prototype.transitionStates)) {
        return false;
    }
    else {
        j = battleship.prototype.transitionStates[to];
    }

    return (battleship.prototype.transitionMatrix[i][j] > 0);
};

battleship.prototype.isValidState = function (s) {
    return (s in battleship.prototype.transitionStates);
};

battleship.prototype.setStatus = function (w) {

    console.assert(typeof w == "string", "%s: Expecting a string, got a %s", arguments.callee.name, typeof w);

    if (battleship.prototype.isValidState(w) && battleship.prototype.isValidTransition(this.gameState, w)) {
        this.gameState = w;
        console.log("[STATUS] %s", this.gameState);
    }
    else {
        return new Error("Impossible status change from %s to %s", this.gameState, w);
    }
};

battleship.prototype.setABoard = function (w) {

    //two possible options for the current game state:
    //1 JOINT, 2 JOINT
    if (this.gameState != "1 JOINT" && this.gameState != "2 JOINT") {
        return new Error("Trying to set board, but game status is %s", this.gameState);
    }
    this.playerAboard = w;
    if (this.boards < 2) {
        this.boards++;
    }
};

battleship.prototype.setBBoard = function (w) {

    //two possible options for the current game state:
    //1 JOINT, 2 JOINT
    if (this.gameState != "1 JOINT" && this.gameState != "2 JOINT") {
        return new Error("Trying to set board, but game status is %s", this.gameState);
    }
    this.playerBboard = w;
    if (this.boards < 2) {
        this.boards++;
    }
};

battleship.prototype.getABoard = function () {
    return this.playerAboard;
};

battleship.prototype.getBBoard = function () {
    return this.playerBboard;
};
battleship.prototype.shoot = function (cordY, cordX, player) {
    if (player == "A") {
        var board = this.getBBoard();
        if (board[cordY][cordX] == 1) {
            board[cordY][cordX] = 3;
            this.setBBoard(board);
            this.AHit++;
            if (this.getHit("A") == 20){
                return "A WON";
            }
            return 1;
        }
        else if (board[cordY][cordX] == 2) {
            board[cordY][cordX] = 4;
            this.setBBoard(board);
            return 2;
        }
        else if (board[cordY][cordX] == 3) {
            return 3;
        }
        else if (board[cordY][cordX] == 4) {
            return 4;
        }
    }
    else if (player == "B") {
        var board = this.getABoard();
        if (board[cordY][cordX] == 1) {
            board[cordY][cordX] = 3;
            this.setABoard(board);
            this.BHit++;
            if (this.getHit("B") == 20){
                return "B WON";
            }
                return 1;
        }
        else if (board[cordY][cordX] == 2) {
            board[cordY][cordX] = 4;
            this.setABoard(board);
            return 2;
        }
        else if (board[cordY][cordX] == 3) {
            return 3;
        }
        else if (board[cordY][cordX] == 4) {
            return 4;
        }
    }
}

battleship.prototype.hasTwoConnectedPlayers = function () {
    return (this.gameState == "2 JOINT");
};
battleship.prototype.getHit = function (letter) {
    if (letter == "A") {
        return this.AHit;
    }
    else if (letter == "B") {
        return this.BHit;
    }
}
battleship.prototype.addPlayer = function (p) {

    console.assert(p instanceof Object, "%s: Expecting an object (WebSocket), got a %s", arguments.callee.name, typeof p);

    if (this.gameState != "0 JOINT" && this.gameState != "1 JOINT") {
        return new Error("Invalid call to addPlayer, current state is %s", this.gameState);
    }

    /*
     * revise the game state
     */
    var error = this.setStatus("1 JOINT");
    if (error instanceof Error) {
        this.setStatus("2 JOINT");
    }

    if (this.playerA == null) {
        this.playerA = p;
        return "A";
    }
    else {
        this.playerB = p;
        return "B";
    }
};
battleship.prototype.getPlayer = function (letter) {
    if (letter == "A")
        return this.playerA;
    else if (letter == "B")
        return this.playerB;

}
battleship.prototype.getBoards = function () {
    return this.boards;
}
module.exports = battleship;