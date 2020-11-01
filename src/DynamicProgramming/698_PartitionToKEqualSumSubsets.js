/*
Given an array of integers nums and a positive integer k, find whether it's possible to divide this array into k non-empty subsets whose sums are all equal.

 

Example 1:

Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: True
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
 

Note:

1 <= k <= len(nums) <= 16.
0 < nums[i] < 10000.
*/

var canPartitionKSubsets = function (nums, k) {
  const totalSum = nums.reduce((sum, val) => sum + val, 0);
  const subset = totalSum / k;

  nums.sort((a, b) => b - a);
  
  if (subset !== Math.floor(totalSum / k) || nums[0] > subset) return false;


  const visited = new Array(nums.length).fill(false);

  const canPartition = (currIndex, currSum, currSubset) => {
    currSum += nums[currIndex];
    currSubset = (currSubset + nums[currIndex]) % subset;

    if (currSum === totalSum) return true;

    visited[currIndex] = true;

    for (let i = 0; i < nums.length; i += 1) {
      if (
        visited[i]
        || currSubset + nums[i] > subset
      ) continue;

      if (canPartition(i, currSum, currSubset)) return true;
    }

    visited[currIndex] = false;

    return false;
  }

  return canPartition(0, 0, 0, 0);
};


const tests = [
  [[4, 3, 2, 3, 5, 2, 1], 4],
  [[7, 8, 3, 3, 3, 3, 3, 5, 5, 5, 12, 1, 1, 1, 14, 1], 5],
  [[7, 8, 3, 3, 3, 3, 3, 5, 5, 5, 12, 1, 1, 1, 14, 6], 5],
  [[5, 6, 7, 8, 9, 1, 2, 3, 4, 5], 5],
  [[1, 1, 2, 4], 4],
];

for (let test of tests) {
  logOutList(canPartitionKSubsets(...test));
}