var maxDistance = function(grid) {
  const queue = [];
  let maxDistance = 0;

  for(let i = 0; i < grid.length; i += 1) {
      for(let j = 0; j < grid[0].length; j += 1) {
          if(grid[i][j] === 1) queue.push([i,j]);
      }
  }

  let end;
  const tests = [[0, 1], [0, -1], [-1, 0], [1, 0]]

  while(queue.length) {
      end = queue.length;

      for(let i = 0; i < end; i += 1) {
          const [r, c] = queue.shift();
          for(let [rDiff, cDiff] of tests) {
              const rNext = r + rDiff;
              const cNext = c + cDiff;

              if(rNext < 0 || rNext >= grid.length) continue;
              if(cNext < 0 || cNext >= grid[0].length) continue;

              if(grid[rNext][cNext] === 0) {
                  grid[rNext][cNext] = 1;
                  queue.push([rNext, cNext]);
              }
          }
      }

      if(queue.length) {
          maxDistance += 1;
      } else {
          return maxDistance > 0 ? maxDistance : -1;
      }
  }

  return -1;
};

const tests = [
  [[1,0,0],[0,0,0],[0,0,0]],
  [[1,1,1],[1,1,1],[1,1,1]],
];

for(let test of tests) {
  logOutList(criticalConnections(...test))
}