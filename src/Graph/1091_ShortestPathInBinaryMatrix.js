/*
In an N by N square grid, each cell is either empty (0) or blocked (1).

A clear path from top-left to bottom-right has length k if and only if it is composed of cells C_1, C_2, ..., C_k such that:

Adjacent cells C_i and C_{i+1} are connected 8-directionally (ie., they are different and share an edge or corner)
C_1 is at location (0, 0) (ie. has value grid[0][0])
C_k is at location (N-1, N-1) (ie. has value grid[N-1][N-1])
If C_i is located at (r, c), then grid[r][c] is empty (ie. grid[r][c] == 0).
Return the length of the shortest such clear path from top-left to bottom-right.  If such a path does not exist, return -1.



Example 1:

Input: [[0,1],[1,0]]


Output: 2

Example 2:

Input: [[0,0,0],[1,1,0],[1,1,0]]


Output: 4



Note:

1 <= grid.length == grid[0].length <= 100
grid[r][c] is 0 or 1
*/

// regular BFS (faster)

var shortestPathBinaryMatrix = function (grid) {
  const maxRow = grid.length - 1;
  const maxCol = grid[0].length - 1;
  if (grid[0][0] === 1 || grid[maxRow][maxCol] === 1) return -1;
  grid[0][0] = 1;

  const queue = [[0, 0]];

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  while (queue.length) {
    const [row, col] = queue.shift();
    const distance = grid[row][col];

    if (row === maxRow && col === maxCol) return grid[row][col];

    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext > maxRow
        || cNext < 0
        || cNext > maxCol
        || grid[rNext][cNext] === 1
        || grid[rNext][cNext] && grid[rNext][cNext] <= distance + 1
      ) continue;

      grid[rNext][cNext] = distance + 1;
      queue.push([rNext, cNext]);
    }
  }

  return grid[maxRow][maxCol] || -1;
};


// djikstra's
var shortestPathBinaryMatrix = function (grid) {
  const maxRow = grid.length - 1;
  const maxCol = grid[0].length - 1;
  if (grid[0][0] === 1 || grid[maxRow][maxCol] === 1) return -1;
  grid[0][0] = 1;

  const priorityQueue = [[0, 0, grid[0][0]]];

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  while (priorityQueue.length) {
    const [row, col, distance] = pop(priorityQueue);

    if (grid[maxRow][maxCol] && distance > grid[maxRow][maxCol]) return grid[maxRow][maxCol];

    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext > maxRow
        || cNext < 0
        || cNext > maxCol
        || grid[rNext][cNext] === 1
        || grid[rNext][cNext] && grid[rNext][cNext] <= distance + 1
      ) continue;

      const nextDistance = distance + 1;
      grid[rNext][cNext] = nextDistance;
      push([rNext, cNext, nextDistance], priorityQueue);
    }
  }

  return grid[maxRow][maxCol] || -1;
};

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  const result = heap.pop();
  siftDown(heap);
  return result;
}

const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    let next = current;
    if (heap[parent][2] > heap[next][2]) next = parent;

    if (next !== current) {
      [heap[current], heap[next]] = [heap[next], heap[current]];
      current = next;
    } else break;
  }
}

const siftDown = (heap) => {
  let current = 0;
  while (true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;

    if (heap[left] && heap[left][2] < heap[next][2]) next = left;
    if (heap[right] && heap[right][2] < heap[next][2]) next = right;

    if (next !== current) {
      [heap[current], heap[next]] = [heap[next], heap[current]];
      current = next;
    } else break;
  }
}


// for (let i = 0; i < 10; i += 1) {
//   const n = Math.floor(Math.random() * 20);
//   const grid = new Array(n)
//     .fill(null).map(() =>
//       new Array(n).fill(0).map(() => Math.floor(Math.random() * 2))
//     );

//   logOutList(printGrid(grid));
// }

const tests = [
  [[0, 1], [1, 0]],
  [[0, 0, 0], [1, 1, 0], [1, 1, 0]],
  [
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    [0, 1, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0, 1, 0]
  ],
  [
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0]
  ],
  [
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 0]
  ],
  [
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
    [0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 0, 1, 0]
  ],
  [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1]
  ],
  [
    [0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 0]
  ],
  [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0]
  ],
  [
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0]
  ],
  [
    [1, 0],
    [1, 0]
  ],
  [
    [0, 0, 0, 1],
    [1, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 1]
  ],
  [
    [0, 0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0]
  ],
];

for (let test of tests) {
  logOutList(shortestPathBinaryMatrix(test));
}