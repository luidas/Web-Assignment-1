(function(exports){

    /* 
     * Client to server: game is complete, the winner is ... 
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";             
    exports.O_GAME_WON_BY = {
        type: exports.T_GAME_WON_BY,
        data: null
    };

    /*
    Server to client: ship placement
    */
    exports.O_CHOOSE = { type: "PLACE-SHIPS" };
    exports.S_CHOOSE = JSON.stringify(exports.O_CHOOSE);

    /* 
     * Player to server or server to player: this is the ship placement 
     */
    exports.T_SHIP_SETUP = "SET-SHIPS";
    exports.O_SHIP_SETUP = {                         
        type: exports.T_SHIP_SETUP,
        data: null
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


}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server