/*
We are given a 2-dimensional grid. "." is an empty cell, "#" is a wall, "@" is the starting point, ("a", "b", ...) are keys, and ("A", "B", ...) are locks.

We start at the starting point, and one move consists of walking one space in one of the 4 cardinal directions.  We cannot walk outside the grid, or walk into a wall.  If we walk over a key, we pick it up.  We can't walk over a lock unless we have the corresponding key.

For some 1 <= K <= 6, there is exactly one lowercase and one uppercase letter of the first K letters of the English alphabet in the grid.  This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys.  If it's impossible, return -1.



Example 1:

Input: ["@.a.#","###.#","b.A.B"]
Output: 8
Example 2:

Input: ["@..aA","..B#.","....b"]
Output: 6


Note:

1 <= grid.length <= 30
1 <= grid[0].length <= 30
grid[i][j] contains only '.', '#', '@', 'a'-'f' and 'A'-'F'
The number of keys is in [1, 6].  Each key has a different letter and opens exactly one lock.
*/

var shortestPathAllKeys = function (grid) {
  let start;
  let allKeys = 0;
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const keyIdx = 'a'.charCodeAt(0);
  for (let r = 0; r < gridHeight; r += 1) {
    for (let c = 0; c < gridWidth; c += 1) {
      if (grid[r][c] === '@') {
        start = [0, r, c];
      } else if (grid[r][c] >= 'a' && grid[r][c] <= 'f') {
        allKeys |= 1 << (grid[r][c].charCodeAt(0) - keyIdx);
      }
    }
  }

  const lockIdx = 'A'.charCodeAt(0);
  const cantUnlock = (cell, keys) => (
    cell >= 'A'
    && cell <= 'F'
    && !((1 << (cell.charCodeAt(0) - lockIdx)) & keys)
  )

  const visited = new Array(64).fill(null)
    .map(() => new Array(gridHeight).fill(null)
      .map(() => new Array(gridWidth).fill(false)));
  visited[0][start[1]][start[2]] = true;
  const queue = [start];
  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  let numSteps = 0;
  while (queue.length) {
    for (let end = queue.length - 1; end >= 0; end -= 1) {
      const [keys, r, c] = queue.shift();

      if (keys === allKeys) return numSteps;

      for (let [rDiff, cDiff] of tests) {
        const rNext = r + rDiff;
        const cNext = c + cDiff;

        if (
          rNext < 0
          || rNext >= gridHeight
          || cNext < 0
          || cNext >= gridWidth
          || grid[rNext][cNext] === '#'
          || visited[keys][rNext][cNext]
          || cantUnlock(grid[rNext][cNext], keys)
        ) continue;

        let nextKeys = keys;
        if(grid[rNext][cNext] >= 'a' && grid[rNext][cNext] <= 'f') {
          nextKeys |= 1 << (grid[rNext][cNext].charCodeAt(0) - keyIdx);
        }

        visited[nextKeys][rNext][cNext] = true;
        queue.push([nextKeys, rNext, cNext]);
      }
    }
    numSteps += 1;
  }

  return -1;
};