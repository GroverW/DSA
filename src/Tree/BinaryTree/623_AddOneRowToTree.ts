/*
Given the root of a binary tree and two integers val and depth, add a row of nodes with value val at the given depth depth.

Note that the root node is at depth 1.

The adding rule is:

Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree nodes with value val as cur's left subtree root and right subtree root.
cur's original left subtree should be the left subtree of the new left subtree root.
cur's original right subtree should be the right subtree of the new right subtree root.
If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val as the new root of the whole original tree, and the original tree is the new root's left subtree.
 

Example 1:


Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]
Example 2:


Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
The depth of the tree is in the range [1, 104].
-100 <= Node.val <= 100
-105 <= val <= 105
1 <= depth <= the depth of tree + 1
*/

function addOneRow(root: TreeNode | null, val: number, depth: number, isLeft = true): TreeNode | null {
  if (depth === 1) {
    const node = isLeft ? new TreeNode(val, root) : new TreeNode(val, null, root);
    return node;
  }
  if (!root) return null;

  root.left = addOneRow(root.left, val, depth - 1, true);
  root.right = addOneRow(root.right, val, depth - 1, false);

  return root;
};

const maxLen: number = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  const serialized = randomizeTree({ size: len, start: 1 })
  const maxDepth = Math.ceil(Math.log2(serialized.length));
  const depth = numberBetween(1, maxDepth);
  const val = 1;

  for (let i = 1; i < serialized.length; i += 1) {
    const parent = Math.ceil(i / 2) - 1;
    if (serialized[i] && !serialized[parent]) console.log('WHOOP!')
  }
  // logOutList('"' + ip + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow([s, t]) + ',');
  // logOutList(printRow(serialized) + ',');
  logOutLeetcode([serialized, val, depth])
}

const tests: Indexable<any>[] = [
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, null, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, null, 25, null, null, 26, 27, null, 28, 29, 30, null, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, null, 41, 42, 43, 44, null, null, 45, 46, null, null, null, null, 47, null, 48, 49, null, null, 50, 51, 52, 53, 54, 55, null, null, 56, null, 57, 58, 59, 60, 61, null, 62, null, 63, 64, 65, 66, 67, 68, 69, null, 70, 71, null, null, null, 72, 73, 74, null, 75, 76, 77, null, null, null, null, 78, 79, 80, 81, null, null, null, null, null, null, null, null, 82, 83, null, null, 84, 85],
    1,
    7,
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, null, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, null, null, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, null, 45, 46, 47, 48, 49, 50, null, 51, 52, null, null, null, 53, 54, 55, 56, 57, 58, null, null, 59, 60, 61, null, null, null, null, 62, 63, null, 64, 65, null, 66, 67, 68, 69, 70, 71, 72, null, 73, null, 74, 75, 76],
    1,
    1,
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, null, null, null, null, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, null, 47, 48, 49, 50, 51, 52, 53, null, null, null, null, null, null, null, null, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, null, 65, 66, 67, 68, 69, 70, 71, 72, null, 73, 74, 75, 76, 77, 78, 79, 80],
    1,
    4,
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, null, null, 33, 34, 35, 36, 37, null, 38, 39, 40, 41, 42, null, null, 43, null, 44, 45, 46, 47, 48, 49, null, 50, 51, 52, null, 53, null, 54, 55, 56, 57, null, null, null, null, 58, 59, 60, 61, 62, null, null, 63, 64, 65, null, null, 66, 67, 68, 69, 70, null, 71, null, 72, 73, null, null, null, null, 74, null, null, null, 75, 76, null, null, 77],
    1,
    7,
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, null, null, 21, 22, null, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, null, 36, 37, 38, null, null, null, null, 39, 40, 41, 42, null, null, null, null, 43, 44, null, null, 45, null, null, 46, 47, null, 48, 49, 50, 51, 52, null, null, 53, null, 54, 55, 56, 57, 58, null, null, 59, 60, 61, 62, 63, 64, null, null, null, null, null, null, null, null, 65, null, 66, 67, null, null, 68, 69, null, null, null, null, null, null, null, null, 70, 71, null, 72, null, null, null, null, 73, null, null, null, null, null, null, 74, 75, 76, null, null, 77, 78, null, 79, 80, null, 81, null, null, 82, null, null, null, null, 83, 84],
    1,
    3,
  ],
  [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, null, 22, 23, 24, 25, 26, 27, 28, 29, null, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, null, null, 42, 43, null, 44, 45, 46, 47, 48, null, 49, null, 50, 51, null, 52, 53, null, null, 54, null, 55, 56, 57, 58, 59, 60, 61, null, 62, 63, 64, null, 65, 66, 67, 68, 69, 70, 71, 72, 73, null, null, null, null, null, 74, 75, 76, 77, null, null, 78, null, 79, 80, null, 81, 82, 83, 84, 85, null, null, 86, null, null, null, 87],
    1,
    7,
  ],
  [
    [1],
    1,
    1,
  ],
]