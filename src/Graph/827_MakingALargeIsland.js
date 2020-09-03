/*
In a 2D grid of 0s and 1s, we change at most one 0 to a 1.

After, what is the size of the largest island? (An island is a 4-directionally connected group of 1s).

Example 1:

Input: [[1, 0], [0, 1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
Example 2:

Input: [[1, 1], [1, 0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.
Example 3:

Input: [[1, 1], [1, 1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.
*/

var largestIsland = function (grid) {
  const queue = [];
  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let maxArea = 0;
  let groupSize = [0];
  let groups = {};

  const search = (r, c, group) => {
    groups[`${r},${c}`] = group;
    grid[r][c] = -1;
    groupSize[group] += 1;

    for (let [rDiff, cDiff] of tests) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;
      if (
        rNext < 0
        || rNext >= grid.length
        || cNext < 0
        || cNext >= grid[0].length
        || groups[`${rNext},${cNext}`]
        || grid[rNext][cNext] !== 1
      ) continue;

      search(rNext, cNext, group);
    }

    return groupSize[group];
  }

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      if (grid[row][col] === 0) {
        queue.push([row, col]);
      } else if (grid[row][col] === 1) {
        groupSize.push(0);
        const group = groupSize.length - 1;
        maxArea = Math.max(maxArea, search(row, col, group));
      }
    }
  }

  for (let [r, c] of queue) {
    let localMax = 1;
    const groupsUsed = {};
    for (let [rDiff, cDiff] of tests) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;
      const group = groups[`${rNext},${cNext}`];
      if (
        rNext < 0
        || rNext >= grid.length
        || cNext < 0
        || cNext >= grid[0].length
        || !group
        || groupsUsed[group]
      ) continue;
      localMax += groupSize[group];

      groupsUsed[group] = true;
    }
    maxArea = Math.max(maxArea, localMax);
  }

  return maxArea;
};

const tests = [
  [
    [1, 0],
    [0, 1],
  ],
  [
    [1, 1],
    [1, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
];

for (let test of tests) {
  logOutList(largestIsland(test));
}