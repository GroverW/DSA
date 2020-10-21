/*
Given a 2-dimensional grid of integers, each value in the grid represents the color of the grid square at that location.

Two squares belong to the same connected component if and only if they have the same color and are next to each other in any of the 4 directions.

The border of a connected component is all the squares in the connected component that are either 4-directionally adjacent to a square not in the component, or on the boundary of the grid (the first or last row or column).

Given a square at location (r0, c0) in the grid and a color, color the border of the connected component of that square with the given color, and return the final grid.



Example 1:

Input: grid = [[1,1],[1,2]], r0 = 0, c0 = 0, color = 3
Output: [[3, 3], [3, 2]]
Example 2:

Input: grid = [[1,2,2],[2,3,2]], r0 = 0, c0 = 1, color = 3
Output: [[1, 3, 3], [2, 3, 3]]
Example 3:

Input: grid = [[1,1,1],[1,1,1],[1,1,1]], r0 = 1, c0 = 1, color = 2
Output: [[2, 2, 2], [2, 1, 2], [2, 2, 2]]


Note:

1 <= grid.length <= 50
1 <= grid[0].length <= 50
1 <= grid[i][j] <= 1000
0 <= r0 < grid.length
0 <= c0 < grid[0].length
1 <= color <= 1000
*/


// attempt 1 (unnecessary visited)

var colorBorder = function (grid, r0, c0, color) {
  const colorToChange = grid[r0][c0];
  const toChange = [];
  const visited = new Array(grid.length).fill(null)
    .map(() => new Array(grid[0].length).fill(false));

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const getBorderCoords = (row, col) => {
    visited[row][col] = true;
    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext >= grid.length
        || cNext < 0
        || cNext >= grid[0].length
        || grid[rNext][cNext] !== colorToChange
      ) toChange.push([row, col]);
      else if (!visited[rNext][cNext]) getBorderCoords(rNext, cNext);
    }
  }

  getBorderCoords(r0, c0);

  for(let [row, col] of toChange) grid[row][col] = color;

  return grid;
};


// attempt 2 (slighly faster)

var colorBorder = function (grid, r0, c0, color) {
  const colorToChange = grid[r0][c0];

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const getBorderCoords = (row, col) => {
    grid[row][col] = -colorToChange;
    let isBorderCell = false;
    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext >= grid.length
        || cNext < 0
        || cNext >= grid[0].length
        || Math.abs(grid[rNext][cNext]) !== colorToChange
      ) isBorderCell = true;
      else if (grid[rNext][cNext] === colorToChange) getBorderCoords(rNext, cNext);
    }

    if (!isBorderCell) grid[row][col] = colorToChange;
  }

  getBorderCoords(r0, c0);

  for (let r = 0; r < grid.length; r += 1) {
    for (let c = 0; c < grid[0].length; c += 1) {
      if (grid[r][c] < 0) grid[r][c] = color;
    }
  }

  return grid;
};

const tests = [
  [[[1, 1], [1, 2]], 0, 0, 3],
  [[[1, 2, 2], [2, 3, 2]], 0, 1, 3],
  [[[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1, 2],
  [[
    [1, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 1, 2, 2],
    [1, 2, 2, 1, 2, 2, 2, 2],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 1, 1, 2, 2, 1],
  ], 3, 3, 3]
];

for (let test of tests) {
  logOutList(printGrid(colorBorder(...test)));
}