/*
You are given an integer array values where values[i] represents the value of the ith sightseeing spot. Two sightseeing spots i and j have a distance j - i between them.

The score of a pair (i < j) of sightseeing spots is values[i] + values[j] + i - j: the sum of the values of the sightseeing spots, minus the distance between them.

Return the maximum score of a pair of sightseeing spots.

 

Example 1:

Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
Example 2:

Input: values = [1,2]
Output: 2
 

Constraints:

2 <= values.length <= 5 * 104
1 <= values[i] <= 1000
*/

var maxScoreSightseeingPair = function(values) {
  let maxFromLeft = values[0];
  let max = 0;
  for (let i = 1; i < values.length; i += 1) {
    max = Math.max(max, maxFromLeft + values[i] - i);
    maxFromLeft = Math.max(maxFromLeft, values[i] + i);
  }
  
  return max;
};



const maxLen = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);

  const values = new Array(len).fill(0).map(() => numberBetween(1, 100));

  // logOutList('"' + str.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  logOutList(printRow(values));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([nums1, nums2])
}