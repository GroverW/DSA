/*
Given two binary search trees root1 and root2.

Return a list containing all the integers from both trees sorted in ascending order.



Example 1:


Input: root1 = [2,1,4], root2 = [1,0,3]
Output: [0,1,1,2,3,4]
Example 2:

Input: root1 = [0,-10,10], root2 = [5,1,7,0,2]
Output: [-10,0,0,1,2,5,7,10]
Example 3:

Input: root1 = [], root2 = [5,1,7,0,2]
Output: [0,1,2,5,7]
Example 4:

Input: root1 = [0,-10,10], root2 = []
Output: [-10,0,10]
Example 5:


Input: root1 = [1,null,8], root2 = [8,1]
Output: [1,1,8,8]


Constraints:

Each tree has at most 5000 nodes.
Each node's value is between [-10^5, 10^5].
*/

var getAllElements = function (root1, root2) {
  const stack1 = [];
  const stack2 = [];

  const buildStack = (node, stack) => {
    if (!node) return;
    buildStack(node.right, stack);
    stack.push(node.val);
    buildStack(node.left, stack);
  }

  buildStack(root1, stack1);
  buildStack(root2, stack2);

  const sorted = [];
  while (stack1.length || stack2.length) {
    if (!stack1.length || stack1[stack1.length - 1] >= stack2[stack2.length - 1]) {
      sorted.push(stack2.pop());
    } else {
      sorted.push(stack1.pop());
    }
  }

  return sorted;
};




const tests = [
  [[2, 1, 4], [1, 0, 3]],
  [[0, -10, 10], [5, 1, 7, 0, 2]],
  [[], [5, 1, 7, 0, 2]],
  [[0, -10, 10], []],
  [[1, null, 8], [8, 1]],
];

for (let [list1, list2] of tests) {
  const tree1 = buildTree(list1);
  const tree2 = buildTree(list2);
  logOutList(printRow(getAllElements(tree1, tree2)));
}