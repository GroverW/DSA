/*
Given a 2D array of characters grid of size m x n, you need to find if there exists any cycle consisting of the same value in grid.

A cycle is a path of length 4 or more in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the same value of the current cell.

Also, you cannot move to the cell that you visited in your last move. For example, the cycle (1, 1) -> (1, 2) -> (1, 1) is invalid because from (1, 2) we visited (1, 1) which was the last visited cell.

Return true if any cycle of the same value exists in grid, otherwise, return false.

Example 1:

Input: grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
Output: true
Explanation: There are two valid cycles shown in different colors in the image below:

Example 2:

Input: grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
Output: true
Explanation: There is only one valid cycle highlighted in the image below:

Example 3:

Input: grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
Output: false
*/

var containsCycle = function (grid) {
  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      if (grid[r][c] !== grid[r][c].toUpperCase()) {
        if (cycleDetected(r, c, null, grid, tests)) return true;
      }
    }
  }

  return false;
};

const cycleDetected = (r, c, parent, grid, tests) => {
  if (grid[r][c] === grid[r][c].toUpperCase()) return true;

  grid[r][c] = grid[r][c].toUpperCase();

  for (let [rDiff, cDiff] of tests) {
    const rNext = r + rDiff;
    const cNext = c + cDiff;

    if (rNext < 0 || rNext >= grid.length) continue;
    if (cNext < 0 || cNext >= grid[0].length) continue;
    if (`${rNext},${cNext}` === parent) continue;

    if (
      grid[rNext][cNext].toLowerCase() === grid[r][c].toLowerCase() &&
      cycleDetected(rNext, cNext, `${r},${c}`, grid, tests)
    ) return true;
  }

  return false;
}



const tests = [
  [
    ["a", "a", "a", "a"],
    ["a", "b", "b", "a"],
    ["a", "b", "b", "a"],
    ["a", "a", "a", "a"]
  ],
  [
    ["c", "c", "c", "a"],
    ["c", "d", "c", "c"],
    ["c", "c", "e", "c"],
    ["f", "c", "c", "c"]
  ],
  [
    ["a", "b", "b"],
    ["b", "z", "b"],
    ["b", "b", "a"],
  ],
  [
    ["c","j","a","i","d","e","h","e","c","d","i","j","c","a","a","d","f","d","h"],
    ["c","b","j","i","b","h","e","c","c","f","a","i","e","g","j","a","h","j","i"],
    ["f","e","g","h","i","b","a","a","c","e","j","g","c","j","h","f","c","e","h"],
    ["e","a","j","d","h","j","a","b","h","i","e","b","i","b","j","e","i","f","i"],
    ["j","c","j","i","c","h","b","e","b","f","g","b","h","b","j","d","a","a","d"],
    ["e","j","a","g","e","e","f","g","h","e","f","h","h","b","a","h","h","c","e"],
    ["a","b","g","g","g","i","h","j","c","f","f","e","e","b","c","c","c","a","e"],
    ["e","d","c","g","c","e","g","i","e","c","f","j","b","b","d","b","h","h","f"],
    ["f","h","a","b","f","e","e","a","g","a","i","c","d","f","g","i","c","f","d"],
    ["b","c","j","c","j","f","g","d","g","b","a","e","a","g","c","b","d","b","f"],
    ["a","g","b","e","d","h","i","h","i","a","g","g","i","d","b","i","a","d","f"],
    ["b","j","f","a","g","c","d","a","i","c","h","g","j","h","d","g","h","i","h"],
    ["a","g","c","c","h","d","f","b","f","i","e","i","c","b","i","e","c","a","a"],
    ["d","e","h","g","g","c","b","g","e","a","d","b","g","f","j","j","b","i","f"],
    ["e","d","f","h","i","e","i","a","f","e","d","c","a","g","h","e","d","a","a"],
    ["d","g","f","j","c","a","g","e","h","g","b","g","e","c","i","a","b","b","f"],
    ["e","e","c","h","a","j","c","i","g","a","c","a","i","c","d","c","i","e","g"],
    ["f","h","d","j","b","d","f","e","j","f","j","h","h","h","i","f","f","e","j"],
    ["f","e","h","f","i","g","f","h","h","g","h","a","e","b","e","d","i","g","d"],
    ["d","d","b","f","f","b","f","h","f","b","j","j","g","h","j","c","c","g","b"]
  ]
];

for (let test of tests) {
  logOutList(containsCycle(test))
}