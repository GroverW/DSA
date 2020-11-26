/*
A Tic-Tac-Toe board is given as a string array board. Return True if and only if it is possible to reach this board position during the course of a valid tic-tac-toe game.

The board is a 3 x 3 array, and consists of characters " ", "X", and "O".  The " " character represents an empty square.

Here are the rules of Tic-Tac-Toe:

Players take turns placing characters into empty squares (" ").
The first player always places "X" characters, while the second player always places "O" characters.
"X" and "O" characters are always placed into empty squares, never filled ones.
The game ends when there are 3 of the same (non-empty) character filling any row, column, or diagonal.
The game also ends if all squares are non-empty.
No more moves can be played if the game is over.
Example 1:
Input: board = ["O  ", "   ", "   "]
Output: false
Explanation: The first player always plays "X".

Example 2:
Input: board = ["XOX", " X ", "   "]
Output: false
Explanation: Players take turns making moves.

Example 3:
Input: board = ["XXX", "   ", "OOO"]
Output: false

Example 4:
Input: board = ["XOX", "O O", "XOX"]
Output: true
Note:

board is a length-3 array of strings, where each string board[i] has length 3.
Each board[i][j] is a character in the set {" ", "X", "O"}.
*/

var validTicTacToe = function (board) {
  let xWinner = false;
  let oWinner = false;
  let oCount = 0;
  let xCount = 0;

  for (let i = 3; i >= 1; i -= 1) {
    for (let j = 3; j >= 1; j -= 1) {
      if (board[i - 1][j - 1] === 'X') xCount += 1;
      else if (board[i - 1][j - 1] === 'O') oCount += 1;
    }
  }

  if (xCount >= 3) xWinner = checkIfWinner(board, 'X');
  if (oCount >= 3) oWinner = checkIfWinner(board, 'O');

  if (
    (xWinner && oWinner)
    || (oCount > xCount)
    || (xCount - oCount > 1)
    || (xWinner && xCount === oCount)
    || (oWinner && oCount < xCount)
  ) return false;

  return true;
};

const checkIfWinner = (board, xo) => {
  return (
    (board[0][0] === xo && board[0][1] === xo && board[0][2] === xo)
    || (board[1][0] === xo && board[1][1] === xo && board[1][2] === xo)
    || (board[2][0] === xo && board[2][1] === xo && board[2][2] === xo)
    || (board[2][0] === xo && board[2][1] === xo && board[2][2] === xo)
    || (board[0][0] === xo && board[1][0] === xo && board[2][0] === xo)
    || (board[0][1] === xo && board[1][1] === xo && board[2][1] === xo)
    || (board[0][2] === xo && board[1][2] === xo && board[2][2] === xo)
    || (board[0][2] === xo && board[1][2] === xo && board[2][2] === xo)
    || (board[0][0] === xo && board[1][1] === xo && board[2][2] === xo)
    || (board[2][0] === xo && board[1][1] === xo && board[0][2] === xo)
  )
}

// for (let i = 0; i < 10; i += 1) {
//   const board = [];
//   const options = 'X O';
//   for (let i = 0; i < 3; i += 1) {
//     let row = '';
//     for (let j = 0; j < 3; j += 1) {
//       const option = Math.floor(Math.random() * 3);
//       row += options[option];
//     }
//     board.push(row);
//   }
//   logOutList(printRow(board));
// }

const tests = [
  ["OXX", "OXX", "O  "],
  ["XXX", "XOO", "OO "],
  ["XOX", "OXO", "XOX"],
  ["O  ", "   ", "   "],
  ["XOX", " X ", "   "],
  ["XXX", "   ", "OOO"],
  ["XOX", "O O", "XOX"],
  ["X O", "XXO", " OX"],
  ["  O", "OO ", "OXX"],
  ["OX ", " XO", "OOX"],
  ["XXX", "  O", "  O"],
  [" X ", " XO", "XX "],
  ["XX ", "X X", "  X"],
  ["XOO", "XOX", "OXO"],
  ["OO ", "XO ", "   "],
  [" OX", " X ", "OOO"],
  ["XX ", "XXO", "XO "],
  ["XOX", "  X", " O "],
  ["  O", " X ", "   "],
  [" XX", "  O", " X "],
  [" OO", "O X", "   "],
  ["  X", "X X", " XO"],
  ["X X", "XXX", "O  "],
  [" XX", "OO ", "XXX"],
  ["   ", "   ", "XOO"],
  ["OXX", "   ", "X X"],
  ["OX ", "O O", "OXO"],
  [" O ", "XXO", "O X"],
];

for (let test of tests) {
  logOutList(validTicTacToe(test));
}

/*
["OXX", "OXX", "O  "]
["XXX", "XOO", "OO "]
["XOX", "OXO", "XOX"]
["O  ", "   ", "   "]
["XOX", " X ", "   "]
["XXX", "   ", "OOO"]
["XOX", "O O", "XOX"]
["X O", "XXO", " OX"]
["  O", "OO ", "OXX"]
["OX ", " XO", "OOX"]
["XXX", "  O", "  O"]
[" X ", " XO", "XX "]
["XX ", "X X", "  X"]
["XOO", "XOX", "OXO"]
["OO ", "XO ", "   "]
[" OX", " X ", "OOO"]
["XX ", "XXO", "XO "]
["XOX", "  X", " O "]
["  O", " X ", "   "]
[" XX", "  O", " X "]
[" OO", "O X", "   "]
["  X", "X X", " XO"]
["X X", "XXX", "O  "]
[" XX", "OO ", "XXX"]
["   ", "   ", "XOO"]
["OXX", "   ", "X X"]
["OX ", "O O", "OXO"]
[" O ", "XXO", "O X"]
*/