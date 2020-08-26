/*
Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

Your algorithm should run in O(n) complexity.

Example:

Input: [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
*/

var longestConsecutive = function(nums) {
  let vals = {};
  let max = 0;

  for(let num of nums) vals[num] = true;

  for(let num of nums) {
      if(vals[num] && !vals[num - 1]) {
          let count = 1;
          let i = num + 1;
          while(vals[i]) {
              count += 1;
              i += 1;
          }

          max = Math.max(max, count);
      }
  }

  return max;
};