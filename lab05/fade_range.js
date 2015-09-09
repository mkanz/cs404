var b = require('bonescript');

//Set LED pins
var awPin1= "P9_14";
var awPin2= "P9_16";

// configure LED output pins
b.pinMode(awPin1, b.ANALOG_OUTPUT);
b.pinMode(awPin2, b.ANALOG_OUTPUT);

// call function to update brightness every 10ms
setInterval(reader, 10);

//Read sensor value and set brightness of LED
function reader(){
b.analogRead('P9_36', fadeLed );
}

//calibrate output of sensor
var calibrated;

//caliberated intensity of the LED
var intensity = 0;

function fadeLed(x) {
    calibrated = (x.value*1.8/.0064).toFixed(4) - 6.0;    //convert to inches
    if(calibrated > 10) calibrated = 10;		//reduce range of sensor

    intensity = (1 - (calibrated/ 10 ));	//set LED birghtness

    //write to console
    console.log('calibrated value= ' + calibrated.toFixed(3));

    //turn on LEDs
    b.analogWrite(awPin1, intensity);
    b.analogWrite(awPin2, intensity);
}
