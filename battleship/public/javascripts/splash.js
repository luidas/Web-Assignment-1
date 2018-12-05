
var playerBoard = document.getElementById('playergrid');
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

var testBoard = [
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

playerBoard.addEventListener("mouseover", mouseOver);
playerBoard.addEventListener("mouseout", mouseOut);
playerBoard.addEventListener("mousedown", select, false);
playerBoard.addEventListener("mouseup", selected);

var dragging = false;
var selectionX = 0;
var selectionY = 0;
var targetX = 0;
var targetY = 0;
var diffrenceX = 0;
var diffrenceY = 0;
var ships = [4, 3, 2, 1];
var selected = 0

function mouseOver(e) {

    if (e.target.id.substring(0, 1) == "P") {
        console.log(e.target.textcontent);
        if (e.target.textcontent == "X") {
            e.target.style.background = "#000000";
        }
        else {
            if (dragging) {
                selected++;
                console.log(selected);
            }
            e.target.style.background = "#838383";
        }
    }
}
function mouseOut(e) {
    if (e.target.innerText == 'X') {
        e.target.style.background = "#000000";
    }
    else if (!dragging) {
        if (e.target.id.substring(0, 1) == "P")
            e.target.style.background = "#FFFFFF";
    }
}
function select(e) {
    console.log(selected);
    if (e.target.id.substring(0, 1) == "P") {
        var id = e.target.id;
        selectionX = id.charCodeAt(1) - 65;
        selectionY = id.charCodeAt(2) - 48;
        e.target.style.background = "#000000";
        dragging = true;
    }
}
function selected(e) {

    if (e.target.id.substring(0, 1) == "P") {
        var id = e.target.id;
        targetX = id.charCodeAt(1) - 65;
        targetY = id.charCodeAt(2) - 48;

        diffrenceX = Math.abs(targetX - selectionX);
        diffrenceY = Math.abs(targetY - selectionY);
        if (targetX == selectionX && targetY == selectionY && selected == 0) {
            testBoard[targetX][selectionY] = 1;
            console.log("placed");
            e.target.placed = "X";
        }

        selected = 0;
        e.target.style.background = "#000000";
        dragging = false;

    }
}
