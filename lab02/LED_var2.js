var b = require('bonescript');
var i;
var state = 0;

//Input pin
b.pinMode('P8_11', b.INPUT);

//Output Pin
b.pinMode('P9_11', b.OUTPUT);

setInterval(check,100);

function check(){
b.digitalRead('P8_11', LED10);
}


//Function that checks if the buttons have been pressed
//and turns led on 10 times then stops
function LED10(x) {
  if(x.value === 1){
    for(i=0;i<20;i++){
	if(state === 0) state = 1;
	else state = 0;
    	b.digitalWrite('P9_11', state);
    }
  }
}



