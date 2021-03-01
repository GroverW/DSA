/*
You are given two arrays of integers nums1 and nums2, possibly of different lengths. The values in the arrays are between 1 and 6, inclusive.

In one operation, you can change any integer's value in any of the arrays to any value between 1 and 6, inclusive.

Return the minimum number of operations required to make the sum of values in nums1 equal to the sum of values in nums2. Return -1​​​​​ if it is not possible to make the sum of the two arrays equal.

 

Example 1:

Input: nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
Output: 3
Explanation: You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed.
- Change nums2[0] to 6. nums1 = [1,2,3,4,5,6], nums2 = [6,1,2,2,2,2].
- Change nums1[5] to 1. nums1 = [1,2,3,4,5,1], nums2 = [6,1,2,2,2,2].
- Change nums1[2] to 2. nums1 = [1,2,2,4,5,1], nums2 = [6,1,2,2,2,2].
Example 2:

Input: nums1 = [1,1,1,1,1,1,1], nums2 = [6]
Output: -1
Explanation: There is no way to decrease the sum of nums1 or to increase the sum of nums2 to make them equal.
Example 3:

Input: nums1 = [6,6], nums2 = [1]
Output: 3
Explanation: You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed. 
- Change nums1[0] to 2. nums1 = [2,6], nums2 = [1].
- Change nums1[1] to 2. nums1 = [2,2], nums2 = [1].
- Change nums2[0] to 4. nums1 = [2,2], nums2 = [4].
 

Constraints:

1 <= nums1.length, nums2.length <= 105
1 <= nums1[i], nums2[i] <= 6
*/

var minOperations = function (nums1, nums2) {
  const counts1 = getDigitCounts(nums1);
  const counts2 = getDigitCounts(nums2);
  const sum1 = counts1[0];
  const sum2 = counts2[0];

  const minCounts = sum1 < sum2 ? counts1 : counts2;
  const maxCounts = sum1 >= sum2 ? counts1 : counts2;

  let minOperations = 0;
  let currentDiff = Math.abs(sum1 - sum2);
  let minCurrent = minCounts.findIndex((count, idx) => idx && count > 0);
  let maxCurrent = maxCounts.reduce((_, count, idx) => idx * (idx && count > 0), 0);

  while (minCurrent < 6 || maxCurrent > 1) {
    if (maxCurrent === 1 || (6 - minCurrent) > (maxCurrent - 1)) {
      const maxPossibleChange = (6 - minCurrent) * minCounts[minCurrent];
      if (maxPossibleChange < currentDiff) {
        currentDiff -= maxPossibleChange;
        minOperations += minCounts[minCurrent];
      } else {
        minOperations += Math.ceil(currentDiff / (6 - minCurrent));
        return minOperations;
      }
      minCurrent += 1;
    } else {
      const maxPossibleChange = (maxCurrent - 1) * maxCounts[maxCurrent];
      if (maxPossibleChange < currentDiff) {
        currentDiff -= maxPossibleChange;
        minOperations += maxCounts[maxCurrent];
      } else {
        minOperations += Math.ceil(currentDiff / (maxCurrent - 1));
        return minOperations;
      }
      maxCurrent -= 1;
    }
  }

  return -1;
};

const getDigitCounts = (digits) =>
  digits.reduce((counts, val) => {
    counts[0] += val;
    counts[val] += 1;
    return counts;
  }, [0, 0, 0, 0, 0, 0, 0]);

  const tests = [
    [[1,2,3,4,5,6], [1,1,2,2,2,2]],
    [[1,4,5,1,2,3,6,6,6,5,4,3,2,4,4,3,5,4,4,4,4,6,6,1,2], [6,6,6,2,5,5,5,3,3,3,1,1,1,1,1,1,1,2,2,2,2,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4]],
    [[1], [6]],
    [[5], [5]],
    [[1,1,1,1,1,1,1,1,1,1,1], [1,1,1,1,1]],
    [[1,1,1,1,1,1,1], [6]],
  ];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(minOperations(...test));
  console.timeEnd(i);
  i += 1;
}