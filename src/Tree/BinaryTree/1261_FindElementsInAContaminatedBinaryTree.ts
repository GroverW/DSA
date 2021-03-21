/*
Given a binary tree with the following rules:

root.val == 0
If treeNode.val == x and treeNode.left != null, then treeNode.left.val == 2 * x + 1
If treeNode.val == x and treeNode.right != null, then treeNode.right.val == 2 * x + 2
Now the binary tree is contaminated, which means all treeNode.val have been changed to -1.

You need to first recover the binary tree and then implement the FindElements class:

FindElements(TreeNode* root) Initializes the object with a contamined binary tree, you need to recover it first.
bool find(int target) Return if the target value exists in the recovered binary tree.
 

Example 1:



Input
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]
Output
[null,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1]); 
findElements.find(1); // return False 
findElements.find(2); // return True 
Example 2:



Input
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]
Output
[null,true,true,false]
Explanation
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // return True
findElements.find(3); // return True
findElements.find(5); // return False
Example 3:



Input
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]
Output
[null,true,false,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // return True
findElements.find(3); // return False
findElements.find(4); // return False
findElements.find(5); // return True
 

Constraints:

TreeNode.val == -1
The height of the binary tree is less than or equal to 20
The total number of nodes is between [1, 10^4]
Total calls of find() is between [1, 10^4]
0 <= target <= 10^6
*/

import { buildTree, TreeNode } from '../helpers';

class FindElementsBinarySearch {
  root: TreeNode | null;

  constructor(root: TreeNode | null) {
    this.root = root;
    if (this.root) {
      this.root.val = 0;
    }
  }

  search(node: TreeNode | null, target: number, low: number, high: number): boolean {
    if (!node) return false;
    if (node.val === target) return true;
    
    const mid: number = Math.floor((low + high) / 2);
    
    if (target <= mid) {
      if (!node.left) return false;
      node.left.val = node.val! * 2 + 1;
      return this.search(node.left, target, low, mid);
    } else {
      if (!node.right) return false;
      node.right.val = node.val! * 2 + 2;
      return this.search(node.right, target, mid, high);
    }
  }

  find(target: number): boolean {
    let increment: number = 2;
    let high: number = 0;
    
    while (high < target) {
      high += increment;
      increment *= 2;
    }
    
    const low: number = high - increment / 2 + 1;
    
    return this.search(this.root, target, low, high);
  }
}


// easy way
class FindElements {
  root: TreeNode | null;
  lookup: Set<number | null>;

  constructor(root: TreeNode | null) {
    this.root = root;
    if (this.root) {
      this.root.val = 0;
    }
    this.lookup = new Set();
    this.reconstruct(this.root);
  }

  reconstruct(node: TreeNode | null) {
    if (!node) return;
    this.lookup.add(node.val);
    
    if(node.left) {
      node.left.val = node.val! * 2 + 1;
      this.reconstruct(node.left);
    }
    if(node.right) {
      node.right.val = node.val! * 2 + 2;
      this.reconstruct(node.right);
    }
  }

  find(target: number): boolean {
    return this.lookup.has(target);
  }
}

/*
                              0
                      1             2
                  3       4     5       6
                7   8   9   10 11 12  13  14            




*/

// const maxLen: number = 100;

// for (let i = 0; i < 50; i += 1) {
//   const len: number = numberBetween(1, maxLen);
//   const nums: number[] = new Array(len).fill(0).map((_, i) => i + 1);
//   const randomized: number[] = randomize(nums);


//   // logOutList('"' + parenString + '",')
//   // logOutList(printRow([nums, k]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   // logOutList(numberBetween(1, 100) + ',');
//   logOutList(printRow(randomized))
// }

const tests: any[] = [
  [
    ["FindElements","find","find","find","find"],
    [[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]],
  ]
];



let i: number = 0;
for (let test of tests) {
  const tree: TreeNode = buildTree(test[1][0][0])
  const findElements: FindElements = new FindElements(tree);
  console.time(i.toString());
  for(let i = 1; i < test[0].length; i += 1) {
    logOutList(findElements.find(test[1][i][0]));
  }
  console.timeEnd(i.toString());
  i += 1;
}

/*

*/