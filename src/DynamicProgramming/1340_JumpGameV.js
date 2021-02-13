/*
Given an array of integers arr and an integer d. In one step you can jump from index i to index:

i + x where: i + x < arr.length and 0 < x <= d.
i - x where: i - x >= 0 and 0 < x <= d.
In addition, you can only jump from index i to index j if arr[i] > arr[j] and arr[i] > arr[k] for all indices k between i and j (More formally min(i, j) < k < max(i, j)).

You can choose any index of the array and start jumping. Return the maximum number of indices you can visit.

Notice that you can not jump outside of the array at any time.

 

Example 1:


Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
Explanation: You can start at index 10. You can jump 10 --> 8 --> 6 --> 7 as shown.
Note that if you start at index 6 you can only jump to index 7. You cannot jump to index 5 because 13 > 9. You cannot jump to index 4 because index 5 is between index 4 and 6 and 13 > 9.
Similarly You cannot jump from index 3 to index 2 or index 1.
Example 2:

Input: arr = [3,3,3,3,3], d = 3
Output: 1
Explanation: You can start at any index. You always cannot jump to any index.
Example 3:

Input: arr = [7,6,5,4,3,2,1], d = 1
Output: 7
Explanation: Start at index 0. You can visit all the indicies. 
Example 4:

Input: arr = [7,1,7,1,7,1], d = 2
Output: 2
Example 5:

Input: arr = [66], d = 1
Output: 1
 

Constraints:

1 <= arr.length <= 1000
1 <= arr[i] <= 10^5
1 <= d <= arr.length

*/

var maxJumps = function (arr, d) {
  const best = new Array(arr.length).fill(0);

  const findBest = (idx) => {
    if (best[idx]) return best[idx];
    best[idx] = 1;

    const min = Math.max(0, idx - d);
    const max = Math.min(arr.length - 1, idx + d);

    for (let i = idx - 1; i >= min; i -= 1) {
      if (arr[i] >= arr[idx]) break;
      best[idx] = Math.max(best[idx], 1 + findBest(i));
    }

    for (let i = idx + 1; i <= max; i += 1) {
      if (arr[i] >= arr[idx]) break;
      best[idx] = Math.max(best[idx], 1 + findBest(i));
    }

    return best[idx];
  }

  return arr.reduce((max, _, idx) => Math.max(max, findBest(idx)), 0);
};


// const maxLen = 100;
// for (let i = 0; i < 50; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;
//   const d = Math.floor(Math.random() * len) + 1;

//   const nums = new Array(len).fill(0)
//     .map(() => Math.floor(Math.random() * 100));

