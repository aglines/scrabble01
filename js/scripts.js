// list of objects

// put bag array in here until JSON works
var initialBag = ["A", "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
// player

// bag
// bag will start as array
// that we splice from
// each turn when player gets new tiles

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

function Cell(x, y, pointMultiplier) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
};

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};

Player.prototype.buildWord = function (tile) {
  debugger;
  return this.currentWord.push(tile);
};

Board.prototype.checkHorizontalPosition = function (currentWord) {
  var checkHorizontal;
  for (var i = 0; i < currentWord.length; i++) {
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
  for (var i = 0; i < currentWord.length; i++) {
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
  // random number between 1 and length of array
  // splice that number, place in Player's rack
  // repeat until player rack full
}


function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};


// cell on board
// board ?


// rack

//
$(function () {
  // var word = JSON.parse(bag);
  // // console.log(JSON.parse(words));
  // console.log(JSON.parse(word));
  // console.log(word[1]);
  var rack = new Rack();
  rack.generateRack(7, initialBag);
  console.log(rack);
  console.log(initialBag);

  debugger;
  var player = new Player ("Tom", rack);
  var word=" ";
  for (var i = 0, j = 0; i < 5; i++) {
    var cell = new Cell(i, j, 2);
    word += player.buildWord(rack.rackTiles[i]);
    console.log(rack.rackTiles[i]);
  }
  console.log(word[2]);



});
