/*
The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

 

Example 1:


Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
Example 2:

Input: n = 1
Output: 1
 

Constraints:

1 <= n <= 9
*/

var totalNQueens = function (n) {
  let takenC = 0;
  let takenD = 0;
  let takenU = 0;
  let numSolutions = 0;

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
      numSolutions += 1;
      return;
    }
    
    if (r === n) return;;

    for(let c = 0; c < n; c += 1) {
      if(!unavailable(r, c)) {
        toggleAvailability(r, c);
        solve(r + 1, numQueens + 1);
        toggleAvailability(r, c);
      } 
    }
  }

  solve(0, 0);

  return numSolutions;
};

const tests = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
];

for (let test of tests) {
  logOutList(totalNQueens(test));
}