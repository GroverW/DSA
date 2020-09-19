/*
On an N x N grid, each square grid[i][j] represents the elevation at that point (i,j).

Now rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distance in zero time. Of course, you must stay within the boundaries of the grid during your swim.

You start at the top left square (0, 0). What is the least time until you can reach the bottom right square (N-1, N-1)?

Example 1:

Input: [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.

You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
Example 2:

Input: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation:
 0  1  2  3  4
24 23 22 21  5
12 13 14 15 16
11 17 18 19 20
10  9  8  7  6

The final route is marked in bold.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.
Note:

2 <= N <= 50.
grid[i][j] is a permutation of [0, ..., N*N - 1].
*/

var swimInWater = function (grid) {
  const targetRow = grid.length - 1;
  const targetCol = grid[0].length - 1;

  const bestTimes = new Array(grid.length).fill(null)
    .map(() => new Array(grid[0].length).fill(Infinity))

  const queue = [[grid[0][0], 0, 0]];
  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  while (queue.length) {
    const [journeyBest, r, c] = pop(queue);

    if (journeyBest > bestTimes[targetRow][targetCol]) break;
    if (r === targetRow && c === targetCol) continue;

    for (let [rDiff, cDiff] of tests) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;

      if (
        rNext < 0
        || rNext > targetRow
        || cNext < 0
        || cNext > targetCol
        || journeyBest >= bestTimes[rNext][cNext]
      ) continue;

      const height = grid[rNext][cNext];
      const nextTime = height > journeyBest ? height : journeyBest;
      bestTimes[rNext][cNext] = nextTime;
      push([nextTime, rNext, cNext], queue);
    }
  }

  return bestTimes[targetRow][targetCol];
};

const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  const res = heap.pop();
  siftDown(0, heap);

  return res;
}

const siftDown = (start, heap) => {
  let current = start;
  while (true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;

    if (heap[left] && heap[next][0] > heap[left][0]) next = left;
    if (heap[right] && heap[next][0] > heap[right][0]) next = right;

    if (next !== current) {
      [heap[current], heap[next]] = [heap[next], heap[current]];
      current = next;
    } else break;
  }
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    let next = current;
    if (heap[next][0] < heap[parent][0]) next = parent;

    if (next !== current) {
      [heap[next], heap[current]] = [heap[current], heap[next]];
      current = next;
    } else break;
  }
}

const tests = [
  [
    [0, 2],
    [1, 3]
  ],
  [
    [0, 1, 2, 3, 4],
    [24, 23, 22, 21, 5],
    [12, 13, 14, 15, 16],
    [11, 17, 18, 19, 20],
    [10, 9, 8, 7, 6]
  ],
  [
    [20, 4, 5, 7, 12],
    [6, 8, 9, 11, 10],
    [7, 13, 14, 15, 10],
    [11, 14, 15, 16, 10],
    [12, 11, 10, 9, 8],
  ],
  [[3,2],[0,1]],
];

for (let test of tests) {
  logOutList(swimInWater(test))
}

