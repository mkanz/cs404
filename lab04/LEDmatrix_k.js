//program that displays the letter K and then fades it out and in on the LED matrix
var b = require('bonescript');
var port = '/dev/i2c-2'
var matrix = 0x70;
var time = 5000; // Delay between images in ms

var K =
	[ 0x00 , 0x00, 0x44, 0x00, 0x48, 0x00, 0x50, 0x00,
	  0x60 , 0x00, 0x50, 0x00, 0x48, 0x00, 0x44, 0x00];

var blank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

b.i2cOpen(port, matrix);

b.i2cWriteByte(port,  0x21); // Start oscillator (p10)
b.i2cWriteByte(port,  0x81); // Disp on, blink off (p11)
b.i2cWriteByte(port,  0xe7); // Full brightness (page 15)

//doK();
function doK() {
	b.i2cWriteBytes(port, 0x00, K);
}

// Fade the display
setTimeout(doFadeDown, 2*time);
var fade = 0xef;
function doFadeDown() {
    b.i2cWriteByte(port,  fade);
	fade--;
	if(fade >= 0xe0) {
		setTimeout(doFadeDown, time/10);
	} else {
		setTimeout(doFadeUp);
	}
}
setTimeout(doFadeUp, 3*time);
function doFadeUp() {
    b.i2cWriteByte(port,  fade);
	fade++;
	if(fade <= 0xef) {
		setTimeout(doFadeUp, time/10);
	}
}
