

var initialBag = JSON.parse(bag);
// console.log(initialBag);

// test dictionary
var dictionary = ["cat", "tree", "rain", "wind"];

function Bag() {
  this.bagTiles = initialBag;
};

function Game() {
  this.board = [];
  this.currentPlayer = {};
};

function Player(name, rack) {
  this.name = name;
  this.score = 0;
  this.rack = rack;
  this.partialWord = [];
  this.currentWord = [];
};

function Tile() {
  this.id;
  this.letter;
  this.letterValue;
};

function Cell(x, y, pointMultiplier, tile) {
  this.x = x;
  this.y = y;
  this.pointMultiplier = pointMultiplier;
  this.occupied = false;
  this.tile = {};
}

function Rack() {
  this.rackTiles = [];
  this.needNumber = 7;
};



Game.prototype.Turn = function (player) {
  this.currentPlayer = player;

    if (this.checkHorizontalPosition()) {
            this.completeHorizontalWord(this.currentPlayer.partialWord);
    }
    if (this.checkVerticalPosition()) {
      this.completeVerticalWord(this.currentPlayer.partialWord);
    }
  if ( this.checkValidWord(this.currentPlayer.completeWord)) {
      countScore();
      console.log(countScore());
  }

}; // TURN function


// Player.prototype.buildWordSection = function (cell) {
//   this.partialWord.push(cell);
// };

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

Player.prototype.buildPartialWord = function (cell) {
  this.partialWord.push(cell);
};

Player.prototype.playerScore = function (wordScore) {
  return this.score += wordScore;
};

Rack.prototype.generateRack = function (needNumber,initialBag) {
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, initialBag.length-1);
    this.rackTiles.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);
  };
}

Game.prototype.checkForEndGame = function () {
  if (true) {
  }
};

Game.prototype.checkVerticalPosition = function () {
  var checkVertical;
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {

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

  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {

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

  for (var i = 0; i < this.currentPlayer.currentWord.length; i++) {
    wordString+=this.currentPlayer.currentWord[i].tile.letter;
    console.log("this.currentPlayer.currentWord[i].tile.letter = ",  this.currentPlayer.currentWord[i].tile.letter);

  }
  return dictionary.includes(wordString);

};

Game.prototype.countScore = function() {
  var wordScoreMultiplier = 1;
  var currentWordScore = 0;
  // debugger;
  console.log("this.currentPlayer.currentWord[0] = ", this.currentPlayer.currentWord[0]);
  for (var i = 0; i <= this.currentPlayer.currentWord.length-1; i++) {

    console.log("current letter value = ", this.currentPlayer.currentWord[i].tile.letterValue);

    if (this.currentPlayer.currentWord[i].pointMultiplier === "2L") {
      currentWordScore += this.currentPlayer.currentWord[i].tile.letterValue * 2
    }
    else if (this.currentPlayer.currentWord[i].pointMultiplier === "3L") {
      currentWordScore += this.currentPlayer.currentWord[i].tile.letterValue * 3
    }
    else if (this.currentPlayer.currentWord[i].pointMultiplier === "2W") {
      currentWordScore += this.currentPlayer.currentWord[i].tile.letterValue;
      var wordScoreMultiplier = 2;
    }
    else if (this.currentPlayer.currentWord[i].pointMultiplier === "3W") {
      currentWordScore += this.currentPlayer.currentWord[i].tile.letterValue;
      var wordScoreMultiplier = 3;
    }
    else {
      currentWordScore += this.currentPlayer.currentWord[i].tile.letterValue;
      }
  };
  currentWordScore *= wordScoreMultiplier;
  console.log("currentWordScore = ", currentWordScore);
  return currentWordScore;
};

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};

//===========================================================================




















































////////////////////// USER INTERFACE

$(document).ready(function(){
    var scrabbleGame = new Game();
    scrabbleGame.generateBoard();
    var newPlayerRack = new Rack();
    var playerOne = new Player ("Tom", newPlayerRack);
    var playerTwo = new Player ("Mary", newPlayerRack);

    scrabbleGame.currentPlayer = playerOne;


//TILE BAG USER INTERFACE
  $(".clickable img").click(function(){
    // var newPlayerRack = new Rack();
    newPlayerRack.generateRack(7, initialBag);
    for(i=0; i <= newPlayerRack.rackTiles.length-1; i++){
      console.log(newPlayerRack.rackTiles[i]);
      $("div#playerOneRack").append("<div class='makeMeDraggable draggable letter" + newPlayerRack.rackTiles[i].letter + "' id='" + newPlayerRack.rackTiles[i].id + "'>" + newPlayerRack.rackTiles[i].letter + "</div>");
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
      // $(this).addID($(".makeMeDraggable").draggable(0).attr('id'));
      var cellYAxis = parseInt(inputCellTileString[0]);
      var cellXAxis = parseInt(inputCellTileString[1]);
      var cellScoreVariant = inputCellTileString[2];
      var newCell = new Cell(cellXAxis, cellYAxis, cellScoreVariant);
      console.log(newCell);
      console.log(scrabbleGame.currentPlayer.buildPartialWord(newCell));

      // console.log("The cell is occupied on the y axis at: " + cellYAxis);
      // console.log("The cell is occupied on the x axis at: " + cellXAxis);
      // console.log("The cell has a score variant of: " + cellScoreVariant);
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
    // console.log("SCORE!");
    scrabbleGame.countScore();
  });

  $("button#reset").click(function(){
    console.log("RESET");
  });

  $("button#pass").click(function(){
    var turnType = "pass";

    console.log("PASS");
  });
});
