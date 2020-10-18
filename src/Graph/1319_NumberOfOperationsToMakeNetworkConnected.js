/*
There are n computers numbered from 0 to n-1 connected by ethernet cables connections forming a network where connections[i] = [a, b] represents a connection between computers a and b. Any computer can reach any other computer directly or indirectly through the network.

Given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected. Return the minimum number of times you need to do this in order to make all the computers connected. If it's not possible, return -1.



Example 1:



Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.
Example 2:



Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2
Example 3:

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.
Example 4:

Input: n = 5, connections = [[0,1],[0,2],[3,4],[2,3]]
Output: 0
*/

var makeConnected = function (n, connections) {
  if (n > connections.length + 1) return -1;
  const adjList = buildAdjList(n, connections);
  const visited = {};
  let numGroups = 0;

  const search = (computer) => {
    if (visited[computer]) return;
    visited[computer] = true;
    for (let neighbor of adjList[computer]) {
      search(neighbor);
    }
  }

  for (let i = 0; i < n; i += 1) {
    if (visited[i]) continue;
    search(i);
    numGroups += 1;
  }

  return numGroups - 1;
};

const buildAdjList = (n, edges) => {
  const adjList = new Array(n).fill(null).map(() => []);
  for (let [from, to] of edges) {
    adjList[from].push(to);
    adjList[to].push(from);
  }

  return adjList;
}

const tests = [
  [4, [[0, 1], [0, 2], [1, 2]]],
  [6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]]],
  [6, [[0, 1], [0, 2], [0, 3], [1, 2]]],
  [5, [[0, 1], [0, 2], [3, 4], [2, 3]]],
];

for (let test of tests) {
  logOutList(makeConnected(...test));
}