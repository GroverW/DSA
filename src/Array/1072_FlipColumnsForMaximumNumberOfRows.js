/*

*/


// CLEVER!!
var maxEqualRowsAfterFlips = function(matrix) {
  const counts = {};
  return matrix.reduce((best, row) => {
    const first = row[0];
    const lookup = row.map((val) => val === first ? 1 : 0).join('');
    counts[lookup] = counts[lookup] + 1 || 1;
    return Math.max(best, counts[lookup]);
  }, 0)
};


// naive
var maxEqualRowsAfterFlips = function(matrix) {
  const counts = {};
  return matrix.reduce((best, row) => {
    const same = row.join('');
    const xor = row.map((val) => val ? 0 : 1).join('');
    const countSame = counts[same] + 1 || 1;
    const countXor = counts[xor] || 0;
    counts[same] = countSame;
    return Math.max(best, countSame + countXor);
  }, 0)
};

for (let i = 0; i < 25; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const matrix = [];

  const copy = () => [...randomOption(matrix)];
  const xOr = () => copy().map((val) => val ? 0 : 1);
  const getNew = () => new Array(len).fill(0).map(() => numberBetween(0,1));
  matrix.push(getNew());
  const choices = [copy, xOr, getNew, getNew];

  for(let i = 1; i < len; i += 1) {
    const choice = randomOption(choices);
    matrix.push(choice());
  }


  // logOutList('"' + parenString + '",')
  // logOutList(printRow([nums, k]) + ',')
  // logOutList(printRow([s, t]) + ',');
  // logOutList(numberBetween(1, 100) + ',');
  logOutList(printRow(matrix) + ',')
}

const tests = [
  [[1,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0],[0,1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,1,0,1],[1,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0],[1,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0],[1,0,0,1,1,0,1,0,0,1,0,0,0,1,1,1,0,1,0,0,1,1,0,0,0,1,1,0,0,1,1,0],[0,1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,1,0,1],[0,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,0,1,1,0],[1,1,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,1,0,0,1,0,0,0,0,1,0,0,1,1],[0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,0,0,0,0,0,1,1,0,0,0,1,0,1,0,1,1,0],[1,0,1,0,1,0,1,1,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,1,0,0,1,1],[1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,0,1,1,0,1,0,1,0,0,1,0,1],[0,1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,1,0,1],[0,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,0,1,1,0],[0,1,0,0,0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,1,0,1],[1,0,1,0,1,0,1,1,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,1,1,1,0,0,1,1],[0,0,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,1],[1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,1,0,0,1,1,0,1,1,0,0,1],[1,0,0,1,1,0,1,0,0,1,0,0,0,1,1,1,0,1,0,0,1,1,0,0,0,1,1,0,0,1,1,0],[1,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0],[0,1,0,0,0,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0],[0,0,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1,0,0,1,1],[0,1,1,1,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,0,1,1,0],[0,1,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,0,0,1,1,0,1,1,1,0,0,0,0,0,1],[1,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0],[0,0,0,1,1,0,1,0,0,1,1,1,1,0,0,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,1],[1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,1,0,0,1,1,0,1,1,0,0,1],[0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,0,0,1,1,1,0,0,1,1,1,1,0,1,1,0,0,1],[1,1,1,1,1,1,0,1,0,1,1,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,0,1],[1,1,0,0,0,0,1,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,1,1,0,0],[0,1,1,0,0,1,0,1,1,0,1,1,1,0,0,0,1,0,1,1,0,0,1,1,1,0,0,1,1,0,0,1],[1,1,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1,1,0,0,1,0,0,0,0,1,0,0,1,1],[1,0,1,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0]],
  [[0,1,1,0,1,1,0,1,1,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,0],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,0,1,0,0,1,0,0,1,1,1,0,1,0,0,0,1,1,0,0,1,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1,1,0,0,0,0,1,1,0,1,1,1,0,1,0,1,0],[1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0],[0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0],[0,0,1,1,0,0,0,1,1,0,1,1,1,1,0,1,0,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,0,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,1,1,0,1,0,1,0,0,0,0,0,0,0],[0,1,1,0,1,1,0,1,1,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,0],[1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,0,1,0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,1,1,0,1,0,0,1,1,0,0,1],[0,0,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,1,0,1,1,1,1,1,0,0,1,0,1,0,0,1,0,0,1,1,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,1,0,0,0,1,1,0,1,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,1,1,1,1,0,0,0,1,0,0,1,0,1,1,1,0,1,0],[1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0],[0,1,1,0,1,1,0,1,1,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,0],[0,1,1,0,0,0,0,0,1,1,1,1,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,0,1,0,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1],[0,1,1,1,0,1,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,1,1,1,0,1,0,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,0,0,0,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,1,1,0,1,1,0,1,0,0,0,0,1,1,0,0,1,0,0,1,0,1,0,1,1,0,0,1,0,1,1,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,1,1,1,0,1,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,0,1,0,0,1,0,1,1,0,0],[0,1,1,0,1,1,0,1,1,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,1,0,1,1,0,0,1,1,0],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,1,0,1,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,0,1,0,1,0,1,1,1,0,0,0,1,0,1,1,0,0,1,1,1,0,1,0,0,0,0,0,0,1],[1,0,1,1,0,0,0,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,1,1,0,0,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1],[1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[1,1,1,0,0,0,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,1,0,1,1,1,0,0,0,1,1,1,1,0,1,1,1,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,1,1,0,0,1,1,1,0],[0,1,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1,1,0,0,0,1,1,0,1,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1],[1,1,1,0,0,0,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0],[0,0,1,1,0,0,0,1,1,0,1,1,1,1,0,1,0,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,0,0,0,1,1,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,1,0],[0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,1,0,0,1,1,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0],[1,1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,1,0,0,1,1,0,0,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,0,1,1,0,1,0,1,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,1,1,0,1,1,1,1,0,1,0,1,1,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1],[0,0,1,0,1,1,0,0,1,1,0,1,1,0,0,0,0,1,1,0,0,1,0,1,0,1,1,0,0,0,1,0,1,1,1,1,1,0,1,0,1,0,0,1,1,0,1,0,0,0,0,0,0],[0,1,1,1,1,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1],[1,0,1,1,0,0,0,1,1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,0,1,1,0,0,0,1,0,1,1,1,1,1,1,1,0,0,1,1,1],[1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,0,0,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,0,1,0],[0,0,0,1,1,1,1,1,0,0,0,1,0,0,1,1,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[0,0,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,1,0,1,1,0,1,1,0,1],[1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,1,0,1,1,0,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1],[0,1,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1,1,0,0,0,1,1,0,1,1,0,0,1,1,0,1,0,0,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1],[0,0,1,1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,1,0,0,0,0,1],[1,0,0,1,0,0,1,0,0,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,1,1,0,1,0,0,1,1,0,0,1],[1,1,1,0,0,0,0,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0]],
];



let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(maxEqualRowsAfterFlips(test));
  console.timeEnd(i);
  i += 1;
}

/*

*/