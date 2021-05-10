/*

*/


var largestPathValue = function (colors, edges) {
  const inDegree = new Array(colors.length).fill(0);
  const visited = [...inDegree];
  const maxAtNode = new Array(26).fill(0).map(() => [...inDegree]);
  const aCode = 'a'.charCodeAt(0);

  const adjList = buildAdjList(inDegree, edges);
  
  const queue = [];
  let maxCount = 1;
  
  for (let i = 0; i < inDegree.length; i += 1) {
    if (inDegree[i]) continue;
    queue.push(i);
    const color = colors.charCodeAt(i) - aCode;
    maxAtNode[color][i] = 1;
  }

  while (queue.length) {
    const node = queue.shift();
    visited[node] = 1;

    for (let neighbor of adjList[node]) {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] < 0) return -1;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
      
      const color = colors.charCodeAt(neighbor) - aCode;
      for (let i = 0; i < 26; i += 1) {
        maxAtNode[i][neighbor] = Math.max(
          maxAtNode[i][neighbor],
          maxAtNode[i][node] + (i === color ? 1 : 0)
        );
      }

      maxCount = Math.max(maxCount, maxAtNode[color][neighbor]);
    }
  }

  const visitedCount = visited.reduce((total, isVisited) => total + isVisited, 0);
  return visitedCount < colors.length ? -1 : maxCount;
};

const buildAdjList = (inDegree, edges) => {
  const adjList = new Array(inDegree.length).fill(0).map(() => []);
  edges.forEach(([from, to]) => {
    adjList[from].push(to);
    inDegree[to] += 1;
  });
  return adjList;
}

const tests: Indexable<any>[] = [
  [
    "abaca",
    [[0, 1], [0, 2], [2, 3], [3, 4]]
  ],
  [
    "abaca",
    [[0, 1], [1, 0], [0, 2], [2, 3], [3, 4]]

  ],
  [
    "a",
    [[0, 0]]
  ],
  [
    "abcde",
    [[0, 1], [1, 2], [2, 0], [3, 4]]
  ],
  [
    "aaaaaaa",
    []
  ],
  [
    "zaazazwlqqwaazlalwqaaqllzzzwzqlazqaazqlaqlllzqzzalqzwalwlzwzqwzqzaqzwllzlqwlqwwqawqzlqzallwlqaqq",
    [[0,1],[0,2],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[6,8],[7,9],[8,9],[4,9],[8,10],[9,10],[5,10],[6,11],[10,11],[11,12],[12,13],[9,13],[10,13],[13,14],[10,14],[13,15],[9,15],[14,15],[15,16],[11,16],[12,17],[16,17],[17,18],[8,18],[15,18],[14,18],[10,19],[17,19],[18,19],[18,20],[17,21],[15,21],[18,21],[21,22],[20,22],[17,23],[21,23],[20,23],[22,23],[19,24],[22,24],[24,25],[23,25],[20,25],[22,26],[16,27],[18,27],[22,28],[27,29],[18,29],[20,29],[10,29],[29,30],[28,30],[28,31],[29,32],[17,32],[30,32],[27,33],[31,34],[34,35],[35,36],[27,36],[31,37],[36,37],[35,38],[38,39],[32,39],[39,40],[40,41],[33,41],[39,41],[36,41],[26,42],[39,42],[34,42],[29,42],[36,42],[41,43],[42,43],[37,43],[42,44],[40,44],[43,44],[23,44],[29,45],[35,46],[28,46],[44,46],[41,47],[44,47],[45,47],[42,48],[44,49],[39,49],[37,49],[45,49],[32,49],[46,50],[47,50],[36,50],[48,50],[49,50],[46,51],[50,51],[50,52],[37,52],[31,53],[37,54],[49,54],[52,54],[40,55],[52,55],[41,55],[54,55],[45,56],[53,56],[55,57],[54,57],[50,57],[47,57],[31,58],[56,58],[56,59],[59,60],[52,60],[50,60],[58,60],[52,61],[50,61],[58,61],[56,61],[61,62],[54,63],[34,63],[28,64],[11,64],[61,64],[52,64],[41,64],[36,65],[33,65],[62,65],[52,65],[65,66],[61,67],[65,67],[59,67],[60,67],[67,68],[66,68],[56,68],[64,68],[65,69],[64,69],[65,70],[70,71],[42,71],[52,72],[53,72],[55,72],[70,73],[65,74],[68,74],[73,74],[72,74],[15,74],[60,75],[69,75],[73,75],[70,75],[72,76],[54,76],[53,76],[74,76],[68,77],[75,77],[71,77],[76,77],[69,77],[72,78],[55,78],[76,78],[60,78],[77,78],[69,79],[74,79],[75,79],[77,79],[78,80],[52,81],[74,81],[78,81],[47,82],[79,82],[81,82],[66,82],[78,83],[81,83],[75,84],[80,84],[38,84],[77,84],[75,85],[80,85],[59,85],[78,86],[84,86],[68,86],[86,87],[85,87],[57,88],[86,88],[77,88],[62,88],[36,89],[89,90],[88,90],[85,91],[88,91],[89,91],[91,92],[82,92],[76,92],[86,92],[71,92],[91,93],[69,93],[82,93],[86,94],[39,94],[83,94],[87,94],[76,95],[94,95],[67,95]]
  ]
];

let i: number = 0;
for (let test of tests) {
  const [colors, edges] = test;
  console.time(i.toString());
  logOutList(largestPathValue(colors, edges))
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}