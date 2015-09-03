var b = require('bonescript');

var awPin1= "P9_14";
var awPin2= "P9_16";

// configure pin 
b.pinMode(awPin1, b.ANALOG_OUTPUT);
b.pinMode(awPin2, b.ANALOG_OUTPUT);


// call function to update brightness every 10ms
setInterval(reader, 100);


function reader(){
b.analogRead('P9_36', Led );
}

function Led(x) {
    console.log('x.value = ' + x.value.toFixed(3));
    b.analogWrite(awPin1, x.value);
    b.analogWrite(awPin2, x.value);
}
