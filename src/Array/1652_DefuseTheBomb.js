/*
You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array code of length of n and a key k.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.

If k > 0, replace the ith number with the sum of the next k numbers.
If k < 0, replace the ith number with the sum of the previous k numbers.
If k == 0, replace the ith number with 0.
As code is circular, the next element of code[n-1] is code[0], and the previous element of code[0] is code[n-1].

Given the circular array code and an integer key k, return the decrypted code to defuse the bomb!

 

Example 1:

Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers. The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. Notice that the numbers wrap around.
Example 2:

Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, the numbers are replaced by 0. 
Example 3:

Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. Notice that the numbers wrap around again. If k is negative, the sum is of the previous numbers.
 

Constraints:

n == code.length
1 <= n <= 100
1 <= code[i] <= 100
-(n - 1) <= k <= n - 1
*/

var decrypt = function (code, k) {
  const sums = code.reduce((sum, val, i) => {
    sum.push(val + (sum[i - 1] || 0));
    return sum;
  }, []);
  return code.map((_, i, a) => {
    if (!k) return 0;

    if (k > 0) {
      const end = (i + k) % a.length
      return end < i
        ? sums[end] + (sums[a.length - 1] - sums[i])
        : sums[end] - sums[i];
    }
    
    const start = (i + k) < 0 ? a.length + (i + k) : i + k;
    return start > i
      ? (sums[i - 1] || 0) + sums[a.length - 1] - sums[start - 1]
      : (sums[i - 1] || 0) - (sums[start - 1] || 0);
  });
};

/*

*/

// const maxLen = 50;
// for (let i = 0; i < 40; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;

//   const nums = new Array(len).fill(0)
//     .map(() => Math.floor(Math.random() * 100) + 1);

//   const k = Math.floor(Math.random() * 2 * (len - 1)) - (len - 1);

//   logOutList(printRow([nums, k]) + ',');
// }

