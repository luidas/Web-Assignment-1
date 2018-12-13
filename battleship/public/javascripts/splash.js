var playButton = document.getElementById("play");
playButton.onclick = addLink;
nickname = document.getElementById("nickname");

function addLink() {
    if(nickname.value != ""){
    window.location.href = "/play?name=" + nickname.value;
    }
}
var i = 6
a = 5;
console.log(a);
console.log(i);