
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
        targetX = e.target.id.charCodeAt(1) - 65;
        targetY = e.target.id.charCodeAt(2) - 48;
        if (testBoard[targetX][targetY]==1) {
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
        if (targetX == selectionX && targetY == selectionY && selected == 0 && ships[0] > 0) {
            testBoard[targetX][selectionY] = 1;
            e.target.appendChild(document.createTextNode("X"));
            ships[0]--;
        }
        else if (targetX == selectionX) {
            if(diffrenceX == selected){
                if(ships[selected] > 0){
                    for(var i = 0; i < selected+1; i++){
                        testBoard[targetX][targetY] = 1;
                        targetX = 
                    }
                }
            }
            testBoard[targetX][selectionY] = 1;
            e.target.appendChild(document.createTextNode("X"));
        }

        selected = 0;
        e.target.style.background = "#000000";
        dragging = false;

    }
}
