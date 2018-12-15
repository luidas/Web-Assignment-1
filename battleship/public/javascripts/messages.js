(function (exports) {

    exports.T_YOUR_TURN = "YOUR-TURN";
    exports.O_YOUR_TURN = {
        type: exports.T_YOUR_TURN,
        data: null
    };
    exports.S_YOUR_TURN = JSON.stringify(exports.O_YOUR_TURN);

    exports.T_YOU_START = "YOU-START";
    exports.O_YOU_START = {
        type: exports.T_YOU_START,
        data: null
    };
    exports.S_YOU_START = JSON.stringify(exports.O_YOU_START);

    exports.T_OP_STARTS = "OP-STARTS";
    exports.O_OP_STARTS = {
        type: exports.T_OP_STARTS,
        data: null
    };
    exports.S_OP_STARTS = JSON.stringify(exports.O_OP_STARTS);

    exports.T_PLAYER_NAME = "PLAYER-NAME";
    exports.O_PLAYER_NAME = {
        type: exports.T_PLAYER_NAME,
        data: null
    };

    exports.T_SHOOT = "SHOOT";
    exports.O_SHOOT = {
        type: exports.T_SHOOT,
        id: null,
        cordX: null,
        cordY: null,
        player: null
    };

    exports.T_SHOOT_ANSWER = "SHOOT-ANSWER";
    exports.O_SHOOT_ANSWER = {
        type: exports.T_SHOOT_ANSWER,
        data: null
    };

    exports.T_HIT = "HIT";
    exports.O_HIT = {
        type: exports.T_HIT,
        data: null,
        cordX: null,
        cordY: null
    };

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
     * Server to client: abort game (e.g. if second player exited the game) 
     */
    exports.O_GAME_ABORTED = {
        type: "GAME-ABORTED"
    };
    exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);


    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_LOST = "GAME-LOST";
    exports.O_GAME_LOST = {
        type: exports.T_GAME_LOST,
        data: null
    };

    exports.S_GAME_LOST = JSON.stringify(exports.O_GAME_LOST);
    /* 
     * Server to Player A & B: game over with result won/loss 
     */
    exports.T_GAME_WON = "GAME-WON";
    exports.O_GAME_WON = {
        type: exports.T_GAME_WON,
        data: null
    };
    exports.S_GAME_WON = JSON.stringify(exports.O_GAME_WON);




}(typeof exports === "undefined" ? this.Messages = {} : exports));
//if exports is undefined, we are on the client; else the server