const tests = [
  [[5, 7, 1, 4], 3],
  [[1, 2, 3, 4], 0],
  [[2, 4, 9, 3], -2],
  [[87, 86, 11, 80, 9, 46, 52, 53, 100, 2, 100, 94, 64, 55, 26, 45, 4, 29, 42, 57, 85, 29, 84, 46, 58, 28, 15, 28, 79, 61, 76, 39, 82, 3, 59, 63, 28, 46, 12, 8, 29, 90, 58, 49, 43, 87], -29],
  [[69, 52, 70, 35, 28, 93, 98, 84, 34, 11, 40, 20], -7],
  [[91, 5, 1, 77, 58, 67, 10, 45, 20, 60, 46, 42, 39, 77, 90, 65, 57, 53, 38], -9],
  [[61, 40, 70, 50, 5, 21, 40, 92, 32, 40, 92, 73, 14, 20, 67, 14, 14], 8],
  [[86, 23, 79, 51, 5, 29, 19, 71, 87, 6, 25, 80, 40, 56, 96, 64, 57, 5, 90, 21, 71, 35, 52, 34, 13, 5, 24, 90, 83, 70, 93, 77, 6, 17, 22, 14, 87], 2],
  [[15, 33, 18, 37, 83, 71, 33, 29, 64, 69, 66, 80, 29, 5, 31, 84, 13, 32, 68, 96, 95, 33, 56, 19, 75, 91, 43, 89, 57, 82, 34, 19, 52, 27, 71, 19, 37, 87, 27], -22],
  [[91, 3, 69, 68, 68, 16, 54], -6],
  [[22, 53, 97, 56, 95, 89, 28, 78, 84, 91, 94, 53, 92], -2],
  [[70, 88, 56, 63, 48, 65, 38, 29], 6],
  [[16, 44, 42, 25, 47, 94, 43, 25, 55, 47, 96, 52], -9],
  [[93, 75, 18, 15, 28, 17, 54, 65, 100, 88, 49, 98, 77, 27, 32, 96], 10],
  [[63, 7, 19, 23, 22, 57, 80, 86, 38, 1, 21, 38, 100, 87, 26, 29, 40], 13],
  [[15, 27, 32, 69, 37, 86, 62, 32, 3, 1, 34, 39, 21, 73, 66, 25, 97, 88, 4, 78, 46, 3, 96, 24, 59, 29, 33, 99, 68, 10, 9], 14],
  [[71, 11, 5, 46, 49, 92, 73, 74, 26, 58, 57, 61, 68, 48, 38, 7, 79, 37, 72, 74, 1, 11, 92, 94, 67, 71, 20, 31, 31, 10, 93, 43, 76, 90, 41, 74, 53, 93, 89, 64, 10, 75, 22, 4], 23],
  [[65, 10, 74, 62, 71, 8, 41, 88, 67, 51, 77, 21, 78, 52, 33, 23, 36], -13],
  [[84, 69, 41, 41, 99, 36, 62, 97, 33, 2, 78, 83, 86, 37, 38, 88, 6, 67, 1, 70, 57, 73, 94, 84, 1, 90, 96, 61, 30, 89, 72, 83], -18],
  [[61, 76, 67, 97, 8, 69, 60, 35, 55, 62, 67, 27, 68, 78, 59, 23, 54, 82, 91, 2, 58, 71, 49, 70, 33, 69, 33, 85, 95, 42, 30, 94, 81, 35, 22], -21],
  [[91, 26, 66, 21, 23, 100, 23, 92, 42, 47, 72, 24, 9, 97, 47, 25, 46, 31, 71, 50, 21, 26, 54, 6, 7, 94, 15, 31, 9, 27, 43, 59, 55, 19, 39, 53, 3, 43, 19, 44, 23, 36, 80, 44, 100, 9, 76], -45],
  [[55, 65, 22, 18, 90, 24], -2],
  [[29, 81, 61, 42, 9, 71, 54, 31, 30, 70, 69, 77, 44, 42, 40, 48, 68, 69, 32, 35, 43, 67, 70, 11, 67, 88, 16, 95, 44, 30, 98, 54, 26, 46, 28, 39, 28, 52, 99, 59, 63], 23],
  [[66, 55, 40, 46, 38, 13, 57, 79, 59, 87, 92, 32, 26, 41, 41, 74, 62, 41, 41, 50, 83, 12, 4, 4, 70, 44, 42, 45, 29, 90, 78, 30, 42, 96, 15, 15, 48, 83, 73, 26], 8],
  [[7, 5, 27, 30, 47, 19, 100, 63, 37, 1, 69, 67, 48, 10, 41, 1, 52, 4, 28, 72], -17],
  [[46, 28, 89, 90, 28, 44, 46, 91, 20, 81, 31, 28, 25, 58, 70, 71, 43, 74, 94, 42, 86, 57, 27, 6, 100, 76, 24, 50, 96, 53, 6, 56], 27],
  [[19, 35, 52, 66, 54, 69, 28, 40, 48, 15, 90, 39, 28, 68, 61, 76, 98, 19, 23, 47, 57, 81, 11, 5, 99, 27, 6, 31, 89, 39, 37, 48, 27], 19],
  [[61], 0],
  [[16, 16, 17, 86, 89, 50, 73, 16, 47, 96, 42, 4, 69, 98, 51, 59, 89, 29, 16, 75, 65, 53, 96, 70, 45, 55, 67, 52, 74, 47, 86, 48, 43, 54, 51, 65, 91, 45, 39, 41, 89, 40, 70, 92, 33], -3],
  [[24, 90, 59, 40, 60, 93, 78, 27, 25, 45, 70, 64, 18, 94, 28, 63, 67, 32], -10],
  [[42, 77, 2, 22, 7, 87, 65, 29, 5, 34, 53, 54, 33, 1, 40, 36, 86, 58, 30, 93, 82, 20], 19],
  [[53, 57, 11, 33, 40, 85, 38, 98, 80, 48, 51, 28, 87, 48, 29, 70, 99, 49, 76, 32, 27, 73, 40, 82, 8, 18, 62, 53, 58, 93, 86, 66, 72, 71, 63, 42, 81, 33, 71], -33],
  [[58, 70, 10, 3, 24, 11, 49, 92, 16, 69, 52, 51, 72, 61, 87, 51, 6, 47, 48, 55, 40, 71, 85, 89, 85, 29, 24, 21, 72, 23, 8, 8, 48, 5, 18, 45, 93, 100, 79, 21, 1, 32, 49, 41, 79, 80, 6], 42],
  [[24, 20, 25, 35, 23, 13, 96, 44, 9, 23, 50, 37, 32, 1, 91, 3, 3, 95, 31, 82, 10, 59, 67, 8, 100, 74, 99, 61, 84, 63, 81, 19, 91, 63, 8, 99, 21, 56, 24, 9, 17], 32],
  [[1, 12, 71, 60, 32, 54, 97, 81, 73, 81, 98, 89, 44, 75, 65, 75, 8, 82, 100, 9], 11],
  [[35, 8, 60, 40, 77, 53, 67, 98, 89, 97], -6],
  [[5, 81, 36, 57, 26, 86, 32, 42, 1, 22, 73, 88, 49, 35, 74, 100, 72, 41, 50, 43, 87, 87, 4, 34, 39, 79, 50, 10, 82, 19, 25, 4, 84, 38, 21, 68, 84, 98, 22, 69, 14, 42, 95, 24, 35, 12, 79, 31], 19],
  [[44, 15, 91, 26, 78, 29, 54, 90, 10, 48, 10, 58, 49, 82, 99, 85, 13, 96, 48, 85, 59, 28, 83, 80, 94], -17],
  [[10, 33, 91, 36, 70, 90, 41, 74, 56, 82, 58, 89, 95, 73, 90, 23, 87, 93, 74, 37, 87, 1, 90, 18, 87, 11, 46, 70, 8, 22, 17, 44, 42], 7],
  [[86, 4, 3, 95, 35, 63, 60, 59, 72, 74, 96, 90, 96, 71, 51, 40, 17, 78], -12],
  [[56, 54, 74, 81, 48, 21], 4],
  [[87, 86, 21, 34, 20, 50, 69, 90, 74, 19, 30, 85, 57, 9, 51, 12, 52, 90, 82, 32, 63, 95, 47, 47, 4, 62, 54, 40, 57, 29, 76], 18],
  [[99, 38], -1],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(printRow(decrypt(...test)));
  console.timeEnd(i);
  i += 1;
}

