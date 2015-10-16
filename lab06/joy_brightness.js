var b = require('bonescript');
var pos = {};

var awPin1= "P9_14";


// configure pin 
b.pinMode(awPin1, b.ANALOG_OUTPUT);



// call function to update brightness every 10ms
setInterval(read, 10);


function read(){
    b.analogRead('P9_36', Led);
}

function Led(x) {
    console.log('x.value = ' + x.value.toFixed(3));
    b.analogWrite(awPin1, x.value);
}
