/*
Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).





Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:

Input: root = [1,2,3]
Output: [1,3]
Example 3:

Input: root = [1]
Output: [1]
Example 4:

Input: root = [1,null,2]
Output: [1,2]
Example 5:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1
*/

// BFS
var largestValues = function(root) {
  if(!root) return [];

  const largest = [];

  let queue = [root];

  while(queue.length) {
      let currentLargest = -Infinity;
      for(let end = queue.length - 1; end >= 0; end -= 1) {
          const current = queue.shift();
          currentLargest = Math.max(currentLargest, current.val);
          if(current.left) queue.push(current.left);
          if(current.right) queue.push(current.right);
      }
      largest.push(currentLargest);
  }

  return largest;
};

// DFS
var largestValues = function (root) {
  const values = [];

  const getValues = (node, level) => {
    if (!node) return;
    if (values.length <= level) values.push(node.val);
    values[level] = Math.max(values[level], node.val);

    getValues(node.left, level + 1);
    getValues(node.right, level + 1);
  };

  getValues(root, 0);

  return values;
};

const tests = [
  [1,3,2,5,3,null,9],
  [1,2,3],
  [1],
  [1,null,2],
  [],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(printRow(largestValues(tree)));
}