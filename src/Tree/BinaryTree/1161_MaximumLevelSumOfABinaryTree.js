/*
Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level X such that the sum of all the values of nodes at level X is maximal.



Example 1:



Input: [1,7,0,7,-8,null,null]
Output: 2
Explanation:
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
*/

var maxLevelSum = function(root) {
  const queue = [root];
  let maxSum = -Infinity;
  let maxLevel;

  let level = 1;
  while(queue.length) {
      let currSum = 0;
      for(let n = queue.length - 1; n >= 0; n -= 1) {
          const curr = queue.shift();
          currSum += curr.val;
          if(curr.left) queue.push(curr.left);
          if(curr.right) queue.push(curr.right);
      }
      if (currSum > maxSum) {
          maxSum = currSum;
          maxLevel = level;
      }
      level += 1;
  }

  return maxLevel;
};