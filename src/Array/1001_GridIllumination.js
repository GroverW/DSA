/*
You are given a grid of size N x N, and each cell of this grid has a lamp that is initially turned off.

You are also given an array of lamp positions lamps, where lamps[i] = [rowi, coli] indicates that the lamp at grid[rowi][coli] is turned on. When a lamp is turned on, it illuminates its cell and all other cells in the same row, column, or diagonal.

Finally, you are given a query array queries, where queries[i] = [rowi, coli]. For the ith query, determine whether grid[rowi][coli] is illuminated or not. After answering the ith query, turn off the lamp at grid[rowi][coli] and its 8 adjacent lamps if they exist. A lamp is adjacent if its cell shares either a side or corner with grid[rowi][coli].

Return an array of integers ans, where ans[i] should be 1 if the lamp in the ith query was illuminated, or 0 if the lamp was not.



Example 1:


Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
Output: [1,0]
Explanation: We have the initial grid with all lamps turned off. In the above picture we see the grid after turning on the lamp at grid[0][0] then turning on the lamp at grid[4][4].
The 0th query asks if the lamp at grid[1][1] is illuminated or not (the blue square). It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the red square.

The 1st query asks if the lamp at grid[1][0] is illuminated or not (the blue square). It is not illuminated, so set ans[1] = 1. Then, we turn off all lamps in the red rectangle.

Example 2:

Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
Output: [1,1]
Example 3:

Input: N = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
Output: [1,1,0]
*/

var gridIllumination = function (N, lamps, queries) {
  const lampLocations = {};
  const rowsOn = {};
  const colsOn = {};
  const lDiagonalsOn = {};
  const rDiagonalsOn = {};
  const answer = [];

  const turnOnLamp = (row, col) => {
    const leftDiagonal = N - row + col;
    const rightDiagonal = 2 * N - row - col;
    rowsOn[row] = rowsOn[row] + 1 || 1;
    colsOn[col] = colsOn[col] + 1 || 1;
    lDiagonalsOn[leftDiagonal] = lDiagonalsOn[leftDiagonal] + 1 || 1;
    rDiagonalsOn[rightDiagonal] = rDiagonalsOn[rightDiagonal] + 1 || 1;
  }

  const turnOffLamp = (row, col) => {
    const leftDiagonal = N - row + col;
    const rightDiagonal = 2 * N - row - col;
    rowsOn[row] -= 1;
    colsOn[col] -= 1;
    lDiagonalsOn[leftDiagonal] -= 1;
    rDiagonalsOn[rightDiagonal] -= 1;
  }

  const addLamp = (row, col) => {
    lampLocations[`${row},${col}`] = true;
    turnOnLamp(row, col);
  }

  const removeLamp = (row, col) => {
    lampLocations[`${row},${col}`] = false;
    turnOffLamp(row, col);
  }

  const isIlluminated = (row, col) => {
    const leftDiagonal = N - row + col;
    const rightDiagonal = 2 * N - row - col;
    return Boolean(
      rowsOn[row]
      || colsOn[col]
      || lDiagonalsOn[leftDiagonal]
      || rDiagonalsOn[rightDiagonal]
    ) * 1;
  }

  for (let [row, col] of lamps) {
    if (!lampLocations[`${row}${col}`]) addLamp(row, col);
  }

  const tests = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
  for (let [row, col] of queries) {
    answer.push(isIlluminated(row, col));
    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext >= N
        || cNext < 0
        || cNext >= N
      ) continue;

      if (lampLocations[`${rNext},${cNext}`]) {
        removeLamp(rNext, cNext);
      }
    }
  }

  return answer;
};

