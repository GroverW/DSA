/*
Given the root of a binary tree, return the postorder traversal of its nodes' values.

Follow up: Recursive solution is trivial, could you do it iteratively?



Example 1:


Input: root = [1,null,2,3]
Output: [3,2,1]
Example 2:

Input: root = []
Output: []
Example 3:

Input: root = [1]
Output: [1]
Example 4:


Input: root = [1,2]
Output: [2,1]
Example 5:


Input: root = [1,null,2]
Output: [2,1]
*/

// recursive
var postorderTraversal = function(root) {
  const order = [];
  const search = (node) => {
    if(!node) return;
    search(node.left);
    search(node.right);
    order.push(node.val);
  }
  search(root);
  return order;
};

// iterative
var postorderTraversal = function(root) {
  if(!root) return [];
  const order = [];
  const stack = [root];

  while(stack.length) {
    const curr = stack.pop();

    order.unshift(curr.val);
    if(curr.left) stack.push(curr.left);
    if(curr.right) stack.push(curr.right);
  }

  return order;
};

const tests = [
  [1, null, 2, 3],
  [],
  [1],
  [1,2],
  [1,null,2],
  [1, 2, 3, 4, 5, 6],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(postorderTraversal(tree));
}