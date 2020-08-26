/*
Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

Above is a histogram where width of each bar is 1, given height = [2,1,5,6,2,3].

Example:

Input: [2,1,5,6,2,3]
Output: 10
*/

var largestRectangleArea = function (heights) {
  let maxArea = 0;
  let stack = [];

  for (let i = 0; i < heights.length; i += 1) {
    let numHigher = 1;

    while (stack.length && heights[i] <= heights[stack[stack.length - 1][0]]) {
      const [idx, num] = stack.pop();
      numHigher += num;
      maxArea = Math.max(maxArea, (i - idx + num - 1) * heights[idx])
    }

    stack.push([i, numHigher]);
  }

  for (let [idx, num] of stack) {
    maxArea = Math.max(maxArea, (heights.length - 1 - idx + num) * heights[idx])
  }

  return maxArea;
};

const tests = [
  [2, 1, 5, 6, 2, 3],
  [1, 3, 5, 2, 1, 7, 9, 4, 5, 4, 4, 7],
  [5, 4, 4, 6, 3, 2, 9, 5, 4, 8, 1, 0, 0, 4, 7, 2]
];

for (let test of tests) {
  logOutList(largestRectangleArea(test))
}