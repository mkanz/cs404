var b = require('bonescript');
var port = '/dev/i2c-2';

var matrix = 0x70;
var time = 5000; // Delay between images in ms

b.pinMode('P9_14',b.INPUT);

// The first byte is GREEN, the second is RED.
var smile =
    [0x00, 0x3c, 0x00, 0x42, 0x28, 0x89, 0x04, 0x85,
      0x04, 0x85, 0x28, 0x89, 0x00, 0x42, 0x00, 0x3c]; //hexadecimal code for smile

var blank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

b.i2cOpen(port, matrix);

b.i2cWriteByte(port,  0x21); // Start oscillator (p10)
b.i2cWriteByte(port,  0x81); // Disp on, blink off (p11)
b.i2cWriteByte(port,  0xe7); // Full brightness (page 15)


function doSmile() {
	b.i2cWriteBytes(port, 0x00, smile);
}

setInterval(check, 100);

function check(){
	b.digitalRead('P9_14',checkButton)
}

function checkButton(x){
	if(x.value === 1)
		doSmile();
	else doClear();
}

function doClear(){
		b.i2cWriteBytes(port, 0x00, blank);

}
