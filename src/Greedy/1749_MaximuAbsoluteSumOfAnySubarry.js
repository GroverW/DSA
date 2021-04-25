/*
You are given an integer array nums. The absolute sum of a subarray [numsl, numsl+1, ..., numsr-1, numsr] is abs(numsl + numsl+1 + ... + numsr-1 + numsr).

Return the maximum absolute sum of any (possibly empty) subarray of nums.

Note that abs(x) is defined as follows:

If x is a negative integer, then abs(x) = -x.
If x is a non-negative integer, then abs(x) = x.
 

Example 1:

Input: nums = [1,-3,2,3,-4]
Output: 5
Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.
Example 2:

Input: nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
*/

var maxAbsoluteSum = function(nums) {
  let maxPositive = 0;
  let maxNegative = 0;
  let maxSum = 0;
  
  for(let num of nums) {
    maxPositive = Math.max(0, num, maxPositive + num);
    maxNegative = Math.min(0, num, maxNegative + num);
    maxSum = Math.max(maxSum, maxPositive, Math.abs(maxNegative));
  }
  
  return maxSum;
};

const maxLen = 100;

for (let i = 0; i < 100; i += 1) {
  const len = numberBetween(2, maxLen);
  
  const nums = new Array(len).fill(0).map(() => numberBetween(-25, 25))

  // logOutList('"' + s.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  logOutList(printRow(nums));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([len, restrictions])
}

const tests: Indexable<any>[] = [
  
];