

var start = new Date().getTime();
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeShapeAppear() {

    var top = Math.random() * 65;
    var left = Math.random() * 65;
    var size = Math.random() * 200 + 1;


    if (Math.random() > 0.5) {
        document.getElementById("shape").style.borderRadius = "50%";
    }
    else {
        document.getElementById("shape").style.borderRadius = "0%";
    }

    document.getElementById("shape").style.backgroundColor = getRandomColor();
    document.getElementById("shape").style.width = size + "px";
    document.getElementById("shape").style.height = size + "px";
    document.getElementById("shape").style.top = top + "%";
    document.getElementById("shape").style.left = left + "%";

    document.getElementById("shape").style.display = "block";

    start = new Date().getTime();
}

function appearAfterDelay() {
    setTimeout(makeShapeAppear, Math.random() * 3000);
}

appearAfterDelay();

document.getElementById("shape").onclick = function () {

    var end = new Date().getTime();
    var timeTaken = (end - start) / 1000;

    document.getElementById("shape").style.display = "none";

    document.getElementById("timeTaken").innerHTML = timeTaken + "s";

    appearAfterDelay();

}

