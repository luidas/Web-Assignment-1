(function (exports) {

    /* 
     * Client to server: game is complete, the winner is ... 
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    exports.T_YOUR_TURN = "YOUR-TURN";
    exports.O_YOUR_TURN = {
        type: exports.T_YOUR_TURN,
        data: null
    };
    exports.S_YOUR_TURN = JSON.stringify(exports.O_YOUR_TURN);


    exports.T_SHOOT = "SHOOT";  
    exports.O_SHOOT = {
        type: exports.T_SHOOT,
        id: null,
        cordX: null,
        cordY: null,
        player: null
    };
    exports.S_YOUR_TURN = JSON.stringify(exports.O_YOUR_TURN);
    /*
        * Server to client: set as player A 
        */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {
        type: exports.T_PLAYER_TYPE,
        data: "A",
        id: null
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);

    /* 
     * Server to client: set as player B 
     */
    exports.O_PLAYER_B = {
        type: exports.T_PLAYER_TYPE,
        data: "B",
        id: null
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

    
    /* 
     * Player to server or server to player: this is the ship placement 
     */
    exports.T_SHIP_SETUP = "SET-SHIPS";
    exports.O_SHIP_SETUP = {
        type: exports.T_SHIP_SETUP,
        data: null,
        player: null,
        id: null
    };
    
    /* 
     * Player to server OR server to Player: guessed tile 
     */
    exports.T_MAKE_A_GUESS = "MAKE-A-GUESS";
    exports.O_MAKE_A_GUESS = {
        type: exports.T_MAKE_A_GUESS,
        data: null
    };



    /*
     * Server to client: abort game (e.g. if second player exited the game) 
     */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);


    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_OVER = "GAME-OVER";
    exports.O_GAME_OVER = {
        type: exports.T_GAME_OVER,
        data: null
    };

    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_WAITING = "WAITING";

    exports.S_WAITING = JSON.stringify(exports.T_WAITING);


}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server