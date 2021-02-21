/*
You are given two integer arrays nums and multipliers of size n and m respectively, where n >= m. The arrays are 1-indexed.

You begin with a score of 0. You want to perform exactly m operations. On the ith operation (1-indexed), you will:

Choose one integer x from either the start or the end of the array nums.
Add multipliers[i] * x to your score.
Remove x from the array nums.
Return the maximum score after performing m operations.

 

Example 1:

Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
- Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
- Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
- Choose from the end, [1], adding 1 * 1 = 1 to the score.
The total score is 9 + 4 + 1 = 14.
Example 2:

Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
- Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
- Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
- Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
- Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
- Choose from the end, [-2,7], adding 7 * 6 = 42 to the score. 
The total score is 50 + 15 - 9 + 4 + 42 = 102.
 

Constraints:

n == nums.length
m == multipliers.length
1 <= m <= 103
m <= n <= 105
-1000 <= nums[i], multipliers[i] <= 1000
*/

var maximumScore = function(nums, multipliers) {
  const n = nums.length;
  const m = multipliers.length;
  const best = new Array(m + 1).fill(0).map(() => new Array(m + 1).fill(0));
  
  for (let i = 1; i <= m; i += 1) {
    best[i][0] += best[i-1][0] + nums[n-i] * multipliers[i-1];
    best[0][i] += best[0][i-1] + nums[i-1] * multipliers[i-1];
  }
  
  let max = Math.max(best[m][0], best[0][m]);
  
  
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= m - i; j += 1) {
      best[i][j] = Math.max(
        best[i-1][j] + nums[n - i] * multipliers[i + j - 1],
        best[i][j-1] + nums[j - 1] * multipliers[i + j - 1],
      );
    }
    max = Math.max(max, best[i][m-i]);
  }
  
  return max;
};

const tests = [
  [[1,2,3], [3,2,1]],
  [[-5,-3,-3,-2,7,1], [-10,-5,3,4,6]]
];

let i = 0;
for (let test of tests) {
  console.time(i);
    logOutList(maximumScore(...test));
  console.timeEnd(i);
  i += 1;
}

/*

*/