
// Creating variables for the board creation
var playerBoard = document.getElementById('playergrid');
var opponentBoard = document.getElementById('opponentgrid');
var dragging = false;
var selectionX = 0;
var selectionY = 0;
var targetX = 0;
var targetY = 0;
var diffrenceX = 0;
var diffrenceY = 0;
var ships = [4, 3, 2, 1];
var id = null;
var selected = 0
var boxes = [];
var playergrid = new Array(10);
var opponentgrid = new Array(10);
var readyButton = document.getElementById("ready");
var statusbar = document.getElementById("statusbar");
var resetButton = document.getElementById("reset");
var placeShips = document.createTextNode("Place your ships");
var yourTurn = document.createTextNode("Your turn");
var waiting = document.createTextNode("Waiting for opponent");
var opTurn = document.createTextNode("Opponents turn");
var gameWon = document.createTextNode("You won!");
var gameLost = document.createTextNode("You lost..");
var timeElapsed = document.getElementById("time");
var timeSeconds = 0;
var timeMinutes = 0;
var timeText = document.createTextNode("0" + timeMinutes + ":0" + timeSeconds);

timeElapsed.appendChild(timeText);

function time() {
    timeSeconds++;
    if (timeSeconds == 60) {
        timeSeconds = 0;
        timeMinutes++;
    }
    timeElapsed.removeChild(timeText);
    if (timeSeconds < 10 && timeMinutes < 10) {
        timeText = document.createTextNode("0" + timeMinutes + ":0" + timeSeconds);
    }
    else if (timeSeconds < 10) {
        timeText = document.createTextNode(timeMinutes + ":0" + timeSeconds);
    }
    else if (timeMinutes < 10 ){
        timeText = document.createTextNode("0" +timeMinutes + ":" + timeSeconds);
    }
    else timeText = document.createTextNode(timeMinutes + ":" + timeSeconds);
    timeElapsed.appendChild(timeText);

}
setInterval(time, 1000);

statusbar.appendChild(placeShips);

readyButton.disabled = true;

function GameState() {
    this.playerType = null;
    this.conId = null;
    this.name = null;
}

var gs = new GameState();

var socket = new WebSocket("ws://localhost:3000");
socket.onmessage = function (event) {
    console.log(event);
    let incomingMsg = JSON.parse(event.data);
    //set player type

    if (incomingMsg.type == Messages.T_PLAYER_TYPE) {
        gs.playerType = incomingMsg.data;//should be "A" or "B";
        gs.conId = incomingMsg.id;
        var url = new URL(window.location.href);
        gs.name = url.searchParams.get("name");
        var message = Messages.O_PLAYER_NAME;

        message.name = url.searchParams.get("name");
        message.data = gs.playerType;
        message.id = gs.conId;

        console.log(message.name);
        socket.send(JSON.stringify(message));
    }
    else if (incomingMsg.type == Messages.OP_NAME) {
        console.log(incomingMsg.name);
    }
    else if (incomingMsg.type == Messages.T_YOUR_TURN) {
        opponentBoard.addEventListener("click", shoot, false);
        statusbar.removeChild(opTurn);
        statusbar.appendChild(yourTurn);

    }
    else if (incomingMsg.type == Messages.T_YOU_START) {
        statusbar.removeChild(waiting);
        opponentBoard.addEventListener("click", shoot, false);
        statusbar.appendChild(yourTurn);
    }
    else if (incomingMsg.type == Messages.T_OP_STARTS) {
        statusbar.removeChild(waiting);
        statusbar.appendChild(opTurn);
    }
    else if (incomingMsg.type == Messages.T_SHOOT_ANSWER) {
        if (incomingMsg.data == 1) {
            document.getElementById(id).className = "hit";
        }
        else if (incomingMsg.data == 2) {
            document.getElementById(id).className = "miss";
            statusbar.removeChild(yourTurn);
            statusbar.appendChild(opTurn);
            opponentBoard.removeEventListener("click", shoot, false);
        }
    }
    else if (incomingMsg.type == Messages.T_HIT) {
        if (incomingMsg.data == 1) {
            opponentgrid[incomingMsg.cordY][incomingMsg.cordX].className = "hit";
        }
        else if (incomingMsg.data == 2) {
            opponentgrid[incomingMsg.cordY][incomingMsg.cordX].className = "miss";

        }
    }
    else if (incomingMsg.type == Messages.T_GAME_WON) {
        statusbar.removeChild(yourTurn);
        statusbar.appendChild(gameWon);
        opponentBoard.removeEventListener("click", shoot, false);
    }
    else if (incomingMsg.type == Messages.T_GAME_LOST) {
        statusbar.removeChild(opTurn)
        statusbar.appendChild(gameLost);
    }
}



