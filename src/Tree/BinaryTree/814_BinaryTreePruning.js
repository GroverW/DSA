/*
We are given the head node root of a binary tree, where additionally every node's value is either a 0 or a 1.

Return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

(Recall that the subtree of a node X is X, plus every node that is a descendant of X.)

Example 1:
Input: [1,null,0,0,1]
Output: [1,null,0,null,1]
 
Explanation: 
Only the red nodes satisfy the property "every subtree not containing a 1".
The diagram on the right represents the answer.


Example 2:
Input: [1,0,1,0,0,0,1]
Output: [1,null,1,null,1]



Example 3:
Input: [1,1,0,1,1,0,1,0]
Output: [1,1,0,1,1,null,1]



Note:

The binary tree will have at most 200 nodes.
The value of each node will only be 0 or 1.
*/

import { buildTree, serializeTreeInOrder } from "../helpers";

var pruneTree = function(root) {
  if (!root) return root;
  
  const prune = (node) => {
    if (!node) return true;
    
    const isLeft = prune(node.left);
    const isRight = prune(node.right);
    if (isLeft) node.left = null;
    if (isRight) node.right = null;
    
    return isLeft && isRight && node.val === 0;
  }
  
  return prune(root) ? null : root;
};

const tests = [
  [1,null,0,0,1],
  [1,0,1,0,0,0,1],
  [1,1,0,1,1,0,1,0],
  [0],
  [0,0,0,0,1,1,1,0,1,0,0,1,0,1,0,0,0,0,1,0],
];

let i = 0;
for (let test of tests) {
  const tree = buildTree(test);
  console.time(i);
  logOutList(printRow(serializeTreeInOrder(pruneTree(test))));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}
