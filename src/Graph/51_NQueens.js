/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

 

Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]
 

Constraints:

1 <= n <= 9
*/

// w/ array lookup
var solveNQueens = function (n) {
  const board = new Array(n).fill(null)
    .map(() => new Array(n).fill('.'));

  const takenC = new Array(n).fill(false);
  const takenD = new Array(n * 2 - 1).fill(false);
  const takenU = new Array(n * 2 - 1).fill(false);
  const solutions = [];

  const toggleAvailability = (r, c) => {
    const availability = takenC[c] ? false : true;
    const d = n - r + c;
    const u = r + c;
    takenC[c] = availability;
    takenD[d] = availability;
    takenU[u] = availability;
  }

  const unavailable = (r, c) => {
    const d = n - r + c;
    const u = r + c;
    return (
      takenC[c]
      || takenD[d]
      || takenU[u]
    );
  }

  const solve = (r, numQueens) => {
    if (numQueens === n) {
      const solution = board.map((row) => row.join(''));
      solutions.push(solution);
      return;
    }
    
    if (r === n) return;;

    for(let c = 0; c < n; c += 1) {
      if(!unavailable(r, c)) {
        board[r][c] = 'Q';
        toggleAvailability(r, c);
        solve(r + 1, numQueens + 1);
        toggleAvailability(r, c);
        board[r][c] = '.';
      } 
    }
  }

  solve(0, 0);

  return solutions;
};

// w/ bitmask
var solveNQueens = function (n) {
  const board = new Array(n).fill(null)
    .map(() => new Array(n).fill('.'));

  let takenC = 0;
  let takenD = 0;
  let takenU = 0;
  const solutions = [];

  const toggleAvailability = (r, c) => {
    const d = n - r + c;
    const u = r + c;
    takenC ^= 1 << c;
    takenD ^= 1 << d;
    takenU ^= 1 << u;
  }

  const unavailable = (r, c) => {
    const d = n - r + c;
    const u = r + c;
    return (
      (takenC & 1 << c)
      || (takenD & 1 << d)
      || (takenU & 1 << u)
    );
  }

  const solve = (r, numQueens) => {
    if (numQueens === n) {
      const solution = board.map((row) => row.join(''));
      solutions.push(solution);
      return;
    }
    
    if (r === n) return;;

    for(let c = 0; c < n; c += 1) {
      if(!unavailable(r, c)) {
        board[r][c] = 'Q';
        toggleAvailability(r, c);
        solve(r + 1, numQueens + 1);
        toggleAvailability(r, c);
        board[r][c] = '.';
      } 
    }
  }

  solve(0, 0);

  return solutions;
};

const tests = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
];

for (let test of tests) {
  logOutList(printGrid(solveNQueens(test)));
}