// Creating a board array for players ships.
var playerShips = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];



//Assigning table's boxes to playergrid array.
for (var i = 0; i < playergrid.length; i++) {
    playergrid[i] = new Array(10);
    for (var j = 0; j < playergrid[i].length; j++) {
        var letter = String.fromCharCode(i + 65);
        var number = String.fromCharCode(j + 48);
        var element = 'P' + letter + number;
        playergrid[i][j] = document.getElementById(element);
    }
}
for (var i = 0; i < opponentgrid.length; i++) {
    opponentgrid[i] = new Array(10);
    for (var j = 0; j < opponentgrid[i].length; j++) {

        var letter = String.fromCharCode(i + 65);
        var number = String.fromCharCode(j + 48);
        var element = 'P' + letter + number;
        opponentgrid[i][j] = document.getElementById(element);
    }
}

//Adding event listeners for the splash screen
playerBoard.addEventListener("mouseover", mouseOver);
playerBoard.addEventListener("mouseout", mouseOut);
playerBoard.addEventListener("mousedown", select, false);
playerBoard.addEventListener("mouseup", place);

resetButton.onclick = function reset() {
    for (var i = 0; i < playerShips.length; i++) {
        for (var j = 0; j < playerShips[i].length; j++) {
            playerShips[i][j] = 0;
            playergrid[i][j].style.background = "#FFFFFF";
        }
    }
}


function shoot(e) {
    if (e.target.id.substring(0, 1) == "O") {
        id = e.target.id;
        var row = id.charCodeAt(1) - 65;
        var column = id.charCodeAt(2) - 48;
        let msg = Messages.O_SHOOT;
        msg.id = gs.conId;
        msg.player = gs.playerType;
        msg.cordX = column;
        msg.cordY = row;
        socket.send(JSON.stringify(msg));
    }
}

//Function for mouseover of a playergrid's object
function mouseOver(e) {
    //Only does something if the mouse if over a box that can contain a ship coordinate
    if (e.target.id.substring(0, 1) == "P") {

        //Converting ship's coordinates from the id of the box to ints
        targetY = e.target.id.charCodeAt(1) - 65;
        targetX = e.target.id.charCodeAt(2) - 48;

        //If a ship is not currently beind drawn
        if (!dragging) {

            //While not dragging make the box grey
            e.target.style.background = "#838383";

        }
        else {

            //If a ship is being drawn
            if (dragging) {

                //Add one to number of selected boxes and push it on to the stack
                selected++;
                boxes.push(e.target);

                //If as ship that is drawn on a box that already contains a ship, 
                //change the boolean of drawing and reset the selected counter
                //also reset the boxes that were being drawn on accordingly
                if (playerShips[targetY][targetX] == 1) {
                    while (boxes.length != 0) {
                        var current = boxes.pop();

                        if (current.style.background == "#86E7F6")
                            current.style.background == "#86E7F6";

                        else current.style.background = "#FFFFFF";
                    }
                    selected = 0;
                    dragging = false;
                }

                //If as ship that is drawn on a box that already contains a ship, 
                //change the boolean of drawing and reset the selected counter
                //also reset the boxes that were being drawn on accordingly
                else if (playerShips[targetY][targetX] == 2) {
                    while (boxes.length != 0) {
                        var current = boxes.pop();

                        if (current.style.background == "#86E7F6" || current.style.background == "#000000")
                            current.style.background == "#86E7F6";

                        else current.style.background = "#FFFFFF";
                    }

                    dragging = false;
                    selected = 0;
                }
                //If a ship that is drawn on a box that is not in one line (horizontal/vertical) of the previous one
                //change the boolean of drawing and reset the selected counter
                //also reset the boxes that were being drawn on accordingly
                else if (targetY != selectionY && targetX != selectionX) {

                    while (boxes.length != 0) {
                        boxes.pop().style.background = "#FFFFFF";
                    }

                    selected = 0;
                    dragging = false;
                }

                //If as ship that is drawn on a box that makes it too long to be a ship
                //change the boolean of drawing and reset the selected counter
                //also reset the boxes that were being drawn on accordingly
                else if (selected > 3) {

                    while (boxes.length != 0) {
                        boxes.pop().style.background = "#FFFFFF";
                    }

                    selected = 0;
                    dragging = false;
                }
            }
            //Make keep the box grey, so the ship that is being drawn is visible
            e.target.style.background = "#838383";
        }
    }
}

