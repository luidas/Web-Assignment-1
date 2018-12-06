
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
            else if (testBoard[targetY][targetX] == 2) {
                e.target.style.background = "#86E7F6";
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
                        var current = boxes.pop();
                        if (current.style.background == "#86E7F6") {
                            current.style.background == "#86E7F6";
                        }
                        else {
                            current.style.background = "#FFFFFF";
                        }
                        console.log("failed drag");

                    }
                    dragging = false;
                }
                else if (testBoard[targetY][targetX] == 2) {
                    while (boxes.length != 0) {
                        var current = boxes.pop();
                        if (current.style.background == "#86E7F6"|| current.style.background == "#000000") {
                            current.style.background == "#86E7F6";
                            
                        }
                        else {
                            current.style.background = "#FFFFFF";
                        }

                    }
                    dragging = false;
                }
                else if (targetY != selectionY && targetX != selectionX) {
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
        else if (testBoard[targetY][targetX] == 2) {
            e.target.style.background = "#86E7F6";
        }

        else if (!dragging) {
            e.target.style.background = "#FFFFFF";
        }
    }
}
function select(e) {
    console.log(selected);
    if (e.target.id.substring(0, 1) == "P") {
        var id = e.target.id;
        selectionY = id.charCodeAt(1) - 65;
        selectionX = id.charCodeAt(2) - 48;
        if(testBoard[selectionY][selectionX]==2){
            
        }
        else{
        e.target.style.background = "#000000";
        boxes.push(e.target);
        dragging = true;
        }
    }
}
function selected(e) {
    if (dragging) {
        if (e.target.id.substring(0, 1) == "P") {
            var id = e.target.id;
            targetY = id.charCodeAt(1) - 65;
            targetX = id.charCodeAt(2) - 48;
            if (testBoard[targetY][targetX] == 0) {
                diffrenceX = targetX - selectionX;
                diffrenceY = targetY - selectionY;
                if (targetX == selectionX && targetY == selectionY && selected == 0 && ships[0] > 0) {
                    testBoard[targetY][targetX] = 1;
                    ships[0]--;
                    boxes.pop();
                    if (targetY > 0) {
                        testBoard[targetY - 1][targetX] = 2;
                        playergrid[targetY - 1][targetX].style.background = "#86E7F6";
                    }
                    if (targetY < 9) {
                        testBoard[targetY + 1][targetX] = 2;
                        playergrid[targetY + 1][targetX].style.background = "#86E7F6";
                    }

                    if (targetX > 0) {
                        testBoard[targetY][targetX - 1] = 2;
                        playergrid[targetY][targetX - 1].style.background = "#86E7F6";
                    }

                    if (targetX < 9) {
                        testBoard[targetY][targetX + 1] = 2;
                        playergrid[targetY][targetX + 1].style.background = "#86E7F6";
                    }
                    if (targetX < 9 && targetY < 9) {
                        testBoard[targetY + 1][targetX + 1] = 2;
                        playergrid[targetY + 1][targetX + 1].style.background = "#86E7F6";
                    }
                    if (targetX > 0 && targetY > 0) {
                        testBoard[targetY - 1][targetX - 1] = 2;
                        playergrid[targetY - 1][targetX - 1].style.background = "#86E7F6";
                    }
                    if (targetX < 9 && targetY > 0) {
                        testBoard[targetY - 1][targetX + 1] = 2;
                        playergrid[targetY - 1][targetX + 1].style.background = "#86E7F6";
                    }
                    if (targetX > 0 && targetY < 9) {
                        testBoard[targetY + 1][targetX - 1] = 2;
                        playergrid[targetY + 1][targetX - 1].style.background = "#86E7F6";
                    }
                }
                else if (targetY == selectionY && Math.abs(diffrenceX) == selected) {

                    if (ships[selected] > 0) {
                        if (diffrenceX > 0) {
                            if (selectionX > 0) {
                                testBoard[selectionY][selectionX - 1] = 2;
                                playergrid[selectionY][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionX > 0 && selectionY > 0) {
                                testBoard[selectionY - 1][selectionX - 1] = 2;
                                playergrid[selectionY - 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionX > 0 && selectionY < 9) {
                                testBoard[selectionY + 1][selectionX - 1] = 2;
                                playergrid[selectionY + 1][selectionX - 1].style.background = "#86E7F6";
                            }

                            if (targetX < 9) {
                                testBoard[selectionY][targetX + 1] = 2;
                                playergrid[selectionY][targetX + 1].style.background = "#86E7F6";
                            }
                            if (targetX < 9 && selectionY > 0) {
                                testBoard[selectionY - 1][targetX + 1] = 2;
                                playergrid[selectionY - 1][targetX + 1].style.background = "#86E7F6";
                            }
                            if (targetX < 9 && selectionY < 9) {
                                testBoard[selectionY + 1][targetX + 1] = 2;
                                playergrid[selectionY + 1][targetX + 1].style.background = "#86E7F6";
                            }
                        }
                        else if (diffrenceX < 0); {
                            if (targetX > 0) {
                                testBoard[selectionY][targetX - 1] = 2;
                                playergrid[selectionY][targetX - 1].style.background = "#86E7F6";
                            }
                            if (targetX > 0 && selectionY > 0) {
                                testBoard[selectionY - 1][targetX - 1] = 2;
                                playergrid[selectionY - 1][targetX - 1].style.background = "#86E7F6";
                            }
                            if (targetX > 0 && selectionY < 9) {
                                testBoard[selectionY + 1][targetX - 1] = 2;
                                playergrid[selectionY + 1][targetX - 1].style.background = "#86E7F6";
                            }

                            if (selectionX < 9) {
                                testBoard[selectionY][selectionX + 1] = 2;
                                playergrid[selectionY][selectionX + 1].style.background = "#86E7F6";
                            }
                            if (selectionX < 9 && selectionY > 0) {
                                testBoard[selectionY - 1][selectionX + 1] = 2;
                                playergrid[selectionY - 1][selectionX + 1].style.background = "#86E7F6";
                            }
                            if (selectionX < 9 && selectionY < 9) {
                                testBoard[selectionY + 1][selectionX + 1] = 2;
                                playergrid[selectionY + 1][selectionX + 1].style.background = "#86E7F6";
                            }
                        }
                        for (var i = 0; i < selected + 1; i++) {
                            if (selectionY > 0) {
                                testBoard[selectionY - 1][targetX] = 2;
                                playergrid[selectionY - 1][targetX].style.background = "#86E7F6";
                            }
                            if (selectionY < 9) {
                                testBoard[selectionY + 1][targetX] = 2;
                                playergrid[selectionY + 1][targetX].style.background = "#86E7F6";
                            }
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
                        while (boxes.length != 0) {
                            var current = boxes.pop();
                            current.style.background = "#FFFFFF";
                            console.log("white");   
                        }
                    }
                }
                else if (targetX == selectionX && Math.abs(diffrenceY) == selected) {

                    if (ships[selected] > 0) {
                        if (diffrenceY > 0) {
                            if (selectionY > 0) {
                                testBoard[selectionY - 1][selectionX] = 2;
                                playergrid[selectionY - 1][selectionX].style.background = "#86E7F6";
                            }
                            if (selectionY > 0 && selectionX > 0) {
                                testBoard[selectionY - 1][selectionX - 1] = 2;
                                playergrid[selectionY - 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionY > 0 && selectionX < 9) {
                                testBoard[selectionY - 1][selectionX + 1] = 2;
                                playergrid[selectionY - 1][selectionX + 1].style.background = "#86E7F6";
                            }

                            if (targetY < 9) {
                                testBoard[targetY + 1][selectionX] = 2;
                                playergrid[targetY + 1][selectionX].style.background = "#86E7F6";
                            }
                            if (targetY < 9 && selectionX > 0) {
                                testBoard[targetY + 1][selectionX - 1] = 2;
                                playergrid[targetY + 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (targetY < 9 && selectionX < 9) {
                                testBoard[targetY + 1][selectionX + 1] = 2;
                                playergrid[targetY + 1][selectionX + 1].style.background = "#86E7F6";
                            }
                        }
                        else if (diffrenceY < 0); {
                            if (targetY > 0) {
                                testBoard[targetY-1][selectionX] = 2;
                                playergrid[targetY-1][selectionX].style.background = "#86E7F6";
                            }
                            if (targetY > 0 && selectionX > 0) {
                                testBoard[targetY - 1][selectionX - 1] = 2;
                                playergrid[targetY - 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (targetY > 0 && selectionX < 9) {
                                testBoard[targetY - 1][selectionX + 1] = 2;
                                playergrid[targetY - 1][selectionX + 1].style.background = "#86E7F6";
                            }

                            if (selectionY < 9) {
                                testBoard[selectionY+1][selectionX] = 2;
                                playergrid[selectionY+1][selectionX].style.background = "#86E7F6";
                            }
                            if (selectionY < 9 && selectionX > 0) {
                                testBoard[selectionY + 1][selectionX - 1] = 2;
                                playergrid[selectionY + 1][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionY < 9 && selectionX < 9) {
                                testBoard[selectionY + 1][selectionX + 1] = 2;
                                playergrid[selectionY + 1][selectionX + 1].style.background = "#86E7F6";
                            }
                        }
                        for (var i = 0; i < selected + 1; i++) {
                            if (selectionX > 0) {
                                testBoard[targetY][selectionX - 1] = 2;
                                playergrid[targetY][selectionX - 1].style.background = "#86E7F6";
                            }
                            if (selectionX < 9) {
                                testBoard[targetY][selectionX + 1] = 2;
                                playergrid[targetY][selectionX + 1].style.background = "#86E7F6";
                            }
                            testBoard[targetY][targetX] = 1;
                            boxes.pop();
                            playergrid[targetY][targetX].style.background = "#000000";
                            if (diffrenceY < 0) {
                                targetY++;
                            }
                            else targetY--;;

                        }
                        ships[selected]--;
                    }
                    else {
                        while (boxes.length != 0) {
                            var current = boxes.pop();
                            current.style.background = "#FFFFFF";
                        }
                    }
                }
                else if (Math.abs(diffrenceY) != selected && Math.abs(diffrenceX) != selected) {
                    while (boxes.length != 0) {
                        var current = boxes.pop();
                        if (current.style.background == "#86E7F6") {
                            current.style.background == "#86E7F6";
                        }
                        else {
                            current.style.background = "#FFFFFF";
                        }
                        console.log("failed drag");

                    }

                }

                selected = 0;
                dragging = false;
                console.log("placed");
                if(ships[0] == 0 && ships[1] == 0 && ships[2] == 0 && ships[3] == 0){
                    for(var i = 0; i < testBoard.length; i++){
                        for(var j = 0; j < testBoard[i].length; j++){
                            if(testBoard[i][j]==0){
                                testBoard[i][j] = 2;
                                
                                playergrid[i][j].style.background = "#86E7F6";
                            }
                        }

                    }
                }

            }
            else {
                selected = 0;
                dragging = false;
            }
        }
    }
}

