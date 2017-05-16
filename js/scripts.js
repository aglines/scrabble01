
var testLetters = [ "A", "B", "C", "F", "P", "O", "O", "T", "R", "S","C","V","D","I","I","N","N","M","M","E","R","R","T","L","L","Q","Z","H","J","G","_"];
var initialBag = [];
for (var i = 0; i < 15; i++) {
  // this is testing code;  later, check actual letterValues
  var tile = new Tile(testLetters[i], i);
  initialBag.push(tile);
}

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

Player.prototype.buildWord = function (tile) {

  return this.currentWord.push(tile);
};

Player.prototype.playerScore = function (wordScore) {
  // debugger;
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
  player.playerScore(score);
  console.log("word score2 = ", score);

  console.log("player score  ", score);
});



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










































////////////////////// USER INTERFACE

$(document).ready(function(){
//DRAG AND DROP SQUARES
  // $(".makeMeDraggable").draggable({
  //   containment: '.container',
  //   snap: '.cell, .makeMeDraggable',
  //   snapMode: 'outter'
  // });
  // $(".makeMeDroppable").droppable({
  //   drop: handleDropEvent
  // });
  // function handleDropEvent(event, ui) {
  //   var draggable = ui.draggable;
  //   console.log('The tile ' + $(".makeMeDraggable").draggable(0).attr('id') + ' is now in "' + $(this).droppable(0).attr('id') + '" square')
  // };
  $("div.makeMeDraggable").draggable( {
    opacity: .4,
    create: function(){
      $(this).data('position',$(this).position())
    },
    cursorAt: {left:15},
    cursor: 'move',
    start: function(){
      $(this).stop(true,true)
      console.log("DRAGGABLE")
    }
  });

  $('div.row').find('.cell').droppable({
    drop:function(event, ui){
       snapToMiddle(ui.draggable,$(this));
       console.log("DROPPABLE");
    }
  });

  function snapToMiddle(dragger, target){
    // debugger;
    var offset = target.offset();
    var topMove = (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
    var leftMove= (target.outerWidth(true) - dragger.outerWidth(true)) / 2;
    dragger.offset({ top: topMove + offset.top, left: leftMove + offset.left });
  };

//TILE BAG USER INTERFACE
  $(".clickable img").click(function(){
    console.log("MOAR TILES");
  });

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
