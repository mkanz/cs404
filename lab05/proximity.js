var b = require('bonescript');

//call function reader every 100ms
setInterval(reader, 100);

//Read value from proximity sensor and calls print function
function reader(){
    b.analogRead('P9_36', printStatus);
}

//calibrate the output of the proximity sensor
var calibrated;

//displays distance from proximity sensor in inches
function printStatus(x) {
    //print distance to console
    console.log('Object at ' + x.value*1.8/.0064 +'inches');
}
