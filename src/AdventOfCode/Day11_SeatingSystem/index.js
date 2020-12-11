const fs = require('fs');

const findStableState = (seatMap) => {
  let current = [...seatMap].map((row) => row.split(''));
  let next = [...seatMap].map((row) => row.split(''));
  // console.log(current);
  const neighbors = [[1, 0], [-1, 0], [1, 1], [-1, 1], [0, 1], [0, -1], [1, -1], [-1, -1]];
  const countNeighbors = (row, col, target) => {
    let count = 0;
    for (let [rDiff, cDiff] of neighbors) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;
      if (
        rNext < 0
        || rNext >= current.length
        || cNext < 0
        || cNext >= current[0].length
      ) continue;
      count += (current[rNext][cNext] === target);
    }
    return count;
  }

  let count = 0;
  let isChanged;

  do {
    count = 0;
    isChanged = false;

    for (let row = 0; row < current.length; row += 1) {
      for (let col = 0; col < current[0].length; col += 1) {
        if (current[row][col] === '.') continue;

        next[row][col] = current[row][col];

        if (
          current[row][col] === '#'
          && countNeighbors(row, col, '#') >= 4
        ) {
          isChanged = true;
          next[row][col] = 'L'
        }

        if (
          current[row][col] === 'L'
          && countNeighbors(row, col, '#') === 0
        ) {
          isChanged = true;
          next[row][col] = '#';
        }

        count += (next[row][col] === '#');
      }
    }
    [current, next] = [next, current];
    console.log(current[0]);
  } while (isChanged);

  // console.log(current);

  return count;
}
const findStableStateFirstOccupied = (seatMap) => {
  let current = [...seatMap].map((row) => row.split(''));
  let next = [...seatMap].map((row) => row.split(''));
  // console.log(current);
  const directions = [[1, 0], [-1, 0], [1, 1], [-1, 1], [0, 1], [0, -1], [1, -1], [-1, -1]];
  const countNeighbors = (row, col) => {
    let count = 0;
    for (let [rDiff, cDiff] of directions) {
      let rNext = row + rDiff;
      let cNext = col + cDiff;
      while (
        rNext >= 0
        && rNext < current.length
        && cNext >= 0
        && cNext < current[0].length
      ) {
        if (current[rNext][cNext] !== '.') {
          count += (current[rNext][cNext] === '#');
          break;
        }
        
        rNext += rDiff;
        cNext += cDiff;
      }
    }
    return count;
  }

  let count = 0;
  let isChanged;

  do {
    count = 0;
    isChanged = false;

    for (let row = 0; row < current.length; row += 1) {
      for (let col = 0; col < current[0].length; col += 1) {
        if (current[row][col] === '.') continue;

        next[row][col] = current[row][col];

        if (
          current[row][col] === '#'
          && countNeighbors(row, col, '#') >= 5
        ) {
          isChanged = true;
          next[row][col] = 'L'
        }

        if (
          current[row][col] === 'L'
          && countNeighbors(row, col, '#') === 0
        ) {
          isChanged = true;
          next[row][col] = '#';
        }

        count += (next[row][col] === '#');
      }
    }
    [current, next] = [next, current];
    // console.log(current[0]);
  } while (isChanged);

  // console.log(current);

  return count;
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(findStableStateFirstOccupied(parsed));
});