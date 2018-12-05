
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
var boxes = [];
function mouseOver(e) {

    if (e.target.id.substring(0, 1) == "P") {
        targetY = e.target.id.charCodeAt(1) - 65;
        targetX = e.target.id.charCodeAt(2) - 48;
        if (!dragging) {
            if (testBoard[targetY][targetX] == 1) {
                e.target.style.background = "#000000";
            }
            
            e.target.style.background = "#838383";
        }
        else {
            if (dragging) {
                selected++;
                console.log(selected);
                boxes.push(e.target);
                if (testBoard[targetY][targetX] == 1) {
                    while (boxes.length != 0) {
                        boxes.pop().style.background = "#FFFFFF";

                        console.log("failed drag");

                    }
                    dragging = false;
                }
                if (targetY != selectionY && targetX != selectionX) {
                    while (boxes.length != 0) {
                        boxes.pop().style.background = "#FFFFFF";

                        console.log("failed drag");

                    }
                    selected = 0;
                    dragging = false;
                }

            }
            
            e.target.style.background = "#838383";
        }
    }
}
function mouseOut(e) {
    if (e.target.id.substring(0, 1) == "P") {
        targetY = e.target.id.charCodeAt(1) - 65;
        targetX = e.target.id.charCodeAt(2) - 48;
        if (testBoard[targetY][targetX] == 1) {
            e.target.style.background = "#000000";
        }

        else if (!dragging) {
            e.target.style.background = "#FFFFFF";
        }
        else if (targetY != selectionY && targetX != selectionX) {
            while (boxes.length != 0) {
                boxes.pop().style.background = "#FFFFFF";
                selected = 0;
                dragging = false;
            }
        }
    }
}
function select(e) {
    console.log(selected);
    if (e.target.id.substring(0, 1) == "P") {
        var id = e.target.id;
        selectionY = id.charCodeAt(1) - 65;
        selectionX = id.charCodeAt(2) - 48;
        e.target.style.background = "#000000";
        boxes.push(e.target);
        dragging = true;
    }
}
function selected(e) {
    if (dragging) {
        if (e.target.id.substring(0, 1) == "P") {
            var id = e.target.id;
            targetY = id.charCodeAt(1) - 65;
            targetX = id.charCodeAt(2) - 48;

            diffrenceX = targetX - selectionX;
            diffrenceY = targetY - selectionY;
            if (targetX == selectionX && targetY == selectionY && selected == 0 && ships[0] > 0) {
                testBoard[targetY][targetX] = 1;
                ships[0]--;
                boxes.pop();
            }
            else if (targetY == selectionY && Math.abs(diffrenceX) == selected) {

                if (ships[selected] > 0) {
                    for (var i = 0; i < selected + 1; i++) {
                        testBoard[targetY][targetX] = 1;
                        boxes.pop();
                        playergrid[targetY][targetX].style.background = "#000000";
                        if (diffrenceX < 0) {
                            targetX++;
                        }
                        else targetX--;;
                    }
                    ships[selected]--;
                }
                else {
                    for (var i = 0; i < selected + 1; i++) {
                        console.log("10");
                        playergrid[targetY][targetX].style.background = "#FFFFFF";
                        if (diffrenceY < 0) {
                            targetX--;
                        }
                        else targetX++;
                    }
                }
            }
            else if (targetX == selectionX && Math.abs(diffrenceY) == selected) {

                if (ships[selected] > 0) {
                    for (var i = 0; i < selected + 1; i++) {
                        testBoard[targetY][targetX] = 1;
                        console.log("10");
                        playergrid[targetY][targetX].style.background = "#000000";
                        boxes.pop();
                        if (diffrenceY < 0) {
                            targetY++;
                        }
                        else targetY--;;
                    }
                    ships[selected]--;
                }
                else {
                    for (var i = 0; i < selected + 1; i++) {
                        console.log("10");
                        playergrid[targetY][targetX].style.background = "#FFFFFF";
                        if (diffrenceY < 0) {
                            targetY++;
                        }
                        else targetY--;
                    }
                }
            }


            selected = 0;
            e.target.style.background = "#000000";
            dragging = false;

        }
    }
}

