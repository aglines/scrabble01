# Scrabble

#### An Epicodus group project using object-oriented JavaScript, 05.15.17

#### **By Andrew Glines, Lena Kuchko, Anabel Ramirez, David Wilson**

## Description

This web application will play the game Scrabble.

|  behavior | input  | output  |
|---|---|---|
| Will have a "letter bag."  | click letter bag button  |  "fill player rack" |
| Will have a game board.  | game board  |  game board graphic |
| The game board will have 2L, 3L, 2W, 3W point squares.  | 2L, 3L, 2W, 3W  |  2L=double point letter, 3L+triple point letter, 2W=double points word, 3W=triple points word |
| A player can drag and drop letter tiles.  | click letter tile  |  place on board |
| Will have 100 letter tiles.  | Ax9, Bx2, Cx2, Dx4, Ex12, Fx2, Gx3, Hx2, Ix9, Jx1, Kx1, Lx4, Mx2, Nx6, Ox8, Px2, Qx1, Rx6, Sx4, Tx6, Ux4, Vx2, Wx2, Xx1, Yx2, Zx1, blank x 2  |  Ax9, Bx2, Cx2, Dx4, Ex12, Fx2, Gx3, Hx2, Ix9, Jx1, Kx1, Lx4, Mx2, Nx6, Ox8, Px2, Qx1, Rx6, Sx4, Tx6, Ux4, Vx2, Wx2, Xx1, Yx2, Zx1, blank x 2  |
| The letters will have point values.  | 0 points= blank; 1 point = A, E, I, L, N, O, R, S, T, U; 2 points = D, G; 3 points = B, C, M, P; 4 points = F, H, V, W, Y; 5 points = K, 8 points = J, X; 10 points = Q, Z | 0 points= blank; 1 point = A, E, I, L, N, O, R, S, T, U; 2 points = D, G; 3 points = B, C, M, P; 4 points = F, H, V, W, Y; 5 points = K, 8 points = J, X; 10 points = Q, Z |
| Will have two to four racks for two to four players.  | player1, player2, player3, player4 |  player1, player2, player3, player4 |
| Will supply each player rack with seven tiles.  | click letter bag button  |  "A B C D E F G" |
| Will total points per turn.  | P=3; E=1; T=1  |  5 |
| Will total points per player.  | 5, 12  | 17 |
| Game ends when "letter bag" is empty.  | [empty bag array]  | play until last tile on board or forfeited |
| Will have a "letter bag."  | click letter bag button  |  "fill player rack to seven tiles unless last tiles" |
| Player can submit a word. | "pet"  | check against vertical/horizontal alignment, check dictionary, tally score against point multipliers, return a score or reject. |

Wish list specs

|  behavior | input  | output  |
|---|---|---|
| A player can return a tile rack fill for new tiles but forfeit a turn. | click replace last tiles  | new pull from "letter bag." |
| Will have an optional timer.  | Click on or off at start of game. Starts on player turn.  | 25 minutes, changes player turn |
| Can play a computer. | choose computer  | AI plays |
| Will give a player hints. | click hint button  | return best path |
| Score off of multiple word builds. | "pet" + "be" + "it" off of "bid"  | 5 + 4 + 2 |



## Gh-pages

## Setup/Installation Requirements

Go to Github repository page at (insert link here)
Click the "download or clone" button and copy the link.
In your computers terminal type "git clone" & paste the copied link.
Once downloaded you can open the index.html file in the browser of your choice.
You can view the code using the text editor of your choice as well.

## Known Bugs

No known bugs.

## Support and contact details

If you have any issues or have questions, ideas, concerns, or contributions please contact anabel@apparentinc.com.

## Technologies Used

* HTML
* CSS
* Javascript
* Bootstrap

### License
This software is licensed under the MIT license.

Copyright (c) 2017 **Andrew Glines, Lena Kuchko, Anabel Ramirez, David Wilson**
