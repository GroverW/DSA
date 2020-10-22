/*
Given a 2D array A, each cell is 0 (representing sea) or 1 (representing land)

A move consists of walking from one land square 4-directionally to another land square, or off the boundary of the grid.

Return the number of land squares in the grid for which we cannot walk off the boundary of the grid in any number of moves.



Example 1:

Input: [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation:
There are three 1s that are enclosed by 0s, and one 1 that isn't enclosed because its on the boundary.
Example 2:

Input: [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation:
All 1s are either on the boundary or can reach the boundary.


Note:

1 <= A.length <= 500
1 <= A[i].length <= 500
0 <= A[i][j] <= 1
All rows have the same size.
*/


// naive
var numEnclaves = function (A) {
  let enclaveTotal = 0;
  let isEnclave;

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const findEnclaves = (row, col) => {
    if (!A[row][col]) return 0;
    A[row][col] = 0;
    let totalFound = 1;

    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext >= A.length
        || cNext < 0
        || cNext >= A[0].length
      ) isEnclave = false;
      else totalFound += findEnclaves(rNext, cNext);
    }

    return totalFound;
  }

  for (let r = 0; r < A.length; r += 1) {
    for (let c = 0; c < A[0].length; c += 1) {
      if (A[r][c]) {
        isEnclave = true;
        const enclaves = findEnclaves(r, c);
        if (isEnclave) enclaveTotal += enclaves;
      }
    }
  }

  return enclaveTotal;
};

// search borders
var numEnclaves = function (A) {
  const lastRow = A.length - 1;
  const lastCol = A[0].length - 1;

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const removeNonEnclaves = (row, col) => {
    A[row][col] = 0;

    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext > lastRow
        || cNext < 0
        || cNext > lastCol
        || !A[rNext][cNext]
      ) continue;
      removeNonEnclaves(rNext, cNext);
    }
  }


  for (let r = 0; r <= lastRow; r += 1) {
    if (A[r][0]) removeNonEnclaves(r, 0);
    if (A[r][lastCol]) removeNonEnclaves(r, lastCol);
  }
  for (let c = 0; c <= lastCol; c += 1) {
    if (A[0][c]) removeNonEnclaves(0, c);
    if (A[lastRow][c]) removeNonEnclaves(lastRow, c);
  }

  let enclaveTotal = 0;
  for (let r = 0; r < A.length; r += 1) {
    for (let c = 0; c < A[0].length; c += 1) {
      if (A[r][c]) enclaveTotal += 1;
    }
  }

  return enclaveTotal;
};

const tests = [
  [[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
  [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
  [[0, 0, 0, 0, 0, 0, 1, 1, 1],[1, 1, 1, 1, 1, 0, 1, 1, 1],[0, 0, 0, 0, 0, 1, 1, 1, 1],[0, 1, 1, 1, 1, 1, 1, 1, 1],[0, 0, 0, 0, 0, 0, 1, 1, 1],[1, 1, 1, 1, 1, 0, 1, 1, 1],[0, 0, 0, 0, 0, 1, 1, 1, 1],[0, 1, 1, 1, 1, 1, 1, 1, 1],[1, 0, 0, 0, 0, 0, 0, 0, 0]],
  [[0, 1, 0, 0, 1, 1, 0],[1, 0, 0, 0, 0, 0, 0],[1, 0, 0, 1, 1, 1, 1],[0, 1, 0, 0, 0, 0, 0],[1, 0, 0, 0, 0, 0, 1],[1, 0, 0, 1, 0, 0, 0],[1, 0, 1, 0, 0, 1, 0]],
  [[0, 0, 1, 1, 1],[0, 0, 1, 1, 0],[1, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 1, 1, 0]],
  [[0, 0, 0],[0, 0, 1],[1, 1, 0]],
  [[1, 0, 1, 0, 0, 1, 0, 0, 0, 1],[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],[1, 0, 1, 1, 0, 0, 0, 1, 1, 1],[1, 0, 1, 1, 0, 0, 0, 1, 1, 0],[1, 1, 0, 0, 0, 0, 0, 0, 1, 1],[0, 0, 1, 0, 0, 0, 0, 1, 1, 0],[0, 0, 1, 1, 1, 1, 1, 1, 0, 1],[1, 1, 0, 1, 0, 1, 1, 0, 0, 1],[0, 0, 0, 1, 0, 1, 1, 0, 1, 1],[0, 1, 0, 1, 0, 0, 0, 0, 1, 0]],
  [[1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],[1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],[1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0],[1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],[0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],[1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],[1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],[1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],[1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],[0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],[0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],[0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],[0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0],[0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],[1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],[1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0],[0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],[1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1]],
  [[0, 1, 0, 0, 1, 0, 0, 0],[0, 0, 0, 1, 0, 0, 0, 0],[1, 0, 0, 1, 1, 1, 0, 0],[0, 1, 0, 1, 0, 1, 1, 0],[0, 0, 1, 1, 1, 1, 1, 0],[1, 1, 1, 0, 0, 0, 0, 0],[0, 1, 0, 1, 0, 1, 0, 1],[1, 1, 0, 0, 0, 0, 1, 0]],
  [[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],[1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],[0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],[1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],[0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],[0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],[0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],[0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],[1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],[0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],[1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],[1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],[1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0]],
  [[0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],[0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1],[0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],[0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],[1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],[0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],[1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],[1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],[1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0]],
  [[1, 0],[1, 0]],
  [[0, 0, 0, 1],[1, 1, 1, 0],[0, 0, 1, 0],[0, 0, 1, 1]],
  [[0, 0, 0, 0, 0, 1],[0, 1, 1, 0, 0, 0],[1, 0, 0, 0, 0, 0],[0, 1, 0, 0, 0, 0],[1, 1, 1, 0, 1, 1],[1, 1, 0, 0, 0, 0]],
];

for (let test of tests) {
  logOutList(numEnclaves(test));
}