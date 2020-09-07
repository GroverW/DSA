/*
Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.

Example 1:

Input:
    5
   / \
  3   6
 / \   \
2   4   7

Target = 9

Output: True


Example 2:

Input:
    5
   / \
  3   6
 / \   \
2   4   7

Target = 28

Output: False
*/

var findTarget = function (root, k) {
  const lookup = {};
  const search = (node) => {
    if (!node) return false;
    if (lookup[k - node.val]) return true;
    lookup[node.val] = true;

    if (search(node.left) || search(node.right)) return true;

    return false;
  }

  return search(root);
};