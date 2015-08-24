
var b = require('bonescript');
var buttons = ["P9_12", "P9_14", "P9_16", "P9_18"];
var x = 0, y = 0;
var grid = new Array(20);


for(var i in buttons) {
    b.pinMode(buttons[i], b.INPUT);
}

//Clearing the gris using blank spaces
for (var i = 0; i < grid.length; i++) {
	grid[i] = new Array(20);
	for (var j = 0; j < grid[i].length; j++) {
		grid[i][j] = ' ';
	}
}

setInterval(check,100);

//Reading each button 
function check(){
    for(var i in buttons){
	b.digitalRead(buttons[i], checkButton);
    }
}

//Printing the grid
function printGrid(grid) {
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			util.print(util.format("%s ", grid[i][j]));
		}
		util.print("\n");
	}
}


//Updating the position of the cursor
function checkButton(x) {
   var i;
     
   if(x.value == 1){
	if(x == buttons[0]) y--;
	else if(x == buttons[1]) y++;
	else if(x == buttons[2]) x++;
	else x--;
	grid[y][x] = '*';
	printGrid(grid);  	
   }

}

