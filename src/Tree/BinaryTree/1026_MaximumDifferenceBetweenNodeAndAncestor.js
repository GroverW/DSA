/*
Given the root of a binary tree, find the maximum value V for which there exists different nodes A and B where V = |A.val - B.val| and A is an ancestor of B.

(A node A is an ancestor of B if either: any child of A is equal to B, or any child of A is an ancestor of B.)



Example 1:



Input: [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation:
We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.


Note:

The number of nodes in the tree is between 2 and 5000.
Each node will have value between 0 and 100000.
*/

var maxAncestorDiff = function (root) {
  let maxDifference = 0;

  const getDifferences = (node, maxAncestor, minAncestor) => {
    if (!node) return;

    maxDifference = Math.max(
      maxDifference,
      Math.abs(maxAncestor - node.val),
      Math.abs(minAncestor - node.val),
    );

    const nextMax = Math.max(node.val, maxAncestor);
    const nextMin = Math.min(node.val, minAncestor);

    if (node.left) getDifferences(node.left, nextMax, nextMin);
    if (node.right) getDifferences(node.right, nextMax, nextMin);
  }

  getDifferences(root, root.val, root.val);

  return maxDifference;
};

const tests = [
  [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13],
  [8, 3, 10, 3, 6, null, 14, null, null, 4, 7, 13, null, 1],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(maxAncestorDiff(tree));
}