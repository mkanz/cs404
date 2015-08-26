var b = require('bonescript');
var state = 0;

//Input pins
b.pinMode('P8_11', b.INPUT);
b.pinMode('P8_13', b.INPUT);

//Output Pins
b.pinMode('P9_11', b.OUTPUT);
b.pinMode('P9_13', b.OUTPUT);

setInterval(check,100);

function check(){
b.digitalRead('P8_11', LED1);
b.digitalRead('P8_13', LED1);
b.digitalRead('P8_11', LED2);
b.digitalRead('P8_13', LED2);
}


//Function that checks if any button have been pressed
//and turns led on/off accordingly
function LED1(x) {
  if(x.value === 1){
    b.digitalWrite('P9_11', b.HIGH);
  }
}


//Function that checks if both the buttons have been pressed
//and turns led on/off accordingly
function LED2(x) {
  if(x.value === 1){
    	if(state === 1){
    		b.digitalWrite('P9_13', b.HIGH);
		state = 0;	
	}
	else state = 1;
  }
  else  state = 0;
}

 


