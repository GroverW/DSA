const fs = require('fs');

const countActiveCubes3D = (map) => {
  const size = 25;
  const grid = new Array(size).fill(0)
    .map(() => new Array(size).fill(0)
      .map(() => new Array(size).fill(0)));
  const nextGrid = new Array(size).fill(0)
    .map(() => new Array(size).fill(0)
      .map(() => new Array(size).fill(0)));

  const activeQueue = [];

  const start = Math.floor(size / 2) + Math.floor(map.length / 2);
  const end = start - map.length;

  for (let y = start; y > end; y -= 1) {
    for (let x = start; x > end; x -= 1) {
      if (map[y - end - 1][x - end - 1] === '#') {
        grid[12][y][x] = '#';
        activeQueue.push([12, y, x]);
      }
    }
  }

  for (let n = 0; n < 6; n += 1) {
    for (let end = activeQueue.length - 1; end >= 0; end -= 1) {
      const [z, y, x] = activeQueue.shift();
      let activeNeighbors = 0;

      for (let zDiff = -1; zDiff <= 1; zDiff += 1) {
        for (let yDiff = -1; yDiff <= 1; yDiff += 1) {
          for (let xDiff = -1; xDiff <= 1; xDiff += 1) {
            if (!zDiff && !yDiff && !xDiff) continue;
            const zNext = z + zDiff;
            const yNext = y + yDiff;
            const xNext = x + xDiff;
            if (grid[zNext][yNext][xNext] === '#') {
              activeNeighbors += 1;
            } else {
              nextGrid[zNext][yNext][xNext] += 1;
            }
          }
        }
      }

      if (activeNeighbors === 2 || activeNeighbors === 3) {
        nextGrid[z][y][x] = 3;
      }
    }

    for (let z = 0; z < size; z += 1) {
      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          grid[z][y][x] = 0;
          if (nextGrid[z][y][x] === 3) {
            grid[z][y][x] = '#';
            activeQueue.push([z, y, x]);
          } else {
            grid[z][y][x] = 0;
          }
          nextGrid[z][y][x] = 0;
        }
      }
    }
  }

  return activeQueue.length;
}

const countActiveCubes4D = (map) => {
  const size = 25;
  const grid = new Array(size).fill(0)
    .map(() => new Array(size).fill(0)
      .map(() => new Array(size).fill(0)
        .map(() => new Array(size).fill(0))
      )
    );
  const nextGrid = new Array(size).fill(0)
    .map(() => new Array(size).fill(0)
      .map(() => new Array(size).fill(0)
        .map(() => new Array(size).fill(0))
      )
    );

  const activeQueue = [];

  const start = Math.floor(size / 2) + Math.floor(map.length / 2);
  const end = start - map.length;

  for (let y = start; y > end; y -= 1) {
    for (let x = start; x > end; x -= 1) {
      if (map[y - end - 1][x - end - 1] === '#') {
        grid[12][12][y][x] = '#';
        activeQueue.push([12, 12, y, x]);
      }
    }
  }

  for (let n = 0; n < 6; n += 1) {
    for (let end = activeQueue.length - 1; end >= 0; end -= 1) {
      const [w, z, y, x] = activeQueue.shift();
      let activeNeighbors = 0;

      for (let wDiff = -1; wDiff <= 1; wDiff += 1) {
        for (let zDiff = -1; zDiff <= 1; zDiff += 1) {
          for (let yDiff = -1; yDiff <= 1; yDiff += 1) {
            for (let xDiff = -1; xDiff <= 1; xDiff += 1) {
              if (!wDiff && !zDiff && !yDiff && !xDiff) continue;
              const wNext = w + wDiff;
              const zNext = z + zDiff;
              const yNext = y + yDiff;
              const xNext = x + xDiff;
              if (grid[wNext][zNext][yNext][xNext] === '#') {
                activeNeighbors += 1;
              } else {
                nextGrid[wNext][zNext][yNext][xNext] += 1;
              }
            }
          }
        }
      }

      if (activeNeighbors === 2 || activeNeighbors === 3) {
        nextGrid[w][z][y][x] = 3;
      }
    }

    for (let w = 0; w < size; w += 1) {
      for (let z = 0; z < size; z += 1) {
        for (let y = 0; y < size; y += 1) {
          for (let x = 0; x < size; x += 1) {
            grid[w][z][y][x] = 0;
            if (nextGrid[w][z][y][x] === 3) {
              grid[w][z][y][x] = '#';
              activeQueue.push([w, z, y, x]);
            } else {
              grid[w][z][y][x] = 0;
            }
            nextGrid[w][z][y][x] = 0;
          }
        }
      }
    }
  }

  return activeQueue.length;
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(countActiveCubes4D(parsed));
});

/*

*/