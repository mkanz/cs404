var b = require('bonescript');
var leds =    ["P9_11", "P9_13", "P9_15", "P9_17"];
var buttons = ["P9_12", "P9_14", "P9_16", "P9_18"];
var states = [ 0 , 0 , 0 , 0]; //States of the four LEDS


for(var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
}
for(var i in buttons) {
    b.pinMode(buttons[i], b.INPUT);
}

setInterval(check,100);

//Reading all the four buttons
function check(){
    for(var i in buttons){
	b.digitalRead(buttons[i], checkButton);
    }
}

//changing state of LED for the corresponding button.
function checkButton(x) {
   var i;
   if(x == buttons[0]) i =0;
	else if(x == buttons[1]) i = 1;
	else if(x == buttons[2]) i = 2;
	else i = 3;  
   if(x.value == 1){
	if(states[i] == 0) states[i] = 1;
	else states[i] = 0;
  	b.digitalWrite(leds[i], states[i]);
 }
}
