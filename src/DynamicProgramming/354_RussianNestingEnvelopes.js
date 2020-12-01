/*
You have a number of envelopes with widths and heights given as a pair of integers (w, h). One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.

What is the maximum number of envelopes can you Russian doll? (put one inside other)

Note:
Rotation is not allowed.

Example:

Input: [[5,4],[6,4],[6,7],[2,3]]
Output: 3 
Explanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).
*/


// brute force O(n^2 + nlogn)
var maxEnvelopes = function (envelopes) {
  envelopes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let maxNested = Math.min(1, envelopes.length);
  const countNested = new Array(envelopes.length).fill(1);

  for (let i = 1; i < envelopes.length; i += 1) {
    const [currW, currH] = envelopes[i];
    for (let j = i - 1; j >= 0; j -= 1) {
      const [nextW, nextH] = envelopes[j];
      if(nextW < currW && nextH < currH) {
        countNested[i] = Math.max(countNested[i], countNested[j] + 1);
      }
    }

    maxNested = Math.max(maxNested, countNested[i]);
  }

  return maxNested;
};

// longest decreasing subsequence O(nlogn)
var maxEnvelopes = function (envelopes) {
  const increasingSequence = [Infinity];

  envelopes
    .sort((a, b) => b[0] - a[0] || a[1] - b[1])
    .forEach(([_, height]) => {
      const firstTallerIdx = getFirstShorterIdx(increasingSequence, height);

      if (firstTallerIdx < 0) {
        increasingSequence.push(height);
      } else {
        increasingSequence[firstTallerIdx] = height;
      }
    });

  return increasingSequence.length - 1;
};

const getFirstShorterIdx = (arr, target) => {
  if (arr[arr.length - 1] > target) return -1;

  let left = 0;
  let right = arr.length - 1;
  let mid;

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return right;
}

// for (let i = 0; i < 20; i += 1) {
//   const numEnvelopes = Math.floor(Math.random() * 100);

//   const envelopes = [];
//   for (let j = 0; j < numEnvelopes; j += 1) {
//     const w = Math.floor(Math.random() * 50);
//     const h = Math.floor(Math.random() * 50);
//     envelopes.push([w, h]);
//   }

//   logOutList(printGrid(envelopes));
// }


