/*
You are given an integer array arr. From some starting index, you can make a series of jumps. The (1st, 3rd, 5th, ...) jumps in the series are called odd-numbered jumps, and the (2nd, 4th, 6th, ...) jumps in the series are called even-numbered jumps. Note that the jumps are numbered, not the indices.

You may jump forward from index i to index j (with i < j) in the following way:

During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the index j such that arr[i] <= arr[j] and arr[j] is the smallest possible value. If there are multiple such indices j, you can only jump to the smallest such index j.
During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the index j such that arr[i] >= arr[j] and arr[j] is the largest possible value. If there are multiple such indices j, you can only jump to the smallest such index j.
It may be the case that for some index i, there are no legal jumps.
A starting index is good if, starting from that index, you can reach the end of the array (index arr.length - 1) by jumping some number of times (possibly 0 or more than once).

Return the number of good starting indices.

 

Example 1:

Input: arr = [10,13,12,14,15]
Output: 2
Explanation: 
From starting index i = 0, we can make our 1st jump to i = 2 (since arr[2] is the smallest among arr[1], arr[2], arr[3], arr[4] that is greater or equal to arr[0]), then we cannot jump any more.
From starting index i = 1 and i = 2, we can make our 1st jump to i = 3, then we cannot jump any more.
From starting index i = 3, we can make our 1st jump to i = 4, so we have reached the end.
From starting index i = 4, we have reached the end already.
In total, there are 2 different starting indices i = 3 and i = 4, where we can reach the end with some number of
jumps.
Example 2:

Input: arr = [2,3,1,1,4]
Output: 3
Explanation: 
From starting index i = 0, we make jumps to i = 1, i = 2, i = 3:
During our 1st jump (odd-numbered), we first jump to i = 1 because arr[1] is the smallest value in [arr[1], arr[2], arr[3], arr[4]] that is greater than or equal to arr[0].
During our 2nd jump (even-numbered), we jump from i = 1 to i = 2 because arr[2] is the largest value in [arr[2], arr[3], arr[4]] that is less than or equal to arr[1]. arr[3] is also the largest value, but 2 is a smaller index, so we can only jump to i = 2 and not i = 3
During our 3rd jump (odd-numbered), we jump from i = 2 to i = 3 because arr[3] is the smallest value in [arr[3], arr[4]] that is greater than or equal to arr[2].
We can't jump from i = 3 to i = 4, so the starting index i = 0 is not good.
In a similar manner, we can deduce that:
From starting index i = 1, we jump to i = 4, so we reach the end.
From starting index i = 2, we jump to i = 3, and then we can't jump anymore.
From starting index i = 3, we jump to i = 4, so we reach the end.
From starting index i = 4, we are already at the end.
In total, there are 3 different starting indices i = 1, i = 3, and i = 4, where we can reach the end with some
number of jumps.
Example 3:

Input: arr = [5,1,3,4,2]
Output: 3
Explanation: We can reach the end from starting indices 1, 2, and 4.
 

Constraints:

1 <= arr.length <= 2 * 104
0 <= arr[i] < 105
*/

function oddEvenJumps(arr: number[]): number {
  const IS_GOOD = arr.length;
  const sorted = arr.map((_, i) => i).sort((a, b) => arr[a] - arr[b] || b - a);
  const nextEven = new Array(arr.length).fill(-1);
  const nextSmaller = [sorted[0]];

  for (let i = 1; i < sorted.length; i += 1) {
    while (nextSmaller.length && nextSmaller[nextSmaller.length - 1] < sorted[i]) {
      nextSmaller.pop();
    }
    if (nextSmaller.length) {
      nextEven[sorted[i]] = nextSmaller[nextSmaller.length - 1];
    }
    nextSmaller.push(sorted[i]);
  }

  sorted.sort((a, b) => arr[b] - arr[a] || b - a);
  const nextOdd = new Array(arr.length).fill(-1);
  const nextLarger = [sorted[0]];
  for (let i = 1; i < sorted.length; i += 1) {
    while (nextLarger.length && nextLarger[nextLarger.length - 1] < sorted[i]) {
      nextLarger.pop();
    }
    if (nextLarger.length) {
      nextOdd[sorted[i]] = nextLarger[nextLarger.length - 1];
    }
    nextLarger.push(sorted[i]);
  }

  nextEven[nextEven.length - 1] = IS_GOOD;
  nextOdd[nextOdd.length - 1] = IS_GOOD;

  let countGood = 1;
  for (let i = arr.length - 2; i >= 0; i -= 1) {
    if (nextOdd[i] > 0) {
      if (nextEven[nextOdd[i]] === IS_GOOD) {
        nextOdd[i] = IS_GOOD;
        countGood += 1;
      } else {
        nextOdd[i] = -1;
      }
    }
    if (nextEven[i] > 0) {
      nextEven[i] = nextOdd[nextEven[i]] === IS_GOOD ? IS_GOOD : -1;
    }
  }

  return countGood;
};

/*
1 1 3 4 10

1 1 3
2 3 6
*/

const maxLen: = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);

  const nums = new Array(len).fill(0).map(() => numberBetween(1, 25));
  // logOutList('"' + ip + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow([s, t]) + ',');
  logOutList(printRow(nums));
}

