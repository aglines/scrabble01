
// var testLetters = [ "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
// var initialBag = [];
// for (var i = 0; i < 15; i++) {
//   // this is testing code;  later, check actual letterValues
//   var tiles = new Tile(testLetters[i], i, 2);
//   initialBag.push(tile);
// }

var initialBag = JSON.parse(bag);
console.log(initialBag);

var dictionary = ["cat", "tree", "rain", "wind"];

function Bag() {
  this.bagTiles = [];
};

function Game() {
  this.board = [];
};

function Player(name, rack) {
  this.name = name;
  this.score = 0;
  this.rack = rack;
  this.partialWord = [];
};

function Tile() {
  this.letter;
  this.letterValue;
};

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = "";
  this.occupied = false;
  this.tile = {};
}

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};

Player.prototype.buildWordSection = function (cell) {
  this.partialWord.push(cell);
};

Game.prototype.generateBoard = function () {
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      var cell = new Cell (i, j)
      this.board.push(cell);
    }
  }
};

Game.prototype.completeHorizontalWord = function (partialWord) {
  var completeWord = [];
  var horizontal = this.board[partialWord[0].y];// take whole horizontal array from board with y coord
  var firstX = partialWord[0].x;
  var lastX = partialWord[partialWord.length-1].x;

// TODO: sort (cells) partialWord array

  for (var i = partialWord[0].x; i <= partialWord[partialWord.length-1].x; i++) {
    if (typeof horizontal[i].tile != 'undefined') {
      completeWord.push(horizontal[i]);
    } else {
      return false;
    }
  }
  debugger;

  while ((firstX-1)>=0 && (typeof horizontal[firstX-1].tile != 'undefined')) {
    completeWord.unshift(horizontal[firstX-1]);
    firstX--;
  }
  while ((lastX+1<=14)&& (typeof horizontal[lastX+1].tile != 'undefined')) {
    completeWord.push(horizontal[lastX+1]);
    lastX++;
  }
  return completeWord;
};

Game.prototype.completeVerticalWord = function (partialWord) {


};


Player.prototype.playerScore = function (wordScore) {
  debugger;
  return this.score += wordScore;
};

Rack.prototype.generateRack = function (needNumber,initialBag) {
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, initialBag.length-1);
    this.rackTiles.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);
  };
}

Game.prototype.checkVerticalPosition = function () {
  var checkVertical;
  for (var i = 0; i < .length-1; i++) {
    if ([i].x === [i+1].x) {
      checkVertical = true;
    } else {
      checkVertical = false;
    }
  }
  return checkVertical;
};

Game.prototype.checkHorizontalPosition = function () {
  var checkHorizontal;
  for (var i = 0; i < .length-1; i++) {
    if ([i].y === [i+1].y) {
      checkHorizontal = true;
    } else {
      checkHorizontal = false;
    }
  }
  return checkHorizontal;
};

Game.prototype.checkValidWord = function () {
  var wordString ="";
  for (var i = 0; i < .length; i++) {
    wordString+=[i].letterValue;
  }
  return dictionary.includes(wordString);

};

Game.prototype.countScore = function() {
  var Score = 0;
  debugger;
  for (var i = 0; i < .length-1; i++) {
    if ([i].pointMultiplier === parseInt("2")) {
      Score += [i].letterValue * 2;
    }
    // multiply any word-level multipliers (2w, 3W);
    if ([i].pointMultiplier === "2W") {
      Score *= 2;
    } else {
      Score += [i].letterValue;
    }
  }
  console.log("current word score = ", Score);
  return Score;

};



$(function () {
  var scrabbleGame = new Game();
  scrabbleGame.generateBoard();
  console.log(scrabbleGame.board);

  var rack = new Rack();
  rack.generateRack(7, initialBag);

  var player = new Player ("Tom", rack);




  console.log(player.);
  scrabbleGame.buildHorizontalWord(player.);




  //var score = scrabbleGame.countScore(player., cells)
  // console.log("word score1 = ", score);
  // player.playerScore(score);
  // scrabbleGame.countScore(player., cells);
  // player.playerScore(score);
  // console.log("word score2 = ", score);
  //
  // console.log("player score  ", score);
});

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};


// buildGameGrid(row, col){
//     let square = null
//     let GameArray = []
//     for(var tempRow = 0; tempRow < row; tempRow++){
//         GameArray.push([])
//     GameArray[tempRow].push(new Array(col))
//     for(var tempCol = 0; tempCol < col; tempCol++){
//           square = new Square(tempRow, tempCol)
//           GameArray[tempRow][tempCol] = square.render()
//         }
//     }
//     return GameArray
//  };
