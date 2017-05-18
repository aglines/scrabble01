# Scrabble

#### An Epicodus group project using object-oriented JavaScript, 05.15.17

#### **By Andrew Glines, Lena Kuchko, Anabel Ramirez, David Wilson**

## Description

This web application will play the game Scrabble.

|  behavior | input  | output  |
|---|---|---|
| Will have a "letter bag."  | click letter bag button  |  "fill player rack" |
| Will have a game board.  | game board  |  game board of 15 rows x 15 columns |
| The game board will have 2L, 3L, 2W, 3W point spaces.  | 2L, 3L, 2W, 3W  |  2L=double point letter, 3L+triple point letter, 2W=double points word, 3W=triple points word |
| A game can start for one to four players.  | click number of players  | 1, 2, 3, 4 |
| A player can drag a tile from the rack and drop into a game board space.  | click letter tile  |  place on board |
| Will have 100 letter tiles.  | Ax9, Bx2, Cx2, Dx4, Ex12, Fx2, Gx3, Hx2, Ix9, Jx1, Kx1, Lx4, Mx2, Nx6, Ox8, Px2, Qx1, Rx6, Sx4, Tx6, Ux4, Vx2, Wx2, Xx1, Yx2, Zx1, blank x 2  |  Ax9, Bx2, Cx2, Dx4, Ex12, Fx2, Gx3, Hx2, Ix9, Jx1, Kx1, Lx4, Mx2, Nx6, Ox8, Px2, Qx1, Rx6, Sx4, Tx6, Ux4, Vx2, Wx2, Xx1, Yx2, Zx1, blank x 2  |
| The letters will have point values.  | 0 points= blank; 1 point = A, E, I, L, N, O, R, S, T, U; 2 points = D, G; 3 points = B, C, M, P; 4 points = F, H, V, W, Y; 5 points = K, 8 points = J, X; 10 points = Q, Z | 0 points= blank; 1 point = A, E, I, L, N, O, R, S, T, U; 2 points = D, G; 3 points = B, C, M, P; 4 points = F, H, V, W, Y; 5 points = K, 8 points = J, X; 10 points = Q, Z |
| Will have one to four racks for one to four players.  | player1, player2, player3, player4 |  player1, player2, player3, player4 |
| Will supply each player rack with seven tiles.  | click letter bag button  |  "A B C D E F G" |
| Will total points per turn.  | P=3; E=1; T=1  |  5 |
| Will total points per player.  | 5, 12  | 17 |
| Will have a "letter bag."  | click letter bag button  |  "fill player rack to seven tiles unless last tiles" |
| Player can submit a word. | "pet"  | check against vertical/horizontal alignment, check dictionary, tally score against point multipliers, return a score or reject |
| Player can pass to next player. | "click pass"  | change to next player rack |

Wish list specs

|  behavior | input  | output  |
|---|---|---|
| Will have an optional timer.  | Click on or off at start of game. Starts on player turn.  | 25 minutes, changes player turn |
| Will give a player hints. | click hint button  | return best path |
| Can play a computer. | choose computer  | AI plays |

Coding done: issues to address

|  behavior/code | issue  | things needed  |
|---|---|---|
| Game ends loop check - prototype written. | needed to be added to player turn before score | call back and testing |
| Refill the player rack to have up to 7 tiles - prototype written.  | add to refill bag user interface logic  | call back, testing |
| Tally final score of multiple players - prototype written.  | make sure it's part of score prototype.   | call back, testing |
| Keep the tile from being moved once placed on the board.  | need to research draggable and droppable. | edit user-interface code |
| A player can return a tile rack pull and click for new tiles. This forfeits a turn. | add to business logic of racks.  | prototype, callback, testing |
| Score off of multiple word builds, part of partialWord prototype. | not sure it works  | call back, testing |



## Gh-pages

## Setup/Installation Requirements

Go to Github repository page at (insert link here)
Click the "download or clone" button and copy the link.
In your computers terminal type "git clone" & paste the copied link.
Once downloaded you can open the index.html file in the browser of your choice.
You can view the code using the text editor of your choice as well.

## Known Bugs

* Tiles do not lose draggable state once on the board and lock up while moved around on the rack.
* Refill bag does not refill the rack.
* Blanks removed and replaced with an "e" and a "t" to keep dictionary check from breaking.


## Support and contact details

If you have any issues or have questions, ideas, concerns, or contributions please contact any of the contributors through Github.

## Technologies Used

* HTML
* CSS
* Javascript
* Bootstrap
* JSON

### License
This software is licensed under the MIT license.

Copyright (c) 2017 **Andrew Glines, Lena Kuchko, Anabel Ramirez, David Wilson**
