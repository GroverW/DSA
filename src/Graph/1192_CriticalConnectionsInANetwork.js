var criticalConnections = function(n, connections) {
  const graph = createGraph(n, connections);
  const criticalList = [];
  let currRank = 0;

  const helper = (nodeId, parent) => {
      const node = graph[nodeId];
      if(node.lowest !== null) return node.lowest;

      const rank = currRank;
      node.lowest = rank;
      currRank += 1;

      for(let child of node.children) {
          if(child === parent) continue;
          const childLow = helper(child, nodeId);
          if(childLow > rank) criticalList.push([nodeId, child]);
          node.lowest = Math.min(node.lowest, childLow);
      }

      return node.lowest;
  }

  helper(0, null);

  return criticalList;
};

const createGraph = (n, connections) => {
  let graph = new Array(n).fill(null).map(() => ({
      lowest: null,
      children: [],
  }));

  for(let [from, to] of connections) {
      graph[from].children.push(to);
      graph[to].children.push(from);
  }

  return graph;
}

const tests = [
  [4, [[0,1],[1,2],[2,0],[1,3]]],
  [6, [[0,1],[1,2],[2,0],[1,3],[3,4],[4,5],[5,3],[5,2]]],
];

for(let test of tests) {
  logOutList(criticalConnections(...test))
}


// 10/19/2020 retried

var criticalConnections = function (n, connections) {
  const graph = buildGraph(n, connections);
  const ranks = new Array(n).fill(0);
  const lowest = new Array(n).fill(Infinity);
  let currRank = 1;
  const critConnections = [];

  const findConnections = (nodeId, parentId) => {
    if (ranks[nodeId]) return lowest[nodeId];
    ranks[nodeId] = currRank;
    lowest[nodeId] = currRank;
    currRank += 1;

    for (let neighbor of graph[nodeId]) {
      if (neighbor === parentId) continue;
      const minNeighborRank = findConnections(neighbor, nodeId);
      if (minNeighborRank > ranks[nodeId]) critConnections.push([nodeId, neighbor]);
      lowest[nodeId] = Math.min(lowest[nodeId], minNeighborRank);
    }

    return lowest[nodeId];
  }

  findConnections(0, null);

  return critConnections;
};

const buildGraph = (n, edges) => {
  const graph = new Array(n).fill(null).map(() => []);
  for (let [from, to] of edges) {
    graph[from].push(to);
    graph[to].push(from);
  }

  return graph;
}