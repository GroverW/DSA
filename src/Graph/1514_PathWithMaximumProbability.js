/*
You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.



Example 1:



Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
Example 2:



Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000
Example 3:



Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.
*/

var maxProbability = function (n, edges, succProb, start, end) {
  const probabilities = new Array(n).fill(0);
  probabilities[start] = 1;

  for (let i = 0; i < n; i += 1) {
    let betterPathFound = false;
    for (let j = 0; j < edges.length; j += 1) {
      const [from, to] = edges[j];
      if (!probabilities[from] && !probabilities[to]) continue;

      const edgeProb = succProb[j];
      const maxProb = Math.max(probabilities[from], probabilities[to]) * edgeProb;
      if (maxProb > probabilities[to]) {
        probabilities[to] = maxProb;
        betterPathFound = true;
      }
      if (maxProb > probabilities[from]) {
        probabilities[from] = maxProb;
        betterPathFound = true;
      }
    }
    if (!betterPathFound) break;
  }

  return probabilities[end];
};

const tests = [
  [
    3,
    [[0, 1], [1, 2], [0, 2]],
    [0.5, 0.5, 0.2],
    0,
    2,
  ],
  [
    5,
    [[0, 1], [1, 2], [0, 2], [1, 3], [3, 4], [4, 2]],
    [0.5, 0.5, 0.2, .9, .9, .75],
    0,
    2,
  ],
  [
    5,
    [[1, 4], [2, 4], [0, 4], [0, 3], [0, 2], [2, 3]],
    [0.37, 0.17, 0.93, 0.23, 0.39, 0.04],
    3,
    4,
  ],
];

for (let test of tests) {
  logOutList(maxProbability(...test))
}