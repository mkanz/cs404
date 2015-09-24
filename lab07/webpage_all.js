setTargetAddress('beaglebone.local', {
    initialized: run
});
setTargetAddress('192.168.7.2', {
    initialized: run
});

function run() {
    var b = require('bonescript');
    var port  = '/dev/i2c-2';		// Using bus 2
	var gy521 = 0x68;
    
    b.i2cOpen(port, gy521);

	b.i2cWriteBytes(port, 0x6b, [0]); // To Wake up the MPU6050
    
    setTimeout(getTemp, 200);

    function readData() {
		b.i2cReadBytes(port, 0x3b, 14, displayData);        
   }
    
	function displayData(x) {
		var data;
		if(x.event === 'return') {
                temp =  ((((x.return[6]<<8 | x.return[7])<<16)>>16)/340+36.53).toFixed(3);// temperature in celcius
                $('#temp').html(temp);
            
            acc_x = ((x.return[0]<<8 | x.return[1])<<16)>>16;
             $('#acc_x').html(acc_x);
            
             acc_y = ((x.return[2]<<8 | x.return[3])<<16)>>16;
             $('#acc_y').html(acc_y);
            
             acc_z = ((x.return[4]<<8 | x.return[5])<<16)>>16;
             $('#acc_z').html(acc_z);
		}
            setTimeout(readData, 200);
    }

}
