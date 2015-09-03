var b = require('bonescript');

// setup starting conditions
var awValue = 0.01;
var awDirection = 1;
var awPin1= "P9_14";
var awPin2= "P9_16";

// configure pin 
b.pinMode(awPin1, b.ANALOG_OUTPUT);
b.pinMode(awPin2, b.ANALOG_OUTPUT);


// call function to update brightness every 10ms
setInterval(fade, 10);

// function to update brightness
function fade() {
 b.analogWrite(awPin1, awValue);
 b.analogWrite(awPin2, awValue);
 
 awValue = awValue + (awDirection*0.02);
 
 if(awValue > 1.0) { awValue= 1; awDirection = -1; }
 else if(awValue <= 0.01) { awValue = 0.01; awDirection = 1;}
}

