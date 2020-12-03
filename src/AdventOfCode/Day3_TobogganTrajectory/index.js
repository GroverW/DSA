const fs = require('fs');


const countTrees = (map) => {
  let y = 0;
  let x = 0;
  let treeCount = 0;

  const width = map[0].length;
  while (y < map.length) {
    treeCount += (map[y][x] === '#');
    y += 1;
    x = (x + 3) % width;
  }

  return treeCount;
}

const countTrees2 = (map) => {
  const width = map[0].length;

  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ].reduce((product, [xDiff, yDiff]) => {
    let x = 0;
    let y = 0;

    let treeCount = 0;

    while (y < map.length) {
      treeCount += (map[y][x] === '#');
      y += yDiff;
      x = (x + xDiff) % width;
    }

    return product * treeCount;
  }, 1);
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(countTrees2(parsed));
});