import buildTree from './helpers';

/*
Given a complete binary tree, count the number of nodes.

Note:

Definition of a complete binary tree from Wikipedia:
In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Example:

Input:
    1
   / \
  2   3
 / \  /
4  5 6

Output: 6

*/

var countNodes = function (root) {
  return root ? 1 + countNodes(root.left) + countNodes(root.right) : 0;
};

const tests = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4],
  [1, 2, 3, 4, null, 5],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(countNodes(tree));
}