const tests: Indexable<any>[] = [
  [10, 13, 12, 14, 15],
  [2, 3, 1, 1, 4],
  [5, 1, 3, 4, 2],
  [6, 7, 45, 28, 20, 44, 47, 5, 20, 9, 3, 9, 38, 35, 39, 37, 22, 27, 31, 45, 4, 8, 18, 39, 1, 9, 32, 36, 24, 23],
  [9, 29],
  [31, 5, 45, 8, 22, 22, 1, 36, 37, 42, 14, 33, 7, 50, 34, 28, 30, 5, 5, 32, 47, 48, 24, 43, 37, 12, 14, 41, 12, 25, 50, 6, 7, 4, 44, 20, 26, 32, 10, 31, 13, 41, 40, 37, 6, 44, 32, 31, 43, 13, 50, 8, 10, 12, 2, 30, 32, 31, 38, 36, 38, 41, 30, 46, 21, 13, 35, 14, 42, 5, 31, 32, 6, 37, 46, 26, 1, 21, 46, 15, 43, 20, 34, 47],
  [13, 47, 9, 39, 38, 27, 17, 6, 33, 3, 35, 13, 42, 36, 30, 43, 50, 43, 39, 5, 4, 32, 4, 12, 13],
  [33, 18, 44, 15, 17, 1, 48, 50, 49, 25, 38, 19, 9, 8, 49, 21, 20, 23, 44, 11, 2, 25, 4, 4, 49, 14, 19, 34, 5, 33, 49, 32, 43, 50, 34, 24, 37, 26, 11, 29, 48, 43, 10, 40, 4, 10, 2, 31, 25, 21, 49, 3, 14, 48, 21, 17, 7, 50, 3, 25, 28, 2, 31, 39, 15, 5, 32, 48, 21, 15, 15, 13, 21, 38, 3, 27, 39, 24, 13, 47, 6, 40, 12, 16, 40, 48, 49, 49, 12, 33, 29, 44, 49, 6, 21, 28, 7, 20],
  [6, 3, 49, 28, 25, 16, 41, 44, 29, 6, 19, 48, 26, 47, 11, 18, 5, 44, 32],
  [1, 26, 13, 40, 41, 9, 39, 50, 27, 47, 4, 28, 17, 19, 45, 14, 29, 46, 25, 4, 1, 46, 33, 5, 25, 2, 5, 2, 47, 46, 28, 49, 18, 7, 24, 24, 30, 30, 45, 25, 13, 16, 9, 49, 40, 19, 45, 20, 31],
  [28, 40, 31, 26, 21, 36, 28, 30, 28, 34, 13, 2, 32, 48, 41, 26, 28, 23, 18, 13, 32, 1, 8, 35, 27, 30, 30, 31, 49, 42, 28, 1, 43, 28, 33, 27, 36, 24, 35, 29, 14, 7, 50, 42, 11, 30, 35, 29, 2, 11, 48, 39, 14, 24, 28, 10, 14, 40, 31, 44, 40, 50, 40, 40, 50, 37, 35],
  [17, 29, 43, 43, 25, 21, 47, 35, 40, 29, 21, 28, 1, 12, 35, 24, 4, 28, 45, 33, 44, 42, 14],
  [30, 37, 20, 37, 48, 35, 37, 35, 41, 6, 46, 24, 33, 15, 24, 46, 19, 19, 2, 28, 7, 37, 29, 4, 4, 14, 48, 43, 35, 40, 25, 14, 11, 3, 5, 13, 26, 7, 32, 9, 26, 4, 25, 46, 39, 35, 49, 29, 44, 26, 7, 29, 42, 10, 18, 44, 29, 31, 31, 47, 2, 20, 19, 48, 34, 3, 15, 23, 5, 33, 5, 12, 31, 49, 29, 19, 27, 32, 36, 30, 20, 41, 26, 29, 39, 38, 40, 14, 24],
  [40],
  [45, 41, 26, 16, 14, 31, 38, 31, 37, 38, 47, 44, 42, 40, 43, 29, 21, 32, 50, 48, 37, 38, 33, 38, 26, 22, 28, 1, 12, 3, 11, 38, 42, 32, 17, 10, 26, 14, 29],
  [49, 34, 50, 12, 42, 18, 49, 27, 5, 42, 25, 1, 13, 26, 28, 28, 24, 50, 41, 21, 7, 5, 4, 20, 26, 15, 17, 24, 16, 24, 31, 16, 39, 37, 11, 28, 16, 18, 25, 3, 19, 28, 38, 24, 8, 16, 20, 45, 42, 35, 15, 4, 2, 46, 22, 23, 41, 13, 11, 18, 39, 7, 50],
  [44, 32, 35, 3, 22, 4, 43, 18, 44, 35, 39, 33, 20, 46, 15, 15, 33],
  [10, 32, 26, 40, 38, 9, 22, 33, 25, 42, 7, 29, 39, 15, 42, 38, 36, 33, 9, 44, 32, 3, 32, 49, 25, 18, 20, 19, 42, 4, 42, 42, 4, 12, 18, 38, 32, 6, 37, 26],
  [24, 1, 2, 17, 13, 39, 39, 34, 13, 10, 48, 32, 45, 7, 48, 28, 11, 12, 25, 37, 45],
  [37, 12, 16, 17, 6, 9, 2, 8, 22, 43, 50, 10, 24, 35, 26, 32, 42, 8, 22, 47, 25, 38, 3, 44, 38, 10, 41, 29, 36, 28, 22, 11, 18, 45, 28, 49, 7, 39, 46, 17, 13, 6, 18, 26, 26, 34, 50, 29, 15, 13, 6, 35, 50, 24, 21, 1, 2, 32, 7, 21, 1, 37, 5, 2, 33, 27, 24, 8],
  [43, 43, 38, 37, 31, 18, 10, 18, 3, 8, 23, 31, 31, 27, 29, 31, 43, 45, 21, 6, 7, 48, 25, 2, 41, 6, 19, 45, 37, 26, 7, 23, 18, 7, 44, 2, 40, 15, 5, 38, 14, 28, 4, 24, 24, 21, 48, 12, 28, 15, 6, 2, 45, 9, 36, 14, 5, 5, 25],
  [18, 50, 47, 12, 50, 31, 5, 45, 30, 3, 11, 43, 37, 11, 14, 2, 4, 18, 33, 9, 46, 26, 4, 36, 26, 24, 23, 9, 32, 31, 14, 33],
  [10, 36, 24, 23, 1, 20, 10, 15, 9, 7, 18, 45, 48, 7, 17, 3, 46, 32, 26, 43, 23, 48, 30, 30, 15, 37, 8, 38, 48, 20, 11, 23, 10, 11, 47, 25, 15, 34, 35, 24, 6, 50, 12, 12, 19, 49, 7, 8, 39, 31, 39, 35, 26, 15, 21, 4, 13, 14, 20, 39, 30, 50, 44, 46, 16, 17, 39, 22, 24, 43, 22, 5, 28, 49, 7],
  [1, 34, 32, 17, 25, 45, 30, 12, 11, 33, 37, 8, 1, 10, 21, 16, 37, 39, 7, 38, 39, 13, 14, 4, 44, 25, 12, 5, 10, 21, 13, 18, 21, 27, 48, 38, 20, 12, 16, 29, 24, 42, 48, 19, 41, 42, 43, 29, 41, 4, 39, 19, 45, 47, 47, 32, 39, 5, 10, 36, 40, 22, 34, 22, 41, 16, 35, 12, 50, 37, 33, 6, 23, 39, 14, 8, 8, 49, 4, 27, 30, 50, 3, 48, 50, 37, 33, 43, 21, 45],
  [48, 35, 16, 23, 27, 45, 36, 29, 14, 23, 35, 8, 8, 23, 7, 12, 23, 3, 46, 34, 11],
  [41, 9, 2, 37, 43, 9, 20, 37, 20, 23, 16, 44, 14, 26, 35, 14, 33, 47, 16, 2, 36, 36, 3, 10, 44, 8, 10, 21, 7, 28, 21, 34, 24, 34, 49, 15, 14, 43, 5, 48, 43, 15, 7, 27, 46, 36, 38, 27, 34, 11, 18, 24, 21, 33, 28, 44, 4, 16, 23, 14, 35, 3, 16, 48, 31, 9, 42, 31, 39, 8, 8],
  [34, 37, 11, 7, 34, 45, 37, 33, 22],
  [49, 1, 6, 31, 47, 3, 25, 32, 29, 23, 19, 36, 43, 5, 14, 44, 2, 9],
  [6, 8, 7, 48, 10, 43, 22, 29, 5, 17, 44, 15, 38, 18, 35, 30, 37, 38, 28, 47, 16, 2, 29, 26, 1, 40, 6, 6, 35, 1, 28, 9, 16, 10, 50, 36, 19, 42, 7, 9, 35, 36],
  [26, 50, 31, 33, 43, 32, 3, 14, 4, 10, 44, 28, 8, 39, 3, 40, 46, 33, 50, 14, 33, 41, 31, 7, 40, 27, 23, 23, 48, 9, 13, 31, 25, 2, 12, 1, 10, 10, 34, 38, 8, 43, 46, 47, 9, 40, 26, 37, 43, 24, 35, 14, 11, 4, 48, 1, 9, 21, 30, 21, 17, 48, 12, 10, 1, 20, 20, 5, 37, 18, 46, 33, 35, 49, 15, 30, 37, 43, 44, 28, 1, 20, 47, 43, 26, 31, 18, 37],
  [19, 9, 32, 38, 21, 21, 19, 36, 26, 40, 16],
  [46, 46, 21, 12, 3, 33, 30, 15, 35, 32, 26, 25, 42, 11, 24, 27, 44, 2, 26, 47, 22, 41, 47, 7, 15, 12, 19, 39, 26, 13, 36, 40, 38, 12, 10, 30, 50, 37, 40, 39, 39, 36, 1, 7, 29, 12, 38, 15, 29, 44, 32, 14, 47, 34, 28, 20, 32, 46, 40, 21, 2, 17, 1, 2, 30, 50, 47, 48, 47, 50, 34, 34, 7, 23, 5, 31, 46],
  [48, 6, 44, 26, 19, 41, 24, 2, 26, 30, 39, 12, 2, 21, 29, 32, 44, 17, 20, 34, 20, 25, 31, 32, 47, 27, 25, 22, 7, 10, 23, 39, 42, 16, 14, 47, 32, 11, 27, 28, 43, 13, 12, 37, 17, 17, 6, 49, 2, 10, 23, 6, 9, 29, 44, 6, 28, 12, 48, 30, 28, 31, 40, 49, 28, 44, 26, 42, 2],
  [5, 38],
  [26, 30, 39, 35, 13, 22, 28, 17, 36, 40, 5, 32, 46, 45, 31, 15, 41, 14, 24, 33, 14, 41, 44, 29, 13, 21, 5, 46, 3, 9, 2, 47, 11, 33, 21, 14, 24, 23, 26, 26, 40, 44, 27, 2, 49, 46, 10, 41, 26, 19, 27, 16, 33, 5, 24, 25, 14, 14, 37, 29, 45, 15, 40, 37, 18, 5, 6, 2, 28, 35, 32, 46, 45, 40, 22, 2, 2, 40, 21, 23, 18, 11, 42, 34, 8, 45, 8, 26, 40, 23],
  [23, 38, 12, 20, 14, 35, 40, 33, 34, 41, 5, 38, 45, 40, 32, 16, 15, 6, 1, 13, 38, 31, 19, 5, 50, 12, 46, 50, 29, 24, 35, 32, 40, 14, 35, 34, 11, 41, 35, 17, 4, 10],
  [6, 4, 45, 38, 41, 9, 6, 27, 16, 36, 12, 26, 48, 6, 35, 1, 28, 14, 37, 24, 21, 46, 43, 35, 28, 19, 50, 39, 13, 42, 15, 33, 42, 29, 20, 20, 49, 8, 19, 23, 34, 42, 26, 43, 31, 49, 47, 22, 44, 35, 45, 25, 22],
  [12, 46, 42, 27, 20, 27, 31, 22, 11, 1, 38, 16, 12, 21, 32, 43, 39, 21, 25, 10, 28, 49, 16, 17, 24, 34, 46, 13, 6, 6, 14, 23, 31, 8, 19, 2, 15, 32, 26, 14, 5, 11, 37, 5, 50, 18, 6, 13, 48, 9, 29, 21, 25, 5, 39, 8, 34, 13, 22, 43, 27, 42, 43, 7, 10, 44, 41, 50, 47, 33, 32, 40, 17, 36, 20, 7, 49, 5, 41, 21, 23, 25, 8, 40, 23, 8, 25, 18, 18, 32, 48, 39, 37, 13, 4, 18, 12, 4],
  [6, 13, 5, 1, 47, 33, 30, 46, 14, 11, 19, 18, 45, 40, 8, 26, 11, 47, 16, 2, 26, 4, 3, 39, 25, 44, 17, 14, 22, 14, 1, 13, 25, 27, 39, 30, 25, 50, 18, 49, 48, 12, 23, 34, 39, 42, 35, 8, 34, 37, 36, 33, 8, 45, 46, 44, 43, 27, 46, 10, 25, 6, 41, 36, 22, 33, 28, 40, 2, 17, 11, 48, 21, 49, 19, 23, 1, 11, 45, 9, 50, 19, 41],
  [14, 6, 4, 42, 2, 42, 34, 21, 11, 44, 26, 8, 45, 37, 43, 36, 43, 8, 48, 23, 47, 50, 46, 14, 6, 11, 2, 13, 3, 9, 21, 20, 49, 48, 11, 6, 32, 27, 45, 24, 32, 5, 38, 40, 14, 19, 18, 23, 22, 32, 33, 17, 26, 23, 30, 48, 36, 36, 13, 18, 32, 47, 8, 41, 30, 1, 11, 41, 25, 31, 35, 4, 41, 45, 31, 40, 15, 5, 18, 18, 50, 18, 18, 11, 3, 35, 6, 20, 31, 50, 9],
  [33, 42, 2, 49, 33, 34, 21, 22, 28, 36, 17, 20, 26, 37, 34, 36, 7, 36, 36, 8, 38, 11, 7, 26, 19, 18, 38, 40, 5, 29, 31, 23, 1, 25, 50, 48, 10, 47, 16, 8, 18, 13, 45, 10, 10, 21, 41, 25, 47, 7, 15, 25, 25, 28, 48, 13],
  [16, 29, 30, 11, 44, 14, 19, 14, 13, 7, 40, 17, 35, 8, 2, 44, 8, 43, 2, 2, 15, 14, 49, 25, 12, 39, 24, 19, 16, 50, 4, 10, 12, 33, 8, 4, 8, 28, 9, 17, 11, 43, 34, 30, 36, 24, 46, 41, 30, 13, 14, 29, 5, 31, 17, 4, 23, 23, 48, 31, 37, 25, 23, 11, 6, 17, 42, 19, 40, 37, 25, 9, 6, 12, 5, 22, 34, 45, 20, 6, 38, 23, 46, 49, 5, 8, 34, 43, 34, 35, 16, 35],
  [12, 23, 9, 45, 20, 33, 20, 8, 26, 36, 23, 36, 31, 50, 46, 31, 11, 4, 16, 6, 43, 2, 14, 14, 16, 42, 23, 3, 21, 15, 22, 36, 3, 47, 40, 21, 3, 29, 37, 42, 44],
  [29, 35, 37, 16, 6, 29, 43, 37, 5, 31, 12, 37, 16, 23, 12, 24, 12, 42, 8, 36, 39, 43, 25, 44, 8, 40, 19, 35, 23, 42, 45, 29, 15, 47, 34, 13, 1, 11, 7, 9],
  [2, 16, 39, 43, 29, 43, 12, 1, 6, 31, 10, 46, 20, 1, 20, 45, 49, 32, 6, 49, 14, 1, 4, 23, 16, 31, 30, 47, 7, 28, 26, 11, 34, 19, 32, 9, 44, 8, 4, 37, 27, 24, 17, 40, 12, 16, 38, 12, 17, 15, 6, 39, 2, 47, 21, 20, 26, 30, 17, 31, 41, 31, 37, 23, 26, 15, 2, 18, 32, 43, 48, 17, 47, 46, 42, 50, 41],
  [42, 46, 20, 11, 9, 13, 4, 20, 23, 18, 15, 27, 4, 13, 25, 39, 11, 27, 48, 2, 12, 4, 19, 44, 30, 40, 36, 50, 37, 12, 7, 3, 12, 24],
  [42, 8, 3, 31, 30, 13, 8, 14, 21, 17, 29, 15, 30, 43, 12, 5, 37, 32, 46, 28, 10, 11, 41, 6, 30, 6, 16, 20, 2, 7, 7, 9, 40, 16, 7, 22, 18, 25, 18, 36, 25, 26, 49, 2, 29, 28, 15, 31, 33],
  [11, 41, 5, 3, 30, 3, 44, 6, 31, 15, 11, 10, 3, 23, 48, 50, 7, 29, 2, 38, 18, 47, 5, 19, 50, 19, 31, 43, 31, 34, 48, 3, 29, 34, 40, 30, 14, 26, 3, 8, 22, 28, 21, 32, 4, 42, 9, 9, 46, 35, 43, 20, 5, 23, 38, 45, 49, 24, 26, 35, 14, 34, 50, 7, 42, 29, 49, 24, 42, 47, 47, 8, 4, 14, 39, 2, 10, 11, 4, 2, 49, 47, 4, 22, 10, 1, 49, 24, 11, 31, 12],
  [14, 33, 9, 21, 17, 30, 39, 28, 24, 8],
  [36, 8, 45, 45, 20, 30, 18, 40, 36, 2, 4, 49, 25, 48, 48, 27, 28, 34, 9, 3, 1, 14, 34, 48, 35, 49, 46, 1, 48, 21, 22, 3, 4, 50, 13, 46, 47, 38, 24, 28],
  [36, 50, 7, 44, 35, 31, 1, 39, 11, 19, 26, 35, 11, 38, 17, 22, 32, 3, 18, 5, 15, 48, 29, 19, 1, 49, 48, 8, 8, 16, 29, 34, 7, 43, 2, 33, 9, 22, 15, 6, 10, 15, 44, 7, 22, 24, 48, 34, 30, 42, 43, 43, 18, 49, 5, 33, 1, 2, 18, 44, 45, 27, 12, 34, 44, 27, 39, 15, 41, 47, 19, 12, 45, 39, 39, 39, 33, 8, 24, 30],
  [23, 46, 38, 9, 15, 22, 6, 18, 2, 37, 47, 26, 13, 1, 45, 50, 28, 12, 25, 46, 49, 45, 3, 9, 41, 29, 30, 24, 33, 16, 10, 40, 22, 47, 35, 3, 4, 29, 29, 26, 11, 44, 23, 35, 23, 24, 16, 4, 7, 8, 48, 5, 36, 19, 46, 14, 38, 46, 39, 24, 8, 21, 22, 16, 44, 26, 45, 5, 34, 18, 30, 38, 17, 50, 1, 46, 5, 49, 11, 36, 28, 9, 48, 22, 35, 39, 8, 20, 26, 30, 6, 16, 48, 44, 12, 17],
  [8, 37, 48, 14, 24, 41, 30, 37, 35, 7, 2, 26, 7, 34, 39, 45, 48, 48, 50, 42, 28, 33, 43, 44, 18, 41, 32, 21, 3, 26, 50, 18, 14, 5, 19, 13, 48, 8, 48, 26, 23, 9, 29, 32, 26, 49, 41, 8, 34, 26, 47, 34, 36, 49, 17, 12, 37, 19, 34, 28, 24, 32, 47, 8, 12, 47, 20, 24, 9],
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(oddEvenJumps(test));
  console.timeEnd(i.toString());
  i += 1;
}

