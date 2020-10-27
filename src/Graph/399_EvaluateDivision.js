/*
You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.



Example 1:

Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation:
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
Example 2:

Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]
Example 3:

Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]


Constraints:

1 <= equations.length <= 20
equations[i].length == 2
1 <= Ai.length, Bi.length <= 5
values.length == equations.length
0.0 < values[i] <= 20.0
1 <= queries.length <= 20
queries[i].length == 2
1 <= Cj.length, Dj.length <= 5
Ai, Bi, Cj, Dj consist of lower case English letters and digits.
*/

var calcEquation = function (equations, values, queries) {
  const adjList = buildAdjList(equations, values);
  const results = [];

  const visited = {};

  const getRatio = (current, destination, currentRatio) => {
    if (visited[current] || !adjList[current]) return -1;
    if (current === destination) return currentRatio;

    visited[current] = true;

    for (let [to, ratio] of adjList[current]) {
      const nextRatio = currentRatio * ratio;
      const val = getRatio(to, destination, nextRatio);
      if (val > 0) {
        visited[current] = false;
        return val;
      }
    }

    visited[current] = false;
    return -1;
  }

  for (let [from, to] of queries) {
    const result = getRatio(from, to, 1);
    results.push(result);
  }

  return results;
};

const buildAdjList = (edges, values) => {
  const adjList = {};

  for (let i = 0; i < edges.length; i += 1) {
    const [from, to] = edges[i];
    adjList[from] = adjList[from] || [];
    adjList[from].push([to, values[i]]);
    adjList[to] = adjList[to] || [];
    adjList[to].push([from, 1 / values[i]]);
  }

  return adjList;
}

const tests = [
  [[["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]],
  [[["a", "b"], ["b", "c"], ["bc", "cd"]], [1.5, 2.5, 5.0], [["a", "c"], ["c", "b"], ["bc", "cd"], ["cd", "bc"]]],
  [[["a", "b"]], [0.5], [["a", "b"], ["b", "a"], ["a", "c"], ["x", "y"]]],
  [[["a","aa"]], [9.0], [["aa","a"],["aa","aa"]]],
  [["a", "b"]], [0.5], [["a", "b"], ["b", "a"], ["a", "c"], ["x", "y"]],
];

/*
a / b = 2
b / c = 3
a = 2b
*/

for (let test of tests) {
  logOutList(printRow(calcEquation(...test)))
}