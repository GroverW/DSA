/*
Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up:

Could you come up with the O(n2) solution?
Could you improve it to O(n log(n)) time complexity?
*/

var lengthOfLIS = function (nums) {
  const sequence = [-Infinity];

  for (let num of nums) {
    const position = findFirstLarger(sequence, num);

    if (position < 0) {
      sequence.push(num);
    } else {
      sequence[position] = num;
    }
  }

  return sequence.length - 1;
};

const findFirstLarger = (arr, target) => {
  if (target > arr[arr.length - 1]) return -1;

  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return right;
}

// for (let i = 0; i < 20; i += 1) {
//   const len = Math.floor(Math.random() * 20) + 1;
//   const arr = new Array(len).fill(0).map(() => Math.floor(Math.random() * 10) - 5)

//   logOutList(printRow(arr));
// }

/*

*/

const tests = [
  [10, 9, 2, 5, 3, 7, 101, 18],
  [0, 1, 0, 3, 2, 3],
  [7, 7, 7, 7, 7, 7, 7],
  [-48, 15, 9, -50, -32, -18, 9, -28, 48, -32, -32, 10, 32, 3, 11, 32, -4, 43, 7, 10, 31, -19, -13, 25, -21, 15, -49, -41, 49, -7, 8, -49, -40, -8, 40, 44, 47, 6, -28, -17, 46, -17, 36, 8, -21, 36, 8, 16, -21, -7, -10, -2, 42, 44, -34, -14, -4, -30, -28, -7, -13, 38, 23, 34, 38, -43, 0, 38, -43, 7, 9, 11, 28, 4, 0, 13, -36, 23, 45, -30, 7, 47, 11, -7, -42, 37, -49, -35, 23, -8, 35, -11, -21],
  [-9, 13, -9, -49, -4, -7, -43, 32, -19, -47, -19, 30, -35, 2, 19, -4, 43, -25, -48, -50, -47, 42, -29, -39, -40, 49, -32, -45, -26, 47, 27, 13, 7, -14, -22, -14, -8, -47, -20, -8, -25, 41, 26, 41, 7, -48, 8, -34, -21, -25, 40, 43, -1, 13, -6, 2, -26, 43, -41, 3, -38],
  [-38, 20, -4, -44, -38, 3, -22, 16, -40, -43, 16, -33, 49, -37, -7, 15, 22, 47, -18, 0, 39, -27, -7, -29, 36, -41, 7, 6, 29, -42, 48, 38, 9, -15, -8, 20, -35, -14, 22, 16, -34, 7, 5, -13, -1, 3, 24, 15, -24, 20, 18, 48, 0, -22, -47, -20, 34, 18, -19],
  [48, -23, 19, -48, 34, 29, 48, 27, 9, -20, 35, -24, 16, 16, 38, -22, 1, 44, -44, 0, -39, 47, -6, -25, -43, -7, 47, 4, 24, -29, -13, -36, -30, -23, 21, 8, -13],
  [-24, 43, 17, -20, -23, 16, 48, -31, 20, -36, -32, -44, 19, 28, 26, 10, 14, -18, -5, 15, 38, 8, -25, 28, 25, -12, 41, -40, -8, 19, -29, -18, 49, -7, 22, 29, -39, -44, -17, -22, -7, 4, -49, 2, 28, 19, 32, -40, -18, 32, 24, -20, 10, 25, -20, -15, 0, 17, 12, 44, 2, -22, -19, 42, 37, -42, -47, 44, -41, -12, -40, -44, 8, -1, -26, 16, 14, -7, 40, -26, -14, 40, -16, 24],
  [-50, -29, 26, -17, 7, -18, -8, -29, -39, -39, 17, -21, 5, 10, -30, 47, 44, -27, -3, -33, 10, 43, 26, -20, -1, -15, -23, -26],
  [-18, 45, -29, -21, -46, 29, -2, 20, -18, 4, -1, 0, 8, 5, -3, 34, 37, 10, 23, 22, 0, 26, -5, 32, -6, 24, -19, -20, -44, 43, 8, 19, -29, -40, 47, -38, -46, 19, 1, 25, -48, 45, 25, 27, 22, 0, 39, 43, 35, -47, 8, 4, -43, 25, -44, 9],
  [13, 37, -16, -45, 32, -26, -34, -10, 13, -5, 33, -16, 40, 31, 41, -23, 30, 32, 3, 8, -2, 7, 38, 46, -47, -49, 1, -28, -42, -5, 18, 47, -32, 4, 49, 37, -6, -10, 17, -44, 26, 34, 13, -23, -6, 41, -17, 10, -39, 35, 23, 39, 1, -13, -9, -46, 16, 15, 47, -35, -17, -46, -36, -44, -36, -2, 33, 23, 22, 28, -1, -14, 44, -11, 33, 20, -5, 3, 25, -49, 44, -37, 43, -8, 31, 11, -46, 26],
  [-15, -41, 37, 14, 24, -18, 37, 36, -40, 15, -38, 10, 17, -11, -18, 21, -29, 31, -31, 43, -48, 27, -20, -25, -46, -35, -33, 47, -7, 45, 20, -4, -41, 33, -20, 1, -11, -17, -4, -39, -29, 25, -42, -45, -50, 42, 33, 4, 30, -12, 24, 44, 2, 10, -19, 18, 9, -16, 4, -1, 13, -28, -28, -19, -50, -34, -27, -44, 43, -11, -12, -31, -22, -34, 26, 32, 16, -16, 46, 27, 35, -49, -24],
  [-24, 4, 35, 38, -23, -44, 15, -16, 0, 9, 3, -33, -30, 49, 29, -38, 27, 19, 37, -19, -36, -2, -18, -2, -29, 24, 29, -14, -40, 23, 40, 12, -2, 25, -31, -39, 31, 32, -24, 27, 43, -31, 48, 40, 46, -6, 32, 15, -35, -23, 0, 36, -17, -44, -2, 35, 26, -23, 7, -45, -39, 40, 15, -35, 44, 19],
  [-42, -48, 23, 22, 15, -42, -2, -21, 28, -40, -49, -18, -35, 16, 6, -39, 30, 26, 44, 24, -19, -39, -34, 45, 30, 42, -19, -15, -3, -49, -31, 25, 28, -4, -28, -41, -38, -4, -34, 43, -45, 32, 13, -46, 46, -30, 29, 30, -46, -47, 42, 22, 49, -3, 37, -19, -44, 10, 11, -21, 28, 26, -31, 9, 36, 6, -33, -20, 34, 38, -21, -7, 8, -2, 36, 27, 32, 25, -13, 23, 39, 7, 37, 3, 49, -38, 3, 33, -1, 0, -1, -23, -19, -18, 33],
  [-13, 21, 25, -35, 3, 14, 26, -49, -24, 42, 36, 44, 35, -31, 8, -6, -29, -8, -15],
  [26, 15, 4, 28, -34, 41, -33, -36, 28, -49, 8, 22, 33, 26, -46, 10, 23, -42, 21, 8, -5, -8, -1, -17, 49, -50, -48, 24, -48, 12, -43, -31, 16, 36, 7, 16, 18, 20, -14, 49, -47, -46, -30, 22, 13, 38],
  [36, -38, -27, 7, -10, 17, -50, -41, -27, -27, -32, -8, 43, -24, -29, 32, -7, 40, 41, -17, -12, 13, -19, -1, 47, 30, 48, -24, -21, 38, 31, -44, -10, -7, -7, 14, -9, 16, -31, -44, -25, 6, -19, 19, -9, -8, -17, -9, -23, -39, 29, -7, -34, 40, 27, 42, -16, 3, -6, 37, 48, -1, -11, 28, 7, 4, 10, -13, 3, 34, -11, -9, -38, 23, 9, 3, -38, 44, 28, -21, 31, -38, 24, -26, -9, 31, -25, -42, -37, 5, -41, -22, 10, -43, 32, -42, -3, -30, -12],
  [-40, 14, -3, 29, 6, -14, -49, 37, -31, 43, -11, 30, -16, 23, 0, -14, 18, 36, -27, 14, -6, -50, 43, -11, 3, 7, -11, -12, -19, 46, -17, -5, 11, -22, -6, 40, 33, 5, 22, 28, -50, 38, 2, 5, 19, -18, -13, -28, -30, -36, -34, -4, 28, -33, -16, -32, 39, -19, -44, -38, 21, 21, -2, -21, 10, -46, -46, -45, 8, -14, 1],
  [30, -4, -47, 20, -7, -37, 27, -42, -9, -14, 39, 1, -45, -30, 21, 7, 16, -36, 35, -40, 5, -49, -1, 8, -1, 34, -22, -8, -49, -30, -14, -3, -28, -11, 30, -46, -44, 23, 31, -32, -33, -45, -35, 33, 30, 34, -6, -29, 6, 41, 39, 2, 21, -45, -6, -34, 37, -16, 46, 12, -25, -43, -44, -47, 49, -38, -21],
  [33, 15, -42, -39, -1, 14, -5, -36, 39, 19, -19, 10, -7, -12, 48, -9, -32, -13, 13, -16, -36, 26, 13, -13, 8, 39, -50, 46, -43, 21, 39],
  [30, -1, -36, 27, 29, -5, 40, -11, 1, -14, 34, -24, -10, -37, -1],
  [-32, -30, 0, -2, 21, 33, -37, 25, -30, -49, 30, 37, -40, 36, 29],
  [-43, 40, 39, -5, 35, -34, -23, 28, -44, -34, -16, 41, 42, 25, -1, -40, 0, -16, 28, 29, 23, 15, -6, -33, 32, 38, -8, 24, 40],
  [0, 4, -5, -3, -3, -1, -4],
  [-2, 4, 4, 1, 2, -1, -1, -1, -2, -1, -5, 4, -3, 4, -2, -5, 2, -1, 2, 4],
  [0, 1],
  [-3, 2, 0, -2, -4, -4, -3, -3, 0, -3, 0, 0, -1, -2, 1, -4, -5, 2],
  [-3, -4, -5, -5, -5, -4, 2, 4, -5, -3, 4, -2, -2],
  [-1, 2, -3, 2, 1, 2, 3, 1, 2, 0],
  [1, -5, -5, -4, -1, -5, -1, -2, -4, -1, 0, 0, 4, -5, -3, -3],
  [2, 2],
  [-5, -3, 3, -3, -5, 3],
  [-2, -2, -3, 4, 2, -1, 0, -3, 1, -4, -1],
  [-5, -1, -2],
  [-2, -4, -4, -1, -5, -2, 3, 3, 1, 2, -4],
  [0, -2, 1, -2, -5, -4, 3, -5, 4, 2, -4, -1],
  [-3, 4, -3, 1, 0, -5, 2, 0, 0, 4, 2, 4, -2, -4, -5],
  [4, -1, -3, 4, 4, -2, -1, -1, -2, -2, 4, 1, 3, -5, 4],
  [-3, -2, 0, 2, -2, 3, -2, -3, -3, 3, -4, 4, -5, -2, 1, 1],
  [4, 3],
  [-2, 0, -3, -5, -1, -1, 0, 4, -5, -4, 1, 3, 2],
  [-2, 4],
  [4, -3, 2, 3, 4, -1, 2],
];

