/*

*/

// simple BFS
var minCost = function (grid) {
  const directions = [[1, 0, 1], [2, 0, -1], [3, 1, 0], [4, -1, 0]];
  const minValues = new Array(grid.length).fill(null)
    .map(() => new Array(grid[0].length).fill(Infinity));

  minValues[0][0] = 0;

  const queue = [[0, 0]];

  while (queue.length) {
    const [r, c] = queue.shift();
    const currDirection = grid[r][c];
    const currCost = minValues[r][c];

    for (let [nextDirection, rDiff, cDiff] of directions) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;
      const nextCost = currCost + (nextDirection !== currDirection);

      if (
        rNext < 0
        || rNext >= grid.length
        || cNext < 0
        || cNext >= grid[0].length
        || nextCost >= minValues[rNext][cNext]
      ) continue;

      minValues[rNext][cNext] = nextCost;
      queue.push([rNext, cNext]);
    }
  }

  return minValues[grid.length - 1][grid[0].length - 1];
};

// djikstra

var minCost = function (grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const directions = [[1, 0, 1], [2, 0, -1], [3, 1, 0], [4, -1, 0]];
  const minValues = new Array(gridHeight).fill(null)
    .map(() => new Array(gridWidth).fill(Infinity));

  minValues[0][0] = 0;

  const queue = [[0, 0, 0]];

  let bestCost = Infinity;

  while (queue.length) {
    const [currCost, r, c] = pop(queue);
    const currDirection = grid[r][c];

    if ((r === gridHeight - 1) && (c === gridWidth - 1)) {
      return currCost;
    }

    for (let [nextDirection, rDiff, cDiff] of directions) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;
      const nextCost = currCost + (nextDirection !== currDirection);

      if (
        rNext < 0
        || rNext >= gridHeight
        || cNext < 0
        || cNext >= gridWidth
        || nextCost >= minValues[rNext][cNext]
      ) continue;

      minValues[rNext][cNext] = nextCost;
      push([nextCost, rNext, cNext], queue);
    }
  }

  return bestCost;
};

const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    let next = current;

    if (heap[next][0] < heap[parent][0]) next = parent;

    if (next !== current) {
      [heap[current], heap[next]] = [heap[next], heap[current]];
      current = next;
    } else break;
  }
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

