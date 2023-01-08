/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let  currPlayer = 1; // active player: 1 or 2
let  board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

    for(let y = 0; y < HEIGHT; y++) {  
      board.push([]);     
    for(let x = 0; x < WIDTH; x++) {   
      board[y].push(null);    
    }
    }
    return board;
  }         

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  
  const top = document.createElement("tr");    // Const top is a created variable for table row. 
  top.setAttribute("id", "column-top");       //gives id of column-top to variable top
  top.addEventListener("click", handleClick);   //Addevent listener to click on tr 

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");    //row element is created and  set to variable headCell
    headCell.setAttribute("id", x);       //headCell(row) is now set AS x
    top.append(headCell);        //headCell, or rows, are added to the top column
  }
  htmlBoard.append(top); //headCell, or rows, are added to the top of the board

  
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");    //tr, which are columns, is assigned to variable row
    for (let x = 0; x < WIDTH; x++) {        // loop interates to width 6 times
      const cell = document.createElement("td");    // row element is created and set to variable cell
      cell.setAttribute("id", `${y}-${x}`);      // above element is set an id to y-x
      row.append(cell);         // the cell, is added to the top row.
    }
    htmlBoard.append(row);// created row (tr) is then added to the initial row. 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) { //reverse for loop. starts from end of array and keeps removing
    if (!board[y][x]) {  //if board is not complete or filled
      return y; // then return y column
    }
  }
  return null;  //if true, return empty
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`player${currPlayer}`);
  

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  return alert(msg);

}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  

  // check for win
  if (checkForWin()) {
    setTimeout (function(){
    return endGame(`Player ${currPlayer} won!`);
    },300);
  }
    else if(checkForTie()){
      setTimeout(function(){
      return endGame('Tie!');
      },300);
    }
  
   
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
 
  function checkForTie (){
    return board.every((row) => row.every((cell) => cell));
  
  }


currPlayer = currPlayer === 1 ? 2 : 1;

  console.log(currPlayer);
  
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {   //loops through height lenght 
    for (let x = 0; x < WIDTH; x++) {  //loops through width length
      //below: below cells are checked for win possibilites. 
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;  //if any of the four of the top are true, then return as winner  
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
