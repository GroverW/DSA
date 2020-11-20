/*
Given a m x n binary matrix mat. In one step, you can choose one cell and flip it and all the four neighbours of it if they exist (Flip is changing 1 to 0 and 0 to 1). A pair of cells are called neighboors if they share one edge.

Return the minimum number of steps required to convert mat to a zero matrix or -1 if you cannot.

Binary matrix is a matrix with all cells equal to 0 or 1 only.

Zero matrix is a matrix with all cells equal to 0.

 

Example 1:


Input: mat = [[0,0],[0,1]]
Output: 3
Explanation: One possible solution is to flip (1, 0) then (0, 1) and finally (1, 1) as shown.
Example 2:

Input: mat = [[0]]
Output: 0
Explanation: Given matrix is a zero matrix. We don't need to change it.
Example 3:

Input: mat = [[1,1,1],[1,0,1],[0,0,0]]
Output: 6
Example 4:

Input: mat = [[1,0,0],[1,0,0]]
Output: -1
Explanation: Given matrix can't be a zero matrix
 

Constraints:

m == mat.length
n == mat[0].length
1 <= m <= 3
1 <= n <= 3
mat[i][j] is 0 or 1.
*/

var minFlips = function (mat) {
  const numRows = mat.length;
  const numCols = mat[0].length;
  const target = '0'.repeat(numRows * numCols);
  const startingBoard = mat.reduce((flat, row) => {
    flat.push(...row);
    return flat;
  }, []).join('');

  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const flip = (board, position) => {
    const newBoard = board.split('');
    const row = Math.floor(position / numCols);
    const col = position % numCols;

    newBoard[position] = newBoard[position] === "0" ? "1" : "0";

    for (let [rDiff, cDiff] of tests) {
      const rNext = row + rDiff;
      const cNext = col + cDiff;

      if (
        rNext < 0
        || rNext >= numRows
        || cNext < 0
        || cNext >= numCols
      ) continue;
      const nextPosition = rNext * numCols + cNext;
      newBoard[nextPosition] = newBoard[nextPosition] === "0" ? "1" : "0";
    }

    return newBoard.join('');
  }

  const visited = new Set([startingBoard]);
  const queue = [startingBoard];

  let count = 0;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i -= 1) {
      const currentBoard = queue.shift();
      if (currentBoard === target) return count;

      for (let j = 0; j < currentBoard.length; j += 1) {
        const nextBoard = flip(currentBoard, j, tests);
        if (visited.has(nextBoard)) continue;
        visited.add(nextBoard);
        queue.push(nextBoard);
      }
    }
    count += 1;
  }

  return -1;
};

// for (let i = 0; i < 10; i += 1) {
//   const rows = Math.floor(Math.random() * 3) + 1;
//   const cols = Math.floor(Math.random() * 3) + 1;

//   const arr = new Array(rows).fill(0)
//     .map(() => new Array(cols).fill(0)
//       .map(() => Math.random() < .5 ? 0 : 1));

//   logOutList(printGrid(arr));
// }


const tests = [
  [[0, 0], [0, 1]],
  [[0]],
  [[1, 1, 1], [1, 0, 1], [0, 0, 0]],
  [[1, 0, 0], [1, 0, 0]],
  [[0]],
  [[1, 0], [1, 0], [1, 0]],
  [[1, 1], [0, 0]],
  [[0], [0], [1]],
  [[1], [0]],
  [[1, 0, 1]],
  [[1, 1, 0], [0, 1, 1], [1, 1, 1]],
  [[1, 0, 0]],
  [[0, 1, 0], [0, 1, 0]],
  [[0, 0, 1], [0, 1, 1], [0, 0, 0]]
];

for (let test of tests) {
  logOutList(minFlips(test));
}

/*
[[0, 0], [0, 1]]
[[0]]
[[1, 1, 1], [1, 0, 1], [0, 0, 0]]
[[1, 0, 0], [1, 0, 0]]
[[0]]
[[1, 0], [1, 0], [1, 0]]
[[1, 1], [0, 0]]
[[0], [0], [1]]
[[1], [0]]
[[1, 0, 1]]
[[1, 1, 0], [0, 1, 1], [1, 1, 1]]
[[1, 0, 0]]
[[0, 1, 0], [0, 1, 0]]
 [[0, 0, 1], [0, 1, 1], [0, 0, 0]]
*/