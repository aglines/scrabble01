

var initialBag = JSON.parse(bag);
// console.log(initialBag);

// test dictionary
var dictionary = ["cat", "tree", "rain", "wind"];

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
};

function Bag() {
  this.bagTiles = initialBag;
};

function Game() {
  this.board = [];
  this.currentPlayer = {};
  this.players = [];
};

function Player(name) {
  this.name = name;
  this.score = 0;
  this.rack = [];
  this.partialWord = [];
  this.currentWord = [];

};

function Tile() {
  this.id;
  this.letter;
  this.letterValue;
};

function Cell(x, y) {
  this.x = x;
  this.y = y;
  this.pointMultiplier;
  this.occupied = false;
  this.tile = {};
}

// function Rack() {
//   this.rackTiles = [];
//   this.needNumber = 7;
// };

Player.prototype.getTilebyId = function (tileId) {
  for (var i = 0; i < this.rack.length; i++) {
   if (this.rack[i].id === tileId) {
     return this.rack[i];
   }
  }
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


Game.prototype.generateBoard = function () {
  this.board = [];
  for (var i = 0; i < 15; i++) {
    var array = [];
    for (var j = 0; j < 15; j++) {
      var cell = new Cell (i, j)
      array.push(cell);
    }
    this.board.push(array);
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
  var xCoord = partialWord[0].x;
  var firstY = partialWord[0].y;
  var lastY = partialWord[partialWord.length-1].y;

  // TODO: sort (cells) partialWord array
  // because a user might not drop in a straightforward order

  for (var i = firstY; i <= lastY; i++) {
    if (typeof this.board[i][xCoord].tile != 'undefined') {
      completeWord.push(this.board[i][xCoord]);
    } else {
      return false;
    }
  }

  while ( (firstY-1)>=0 && (typeof this.board[firstY-1][xCoord].tile != 'undefined')) {
    completeWord.unshift(this.board[firstY-1][xCoord]);
    firstY--;
  }
  while ( (lastY+1<=14) && (typeof this.board[firstY+1][xCoord].tile != 'undefined')) {
    completeWord.push(this.board[firstY+1][xCoord]);
    lastY++;
  }
  return completeWord;
};

Player.prototype.buildPartialWord = function (cell) {
  this.partialWord.push(cell);
  this.removeTilefromRack(cell)
};

Player.prototype.removeTilefromRack = function (cell) {
  var index = this.rack.indexOf(this.getTilebyId(cell.tile.id));
  if (index >= 0) {
  this.rack.splice(index, 1);
  }
};

Player.prototype.playerScore = function (wordScore) {
  return this.score += wordScore;
};

Player.prototype.refillRack = function (initialBag) {
  var needNumber = 7-this.rack.length;
  for (var i = 0; i < needNumber; i++) {
    var currentRandomInt = getRandomInt(0, initialBag.length-1);
    this.rack.push(initialBag[currentRandomInt]);
    initialBag.splice(currentRandomInt, 1);
  };
}



Game.prototype.checkHorizontalPosition = function () {
  // debugger;
  var checkHorizontal;
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {
    if (this.currentPlayer.partialWord[i].x === this.currentPlayer.partialWord[i+1].x) {
      checkHorizontal = true;
    } else {
      checkHorizontal = false;
    }
  }
  return checkHorizontal;
};

Game.prototype.checkVerticalPosition = function () {
  var checkVertical;
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {
    if (this.currentPlayer.partialWord[i].y === this.currentPlayer.partialWord[i+1].y) {
      checkVertical = true;
    } else {
      checkVertical = false;
    }
  }
  return checkVertical;
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

Game.prototype.startNewGame = function () {
  this.generateBoard();
  var playerOne = new Player ("Tom");
  var playerOne = new Player ("Jarry");
  this.currentPlayer = playerOne;
};
Game.prototype.checkEndGame = function () {
  var emptyRack;
  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i].rack.length<=0) {
      emptyRack = true;
    }
  }
  if (initialBag.length<=0 && emptyRack) {
    return true;
  } else {
    return false;
  }
};

//===========================================================================










////////////////////// USER INTERFACE

$(document).ready(function(){
    var scrabbleGame = new Game();
    scrabbleGame.startNewGame();


//TILE BAG USER INTERFACE
  $(".clickable img").click(function(){
    var currentPlayer = scrabbleGame.currentPlayer;
    currentPlayer.refillRack(initialBag);
    for(i=0; i <= currentPlayer.rack.length-1; i++){
      $("#playerOneRack").append("<div class='draggable letter" + currentPlayer.rack[i].letter + "' id='" + currentPlayer.rack[i].id + "'>" + currentPlayer.rack[i].letter + '<span class="subscript">' + currentPlayer.rack[i].letterValue.sub() + '</span>' + "</div></div>");
      console.log();
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
      $(this).stop(true,true);
    }
  });

  $('div.row').find('.cell').droppable({
    drop:function(event, ui){
      snapToMiddle(ui.draggable,$(this));
      console.log(ui.draggable);
      var inputCellTileString = $(this).droppable(0).attr('id').split('-');
      console.log(inputCellTileString);

      var cellYAxis = parseInt(inputCellTileString[0]);
      var cellXAxis = parseInt(inputCellTileString[1]);
      var cellScoreVariant = inputCellTileString[2];
      var tileId = $(ui.draggable)[0].id;
      var chosenTile = scrabbleGame.currentPlayer.getTilebyId(tileId);

      scrabbleGame.board[cellYAxis][cellXAxis].tile = chosenTile;
      scrabbleGame.board[cellYAxis][cellXAxis].pointMultiplier = cellScoreVariant;

      scrabbleGame.currentPlayer.buildPartialWord(scrabbleGame.board[cellYAxis][cellXAxis]);
      console.log(scrabbleGame.currentPlayer);
      console.log(scrabbleGame.currentPlayer.partialWord);
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
    console.log(scrabbleGame.checkVerticalPosition());
    console.log(scrabbleGame.checkHorizontalPosition());


  });

  $("button#reset").click(function(){
    console.log("RESET");
    $("#playerOneRack").empty("");
  });

  $("button#pass").click(function(){
    var turnType = "pass";

    console.log("PASS");
  });
});
