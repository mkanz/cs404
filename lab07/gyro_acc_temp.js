var b = require('bonescript');
var port  = '/dev/i2c-2';		// Using bus 2
var gy521 = 0x68;
var ms    = 2000;			// Repeat time in ms

b.i2cOpen(port, gy521);

b.i2cWriteBytes(port, 0x6b, [0]); // To Wake up the MPU6050

setInterval(readData, ms)

function readData() {
	// i2cReadBytes(port, command, length, [callback])
	b.i2cReadBytes(port, 0x3b, 14, displayData);
}

// 16-btt values are stored as high-byte, then low-byte
// <<8 shifts lower bits to upper bit and | or's upper with lower

function displayData(x) {
	var data;
	if(x.event === 'return') {
		data = {
			accel: {
				x: ((x.return[0]<<8 | x.return[1])<<16)>>16,
				y: ((x.return[2]<<8 | x.return[3])<<16)>>16,
				z: ((x.return[4]<<8 | x.return[5])<<16)>>16
			},
			temp:  (((x.return[6]<<8 | x.return[7])<<16)>>16)/340+36.53,
			gyro: {
				x: ((x.return[ 8]<<8 | x.return[ 9])<<16)>>16,
				y: ((x.return[10]<<8 | x.return[11])<<16)>>16,
				z: ((x.return[12]<<8 | x.return[13])<<16)>>16 
			}
		};
		console.log(data);
	}
}
