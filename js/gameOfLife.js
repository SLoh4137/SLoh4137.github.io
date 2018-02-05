var board = {};
onload = function startGame() {
	var width = document.getElementById("size").clientWidth,
		height = document.getElementById("size").clientWidth,
        squareSize = 10,
        
		canvas = document.getElementById("gameOfLife"),
		boundingRect = {},
		context = {};
		
	//Begin initialization
	
	canvas.width = width;
	canvas.height = height;
    
	boundingRect = canvas.getBoundingClientRect();
	context = canvas.getContext("2d");
	
	//document.body.insertBefore(canvas, document.body.childNodes[0]);
	
	board = {
		data: createBlankArray(width, height),
		state: 0,
		
		update: function() {
			var x, y;
			var flipState = (this.state + 1) % 2;
			var ctx = context;
			
			for(x = 0; x < width; x++) {
			  for(y = 0; y < height; y++) {
				  
				let left = x - 1, right = x + 1, up = y - 1, down = y + 1,
					liveCount = 0, curCell = this.data[x][y];
				
				//Get the pos of nearby cells. If at edge, wraps around
				if(left < 0) left = width - 1;
				if(right >= width) right = 0;
				if(up < 0) up = height - 1;
				if(down >= height) down = 0;
					
                //Left, Right, Up, Down
                if(this.data[left][y][this.state]) liveCount++;
                if(this.data[right][y][this.state]) liveCount++;
                if(this.data[x][up][this.state]) liveCount++;
                if(this.data[x][down][this.state]) liveCount++;
				
				//Corners
				if(this.data[left][up][this.state]) liveCount++;
				if(this.data[left][down][this.state]) liveCount++;
                if(this.data[right][up][this.state]) liveCount++;
                if(this.data[right][down][this.state]) liveCount++;
						
                //Check if the current cell should be alive  
                curCell[flipState] = (liveCount == 3 || (liveCount == 2 && curCell[this.state])) ? true : false
				
				//If the current state is different than previous, change color
				if(curCell[this.state] != curCell[flipState]) {
                    
					ctx.fillStyle = curCell[flipState] ? "black" : "white";
					ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize); 
				}
				
			  }
			}
			
			this.state = flipState;
		},
		
		updateCell: function (x, y, color) {
			this.data[x][y][this.state] = color;
			context.fillStyle = color ? "black" : "white";
			context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize); 
		},
		
		createPoints: function (numPoints) {
			var i;
	
			for(i = 0; i < numPoints; i++) {
				let x = Math.floor(Math.random() * width / squareSize),
					y = Math.floor(Math.random() * height / squareSize),
					random = Math.floor(Math.random() * 2);

				board.updateCell(x, y, random);
			}
		},
		
	}
	
    setInterval(updateGameArea, 1000);
    board.createPoints(500);
}

function updateGameArea() {
  board.update();
}

/*
* rows is y, cols is x
*/
function createBlankArray(width, height) {
	var blankBoard = [], x, y;

	for(x = 0; x < width; x++) {
		blankBoard[x] = [];
		for(y = 0; y < height; y++) {
			blankBoard[x][y] = [false, false];
		}
	}

	return blankBoard;
}

