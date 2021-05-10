/*
You are given two non-increasing 0-indexed integer arrays nums1​​​​​​ and nums2​​​​​​.

A pair of indices (i, j), where 0 <= i < nums1.length and 0 <= j < nums2.length, is valid if both i <= j and nums1[i] <= nums2[j]. The distance of the pair is j - i​​​​.

Return the maximum distance of any valid pair (i, j). If there are no valid pairs, return 0.

An array arr is non-increasing if arr[i-1] >= arr[i] for every 1 <= i < arr.length.

 

Example 1:

Input: nums1 = [55,30,5,4,2], nums2 = [100,20,10,10,5]
Output: 2
Explanation: The valid pairs are (0,0), (2,2), (2,3), (2,4), (3,3), (3,4), and (4,4).
The maximum distance is 2 with pair (2,4).
Example 2:

Input: nums1 = [2,2,2], nums2 = [10,10,1]
Output: 1
Explanation: The valid pairs are (0,0), (0,1), and (1,1).
The maximum distance is 1 with pair (0,1).
Example 3:

Input: nums1 = [30,29,19,5], nums2 = [25,25,25,25,25]
Output: 2
Explanation: The valid pairs are (2,2), (2,3), (2,4), (3,3), and (3,4).
The maximum distance is 2 with pair (2,4).
Example 4:

Input: nums1 = [5,4], nums2 = [3,2]
Output: 0
Explanation: There are no valid pairs, so return 0.
 

Constraints:

1 <= nums1.length <= 105
1 <= nums2.length <= 105
1 <= nums1[i], nums2[j] <= 105
Both nums1 and nums2 are non-increasing.
*/

var maxDistance = function(nums1, nums2) {
  let current = 0;
  let max = 0;
  for(let i = 0; i < nums1.length; i += 1) {
    current = Math.max(current, i);
    while (current < nums2.length - 1 && nums1[i] <= nums2[current + 1]) {
      current += 1;
    }
    
    max = Math.max(max, current - i);
  }
  
  return max;
};


const maxLen = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);

  const nums1 = [numberBetween(1,10)]
  const nums2 = [numberBetween(1,10)]

  for(let i = 1; i < len; i += 1) {
    const lastNum1 = nums1[i-1];
    const lastNum2 = nums2[i-1];
    nums1.push(numberBetween(lastNum1, lastNum1 + 20))
    nums2.push(numberBetween(lastNum2, lastNum2 + 20))
  }

  nums1.reverse()
  nums2.reverse()
  // logOutList('"' + str.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(grid));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([nums1, nums2])
}