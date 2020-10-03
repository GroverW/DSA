/*
Given a binary tree root and a linked list with head as the first node.

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.



Example 1:



Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.
Example 2:



Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Example 3:

Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.


Constraints:

1 <= node.val <= 100 for each node in the linked list and binary tree.
The given linked list will contain between 1 and 100 nodes.
The given binary tree will contain between 1 and 2500 nodes.
*/

// UGLY! Don't need to serialize
var isSubPath = function (head, root) {
  const list = serializeList(head);

  const searchSubPath = (node, idx) => {
    if (!node || node.val !== list[idx]) return false;
    if (idx === list.length - 1) return true;

    if (node.left && searchSubPath(node.left, idx + 1)) return true;
    if (node.right && searchSubPath(node.right, idx + 1)) return true;

    return false;
  }

  const queue = [root];

  while (queue.length) {
    const curr = queue.shift();
    if (searchSubPath(curr, 0)) return true;
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return false;
};

const serializeList = (head) => {
  const serialized = [];
  let curr = head;
  while(curr) {
    serialized.push(curr.val);
    curr = curr.next;
  }
  return serialized;
}


const tests = [
  [
    [4, 2, 8],
    [1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3],
  ],
  [
    [1, 4, 2, 6],
    [1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3],
  ],
  [
    [1, 4, 2, 6, 8],
    [1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3],
  ],
];

for (let test of tests) {
  const list = buildList(test[0]);
  const tree = buildTree(test[1]);
  logOutList(isSubPath(list, tree));
}