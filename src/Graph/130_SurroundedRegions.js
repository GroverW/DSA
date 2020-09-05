/*
Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Example:

X X X X
X O O X
X X O X
X O X X
After running your function, the board should be:

X X X X
X X X X
X X X X
X O X X
Explanation:

Surrounded regions shouldn’t be on the border, which means that any 'O' on the border of the board are not flipped to 'X'. Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'. Two cells are connected if they are adjacent cells connected horizontally or vertically.
*/

var solve = function (board) {
  if (!board.length) return [];
  const safe = new Array(board.length).fill(null).map(() =>
    new Array(board[0].length).fill(false)
  );
  const bottom = board.length - 1;
  const right = board[0].length - 1;

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const search = (r, c) => {
    safe[r][c] = true;

    for (let [rDiff, cDiff] of tests) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;

      if (
        rNext < 0
        || rNext > bottom
        || cNext < 0
        || cNext > right
        || board[rNext][cNext] !== 'O'
        || safe[rNext][cNext]
      ) continue;

      search(rNext, cNext)
    }
  }

  for (let r = 0; r <= bottom; r += 1) {
    if (board[r][0] === 'O' && !safe[r][0]) search(r, 0);
    if (board[r][right] === 'O' && !safe[r][right]) search(r, right);
  }
  for (let c = 1; c < right; c += 1) {
    if (board[0][c] === 'O' && !safe[0][c]) search(0, c);
    if (board[bottom][c] === 'O' && !safe[bottom][c]) search(bottom, c);
  }

  for (let r = 1; r < bottom; r += 1) {
    for (let c = 1; c < right; c += 1) {
      if (board[r][c] === 'O' && !safe[r][c]) {
        board[r][c] = 'X';
      }
    }
  }

  return board;
};