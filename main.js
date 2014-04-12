var five = require("johnny-five");
var arduino = five.Board();
console.log(arduino);
var joystick = require("./joystick.js");

var guitar = new joystick(0,3500,350);

guitar.on('button',buttonPressed);

var buttons = [false,false,false,false,false];
var notes = ["c","e","b","g","C"];
var hdd;

function buttonPressed(trigger) {
    switch(trigger.value) {
        case 0:
            buttons[trigger.number] = false;
            break;
        case 1:
            buttons[trigger.number] = true;
            break;
    }
}

arduino.on("ready",function() {
    hdd = [ new five.Piezo(2),
            new five.Piezo(3),
            new five.Piezo(4),
            new five.Piezo(5),
            new five.Piezo(6)];
    
    this.loop(100, function() {
        buttons.forEach(function(pressed,index,array) {
            if(pressed) {
                console.log("Playing "+index+" note "+notes[index]);
                hdd[index].song(notes[index],"1");
            }
        });
    });
});
