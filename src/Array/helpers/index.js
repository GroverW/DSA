
export const printGrid = (grid) => (
  `[
    ${grid.map((row) => printRow(row)).join(',\n')}
  ]`
)

export const printRow = (row) => `[${row.join(',\t')}]`;

export const randomize = (arr) => {
  const randomized = [...arr];
  for(let i = randomized.length - 1; i > 0; i -= 1) {
    const randIdx = Math.floor(Math.random() * (i + 1));
    [randomized[i], randomized[randIdx]] = [randomized[randIdx], randomized[i]];
  }

  return randomized;
}