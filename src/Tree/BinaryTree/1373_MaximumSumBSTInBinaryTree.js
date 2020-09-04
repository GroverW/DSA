/*
Given a binary tree root, the task is to return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.


Example 1:



Input: root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
Output: 20
Explanation: Maximum sum in a valid Binary search tree is obtained in root node with key equal to 3.
Example 2:



Input: root = [4,3,null,1,2]
Output: 2
Explanation: Maximum sum in a valid Binary search tree is obtained in a single root node with key equal to 2.
Example 3:

Input: root = [-4,-2,-5]
Output: 0
Explanation: All values are negatives. Return an empty BST.
Example 4:

Input: root = [2,1,3]
Output: 6
Example 5:

Input: root = [5,4,8,3,null,6,3]
Output: 7
*/

var maxSumBST = function (root) {
  let maxSum = 0;
  const notABST = [0, 0, false];
  const nullNode = [0, 0, null];

  const search = (node) => {
    if (!node) return nullNode;

    let [minLeft, maxLeft, sumLeft] = search(node.left);
    let [minRight, maxRight, sumRight] = search(node.right);


    if (sumLeft === false || (sumLeft !== null && maxLeft >= node.val)) return notABST;
    if (sumRight === false || (sumRight !== null && minRight <= node.val)) return notABST;

    if (sumLeft === null) {
      sumLeft = 0;
      minLeft = node.val;
    };

    if (sumRight === null) {
      sumRight = 0;
      maxRight = node.val;
    }


    const currSum = node.val + sumLeft + sumRight;
    maxSum = Math.max(maxSum, currSum)

    return [minLeft, maxRight, currSum];
  }

  search(root);

  return maxSum;
};

const tests = [
  [1, 4, 3, 2, 4, 2, 5, null, null, null, null, null, null, 4, 6],
  [8, 9, 8, null, 9, null, 1, null, null, -3, 5, null, -2, null, 6],
  [4, 3, null, 1, 2],
  [-4, -2, -5],
  [2, 1, 3],
  [5, 4, 8, 3, null, 6, 3],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(maxSumBST(tree));
}