//Function for mouseout event
function mouseOut(e) {
    //Only does something if the mouse if over a box that can contain a ship coordinate
    if (e.target.id.substring(0, 1) == "P") {

        //Converting ship's coordinates from the id of the box to ints
        targetY = e.target.id.charCodeAt(1) - 65;
        targetX = e.target.id.charCodeAt(2) - 48;

        //If there is a ship there, make the box black
        if (playerShips[targetY][targetX] == 1) {
            e.target.style.background = "#000000";
        }

        //Else if there is water there make the box light blue
        else if (playerShips[targetY][targetX] == 2) {
            e.target.style.background = "#86E7F6";
        }
        //Else if a ship is not being drawn make it white.
        else if (!dragging) {
            e.target.style.background = "#FFFFFF";
        }
    }
}

//Function for selecting a box
function select(e) {
    //Only does something if the mouse if over a box that can contain a ship coordinate
    if (e.target.id.substring(0, 1) == "P") {
        var id = e.target.id;

        //Converting ship's initial coordinates from the id of the box to ints
        selectionY = id.charCodeAt(1) - 65;
        selectionX = id.charCodeAt(2) - 48;

        //If there is no water in the location paint the box black, 
        //push it on the boxes that were selected array, and make dragging true
        if (playerShips[selectionY][selectionX] != 2) {
            e.target.style.background = "#000000";
            boxes.push(e.target);
            dragging = true;
        }
    }
}