/*
[10, 13, 12, 14, 15]
[2, 3, 1, 1, 4]
[5, 1, 3, 4, 2]
[6, 7, 45, 28, 20, 44, 47, 5, 20, 9, 3, 9, 38, 35, 39, 37, 22, 27, 31, 45, 4, 8, 18, 39, 1, 9, 32, 36, 24, 23]
[9, 29]
[31, 5, 45, 8, 22, 22, 1, 36, 37, 42, 14, 33, 7, 50, 34, 28, 30, 5, 5, 32, 47, 48, 24, 43, 37, 12, 14, 41, 12, 25, 50, 6, 7, 4, 44, 20, 26, 32, 10, 31, 13, 41, 40, 37, 6, 44, 32, 31, 43, 13, 50, 8, 10, 12, 2, 30, 32, 31, 38, 36, 38, 41, 30, 46, 21, 13, 35, 14, 42, 5, 31, 32, 6, 37, 46, 26, 1, 21, 46, 15, 43, 20, 34, 47]
[13, 47, 9, 39, 38, 27, 17, 6, 33, 3, 35, 13, 42, 36, 30, 43, 50, 43, 39, 5, 4, 32, 4, 12, 13]
[33, 18, 44, 15, 17, 1, 48, 50, 49, 25, 38, 19, 9, 8, 49, 21, 20, 23, 44, 11, 2, 25, 4, 4, 49, 14, 19, 34, 5, 33, 49, 32, 43, 50, 34, 24, 37, 26, 11, 29, 48, 43, 10, 40, 4, 10, 2, 31, 25, 21, 49, 3, 14, 48, 21, 17, 7, 50, 3, 25, 28, 2, 31, 39, 15, 5, 32, 48, 21, 15, 15, 13, 21, 38, 3, 27, 39, 24, 13, 47, 6, 40, 12, 16, 40, 48, 49, 49, 12, 33, 29, 44, 49, 6, 21, 28, 7, 20]
[6, 3, 49, 28, 25, 16, 41, 44, 29, 6, 19, 48, 26, 47, 11, 18, 5, 44, 32]
[1, 26, 13, 40, 41, 9, 39, 50, 27, 47, 4, 28, 17, 19, 45, 14, 29, 46, 25, 4, 1, 46, 33, 5, 25, 2, 5, 2, 47, 46, 28, 49, 18, 7, 24, 24, 30, 30, 45, 25, 13, 16, 9, 49, 40, 19, 45, 20, 31]
[28, 40, 31, 26, 21, 36, 28, 30, 28, 34, 13, 2, 32, 48, 41, 26, 28, 23, 18, 13, 32, 1, 8, 35, 27, 30, 30, 31, 49, 42, 28, 1, 43, 28, 33, 27, 36, 24, 35, 29, 14, 7, 50, 42, 11, 30, 35, 29, 2, 11, 48, 39, 14, 24, 28, 10, 14, 40, 31, 44, 40, 50, 40, 40, 50, 37, 35]
[17, 29, 43, 43, 25, 21, 47, 35, 40, 29, 21, 28, 1, 12, 35, 24, 4, 28, 45, 33, 44, 42, 14]
[30, 37, 20, 37, 48, 35, 37, 35, 41, 6, 46, 24, 33, 15, 24, 46, 19, 19, 2, 28, 7, 37, 29, 4, 4, 14, 48, 43, 35, 40, 25, 14, 11, 3, 5, 13, 26, 7, 32, 9, 26, 4, 25, 46, 39, 35, 49, 29, 44, 26, 7, 29, 42, 10, 18, 44, 29, 31, 31, 47, 2, 20, 19, 48, 34, 3, 15, 23, 5, 33, 5, 12, 31, 49, 29, 19, 27, 32, 36, 30, 20, 41, 26, 29, 39, 38, 40, 14, 24]
[40]
[45, 41, 26, 16, 14, 31, 38, 31, 37, 38, 47, 44, 42, 40, 43, 29, 21, 32, 50, 48, 37, 38, 33, 38, 26, 22, 28, 1, 12, 3, 11, 38, 42, 32, 17, 10, 26, 14, 29]
[49, 34, 50, 12, 42, 18, 49, 27, 5, 42, 25, 1, 13, 26, 28, 28, 24, 50, 41, 21, 7, 5, 4, 20, 26, 15, 17, 24, 16, 24, 31, 16, 39, 37, 11, 28, 16, 18, 25, 3, 19, 28, 38, 24, 8, 16, 20, 45, 42, 35, 15, 4, 2, 46, 22, 23, 41, 13, 11, 18, 39, 7, 50]
[44, 32, 35, 3, 22, 4, 43, 18, 44, 35, 39, 33, 20, 46, 15, 15, 33]
[10, 32, 26, 40, 38, 9, 22, 33, 25, 42, 7, 29, 39, 15, 42, 38, 36, 33, 9, 44, 32, 3, 32, 49, 25, 18, 20, 19, 42, 4, 42, 42, 4, 12, 18, 38, 32, 6, 37, 26]
[24, 1, 2, 17, 13, 39, 39, 34, 13, 10, 48, 32, 45, 7, 48, 28, 11, 12, 25, 37, 45]
[37, 12, 16, 17, 6, 9, 2, 8, 22, 43, 50, 10, 24, 35, 26, 32, 42, 8, 22, 47, 25, 38, 3, 44, 38, 10, 41, 29, 36, 28, 22, 11, 18, 45, 28, 49, 7, 39, 46, 17, 13, 6, 18, 26, 26, 34, 50, 29, 15, 13, 6, 35, 50, 24, 21, 1, 2, 32, 7, 21, 1, 37, 5, 2, 33, 27, 24, 8]
[43, 43, 38, 37, 31, 18, 10, 18, 3, 8, 23, 31, 31, 27, 29, 31, 43, 45, 21, 6, 7, 48, 25, 2, 41, 6, 19, 45, 37, 26, 7, 23, 18, 7, 44, 2, 40, 15, 5, 38, 14, 28, 4, 24, 24, 21, 48, 12, 28, 15, 6, 2, 45, 9, 36, 14, 5, 5, 25]
[18, 50, 47, 12, 50, 31, 5, 45, 30, 3, 11, 43, 37, 11, 14, 2, 4, 18, 33, 9, 46, 26, 4, 36, 26, 24, 23, 9, 32, 31, 14, 33]
[10, 36, 24, 23, 1, 20, 10, 15, 9, 7, 18, 45, 48, 7, 17, 3, 46, 32, 26, 43, 23, 48, 30, 30, 15, 37, 8, 38, 48, 20, 11, 23, 10, 11, 47, 25, 15, 34, 35, 24, 6, 50, 12, 12, 19, 49, 7, 8, 39, 31, 39, 35, 26, 15, 21, 4, 13, 14, 20, 39, 30, 50, 44, 46, 16, 17, 39, 22, 24, 43, 22, 5, 28, 49, 7]
[1, 34, 32, 17, 25, 45, 30, 12, 11, 33, 37, 8, 1, 10, 21, 16, 37, 39, 7, 38, 39, 13, 14, 4, 44, 25, 12, 5, 10, 21, 13, 18, 21, 27, 48, 38, 20, 12, 16, 29, 24, 42, 48, 19, 41, 42, 43, 29, 41, 4, 39, 19, 45, 47, 47, 32, 39, 5, 10, 36, 40, 22, 34, 22, 41, 16, 35, 12, 50, 37, 33, 6, 23, 39, 14, 8, 8, 49, 4, 27, 30, 50, 3, 48, 50, 37, 33, 43, 21, 45]
[48, 35, 16, 23, 27, 45, 36, 29, 14, 23, 35, 8, 8, 23, 7, 12, 23, 3, 46, 34, 11]
[41, 9, 2, 37, 43, 9, 20, 37, 20, 23, 16, 44, 14, 26, 35, 14, 33, 47, 16, 2, 36, 36, 3, 10, 44, 8, 10, 21, 7, 28, 21, 34, 24, 34, 49, 15, 14, 43, 5, 48, 43, 15, 7, 27, 46, 36, 38, 27, 34, 11, 18, 24, 21, 33, 28, 44, 4, 16, 23, 14, 35, 3, 16, 48, 31, 9, 42, 31, 39, 8, 8]
[34, 37, 11, 7, 34, 45, 37, 33, 22]
[49, 1, 6, 31, 47, 3, 25, 32, 29, 23, 19, 36, 43, 5, 14, 44, 2, 9]
[6, 8, 7, 48, 10, 43, 22, 29, 5, 17, 44, 15, 38, 18, 35, 30, 37, 38, 28, 47, 16, 2, 29, 26, 1, 40, 6, 6, 35, 1, 28, 9, 16, 10, 50, 36, 19, 42, 7, 9, 35, 36]
[26, 50, 31, 33, 43, 32, 3, 14, 4, 10, 44, 28, 8, 39, 3, 40, 46, 33, 50, 14, 33, 41, 31, 7, 40, 27, 23, 23, 48, 9, 13, 31, 25, 2, 12, 1, 10, 10, 34, 38, 8, 43, 46, 47, 9, 40, 26, 37, 43, 24, 35, 14, 11, 4, 48, 1, 9, 21, 30, 21, 17, 48, 12, 10, 1, 20, 20, 5, 37, 18, 46, 33, 35, 49, 15, 30, 37, 43, 44, 28, 1, 20, 47, 43, 26, 31, 18, 37]
[19, 9, 32, 38, 21, 21, 19, 36, 26, 40, 16]
[46, 46, 21, 12, 3, 33, 30, 15, 35, 32, 26, 25, 42, 11, 24, 27, 44, 2, 26, 47, 22, 41, 47, 7, 15, 12, 19, 39, 26, 13, 36, 40, 38, 12, 10, 30, 50, 37, 40, 39, 39, 36, 1, 7, 29, 12, 38, 15, 29, 44, 32, 14, 47, 34, 28, 20, 32, 46, 40, 21, 2, 17, 1, 2, 30, 50, 47, 48, 47, 50, 34, 34, 7, 23, 5, 31, 46]
[48, 6, 44, 26, 19, 41, 24, 2, 26, 30, 39, 12, 2, 21, 29, 32, 44, 17, 20, 34, 20, 25, 31, 32, 47, 27, 25, 22, 7, 10, 23, 39, 42, 16, 14, 47, 32, 11, 27, 28, 43, 13, 12, 37, 17, 17, 6, 49, 2, 10, 23, 6, 9, 29, 44, 6, 28, 12, 48, 30, 28, 31, 40, 49, 28, 44, 26, 42, 2]
[5, 38]
[26, 30, 39, 35, 13, 22, 28, 17, 36, 40, 5, 32, 46, 45, 31, 15, 41, 14, 24, 33, 14, 41, 44, 29, 13, 21, 5, 46, 3, 9, 2, 47, 11, 33, 21, 14, 24, 23, 26, 26, 40, 44, 27, 2, 49, 46, 10, 41, 26, 19, 27, 16, 33, 5, 24, 25, 14, 14, 37, 29, 45, 15, 40, 37, 18, 5, 6, 2, 28, 35, 32, 46, 45, 40, 22, 2, 2, 40, 21, 23, 18, 11, 42, 34, 8, 45, 8, 26, 40, 23]
[23, 38, 12, 20, 14, 35, 40, 33, 34, 41, 5, 38, 45, 40, 32, 16, 15, 6, 1, 13, 38, 31, 19, 5, 50, 12, 46, 50, 29, 24, 35, 32, 40, 14, 35, 34, 11, 41, 35, 17, 4, 10]
[6, 4, 45, 38, 41, 9, 6, 27, 16, 36, 12, 26, 48, 6, 35, 1, 28, 14, 37, 24, 21, 46, 43, 35, 28, 19, 50, 39, 13, 42, 15, 33, 42, 29, 20, 20, 49, 8, 19, 23, 34, 42, 26, 43, 31, 49, 47, 22, 44, 35, 45, 25, 22]
[12, 46, 42, 27, 20, 27, 31, 22, 11, 1, 38, 16, 12, 21, 32, 43, 39, 21, 25, 10, 28, 49, 16, 17, 24, 34, 46, 13, 6, 6, 14, 23, 31, 8, 19, 2, 15, 32, 26, 14, 5, 11, 37, 5, 50, 18, 6, 13, 48, 9, 29, 21, 25, 5, 39, 8, 34, 13, 22, 43, 27, 42, 43, 7, 10, 44, 41, 50, 47, 33, 32, 40, 17, 36, 20, 7, 49, 5, 41, 21, 23, 25, 8, 40, 23, 8, 25, 18, 18, 32, 48, 39, 37, 13, 4, 18, 12, 4]
[6, 13, 5, 1, 47, 33, 30, 46, 14, 11, 19, 18, 45, 40, 8, 26, 11, 47, 16, 2, 26, 4, 3, 39, 25, 44, 17, 14, 22, 14, 1, 13, 25, 27, 39, 30, 25, 50, 18, 49, 48, 12, 23, 34, 39, 42, 35, 8, 34, 37, 36, 33, 8, 45, 46, 44, 43, 27, 46, 10, 25, 6, 41, 36, 22, 33, 28, 40, 2, 17, 11, 48, 21, 49, 19, 23, 1, 11, 45, 9, 50, 19, 41]
[14, 6, 4, 42, 2, 42, 34, 21, 11, 44, 26, 8, 45, 37, 43, 36, 43, 8, 48, 23, 47, 50, 46, 14, 6, 11, 2, 13, 3, 9, 21, 20, 49, 48, 11, 6, 32, 27, 45, 24, 32, 5, 38, 40, 14, 19, 18, 23, 22, 32, 33, 17, 26, 23, 30, 48, 36, 36, 13, 18, 32, 47, 8, 41, 30, 1, 11, 41, 25, 31, 35, 4, 41, 45, 31, 40, 15, 5, 18, 18, 50, 18, 18, 11, 3, 35, 6, 20, 31, 50, 9]
[33, 42, 2, 49, 33, 34, 21, 22, 28, 36, 17, 20, 26, 37, 34, 36, 7, 36, 36, 8, 38, 11, 7, 26, 19, 18, 38, 40, 5, 29, 31, 23, 1, 25, 50, 48, 10, 47, 16, 8, 18, 13, 45, 10, 10, 21, 41, 25, 47, 7, 15, 25, 25, 28, 48, 13]
[16, 29, 30, 11, 44, 14, 19, 14, 13, 7, 40, 17, 35, 8, 2, 44, 8, 43, 2, 2, 15, 14, 49, 25, 12, 39, 24, 19, 16, 50, 4, 10, 12, 33, 8, 4, 8, 28, 9, 17, 11, 43, 34, 30, 36, 24, 46, 41, 30, 13, 14, 29, 5, 31, 17, 4, 23, 23, 48, 31, 37, 25, 23, 11, 6, 17, 42, 19, 40, 37, 25, 9, 6, 12, 5, 22, 34, 45, 20, 6, 38, 23, 46, 49, 5, 8, 34, 43, 34, 35, 16, 35]
[12, 23, 9, 45, 20, 33, 20, 8, 26, 36, 23, 36, 31, 50, 46, 31, 11, 4, 16, 6, 43, 2, 14, 14, 16, 42, 23, 3, 21, 15, 22, 36, 3, 47, 40, 21, 3, 29, 37, 42, 44]
[29, 35, 37, 16, 6, 29, 43, 37, 5, 31, 12, 37, 16, 23, 12, 24, 12, 42, 8, 36, 39, 43, 25, 44, 8, 40, 19, 35, 23, 42, 45, 29, 15, 47, 34, 13, 1, 11, 7, 9]
[2, 16, 39, 43, 29, 43, 12, 1, 6, 31, 10, 46, 20, 1, 20, 45, 49, 32, 6, 49, 14, 1, 4, 23, 16, 31, 30, 47, 7, 28, 26, 11, 34, 19, 32, 9, 44, 8, 4, 37, 27, 24, 17, 40, 12, 16, 38, 12, 17, 15, 6, 39, 2, 47, 21, 20, 26, 30, 17, 31, 41, 31, 37, 23, 26, 15, 2, 18, 32, 43, 48, 17, 47, 46, 42, 50, 41]
[42, 46, 20, 11, 9, 13, 4, 20, 23, 18, 15, 27, 4, 13, 25, 39, 11, 27, 48, 2, 12, 4, 19, 44, 30, 40, 36, 50, 37, 12, 7, 3, 12, 24]
[42, 8, 3, 31, 30, 13, 8, 14, 21, 17, 29, 15, 30, 43, 12, 5, 37, 32, 46, 28, 10, 11, 41, 6, 30, 6, 16, 20, 2, 7, 7, 9, 40, 16, 7, 22, 18, 25, 18, 36, 25, 26, 49, 2, 29, 28, 15, 31, 33]
[11, 41, 5, 3, 30, 3, 44, 6, 31, 15, 11, 10, 3, 23, 48, 50, 7, 29, 2, 38, 18, 47, 5, 19, 50, 19, 31, 43, 31, 34, 48, 3, 29, 34, 40, 30, 14, 26, 3, 8, 22, 28, 21, 32, 4, 42, 9, 9, 46, 35, 43, 20, 5, 23, 38, 45, 49, 24, 26, 35, 14, 34, 50, 7, 42, 29, 49, 24, 42, 47, 47, 8, 4, 14, 39, 2, 10, 11, 4, 2, 49, 47, 4, 22, 10, 1, 49, 24, 11, 31, 12]
[14, 33, 9, 21, 17, 30, 39, 28, 24, 8]
[36, 8, 45, 45, 20, 30, 18, 40, 36, 2, 4, 49, 25, 48, 48, 27, 28, 34, 9, 3, 1, 14, 34, 48, 35, 49, 46, 1, 48, 21, 22, 3, 4, 50, 13, 46, 47, 38, 24, 28]
[36, 50, 7, 44, 35, 31, 1, 39, 11, 19, 26, 35, 11, 38, 17, 22, 32, 3, 18, 5, 15, 48, 29, 19, 1, 49, 48, 8, 8, 16, 29, 34, 7, 43, 2, 33, 9, 22, 15, 6, 10, 15, 44, 7, 22, 24, 48, 34, 30, 42, 43, 43, 18, 49, 5, 33, 1, 2, 18, 44, 45, 27, 12, 34, 44, 27, 39, 15, 41, 47, 19, 12, 45, 39, 39, 39, 33, 8, 24, 30]
[23, 46, 38, 9, 15, 22, 6, 18, 2, 37, 47, 26, 13, 1, 45, 50, 28, 12, 25, 46, 49, 45, 3, 9, 41, 29, 30, 24, 33, 16, 10, 40, 22, 47, 35, 3, 4, 29, 29, 26, 11, 44, 23, 35, 23, 24, 16, 4, 7, 8, 48, 5, 36, 19, 46, 14, 38, 46, 39, 24, 8, 21, 22, 16, 44, 26, 45, 5, 34, 18, 30, 38, 17, 50, 1, 46, 5, 49, 11, 36, 28, 9, 48, 22, 35, 39, 8, 20, 26, 30, 6, 16, 48, 44, 12, 17]
[8, 37, 48, 14, 24, 41, 30, 37, 35, 7, 2, 26, 7, 34, 39, 45, 48, 48, 50, 42, 28, 33, 43, 44, 18, 41, 32, 21, 3, 26, 50, 18, 14, 5, 19, 13, 48, 8, 48, 26, 23, 9, 29, 32, 26, 49, 41, 8, 34, 26, 47, 34, 36, 49, 17, 12, 37, 19, 34, 28, 24, 32, 47, 8, 12, 47, 20, 24, 9]
*/