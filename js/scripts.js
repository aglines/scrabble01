
var testLetters = [ "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
var initialBag = [];
for (var i = 0; i < 15; i++) {
  // this is testing code;  later, check actual letterValues
  var tile = new Tile(testLetters[i], i, 2);
  initialBag.push(tile);
}

var initBag = JSON.parse(bag);
console.log(initBag);

var dictionary = ["cat", "tree", "rain", "wind"];

function Bag() {
  this.bagTiles = [];
};

function Game() {
};
function Player(name, rack) {
  this.name = name;
  this.score = 0;
  this.rack = rack;
  this.currentWord = [];
};

function Tile(letter, letterValue) {
  this.letter = letter;
  this.letterValue = letterValue;
};

function Cell(x, y, pointMultiplier) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
  this.tile = {};
}

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};

Player.prototype.buildWord = function (tile) {
  this.currentWord.push(tile);
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

Game.prototype.checkHorizontalPosition = function (currentWord) {
  var checkHorizontal;
  for (var i = 0; i < currentWord.length-1; i++) {
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
  var wordString ="";
  for (var i = 0; i < currentWord.length; i++) {
    wordString+=currentWord[i].letterValue;
  }
  return dictionary.includes(wordString);

};

Game.prototype.countScore = function(currentWord) {
  var currentWordScore = 0;
  debugger;
  for (var i = 0; i < currentWord.length-1; i++) {
    if (currentWord[i].pointMultiplier === parseInt("2")) {
      currentWordScore += currentWord[i].letterValue * 2;
    }
    // multiply any word-level multipliers (2w, 3W);
    if (currentWord[i].pointMultiplier === "2W") {
      currentWordScore *= 2;
    } else {
      currentWordScore += currentWord[i].letterValue;
    }
  }
  console.log("current word score = ", currentWordScore);
  return currentWordScore;

};



$(function () {
  // var word = JSON.parse(bag);
  // // console.log(JSON.parse(words));
  // console.log(JSON.parse(word));
  // console.log(word[1]);
  var rack = new Rack();
  rack.generateRack(7, initialBag);

  var scrabbleGame = new Game();

  var player = new Player ("Tom", rack);
  for (var i = 0, j = 0; i < 5; i++) {
    var tile = new Tile(i, j, 2, rack.rackTiles[i], letter, letterValue);
    player.buildWord(rack.rackTiles[i]);
  }
  console.log(player.currentWord);


  var score = scrabbleGame.countScore(player.currentWord, cells)
  console.log("word score1 = ", score);
  player.playerScore(score);
  scrabbleGame.countScore(player.currentWord, cells);
  player.playerScore(score);
  console.log("word score2 = ", score);

  console.log("player score  ", score);
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