//Function for finishing the placement of the ship
function place(e) {
    //If a ship was being drawn
    if (dragging) {

        //Only does something if the mouse if over a box that can contain a ship coordinate
        if (e.target.id.substring(0, 1) == "P") {

            //Converting ship's coordinates from the id of the box to ints

            var id = e.target.id;
            targetY = id.charCodeAt(1) - 65;
            targetX = id.charCodeAt(2) - 48;

            //Only does something if there is no ship at the location
            if (playerShips[targetY][targetX] == 0) {

                //Calculates the distance between the initial and final x and y coordinates
                diffrenceX = targetX - selectionX;
                diffrenceY = targetY - selectionY;

                //If the place was placed on the Y axis 
                //and the number of selected boxes matches the diffrence between coordinates
                // (the ship length is the right amount)
                if (targetY == selectionY && Math.abs(diffrenceX) == selected) {

                    //If there is still of that length available to be placed
                    if (ships[selected] > 0) {

                        //If the ship was drawn to the right
                        if (diffrenceX > 0) {

                            //If there can be placed water at the left of the initial coordinate place it
                            if (selectionX > 0) {
                                playerShips[selectionY][selectionX - 1] = 2;
                                playergrid[selectionY][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionX > 0 && selectionY > 0) {
                                playerShips[selectionY - 1][selectionX - 1] = 2;
                                playergrid[selectionY - 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionX > 0 && selectionY < 9) {
                                playerShips[selectionY + 1][selectionX - 1] = 2;
                                playergrid[selectionY + 1][selectionX - 1].style.background = "#86E7F6";
                            }

                            //If there can be placed water at the right of the final coordinate place it
                            if (targetX < 9) {
                                playerShips[selectionY][targetX + 1] = 2;
                                playergrid[selectionY][targetX + 1].style.background = "#86E7F6";
                            }
                            if (targetX < 9 && selectionY > 0) {
                                playerShips[selectionY - 1][targetX + 1] = 2;
                                playergrid[selectionY - 1][targetX + 1].style.background = "#86E7F6";
                            }
                            if (targetX < 9 && selectionY < 9) {
                                playerShips[selectionY + 1][targetX + 1] = 2;
                                playergrid[selectionY + 1][targetX + 1].style.background = "#86E7F6";
                            }
                        }

                        //If the ship was drawn to the left
                        else if (diffrenceX < 0); {

                            //If there can be placed water at the left of the final coordinate place it
                            if (targetX > 0) {
                                playerShips[selectionY][targetX - 1] = 2;
                                playergrid[selectionY][targetX - 1].style.background = "#86E7F6";
                            }
                            if (targetX > 0 && selectionY > 0) {
                                playerShips[selectionY - 1][targetX - 1] = 2;
                                playergrid[selectionY - 1][targetX - 1].style.background = "#86E7F6";
                            }
                            if (targetX > 0 && selectionY < 9) {
                                playerShips[selectionY + 1][targetX - 1] = 2;
                                playergrid[selectionY + 1][targetX - 1].style.background = "#86E7F6";
                            }

                            //If there can be placed water at the right of the initial coordinate place it
                            if (selectionX < 9) {
                                playerShips[selectionY][selectionX + 1] = 2;
                                playergrid[selectionY][selectionX + 1].style.background = "#86E7F6";
                            }
                            if (selectionX < 9 && selectionY > 0) {
                                playerShips[selectionY - 1][selectionX + 1] = 2;
                                playergrid[selectionY - 1][selectionX + 1].style.background = "#86E7F6";
                            }
                            if (selectionX < 9 && selectionY < 9) {
                                playerShips[selectionY + 1][selectionX + 1] = 2;
                                playergrid[selectionY + 1][selectionX + 1].style.background = "#86E7F6";
                            }
                        }

                        //For each box of the ship execute this
                        for (var i = 0; i < selected + 1; i++) {

                            //If there can be placed water above or below, or both place it.
                            if (selectionY > 0) {
                                playerShips[selectionY - 1][targetX] = 2;
                                playergrid[selectionY - 1][targetX].style.background = "#86E7F6";
                            }
                            if (selectionY < 9) {
                                playerShips[selectionY + 1][targetX] = 2;
                                playergrid[selectionY + 1][targetX].style.background = "#86E7F6";
                            }

                            //Make the coordinate to contain a ship, 
                            //pop the boxes array to empty it and make the background black
                            playerShips[targetY][targetX] = 1;
                            boxes.pop();
                            playergrid[targetY][targetX].style.background = "#000000";

                            // If the ship was drawn to the left decrease targetX coordinate 
                            // else increase it
                            if (diffrenceX < 0) {
                                targetX++;
                            }
                            else targetX--;;
                        }

                        //Decrement the ships array, so the ships cannot be place too many times
                        ships[selected]--;
                    }

                    //If something was wrong, make the in the array boxes white 
                    //and pop the array until it is empty
                    else {
                        while (boxes.length != 0) {
                            var current = boxes.pop();
                            current.style.background = "#FFFFFF";
                        }
                    }
                }

                //If the place was placed on the X axis 
                //and the number of selected boxes matches the diffrence between coordinates
                // (the ship length is the right amount)
                else if (targetX == selectionX && Math.abs(diffrenceY) == selected) {

                    //If the ship of that length can still be placed
                    if (ships[selected] > 0) {

                        //If the ship was drawn to the bottom
                        if (diffrenceY > 0) {

                            //If a water can be placed above the ships initial coordiante place it
                            if (selectionY > 0) {
                                playerShips[selectionY - 1][selectionX] = 2;
                                playergrid[selectionY - 1][selectionX].style.background = "#86E7F6";
                            }
                            if (selectionY > 0 && selectionX > 0) {
                                playerShips[selectionY - 1][selectionX - 1] = 2;
                                playergrid[selectionY - 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionY > 0 && selectionX < 9) {
                                playerShips[selectionY - 1][selectionX + 1] = 2;
                                playergrid[selectionY - 1][selectionX + 1].style.background = "#86E7F6";
                            }

                            //If a water can be placed below the ships final coordinate place it
                            if (targetY < 9) {
                                playerShips[targetY + 1][selectionX] = 2;
                                playergrid[targetY + 1][selectionX].style.background = "#86E7F6";
                            }
                            if (targetY < 9 && selectionX > 0) {
                                playerShips[targetY + 1][selectionX - 1] = 2;
                                playergrid[targetY + 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (targetY < 9 && selectionX < 9) {
                                playerShips[targetY + 1][selectionX + 1] = 2;
                                playergrid[targetY + 1][selectionX + 1].style.background = "#86E7F6";
                            }
                        }

                        //If the ship was drawn up
                        else if (diffrenceY < 0); {

                            //If a water can be placed above ships final coordinate place it
                            if (targetY > 0) {
                                playerShips[targetY - 1][selectionX] = 2;
                                playergrid[targetY - 1][selectionX].style.background = "#86E7F6";
                            }
                            if (targetY > 0 && selectionX > 0) {
                                playerShips[targetY - 1][selectionX - 1] = 2;
                                playergrid[targetY - 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (targetY > 0 && selectionX < 9) {
                                playerShips[targetY - 1][selectionX + 1] = 2;
                                playergrid[targetY - 1][selectionX + 1].style.background = "#86E7F6";
                            }

                            //If a water can be place below ships final coordinate place it
                            if (selectionY < 9) {
                                playerShips[selectionY + 1][selectionX] = 2;
                                playergrid[selectionY + 1][selectionX].style.background = "#86E7F6";
                            }
                            if (selectionY < 9 && selectionX > 0) {
                                playerShips[selectionY + 1][selectionX - 1] = 2;
                                playergrid[selectionY + 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionY < 9 && selectionX < 9) {
                                playerShips[selectionY + 1][selectionX + 1] = 2;
                                playergrid[selectionY + 1][selectionX + 1].style.background = "#86E7F6";
                            }
                        }

                        //For each box of the ship execute this
                        for (var i = 0; i < selected + 1; i++) {

                            //If a water can place to the right or the left of the box place it
                            if (selectionX > 0) {
                                playerShips[targetY][selectionX - 1] = 2;
                                playergrid[targetY][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionX < 9) {
                                playerShips[targetY][selectionX + 1] = 2;
                                playergrid[targetY][selectionX + 1].style.background = "#86E7F6";
                            }

                            //Make the coordinate one to contain a ship
                            //Pop boxes array, so it is empty when the next ship is placed
                            //Make the box black
                            playerShips[targetY][targetX] = 1;
                            boxes.pop();
                            playergrid[targetY][targetX].style.background = "#000000";

                            //If the ship was drawn up increase Y coordinate
                            //else decrease
                            if (diffrenceY < 0) {
                                targetY++;
                            }
                            else targetY--;;

                        }

                        //Decrement the ships array, so the ships cannot be place too many times
                        ships[selected]--;
                    }

                    //If something went wrong make the boxes that were selected white
                    else {
                        while (boxes.length != 0) {
                            var current = boxes.pop();
                            current.style.background = "#FFFFFF";
                        }
                    }
                }

                //If the diffrence of x and y coordinates do not match the selected boxes count
                //Change their color back appropriately;
                else if (Math.abs(diffrenceY) != selected && Math.abs(diffrenceX) != selected) {
                    while (boxes.length != 0) {
                        var current = boxes.pop();
                        if (current.style.background == "#86E7F6")
                            current.style.background == "#86E7F6";

                        else
                            current.style.background = "#FFFFFF";
                    }
                }

                //Reset selected, and make dragging false
                selected = 0;
                dragging = false;

                //If all ships were placed make the rest of the board to contain water.
                if (ships[0] == 0 && ships[1] == 0 && ships[2] == 0 && ships[3] == 0) {
                    for (var i = 0; i < playerShips.length; i++) {
                        for (var j = 0; j < playerShips[i].length; j++) {
                            if (playerShips[i][j] == 0) {
                                playerShips[i][j] = 2;
                                playergrid[i][j].style.background = "#86E7F6";

                                readyButton.disabled = false;
                                readyButton.onclick = function sendFleet() {
                                    let msg = Messages.O_SHIP_SETUP;
                                    msg.data = playerShips;
                                    msg.player = gs.playerType;
                                    msg.id = gs.conId;
                                    socket.send(JSON.stringify(msg));
                                    statusbar.removeChild(placeShips);
                                    statusbar.appendChild(waiting);
                                    resetButton.disabled = true;
                                    readyButton.disabled = true;
                                    readyButton.onclick = null;
                                }

                            }
                        }
                    }

                }

            }
            //If something went wrong reset selected and set dragging to false.
            else {
                selected = 0;
                dragging = false;
            }
        }
    }
}

