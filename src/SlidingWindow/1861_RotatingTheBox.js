/*
You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:

A stone '#'
A stationary obstacle '*'
Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not affect the stones' horizontal positions.

It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above.

 

Example 1:



Input: box = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
Example 2:



Input: box = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
Example 3:



Input: box = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
 

Constraints:

m == box.length
n == box[i].length
1 <= m, n <= 500
box[i][j] is either '#', '*', or '.'.
*/



var rotateTheBox = function(box) {
  const rows = box.length;
  const cols = box[0].length;

  for(let r = 0; r < rows; r += 1) {
    let start = 0;
    for(let c = 0; c < cols; c += 1) {
      if (box[r][c] === '*') start = c + 1;
      if (box[r][c] === '#' && box[r][start] !== '#') start = c;
      if (box[r][c] === '.' && box[r][start] === '#') {
        box[r][start] = '.';
        box[r][c] = '#';
        start += 1;
      }
    }
  }
  
  const rotated = new Array(cols).fill(0)
    .map(() => new Array(rows).fill(''))
  
  return rotated.map((row, r) => row.map((_, c) => box[rows - c - 1][r]))
};




const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);
  const n = numberBetween(1, maxLen);
  const m = numberBetween(1, maxLen);

  const baseOptions = ['#', '#', '#', '.', '*']
  const options = ['.','.','.','#','#','*']
  const withEmpty = ['.', '.', '*']
  
  const box = new Array(n).fill(0).map(() => new Array(m).fill(''))
  box[n - 1] = box[n - 1].map(() => randomOption(baseOptions))

  for (let r = n - 2; r >= 0; r -= 1) {
    for(let c = 0; c < m; c += 1) {
      if(box[r+1][c] ==='.') {
        box[r][c] = randomOption(withEmpty);
      } else {
        box[r][c] = randomOption(baseOptions);
      }
    }
  }

  // logOutList('"' + s + '"')
  // logOutList(printRow(arr) + ',')
  logOutList(printRow(box));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([nums, k])
}