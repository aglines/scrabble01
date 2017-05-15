// list of objects

// player

// bag
// bag will start as array
// that we splice from
// each turn when player gets new tiles

function Bag() {
  this.bagTiles = [];
}

function Player(name, score, rack) {
  this.name = name;
  this.score = score;
  this.rack = rack;
}

function Cell(x, y, pointMultiplier) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
}

function Rack() {
  this.rackTiles = [];
}
Rack.prototype.generateRack(){

}


// cell on board
// board ?


// rack

//
