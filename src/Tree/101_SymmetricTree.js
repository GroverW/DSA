/*
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3


But the following [1,2,2,null,3,null,3] is not:

    1
   / \
  2   2
   \   \
   3    3


Follow up: Solve it both recursively and iteratively.
*/

var isSymmetric = function(root) {
  if(!root) return true;
  let queue = [root.left, root.right];

  while(queue.length) {
      const node1 = queue.shift();
      const node2 = queue.shift();

      if(node1 && node2) {
          if(node1.val !== node2.val) return false;
          queue.push(node1.right, node2.left, node1.left, node2.right);
      } else if(node1 !== node2) return false;
  }

  return true;
};