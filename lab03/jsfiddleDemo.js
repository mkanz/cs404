setTargetAddress('192.168.7.2', {
    initialized: run
});

function run() {
    b = require('bonescript');
    var SLIDER = 'P9_36';
    var BUTTON = 'P9_18';
    b.pinMode(BUTTON, b.INPUT);
	
    getSliderStatus();

    function getSliderStatus() {
        b.analogRead(SLIDER, onSliderRead);
    }

    function onSliderRead(x) {
        if (!x.err) {
            $('#sliderStatus').html(x.value.toFixed(3));
        }
        getButtonStatus()
    }

    function getButtonStatus() {
        b.digitalRead(BUTTON, onButtonRead);
    }

    function onButtonRead(x) {
        if (!x.err) {
            $('#buttonStatus').html(x.value);
        }
        setTimeout(getSliderStatus, 20);
    }
}
	var LED = 'P9_14';
	var toggle = 1;

	function led(x) {
		console.log("led called with: %d", x);
		b.digitalWrite(LED, toggle);
		toggle = !toggle;
	}

