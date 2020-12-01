/*
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []
 

Constraints:

0 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

const { logOutList } = require("../logging");

var threeSum = function (nums) {
  nums.sort((a, b) => a - b);

  const triplets = [];

  for (let i = 0; i < nums.length; i += 1) {
    const num1 = nums[i];

    if (num1 > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    const target = -num1;

    while (left < right) {
      const subSum = nums[left] + nums[right];
      if (subSum === target) {
        triplets.push([num1, nums[left], nums[right]]);
        left += 1;
        right -= 1;
        while (nums[left] === nums[left - 1]) left += 1;
        while (nums[right] === nums[right + 1]) right -= 1;
      } else if (subSum < target) {
        left += 1;
        while (nums[left] === nums[left - 1]) left += 1;
      } else {
        right -= 1;
        while (nums[right] === nums[right + 1]) right -= 1;
      }
    }

    while (nums[i] === nums[i + 1]) i += 1;
  }

  return triplets;
};

const tests = [
  [-1, 0, 1, 2, -1, -4],
  [],
  [0],
  [1, -2, -5, -13, -10, -11, 0, -12, -11, 13, -4, 9, 8, 10, -7, 3, -9, -12, -7, 8, -2, -12, 1, -10, -15, -8, 5, 14, -7, -8, -8, 9, -3, -6, 3, -5, -1, -11, -10, 3, -13, 1, -10, 3, -12, -10, -9, -13, -7, -1, 10, 6, -6, -12, 12, -13, -13, -6, -14, -13, -7, -7, 4, 6, -6, -8, 8, 8, -4, 13, -11, -1, -8, -14, 9, -5, -9, 7, -3, -1, 14, 14, 13, -7, 9, 2, -5, 12, 11, -12, 14, -11, -12, 3, 2, -2, 3, -5, -9, 14, -14, -13, -10, -7, -12, 14, 3, -6, -1, 8, 1, -2, -1, -1, 6, -6],
]

for (let test of tests) {
  logOutList(threeSum(test));
}