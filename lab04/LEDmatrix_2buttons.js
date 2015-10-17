var b = require('bonescript');
var port = '/dev/i2c-2'
var matrix = 0x70;
var time = 5000; // Delay between images in ms

b.pinMode('P8_8',b.INPUT);
b.pinMode('P8_10',b.INPUT);
// The first byte is GREEN, the second is RED.
var smile =
    [0x00, 0x3c, 0x00, 0x42, 0x28, 0x89, 0x04, 0x85,
      0x04, 0x85, 0x28, 0x89, 0x00, 0x42, 0x00, 0x3c]; //hexadecimal code for smile

var frown =
	[0x3c, 0x00, 0x42, 0x00, 0x85, 0x20, 0x89, 0x00, 
	 0x89, 0x00, 0x85, 0x20, 0x42, 0x00, 0x3c, 0x00];//hexadecimal code for a frowning face
var neutral =
	[0x3c, 0x3c, 0x42, 0x42, 0xa9, 0xa9, 0x89, 0x89,
	 0x89, 0x89, 0xa9, 0xa9, 0x42, 0x42, 0x3c, 0x3c];//hexadecimal code for a neutral face
var blank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

b.i2cOpen(port, matrix);

b.i2cWriteByte(port,  0x21); // Start oscillator (p10)
b.i2cWriteByte(port,  0x81); // Disp on, blink off (p11)
b.i2cWriteByte(port,  0xe7); // Full brightness (page 15)


function doFrown() {
	b.i2cWriteBytes(port, 0x00, frown);
}


function doNeutral() {
	b.i2cWriteBytes(port, 0x00, neutral);
}


function doSmile() {
	b.i2cWriteBytes(port, 0x00, smile);
}

setTimeout(check,100);
setTimeout(check2,100);

var fade ;

// Fade the display
function doFadeDown() {
    b.i2cWriteByte(port,  fade);
	fade--;
	if(fade >= 0xe0) {
		setTimeout(doFadeDown, time/10);
	} else {
		setTimeout(doFadeUp);
	}
}
function doFadeUp() {
    b.i2cWriteByte(port,  fade);
	fade++;
	if(fade <= 0xef) {
		setTimeout(doFadeUp, time/10);
	}
	else setTimeout(check2);
}
function check(){
	b.digitalRead('P8_8',faces);
	
}
function faces(x){
	console.log('f:'+x.value);
	if(x.value === 1){
		doFrown();
		setTimeout(doNeutral, 1*time);
		setTimeout(doSmile, 2*time);
		setTimeout(clear, 3*time);
		setTimeout(check, 4*time);
	}
	else setTimeout(check);
}

function clear(){
	b.i2cWriteBytes(port, 0x00, blank);
}

function brightness(x){
	console.log('b:'+x.value);
	if(x.value === 1){
			fade = 0xef;
			doFadeDown();
	}
	else setTimeout(check2);
}

function check2(){
	b.digitalRead('P8_10',brightness);
	}
