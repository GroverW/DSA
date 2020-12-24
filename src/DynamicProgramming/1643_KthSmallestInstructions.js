/*
Bob is standing at cell (0, 0), and he wants to reach destination: (row, column). He can only travel right and down. You are going to help Bob by providing instructions for him to reach destination.

The instructions are represented as a string, where each character is either:

'H', meaning move horizontally (go right), or
'V', meaning move vertically (go down).
Multiple instructions will lead Bob to destination. For example, if destination is (2, 3), both "HHHVV" and "HVHVH" are valid instructions.

However, Bob is very picky. Bob has a lucky number k, and he wants the kth lexicographically smallest instructions that will lead him to destination. k is 1-indexed.

Given an integer array destination and an integer k, return the kth lexicographically smallest instructions that will take Bob to destination.

 

Example 1:



Input: destination = [2,3], k = 1
Output: "HHHVV"
Explanation: All the instructions that reach (2, 3) in lexicographic order are as follows:
["HHHVV", "HHVHV", "HHVVH", "HVHHV", "HVHVH", "HVVHH", "VHHHV", "VHHVH", "VHVHH", "VVHHH"].
Example 2:



Input: destination = [2,3], k = 2
Output: "HHVHV"
Example 3:



Input: destination = [2,3], k = 3
Output: "HHVVH"
 

Constraints:

destination.length == 2
1 <= row, column <= 15
1 <= k <= nCr(row + column, row), where nCr(a, b) denotes a choose b​​​​​.
*/

var kthSmallestPath = function (destination, k) {
  const [r, c] = destination;
  const sums = sumPaths(r, c);

  let currSum = sums[0][0];
  let row = 0;
  let col = 0;

  let output = '';
  while (row < r || col < c) {
    const currVal = sums[row][col];
    const nextVal = sums[row][col + 1] || 0;
    const diff = currVal - nextVal;
    if (currSum - diff < k) {
      output += 'V';
      row += 1;
    } else {
      currSum -= diff;
      output += 'H';
      col += 1;
    }
  }

  return output;
};

const sumPaths = (r, c) => {
  const arr = new Array(r + 1).fill(0)
    .map(() => new Array(c + 1).fill(1));

  for (let i = r - 1; i >= 0; i -= 1) {
    for (let j = c - 1; j >= 0; j -= 1) {
      arr[i][j] = arr[i + 1][j] + arr[i][j + 1];
    }
  }

  return arr;
}

/*

*/

const getNumPaths = (r, c) => {
  const arr = new Array(r + 1).fill(0)
    .map(() => new Array(c + 1).fill(1));

  for (let i = 1; i < arr.length; i += 1) {
    for (let j = 1; j < arr[0].length; j += 1) {
      arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
    }
  }

  return arr[r][c];
}

const maxLen = 15;
for (let i = 0; i < 20; i += 1) {
  const r = Math.floor(Math.random() * maxLen) + 1;
  const c = Math.floor(Math.random() * maxLen) + 1;

  const maxNumPaths = getNumPaths(r, c);
  const k = Math.floor(Math.random() * maxNumPaths) + 1;

  logOutList(printRow([[r, c], k]) + ',');
}

const tests = [
  [[2, 3], 1],
  [[2, 3], 2],
  [[2, 3], 3],
  [[5, 12], 4829],
  [[9, 6], 2333],
  [[6, 14], 27503],
  [[3, 1], 2],
  [[7, 10], 7591],
  [[12, 11], 1187908],
  [[2, 10], 60],
  [[9, 13], 265475],
  [[3, 12], 209],
  [[15, 9], 1001845],
  [[15, 3], 603],
  [[15, 14], 923141],
  [[6, 14], 13179],
  [[4, 9], 76],
  [[11, 4], 179],
  [[9, 1], 2],
  [[12, 13], 4119962],
  [[9, 8], 21414],
  [[14, 3], 540],
  [[3, 1], 2],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(kthSmallestPath(...test));
  console.timeEnd(i);
  i += 1;
}

/*
[2, 3]
1
[2, 3]
2
[2, 3]
3
[5, 12]
4829
[9, 6]
2333
[6, 14]
27503
[3, 1]
2
[7, 10]
7591
[12, 11]
1187908
[2, 10]
60
[9, 13]
265475
[3, 12]
209
[15, 9]
1001845
[15, 3]
603
[15, 14]
923141
[6, 14]
13179
[4, 9]
76
[11, 4]
179
[9, 1]
2
[12, 13]
4119962
[9, 8]
21414
[14, 3]
540
[3, 1]
2
[10,13]
852990
[9,8]
4957
[15,15]
78294453
[14,10]
1170482
[6,13]
5781
[1,6]
5
[8,13]
130006
[8,6]
476
[1,11]
4
[2,1]
3
[14,7]
34194
[11,4]
92
[8,1]
3
[6,8]
670
[4,9]
31
[12,4]
1728
[5,5]
252
[10,12]
403597
[4,4]
50
[14,8]
9875

[
  [10, 6,  3,  1].
  [4,  3,  2,  1].
  [1,  1,  1,  1].
]
hhhvv
hhvhv
hhvvh
hvhhv
hvhvh
hvvhh
vhhhv
vhhvh
vhvhh
vvhhh
[
  [20, 10,  4,  1].
  [10,  6,  3,  1].
  [4,   3,  2,  1].
  [1,   1,  1,  1].
]
*/