const tests = [
  [[5, 4], [6, 4], [6, 7], [2, 3]],
  [[12, 35], [22, 46], [46, 21], [13, 29], [49, 27], [20, 41], [39, 42], [14, 41], [11, 18], [12, 15], [10, 41], [10, 21], [19, 38], [6, 42], [5, 20], [0, 9], [1, 22], [17, 24], [32, 16], [40, 49], [37, 24], [34, 37], [7, 14], [35, 37], [14, 16], [32, 27], [5, 43], [46, 13], [43, 33], [46, 41], [18, 14], [7, 15], [6, 13], [0, 26], [37, 5], [9, 25], [7, 15], [18, 43], [48, 21], [29, 44], [38, 37], [8, 24], [33, 37], [44, 13], [38, 31], [28, 19], [18, 22], [25, 0], [27, 22], [48, 15], [3, 34], [20, 4], [35, 38], [25, 33], [18, 14], [9, 36], [17, 6], [38, 45], [37, 41], [24, 23], [6, 24], [2, 13], [17, 27], [35, 26], [6, 21], [41, 17], [16, 22], [25, 6], [13, 25], [39, 34], [6, 4], [42, 1], [20, 30], [47, 25], [27, 14], [8, 33], [44, 4], [34, 35], [38, 0], [3, 3], [44, 31], [44, 37], [21, 42], [1, 29], [23, 39], [15, 14], [44, 32], [8, 48], [47, 0], [10, 39], [34, 49]],
  [[28, 15], [8, 16], [34, 19], [19, 18], [15, 11], [48, 13], [26, 10], [11, 24], [34, 5], [4, 42], [22, 38], [12, 33], [7, 26], [45, 7], [40, 12], [42, 39], [45, 12], [20, 8], [28, 29], [14, 49], [30, 23], [13, 32], [26, 24], [14, 41], [15, 30], [33, 26], [48, 18], [28, 2], [33, 17], [45, 32], [26, 20], [49, 0], [6, 1], [23, 7], [28, 40], [47, 3], [1, 3], [4, 42], [44, 33], [9, 29], [41, 13], [47, 8], [48, 15], [26, 31], [34, 26], [23, 35], [40, 42], [45, 47], [34, 44], [33, 33], [16, 25], [48, 9], [2, 7], [30, 16], [1, 7], [34, 44], [12, 25], [23, 19], [1, 0], [47, 21], [32, 22], [14, 30], [49, 22], [40, 11], [44, 40], [29, 33], [40, 46]],
  [[3, 34], [35, 19], [12, 40], [37, 35], [22, 34], [16, 1], [31, 27], [15, 38], [13, 14], [45, 20], [26, 13], [33, 31], [14, 6], [30, 8], [36, 15], [22, 34], [40, 8], [13, 16], [18, 0], [27, 48], [12, 15], [47, 3]],
  [[0, 34], [45, 21], [33, 8], [44, 5], [42, 35], [31, 41], [16, 0], [0, 21], [41, 39], [46, 24], [15, 25], [10, 19], [42, 33], [22, 18], [1, 17], [33, 29], [33, 48], [48, 13], [30, 21], [43, 38], [34, 43], [16, 4], [12, 40], [8, 32], [37, 21], [30, 28], [26, 8], [37, 49], [33, 19], [1, 4], [11, 30], [7, 5], [39, 16], [14, 38], [2, 12], [29, 41], [19, 28], [22, 48]],
  [[16, 27], [15, 25], [4, 37], [9, 41], [0, 19], [45, 30], [42, 46], [42, 31], [29, 20], [13, 40], [16, 3], [14, 48], [34, 44], [22, 9], [16, 42], [24, 0], [13, 37], [36, 19], [48, 5], [19, 33], [3, 5], [5, 45], [0, 39], [41, 44], [49, 15], [9, 39], [9, 2], [1, 31], [40, 46], [36, 47], [24, 45], [22, 34], [34, 38], [42, 45], [35, 47], [42, 41], [45, 0], [26, 39], [12, 12], [1, 8], [28, 7], [46, 11], [42, 28], [22, 2], [9, 25], [41, 19], [33, 37], [31, 27], [37, 35], [14, 20], [11, 40], [21, 42], [30, 12], [21, 3], [20, 30], [27, 25], [24, 39], [28, 33], [39, 14], [37, 36], [14, 12], [24, 39], [4, 23], [42, 37], [29, 23], [4, 47], [42, 25], [11, 40], [20, 17], [3, 22], [47, 15], [40, 40], [23, 36], [47, 41], [7, 24], [37, 13], [18, 27], [34, 19], [43, 21], [17, 4], [6, 24], [8, 35], [5, 46], [38, 3], [33, 19], [11, 37]],
  [[28, 10], [6, 45], [13, 1], [6, 46], [8, 25], [42, 39], [41, 39], [14, 21], [17, 14], [45, 43], [31, 32], [28, 42], [49, 35], [2, 4], [2, 21], [13, 33], [29, 0], [15, 38], [36, 30], [16, 2], [35, 16], [48, 44], [19, 20], [29, 26], [2, 20], [37, 35], [10, 38], [47, 10], [42, 18], [3, 2], [33, 48], [13, 11], [42, 13], [48, 35], [20, 32], [41, 25], [10, 44], [10, 4], [14, 39], [22, 10], [36, 42], [25, 15], [24, 23], [8, 9], [32, 26], [5, 19], [29, 42], [4, 45], [21, 3], [4, 2], [35, 38], [40, 2], [25, 17], [10, 21], [9, 13], [16, 18], [7, 29], [30, 48], [36, 44], [30, 29], [16, 22], [6, 42], [23, 41], [4, 21], [22, 18], [24, 22], [42, 27], [21, 47], [4, 43], [37, 29], [23, 22], [35, 6]],
  [[19, 22], [48, 35], [29, 18], [29, 38], [1, 33], [22, 1], [37, 28], [26, 31], [24, 22], [46, 29], [12, 30], [25, 41], [39, 9], [22, 25], [29, 4], [2, 4], [27, 32], [44, 7], [17, 35], [44, 14], [43, 26], [30, 20], [1, 13], [47, 20], [13, 16], [5, 15], [15, 35], [27, 4], [19, 35], [22, 1], [29, 3], [39, 47], [5, 22], [31, 17], [43, 46], [32, 11], [6, 25], [32, 8], [27, 15], [4, 30], [21, 30], [28, 40], [7, 17], [32, 10], [1, 39], [41, 16], [16, 38], [34, 35], [4, 32], [2, 17], [22, 3], [48, 25], [32, 10], [23, 29], [21, 6]],
  [[6, 22], [38, 46], [31, 10], [12, 16], [16, 30], [44, 44], [29, 40], [28, 21], [39, 44], [36, 25], [44, 23], [0, 48], [9, 26], [5, 26], [36, 23], [15, 27], [5, 28], [23, 12], [33, 20], [13, 41], [37, 31], [7, 11], [18, 48], [44, 12], [43, 49], [46, 38], [1, 1], [29, 22], [46, 30], [13, 9], [12, 4], [8, 36], [24, 42], [32, 17], [31, 48], [34, 16], [18, 48], [10, 46], [47, 22], [4, 20], [15, 15], [41, 46], [31, 35], [19, 22], [0, 29], [4, 10], [34, 35], [45, 6], [9, 2]],
  [[21, 41], [17, 39], [17, 18], [16, 40], [24, 20], [5, 48], [23, 21], [25, 5], [18, 45], [9, 29], [37, 43], [29, 2], [3, 11], [32, 49], [18, 48], [17, 25], [38, 42], [17, 5], [23, 7], [33, 2], [28, 7], [24, 16], [14, 9], [8, 27], [8, 1], [46, 15], [14, 37], [44, 34], [44, 16], [35, 15], [47, 46], [47, 9], [8, 2], [34, 15], [44, 0], [16, 12], [26, 46], [21, 11], [39, 9], [6, 3], [24, 7], [29, 46], [24, 46]],
  [[47, 31], [11, 34], [43, 6], [0, 20], [8, 2], [44, 26], [31, 14], [47, 25], [6, 17], [39, 44], [35, 40], [24, 13], [30, 36], [12, 42], [26, 27], [7, 28], [25, 18], [24, 23], [22, 29], [47, 18], [46, 25], [37, 42], [15, 27], [27, 17], [22, 38], [10, 19], [7, 24], [13, 6], [39, 16], [20, 26], [42, 10], [7, 31], [20, 47], [37, 18], [16, 45], [27, 46], [18, 26], [32, 18], [47, 46], [17, 10], [12, 18], [18, 37], [34, 40], [37, 7], [18, 0], [28, 7], [17, 28], [38, 46], [38, 5], [3, 7], [21, 35], [7, 9], [20, 45], [16, 34], [24, 21], [10, 39], [0, 11], [5, 28], [25, 34], [47, 34], [22, 3], [5, 31], [40, 19], [22, 21], [11, 29], [33, 21], [12, 35], [36, 35], [42, 1], [32, 10], [15, 13], [49, 9], [26, 9], [19, 20], [2, 41], [28, 13], [4, 34], [15, 18], [11, 12], [13, 41], [43, 44], [31, 36], [1, 18], [19, 37], [41, 2], [3, 25], [41, 38], [42, 48], [39, 16], [1, 8], [11, 12], [23, 15], [37, 44], [43, 40], [4, 40], [23, 27]],
  [[28, 15]],
  [[31, 23], [13, 29], [2, 20], [22, 16], [31, 6], [2, 13], [32, 26], [29, 29], [4, 18], [8, 6], [3, 31], [47, 9], [11, 4], [43, 7], [0, 35], [27, 0], [19, 8], [15, 23], [17, 40], [33, 45], [30, 3], [10, 19], [41, 8], [48, 27], [13, 16], [19, 7], [1, 41], [21, 9], [8, 28], [24, 36], [13, 38], [43, 5], [11, 22], [27, 21], [34, 17], [32, 38], [23, 39], [15, 15], [31, 0], [41, 31], [29, 23], [49, 15], [25, 39], [6, 3], [43, 2], [19, 33], [16, 1], [3, 15], [4, 9], [46, 30], [27, 1], [29, 28], [22, 21], [4, 34], [31, 9], [24, 13], [35, 14], [39, 46], [40, 34], [7, 49], [8, 14], [48, 33], [46, 49], [22, 18], [29, 27], [40, 11], [49, 4], [31, 10], [39, 46], [8, 35], [37, 29], [2, 39], [31, 39]],
  [[44, 6], [10, 40], [5, 44], [16, 42], [10, 1], [13, 33], [23, 36], [21, 21], [10, 44], [14, 35], [41, 0], [9, 17], [17, 22], [32, 38], [34, 23], [43, 26], [32, 33], [44, 29], [45, 28], [6, 34], [47, 46], [13, 26], [1, 43], [5, 11], [35, 4], [38, 15], [21, 19], [15, 26], [28, 44], [28, 40], [16, 8], [41, 17], [42, 29], [37, 40], [37, 41], [0, 9], [35, 22], [6, 38], [32, 11], [18, 44], [28, 27], [36, 33], [39, 38], [45, 2]],
  [[48, 31], [30, 19], [15, 12], [16, 3], [32, 47], [9, 26], [10, 44], [3, 0], [49, 20], [14, 30], [13, 0], [12, 4], [26, 47], [39, 23], [13, 38], [14, 0], [13, 21], [12, 27], [43, 46], [12, 49], [39, 28], [5, 23], [40, 28], [49, 27], [4, 20], [12, 31], [47, 31], [35, 37], [8, 39], [28, 12], [29, 13], [40, 12], [6, 21]],
  [[46, 8], [0, 16], [34, 40], [16, 33], [19, 25], [7, 32], [13, 7], [48, 25], [23, 20], [11, 28], [24, 11], [30, 45], [36, 30], [38, 9], [15, 31], [31, 20], [49, 42], [49, 49], [41, 34], [36, 44], [39, 8], [14, 11], [35, 10], [16, 31], [48, 5], [15, 43], [3, 39], [34, 28], [29, 46], [26, 11], [3, 11], [10, 19], [2, 29], [11, 7], [19, 29], [35, 18], [23, 12], [9, 11], [37, 17], [32, 25], [7, 3], [31, 9], [25, 39], [2, 33], [4, 40], [32, 5], [44, 24], [5, 44], [21, 38], [29, 34], [36, 46], [14, 41], [37, 24], [36, 16], [30, 31], [28, 11], [15, 16], [43, 24], [33, 27], [30, 17], [4, 45], [37, 16]],
  [[24, 45], [21, 16], [30, 22], [25, 10], [40, 17], [3, 48], [5, 37], [48, 49], [44, 27], [21, 11], [37, 12], [32, 39], [47, 7], [28, 47], [9, 17], [1, 23]],
  [[49, 11], [36, 4], [43, 42], [22, 2], [45, 38], [29, 14], [47, 11], [46, 31], [21, 7], [43, 7], [20, 17], [48, 7], [10, 34], [47, 10], [42, 24], [17, 4], [1, 34], [7, 37], [16, 32], [16, 28], [29, 11], [3, 36], [19, 49], [21, 9], [47, 14], [14, 14], [3, 14], [33, 20], [8, 34], [48, 8], [2, 33], [36, 47], [5, 18], [31, 26], [2, 45], [13, 44], [3, 4], [28, 19], [10, 16], [24, 14], [19, 14], [34, 15], [45, 7], [20, 9], [18, 36], [3, 4], [41, 47], [37, 16], [19, 27]],
  [[37, 43], [5, 5], [42, 11], [34, 11], [24, 21], [24, 22], [17, 35], [31, 6], [20, 6], [14, 22], [2, 22], [8, 42], [7, 6], [14, 21], [40, 5], [0, 39], [24, 27], [2, 30], [47, 7], [37, 19], [43, 15], [7, 30], [1, 7], [8, 27], [3, 42], [36, 10], [2, 16], [43, 31], [0, 12], [8, 36], [5, 38], [9, 19], [36, 13], [46, 11], [4, 47], [34, 48], [33, 27], [7, 37], [31, 29], [31, 37], [19, 46], [39, 7], [39, 3], [32, 0], [11, 15], [1, 35], [41, 11], [32, 30], [15, 25], [28, 29], [0, 43], [42, 26], [48, 45], [30, 42], [37, 13], [42, 12], [7, 21], [14, 29], [32, 24], [41, 1], [48, 28], [11, 28], [45, 47], [6, 17], [28, 31], [23, 49], [49, 22], [48, 26], [42, 35], [47, 24], [13, 2], [40, 22], [28, 9], [30, 38], [1, 45], [42, 27], [34, 28], [26, 31], [45, 18], [25, 32], [45, 46], [45, 5], [15, 17], [2, 43], [23, 44], [49, 18], [14, 3], [40, 47], [42, 25], [22, 38], [40, 4], [5, 4], [19, 47], [19, 44]],
  [[19, 29], [8, 2], [39, 22], [48, 46], [47, 32], [34, 29], [28, 22], [6, 45], [31, 6], [14, 19], [13, 24], [45, 37], [36, 4], [47, 21], [34, 13], [21, 42], [2, 35], [20, 39], [33, 21], [10, 25], [8, 39], [12, 37], [31, 19], [44, 21], [11, 3], [25, 22], [36, 15], [31, 23], [41, 29], [14, 17], [48, 1], [7, 9], [5, 28], [30, 26], [39, 30], [19, 19], [10, 42], [20, 33], [33, 0], [25, 7], [29, 49], [19, 21], [47, 12], [37, 5], [34, 32], [6, 49], [13, 3], [23, 5], [41, 1], [24, 20], [9, 48], [4, 22], [17, 6], [38, 32], [2, 3], [4, 41], [36, 0], [30, 46], [25, 6], [41, 28], [15, 41], [15, 16], [8, 45], [22, 18], [25, 10], [22, 20], [22, 38], [4, 4], [32, 30], [0, 32], [48, 49], [2, 21], [48, 36], [18, 44], [39, 15], [12, 22], [15, 29], [9, 5], [28, 19], [37, 3], [5, 33], [20, 29], [15, 44], [14, 13]],
  [[30, 46], [48, 27], [36, 34], [35, 12], [30, 1], [33, 27], [36, 11], [31, 39], [17, 17], [8, 22], [7, 1], [42, 44], [5, 21], [46, 41], [31, 47], [48, 35], [43, 43], [45, 14], [19, 47], [10, 28], [15, 13], [37, 13], [40, 15], [3, 20], [47, 11], [33, 32], [37, 32], [30, 12], [33, 3], [19, 40], [6, 12], [14, 20], [39, 35], [19, 1], [28, 28], [19, 14], [34, 1], [34, 35], [18, 1], [5, 29], [48, 5], [30, 40], [0, 23], [11, 9], [42, 35], [26, 36], [32, 12], [24, 1], [19, 18], [48, 35], [45, 30], [14, 27], [7, 33], [24, 8], [42, 5], [19, 20], [37, 5], [22, 26], [25, 6], [43, 48], [25, 25], [3, 5], [1, 8], [10, 10], [20, 7], [0, 15], [0, 16], [25, 15], [41, 35], [21, 33], [20, 27], [21, 1], [42, 2], [7, 14], [24, 4], [5, 19], [13, 31], [11, 9], [46, 1], [32, 30], [5, 23], [47, 29], [28, 41], [28, 0], [37, 32], [4, 9], [7, 24], [26, 3], [11, 6], [7, 5], [36, 38], [13, 17], [26, 42], [34, 23], [33, 10]],
];

