import { logOut, logOutList } from './logging';
import { buildTree } from './Tree/helpers';
import { printRow } from './Array/helpers';
/*
You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

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



Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.


Constraints:

The number of nodes in the given tree is less than 4096.
-1000 <= node.val <= 1000
*/

// BFS
var connect = function (root) {
  if (!root) return root;
  const queue = [root];

  while (queue.length) {
    for (let end = queue.length - 1; end >= 0; end -= 1) {
      const curr = queue.shift();
      curr.next = end ? queue[0] : null;

      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  return root;
};

// Constant Space
var connect = function (root) {
  const search = (node) => {
    if (!node) return;

    let left = search(node.left);
    let right = search(node.right);

    if (left && right) {
      left.next = right;
      while (left.right && right.left) {
        left = left.right;
        right = right.left;
        left.next = right;
      }
    }

    return node;
  }

  search(root);

  return root;
};

/*
                                   1
                  2                                3
          4               5               6               7
      8       9       10      11      12      13      14      15
    16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31
*/

const serializeWithStops = (root) => {
  const serialized = [];

  let curr = root;
  let levelStart = root.left;
  while (curr) {
    serialized.push(curr.val);
    if (!curr.next) {
      serialized.push('#')
      curr = levelStart
      levelStart = curr && curr.left;
    } else {
      curr = curr.next;
    }
  }

  return serialized;
}

const tests = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(printRow(serializeWithStops(connect(tree))));
}