/*
[5, 7, 1, 4]
3
[1, 2, 3, 4]
0
[2, 4, 9, 3]
-2
[87, 86, 11, 80, 9, 46, 52, 53, 100, 2, 100, 94, 64, 55, 26, 45, 4, 29, 42, 57, 85, 29, 84, 46, 58, 28, 15, 28, 79, 61, 76, 39, 82, 3, 59, 63, 28, 46, 12, 8, 29, 90, 58, 49, 43, 87]
-29
[69, 52, 70, 35, 28, 93, 98, 84, 34, 11, 40, 20]
-7
[91, 5, 1, 77, 58, 67, 10, 45, 20, 60, 46, 42, 39, 77, 90, 65, 57, 53, 38]
-9
[61, 40, 70, 50, 5, 21, 40, 92, 32, 40, 92, 73, 14, 20, 67, 14, 14]
8
[86, 23, 79, 51, 5, 29, 19, 71, 87, 6, 25, 80, 40, 56, 96, 64, 57, 5, 90, 21, 71, 35, 52, 34, 13, 5, 24, 90, 83, 70, 93, 77, 6, 17, 22, 14, 87]
2
[15, 33, 18, 37, 83, 71, 33, 29, 64, 69, 66, 80, 29, 5, 31, 84, 13, 32, 68, 96, 95, 33, 56, 19, 75, 91, 43, 89, 57, 82, 34, 19, 52, 27, 71, 19, 37, 87, 27]
-22
[91, 3, 69, 68, 68, 16, 54]
-6
[22, 53, 97, 56, 95, 89, 28, 78, 84, 91, 94, 53, 92]
-2
[70, 88, 56, 63, 48, 65, 38, 29]
6
[16, 44, 42, 25, 47, 94, 43, 25, 55, 47, 96, 52]
-9
[93, 75, 18, 15, 28, 17, 54, 65, 100, 88, 49, 98, 77, 27, 32, 96]
10
[63, 7, 19, 23, 22, 57, 80, 86, 38, 1, 21, 38, 100, 87, 26, 29, 40]
13
[15, 27, 32, 69, 37, 86, 62, 32, 3, 1, 34, 39, 21, 73, 66, 25, 97, 88, 4, 78, 46, 3, 96, 24, 59, 29, 33, 99, 68, 10, 9]
14
[71, 11, 5, 46, 49, 92, 73, 74, 26, 58, 57, 61, 68, 48, 38, 7, 79, 37, 72, 74, 1, 11, 92, 94, 67, 71, 20, 31, 31, 10, 93, 43, 76, 90, 41, 74, 53, 93, 89, 64, 10, 75, 22, 4]
23
[65, 10, 74, 62, 71, 8, 41, 88, 67, 51, 77, 21, 78, 52, 33, 23, 36]
-13
[84, 69, 41, 41, 99, 36, 62, 97, 33, 2, 78, 83, 86, 37, 38, 88, 6, 67, 1, 70, 57, 73, 94, 84, 1, 90, 96, 61, 30, 89, 72, 83]
-18
[61, 76, 67, 97, 8, 69, 60, 35, 55, 62, 67, 27, 68, 78, 59, 23, 54, 82, 91, 2, 58, 71, 49, 70, 33, 69, 33, 85, 95, 42, 30, 94, 81, 35, 22]
-21
[91, 26, 66, 21, 23, 100, 23, 92, 42, 47, 72, 24, 9, 97, 47, 25, 46, 31, 71, 50, 21, 26, 54, 6, 7, 94, 15, 31, 9, 27, 43, 59, 55, 19, 39, 53, 3, 43, 19, 44, 23, 36, 80, 44, 100, 9, 76]
-45
[55, 65, 22, 18, 90, 24]
-2
[29, 81, 61, 42, 9, 71, 54, 31, 30, 70, 69, 77, 44, 42, 40, 48, 68, 69, 32, 35, 43, 67, 70, 11, 67, 88, 16, 95, 44, 30, 98, 54, 26, 46, 28, 39, 28, 52, 99, 59, 63]
23
[66, 55, 40, 46, 38, 13, 57, 79, 59, 87, 92, 32, 26, 41, 41, 74, 62, 41, 41, 50, 83, 12, 4, 4, 70, 44, 42, 45, 29, 90, 78, 30, 42, 96, 15, 15, 48, 83, 73, 26]
8
[7, 5, 27, 30, 47, 19, 100, 63, 37, 1, 69, 67, 48, 10, 41, 1, 52, 4, 28, 72]
-17
[46, 28, 89, 90, 28, 44, 46, 91, 20, 81, 31, 28, 25, 58, 70, 71, 43, 74, 94, 42, 86, 57, 27, 6, 100, 76, 24, 50, 96, 53, 6, 56]
27
[19, 35, 52, 66, 54, 69, 28, 40, 48, 15, 90, 39, 28, 68, 61, 76, 98, 19, 23, 47, 57, 81, 11, 5, 99, 27, 6, 31, 89, 39, 37, 48, 27]
19
[61]
0
[16, 16, 17, 86, 89, 50, 73, 16, 47, 96, 42, 4, 69, 98, 51, 59, 89, 29, 16, 75, 65, 53, 96, 70, 45, 55, 67, 52, 74, 47, 86, 48, 43, 54, 51, 65, 91, 45, 39, 41, 89, 40, 70, 92, 33]
-3
[24, 90, 59, 40, 60, 93, 78, 27, 25, 45, 70, 64, 18, 94, 28, 63, 67, 32]
-10
[42, 77, 2, 22, 7, 87, 65, 29, 5, 34, 53, 54, 33, 1, 40, 36, 86, 58, 30, 93, 82, 20]
19
[53, 57, 11, 33, 40, 85, 38, 98, 80, 48, 51, 28, 87, 48, 29, 70, 99, 49, 76, 32, 27, 73, 40, 82, 8, 18, 62, 53, 58, 93, 86, 66, 72, 71, 63, 42, 81, 33, 71]
-33
[58, 70, 10, 3, 24, 11, 49, 92, 16, 69, 52, 51, 72, 61, 87, 51, 6, 47, 48, 55, 40, 71, 85, 89, 85, 29, 24, 21, 72, 23, 8, 8, 48, 5, 18, 45, 93, 100, 79, 21, 1, 32, 49, 41, 79, 80, 6]
42
[24, 20, 25, 35, 23, 13, 96, 44, 9, 23, 50, 37, 32, 1, 91, 3, 3, 95, 31, 82, 10, 59, 67, 8, 100, 74, 99, 61, 84, 63, 81, 19, 91, 63, 8, 99, 21, 56, 24, 9, 17]
32
[1, 12, 71, 60, 32, 54, 97, 81, 73, 81, 98, 89, 44, 75, 65, 75, 8, 82, 100, 9]
11
[35, 8, 60, 40, 77, 53, 67, 98, 89, 97]
-6
[5, 81, 36, 57, 26, 86, 32, 42, 1, 22, 73, 88, 49, 35, 74, 100, 72, 41, 50, 43, 87, 87, 4, 34, 39, 79, 50, 10, 82, 19, 25, 4, 84, 38, 21, 68, 84, 98, 22, 69, 14, 42, 95, 24, 35, 12, 79, 31]
19
[44, 15, 91, 26, 78, 29, 54, 90, 10, 48, 10, 58, 49, 82, 99, 85, 13, 96, 48, 85, 59, 28, 83, 80, 94]
-17
[10, 33, 91, 36, 70, 90, 41, 74, 56, 82, 58, 89, 95, 73, 90, 23, 87, 93, 74, 37, 87, 1, 90, 18, 87, 11, 46, 70, 8, 22, 17, 44, 42]
7
[86, 4, 3, 95, 35, 63, 60, 59, 72, 74, 96, 90, 96, 71, 51, 40, 17, 78]
-12
[56, 54, 74, 81, 48, 21]
4
[87, 86, 21, 34, 20, 50, 69, 90, 74, 19, 30, 85, 57, 9, 51, 12, 52, 90, 82, 32, 63, 95, 47, 47, 4, 62, 54, 40, 57, 29, 76]
18
[99, 38]
-1
*/