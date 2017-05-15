
var initialBag = ["A", "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];

function Bag() {
  this.bagTiles = [];
};

function Board() {
};

function Player(name, rack) {
  this.name = name;
  this.score = 0;
  this.rack = rack;
  this.currentWord = [];
};

function Cell(x, y, pointMultiplier, value) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
  this.value = value;
};

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};

Player.prototype.buildWord = function (tile) {
  return this.currentWord.push(tile);
};

Board.prototype.checkHorizontalPosition = function (currentWord) {
  var checkHorizontal;
  for (var i = 0; i < currentWord.length-1; i++) {
    console.log("currentWord[i] = ", currentWord[i]);
    // var j = i + 1;
    // console.log(j);
    if (currentWord[i].x === currentWord[i+1].x) {
      checkHorizontal = true;
    } else {
      checkHorizontal = false;
    }
  }
  return checkHorizontal;
};
Board.prototype.checkVerticalPosition = function (currentWord) {
  var checkVertical;
  for (var i = 0; i < currentWord.length-1; i++) {
    if (currentWord[i].y === currentWord[i+1].y) {
      checkVertical = true;
    } else {
      checkVertical = false;
    }
  }
  return checkVertical;
};

Rack.prototype.generateRack = function (needNumber,initialBag) {
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, 20);
    this.rackTiles.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);
  };
}

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};

$(function () {
  // var word = JSON.parse(bag);
  // // console.log(JSON.parse(words));
  // console.log(JSON.parse(word));
  // console.log(word[1]);
  var rack = new Rack();
  rack.generateRack(7, initialBag);

  var scrabbleBoard = new Board();
  var player = new Player ("Tom", rack);
  // console.log("player = ", player);
  var cells=[];
  for (var i = 0, j = 0; i < 5; i++) {
    var cell = new Cell(i, j, 2, rack.rackTiles[i]);
    cells.push(cell);
    player.buildWord(rack.rackTiles[i]);
    console.log("word = ", player.currentWord);
    // console.log("rack.rackTiles[i] = ",rack.rackTiles[i]);
  }
  scrabbleBoard.checkHorizontalPosition(cells);
  scrabbleBoard.checkVerticalPosition(cells);
  console.log(scrabbleBoard.checkHorizontalPosition(cells));
  console.log(scrabbleBoard.checkVerticalPosition(cells));

  // console.log(word[2]);
});



// buildBoardGrid(row, col){
//     let square = null
//     let boardArray = []
//     for(var tempRow = 0; tempRow < row; tempRow++){
//         boardArray.push([])
//     boardArray[tempRow].push(new Array(col))
//     for(var tempCol = 0; tempCol < col; tempCol++){
//           square = new Square(tempRow, tempCol)
//           boardArray[tempRow][tempCol] = square.render()
//         }
//     }
//     return boardArray
//  };
