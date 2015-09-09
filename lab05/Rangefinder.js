var b = require('bonescript');

//Call function reader every 100 ms
setInterval(reader, 100);

//Reads sensor input and calls print function
function reader(){
b.analogRead('P9_36', printStatus);
}

//calibrate the output of the ultrasonic sensor
var calibrated;

function printStatus(x) {
    //displays distance from sensor in inches
    calibrated = (x.value*1.8/.0064).toFixed(4) - 6.2;

    //print distance to console
    console.log(' Object distance = ' + calibrated.toFixed(3) + ' inches');
}
