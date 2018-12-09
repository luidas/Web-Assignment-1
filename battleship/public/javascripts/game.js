
var playerBoard = document.getElementById('playergrid');
var opponentBoard = document.getElementById('opponentgrid')
var playergrid = new Array(10);
for (var i = 0; i < playergrid.length; i++) {
    playergrid[i] = new Array(10);
    for (var j = 0; j < playergrid[i].length; j++) {
        var letter = String.fromCharCode(i + 65);
        var number = String.fromCharCode(j + 48);
        var element = 'P' + letter + number;
        playergrid[i][j] = document.getElementById(element);
    }
}
var opponentgrid = new Array(10);
for (var i = 0; i < opponentgrid.length; i++) {
    opponentgrid[i] = new Array(10);
    for (var j = 0; j < opponentgrid[i].length; j++) {

        var letter = String.fromCharCode(i + 65);
        var number = String.fromCharCode(j + 48);
        var element = 'P' + letter + number;
        opponentgrid[i][j] = document.getElementById(element);
    }
}

var testBoard = [
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

opponentBoard.addEventListener("click", shoot, false);
function shoot(e) {
    if (e.target.id.substring(0, 1) == "O") {
        console.log("HIT");
        var id = e.target.id;
        var row = id.charCodeAt(1) - 65;
        var column = id.charCodeAt(2) - 48;
        if (testBoard[row][column] == 1) {
            testBoard[row][column] = 2;
            e.target.style.background ='#F06969';

            e.target.appendChild(document.createTextNode("X"));
        }
        if (testBoard[row][column] == 0) {
            testBoard[row][column] = 3;

            e.target.appendChild(document.createTextNode("O"));
            e.target.style.background= "#86E7F6";
        }
    }
    e.stopPropagation();


}

var socket = new WebSocket("ws://localhost:3000");