import { printGrid } from './helpers';

/*
Given a positive integer n, generate a square matrix filled with elements from 1 to n2 in spiral order.

Example:

Input: 3
Output:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
*/

var generateMatrix = function(n) {
    const matrix = new Array(n).fill(null).map(() => new Array(n).fill(null));

    let firstRow = 0;
    let lastRow = n - 1;
    let firstCol = 0;
    let lastCol = n - 1;
    let curr = 1;

    while(firstRow <= lastRow) {
      for(let c = firstCol; c <= lastCol; c += 1) {
        matrix[firstRow][c] = curr;
        curr += 1;
      }

      firstRow += 1;

      for(let r = firstRow; r <= lastRow; r += 1) {
        matrix[r][lastCol] = curr;
        curr += 1;
      }

      lastCol -= 1;

      for(let c = lastCol; c >= firstCol; c -= 1) {
        matrix[lastRow][c] = curr;
        curr += 1;
      }

      lastRow -= 1;

      for(let r = lastRow; r >= firstRow; r -= 1) {
        matrix[r][firstCol] = curr;
        curr += 1;
      }

      firstCol += 1;

    }

    return matrix;
};

const tests = [
  1, 2, 3, 4, 5
];

for (let test of tests) {
  logOutList(printGrid(generateMatrix(test)))
}