/*
Given a rows x cols matrix grid representing a field of cherries. Each cell in grid represents the number of cherries that you can collect.

You have two robots that can collect cherries for you, Robot #1 is located at the top-left corner (0,0) , and Robot #2 is located at the top-right corner (0, cols-1) of the grid.

Return the maximum number of cherries collection using both robots  by following the rules below:

From a cell (i,j), robots can move to cell (i+1, j-1) , (i+1, j) or (i+1, j+1).
When any robot is passing through a cell, It picks it up all cherries, and the cell becomes an empty cell (0).
When both robots stay on the same cell, only one of them takes the cherries.
Both robots cannot move outside of the grid at any moment.
Both robots should reach the bottom row in the grid.
 

Example 1:



Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.
Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.
Total of cherries: 12 + 12 = 24.
Example 2:



Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
Output: 28
Explanation: Path of robot #1 and #2 are described in color green and blue respectively.
Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.
Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.
Total of cherries: 17 + 11 = 28.
Example 3:

Input: grid = [[1,0,0,3],[0,0,0,3],[0,0,3,3],[9,0,3,3]]
Output: 22
Example 4:

Input: grid = [[1,1],[1,1]]
Output: 4
 

Constraints:

rows == grid.length
cols == grid[i].length
2 <= rows, cols <= 70
0 <= grid[i][j] <= 100 
*/

var cherryPickup = function (grid) {
  const NUM_ROWS = grid.length;
  const NUM_COLS = grid[0].length;
  const bestScores = new Array(NUM_ROWS).fill(0)
    .map(() => new Array(NUM_COLS).fill(0)
      .map(() => new Array(NUM_COLS).fill(-1)));

  const getBestPath = (row, pos1, pos2) => {
    if (
      pos1 < 0
      || pos2 >= NUM_COLS
      || pos1 >= pos2
    ) return 0;

    if (bestScores[row][pos1][pos2] >= 0) return bestScores[row][pos1][pos2];

    const score = grid[row][pos1] + grid[row][pos2];

    if (row === NUM_ROWS - 1) return score;

    for (let pDiff1 = -1; pDiff1 <= 1; pDiff1 += 1) {
      for (let pDiff2 = -1; pDiff2 <= 1; pDiff2 += 1) {
        bestScores[row][pos1][pos2] = Math.max(
          bestScores[row][pos1][pos2],
          score + getBestPath(row + 1, pos1 + pDiff1, pos2 + pDiff2),
        )
      }
    }

    return bestScores[row][pos1][pos2];
  }

  return getBestPath(0, 0, NUM_COLS - 1);
};

const maxLen = 70;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);
  const cols = numberBetween(2, maxLen);

  const grid = new Array(len).fill(0)
    .map(() => new Array(cols).fill(0)
      .map(() => numberBetween(0, 100)))

  // logOutList('"' + instructions + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  logOutList(printRow(grid));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([commands, actions])
}



const tests: Indexable<any>[] = [
  // [[773160767], 252264991],
  // [[2, 8, 4, 10, 6], 20]
  // [[0,0,1,2,3,3,4,7,7,8], 3, 5]
  [[13, 41, 32], [44, 68, 93], [28, 71, 40], [76, 77, 18], [93, 52, 33], [42, 59, 51], [58, 99, 30], [75, 53, 35], [49, 56, 96], [88, 90, 90], [15, 99, 72], [85, 1, 66], [100, 31, 88], [32, 52, 17], [68, 43, 21]]
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  // logOutList(cherryPickup(test))
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}