for (let test of tests) {
  logOutList(maxEnvelopes(test));
}

/*
[[12, 35], [22, 46], [46, 21], [13, 29], [49, 27], [20, 41], [39, 42], [14, 41], [11, 18], [12, 15], [10, 41], [10, 21], [19, 38], [6, 42], [5, 20], [0, 9], [1, 22], [17, 24], [32, 16], [40, 49], [37, 24], [34, 37], [7, 14], [35, 37], [14, 16], [32, 27], [5, 43], [46, 13], [43, 33], [46, 41], [18, 14], [7, 15], [6, 13], [0, 26], [37, 5], [9, 25], [7, 15], [18, 43], [48, 21], [29, 44], [38, 37], [8, 24], [33, 37], [44, 13], [38, 31], [28, 19], [18, 22], [25, 0], [27, 22], [48, 15], [3, 34], [20, 4], [35, 38], [25, 33], [18, 14], [9, 36], [17, 6], [38, 45], [37, 41], [24, 23], [6, 24], [2, 13], [17, 27], [35, 26], [6, 21], [41, 17], [16, 22], [25, 6], [13, 25], [39, 34], [6, 4], [42, 1], [20, 30], [47, 25], [27, 14], [8, 33], [44, 4], [34, 35], [38, 0], [3, 3], [44, 31], [44, 37], [21, 42], [1, 29], [23, 39], [15, 14], [44, 32], [8, 48], [47, 0], [10, 39], [34, 49]]
[[28, 15], [8, 16], [34, 19], [19, 18], [15, 11], [48, 13], [26, 10], [11, 24], [34, 5], [4, 42], [22, 38], [12, 33], [7, 26], [45, 7], [40, 12], [42, 39], [45, 12], [20, 8], [28, 29], [14, 49], [30, 23], [13, 32], [26, 24], [14, 41], [15, 30], [33, 26], [48, 18], [28, 2], [33, 17], [45, 32], [26, 20], [49, 0], [6, 1], [23, 7], [28, 40], [47, 3], [1, 3], [4, 42], [44, 33], [9, 29], [41, 13], [47, 8], [48, 15], [26, 31], [34, 26], [23, 35], [40, 42], [45, 47], [34, 44], [33, 33], [16, 25], [48, 9], [2, 7], [30, 16], [1, 7], [34, 44], [12, 25], [23, 19], [1, 0], [47, 21], [32, 22], [14, 30], [49, 22], [40, 11], [44, 40], [29, 33], [40, 46]]
[[3, 34], [35, 19], [12, 40], [37, 35], [22, 34], [16, 1], [31, 27], [15, 38], [13, 14], [45, 20], [26, 13], [33, 31], [14, 6], [30, 8], [36, 15], [22, 34], [40, 8], [13, 16], [18, 0], [27, 48], [12, 15], [47, 3]]
[[0, 34], [45, 21], [33, 8], [44, 5], [42, 35], [31, 41], [16, 0], [0, 21], [41, 39], [46, 24], [15, 25], [10, 19], [42, 33], [22, 18], [1, 17], [33, 29], [33, 48], [48, 13], [30, 21], [43, 38], [34, 43], [16, 4], [12, 40], [8, 32], [37, 21], [30, 28], [26, 8], [37, 49], [33, 19], [1, 4], [11, 30], [7, 5], [39, 16], [14, 38], [2, 12], [29, 41], [19, 28], [22, 48]]
[[16, 27], [15, 25], [4, 37], [9, 41], [0, 19], [45, 30], [42, 46], [42, 31], [29, 20], [13, 40], [16, 3], [14, 48], [34, 44], [22, 9], [16, 42], [24, 0], [13, 37], [36, 19], [48, 5], [19, 33], [3, 5], [5, 45], [0, 39], [41, 44], [49, 15], [9, 39], [9, 2], [1, 31], [40, 46], [36, 47], [24, 45], [22, 34], [34, 38], [42, 45], [35, 47], [42, 41], [45, 0], [26, 39], [12, 12], [1, 8], [28, 7], [46, 11], [42, 28], [22, 2], [9, 25], [41, 19], [33, 37], [31, 27], [37, 35], [14, 20], [11, 40], [21, 42], [30, 12], [21, 3], [20, 30], [27, 25], [24, 39], [28, 33], [39, 14], [37, 36], [14, 12], [24, 39], [4, 23], [42, 37], [29, 23], [4, 47], [42, 25], [11, 40], [20, 17], [3, 22], [47, 15], [40, 40], [23, 36], [47, 41], [7, 24], [37, 13], [18, 27], [34, 19], [43, 21], [17, 4], [6, 24], [8, 35], [5, 46], [38, 3], [33, 19], [11, 37]]
[[28, 10], [6, 45], [13, 1], [6, 46], [8, 25], [42, 39], [41, 39], [14, 21], [17, 14], [45, 43], [31, 32], [28, 42], [49, 35], [2, 4], [2, 21], [13, 33], [29, 0], [15, 38], [36, 30], [16, 2], [35, 16], [48, 44], [19, 20], [29, 26], [2, 20], [37, 35], [10, 38], [47, 10], [42, 18], [3, 2], [33, 48], [13, 11], [42, 13], [48, 35], [20, 32], [41, 25], [10, 44], [10, 4], [14, 39], [22, 10], [36, 42], [25, 15], [24, 23], [8, 9], [32, 26], [5, 19], [29, 42], [4, 45], [21, 3], [4, 2], [35, 38], [40, 2], [25, 17], [10, 21], [9, 13], [16, 18], [7, 29], [30, 48], [36, 44], [30, 29], [16, 22], [6, 42], [23, 41], [4, 21], [22, 18], [24, 22], [42, 27], [21, 47], [4, 43], [37, 29], [23, 22], [35, 6]]
[[19, 22], [48, 35], [29, 18], [29, 38], [1, 33], [22, 1], [37, 28], [26, 31], [24, 22], [46, 29], [12, 30], [25, 41], [39, 9], [22, 25], [29, 4], [2, 4], [27, 32], [44, 7], [17, 35], [44, 14], [43, 26], [30, 20], [1, 13], [47, 20], [13, 16], [5, 15], [15, 35], [27, 4], [19, 35], [22, 1], [29, 3], [39, 47], [5, 22], [31, 17], [43, 46], [32, 11], [6, 25], [32, 8], [27, 15], [4, 30], [21, 30], [28, 40], [7, 17], [32, 10], [1, 39], [41, 16], [16, 38], [34, 35], [4, 32], [2, 17], [22, 3], [48, 25], [32, 10], [23, 29], [21, 6]]
[[6, 22], [38, 46], [31, 10], [12, 16], [16, 30], [44, 44], [29, 40], [28, 21], [39, 44], [36, 25], [44, 23], [0, 48], [9, 26], [5, 26], [36, 23], [15, 27], [5, 28], [23, 12], [33, 20], [13, 41], [37, 31], [7, 11], [18, 48], [44, 12], [43, 49], [46, 38], [1, 1], [29, 22], [46, 30], [13, 9], [12, 4], [8, 36], [24, 42], [32, 17], [31, 48], [34, 16], [18, 48], [10, 46], [47, 22], [4, 20], [15, 15], [41, 46], [31, 35], [19, 22], [0, 29], [4, 10], [34, 35], [45, 6], [9, 2]]
[[21, 41], [17, 39], [17, 18], [16, 40], [24, 20], [5, 48], [23, 21], [25, 5], [18, 45], [9, 29], [37, 43], [29, 2], [3, 11], [32, 49], [18, 48], [17, 25], [38, 42], [17, 5], [23, 7], [33, 2], [28, 7], [24, 16], [14, 9], [8, 27], [8, 1], [46, 15], [14, 37], [44, 34], [44, 16], [35, 15], [47, 46], [47, 9], [8, 2], [34, 15], [44, 0], [16, 12], [26, 46], [21, 11], [39, 9], [6, 3], [24, 7], [29, 46], [24, 46]]
[[47, 31], [11, 34], [43, 6], [0, 20], [8, 2], [44, 26], [31, 14], [47, 25], [6, 17], [39, 44], [35, 40], [24, 13], [30, 36], [12, 42], [26, 27], [7, 28], [25, 18], [24, 23], [22, 29], [47, 18], [46, 25], [37, 42], [15, 27], [27, 17], [22, 38], [10, 19], [7, 24], [13, 6], [39, 16], [20, 26], [42, 10], [7, 31], [20, 47], [37, 18], [16, 45], [27, 46], [18, 26], [32, 18], [47, 46], [17, 10], [12, 18], [18, 37], [34, 40], [37, 7], [18, 0], [28, 7], [17, 28], [38, 46], [38, 5], [3, 7], [21, 35], [7, 9], [20, 45], [16, 34], [24, 21], [10, 39], [0, 11], [5, 28], [25, 34], [47, 34], [22, 3], [5, 31], [40, 19], [22, 21], [11, 29], [33, 21], [12, 35], [36, 35], [42, 1], [32, 10], [15, 13], [49, 9], [26, 9], [19, 20], [2, 41], [28, 13], [4, 34], [15, 18], [11, 12], [13, 41], [43, 44], [31, 36], [1, 18], [19, 37], [41, 2], [3, 25], [41, 38], [42, 48], [39, 16], [1, 8], [11, 12], [23, 15], [37, 44], [43, 40], [4, 40], [23, 27]]
[[28, 15]]
[[31, 23], [13, 29], [2, 20], [22, 16], [31, 6], [2, 13], [32, 26], [29, 29], [4, 18], [8, 6], [3, 31], [47, 9], [11, 4], [43, 7], [0, 35], [27, 0], [19, 8], [15, 23], [17, 40], [33, 45], [30, 3], [10, 19], [41, 8], [48, 27], [13, 16], [19, 7], [1, 41], [21, 9], [8, 28], [24, 36], [13, 38], [43, 5], [11, 22], [27, 21], [34, 17], [32, 38], [23, 39], [15, 15], [31, 0], [41, 31], [29, 23], [49, 15], [25, 39], [6, 3], [43, 2], [19, 33], [16, 1], [3, 15], [4, 9], [46, 30], [27, 1], [29, 28], [22, 21], [4, 34], [31, 9], [24, 13], [35, 14], [39, 46], [40, 34], [7, 49], [8, 14], [48, 33], [46, 49], [22, 18], [29, 27], [40, 11], [49, 4], [31, 10], [39, 46], [8, 35], [37, 29], [2, 39], [31, 39]]
[[44, 6], [10, 40], [5, 44], [16, 42], [10, 1], [13, 33], [23, 36], [21, 21], [10, 44], [14, 35], [41, 0], [9, 17], [17, 22], [32, 38], [34, 23], [43, 26], [32, 33], [44, 29], [45, 28], [6, 34], [47, 46], [13, 26], [1, 43], [5, 11], [35, 4], [38, 15], [21, 19], [15, 26], [28, 44], [28, 40], [16, 8], [41, 17], [42, 29], [37, 40], [37, 41], [0, 9], [35, 22], [6, 38], [32, 11], [18, 44], [28, 27], [36, 33], [39, 38], [45, 2]]
[[48, 31], [30, 19], [15, 12], [16, 3], [32, 47], [9, 26], [10, 44], [3, 0], [49, 20], [14, 30], [13, 0], [12, 4], [26, 47], [39, 23], [13, 38], [14, 0], [13, 21], [12, 27], [43, 46], [12, 49], [39, 28], [5, 23], [40, 28], [49, 27], [4, 20], [12, 31], [47, 31], [35, 37], [8, 39], [28, 12], [29, 13], [40, 12], [6, 21]]
[[46, 8], [0, 16], [34, 40], [16, 33], [19, 25], [7, 32], [13, 7], [48, 25], [23, 20], [11, 28], [24, 11], [30, 45], [36, 30], [38, 9], [15, 31], [31, 20], [49, 42], [49, 49], [41, 34], [36, 44], [39, 8], [14, 11], [35, 10], [16, 31], [48, 5], [15, 43], [3, 39], [34, 28], [29, 46], [26, 11], [3, 11], [10, 19], [2, 29], [11, 7], [19, 29], [35, 18], [23, 12], [9, 11], [37, 17], [32, 25], [7, 3], [31, 9], [25, 39], [2, 33], [4, 40], [32, 5], [44, 24], [5, 44], [21, 38], [29, 34], [36, 46], [14, 41], [37, 24], [36, 16], [30, 31], [28, 11], [15, 16], [43, 24], [33, 27], [30, 17], [4, 45], [37, 16]]
[[24, 45], [21, 16], [30, 22], [25, 10], [40, 17], [3, 48], [5, 37], [48, 49], [44, 27], [21, 11], [37, 12], [32, 39], [47, 7], [28, 47], [9, 17], [1, 23]]
[[49, 11], [36, 4], [43, 42], [22, 2], [45, 38], [29, 14], [47, 11], [46, 31], [21, 7], [43, 7], [20, 17], [48, 7], [10, 34], [47, 10], [42, 24], [17, 4], [1, 34], [7, 37], [16, 32], [16, 28], [29, 11], [3, 36], [19, 49], [21, 9], [47, 14], [14, 14], [3, 14], [33, 20], [8, 34], [48, 8], [2, 33], [36, 47], [5, 18], [31, 26], [2, 45], [13, 44], [3, 4], [28, 19], [10, 16], [24, 14], [19, 14], [34, 15], [45, 7], [20, 9], [18, 36], [3, 4], [41, 47], [37, 16], [19, 27]]
[[37, 43], [5, 5], [42, 11], [34, 11], [24, 21], [24, 22], [17, 35], [31, 6], [20, 6], [14, 22], [2, 22], [8, 42], [7, 6], [14, 21], [40, 5], [0, 39], [24, 27], [2, 30], [47, 7], [37, 19], [43, 15], [7, 30], [1, 7], [8, 27], [3, 42], [36, 10], [2, 16], [43, 31], [0, 12], [8, 36], [5, 38], [9, 19], [36, 13], [46, 11], [4, 47], [34, 48], [33, 27], [7, 37], [31, 29], [31, 37], [19, 46], [39, 7], [39, 3], [32, 0], [11, 15], [1, 35], [41, 11], [32, 30], [15, 25], [28, 29], [0, 43], [42, 26], [48, 45], [30, 42], [37, 13], [42, 12], [7, 21], [14, 29], [32, 24], [41, 1], [48, 28], [11, 28], [45, 47], [6, 17], [28, 31], [23, 49], [49, 22], [48, 26], [42, 35], [47, 24], [13, 2], [40, 22], [28, 9], [30, 38], [1, 45], [42, 27], [34, 28], [26, 31], [45, 18], [25, 32], [45, 46], [45, 5], [15, 17], [2, 43], [23, 44], [49, 18], [14, 3], [40, 47], [42, 25], [22, 38], [40, 4], [5, 4], [19, 47], [19, 44]]
[[19, 29], [8, 2], [39, 22], [48, 46], [47, 32], [34, 29], [28, 22], [6, 45], [31, 6], [14, 19], [13, 24], [45, 37], [36, 4], [47, 21], [34, 13], [21, 42], [2, 35], [20, 39], [33, 21], [10, 25], [8, 39], [12, 37], [31, 19], [44, 21], [11, 3], [25, 22], [36, 15], [31, 23], [41, 29], [14, 17], [48, 1], [7, 9], [5, 28], [30, 26], [39, 30], [19, 19], [10, 42], [20, 33], [33, 0], [25, 7], [29, 49], [19, 21], [47, 12], [37, 5], [34, 32], [6, 49], [13, 3], [23, 5], [41, 1], [24, 20], [9, 48], [4, 22], [17, 6], [38, 32], [2, 3], [4, 41], [36, 0], [30, 46], [25, 6], [41, 28], [15, 41], [15, 16], [8, 45], [22, 18], [25, 10], [22, 20], [22, 38], [4, 4], [32, 30], [0, 32], [48, 49], [2, 21], [48, 36], [18, 44], [39, 15], [12, 22], [15, 29], [9, 5], [28, 19], [37, 3], [5, 33], [20, 29], [15, 44], [14, 13]]
[[30, 46], [48, 27], [36, 34], [35, 12], [30, 1], [33, 27], [36, 11], [31, 39], [17, 17], [8, 22], [7, 1], [42, 44], [5, 21], [46, 41], [31, 47], [48, 35], [43, 43], [45, 14], [19, 47], [10, 28], [15, 13], [37, 13], [40, 15], [3, 20], [47, 11], [33, 32], [37, 32], [30, 12], [33, 3], [19, 40], [6, 12], [14, 20], [39, 35], [19, 1], [28, 28], [19, 14], [34, 1], [34, 35], [18, 1], [5, 29], [48, 5], [30, 40], [0, 23], [11, 9], [42, 35], [26, 36], [32, 12], [24, 1], [19, 18], [48, 35], [45, 30], [14, 27], [7, 33], [24, 8], [42, 5], [19, 20], [37, 5], [22, 26], [25, 6], [43, 48], [25, 25], [3, 5], [1, 8], [10, 10], [20, 7], [0, 15], [0, 16], [25, 15], [41, 35], [21, 33], [20, 27], [21, 1], [42, 2], [7, 14], [24, 4], [5, 19], [13, 31], [11, 9], [46, 1], [32, 30], [5, 23], [47, 29], [28, 41], [28, 0], [37, 32], [4, 9], [7, 24], [26, 3], [11, 6], [7, 5], [36, 38], [13, 17], [26, 42], [34, 23], [33, 10]]
*/