//   // logOutList('"' + encoded + '",')
//   // logOutList(printRow([nums, k]) + ',')
//   logOutList(printRow([nums, d]) + ',');
//   // logOutList(n);
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [[6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12], 2],
  [[3, 3, 3, 3, 3], 3],
  [[7, 6, 5, 4, 3, 2, 1], 1],
  [[7, 1, 7, 1, 7, 1], 2],
  [[66], 1],
  [[5, 82, 7, 58, 26, 14, 5, 78, 70, 87, 73, 28, 73, 77, 81, 71, 98, 10, 71, 33, 87, 70, 14, 76, 45, 48, 17, 44, 61, 77, 80, 45, 47, 86, 63, 86, 80, 8, 3, 25, 82], 22],
  [[7, 49, 72, 19, 33, 71, 29, 63, 40, 62, 77, 47, 84, 7, 21, 5, 62, 66, 1, 16, 47, 76, 5, 60, 89, 12, 92, 7, 48, 33, 96, 62, 96, 10], 30],
  [[34, 6, 21, 43, 25, 98, 6, 94, 76, 15, 98, 4, 41, 43, 18, 71, 27, 36, 45, 97, 92, 90, 38, 17, 20, 53, 11, 54, 31, 1, 69, 49, 37, 54, 93, 50, 9, 67, 54, 78, 67, 70, 59, 94, 78, 57, 19, 82, 48, 32, 18, 20, 14, 49, 9, 59, 52, 99, 68, 95, 63, 67, 18, 16, 92, 66, 53, 59, 96, 63, 3, 53, 29, 88, 10, 7, 86, 87, 50, 31, 50, 31, 89, 91, 52, 36, 58, 84, 83, 75, 12, 93, 28, 59, 22, 70, 49, 2, 45], 12],
  [[58, 44, 3, 81, 27, 14, 41, 45, 75, 38, 36, 77, 30, 58, 6, 81, 79, 24, 99], 16],
  [[46, 62, 6, 39, 51, 96, 15, 65, 35, 32, 98, 19, 60, 82, 48, 16, 73, 23, 1, 13, 21, 31, 83, 12, 46, 73, 32, 80, 69, 14, 79, 62, 65, 16, 71, 79, 57, 48, 69, 18, 82, 30, 33, 42, 32, 37, 2, 34, 41, 82, 17, 31, 62], 4],
  [[71, 14, 59, 40, 54, 42, 4, 12, 63, 96, 59, 72, 44, 56, 59, 17, 61, 40, 14, 7, 49, 38, 20, 78, 82, 65, 88, 20, 18, 61, 24, 15, 99, 11, 16, 18, 45, 2, 1, 3, 1, 91, 45, 52, 12, 17, 73, 13, 2, 76, 55, 43, 7, 12, 70, 11, 17, 40, 43, 62, 41, 88, 85, 28, 11, 63, 38, 25, 17, 87, 41, 65, 19, 97, 29, 97, 40, 68, 57, 36, 14, 96, 24, 81, 70], 40],
  [[79, 52, 69, 57, 71, 19, 87, 59, 73, 5, 2, 52, 57, 28, 4, 68, 63, 93, 53, 47, 13, 61, 85, 8, 25, 61, 61, 71, 48, 10, 3, 53, 46, 50, 88, 76, 62, 5, 39, 84, 81, 66, 29, 59, 75, 91, 24, 26, 90, 51, 36, 64, 86, 54, 62, 38, 97, 63, 99, 47, 27, 15, 73, 15, 2, 34, 30, 14, 31, 66, 54, 39, 38, 9, 27, 77, 1, 40, 33], 51],
  [[92, 99, 38, 36, 82], 2],
  [[76, 40, 12, 16, 81, 43, 87, 65, 24, 62, 15, 94, 6, 24, 19, 90, 74, 6, 88, 91, 42, 77, 65, 4, 6, 76, 32, 92, 81, 68, 27, 1, 38, 66, 28, 77, 70, 31, 19, 6, 86, 57, 64, 35, 52, 73, 99, 22, 7, 86, 38, 46, 95, 59, 81, 99, 8, 77, 94, 70, 5, 37, 63, 76, 27, 89, 87, 71, 43, 42, 49, 88, 34, 29, 55, 37, 69, 78, 24, 47], 58],
  [[46, 76, 8, 57, 50, 37, 46, 25, 57, 75, 32, 19, 70, 22, 56, 55], 9],
  [[28, 76, 87, 33, 10, 75, 40, 38, 54, 44, 70, 88, 80, 98, 98, 35, 59, 98, 93, 71, 52, 1, 87, 1, 40, 29, 29, 33, 62, 43, 64, 82, 67, 49, 68, 88, 30, 48, 24, 35, 58, 59, 90, 57, 6, 75, 23, 54, 79, 28, 36, 56, 66, 39, 84, 31], 40],
  [[25, 87, 95, 31, 41, 3, 67, 75, 94, 11, 14, 27, 60, 51, 11, 24, 68, 35, 29, 65, 53, 96, 28, 39, 54, 49, 49, 18, 41, 55, 56, 60, 3, 39, 31, 36, 99, 14, 42, 95, 21, 51, 69, 96, 71, 81, 90, 54, 87, 15, 68, 87, 2, 97, 71, 93, 3, 40, 96, 36, 60, 26, 53, 54, 52, 55, 41, 24, 34, 55, 98, 34, 20, 85, 45, 23, 3, 57, 65, 15, 39, 35, 44, 98, 65, 12, 83, 50, 50, 34, 97, 57, 9, 1], 65],
  [[97, 75, 97, 67, 97, 57, 99, 76, 7, 56, 39, 76, 33, 58, 22, 45, 7, 1, 56, 42, 6, 81, 77, 69, 56, 72, 64, 60, 85, 92, 68, 25, 40, 52, 74, 83, 40, 50, 31, 86, 51, 4, 6, 98, 99, 38, 31, 68, 10, 82, 7, 23, 82, 48, 62, 91, 9, 60, 74, 89, 55, 31, 36, 34, 58, 83, 6, 69, 81, 53, 14, 84, 82, 67, 9, 84, 52, 96, 47, 93, 72, 32, 62], 23],
  [[57, 41, 13, 72, 27, 96, 1, 59, 77, 67, 11, 31, 18, 43, 16, 76, 40, 78, 42, 92, 53, 86, 60, 18, 24, 13, 18, 1, 94, 83, 35, 79, 12, 86, 69, 55, 23, 1, 16, 22, 64, 5, 43, 94, 99, 87, 76, 48, 36, 66, 81, 16, 15, 37, 17, 63, 10, 30, 79, 76, 64, 26, 60, 78, 86, 40], 27],
  [[1, 96, 15, 87, 85], 4],
  [[40, 33, 9, 62, 12, 75, 29, 94, 59, 47, 12, 21, 45, 51, 4, 52, 22, 62, 46, 11, 7, 88, 30, 44, 34, 25, 16, 54, 43, 92, 40, 22, 93, 64, 23, 69, 52, 67, 4, 55, 34, 23, 87, 9, 30, 51, 80, 85, 3, 78, 58, 46, 45, 31, 1, 13, 50, 71, 64, 43, 75, 3, 25, 86, 43, 44, 51, 42, 28, 77, 29, 92, 31, 11, 91, 60, 99, 37, 64, 64, 6, 52, 13, 91, 56, 23, 64, 91, 34, 96, 90], 74],
  [[78, 67, 37, 51, 42, 37, 99, 81, 77, 41, 78, 70, 29, 99, 85, 10, 84, 72, 38, 22, 72, 82, 55, 77, 15, 99, 63, 58, 49, 57, 87, 30, 41, 93, 35, 44, 63, 51, 45, 15, 61, 15, 98, 98, 32, 24, 13, 64, 4, 43, 45, 4, 84, 14, 79, 19, 80, 5, 96, 19, 36, 93, 79, 82, 21, 71, 73, 67, 48, 70, 79, 32, 64, 4, 77], 64],
  [[96, 24, 31, 81, 47, 95, 15, 15, 6, 29, 54, 41, 82, 31, 91, 48, 36, 33, 50, 34, 34], 19],
  [[58, 94, 33, 45, 53, 54, 2, 48, 97, 58, 19, 46, 61, 11, 50, 4, 76, 18, 69, 96, 31, 49, 94, 6, 79, 65, 73, 11, 27, 52, 5, 13, 67, 27, 74, 76, 7, 80, 78, 6, 87, 70, 78, 58, 33, 53, 42, 82, 10, 35, 15, 24, 12, 4, 65, 8, 2, 88, 95, 60, 10, 36, 94, 48, 10, 98, 66, 19, 85, 58, 93, 58, 89, 16, 81, 78, 68, 25, 55, 86, 2], 29],
  [[43, 65, 24, 1, 24, 1, 54, 1, 55, 33, 75, 84, 94, 49, 67, 8, 13, 19, 9, 43, 15, 32, 77], 6],
  [[70, 74, 89, 5, 21, 23, 80, 10, 98, 11, 82, 7, 61, 53, 34, 29, 80, 85, 21, 94, 68, 78, 23, 83, 43, 19, 9, 42, 5, 74, 90, 45, 3, 84, 17, 34, 6, 52, 26, 62, 76, 20, 59, 95, 75, 40], 37],
  [[24, 63, 49, 67, 78, 56, 84, 86, 30, 38, 77, 16, 70, 41, 79, 97, 27, 17, 19, 10, 43, 87, 71, 71, 54, 1, 45, 53, 28, 91, 38, 39, 20, 42, 65, 10, 18, 66, 12, 50, 33, 48, 10, 55, 89, 7, 62, 1, 91, 86, 92, 41, 65, 5, 36, 47, 4, 47, 32, 84, 23, 57, 6, 84, 22, 28, 24, 74, 38, 14, 7, 63, 81, 70, 42, 95, 51, 17, 30, 55, 5, 29, 67, 57, 8, 89, 54, 12, 43, 41, 64, 3, 5, 75, 93, 8, 61], 2],
  [[64, 60, 5, 28, 82, 83, 23, 26, 76, 58, 78, 73, 28, 27, 49, 61, 88, 40, 42, 3, 37, 3, 21, 88, 90, 54, 84, 21, 58, 55, 8], 4],
  [[71, 45, 68, 76, 10, 40, 73, 25, 68, 66, 46, 96, 73, 11, 72, 74, 87, 71, 50, 67, 50, 64, 7, 57, 46, 52, 11, 52, 81, 96, 1, 19], 8],
  [[60, 83, 81, 14, 48, 57, 57, 84, 46, 13, 40, 15, 78, 16, 27, 81, 74, 9, 15, 26, 41, 85, 84, 15, 40, 32, 55, 53, 45, 56, 60, 64, 77, 70, 29, 66, 99, 93, 53, 97, 14, 76, 80, 39, 7, 59], 9],
  [[95, 97, 6, 76, 13, 48, 43, 6, 66, 93, 55, 29], 9],
  [[71, 79, 93, 80, 44], 4],
  [[73, 76, 82, 69, 70, 98, 15, 53, 54, 4, 32, 3, 97, 53, 1, 17, 3, 36, 54, 26, 66, 5, 24, 78, 42, 27, 73, 81, 97, 40, 42, 49, 25, 25, 49, 2, 50, 32, 58, 91, 35, 79, 6, 9, 66, 38, 41, 47, 30, 44, 5, 14, 71, 94, 48, 99, 99, 64, 33], 23],
  [[77, 63, 31, 12], 3],
  [[12, 60, 79, 29, 6, 79, 67, 69, 41, 86, 61, 80, 27, 1, 47, 49, 42, 43, 65, 31, 18, 71, 84, 54, 16, 59, 57, 44, 25, 86, 95, 78, 43, 52, 60, 74, 99, 71, 93, 92, 62, 1, 85, 72, 2, 95, 36, 23, 6, 30, 4, 26, 63, 99, 77, 83, 27, 48, 28, 46, 73, 71, 75, 25, 24, 74, 20, 77, 1, 46, 77, 95, 90, 85, 40], 67],
  [[83, 57, 53, 8, 17, 25, 80, 66, 39, 94, 5, 20, 1, 99, 11, 36, 11, 20, 43, 26, 64, 92, 22, 89, 52, 39, 25, 5, 6, 70, 59, 44, 19, 37, 74, 45, 86, 88, 30, 47, 37, 1, 23, 10, 57, 3, 1, 2, 48, 48, 34, 97, 55, 56, 75, 63, 73, 42, 23, 43, 78, 99, 78, 62, 78, 58, 74, 90, 26, 11, 39, 1, 86], 5],
  [[39, 2, 98, 56, 49, 46, 67, 4, 16, 23, 27, 17, 55, 78, 96, 87, 37, 84, 87, 61], 8],
  [[89, 99, 90, 36, 13, 90, 60, 34, 5, 68, 78, 87, 53, 9, 17, 7, 52, 17], 17],
  [[41, 79, 67, 64, 92, 85, 95, 67, 71, 22, 21, 35, 26, 17, 38, 91, 51, 35, 56, 33, 78, 88, 10, 95, 25, 45, 58, 44, 92, 97, 22, 32, 1, 30, 74, 45, 64, 25, 1, 2, 90, 66, 82, 28, 58, 91, 89, 61, 90, 41, 62, 95, 25, 79, 50, 79, 55, 8, 50, 86, 31, 1, 1, 61, 7, 50, 17, 35, 64, 13, 61, 55, 21, 1, 25, 85], 72],
  [[12, 59, 74, 70, 63, 39, 14, 24, 64, 86, 96, 65, 29, 98, 79, 33, 19, 3, 47, 94, 79, 45, 4, 86, 18, 83, 8, 14, 6, 71, 93, 11, 72, 75, 74, 2, 88, 91, 81, 21, 42, 6, 18, 37, 27, 79, 21], 40],
  [[78, 93, 13, 30, 99, 58, 91, 90, 97, 99, 99, 79, 10, 59, 71, 20], 5],
  [[58, 16, 23, 98, 83, 88, 15, 41, 88, 81, 45, 89, 18, 65, 99, 72, 53, 73, 66, 70, 2], 15],
  [[57, 20, 91, 57, 51, 35, 45, 7, 44, 90, 55, 1, 16], 6],
  [[13, 37, 40, 73, 1, 8, 3, 58, 58, 96, 29, 6, 99, 4, 31, 63, 33, 43, 70, 13, 14, 36, 2, 59, 77, 53, 15, 51, 60, 81, 45, 31, 81, 41, 90, 82, 99, 17, 70, 19, 74, 44, 45, 83, 78, 97, 74, 39, 1, 13, 16, 41, 19, 39, 93, 4, 8, 3, 99, 29, 88, 6, 76, 21, 74, 98, 1, 67, 71, 13, 69, 63, 30, 33, 36, 70, 29, 52], 48],
  [[44, 52, 54, 52, 3, 73, 67, 63, 83, 36, 37, 11, 93, 83, 78, 40], 16],
  [[19, 57, 90, 28, 86, 70, 2, 80, 79, 24, 29, 59, 56, 51, 47, 70, 56, 13, 90, 2, 79, 63, 12, 52, 56, 57, 40, 49, 2, 18, 66, 17, 49, 48, 91, 2, 3, 35, 31, 36, 25, 69, 57, 34, 29, 88, 84, 64, 88, 29, 44, 14, 75, 75, 82, 39, 72, 17, 56, 89, 76, 4, 19, 69, 83, 82, 94, 41, 6, 3, 80, 97, 83, 36, 14, 82, 1, 35], 74],
  [[91, 67, 86, 41, 74, 29, 64, 47, 79, 12, 78, 41, 18, 13, 54, 99, 1, 31, 62, 72, 31, 45, 14, 35, 34, 90, 91, 78, 59, 33, 33, 2, 90, 10, 69, 1, 90, 91, 15, 90, 91, 10, 97, 31, 35, 40, 5, 38, 80], 4],
  [[4, 15, 90, 7, 96, 44, 34, 43, 45, 99, 16, 68, 67, 97, 66, 41, 3, 6, 71, 68, 71, 54, 76, 53, 73, 61, 65, 29, 5, 30, 76, 30, 26, 11, 42, 68, 43, 66, 76, 30, 56, 33, 38, 55, 1, 56, 3, 53, 6, 85, 58, 22, 47, 54, 56, 31, 11, 22, 89, 72, 58, 76, 61, 47, 70, 89, 66, 5, 17, 5, 82], 50],
  [[70, 46, 73, 85, 39, 83, 59, 50, 69, 63, 99, 49, 73, 59, 28, 10, 5, 39, 42, 92], 18],
  [[6, 97, 72, 23, 95, 37, 91, 55, 34, 95, 29, 25, 89, 48, 48, 34, 89, 76, 86, 61, 54, 98, 43, 17, 61, 92, 28, 93, 71, 92, 58, 42, 38, 15, 50, 36, 74, 51, 5, 94, 25, 67, 62, 36, 75, 83, 82, 11, 91, 12, 73, 19, 87, 84, 94, 52, 16, 49, 1, 38, 10, 66, 62, 15, 64, 2, 63, 58, 75, 93, 26, 15, 54, 1, 53], 29],
  [[39, 60, 21, 53, 39, 38, 3, 50, 7, 33, 75, 36, 61, 86, 10, 72, 87, 58, 55, 86, 22, 96, 14, 34, 7, 43, 61, 89, 59, 20, 64, 23, 98, 71, 76, 27, 77, 79, 27, 36, 73, 73, 10, 5, 46, 38, 95, 62, 36, 20, 73, 20, 22, 92, 51, 35, 73, 60, 63, 9, 15, 81, 35, 86, 57, 28, 39, 51, 80, 95, 45, 52, 92, 79, 65, 21, 54, 43, 73, 14, 60, 55, 62, 8, 31, 55, 6, 3, 93], 45],
  [[53, 81, 50, 51, 58, 40, 62, 80, 75, 88, 88, 41, 88, 79, 33, 6, 36, 95, 51, 75, 7, 88, 32, 4, 2, 19, 92, 24, 85, 7, 4, 82, 69, 82, 45, 34, 58, 10, 31, 70, 44, 3, 65, 97, 38, 10, 89, 31, 38, 69, 99, 63, 44, 69, 48, 85, 12, 39, 28, 41, 47, 21, 70, 30, 35], 26],
  [[29, 29, 97, 2, 43, 11, 30, 82, 36, 6, 24, 47, 26, 53, 27, 17, 60, 68, 52, 95, 74, 79, 77, 98, 37, 70, 83, 59, 32, 75, 88, 34, 24, 36, 83, 23, 87, 12, 15, 7, 86, 45, 24, 61, 86, 62, 73, 91, 59, 54, 20, 1, 89, 64, 71, 63, 46, 72, 60, 94, 30, 47, 73, 51, 7, 59, 8, 31, 36, 69, 16, 40, 59, 69, 57, 44, 26, 42, 45, 76, 8, 26, 12, 74, 42, 17, 97, 52, 52, 69, 98, 51, 36, 58], 60],
  [[95, 77, 42, 42, 94, 5, 63, 40, 69, 94, 79, 14, 37, 24, 96, 9, 5, 36, 8, 66, 70, 22, 20, 96, 47, 3, 5, 89, 46, 42, 47, 33, 65, 9, 40, 92, 7, 87, 76, 68, 46, 59, 41, 43], 18],
  [[71, 91, 24, 47, 47, 74, 30, 5, 63, 82, 86, 34, 30, 65, 27, 76, 87, 34, 48, 6, 96, 11, 23, 73, 22, 4, 22, 82, 90, 85, 93, 32, 1, 26, 15, 37, 32, 34, 96, 53, 82, 93, 18, 95, 46, 92, 55, 61, 17, 51, 55, 1, 21, 32, 23, 13, 21, 29, 10, 4, 52, 16, 29, 26, 35, 39, 70, 88, 6, 99, 66, 54, 25, 37, 84, 5, 50, 92, 35, 66, 79, 32, 35, 73, 2, 1, 58, 94, 95, 67, 1, 56, 89, 31, 81, 45], 27],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(maxJumps(...test));
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
[6, 4, 14, 6, 8, 13, 9, 7, 10, 6, 12]
2
[3, 3, 3, 3, 3]
3
[7, 6, 5, 4, 3, 2, 1]
1
[7, 1, 7, 1, 7, 1]
2
[66]
1
[5, 82, 7, 58, 26, 14, 5, 78, 70, 87, 73, 28, 73, 77, 81, 71, 98, 10, 71, 33, 87, 70, 14, 76, 45, 48, 17, 44, 61, 77, 80, 45, 47, 86, 63, 86, 80, 8, 3, 25, 82]
22
[7, 49, 72, 19, 33, 71, 29, 63, 40, 62, 77, 47, 84, 7, 21, 5, 62, 66, 1, 16, 47, 76, 5, 60, 89, 12, 92, 7, 48, 33, 96, 62, 96, 10]
30
[34, 6, 21, 43, 25, 98, 6, 94, 76, 15, 98, 4, 41, 43, 18, 71, 27, 36, 45, 97, 92, 90, 38, 17, 20, 53, 11, 54, 31, 1, 69, 49, 37, 54, 93, 50, 9, 67, 54, 78, 67, 70, 59, 94, 78, 57, 19, 82, 48, 32, 18, 20, 14, 49, 9, 59, 52, 99, 68, 95, 63, 67, 18, 16, 92, 66, 53, 59, 96, 63, 3, 53, 29, 88, 10, 7, 86, 87, 50, 31, 50, 31, 89, 91, 52, 36, 58, 84, 83, 75, 12, 93, 28, 59, 22, 70, 49, 2, 45]
12
[58, 44, 3, 81, 27, 14, 41, 45, 75, 38, 36, 77, 30, 58, 6, 81, 79, 24, 99]
16
[46, 62, 6, 39, 51, 96, 15, 65, 35, 32, 98, 19, 60, 82, 48, 16, 73, 23, 1, 13, 21, 31, 83, 12, 46, 73, 32, 80, 69, 14, 79, 62, 65, 16, 71, 79, 57, 48, 69, 18, 82, 30, 33, 42, 32, 37, 2, 34, 41, 82, 17, 31, 62]
4
[71, 14, 59, 40, 54, 42, 4, 12, 63, 96, 59, 72, 44, 56, 59, 17, 61, 40, 14, 7, 49, 38, 20, 78, 82, 65, 88, 20, 18, 61, 24, 15, 99, 11, 16, 18, 45, 2, 1, 3, 1, 91, 45, 52, 12, 17, 73, 13, 2, 76, 55, 43, 7, 12, 70, 11, 17, 40, 43, 62, 41, 88, 85, 28, 11, 63, 38, 25, 17, 87, 41, 65, 19, 97, 29, 97, 40, 68, 57, 36, 14, 96, 24, 81, 70]
40
[79, 52, 69, 57, 71, 19, 87, 59, 73, 5, 2, 52, 57, 28, 4, 68, 63, 93, 53, 47, 13, 61, 85, 8, 25, 61, 61, 71, 48, 10, 3, 53, 46, 50, 88, 76, 62, 5, 39, 84, 81, 66, 29, 59, 75, 91, 24, 26, 90, 51, 36, 64, 86, 54, 62, 38, 97, 63, 99, 47, 27, 15, 73, 15, 2, 34, 30, 14, 31, 66, 54, 39, 38, 9, 27, 77, 1, 40, 33]
51
[92, 99, 38, 36, 82]
2
[76, 40, 12, 16, 81, 43, 87, 65, 24, 62, 15, 94, 6, 24, 19, 90, 74, 6, 88, 91, 42, 77, 65, 4, 6, 76, 32, 92, 81, 68, 27, 1, 38, 66, 28, 77, 70, 31, 19, 6, 86, 57, 64, 35, 52, 73, 99, 22, 7, 86, 38, 46, 95, 59, 81, 99, 8, 77, 94, 70, 5, 37, 63, 76, 27, 89, 87, 71, 43, 42, 49, 88, 34, 29, 55, 37, 69, 78, 24, 47]
58
[46, 76, 8, 57, 50, 37, 46, 25, 57, 75, 32, 19, 70, 22, 56, 55]
9
[28, 76, 87, 33, 10, 75, 40, 38, 54, 44, 70, 88, 80, 98, 98, 35, 59, 98, 93, 71, 52, 1, 87, 1, 40, 29, 29, 33, 62, 43, 64, 82, 67, 49, 68, 88, 30, 48, 24, 35, 58, 59, 90, 57, 6, 75, 23, 54, 79, 28, 36, 56, 66, 39, 84, 31]
40
[25, 87, 95, 31, 41, 3, 67, 75, 94, 11, 14, 27, 60, 51, 11, 24, 68, 35, 29, 65, 53, 96, 28, 39, 54, 49, 49, 18, 41, 55, 56, 60, 3, 39, 31, 36, 99, 14, 42, 95, 21, 51, 69, 96, 71, 81, 90, 54, 87, 15, 68, 87, 2, 97, 71, 93, 3, 40, 96, 36, 60, 26, 53, 54, 52, 55, 41, 24, 34, 55, 98, 34, 20, 85, 45, 23, 3, 57, 65, 15, 39, 35, 44, 98, 65, 12, 83, 50, 50, 34, 97, 57, 9, 1]
65
[97, 75, 97, 67, 97, 57, 99, 76, 7, 56, 39, 76, 33, 58, 22, 45, 7, 1, 56, 42, 6, 81, 77, 69, 56, 72, 64, 60, 85, 92, 68, 25, 40, 52, 74, 83, 40, 50, 31, 86, 51, 4, 6, 98, 99, 38, 31, 68, 10, 82, 7, 23, 82, 48, 62, 91, 9, 60, 74, 89, 55, 31, 36, 34, 58, 83, 6, 69, 81, 53, 14, 84, 82, 67, 9, 84, 52, 96, 47, 93, 72, 32, 62]
23
[57, 41, 13, 72, 27, 96, 1, 59, 77, 67, 11, 31, 18, 43, 16, 76, 40, 78, 42, 92, 53, 86, 60, 18, 24, 13, 18, 1, 94, 83, 35, 79, 12, 86, 69, 55, 23, 1, 16, 22, 64, 5, 43, 94, 99, 87, 76, 48, 36, 66, 81, 16, 15, 37, 17, 63, 10, 30, 79, 76, 64, 26, 60, 78, 86, 40]
27
[1, 96, 15, 87, 85]
4
[40, 33, 9, 62, 12, 75, 29, 94, 59, 47, 12, 21, 45, 51, 4, 52, 22, 62, 46, 11, 7, 88, 30, 44, 34, 25, 16, 54, 43, 92, 40, 22, 93, 64, 23, 69, 52, 67, 4, 55, 34, 23, 87, 9, 30, 51, 80, 85, 3, 78, 58, 46, 45, 31, 1, 13, 50, 71, 64, 43, 75, 3, 25, 86, 43, 44, 51, 42, 28, 77, 29, 92, 31, 11, 91, 60, 99, 37, 64, 64, 6, 52, 13, 91, 56, 23, 64, 91, 34, 96, 90]
74
[78, 67, 37, 51, 42, 37, 99, 81, 77, 41, 78, 70, 29, 99, 85, 10, 84, 72, 38, 22, 72, 82, 55, 77, 15, 99, 63, 58, 49, 57, 87, 30, 41, 93, 35, 44, 63, 51, 45, 15, 61, 15, 98, 98, 32, 24, 13, 64, 4, 43, 45, 4, 84, 14, 79, 19, 80, 5, 96, 19, 36, 93, 79, 82, 21, 71, 73, 67, 48, 70, 79, 32, 64, 4, 77]
64
[96, 24, 31, 81, 47, 95, 15, 15, 6, 29, 54, 41, 82, 31, 91, 48, 36, 33, 50, 34, 34]
19
[58, 94, 33, 45, 53, 54, 2, 48, 97, 58, 19, 46, 61, 11, 50, 4, 76, 18, 69, 96, 31, 49, 94, 6, 79, 65, 73, 11, 27, 52, 5, 13, 67, 27, 74, 76, 7, 80, 78, 6, 87, 70, 78, 58, 33, 53, 42, 82, 10, 35, 15, 24, 12, 4, 65, 8, 2, 88, 95, 60, 10, 36, 94, 48, 10, 98, 66, 19, 85, 58, 93, 58, 89, 16, 81, 78, 68, 25, 55, 86, 2]
29
[43, 65, 24, 1, 24, 1, 54, 1, 55, 33, 75, 84, 94, 49, 67, 8, 13, 19, 9, 43, 15, 32, 77]
6
[70, 74, 89, 5, 21, 23, 80, 10, 98, 11, 82, 7, 61, 53, 34, 29, 80, 85, 21, 94, 68, 78, 23, 83, 43, 19, 9, 42, 5, 74, 90, 45, 3, 84, 17, 34, 6, 52, 26, 62, 76, 20, 59, 95, 75, 40]
37
[24, 63, 49, 67, 78, 56, 84, 86, 30, 38, 77, 16, 70, 41, 79, 97, 27, 17, 19, 10, 43, 87, 71, 71, 54, 1, 45, 53, 28, 91, 38, 39, 20, 42, 65, 10, 18, 66, 12, 50, 33, 48, 10, 55, 89, 7, 62, 1, 91, 86, 92, 41, 65, 5, 36, 47, 4, 47, 32, 84, 23, 57, 6, 84, 22, 28, 24, 74, 38, 14, 7, 63, 81, 70, 42, 95, 51, 17, 30, 55, 5, 29, 67, 57, 8, 89, 54, 12, 43, 41, 64, 3, 5, 75, 93, 8, 61]
2
[64, 60, 5, 28, 82, 83, 23, 26, 76, 58, 78, 73, 28, 27, 49, 61, 88, 40, 42, 3, 37, 3, 21, 88, 90, 54, 84, 21, 58, 55, 8]
4
[71, 45, 68, 76, 10, 40, 73, 25, 68, 66, 46, 96, 73, 11, 72, 74, 87, 71, 50, 67, 50, 64, 7, 57, 46, 52, 11, 52, 81, 96, 1, 19]
8
[60, 83, 81, 14, 48, 57, 57, 84, 46, 13, 40, 15, 78, 16, 27, 81, 74, 9, 15, 26, 41, 85, 84, 15, 40, 32, 55, 53, 45, 56, 60, 64, 77, 70, 29, 66, 99, 93, 53, 97, 14, 76, 80, 39, 7, 59]
9
[95, 97, 6, 76, 13, 48, 43, 6, 66, 93, 55, 29]
9
[71, 79, 93, 80, 44]
4
[73, 76, 82, 69, 70, 98, 15, 53, 54, 4, 32, 3, 97, 53, 1, 17, 3, 36, 54, 26, 66, 5, 24, 78, 42, 27, 73, 81, 97, 40, 42, 49, 25, 25, 49, 2, 50, 32, 58, 91, 35, 79, 6, 9, 66, 38, 41, 47, 30, 44, 5, 14, 71, 94, 48, 99, 99, 64, 33]
23
[77, 63, 31, 12]
3
[12, 60, 79, 29, 6, 79, 67, 69, 41, 86, 61, 80, 27, 1, 47, 49, 42, 43, 65, 31, 18, 71, 84, 54, 16, 59, 57, 44, 25, 86, 95, 78, 43, 52, 60, 74, 99, 71, 93, 92, 62, 1, 85, 72, 2, 95, 36, 23, 6, 30, 4, 26, 63, 99, 77, 83, 27, 48, 28, 46, 73, 71, 75, 25, 24, 74, 20, 77, 1, 46, 77, 95, 90, 85, 40]
67
[83, 57, 53, 8, 17, 25, 80, 66, 39, 94, 5, 20, 1, 99, 11, 36, 11, 20, 43, 26, 64, 92, 22, 89, 52, 39, 25, 5, 6, 70, 59, 44, 19, 37, 74, 45, 86, 88, 30, 47, 37, 1, 23, 10, 57, 3, 1, 2, 48, 48, 34, 97, 55, 56, 75, 63, 73, 42, 23, 43, 78, 99, 78, 62, 78, 58, 74, 90, 26, 11, 39, 1, 86]
5
[39, 2, 98, 56, 49, 46, 67, 4, 16, 23, 27, 17, 55, 78, 96, 87, 37, 84, 87, 61]
8
[89, 99, 90, 36, 13, 90, 60, 34, 5, 68, 78, 87, 53, 9, 17, 7, 52, 17]
17
[41, 79, 67, 64, 92, 85, 95, 67, 71, 22, 21, 35, 26, 17, 38, 91, 51, 35, 56, 33, 78, 88, 10, 95, 25, 45, 58, 44, 92, 97, 22, 32, 1, 30, 74, 45, 64, 25, 1, 2, 90, 66, 82, 28, 58, 91, 89, 61, 90, 41, 62, 95, 25, 79, 50, 79, 55, 8, 50, 86, 31, 1, 1, 61, 7, 50, 17, 35, 64, 13, 61, 55, 21, 1, 25, 85]
72
[12, 59, 74, 70, 63, 39, 14, 24, 64, 86, 96, 65, 29, 98, 79, 33, 19, 3, 47, 94, 79, 45, 4, 86, 18, 83, 8, 14, 6, 71, 93, 11, 72, 75, 74, 2, 88, 91, 81, 21, 42, 6, 18, 37, 27, 79, 21]
40
[78, 93, 13, 30, 99, 58, 91, 90, 97, 99, 99, 79, 10, 59, 71, 20]
5
[58, 16, 23, 98, 83, 88, 15, 41, 88, 81, 45, 89, 18, 65, 99, 72, 53, 73, 66, 70, 2]
15
[57, 20, 91, 57, 51, 35, 45, 7, 44, 90, 55, 1, 16]
6
[13, 37, 40, 73, 1, 8, 3, 58, 58, 96, 29, 6, 99, 4, 31, 63, 33, 43, 70, 13, 14, 36, 2, 59, 77, 53, 15, 51, 60, 81, 45, 31, 81, 41, 90, 82, 99, 17, 70, 19, 74, 44, 45, 83, 78, 97, 74, 39, 1, 13, 16, 41, 19, 39, 93, 4, 8, 3, 99, 29, 88, 6, 76, 21, 74, 98, 1, 67, 71, 13, 69, 63, 30, 33, 36, 70, 29, 52]
48
[44, 52, 54, 52, 3, 73, 67, 63, 83, 36, 37, 11, 93, 83, 78, 40]
16
[19, 57, 90, 28, 86, 70, 2, 80, 79, 24, 29, 59, 56, 51, 47, 70, 56, 13, 90, 2, 79, 63, 12, 52, 56, 57, 40, 49, 2, 18, 66, 17, 49, 48, 91, 2, 3, 35, 31, 36, 25, 69, 57, 34, 29, 88, 84, 64, 88, 29, 44, 14, 75, 75, 82, 39, 72, 17, 56, 89, 76, 4, 19, 69, 83, 82, 94, 41, 6, 3, 80, 97, 83, 36, 14, 82, 1, 35]
74
[91, 67, 86, 41, 74, 29, 64, 47, 79, 12, 78, 41, 18, 13, 54, 99, 1, 31, 62, 72, 31, 45, 14, 35, 34, 90, 91, 78, 59, 33, 33, 2, 90, 10, 69, 1, 90, 91, 15, 90, 91, 10, 97, 31, 35, 40, 5, 38, 80]
4
[4, 15, 90, 7, 96, 44, 34, 43, 45, 99, 16, 68, 67, 97, 66, 41, 3, 6, 71, 68, 71, 54, 76, 53, 73, 61, 65, 29, 5, 30, 76, 30, 26, 11, 42, 68, 43, 66, 76, 30, 56, 33, 38, 55, 1, 56, 3, 53, 6, 85, 58, 22, 47, 54, 56, 31, 11, 22, 89, 72, 58, 76, 61, 47, 70, 89, 66, 5, 17, 5, 82]
50
[70, 46, 73, 85, 39, 83, 59, 50, 69, 63, 99, 49, 73, 59, 28, 10, 5, 39, 42, 92]
18
[6, 97, 72, 23, 95, 37, 91, 55, 34, 95, 29, 25, 89, 48, 48, 34, 89, 76, 86, 61, 54, 98, 43, 17, 61, 92, 28, 93, 71, 92, 58, 42, 38, 15, 50, 36, 74, 51, 5, 94, 25, 67, 62, 36, 75, 83, 82, 11, 91, 12, 73, 19, 87, 84, 94, 52, 16, 49, 1, 38, 10, 66, 62, 15, 64, 2, 63, 58, 75, 93, 26, 15, 54, 1, 53]
29
[39, 60, 21, 53, 39, 38, 3, 50, 7, 33, 75, 36, 61, 86, 10, 72, 87, 58, 55, 86, 22, 96, 14, 34, 7, 43, 61, 89, 59, 20, 64, 23, 98, 71, 76, 27, 77, 79, 27, 36, 73, 73, 10, 5, 46, 38, 95, 62, 36, 20, 73, 20, 22, 92, 51, 35, 73, 60, 63, 9, 15, 81, 35, 86, 57, 28, 39, 51, 80, 95, 45, 52, 92, 79, 65, 21, 54, 43, 73, 14, 60, 55, 62, 8, 31, 55, 6, 3, 93]
45
[53, 81, 50, 51, 58, 40, 62, 80, 75, 88, 88, 41, 88, 79, 33, 6, 36, 95, 51, 75, 7, 88, 32, 4, 2, 19, 92, 24, 85, 7, 4, 82, 69, 82, 45, 34, 58, 10, 31, 70, 44, 3, 65, 97, 38, 10, 89, 31, 38, 69, 99, 63, 44, 69, 48, 85, 12, 39, 28, 41, 47, 21, 70, 30, 35]
26
[29, 29, 97, 2, 43, 11, 30, 82, 36, 6, 24, 47, 26, 53, 27, 17, 60, 68, 52, 95, 74, 79, 77, 98, 37, 70, 83, 59, 32, 75, 88, 34, 24, 36, 83, 23, 87, 12, 15, 7, 86, 45, 24, 61, 86, 62, 73, 91, 59, 54, 20, 1, 89, 64, 71, 63, 46, 72, 60, 94, 30, 47, 73, 51, 7, 59, 8, 31, 36, 69, 16, 40, 59, 69, 57, 44, 26, 42, 45, 76, 8, 26, 12, 74, 42, 17, 97, 52, 52, 69, 98, 51, 36, 58]
60
[95, 77, 42, 42, 94, 5, 63, 40, 69, 94, 79, 14, 37, 24, 96, 9, 5, 36, 8, 66, 70, 22, 20, 96, 47, 3, 5, 89, 46, 42, 47, 33, 65, 9, 40, 92, 7, 87, 76, 68, 46, 59, 41, 43]
18
[71, 91, 24, 47, 47, 74, 30, 5, 63, 82, 86, 34, 30, 65, 27, 76, 87, 34, 48, 6, 96, 11, 23, 73, 22, 4, 22, 82, 90, 85, 93, 32, 1, 26, 15, 37, 32, 34, 96, 53, 82, 93, 18, 95, 46, 92, 55, 61, 17, 51, 55, 1, 21, 32, 23, 13, 21, 29, 10, 4, 52, 16, 29, 26, 35, 39, 70, 88, 6, 99, 66, 54, 25, 37, 84, 5, 50, 92, 35, 66, 79, 32, 35, 73, 2, 1, 58, 94, 95, 67, 1, 56, 89, 31, 81, 45]
27
*/