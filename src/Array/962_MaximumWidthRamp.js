/*
Given an array A of integers, a ramp is a tuple (i, j) for which i < j and A[i] <= A[j].  The width of such a ramp is j - i.

Find the maximum width of a ramp in A.  If one doesn't exist, return 0.

 

Example 1:

Input: [6,0,8,2,1,5]
Output: 4
Explanation: 
The maximum width ramp is achieved at (i, j) = (1, 5): A[1] = 0 and A[5] = 5.
Example 2:

Input: [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: 
The maximum width ramp is achieved at (i, j) = (2, 9): A[2] = 1 and A[9] = 1.
 

Note:

2 <= A.length <= 50000
0 <= A[i] <= 50000
*/

// minStack O(nlogn)
var maxWidthRamp = function (A) {
  let maxWidth = 0;
  const minStack = [0];
  for (let i = 1; i < A.length; i += 1) {
    const position = findFirstSmaller(A, i, minStack);

    if (position === i) {
      minStack.push(i);
    } else {
      maxWidth = Math.max(maxWidth, i - position);
    }
  }

  return maxWidth;
};

const findFirstSmaller = (arr, target, lookup) => {
  let left = 0;
  let right = lookup.length - 1;
  let mid;

  const targetHeight = arr[target];

  if (targetHeight < arr[lookup[right]]) return target;

  while (left < right) {
    mid = Math.floor((left + right) / 2);
    const currentHeight = arr[lookup[mid]];

    if (currentHeight === targetHeight) {
      return lookup[mid];
    } else if (currentHeight > targetHeight) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return lookup[right];
}

// two pointers O(n)
var maxWidthRamp = function (A) {
  const minHeights = new Array(A.length).fill(Infinity);
  const maxHeights = new Array(A.length).fill(-Infinity);

  minHeights[0] = A[0];
  for (let i = 1; i < minHeights.length; i += 1) {
    minHeights[i] = Math.min(A[i], minHeights[i - 1]);
  }

  maxHeights[maxHeights.length - 1] = A[A.length - 1];
  for (let i = maxHeights.length - 2; i >= 0; i -= 1) {
    maxHeights[i] = Math.max(A[i], maxHeights[i + 1]);
  }

  let maxWidth = 0;

  let i = 0;
  let j = 0;

  while (i < minHeights.length && j < maxHeights.length) {
    if (maxHeights[j] >= minHeights[i]) {
      maxWidth = Math.max(maxWidth, j - i);
      j += 1;
    } else {
      i += 1;
    }
  }

  return maxWidth;
};

/*

*/

// const maxElement = 50;
// for (let i = 0; i < 40; i += 1) {
//   const numElements = Math.floor(Math.random() * maxElement) + 1;

//   const elements = [];
//   for (let j = 0; j < numElements; j += 1) {
//     const element = Math.floor(Math.random() * 40);
//     elements.push(element);
//   }
//   logOutList(printRow(elements));
// }

/*

*/

const tests = [
  [6, 0, 8, 2, 1, 5],
  [9, 8, 1, 0, 1, 9, 4, 0, 4, 1],
  [13, 27, 21, 39, 4, 6, 34, 35, 0, 33, 1, 28, 0, 23, 35, 7, 39, 2, 38, 8, 24, 20, 15, 17, 20, 11, 17, 39, 39, 29, 32, 21, 34, 10, 30, 19, 32, 37, 34, 0, 5, 5, 15],
  [16, 22, 29, 20, 6, 16, 32, 13, 19, 10, 0],
  [15, 39, 12],
  [22, 5, 2, 14, 16, 16, 22, 19, 0, 29, 27, 34, 4, 20],
  [2, 25, 24, 27, 11, 29, 18, 12, 5, 1, 19, 2, 35, 8, 8, 13, 24, 2, 22, 9, 33, 9],
  [6, 7, 15, 11, 21, 28, 34, 21, 22, 39, 30, 10, 3, 22, 26],
  [31, 1, 2, 7, 29, 5, 31, 9, 9, 7, 6, 23, 23, 16, 11, 33, 0, 12, 17, 13, 30, 18, 20, 1, 18, 20, 23, 35, 4, 39, 21, 34, 31, 10, 11, 3, 18],
  [19, 32, 11, 39, 3, 15, 36, 1, 11, 31, 18, 8, 11, 20, 23, 12, 24, 39, 13, 0, 0, 33, 9, 16, 7, 23, 34, 12, 11, 9, 27, 3, 9, 27, 3, 28],
  [11, 37, 9, 9, 26, 15, 2, 21, 7, 21, 3, 21, 9, 30, 12, 31, 12, 29, 21, 11, 37, 13, 37, 1, 14, 35, 13, 38, 23, 25, 31, 7, 31, 27, 5, 0, 0],
  [29, 14, 38, 22, 18, 15, 29, 11, 30, 0, 36, 14, 34, 5, 14, 14, 20, 18, 24, 31, 23, 8, 22, 35, 17, 4, 11, 26, 21],
  [13, 35, 3, 38, 14, 16, 4, 37, 2, 1, 29, 27, 0, 1, 38, 5, 9, 25, 7, 20],
  [36, 9, 39, 25, 11, 26, 20, 8, 27, 0, 28, 1, 8, 31, 16, 22, 0, 9, 3, 14, 26, 24, 38, 35, 16, 16, 39, 27, 20, 16, 9, 32, 2, 5],
  [15, 38, 14, 19, 25, 11, 39, 8, 28, 1, 39, 26, 8, 17, 14, 36, 13, 10, 33, 37, 37, 17, 8, 5, 11, 0, 30, 3, 5, 15],
  [16, 38, 20, 15, 39, 7, 22, 38, 29, 33, 29, 8, 5, 31, 27, 39, 28, 19, 29, 5, 33, 10, 20, 19, 1, 15, 33, 4, 16, 23, 20, 15, 10, 26, 8, 35, 18, 36, 9, 30, 13, 19, 33, 0, 28, 7, 19],
  [15, 20, 10, 24, 24, 11, 39, 23, 24, 23, 32, 13, 13, 35, 0, 14, 32, 28, 18, 6, 16, 19, 7, 11, 11, 8, 38, 7, 22, 3, 9, 7, 20, 7, 5, 26, 20, 8, 37, 4, 23, 8, 0, 34],
  [10, 39, 11, 1, 11, 31, 9],
  [33, 31, 11, 6, 7, 39, 39, 24, 12, 39, 14, 3, 33, 33, 36, 31, 13, 2, 12, 16, 30, 11, 30, 1, 4, 20, 12, 10, 36, 19, 30, 16, 0, 11, 25, 17, 22, 3, 19],
  [10, 33, 22, 9, 26, 34, 16, 27, 25, 2, 31, 9, 1, 7, 3, 38, 34, 35, 5, 35, 20, 23, 6, 38, 35, 17, 28, 39, 25, 27, 30, 19],
  [11, 35, 25, 25, 0, 4, 21, 2, 5, 37, 31, 6, 37, 35, 34, 39, 9, 23, 11],
  [15, 24, 16, 12, 36, 7, 10, 32, 15, 22, 9, 24, 24, 14, 18, 37, 32, 17, 6, 14, 11, 38, 36, 1, 26, 0, 33, 17, 35, 14, 21, 24, 37, 18, 3, 21, 23, 35, 12, 38, 19, 11, 11],
  [19, 30, 32, 1, 25, 21, 25, 15, 32, 2, 17, 6, 31, 38, 9, 15, 14, 2, 32, 2, 14, 18, 34, 28, 14, 6, 22, 11, 36],
  [39, 5, 22, 25, 34, 31, 39, 30, 22, 32, 34, 14, 20, 31, 14, 14, 37, 9, 37, 39, 30, 18, 10, 32, 18, 0, 38, 33, 6, 13, 16, 32, 0, 24, 18, 25, 0, 29, 28, 38, 31, 28, 25],
  [10, 11, 30, 33, 25, 39, 27, 3, 17, 19, 3, 21, 6, 10],
  [1, 20, 16, 39, 13, 29, 20, 26, 31, 36, 8, 1, 25, 16, 9, 36, 15, 8, 13, 39, 5, 29, 9, 37, 15, 4, 24, 37, 18, 12, 38, 34, 5],
  [17, 4, 32, 32, 34, 39, 15, 36, 38, 26, 6, 15, 11, 18, 16, 2, 2, 28, 29, 36, 2, 6, 9, 15, 28, 6, 25, 39, 22, 19],
  [27, 17, 11, 23, 26, 27, 39, 8, 38, 15, 36, 3, 29, 12, 29, 33, 6, 6, 12, 14, 23, 37, 0, 34, 25, 25, 29, 22, 21, 38, 35],
  [10, 12, 24, 4, 32, 2, 5, 36, 15, 36, 10, 28, 25, 7, 16, 37, 27, 6, 33, 8, 26, 32, 5, 36, 31, 12, 9, 18, 33, 12, 39, 23],
  [9, 24, 12, 18, 20, 11, 16, 36, 34, 7, 15, 34, 33, 28, 31, 7, 16, 12, 3, 31, 35, 36, 5, 8, 14, 10, 32, 27, 28, 17, 6, 36, 2, 1, 30],
  [31, 36, 22, 22, 9, 33, 14, 10, 14, 39, 10, 35, 35, 17, 20, 18, 2, 1, 25, 36, 30, 17, 27, 25],
  [6, 37, 7, 34, 7, 17, 33, 34, 13, 12, 25, 26, 8, 38, 11, 1, 27, 2, 3, 11, 19, 9, 5, 37, 2, 26, 38, 7, 35],
  [5],
  [4, 12, 35, 34, 29, 31, 32, 31, 20, 37, 39, 35, 34, 11, 1, 11, 34, 27, 9, 18, 20, 20, 27, 5],
  [19, 20, 9, 32, 14, 1, 10, 34, 21, 30],
  [27, 37, 26, 37, 36, 6, 4, 22],
  [37, 5, 1, 20, 19, 3, 8, 8, 2, 17, 11, 14, 13, 17, 32, 17, 30, 37, 9, 5, 11, 12, 12, 27, 37, 26, 18, 27, 37, 31, 39, 26, 12, 33, 17, 13, 35, 20, 35, 35, 29, 11, 13],
  [24, 17, 11, 14, 15, 31, 9, 26, 2, 28, 34, 21, 19, 34, 38, 35, 27, 22, 38, 36, 32, 14, 37, 2, 1, 6, 0, 1, 19, 11],
  [10, 36, 24, 1, 20, 1, 30, 4, 30, 13, 37, 4, 33, 27, 39, 37, 0, 17, 28, 6, 21, 0, 1, 22, 32, 15, 4, 27, 7, 7, 2, 31, 21, 36, 38, 35, 0, 24, 29, 33, 16, 4, 23, 39, 24, 9, 19, 14, 35, 19],
  [2, 29, 13, 28, 2, 6, 11, 9, 7, 22, 19, 14, 18, 14, 24, 36, 22, 23, 39, 30],
  [32, 17, 30, 20, 34, 19, 25, 36, 39, 13, 35, 36, 27, 9, 10, 2, 17, 35, 24, 13, 26, 37, 32, 1, 13, 39, 1, 4, 38, 37, 6, 0, 9, 35, 4, 15, 38, 28, 5, 22, 30, 7, 36, 23, 38, 2],
  [28, 22, 4, 8, 6, 39, 22, 36, 13, 19, 9, 4, 22, 1, 10, 10, 21, 36, 15, 26, 38, 37, 17, 1, 15, 24, 11, 6, 24, 18, 2, 36, 30, 6, 6, 16, 2, 4, 16, 28, 8, 18, 23],
  [15, 16, 37, 1, 13, 21, 25, 15, 12, 15, 27, 12, 31, 2, 27, 10, 34, 30, 6, 37, 18, 17, 27, 12, 22, 0, 37, 14, 7, 36, 13, 11, 37, 27, 27, 15, 7, 29],
  [22, 15, 12, 0, 4, 7, 35, 13, 38, 23, 34, 21, 5, 20, 7, 19, 15, 14, 19],
  [17, 21, 10, 29, 14, 1, 21, 14, 20, 19, 20, 4, 38, 37, 4, 3, 33, 31, 26, 1, 8, 1, 18],
  [15, 22, 23, 27, 29, 19, 33, 28, 11, 9, 8, 31, 16, 14, 16, 24, 29, 28, 27, 32, 8, 19, 10, 24, 32, 34],
  [24, 36, 16, 7, 1, 37, 39, 9, 3, 4, 12, 38, 18, 29, 15, 2, 11, 10, 11, 27, 0, 25, 3, 16, 15, 26, 8, 34, 36, 28, 18, 3, 32, 19, 12, 21, 31, 35, 23, 6, 12, 24, 20, 26, 9, 30, 36, 35],
  [27, 24, 17, 33, 35, 23, 37, 9, 5, 1, 18, 29, 9, 11, 33, 19, 13, 11, 0, 13, 33, 28, 1, 33, 17, 28, 4, 8, 26, 7, 19, 38, 1, 21, 35, 15],
  [10, 17, 30, 29, 29, 5, 5, 33, 17, 24, 4, 27, 18],
  [6, 9, 38, 6, 11, 39, 37, 31, 10, 20, 3, 5, 2, 0, 12, 15, 37, 30, 37, 2, 5, 14, 3, 36, 2, 14, 18, 3, 26, 37, 9, 3, 14, 9, 21, 10, 33, 33, 28, 9, 22, 30, 6, 21, 37, 22, 5, 15],
  [5, 35, 34, 19],
  [6, 34, 34, 3, 10, 9, 2, 15, 27, 6, 16],
  [22, 31, 3, 38, 25, 2, 22, 37, 16, 6, 11, 0, 14, 7, 16, 11, 12, 21, 5, 12, 35, 15, 28, 5, 4, 2, 37],
  [14, 27, 11, 3, 11, 19, 5, 39, 13, 35, 34, 31, 19, 20, 8, 13, 30, 5, 31, 26, 10, 7, 15, 16, 32, 15, 18, 12, 28, 33, 36, 9, 28, 22, 16, 26, 25, 18, 16, 11, 38, 39, 7, 32, 25, 38, 1, 39],
  [38, 25, 2, 24, 18, 21, 15, 7, 14, 36, 15, 29, 4, 32, 3, 2, 8, 28, 17, 32, 38, 24, 38, 9, 37, 9, 33, 33, 26, 32, 1, 18, 24, 39, 5],
  [0, 35, 3, 29, 4, 6, 22, 3, 34, 13, 21, 24, 32, 27, 2, 38, 4, 37, 12, 22, 2, 37, 6, 18, 15, 30, 19, 28],
  [18, 38, 18, 15, 2, 13, 13, 37, 8, 10, 13, 14, 10, 1, 2, 31, 10, 38, 36, 22, 20, 1, 2, 24, 33, 18, 35, 9, 33, 21, 31, 12],
  [6, 13, 33, 27, 24, 39, 14, 27, 12, 35, 26, 12, 36, 16, 37, 6, 2, 33, 30, 28, 0, 22],
  [4, 10, 17, 3, 3, 11, 32, 33, 12, 25, 17, 14, 18, 24, 29, 23, 38, 24, 2, 4, 30],
  [28, 15, 26, 39, 1, 22, 25, 2, 3, 23, 3, 23, 13, 2, 34, 15, 37, 17, 8, 10, 4, 25, 24, 8, 6, 17, 36, 11, 12, 29, 19, 35, 16, 19, 34, 27, 27, 6, 4, 21, 14, 7, 29, 11, 6, 1, 11, 8, 33, 31],
  [36, 33, 38, 5, 26, 8, 20, 24, 13, 29, 28, 10, 34, 2, 38, 34, 27, 36, 2, 19, 37, 38, 0, 27, 17, 4, 36, 2, 17, 35, 18, 10, 39, 8, 36, 33, 8, 11, 30, 0, 12, 39, 22, 5, 12, 29, 28, 24],
  [35, 36, 24, 18, 19, 28, 31, 24, 36, 10, 9, 18, 33, 25, 4, 8, 26, 8, 13, 30],
];

for (let test of tests) {
  console.time(test.toString());
  logOutList(maxWidthRamp(test));
  console.timeEnd(test.toString());
}

/*
[5,4,3,2,1]
[0,0,0,0,0]
[6, 0, 8, 2, 1, 5]
[9, 8, 1, 0, 1, 9, 4, 0, 4, 1]
[13, 27, 21, 39, 4, 6, 34, 35, 0, 33, 1, 28, 0, 23, 35, 7, 39, 2, 38, 8, 24, 20, 15, 17, 20, 11, 17, 39, 39, 29, 32, 21, 34, 10, 30, 19, 32, 37, 34, 0, 5, 5, 15]
[16, 22, 29, 20, 6, 16, 32, 13, 19, 10, 0]
[15, 39, 12]
[22, 5, 2, 14, 16, 16, 22, 19, 0, 29, 27, 34, 4, 20]
[2, 25, 24, 27, 11, 29, 18, 12, 5, 1, 19, 2, 35, 8, 8, 13, 24, 2, 22, 9, 33, 9]
[6, 7, 15, 11, 21, 28, 34, 21, 22, 39, 30, 10, 3, 22, 26]
[31, 1, 2, 7, 29, 5, 31, 9, 9, 7, 6, 23, 23, 16, 11, 33, 0, 12, 17, 13, 30, 18, 20, 1, 18, 20, 23, 35, 4, 39, 21, 34, 31, 10, 11, 3, 18]
[19, 32, 11, 39, 3, 15, 36, 1, 11, 31, 18, 8, 11, 20, 23, 12, 24, 39, 13, 0, 0, 33, 9, 16, 7, 23, 34, 12, 11, 9, 27, 3, 9, 27, 3, 28]
[11, 37, 9, 9, 26, 15, 2, 21, 7, 21, 3, 21, 9, 30, 12, 31, 12, 29, 21, 11, 37, 13, 37, 1, 14, 35, 13, 38, 23, 25, 31, 7, 31, 27, 5, 0, 0]
[29, 14, 38, 22, 18, 15, 29, 11, 30, 0, 36, 14, 34, 5, 14, 14, 20, 18, 24, 31, 23, 8, 22, 35, 17, 4, 11, 26, 21]
[13, 35, 3, 38, 14, 16, 4, 37, 2, 1, 29, 27, 0, 1, 38, 5, 9, 25, 7, 20]
[36, 9, 39, 25, 11, 26, 20, 8, 27, 0, 28, 1, 8, 31, 16, 22, 0, 9, 3, 14, 26, 24, 38, 35, 16, 16, 39, 27, 20, 16, 9, 32, 2, 5]
[15, 38, 14, 19, 25, 11, 39, 8, 28, 1, 39, 26, 8, 17, 14, 36, 13, 10, 33, 37, 37, 17, 8, 5, 11, 0, 30, 3, 5, 15]
[16, 38, 20, 15, 39, 7, 22, 38, 29, 33, 29, 8, 5, 31, 27, 39, 28, 19, 29, 5, 33, 10, 20, 19, 1, 15, 33, 4, 16, 23, 20, 15, 10, 26, 8, 35, 18, 36, 9, 30, 13, 19, 33, 0, 28, 7, 19]
[15, 20, 10, 24, 24, 11, 39, 23, 24, 23, 32, 13, 13, 35, 0, 14, 32, 28, 18, 6, 16, 19, 7, 11, 11, 8, 38, 7, 22, 3, 9, 7, 20, 7, 5, 26, 20, 8, 37, 4, 23, 8, 0, 34]
[10, 39, 11, 1, 11, 31, 9]
[33, 31, 11, 6, 7, 39, 39, 24, 12, 39, 14, 3, 33, 33, 36, 31, 13, 2, 12, 16, 30, 11, 30, 1, 4, 20, 12, 10, 36, 19, 30, 16, 0, 11, 25, 17, 22, 3, 19]
[10, 33, 22, 9, 26, 34, 16, 27, 25, 2, 31, 9, 1, 7, 3, 38, 34, 35, 5, 35, 20, 23, 6, 38, 35, 17, 28, 39, 25, 27, 30, 19]
[11, 35, 25, 25, 0, 4, 21, 2, 5, 37, 31, 6, 37, 35, 34, 39, 9, 23, 11]
[15, 24, 16, 12, 36, 7, 10, 32, 15, 22, 9, 24, 24, 14, 18, 37, 32, 17, 6, 14, 11, 38, 36, 1, 26, 0, 33, 17, 35, 14, 21, 24, 37, 18, 3, 21, 23, 35, 12, 38, 19, 11, 11]
[19, 30, 32, 1, 25, 21, 25, 15, 32, 2, 17, 6, 31, 38, 9, 15, 14, 2, 32, 2, 14, 18, 34, 28, 14, 6, 22, 11, 36]
[39, 5, 22, 25, 34, 31, 39, 30, 22, 32, 34, 14, 20, 31, 14, 14, 37, 9, 37, 39, 30, 18, 10, 32, 18, 0, 38, 33, 6, 13, 16, 32, 0, 24, 18, 25, 0, 29, 28, 38, 31, 28, 25]
[10, 11, 30, 33, 25, 39, 27, 3, 17, 19, 3, 21, 6, 10]
[1, 20, 16, 39, 13, 29, 20, 26, 31, 36, 8, 1, 25, 16, 9, 36, 15, 8, 13, 39, 5, 29, 9, 37, 15, 4, 24, 37, 18, 12, 38, 34, 5]
[17, 4, 32, 32, 34, 39, 15, 36, 38, 26, 6, 15, 11, 18, 16, 2, 2, 28, 29, 36, 2, 6, 9, 15, 28, 6, 25, 39, 22, 19]
[27, 17, 11, 23, 26, 27, 39, 8, 38, 15, 36, 3, 29, 12, 29, 33, 6, 6, 12, 14, 23, 37, 0, 34, 25, 25, 29, 22, 21, 38, 35]
[10, 12, 24, 4, 32, 2, 5, 36, 15, 36, 10, 28, 25, 7, 16, 37, 27, 6, 33, 8, 26, 32, 5, 36, 31, 12, 9, 18, 33, 12, 39, 23]
[9, 24, 12, 18, 20, 11, 16, 36, 34, 7, 15, 34, 33, 28, 31, 7, 16, 12, 3, 31, 35, 36, 5, 8, 14, 10, 32, 27, 28, 17, 6, 36, 2, 1, 30]
[31, 36, 22, 22, 9, 33, 14, 10, 14, 39, 10, 35, 35, 17, 20, 18, 2, 1, 25, 36, 30, 17, 27, 25]
[6, 37, 7, 34, 7, 17, 33, 34, 13, 12, 25, 26, 8, 38, 11, 1, 27, 2, 3, 11, 19, 9, 5, 37, 2, 26, 38, 7, 35]
[5]
[4, 12, 35, 34, 29, 31, 32, 31, 20, 37, 39, 35, 34, 11, 1, 11, 34, 27, 9, 18, 20, 20, 27, 5]
[19, 20, 9, 32, 14, 1, 10, 34, 21, 30]
[27, 37, 26, 37, 36, 6, 4, 22]
[37, 5, 1, 20, 19, 3, 8, 8, 2, 17, 11, 14, 13, 17, 32, 17, 30, 37, 9, 5, 11, 12, 12, 27, 37, 26, 18, 27, 37, 31, 39, 26, 12, 33, 17, 13, 35, 20, 35, 35, 29, 11, 13]
[24, 17, 11, 14, 15, 31, 9, 26, 2, 28, 34, 21, 19, 34, 38, 35, 27, 22, 38, 36, 32, 14, 37, 2, 1, 6, 0, 1, 19, 11]
[10, 36, 24, 1, 20, 1, 30, 4, 30, 13, 37, 4, 33, 27, 39, 37, 0, 17, 28, 6, 21, 0, 1, 22, 32, 15, 4, 27, 7, 7, 2, 31, 21, 36, 38, 35, 0, 24, 29, 33, 16, 4, 23, 39, 24, 9, 19, 14, 35, 19]
[2, 29, 13, 28, 2, 6, 11, 9, 7, 22, 19, 14, 18, 14, 24, 36, 22, 23, 39, 30]
[32, 17, 30, 20, 34, 19, 25, 36, 39, 13, 35, 36, 27, 9, 10, 2, 17, 35, 24, 13, 26, 37, 32, 1, 13, 39, 1, 4, 38, 37, 6, 0, 9, 35, 4, 15, 38, 28, 5, 22, 30, 7, 36, 23, 38, 2]
[28, 22, 4, 8, 6, 39, 22, 36, 13, 19, 9, 4, 22, 1, 10, 10, 21, 36, 15, 26, 38, 37, 17, 1, 15, 24, 11, 6, 24, 18, 2, 36, 30, 6, 6, 16, 2, 4, 16, 28, 8, 18, 23]
[15, 16, 37, 1, 13, 21, 25, 15, 12, 15, 27, 12, 31, 2, 27, 10, 34, 30, 6, 37, 18, 17, 27, 12, 22, 0, 37, 14, 7, 36, 13, 11, 37, 27, 27, 15, 7, 29]
[22, 15, 12, 0, 4, 7, 35, 13, 38, 23, 34, 21, 5, 20, 7, 19, 15, 14, 19]
[17, 21, 10, 29, 14, 1, 21, 14, 20, 19, 20, 4, 38, 37, 4, 3, 33, 31, 26, 1, 8, 1, 18]
[15, 22, 23, 27, 29, 19, 33, 28, 11, 9, 8, 31, 16, 14, 16, 24, 29, 28, 27, 32, 8, 19, 10, 24, 32, 34]
[24, 36, 16, 7, 1, 37, 39, 9, 3, 4, 12, 38, 18, 29, 15, 2, 11, 10, 11, 27, 0, 25, 3, 16, 15, 26, 8, 34, 36, 28, 18, 3, 32, 19, 12, 21, 31, 35, 23, 6, 12, 24, 20, 26, 9, 30, 36, 35]
[27, 24, 17, 33, 35, 23, 37, 9, 5, 1, 18, 29, 9, 11, 33, 19, 13, 11, 0, 13, 33, 28, 1, 33, 17, 28, 4, 8, 26, 7, 19, 38, 1, 21, 35, 15]
[10, 17, 30, 29, 29, 5, 5, 33, 17, 24, 4, 27, 18]
[6, 9, 38, 6, 11, 39, 37, 31, 10, 20, 3, 5, 2, 0, 12, 15, 37, 30, 37, 2, 5, 14, 3, 36, 2, 14, 18, 3, 26, 37, 9, 3, 14, 9, 21, 10, 33, 33, 28, 9, 22, 30, 6, 21, 37, 22, 5, 15]
[5, 35, 34, 19]
[6, 34, 34, 3, 10, 9, 2, 15, 27, 6, 16]
[22, 31, 3, 38, 25, 2, 22, 37, 16, 6, 11, 0, 14, 7, 16, 11, 12, 21, 5, 12, 35, 15, 28, 5, 4, 2, 37]
[14, 27, 11, 3, 11, 19, 5, 39, 13, 35, 34, 31, 19, 20, 8, 13, 30, 5, 31, 26, 10, 7, 15, 16, 32, 15, 18, 12, 28, 33, 36, 9, 28, 22, 16, 26, 25, 18, 16, 11, 38, 39, 7, 32, 25, 38, 1, 39]
[38, 25, 2, 24, 18, 21, 15, 7, 14, 36, 15, 29, 4, 32, 3, 2, 8, 28, 17, 32, 38, 24, 38, 9, 37, 9, 33, 33, 26, 32, 1, 18, 24, 39, 5]
[0, 35, 3, 29, 4, 6, 22, 3, 34, 13, 21, 24, 32, 27, 2, 38, 4, 37, 12, 22, 2, 37, 6, 18, 15, 30, 19, 28]
[18, 38, 18, 15, 2, 13, 13, 37, 8, 10, 13, 14, 10, 1, 2, 31, 10, 38, 36, 22, 20, 1, 2, 24, 33, 18, 35, 9, 33, 21, 31, 12]
[6, 13, 33, 27, 24, 39, 14, 27, 12, 35, 26, 12, 36, 16, 37, 6, 2, 33, 30, 28, 0, 22]
[4, 10, 17, 3, 3, 11, 32, 33, 12, 25, 17, 14, 18, 24, 29, 23, 38, 24, 2, 4, 30]
[28, 15, 26, 39, 1, 22, 25, 2, 3, 23, 3, 23, 13, 2, 34, 15, 37, 17, 8, 10, 4, 25, 24, 8, 6, 17, 36, 11, 12, 29, 19, 35, 16, 19, 34, 27, 27, 6, 4, 21, 14, 7, 29, 11, 6, 1, 11, 8, 33, 31]
[36, 33, 38, 5, 26, 8, 20, 24, 13, 29, 28, 10, 34, 2, 38, 34, 27, 36, 2, 19, 37, 38, 0, 27, 17, 4, 36, 2, 17, 35, 18, 10, 39, 8, 36, 33, 8, 11, 30, 0, 12, 39, 22, 5, 12, 29, 28, 24]
[35, 36, 24, 18, 19, 28, 31, 24, 36, 10, 9, 18, 33, 25, 4, 8, 26, 8, 13, 30]
*/