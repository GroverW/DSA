/*
You are asked to cut off trees in a forest for a golf event. The forest is represented as a non-negative 2D map, in this map:

0 represents the obstacle can't be reached.
1 represents the ground can be walked through.
The place with number bigger than 1 represents a tree can be walked through, and this positive number represents the tree's height.
In one step you can walk in any of the four directions top, bottom, left and right also when standing in a point which is a tree you can decide whether or not to cut off the tree.

You are asked to cut off all the trees in this forest in the order of tree's height - always cut off the tree with lowest height first. And after cutting, the original place has the tree will become a grass (value 1).

You will start from the point (0, 0) and you should output the minimum steps you need to walk to cut off all the trees. If you can't cut off all the trees, output -1 in that situation.

You are guaranteed that no two trees have the same height and there is at least one tree needs to be cut off.

Example 1:

Input:
[
 [1,2,3],
 [0,0,4],
 [7,6,5]
]
Output: 6


Example 2:

Input:
[
 [1,2,3],
 [0,0,0],
 [7,6,5]
]
Output: -1


Example 3:

Input:
[
 [2,3,4],
 [0,0,5],
 [8,7,6]
]
Output: 6
Explanation: You started from the point (0,0) and you can cut off the tree in (0,0) directly without walking.


Constraints:

1 <= forest.length <= 50
1 <= forest[i].length <= 50
0 <= forest[i][j] <= 10^9
*/

var cutOffTree = function (forest) {
  const heights = getHeights(forest);
  const visited = new Array(forest.length)
    .fill(null)
    .map(() => new Array(forest[0].length).fill(0))

  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let totalSteps = 0;
  let numFound = 0;
  let queue = [[0, 0]];

  for (let height of heights) {
    let currSteps = 0;
    let found = false;
    while (queue.length) {
      for (let end = queue.length - 1; end >= 0; end -= 1) {
        const [r, c] = queue.shift();

        if (forest[r][c] === height) {
          totalSteps += currSteps;
          found = true;
          numFound += 1;
          queue = [[r, c]];
          break;
        }

        for (let [rDiff, cDiff] of directions) {
          const rNext = r + rDiff;
          const cNext = c + cDiff;

          if (
            rNext < 0
            || rNext >= forest.length
            || cNext < 0
            || cNext >= forest[0].length
            || forest[rNext][cNext] === 0
            || visited[rNext][cNext] === -height
          ) continue;

          visited[rNext][cNext] = -height;
          queue.push([rNext, cNext]);
        }
      }

      if (found) break;
      currSteps += 1;
    }
  }

  return numFound === heights.length ? totalSteps : -1;
};

const getHeights = (forest) => {
  const heights = [];
  forest.forEach((row) => row.forEach((height) => {
    if (height > 1) heights.push(height);
  }))
  return heights.sort((a, b) => a - b);
}



const tests = [
  [[2, 3, 4], [0, 0, 5], [8, 7, 6]],
  [[54581641, 64080174, 24346381, 69107959], [86374198, 61363882, 68783324, 79706116], [668150, 92178815, 89819108, 94701471], [83920491, 22724204, 46281641, 47531096], [89078499, 18904913, 25462145, 60813308]]
];

for (let test of tests) {
  logOutList(cutOffTree(test));
}