// a little faster!
var gridIllumination = function (N, lamps, queries) {
  const lampLocations = {};
  const rowsOn = {};
  const colsOn = {};
  const lDiagonalsOn = {};
  const rDiagonalsOn = {};

  const turnOnLamp = (row, col, coords) => {
    lampLocations[coords] = true;
    const leftDiagonal = N - row + col;
    const rightDiagonal = 2 * N - row - col;
    rowsOn[row] = rowsOn[row] + 1 || 1;
    colsOn[col] = colsOn[col] + 1 || 1;
    lDiagonalsOn[leftDiagonal] = lDiagonalsOn[leftDiagonal] + 1 || 1;
    rDiagonalsOn[rightDiagonal] = rDiagonalsOn[rightDiagonal] + 1 || 1;
  }

  const turnOffLamp = (row, col, coords) => {
    lampLocations[coords] = false;
    const leftDiagonal = N - row + col;
    const rightDiagonal = 2 * N - row - col;
    rowsOn[row] -= 1;
    colsOn[col] -= 1;
    lDiagonalsOn[leftDiagonal] -= 1;
    rDiagonalsOn[rightDiagonal] -= 1;
  }

  const isIlluminated = (row, col) => {
    const leftDiagonal = N - row + col;
    const rightDiagonal = 2 * N - row - col;
    return Boolean(
      rowsOn[row]
      || colsOn[col]
      || lDiagonalsOn[leftDiagonal]
      || rDiagonalsOn[rightDiagonal]
    ) * 1;
  }

  lamps.forEach(([row, col]) => {
    const coords = `${row},${col}`;
    !lampLocations[coords] && turnOnLamp(row, col, coords)
  });

  return queries.map(([row, col]) => {
    const result = isIlluminated(row, col);
    const maxR = Math.min(N - 1, row + 1);
    const maxC = Math.min(N - 1, col + 1);
    for (let r = Math.max(0, row - 1); r <= maxR; r += 1) {
      for (let c = Math.max(0, col - 1); c <= maxC; c += 1) {
        const coords = `${r},${c}`;
        lampLocations[coords] && turnOffLamp(r, c, coords);
      }
    }
    return result;
  })
};


