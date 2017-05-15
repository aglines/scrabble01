// list of objects

// put bag array in here until JSON works
var initialBag = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B","C","C","D","D","D","D","E","E","E","E","E","E","E","E","E","E","E","E"];
// player

// bag
// bag will start as array
// that we splice from
// each turn when player gets new tiles

function Bag() {
  this.bagTiles = [];
};

function Player(name, score, rack) {
  this.name = name;
  this.score = score;
  this.rack = rack;
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
});
