
var testLetters = [ "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
var initialBag = [];
for (var i = 0; i < 15; i++) {
  // this is testing code;  later, check actual letterValues
  var tile = new Tile(testLetters[i], i);
  initialBag.push(tile);
}

// test dictionary
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
  this.currentWord = [];
};

function Cell(x, y, pointMultiplier) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
  this.tile = {};
};
function Tile(letter, letterValue) {
  this.letter = letter;
  this.letterValue = letterValue;
};

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};


Game.prototype.completeHorizontalWord = function (partialWord) {
  var completeWord = [];
  var horizontal = this.board[partialWord[0].y];// take whole horizontal array from board with y coord
  var firstX = partialWord[0].x;
  var lastX = partialWord[partialWord.length-1].x;

// TODO: sort (cells) partialWord array
// because a user might not drop in a straightforward order

//
  for (var i = partialWord[0].x; i <= partialWord[partialWord.length-1].x; i++) {
    if (typeof horizontal[i].tile != 'undefined') {
      completeWord.push(horizontal[i]);
    } else {
      return false;
    }
  }
  // debugger;
// Check the beginning of horiz array to see if empty
// also check if we're at the edge of the board
  while ((firstX-1)>=0 && (typeof horizontal[firstX-1].tile != 'undefined')) {
    completeWord.unshift(horizontal[firstX-1]);
    firstX--;
  }
// Check the end of horiz array to see if empty
  while ((lastX+1<=14)&& (typeof horizontal[lastX+1].tile != 'undefined')) {
    completeWord.push(horizontal[lastX+1]);
    lastX++;
  }
  return completeWord;
};

Game.prototype.completeVerticalWord = function (partialWord) {
  var completeWord = [];
  var vertical = this.board[partialWord[0].x]; //take whole vertical array
  var firstY = partialWord][0].y;
  var lastY = partialWord[partialWord.length-1].y;

  // TODO: sort (cells) partialWord array
  // because a user might not drop in a straightforward order

  for (var i = partialWord[0].y; i <=partialWord[partialWord.length].y; i++) {
    if (typeof vertical[i].tile != 'undefined') {
      completeWord.push(vertical[i]);
    } else {
      return false;
    }
  }
  debugger;
  // Check the beginning of horiz array to see if empty
  // also check if we're at the edge of the board
  while ( (firstY-1)>=0 && (typeof vertical[firstY-1].tile != 'undefined')) {
    completeWord.unshift(vertical[firstY-1]);
    firstY--;
  }
  while ( (lastY+1<=14) && (typeof vertical[lastY+1].tile != 'undefined')) {
    completeWord.push(horizontal[lastY+1]);
    lastY++;
  }
  return completeWord;
};


Player.prototype.buildWord = function (tile) {

  return this.currentWord.push(tile);
};

Player.prototype.playerScore = function (wordScore) {
  // debugger;
  // console.log("wordScore inside function = ", wordScore);
  return this.score += wordScore;
};

Rack.prototype.generateRack = function (needNumber,initialBag) {
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, 14);
    this.rackTiles.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);
  };
}

Game.prototype.checkHorizontalPosition = function (currentWord) {
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

Game.prototype.checkVerticalPosition = function (currentWord) {
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

Game.prototype.checkValidWord = function (currentWord) {
  return dictionary.includes(currentWord);
};

Game.prototype.countScore = function(currentWord, cells) {
  var currentWordScore = 0;
  // debugger;
  for (var i = 0; i < currentWord.length-1; i++) {
    // count any letters with double letter score;
    if ( cells[i].pointMultiplier === parseInt("2") ) {
      currentWord[i].letterValue *= 2;
    }
    // multiply any word-level multipliers (2w, 3W);
    if (cells[i].pointMultiplier === "2W") {
      currentWordScore *= 2;
      }
      currentWordScore += currentWord[i].letterValue;
  }
  console.log("current word score = ", currentWordScore);
  return currentWordScore;

};

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};


//===========================================================================

$(function () {
  // var word = JSON.parse(bag);
  // // console.log(JSON.parse(words));
  // console.log(JSON.parse(word));
  // console.log(word[1]);
  var rack = new Rack();
  rack.generateRack(7, initialBag);
  var scrabbleGame = new Game();
  var player = new Player ("Tom", rack);
  // console.log("player = ", player);
  var cells=[];
  for (var i = 0, j = 0; i < 5; i++) {
    var cell = new Cell(i, j, 2, rack.rackTiles[i]);
    cells.push(cell);
    player.buildWord(rack.rackTiles[i]);
  }
  var score = scrabbleGame.countScore(player.currentWord, cells)
  console.log("word score1 = ", score);
  player.playerScore(score);
  scrabbleGame.countScore(player.currentWord, cells);
  // console.log("word score2 = ", score);
 // console.log("player score  ", score);
});




//  };