for (let test of tests) {
  logOutList(lengthOfLIS(test));
}

/*
[10, 9, 2, 5, 3, 7, 101, 18]
[0, 1, 0, 3, 2, 3]
[7, 7, 7, 7, 7, 7, 7]
[-48, 15, 9, -50, -32, -18, 9, -28, 48, -32, -32, 10, 32, 3, 11, 32, -4, 43, 7, 10, 31, -19, -13, 25, -21, 15, -49, -41, 49, -7, 8, -49, -40, -8, 40, 44, 47, 6, -28, -17, 46, -17, 36, 8, -21, 36, 8, 16, -21, -7, -10, -2, 42, 44, -34, -14, -4, -30, -28, -7, -13, 38, 23, 34, 38, -43, 0, 38, -43, 7, 9, 11, 28, 4, 0, 13, -36, 23, 45, -30, 7, 47, 11, -7, -42, 37, -49, -35, 23, -8, 35, -11, -21]
[-9, 13, -9, -49, -4, -7, -43, 32, -19, -47, -19, 30, -35, 2, 19, -4, 43, -25, -48, -50, -47, 42, -29, -39, -40, 49, -32, -45, -26, 47, 27, 13, 7, -14, -22, -14, -8, -47, -20, -8, -25, 41, 26, 41, 7, -48, 8, -34, -21, -25, 40, 43, -1, 13, -6, 2, -26, 43, -41, 3, -38]
[-38, 20, -4, -44, -38, 3, -22, 16, -40, -43, 16, -33, 49, -37, -7, 15, 22, 47, -18, 0, 39, -27, -7, -29, 36, -41, 7, 6, 29, -42, 48, 38, 9, -15, -8, 20, -35, -14, 22, 16, -34, 7, 5, -13, -1, 3, 24, 15, -24, 20, 18, 48, 0, -22, -47, -20, 34, 18, -19]
[48, -23, 19, -48, 34, 29, 48, 27, 9, -20, 35, -24, 16, 16, 38, -22, 1, 44, -44, 0, -39, 47, -6, -25, -43, -7, 47, 4, 24, -29, -13, -36, -30, -23, 21, 8, -13]
[-24, 43, 17, -20, -23, 16, 48, -31, 20, -36, -32, -44, 19, 28, 26, 10, 14, -18, -5, 15, 38, 8, -25, 28, 25, -12, 41, -40, -8, 19, -29, -18, 49, -7, 22, 29, -39, -44, -17, -22, -7, 4, -49, 2, 28, 19, 32, -40, -18, 32, 24, -20, 10, 25, -20, -15, 0, 17, 12, 44, 2, -22, -19, 42, 37, -42, -47, 44, -41, -12, -40, -44, 8, -1, -26, 16, 14, -7, 40, -26, -14, 40, -16, 24]
[-50, -29, 26, -17, 7, -18, -8, -29, -39, -39, 17, -21, 5, 10, -30, 47, 44, -27, -3, -33, 10, 43, 26, -20, -1, -15, -23, -26]
[-18, 45, -29, -21, -46, 29, -2, 20, -18, 4, -1, 0, 8, 5, -3, 34, 37, 10, 23, 22, 0, 26, -5, 32, -6, 24, -19, -20, -44, 43, 8, 19, -29, -40, 47, -38, -46, 19, 1, 25, -48, 45, 25, 27, 22, 0, 39, 43, 35, -47, 8, 4, -43, 25, -44, 9]
[13, 37, -16, -45, 32, -26, -34, -10, 13, -5, 33, -16, 40, 31, 41, -23, 30, 32, 3, 8, -2, 7, 38, 46, -47, -49, 1, -28, -42, -5, 18, 47, -32, 4, 49, 37, -6, -10, 17, -44, 26, 34, 13, -23, -6, 41, -17, 10, -39, 35, 23, 39, 1, -13, -9, -46, 16, 15, 47, -35, -17, -46, -36, -44, -36, -2, 33, 23, 22, 28, -1, -14, 44, -11, 33, 20, -5, 3, 25, -49, 44, -37, 43, -8, 31, 11, -46, 26]
[-15, -41, 37, 14, 24, -18, 37, 36, -40, 15, -38, 10, 17, -11, -18, 21, -29, 31, -31, 43, -48, 27, -20, -25, -46, -35, -33, 47, -7, 45, 20, -4, -41, 33, -20, 1, -11, -17, -4, -39, -29, 25, -42, -45, -50, 42, 33, 4, 30, -12, 24, 44, 2, 10, -19, 18, 9, -16, 4, -1, 13, -28, -28, -19, -50, -34, -27, -44, 43, -11, -12, -31, -22, -34, 26, 32, 16, -16, 46, 27, 35, -49, -24]
[-24, 4, 35, 38, -23, -44, 15, -16, 0, 9, 3, -33, -30, 49, 29, -38, 27, 19, 37, -19, -36, -2, -18, -2, -29, 24, 29, -14, -40, 23, 40, 12, -2, 25, -31, -39, 31, 32, -24, 27, 43, -31, 48, 40, 46, -6, 32, 15, -35, -23, 0, 36, -17, -44, -2, 35, 26, -23, 7, -45, -39, 40, 15, -35, 44, 19]
[-42, -48, 23, 22, 15, -42, -2, -21, 28, -40, -49, -18, -35, 16, 6, -39, 30, 26, 44, 24, -19, -39, -34, 45, 30, 42, -19, -15, -3, -49, -31, 25, 28, -4, -28, -41, -38, -4, -34, 43, -45, 32, 13, -46, 46, -30, 29, 30, -46, -47, 42, 22, 49, -3, 37, -19, -44, 10, 11, -21, 28, 26, -31, 9, 36, 6, -33, -20, 34, 38, -21, -7, 8, -2, 36, 27, 32, 25, -13, 23, 39, 7, 37, 3, 49, -38, 3, 33, -1, 0, -1, -23, -19, -18, 33]
[-13, 21, 25, -35, 3, 14, 26, -49, -24, 42, 36, 44, 35, -31, 8, -6, -29, -8, -15]
[26, 15, 4, 28, -34, 41, -33, -36, 28, -49, 8, 22, 33, 26, -46, 10, 23, -42, 21, 8, -5, -8, -1, -17, 49, -50, -48, 24, -48, 12, -43, -31, 16, 36, 7, 16, 18, 20, -14, 49, -47, -46, -30, 22, 13, 38]
[36, -38, -27, 7, -10, 17, -50, -41, -27, -27, -32, -8, 43, -24, -29, 32, -7, 40, 41, -17, -12, 13, -19, -1, 47, 30, 48, -24, -21, 38, 31, -44, -10, -7, -7, 14, -9, 16, -31, -44, -25, 6, -19, 19, -9, -8, -17, -9, -23, -39, 29, -7, -34, 40, 27, 42, -16, 3, -6, 37, 48, -1, -11, 28, 7, 4, 10, -13, 3, 34, -11, -9, -38, 23, 9, 3, -38, 44, 28, -21, 31, -38, 24, -26, -9, 31, -25, -42, -37, 5, -41, -22, 10, -43, 32, -42, -3, -30, -12]
[-40, 14, -3, 29, 6, -14, -49, 37, -31, 43, -11, 30, -16, 23, 0, -14, 18, 36, -27, 14, -6, -50, 43, -11, 3, 7, -11, -12, -19, 46, -17, -5, 11, -22, -6, 40, 33, 5, 22, 28, -50, 38, 2, 5, 19, -18, -13, -28, -30, -36, -34, -4, 28, -33, -16, -32, 39, -19, -44, -38, 21, 21, -2, -21, 10, -46, -46, -45, 8, -14, 1]
[30, -4, -47, 20, -7, -37, 27, -42, -9, -14, 39, 1, -45, -30, 21, 7, 16, -36, 35, -40, 5, -49, -1, 8, -1, 34, -22, -8, -49, -30, -14, -3, -28, -11, 30, -46, -44, 23, 31, -32, -33, -45, -35, 33, 30, 34, -6, -29, 6, 41, 39, 2, 21, -45, -6, -34, 37, -16, 46, 12, -25, -43, -44, -47, 49, -38, -21]
[33, 15, -42, -39, -1, 14, -5, -36, 39, 19, -19, 10, -7, -12, 48, -9, -32, -13, 13, -16, -36, 26, 13, -13, 8, 39, -50, 46, -43, 21, 39]
[30, -1, -36, 27, 29, -5, 40, -11, 1, -14, 34, -24, -10, -37, -1]
[-32, -30, 0, -2, 21, 33, -37, 25, -30, -49, 30, 37, -40, 36, 29]
[-43, 40, 39, -5, 35, -34, -23, 28, -44, -34, -16, 41, 42, 25, -1, -40, 0, -16, 28, 29, 23, 15, -6, -33, 32, 38, -8, 24, 40]
[0, 4, -5, -3, -3, -1, -4]
[-2, 4, 4, 1, 2, -1, -1, -1, -2, -1, -5, 4, -3, 4, -2, -5, 2, -1, 2, 4]
[0, 1]
[-3, 2, 0, -2, -4, -4, -3, -3, 0, -3, 0, 0, -1, -2, 1, -4, -5, 2]
[-3, -4, -5, -5, -5, -4, 2, 4, -5, -3, 4, -2, -2]
[-1, 2, -3, 2, 1, 2, 3, 1, 2, 0]
[1, -5, -5, -4, -1, -5, -1, -2, -4, -1, 0, 0, 4, -5, -3, -3]
[2, 2]
[-5, -3, 3, -3, -5, 3]
[-2, -2, -3, 4, 2, -1, 0, -3, 1, -4, -1]
[-5, -1, -2]
[-2, -4, -4, -1, -5, -2, 3, 3, 1, 2, -4]
[0, -2, 1, -2, -5, -4, 3, -5, 4, 2, -4, -1]
[-3, 4, -3, 1, 0, -5, 2, 0, 0, 4, 2, 4, -2, -4, -5]
[4, -1, -3, 4, 4, -2, -1, -1, -2, -2, 4, 1, 3, -5, 4]
[-3, -2, 0, 2, -2, 3, -2, -3, -3, 3, -4, 4, -5, -2, 1, 1]
[4, 3]
[-2, 0, -3, -5, -1, -1, 0, 4, -5, -4, 1, 3, 2]
[-2, 4]
[4, -3, 2, 3, 4, -1, 2]
*/