const tests = [
  [5, [[0, 0], [4, 4]], [[1, 1], [1, 0]]],
  [5, [[0, 0], [4, 4]], [[1, 1], [1, 1]]],
  [5, [[0, 0], [0, 4]], [[0, 4], [0, 1], [1, 4]]],
  [
    28,
    [[22, 5], [15, 15], [22, 20], [17, 11], [7, 25], [10, 4], [23, 13], [16, 11], [21, 21], [10, 10], [2, 16], [14, 25], [16, 11], [18, 13], [21, 3], [24, 8], [9, 19], [13, 12]],
    [[8, 17], [7, 9], [19, 4], [21, 7], [10, 17], [26, 17], [3, 0], [16, 0], [26, 23], [24, 4], [19, 26], [2, 17], [14, 5], [8, 9], [2, 7], [8, 8], [22, 11], [20, 7], [11, 26], [26, 12], [6, 0], [1, 12], [9, 12]]
  ],
  [
    55,
    [[27, 49], [36, 31], [14, 36], [43, 45], [39, 29], [10, 0], [33, 39], [9, 29], [49, 21], [7, 35], [7, 43], [25, 44], [3, 9], [38, 1], [53, 7], [49, 43], [18, 27], [37, 7], [32, 26], [30, 41], [45, 6], [20, 28], [35, 5], [10, 5], [38, 32], [34, 25], [47, 27], [13, 26], [46, 7], [33, 7]],
    [[14, 23], [48, 5], [37, 33], [38, 22], [6, 25], [47, 20], [37, 20], [4, 22], [36, 19], [47, 39], [37, 1], [36, 21], [27, 37], [32, 16], [45, 5], [19, 18], [30, 49], [22, 30], [6, 3], [54, 14], [18, 33], [18, 16], [49, 6], [11, 1], [26, 24], [16, 10], [14, 21], [1, 44], [8, 47], [37, 12]]
  ],
  [
    71,
    [[11, 32], [52, 48], [6, 16], [56, 33], [27, 66], [30, 18], [45, 43], [60, 41], [59, 57], [62, 33], [29, 67], [1, 69], [7, 23], [5, 66], [49, 39], [24, 67], [51, 56], [16, 65], [50, 54], [11, 21], [33, 17], [31, 39], [69, 19]],
    [[42, 47], [63, 18], [37, 11], [23, 68], [16, 8], [33, 1], [59, 42], [10, 16], [10, 34], [32, 8], [55, 57], [32, 44], [32, 42], [13, 63], [61, 46], [48, 66], [15, 50], [15, 33], [0, 15], [4, 7], [9, 25], [65, 48], [30, 58], [55, 3], [64, 7], [37, 16], [60, 56], [36, 2], [26, 14], [18, 14], [28, 41], [5, 43], [5, 14], [63, 70], [21, 29], [46, 5], [38, 26], [20, 44], [22, 10], [34, 29], [37, 53], [6, 36], [46, 68], [17, 26], [69, 58], [67, 39], [36, 53], [25, 50], [40, 17], [60, 5]]
  ],
  [
    52,
    [[0, 20], [44, 33], [23, 33], [15, 25], [42, 11], [49, 48], [33, 30], [23, 47], [10, 30], [4, 1], [45, 14], [39, 14], [7, 20], [14, 0], [5, 6], [30, 23], [22, 8], [22, 43], [3, 11], [21, 12], [50, 50], [15, 44], [31, 26], [5, 12], [50, 34], [9, 11], [29, 1], [18, 26], [26, 17], [36, 50], [11, 49], [30, 31], [1, 1], [40, 25], [33, 2], [15, 12], [48, 51], [50, 18], [46, 0], [4, 38], [4, 40], [25, 41], [43, 6]],
    [[30, 47], [12, 15], [16, 44], [45, 41], [35, 21], [50, 4], [27, 48], [32, 6], [50, 42], [24, 48], [49, 10], [17, 34], [44, 1], [18, 41], [13, 10], [42, 39], [11, 39], [24, 17], [4, 46], [37, 39], [33, 19], [16, 43], [23, 8], [27, 9], [41, 30], [7, 49], [4, 12], [2, 34], [46, 8], [8, 0], [31, 38], [5, 24], [20, 22], [4, 29]]
  ],
  [
    81,
    [[34, 9], [58, 79], [24, 25], [26, 44], [37, 62]],
    [[44, 65], [53, 80], [47, 26], [64, 13], [60, 61], [61, 41], [40, 30], [60, 56], [39, 56], [27, 42], [48, 48], [48, 69], [20, 0], [37, 12], [56, 68], [78, 11], [54, 43], [53, 25], [60, 77], [22, 68], [0, 21], [3, 50], [37, 22], [16, 19], [3, 68], [45, 3], [39, 2], [52, 53], [77, 16], [44, 33], [31, 48]]
  ],
  [
    3,
    [[2, 2]],
    [[2, 1], [1, 2]]
  ],
  [
    19,
    [[6, 8], [6, 10], [9, 9], [15, 0], [5, 9], [4, 4], [18, 7]],
    [[0, 10], [12, 9], [5, 13], [7, 12], [5, 10], [12, 14], [3, 14], [16, 0], [16, 17], [12, 6], [12, 9], [2, 11], [3, 5], [13, 1], [15, 12], [14, 10], [2, 1]]
  ],
  [
    82,
    [[68, 51], [38, 35], [26, 66], [55, 3], [63, 43]],
    [[15, 16], [15, 68], [68, 18], [54, 65], [17, 11], [32, 41], [74, 73], [12, 71], [46, 29], [4, 77], [28, 73], [41, 9], [12, 4], [71, 40], [78, 63], [11, 64], [51, 72], [79, 28], [61, 60], [54, 78], [21, 74], [78, 38], [14, 62], [18, 74]]
  ],

];

for (let i = 0; i < 10; i += 1) {
  const N = Math.floor(Math.random() * 100);
  const numLamps = Math.floor(Math.random() * N);
  const lamps = [];
  const numQueries = Math.floor(Math.random() * N);
  const queries = [];

  for (let j = 0; j < numLamps; j += 1) {
    const row = Math.floor(Math.random() * N);
    const col = Math.floor(Math.random() * N);
    lamps.push([row, col]);
  }

  for (let k = 0; k < numQueries; k += 1) {
    const row = Math.floor(Math.random() * N);
    const col = Math.floor(Math.random() * N);
    queries.push([row, col]);
  }

  logOutList(N);
  logOutList(printGrid(lamps));
  logOutList(printGrid(queries));
}

for (let test of tests) {
  logOutList(printRow(gridIllumination(...test)));
}