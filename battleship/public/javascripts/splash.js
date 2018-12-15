var playButton = document.getElementById("play");
var visits = document.getElementById("visits");
playButton.onclick = addLink;
nickname = document.getElementById("nickname");

function addLink() {
    if(nickname.value != ""){
    window.location.href = "/play?name=" + nickname.value;
    }
}

document.cookie+=".";
var cookieValue = document.cookie.split("=")[1];
visits.append(document.createTextNode("You have visited this site " + document.cookie.length.toString() + " times."));
//console.log(document.cookie);