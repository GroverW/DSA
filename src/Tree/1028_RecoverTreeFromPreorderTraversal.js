/*
We run a preorder depth-first search (DFS) on the root of a binary tree.

At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.

If a node has only one child, that child is guaranteed to be the left child.

Given the output S of this traversal, recover the tree and return its root.

 

Example 1:


Input: S = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
Example 2:


Input: S = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]
Example 3:


Input: S = "1-401--349---90--88"
Output: [1,401,null,349,88,90]
 

Constraints:

The number of nodes in the original tree is in the range [1, 1000].
1 <= Node.val <= 109
*/

var recoverFromPreorder = function (S) {
  const stack = [];
  let val = '';
  let start = 0;

  while (start < S.length && S[start] !== '-') {
    val += S[start];
    start += 1;
  }

  stack.push(new TreeNode(+val));

  let level = 0;
  val = '';
  for (let i = start; i < S.length; i += 1) {
    if (S[i] === '-') {
      level += 1;
      continue;
    }

    val += S[i];

    if (i < S.length - 1 && S[i + 1] !== '-') {
      continue;
    }

    const node = new TreeNode(+val)
    while (stack.length > level || stack[stack.length - 1].right) {
      stack.pop();
    }

    const last = stack[stack.length - 1];
    if (!last.left) last.left = node;
    else last.right = node;
    stack.push(node);

    level = 0;
    val = '';
  }

  return stack[0];
};


const convertToString = (root) => {
  let S = '';
  const convert = (node, level) => {
    if (!node) return;
    S += '-'.repeat(level) + node.val;

    if (node.right && !node.left) {
      [node.right, node.left] = [node.left, node.right];
    }

    convert(node.left, level + 1);
    convert(node.right, level + 1);
  }
  convert(root, 0);
  return S;
}

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  // const k = numberBetween(1, maxLen);
  // const jobs = new Array(len).fill(0).map(() => numberBetween(1, 50));

  const serialized = randomizeTree({ size: len, start: 1, startingNullChance: .2 })
  const tree = buildTree(serialized);
  const S = convertToString(tree);

  logOutList('"' + S + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow([s, t]) + ',');
  // logOutList(printRow([jobs, k]) + ',');
  // logOutLeetcode([len, edges, threshold])
}


const tests = [
  "1-2--3--4-5--6--7",
  "1-2--3---4-5--6---7",
  "1-401--349---90--88",
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  // logOutLeetcode(test);
  logOutList(printRow(serializeTreeInOrder(recoverFromPreorder(test))));
  console.timeEnd(i.toString());
  i += 1;

}