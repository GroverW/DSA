/*
Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Example:

Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
Note:

You must do this in-place without making a copy of the array.
Minimize the total number of operations.
*/

var moveZeroes = function(nums) {
  let end = nums.indexOf(0);
  let start = end;

  while(end < nums.length) {
      if (nums[end] !== 0) {
          [nums[start], nums[end]] = [nums[end], nums[start]];
          start += 1;
      }
      end += 1;
  }

  return nums;
};



const tests = [
  [0,1,0,3,12],
];

for (let test of tests) {
  logOutList(moveZeroes(test))
}