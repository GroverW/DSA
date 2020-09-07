import { buildTree } from './Tree/helpers';

/*
Given a binary tree, return the preorder traversal of its nodes' values.

Example:

Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,2,3]
Follow up: Recursive solution is trivial, could you do it iteratively?
*/

// recursive
var preorderTraversal = function (root) {
  const order = [];
  const search = (node) => {
    if (!node) return;
    order.push(node.val);
    search(node.left);
    search(node.right);
  }
  search(root);
  return order;
};

// iterative
var preorderTraversal = function (root) {
  if (!root) return [];
  const stack = [root];
  const order = [];

  while (stack.length) {
    const curr = stack.pop();
    order.push(curr.val);
    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
  }

  return order;
};

const tests = [
  [1, null, 2, 3],
  [1, 2, 3, 4, 5, 6],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(preorderTraversal(tree));
}