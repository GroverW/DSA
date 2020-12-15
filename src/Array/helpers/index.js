
export const format = (element) => {
  if (Array.isArray(element)) {
    return printRow(element);
  } if (typeof element === 'string') {
    return `"${element}"`;
  } else if (typeof element === 'number') {
    return element;
  } else if (typeof element === 'undefined') {
    return 'undefined';
  } else if (typeof element === 'boolean') {
    return element ? 'true' : 'false';
  } else if (Number.isNaN(element)) {
    return 'NaN';
  } else if (!element) {
    return 'null';
  } else {
    return element;
  }
}

export const printRow = (row) => {
  const formatted = row.map((item) => format(item)).join(',')
  return `[${formatted}]`
}

export const printGrid = (grid) => (
  `[
    ${grid.map((row) => printRow(row)).join('\n')},
  ],`
)

export const randomize = (arr) => {
  const randomized = [...arr];
  for (let i = randomized.length - 1; i > 0; i -= 1) {
    const randIdx = Math.floor(Math.random() * (i + 1));
    [randomized[i], randomized[randIdx]] = [randomized[randIdx], randomized[i]];
  }

  return randomized;
}

export const randomizeGrid = (grid) => {
  const height = grid.length;
  const width = grid[0].length;
  const flattened = grid.reduce((newGrid, row) => {
    newGrid.push(...row);
    return newGrid;
  }, []);
  const randomized = randomize(flattened);
  const randomGrid = new Array(height).fill(null)
    .map((_, row) => randomized.slice(row * width, row * width + width));

  return randomGrid;
}
