/*
Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

 

Follow up:

You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.
 

Example 1:



Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
 

Constraints:

The number of nodes in the given tree is less than 6000.
-100 <= node.val <= 100
*/

type TreeNode = {
  val: number | null;
  left: TreeNode | null;
  right: TreeNode | null;
  next: TreeNode | null;
}

type MaybeTreeNode = TreeNode | null;

var connect = function (root: MaybeTreeNode) {
  if (!root) return null;

  if (root.left && root.right) {
    root.left.next = root.right;
    root.right.next = findNext(root.next);
  } else if (root.left && !root.right) {
    root.left.next = findNext(root.next);
  } else if (!root.left && root.right) {
    root.right.next = findNext(root.next);
  }

  connect(root.right);
  connect(root.left);
  return root;
};

const findNext = (node: MaybeTreeNode): MaybeTreeNode => {
  if (!node) return null;

  let current: MaybeTreeNode = node;
  while (current) {
    if (current.left) return current.left;
    if (current.right) return current.right;
    current = current.next;
  }

  return null;
}

const tests: (number | null)[][] = [
    [1,2,3,4,5,null,7],
    [1,2,3,4,5,6,7,8,9,10,11,null,null,12,13],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,null,18,19,20,21,22,23,24,null,null,null,28,29,30,31,32,33,null,35,null,null,38,39,null,41,42,null,44,null,null,47],
    [1,2,3,4,5,6,7,8,null,10,11,12,13,14,null,null,17,18],
    [1,2,3,4,5,6,7,8,9,10,11,null,13,14,15,16,17,null,19,20,21,22,null,null,null,26,27,28,29,null,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,null,48,49,50,null,null,53],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,null,23,24,null,26,27,28,29,null,31,32,33,34,35,36,37,38,39,null,null,null,43,44,45,46,47,48,49,50,null,52,null,54,null,null,null,58,null,null,61,62,null,64,null,66,67,null,69,null,null,null,null,null,75],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,null,19,20,21,22,23,null,25,26,27],
    [1,2,3,4,5,6],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,null,18,19,20,21,22,23,24,25,26,27,28,null,30,31,null,null,34,35,null,37,null,null,40,null,null,43,null,null,null,null,48,null,50,null,null,null,null,null,56,null,58,59,null,null,null,63,null,65,null,null,null,null,null,null,null,73,null,75,null,77,null,null,null,null,82],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,null,15,16,null,18,19,20,null,22,23],
    [1,2,3,4,5,6,7,8,null,10,11,12,13,null,15,16,17,18,19,null,null,null,null,24,null,26,27,28,null,null,null,32,33,34,35,36,37,null,39,40,41,42,null,null,null,46,47,null,null,50,null,52,53],
    [1,2,3,4,5,6,7,null,null,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,null,26,27,28,null,30,null,null,null,34,35,36,null,38,39,null,null,null,43,null,45,46,47,null,null,null,null,52,null,null,55,null,null,58,null,60,null,62,63,null,null,null,null,null,69,null,null,72,null,74,null,76],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,null,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,null,35,36,37,38,39,40,41,null,43,44,45,46,null,null,null,null,null,null,53,54,55,null,57,58],
    [1],
    [1,2,3,4,5,6,7,8,9,10,11,12,null,null,15,16,17,18,19,20,21,22,23,null,null,26,27,28,29,30,31,32,33,34,35,36,37,38,null,null,41,null,null,44,null,46,47,null,49,null,51,null,53,54,null,56,57],
    [1,2,3,4,5,6,7,null,9,null,11,12,13,14,15,16,17,18,19,20,21,22,null,24,null,26,27,null,29,30,null,32,33,34,35,36,37,38,39,40,null,42,43],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,null,24,25,26,27,28,29,30,31,null,33,null,35,null,37,null,39,40,null,null,43,null,null,null,47,null,49,null,null,null,53,54,55,null,null,null,null,null,null,62,63,64,null,null,null,null,69,70,null,null,null,null,null,76,null,null,null,80,null,null,null,null,null,null,null,null,89],
    [1,2,3,4,5,6,7,8,9,10,11,12,null,14,15,16,17,18,19,20,21,22,23],
    [1],
    [1,2,3,4,5,6,7,8,null,10,11,12,13,14,15,null,17,18,19,20,21,22,23,24,25,null,27,null,29,30,31,32,33,34,null,36,null,38,39,40,41,42,null,44,45,null,47,48,49,50,null,null,null,54,55],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,null,15,16,17,18,19,20,21,22,23,24,25,26,null,28,29,30,31,32,33,34,35,36,37,null,39,40,41,42,43,null,45,46,null,48,49,null,51,null,53],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    [1,null,3,4,null,6,7,8,9,null,11,12,13,14,null,16,17,18,null,20,21,22,23,null,25,26,null,null,29,30,31,32,33,34,35,36,37,38,39,40,41,null,null,null,45,46,47,null,null,50,null,null,53,null,55,56,null,58,59,60,61,null,null,64,null,66,null,68,null,null,null,72,null,null,null,76,null,null,79,null,null,null,null,null,null,null,null,null,null,90],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,null,21,22,23,24,25,26],
    [1,2,3,4,5,null,7,8,9,10,null,12,13,null,15,16,17,18,19,20,21,22,23,24,25,26,27,28,null,30,31,32,33,34,null,36,37,38,39,40,41,42,43,null,45,null,47,48,49,null,51,null,null,null,55,56,57],
    [],
    [1],
    [1,2],
];