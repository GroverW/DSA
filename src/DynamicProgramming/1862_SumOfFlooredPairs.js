/*
Given an integer array nums, return the sum of floor(nums[i] / nums[j]) for all pairs of indices 0 <= i, j < nums.length in the array. Since the answer may be too large, return it modulo 109 + 7.

The floor() function returns the integer part of the division.

 

Example 1:

Input: nums = [2,5,9]
Output: 10
Explanation:
floor(2 / 5) = floor(2 / 9) = floor(5 / 9) = 0
floor(2 / 2) = floor(5 / 5) = floor(9 / 9) = 1
floor(5 / 2) = 2
floor(9 / 2) = 4
floor(9 / 5) = 1
We calculate the floor of the division for every pair of indices in the array then sum them up.
Example 2:

Input: nums = [7,7,7,7,7,7,7]
Output: 49
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
*/


var sumOfFlooredPairs = function(nums) {
  const MAX = Math.max(...nums);
  
  const countsGreaterOrEqualTo = new Array(MAX+1).fill(0);
  
  nums.forEach((num) => countsGreaterOrEqualTo[num] += 1 );
  
  for (let num = MAX - 1; num >= 0; num -= 1) {
    countsGreaterOrEqualTo[num] += countsGreaterOrEqualTo[num + 1];
  }

  const numCounts = nums.reduce((counts, num) => {
    counts.set(num, (counts.get(num) || 0) + 1);
    return counts;
  }, new Map())
  
  const MOD = 10 ** 9 + 7;
  let totalCount = 0;

  numCounts.forEach((count, num) => {
    let current = num;
    
    while (current <= MAX) {
      totalCount = (totalCount + countsGreaterOrEqualTo[current] * count) % MOD;
      current += num;
    }
  });
  
  return totalCount;
};

// const maxLen = 100;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(2, maxLen);
  
//   const nums = new Array(len).fill(0).map(() => numberBetween(1, 100))

//   // logOutList('"' + s + '"')
//   // logOutList(printRow(arr) + ',')
//   logOutList(printRow(nums));
//   // logOutList(printRow([nums1, nums2]) + ',');
//   // logOutLeetcode([nums, k])
// }

const nums = new Array(100000).fill(0).map((_, i) => i + 1);
logOutList(printRow(nums))