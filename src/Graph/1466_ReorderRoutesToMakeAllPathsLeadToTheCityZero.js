/*
There are n cities numbered from 0 to n-1 and n-1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by connections where connections[i] = [a, b] represents a road from city a to b.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

It's guaranteed that each city can reach the city 0 after reorder.



Example 1:



Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
Example 2:



Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
Example 3:

Input: n = 3, connections = [[1,0],[2,0]]
Output: 0
*/

/*
Using similar logic to find critical connections in a network.
'Discover' and update ranks / connections via Bellman-Ford

Rank nodes by connections to and from by looping through connections and updating ranks when one of the two nodes is ranked.

Node 0 gets rank 1 because that's the goal. Everyone else Infinity.

If a node connects to a node with a lower rank, update to the lower rank
If a node has a higher rank than the node connecting to it, update its rank to the lower rank + 1.

A -> B <- C <- D -> E
1    2    2    2    3

Now just count the connections where the 'from' node has a lower rank than the 'to' node.
*/

var minReorder = function (n, connections) {
  const ranks = new Array(n).fill(Infinity);
  ranks[0] = 1;

  for (let i = 0; i < n; i += 1) {
    let change = false;
    for (let [from, to] of connections) {
      if (ranks[from] === Infinity && ranks[to] === Infinity) continue;
      if (ranks[to] < ranks[from]) {
        ranks[from] = ranks[to];
        change = true;
      }
      if (ranks[from] + 1 < ranks[to]) {
        ranks[to] = ranks[from] + 1;
        change = true;
      }
    }
    if (!change) break;
  }

  let changeCount = 0;

  for (let [from, to] of connections) {
    if (ranks[from] < ranks[to]) changeCount += 1;
  }

  return changeCount;
};