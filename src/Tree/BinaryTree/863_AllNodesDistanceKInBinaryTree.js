/*
We are given a binary tree (with root node root), a target node, and an integer value K.

Return a list of the values of all nodes that have a distance K from the target node.  The answer can be returned in any order.

 

Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2

Output: [7,4,1]

Explanation: 
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.



Note that the inputs "root" and "target" are actually TreeNodes.
The descriptions of the inputs above are just serializations of these objects.
 

Note:

The given tree is non-empty.
Each node in the tree has unique values 0 <= node.val <= 500.
The target node is a node in the tree.
0 <= K <= 1000.
*/

var distanceK = function(root, target, K) {
  const nodeValues = [];
  if(K === 0) {
    nodeValues.push(target.val);
    return nodeValues;
  }
  
  const findNodes = (node, distance) => {
    if (!node || distance > K) return 0;
    
    if (node === target) {
      findNodes(node.left, 1);
      findNodes(node.right, 1);
      return 1;
    }
    
    if (distance === K) {
      nodeValues.push(node.val);
      return 0;
    }
    
    if (distance > 0) {
      findNodes(node.left, distance + 1);
      findNodes(node.right, distance + 1);
      return 0;
    }
    
    const distanceLeft = findNodes(node.left, distance);
    
    if(distanceLeft === K) {
      nodeValues.push(node.val);
      return 0;
    }
    
    if (distanceLeft > 0) {
      findNodes(node.right, distanceLeft + 1);
      return distanceLeft + 1;
    }
    
    const distanceRight = findNodes(node.right, distance);
    
    if (distanceRight === K) {
      nodeValues.push(node.val);
      return 0;
    }
    
    
    if (distanceRight > 0) {
      findNodes(node.left, distanceRight + 1);
      return distanceRight + 1;
    }
    
    return 0;
  }
  
  findNodes(root, 0);
  
  return nodeValues;
};

/*

*/

const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const treeList = randomizeTree({ size: len, maxNullChance: .1 })
  let target = randomOption(treeList);
  while(target === null) {
    target = randomOption(treeList);
  }
  const maxK = Math.log2(len);
  const K = numberBetween(0, maxK);

  // logOutList('"' + s + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([treeList, target, K])
}


const tests: Indexable<any>[] = [
  [
    [3,5,1,6,2,0,8,null,null,7,4],
    5,
    2,
  ]
];



let i: number = 0;
for (let test of tests) {
  const [nodeList, targetVal, K] = test;
  const tree = buildTree(nodeList);
  const target = getFirstNodeByValue(tree, targetVal);
  console.time(i.toString());
  logOutList(printRow(distanceK(tree, target, K)));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}