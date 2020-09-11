/*
You have N gardens, labelled 1 to N.  In each garden, you want to plant one of 4 types of flowers.

paths[i] = [x, y] describes the existence of a bidirectional path from garden x to garden y.

Also, there is no garden that has more than 3 paths coming into or leaving it.

Your task is to choose a flower type for each garden such that, for any two gardens connected by a path, they have different types of flowers.

Return any such a choice as an array answer, where answer[i] is the type of flower planted in the (i+1)-th garden.  The flower types are denoted 1, 2, 3, or 4.  It is guaranteed an answer exists.



Example 1:

Input: N = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
Example 2:

Input: N = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]
Example 3:

Input: N = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
Output: [1,2,3,4]


Note:

1 <= N <= 10000
0 <= paths.size <= 20000
No garden has 4 or more paths coming into or leaving it.
It is guaranteed an answer exists.
*/

var gardenNoAdj = function (N, paths) {
  const graph = new Array(N + 1).fill(null).map(() => []);
  const garden = new Array(N).fill(null);

  for (let [from, to] of paths) {
    graph[from].push(to)
    graph[to].push(from);
  };

  for (let i = 1; i < graph.length; i += 1) {
    const taken = new Array(4).fill(false);

    for (let child of graph[i]) {
      const plant = garden[child - 1];
      if (plant !== null) taken[plant - 1] = true;
    }

    garden[i - 1] = taken.indexOf(false) + 1;
  }

  return garden;
};