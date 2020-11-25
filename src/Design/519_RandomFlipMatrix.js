/*
You are given the number of rows n_rows and number of columns n_cols of a 2D binary matrix where all values are initially 0. Write a function flip which chooses a 0 value uniformly at random, changes it to 1, and then returns the position [row.id, col.id] of that value. Also, write a function reset which sets all values back to 0. Try to minimize the number of calls to system's Math.random() and optimize the time and space complexity.

Note:

1 <= n_rows, n_cols <= 10000
0 <= row.id < n_rows and 0 <= col.id < n_cols
flip will not be called when the matrix has no 0 values left.
the total number of calls to flip and reset will not exceed 1000.
Example 1:

Input: 
["Solution","flip","flip","flip","flip"]
[[2,3],[],[],[],[]]
Output: [null,[0,1],[1,2],[1,0],[1,1]]
Example 2:

Input: 
["Solution","flip","flip","reset","flip"]
[[1,2],[],[],[],[]]
Output: [null,[0,0],[0,1],null,[0,0]]
Explanation of Input Syntax:

The input is two lists: the subroutines called and their arguments. Solution's constructor has two arguments, n_rows and n_cols. flip and reset have no arguments. Arguments are always wrapped with a list, even if there aren't any.
*/

var Solution = function (n_rows, n_cols) {
  this.rows = n_rows;
  this.cols = n_cols;
  this.max = n_rows * n_cols;
  this.currMax = this.max;
  this.replace = {};
};

/**
 * @return {number[]}
 */
Solution.prototype.flip = function () {
  const rand = Math.floor(Math.random() * this.currMax);
  const val = this.replace[rand] === undefined ? rand : this.replace[rand];
  const row = Math.floor(val / this.cols);
  const col = val % this.cols || 0;
  this.replace[rand] = this.replace[this.currMax - 1] || this.currMax - 1;
  this.currMax -= 1;
  return [row, col];
};

/**
 * @return {void}
 */
Solution.prototype.reset = function () {
  this.currMax = this.max;
  this.replace = {};
};

/** 
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n_rows, n_cols)
 * var param_1 = obj.flip()
 * obj.reset()
 */

// for (let i = 0; i < 10; i += 1) {
//   const rows = Math.floor(Math.random() * 10);
//   const cols = Math.floor(Math.random() * 10);
//   const test = [
//     ["Solution"],
//     [[rows, cols]]
//   ];

//   for (let i = 0; i < rows * cols; i += 1) {
//     const cmd = Math.random() < 0.8 ? "flip" : "reset";
//     test[0].push(cmd);
//     test[1].push([])
//   }
//   logOutList(printGrid(test));
// }

const tests = [
  [
    ["Solution", "flip", "flip", "flip", "flip"],
    [[2, 2], [], [], [], []]
  ],
  [
    ["Solution", "flip", "flip", "flip", "flip", "flip", "flip"],
    [[2, 3], [], [], [], [], [], []]
  ],
  [
    ["Solution", "flip", "flip", "reset", "flip"],
    [[1, 2], [], [], [], []]
  ],
  [
    ["Solution", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip"],
    [[7, 9], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "reset", "flip", "flip"],
    [[4, 6], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip"],
    [[6, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "reset", "flip", "reset", "flip", "flip", "flip", "flip", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset"],
    [[6, 8], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "flip", "flip", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "flip", "reset", "flip", "flip"],
    [[9, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "reset", "flip", "flip", "flip", "flip", "reset", "reset", "reset", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip"],
    [[9, 7], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "flip"],
    [[5, 7], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "flip"],
    [[4, 2], [], [], [], [], [], [], [], []],
  ],
  [
    ["Solution", "reset", "flip", "flip", "reset", "reset", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "reset", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "flip", "flip", "flip", "reset", "reset", "flip"],
    [[8, 5], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ],
];

for (let test of tests) {
  let solution;

  for (let i = 0; i < test[0].length; i += 1) {
    const cmd = test[0][i];
    const vals = test[1][i];

    if (cmd === 'Solution') solution = new Solution(...vals);
    else logOutList(solution[cmd](...vals));
  }
  // logOutList(validTicTacToe(test));
}

/*
["Solution", "flip", "flip", "flip", "flip"]
[[2, 2], [], [], [], []]
["Solution", "flip", "flip", "flip", "flip", "flip", "flip"]
[[2, 3], [], [], [], [], [], []]
["Solution", "flip", "flip", "reset", "flip"]
[[1, 2], [], [], [], []]
["Solution", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip"]
[[7, 9], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "reset", "flip", "flip"]
[[4, 6], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip"]
[[6, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "reset", "flip", "reset", "flip", "flip", "flip", "flip", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset"]
[[6, 8], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "flip", "flip", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "flip", "reset", "flip", "flip"]
[[9, 3], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "reset", "flip", "reset", "flip", "reset", "reset", "flip", "flip", "flip", "flip", "reset", "reset", "reset", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip"]
[[9, 7], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "reset", "flip", "flip", "flip", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "flip", "flip"]
[[5, 7], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
["Solution", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "flip"]
[[4, 2], [], [], [], [], [], [], [], []]
["Solution", "reset", "flip", "flip", "reset", "reset", "reset", "reset", "reset", "flip", "flip", "flip", "flip", "reset", "flip", "reset", "reset", "reset", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "flip", "flip", "flip", "flip", "flip", "flip", "reset", "flip", "flip", "reset", "flip", "flip", "flip", "reset", "reset", "flip"]
[[8, 5], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
*/