
// var testLetters = [ "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
// var initialBag = [];
// for (var i = 0; i < 15; i++) {
//   // this is testing code;  later, check actual letterValues
//   var tiles = new Tile(testLetters[i], i, 2);
//   initialBag.push(tile);
// }

var initialBag = JSON.parse(bag);
console.log(initialBag);

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

// because a user might not drop in a straightforward order


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
  var firstY = partialWord[0].y;
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



};


Player.prototype.playerScore = function (wordScore) {
  // debugger;
  // console.log("wordScore inside function = ", wordScore);
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
  for (var i = 0; i < partialWord.length-1; i++) {
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
  for (var i = 0; i < partialWord.length-1; i++) {
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
  for (var i = 0; i < currentWord.length; i++) {
    wordString+=[i].letterValue;
  }
  return dictionary.includes(wordString);

};

Game.prototype.countScore = function() {
  var Score = 0;
  debugger;
  for (var i = 0; i < currentWord.length-1; i++) {
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


//===========================================================================

$(function () {
  var scrabbleGame = new Game();
  scrabbleGame.generateBoard();
  console.log(scrabbleGame.board);

  var rack = new Rack();
  rack.generateRack(7, initialBag);


  var player = new Player ("Tom", rack);








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



//  };
















































////////////////////// USER INTERFACE

$(document).ready(function(){

//TILE BAG USER INTERFACE
  $(".clickable img").click(function(){
    var newPlayerRack = new Rack();
    newPlayerRack.generateRack(7, initialBag);
    for(i=0; i <= newPlayerRack.rackTiles.length-1; i++){
      console.log(newPlayerRack.rackTiles[i]);
      $("div#playerOneRack").append("<div class='makeMeDraggable draggable letter" + newPlayerRack.rackTiles[i].letter + "'>" + newPlayerRack.rackTiles[i].letter + "</div>");
    }
    $(".draggable").draggable();
  });
  //DRAG AND DROP SQUARES
  $("div.draggable").draggable( {
    opacity: .4,
    create: function(){
      $(this).data('position',$(this).position())
    },
    cursorAt: {left:15},
    cursor: 'move',
    start: function(){
      $(this).stop(true,true)
    }
  });

  $('div.row').find('.cell').droppable({
    drop:function(event, ui){
      snapToMiddle(ui.draggable,$(this));
      var inputCellTileString = $(this).droppable(0).attr('id').split('-');
      console.log(inputCellTileString);
      var cellYAxis = parseInt(inputCellTileString[0]);
      var cellXAxis = parseInt(inputCellTileString[1]);
      var cellScoreVariant = inputCellTileString[2];
      console.log("The cell is occupied on the y axis at: " + cellYAxis);
      console.log("The cell is occupied on the x axis at: " + cellXAxis);
      console.log("The cell has a score variant of: " + cellScoreVariant);
    }
  });

  function snapToMiddle(dragger, target){
    var offset = target.offset();
    var topMove = (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
    var leftMove= (target.outerWidth(true) - dragger.outerWidth(true)) / 2;
    dragger.offset({ top: topMove + offset.top, left: leftMove + offset.left });
  };

//PLAYER BUTTON INPUT
  $("button#score").click(function(){
    console.log("SCORE!");
  });

  $("button#reset").click(function(){
    console.log("RESET");
  });

  $("button#pass").click(function(){
    console.log("PASS");
  });
});
