/*
The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.



Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.

For example, given the dungeon below, the initial health of the knight must be at least 7 if he follows the optimal path RIGHT-> RIGHT -> DOWN -> DOWN.

-2 (K)	-3	3
-5	-10	1
10	30	-5 (P)
*/

var calculateMinimumHP = function (dungeon) {
  let mins = new Array(dungeon.length + 1)
    .fill(null)
    .map(() => new Array(dungeon[0].length + 1).fill(Infinity))
  mins[dungeon.length][dungeon[0].length - 1] = 1;

  for (let r = dungeon.length - 1; r >= 0; r -= 1) {
    for (let c = dungeon[0].length - 1; c >= 0; c -= 1) {
      const bestPath = Math.min(mins[r+1][c], mins[r][c+1]);
      mins[r][c] = Math.max(1, bestPath - dungeon[r][c]);
    }
  }

  return mins[0][0];
};

const tests = [
  [
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5],
  ],
  [
    [-4, -3, 3, 4, -6],
    [-5, -10, -1, -20, -14],
    [10, 30, -5, 2, -1],
    [-7, -3, 1, 2, 8],
  ],
];

for (let test of tests) {
  logOutList(calculateMinimumHP(test));
}