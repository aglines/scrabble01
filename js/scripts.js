

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

function Cell(y, x) {
  this.y = y;
  this.x = x;
  this.pointMultiplier;
  this.occupied = false;
  this.tile = {};
}

Player.prototype.getTilebyId = function (tileId) {
  for (var i = 0; i < this.rack.length; i++) {
   if (this.rack[i].id === tileId) {
     return this.rack[i];
   }
  }
};

Game.prototype.turn = function (player) {
  if (this.checkVerticalPosition()) {
    this.currentPlayer.currentWord = this.completeVerticalWord(this.currentPlayer.partialWord);
    console.log(this.currentPlayer.currentWord);
  }
  if (this.checkHorizontalPosition()) {
    this.currentPlayer.currentWord = this.completeHorizontalWord(this.currentPlayer.partialWord);
    console.log(this.currentPlayer.currentWord);
  }
  console.log(this.currentPlayer.countScore());
  return(this.currentPlayer.countScore());
};

Game.prototype.switchPlayer = function () {
  if (this.currentPlayer.name === this.players[0].name) {
    this.currentPlayer = this.players[1];
  } else {
    this.currentPlayer = this.players[0];
  }
};

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
  // debugger;
  var completeWord = [];
  var horizontal = this.board[partialWord[0].y];// take whole horizontal array from board with y coord
  var firstX = partialWord[0].x;
  var lastX = partialWord[partialWord.length-1].x;
  // TODO: sort (cells) partialWord array
  // because a user might not drop in a straightforward order
  for (var i = partialWord[0].x; i <= partialWord[partialWord.length-1].x; i++) {
    if (typeof horizontal[i].tile !== 'undefined') {
      completeWord.push(horizontal[i]);
    } else {
      return false;
    }
  }
  // debugger;
  // Check the beginning of horiz array to see if empty
  // also check if we're at the edge of the board
  while ((firstX-1)>=0 && (typeof horizontal[firstX-1].tile.id !== 'undefined')) {
    completeWord.unshift(horizontal[firstX-1]);
    firstX--;
  }
  // Check the end of horiz array to see if empty

  while ((lastX+1<=14)&& (typeof horizontal[lastX+1].tile.id !== 'undefined')) {
    completeWord.push(horizontal[lastX+1]);
    lastX++;
  }
  return completeWord;
};

Game.prototype.completeVerticalWord = function (partialWord) {
  // debugger;
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

  while ( (firstY-1)>=0 && (typeof this.board[firstY-1][xCoord].tile.id !== 'undefined')) {
    completeWord.unshift(this.board[firstY-1][xCoord]);
    firstY--;
  }
  while ( (lastY+1<=14) && (typeof this.board[firstY+1][xCoord].tile.id !== 'undefined')) {
    completeWord.push(this.board[firstY+1][xCoord]);
    lastY++;
  }
  return completeWord;
};

Player.prototype.buildPartialWord = function (cell) {
  this.partialWord.push(cell);
  this.removeTilefromRack(cell);

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

Game.prototype.checkVerticalPosition = function () {
  var checkVertical;
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {

    if (this.currentPlayer.partialWord[i].x === this.currentPlayer.partialWord[i+1].x) {
      checkVertical = true;
    } else {
      checkVertical = false;
    }
  }
  return checkVertical;
};

Game.prototype.checkHorizontalPosition = function () {
  // debugger;
  var checkHorizontal;
  console.log(this.currentPlayer.partialWord);
  for (var i = 0; i < this.currentPlayer.partialWord.length-1; i++) {
    // console.log(this.currentPlayer.partialWord[i].x);
    // console.log(this.currentPlayer.partialWord[i+1].x);
    if (this.currentPlayer.partialWord[i].y === this.currentPlayer.partialWord[i+1].y) {
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

Player.prototype.countScore = function() {
  debugger;
  var wordScoreMultiplier = 1;
  var currentWordScore = 0;

  for (var i = 0; i <= this.currentWord.length-1; i++) {
    if (typeof this.currentWord[i].pointMultiplier === 'undefined') {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue);
    } else if (this.currentWord[i].pointMultiplier === "2L") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue) * 2;
    } else if (this.currentWord[i].pointMultiplier === "3L") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue) * 3;
    } else if (this.currentWord[i].pointMultiplier === "2W") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue);
      wordScoreMultiplier = 2;
    } else if (this.currentWord[i].pointMultiplier === "3W") {
      currentWordScore += parseInt(this.currentWord[i].tile.letterValue);
      wordScoreMultiplier = 3;
    }
  };
  return currentWordScore *= wordScoreMultiplier;
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
  $("#start").click(function(){
    $(this).hide();
    var currentPlayer = scrabbleGame.currentPlayer;
    currentPlayer.refillRack(initialBag);
    for(i=0; i <= currentPlayer.rack.length-1; i++){
      $("#15-0" + i).append("<div class='draggable tile letter" + currentPlayer.rack[i].letter + "' id='" + currentPlayer.rack[i].id + "'>" + currentPlayer.rack[i].letter + '<span class="subscript">' + currentPlayer.rack[i].letterValue.sub() + '</span>' + "</div></div>");
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

      if ((cellYAxis <= 14) && (cellXAxis <= 14)) {
        scrabbleGame.board[cellYAxis][cellXAxis].tile = chosenTile;
        ui.draggable.removeClass("ui-draggable-dragging");
        scrabbleGame.board[cellYAxis][cellXAxis].pointMultiplier = cellScoreVariant;
        console.log(scrabbleGame.board[cellYAxis][cellXAxis]);

        ui.draggable.draggable('destroy');

        scrabbleGame.currentPlayer.buildPartialWord(scrabbleGame.board[cellYAxis][cellXAxis]);
      }
      // else if ((cellYAxis >= 15) || (cellXAxis >= 15)){
      //   ui.draggable.draggable('dont destroy');
      // }
      else{
        console.log("failing xomg");
      }
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
    scrabbleGame.turn();
    console.log(scrabbleGame.turn());
    $("#playerScore").append("<p>Your score is: " + scrabbleGame.turn() + "</p>");
  });

  $("button#reset").click(function(){
    console.log("RESET");
    $("#playerOneRack").empty("");
  });

  $("button#pass").click(function(){
    var turnType = "pass";
    console.log("PASS");
  });

  // $(".refill").click(function () {
  //   scrabbleGame.currentPlayer.refillRack();
  //   console.log(scrabbleGame.currentPlayer);
  // });


});
