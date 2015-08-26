var b = require('bonescript');
var state = 0;

//Input pins
b.pinMode('P8_11', b.INPUT);
b.pinMode('P8_13', b.INPUT);

//Output Pin
b.pinMode('P9_11', b.OUTPUT);

setInterval(check,100);

function check(){
b.digitalRead('P8_11', ON);
b.digitalRead('P8_13', OFF);
}


//Function that checks if the button have been pressed
//and turns led on
function ON(x) {
  if(x.value === 1){
    state = 1;
    b.digitalWrite('P9_11', state);
  }
}

//Function that checks if the button have been pressed
//and turns led off 
function OFF(x) {
  if(x.value === 1){
    state = 0;
    b.digitalWrite('P9_11', state);
  }
}