const tests = [
  [[1, 1, 1, 1], [2, 2, 2, 2], [1, 1, 1, 1], [2, 2, 2, 2]],
  [[1, 1, 3], [3, 2, 2], [1, 1, 4]],
  [[1, 2], [4, 3]],
  [[2, 2, 2], [2, 2, 2]],
  [[4]],
  [[1, 4, 2, 3, 4, 4, 3, 1, 4, 1, 1, 3, 3, 2, 1, 4, 4, 1, 2, 4, 4, 1, 2, 1, 3, 1, 2, 4, 2, 2, 3, 4, 2, 1, 3, 3, 4, 4], [2, 3, 3, 4, 3, 2, 3, 4, 4, 3, 3, 4, 3, 1, 1, 1, 3, 1, 2, 3, 1, 1, 2, 4, 4, 2, 3, 2, 4, 4, 4, 2, 2, 1, 1, 1, 3, 3], [3, 4, 2, 4, 2, 3, 2, 2, 2, 2, 2, 4, 2, 3, 1, 2, 2, 2, 2, 4, 1, 2, 4, 3, 2, 2, 2, 4, 2, 2, 3, 3, 1, 1, 3, 2, 3, 4], [2, 2, 2, 1, 4, 2, 2, 3, 1, 4, 2, 1, 3, 4, 3, 1, 2, 4, 1, 2, 1, 1, 2, 3, 1, 2, 4, 1, 1, 2, 2, 2, 3, 1, 2, 4, 3, 1], [2, 3, 1, 3, 2, 2, 3, 2, 4, 4, 3, 4, 2, 4, 4, 1, 1, 2, 4, 2, 1, 4, 4, 3, 1, 3, 4, 3, 3, 3, 2, 4, 3, 1, 3, 3, 3, 1], [4, 3, 4, 3, 1, 2, 2, 1, 1, 4, 4, 4, 3, 3, 3, 3, 2, 1, 3, 3, 2, 1, 3, 2, 2, 1, 2, 1, 1, 3, 3, 1, 2, 4, 1, 2, 4, 3], [4, 3, 1, 4, 4, 1, 4, 1, 2, 1, 3, 3, 4, 3, 4, 2, 1, 3, 2, 3, 3, 3, 2, 4, 1, 2, 4, 4, 2, 3, 3, 1, 1, 3, 4, 1, 3, 3], [3, 4, 2, 1, 1, 4, 1, 1, 3, 4, 2, 2, 4, 2, 4, 3, 2, 1, 2, 4, 1, 2, 4, 3, 2, 2, 3, 2, 3, 4, 2, 3, 3, 4, 2, 3, 2, 3], [1, 4, 2, 3, 4, 2, 1, 2, 2, 2, 2, 4, 4, 4, 1, 4, 4, 3, 2, 3, 4, 4, 4, 4, 3, 1, 4, 1, 3, 4, 1, 4, 4, 2, 3, 2, 2, 3], [4, 4, 4, 3, 3, 1, 2, 1, 2, 3, 3, 2, 1, 1, 2, 1, 4, 1, 1, 4, 2, 4, 4, 4, 1, 1, 4, 4, 3, 2, 4, 3, 1, 1, 3, 3, 1, 2], [4, 3, 2, 3, 3, 3, 3, 4, 4, 4, 3, 2, 2, 3, 3, 1, 4, 3, 4, 3, 1, 4, 2, 3, 2, 3, 1, 2, 1, 1, 4, 3, 4, 1, 1, 1, 1, 2], [2, 1, 4, 2, 3, 2, 4, 4, 4, 4, 3, 2, 4, 1, 1, 2, 4, 1, 3, 2, 3, 3, 1, 2, 4, 4, 3, 1, 4, 3, 2, 1, 1, 2, 4, 2, 1, 1], [3, 1, 4, 1, 3, 4, 4, 4, 3, 1, 4, 2, 1, 1, 1, 3, 3, 1, 4, 3, 1, 3, 1, 3, 3, 1, 4, 1, 3, 1, 3, 2, 2, 4, 3, 4, 1, 3], [3, 4, 2, 2, 2, 1, 1, 4, 1, 4, 3, 1, 4, 1, 4, 1, 1, 1, 1, 1, 3, 2, 3, 4, 1, 2, 3, 2, 2, 4, 1, 1, 1, 1, 4, 2, 3, 2], [4, 1, 2, 4, 1, 2, 4, 4, 1, 2, 3, 3, 3, 1, 4, 1, 4, 1, 4, 2, 3, 1, 3, 4, 1, 2, 3, 3, 1, 1, 3, 3, 3, 4, 4, 1, 2, 2], [2, 2, 4, 4, 3, 4, 4, 1, 1, 3, 3, 2, 1, 3, 2, 4, 3, 4, 1, 1, 3, 2, 2, 3, 3, 1, 1, 2, 3, 1, 2, 3, 2, 2, 3, 4, 1, 2], [4, 1, 1, 4, 4, 2, 4, 2, 1, 1, 2, 4, 4, 4, 1, 4, 1, 2, 1, 2, 3, 1, 4, 4, 4, 3, 3, 4, 4, 2, 4, 4, 3, 2, 1, 4, 4, 4], [4, 1, 4, 2, 2, 4, 3, 2, 3, 2, 3, 2, 2, 4, 4, 4, 4, 1, 4, 3, 2, 4, 2, 1, 3, 2, 4, 1, 1, 2, 1, 2, 3, 4, 4, 4, 3, 4], [2, 4, 4, 1, 4, 4, 4, 4, 1, 3, 3, 3, 2, 4, 3, 1, 4, 4, 1, 1, 1, 4, 3, 4, 3, 2, 2, 1, 4, 3, 1, 2, 2, 2, 3, 2, 4, 3], [1, 3, 1, 4, 4, 3, 3, 3, 2, 1, 1, 2, 3, 4, 4, 4, 2, 4, 3, 1, 1, 3, 4, 4, 4, 1, 3, 1, 2, 2, 3, 3, 4, 4, 4, 1, 2, 2], [4, 4, 1, 3, 1, 2, 4, 1, 2, 1, 2, 2, 4, 1, 2, 4, 3, 4, 1, 4, 2, 2, 4, 1, 1, 1, 2, 2, 3, 1, 2, 4, 3, 3, 2, 1, 3, 3], [4, 3, 2, 1, 1, 1, 2, 4, 4, 2, 3, 1, 2, 2, 2, 1, 3, 3, 2, 4, 2, 2, 1, 4, 1, 3, 2, 4, 3, 4, 2, 2, 2, 3, 2, 3, 4, 4], [3, 3, 1, 1, 2, 2, 2, 4, 2, 4, 1, 2, 2, 3, 2, 2, 2, 1, 1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 2, 1, 2, 1, 3, 1, 4, 4, 1], [3, 4, 2, 2, 4, 2, 2, 1, 3, 1, 4, 3, 4, 1, 1, 2, 2, 1, 3, 3, 3, 4, 4, 1, 4, 2, 4, 1, 3, 3, 4, 1, 4, 3, 4, 2, 1, 2], [1, 1, 3, 4, 3, 1, 1, 1, 4, 3, 1, 2, 4, 1, 1, 3, 4, 1, 4, 3, 2, 4, 4, 3, 4, 2, 2, 2, 2, 1, 3, 2, 2, 1, 3, 4, 2, 1], [1, 1, 4, 1, 3, 4, 4, 3, 2, 4, 4, 1, 1, 3, 2, 1, 3, 1, 2, 2, 4, 3, 2, 1, 2, 4, 2, 2, 3, 2, 3, 3, 1, 3, 1, 3, 1, 1], [4, 2, 2, 3, 3, 2, 4, 3, 3, 3, 3, 4, 2, 4, 3, 1, 3, 3, 1, 1, 2, 2, 2, 2, 3, 4, 1, 1, 4, 4, 4, 3, 3, 4, 3, 1, 4, 3], [3, 2, 3, 2, 3, 4, 1, 1, 2, 4, 1, 1, 2, 1, 2, 4, 1, 2, 1, 3, 1, 2, 3, 4, 3, 2, 3, 4, 2, 3, 2, 2, 3, 4, 1, 1, 4, 1], [3, 1, 1, 2, 3, 2, 4, 1, 4, 4, 2, 2, 3, 2, 3, 1, 1, 3, 3, 3, 2, 4, 4, 1, 1, 3, 2, 3, 1, 2, 1, 2, 4, 1, 1, 1, 4, 4], [1, 2, 4, 2, 2, 2, 1, 2, 3, 3, 4, 1, 4, 2, 1, 2, 4, 4, 2, 3, 3, 4, 1, 3, 3, 2, 2, 4, 1, 3, 2, 4, 1, 1, 1, 4, 4, 2], [4, 3, 2, 1, 4, 3, 3, 4, 3, 3, 3, 3, 3, 2, 2, 3, 2, 1, 2, 4, 1, 3, 4, 4, 2, 2, 2, 2, 4, 1, 1, 3, 3, 1, 4, 1, 3, 4], [1, 2, 3, 4, 4, 2, 3, 3, 3, 2, 2, 4, 4, 4, 2, 4, 2, 3, 4, 2, 3, 4, 2, 3, 1, 1, 3, 2, 1, 1, 4, 1, 4, 1, 1, 2, 1, 3], [4, 1, 4, 1, 4, 2, 4, 2, 3, 4, 4, 1, 1, 4, 3, 2, 4, 3, 3, 2, 4, 1, 1, 3, 4, 3, 4, 4, 4, 3, 1, 3, 4, 1, 2, 1, 3, 3], [2, 2, 2, 3, 2, 3, 4, 1, 2, 4, 1, 1, 4, 2, 1, 3, 4, 3, 1, 4, 3, 3, 3, 3, 2, 3, 4, 4, 2, 3, 1, 1, 1, 3, 4, 1, 3, 4], [1, 1, 2, 4, 3, 1, 2, 2, 1, 2, 4, 1, 1, 1, 3, 4, 3, 4, 2, 4, 3, 2, 3, 2, 3, 1, 1, 3, 2, 4, 1, 1, 4, 4, 1, 3, 2, 2], [3, 2, 2, 4, 1, 3, 3, 1, 1, 4, 1, 4, 1, 1, 2, 3, 2, 1, 2, 2, 2, 2, 4, 1, 1, 3, 4, 1, 3, 4, 3, 1, 4, 3, 2, 1, 1, 1], [4, 4, 4, 2, 4, 3, 1, 1, 2, 4, 3, 3, 3, 1, 4, 2, 1, 4, 3, 3, 1, 4, 1, 2, 1, 4, 2, 1, 1, 1, 3, 3, 1, 1, 1, 4, 3, 2], [3, 3, 2, 2, 1, 3, 4, 2, 4, 2, 1, 4, 3, 2, 2, 4, 2, 1, 1, 4, 3, 2, 1, 2, 3, 3, 2, 1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3], [3, 4, 3, 2, 1, 1, 3, 4, 4, 1, 2, 2, 1, 2, 1, 2, 3, 2, 4, 1, 2, 2, 2, 1, 1, 2, 3, 1, 4, 2, 3, 4, 1, 2, 4, 2, 1, 2], [1, 2, 3, 1, 4, 2, 3, 2, 1, 2, 4, 2, 2, 4, 2, 2, 2, 4, 3, 2, 1, 1, 1, 3, 4, 4, 4, 4, 4, 1, 1, 2, 3, 2, 4, 4, 3, 3], [1, 3, 3, 1, 4, 3, 2, 4, 4, 2, 4, 4, 1, 4, 1, 1, 3, 3, 2, 2, 1, 2, 2, 4, 2, 3, 4, 2, 2, 2, 3, 4, 4, 4, 2, 1, 4, 3], [1, 3, 4, 1, 2, 2, 4, 3, 3, 3, 3, 4, 2, 3, 2, 3, 1, 1, 4, 1, 1, 1, 3, 3, 1, 4, 1, 2, 3, 4, 3, 3, 3, 1, 4, 3, 4, 2], [1, 1, 2, 1, 2, 4, 3, 3, 4, 2, 2, 3, 3, 3, 1, 4, 4, 2, 4, 1, 3, 3, 1, 4, 2, 4, 1, 1, 1, 3, 3, 3, 1, 2, 4, 3, 2, 2], [1, 1, 1, 1, 3, 3, 1, 3, 1, 4, 4, 1, 4, 2, 3, 1, 4, 1, 1, 1, 4, 1, 4, 2, 1, 2, 4, 2, 4, 3, 3, 3, 1, 2, 4, 1, 3, 1], [4, 1, 2, 3, 2, 3, 1, 1, 4, 2, 3, 3, 3, 2, 4, 4, 4, 1, 4, 1, 4, 3, 3, 2, 4, 4, 4, 1, 4, 1, 4, 1, 4, 4, 1, 1, 1, 3], [2, 2, 4, 2, 2, 4, 3, 3, 3, 2, 4, 2, 1, 3, 2, 2, 2, 4, 1, 4, 4, 2, 4, 2, 4, 2, 1, 1, 3, 2, 1, 4, 2, 2, 3, 3, 4, 2], [3, 1, 1, 2, 4, 3, 3, 4, 4, 3, 4, 1, 4, 4, 2, 1, 3, 3, 2, 2, 1, 3, 2, 2, 2, 3, 2, 3, 3, 1, 2, 4, 2, 1, 4, 1, 2, 1], [1, 4, 1, 2, 2, 1, 2, 1, 3, 4, 3, 4, 1, 1, 1, 3, 3, 4, 2, 4, 4, 1, 2, 4, 3, 3, 3, 2, 2, 2, 2, 3, 1, 4, 4, 2, 2, 2], [2, 3, 2, 3, 2, 3, 2, 3, 4, 2, 4, 4, 2, 2, 3, 2, 4, 3, 2, 2, 4, 3, 1, 1, 2, 1, 4, 4, 2, 4, 2, 4, 1, 4, 2, 1, 2, 4], [3, 1, 4, 3, 1, 1, 1, 3, 4, 1, 3, 1, 3, 2, 2, 1, 2, 3, 2, 1, 3, 1, 1, 3, 3, 4, 2, 3, 3, 3, 2, 1, 2, 4, 2, 2, 2, 1], [1, 4, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 1, 4, 1, 2, 2, 1, 2, 4, 2, 1, 4, 2, 3, 2, 2, 2, 4, 1, 1, 3, 4, 2, 1, 4, 2], [2, 2, 3, 1, 2, 1, 1, 4, 3, 2, 2, 4, 1, 1, 3, 1, 1, 1, 2, 3, 3, 3, 1, 1, 3, 3, 1, 3, 3, 2, 4, 1, 2, 4, 4, 4, 2, 4], [3, 3, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 2, 1, 2, 4, 3, 4, 2, 3, 3, 3, 1, 1, 1, 4, 4, 2, 2, 4, 2, 1, 3, 1, 3, 3, 1, 4], [3, 1, 2, 2, 2, 2, 1, 4, 1, 2, 1, 3, 4, 3, 2, 1, 2, 3, 4, 1, 1, 1, 4, 4, 2, 3, 4, 1, 3, 3, 2, 3, 4, 4, 4, 4, 3, 3], [2, 4, 4, 3, 3, 3, 2, 1, 4, 4, 4, 1, 4, 3, 1, 1, 2, 1, 2, 1, 3, 2, 3, 3, 4, 2, 1, 4, 4, 4, 2, 4, 4, 3, 3, 4, 3, 1], [2, 4, 2, 1, 4, 2, 2, 2, 2, 1, 4, 3, 3, 4, 2, 3, 1, 1, 1, 2, 3, 4, 2, 3, 1, 4, 4, 3, 3, 1, 1, 4, 1, 3, 3, 1, 1, 3], [1, 3, 4, 1, 1, 2, 1, 1, 3, 1, 2, 3, 1, 1, 1, 4, 1, 4, 3, 4, 4, 4, 1, 2, 4, 1, 2, 2, 4, 1, 2, 4, 4, 1, 4, 2, 2, 2], [2, 3, 2, 1, 4, 3, 4, 3, 2, 3, 2, 3, 1, 4, 2, 4, 1, 3, 3, 2, 1, 3, 4, 3, 3, 1, 1, 3, 2, 4, 4, 3, 1, 1, 1, 3, 1, 1], [3, 4, 3, 3, 2, 3, 2, 4, 4, 3, 4, 2, 2, 3, 2, 4, 1, 2, 4, 4, 1, 1, 1, 3, 2, 1, 4, 2, 4, 3, 3, 1, 1, 4, 1, 3, 3, 3], [2, 4, 2, 2, 4, 4, 4, 4, 2, 3, 4, 3, 2, 2, 2, 1, 2, 1, 3, 1, 1, 2, 2, 3, 1, 4, 1, 4, 1, 2, 1, 2, 2, 3, 3, 4, 3, 1]],
  [[1, 1, 3, 3, 3, 4, 1, 2], [3, 4, 4, 3, 2, 3, 2, 3], [4, 3, 3, 4, 3, 2, 4, 3], [3, 2, 1, 1, 4, 3, 3, 2], [2, 4, 4, 2, 4, 4, 3, 4]],
  [[3, 1, 2, 2, 1, 3, 4, 2, 1], [2, 4, 2, 1, 1, 2, 3, 1, 4], [1, 2, 3, 3, 1, 3, 3, 3, 3], [3, 2, 1, 4, 2, 1, 2, 2, 4], [4, 1, 1, 4, 2, 4, 3, 4, 4], [3, 4, 4, 3, 1, 1, 3, 4, 2], [3, 3, 1, 4, 2, 4, 1, 1, 2], [4, 1, 2, 4, 2, 4, 3, 3, 2]],
  [[4, 4, 4, 1, 1, 3, 3, 2], [4, 4, 2, 2, 2, 1, 2, 4], [2, 4, 2, 3, 4, 4, 1, 2], [3, 3, 3, 1, 1, 4, 2, 3], [4, 3, 4, 4, 1, 4, 3, 4], [4, 4, 1, 1, 4, 4, 2, 1], [4, 4, 4, 4, 3, 3, 4, 4]],
  [[3, 2, 2, 3], [1, 2, 2, 3], [4, 3, 4, 3]],
  [[4], [3], [2], [1], [2]],
];

for (let test of tests) {
  logOutList(minCost(test))
}