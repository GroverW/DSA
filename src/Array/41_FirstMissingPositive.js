/*
Given an unsorted integer array, find the smallest missing positive integer.

Example 1:

Input: [1,2,0]
Output: 3
Example 2:

Input: [3,4,-1,1]
Output: 2
Example 3:

Input: [7,8,9,11,12]
Output: 1
Follow up:

Your algorithm should run in O(n) time and uses constant extra space.
*/

var firstMissingPositive = function (nums) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] <= 0) nums[i] = Infinity;
  }

  for (let num of nums) {
    const n = Math.abs(num);
    if (n <= nums.length) {
      if(nums[n - 1] > 0) nums[n - 1] *= -1;
    };
  }

  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] > 0) return i + 1;
  }

  return nums.length + 1;
};

const tests = [
  [1, 2, 0],
  [3, 4, -1, 1],
  [7, 8, 9, 11, 12],
];

for (let test of tests) {
  logOutList(firstMissingPositive(test))
}