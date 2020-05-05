//VARIABLES ----------------------------------------------------

//creates sliders from html
var redSlider = document.getElementById("Red");
var greenSlider = document.getElementById("Green");
var blueSlider = document.getElementById("Blue");

//rgb values with default values
var redValue = 128;
var greenValue = 128;
var blueValue = 128;
var Colors = [];

//FUNCTIONS ----------------------------------------------------
function dragStart(str) {
    event.dataTransfer.setData("color", document.getElementById(str).innerText);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {

    event.preventDefault();
    var data = event.dataTransfer.getData("color");

    console.log("Dropped");
    console.log(data);
    dropColor(data);
}

function copy() {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = Colors;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    console.log("copied")

    document.getElementById('copyLabel').innerHTML = "Codes Copied!"

    setTimeout(function () {
        document.getElementById('copyLabel').innerHTML = "Copy Hex Codes";
    }, 2000);

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) { //converts to hex
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function setBG() { //sets background color and prints labels

    var rgbStr = "rgb(" + redValue + ',' + greenValue + ',' + blueValue + ")";
    var hexStr = rgbToHex(parseInt(redValue), parseInt(greenValue), parseInt(blueValue));

    document.body.style.backgroundColor = rgbStr;

    console.log(rgbStr);
    console.log(hexStr);

    document.getElementById('rgb').innerHTML = rgbStr;
    document.getElementById('hex').innerHTML = hexStr;
}

function dropColor(hex) {
    console.log("Color updated")

    redValue = hexToRgb(hex).r;
    greenValue = hexToRgb(hex).g;
    blueValue = hexToRgb(hex).b;

    var redSlider = document.getElementById("Red");
    redSlider.value = redValue;

    var greenSlider = document.getElementById("Green");
    greenSlider.value = greenValue;

    var blueSlider = document.getElementById("Blue");
    blueSlider.value = blueValue;

    setBG();

}

function setColor(btn, txt) { //set button color
    setBG();

    var rgbStr = "rgb(" + redValue + ',' + greenValue + ',' + blueValue + ")";
    var hexStr = rgbToHex(parseInt(redValue), parseInt(greenValue), parseInt(blueValue));

    var button = document.getElementById(btn)
    var label = document.getElementById(txt)

    button.style.backgroundColor = rgbStr;
    label.innerHTML = hexStr;
    Colors[(btn - 1)] = hexStr;
    console.log(Colors)
}

//LOGIC --------------------------------------------------------

setBG(); //sets initial bg color

//slider listeners, sets variable and then setsBG
redSlider.oninput = function () {
    redValue = this.value;
    console.log("R: " + redValue);
    setBG();
}
greenSlider.oninput = function () {
    greenValue = this.value;
    console.log("G: " + greenValue);
    setBG();
}
blueSlider.oninput = function () {
    blueValue = this.value;
    console.log("B: " + blueValue);
    setBG();
}
