
const printGrid = (grid) => (
  `[
    ${grid.map((row) => printRow(row)).join(',\n')}
  ]`
)

const printRow = (row) => `[${row.join(',\t')}]`;

export { printGrid, printRow };