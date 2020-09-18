/*
In a given array nums of positive integers, find three non-overlapping subarrays with maximum sum.

Each subarray will be of size k, and we want to maximize the sum of all 3*k entries.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

Example:

Input: [1,2,1,2,6,7,5,1], 2
Output: [0, 3, 5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.


Note:

nums.length will be between 1 and 20000.
nums[i] will be between 1 and 65535.
k will be between 1 and floor(nums.length / 3).
*/

var maxSumOfThreeSubarrays = function (nums, k) {
  const slices = new Array(nums.length).fill(0);
  let currSum = 0;
  for (let i = 0; i < nums.length; i += 1) {
    currSum += nums[i];
    slices[i] = nums[i];
    if (i >= k) {
      currSum -= nums[i - k];
    }
    if (i >= k - 1) {
      slices[i - k + 1] = currSum;
    }
  };

  const bestLeft = new Array(nums.length).fill(null);
  let best = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (slices[i] > slices[best]) {
      best = i;
    }
    bestLeft[i] = best;
  }

  const bestRight = new Array(nums.length).fill(null);
  best = nums.length - 1;
  for (let i = nums.length - 1; i >= 2 * k - 1; i -= 1) {
    if (slices[i] >= slices[best]) {
      best = i;
    }
    bestRight[i] = best;
  }

  const bestThree = [0, 0, 0];
  let bestSum;
  for (let i = k; i < nums.length - k; i += 1) {
    const left = bestLeft[i - k];
    const right = bestRight[i + k];
    const currSum = slices[left] + slices[i] + slices[right];
    if (currSum > bestSum || !bestSum) {
      bestSum = currSum;
      bestThree[0] = left;
      bestThree[1] = i;
      bestThree[2] = right;
    }
  }

  return bestThree;
};

const tests = [
  [[1, 2, 1, 2, 6, 7, 5, 1], 2],
  [[1, 2, 1, 2, 3, 2, 6, 7, 5, 1], 2],
  [[1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 9], 4],
  [[9,8,7,6,2,2,2,2], 2]
];


for (let test of tests) {
  logOutList(maxSumOfThreeSubarrays(...test))
}