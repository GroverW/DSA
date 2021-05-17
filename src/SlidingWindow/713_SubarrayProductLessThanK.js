/*
Your are given an array of positive integers nums.

Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than k.

Example 1:
Input: nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Note:

0 < nums.length <= 50000.
0 < nums[i] < 1000.
0 <= k < 10^6.
*/


var numSubarrayProductLessThanK = function(nums, k) {
  if (k <= 1) return 0;
  
  let count = 0;
  let current = 1;
  let start = 0;
  
  for (let i = 0; i < nums.length; i += 1) {
    current *= nums[i];
    
    while (current >= k) {
      current /= nums[start];
      start += 1;
    }
    
    count += i - start + 1;
  }
  
  return count;
};


const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);

  const nums = new Array(len).fill(0).map(() => numberBetween(1, 100));
  const k = numberBetween(100, 1000000)

  // logOutList('"' + s + '"')
  // logOutList(printRow(arr) + ',')
  // logOutList(printRow(nums));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([nums, k])
}

