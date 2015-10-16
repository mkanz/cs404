var b = require('bonescript');
var pos = {};

b.pinMode('P9_15', b.INPUT);

function onX(x) {
    pos.x = parseFloat(x.value * 100).toFixed(2);
    b.analogRead('P9_38', onY);
}

function onY(x) {
    pos.y = parseFloat(x.value * 100).toFixed(2);
    console.log(JSON.stringify(pos));
    
}

function state(x){
    console.log('button state = ' + x.value);
}
function read(){
    b.analogRead('P9_36', onX);
    b.digitalRead('P9_15', state);
    setTimeout(read,1000);
}

setTimeout(read,1000);
