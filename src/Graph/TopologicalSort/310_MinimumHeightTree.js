/*
A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.



Example 1:


Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
Example 2:


Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]
Example 3:

Input: n = 1, edges = []
Output: [0]
Example 4:

Input: n = 2, edges = [[0,1]]
Output: [0,1]


Constraints:

1 <= n <= 2 * 104
edges.length == n - 1
0 <= ai, bi < n
ai != bi
All the pairs (ai, bi) are distinct.
The given input is guaranteed to be a tree and there will be no repeated edges.
*/

var findMinHeightTrees = function (n, edges) {
  const adjList = new Array(n).fill(null).map(() => []);
  const dependants = new Array(n).fill(0);

  for (let [from, to] of edges) {
    adjList[from].push(to);
    adjList[to].push(from);
    dependants[from] += 1;
    dependants[to] += 1;
  }

  const queue = [];
  for (let i = 0; i < dependants.length; i += 1) {
    if (dependants[i] <= 1) queue.push(i);
  }
  let remaining = n;

  while (remaining > queue.length) {
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      const current = queue.shift();
      remaining -= 1;
      for (let child of adjList[current]) {
        if (dependants[child] <= 1) continue;
        dependants[child] -= 1;
        if (dependants[child] <= 1) queue.push(child);
      }
    }
  }

  return queue;
};

const tests = [
  [
    4,
    [[1, 0], [1, 2], [1, 3]],
  ],
  [
    6,
    [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]],
  ],
  [
    1,
    [],
  ],
  [
    2,
    [[0, 1]],

  ],
  [
    15,
    [[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[4,7],[7,8],[8,9],[7,10],[10,11],[11,12],[12,13],[13,14]],
  ],
  [
    15,
    [[0,1],[1,2],[1,3],[3,4],[4,5],[4,6],[4,7],[7,8],[8,9],[4,10],[10,11],[11,12],[12,13],[13,14]],
  ],
];


for (let test of tests) {
  logOutList(findMinHeightTrees(...test))
}

/*
  a b c
    d
  e f g
    h k l
    i   m
    j   n
        o
*/