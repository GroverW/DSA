/*
Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example:

Input:
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
Output: 6
*/


var maximalRectangle = function (matrix) {
  if (!matrix.length) return 0;

  let maxArea = 0;

  let streak = 0;
  for (let j = 0; j < matrix[0].length; j += 1) {
    matrix[0][j] = +matrix[0][j];
    streak = matrix[0][j] ? streak + 1 : 0;
    maxArea = Math.max(maxArea, streak);
  }

  for (let i = 1; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[0].length; j += 1) {
      matrix[i][j] = matrix[i][j] === '1' ? matrix[i - 1][j] + 1 : 0;
      let k = j;
      let currLength = 0;
      let minHeight = Infinity;
      while (matrix[i][k] && k >= 0) {
        currLength += 1;
        minHeight = Math.min(minHeight, matrix[i][k]);
        maxArea = Math.max(maxArea, minHeight * currLength);
        k -= 1
      }
    }
  }

  return maxArea;
};

const tests = [
  [
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"]
  ],
  [
    ["1", "0", "1", "0", "0", "1", "0", "1", "1", "1", "1"],
    ["1", "0", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1"]
  ],
];

for (let test of tests) {
  logOutList(maximalRectangle(test));
}