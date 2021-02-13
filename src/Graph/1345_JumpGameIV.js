/*
Given an array of integers arr, you are initially positioned at the first index of the array.

In one step you can jump from index i to index:

i + 1 where: i + 1 < arr.length.
i - 1 where: i - 1 >= 0.
j where: arr[i] == arr[j] and i != j.
Return the minimum number of steps to reach the last index of the array.

Notice that you can not jump outside of the array at any time.

 

Example 1:

Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.
Example 2:

Input: arr = [7]
Output: 0
Explanation: Start index is the last index. You don't need to jump.
Example 3:

Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
Explanation: You can jump directly from index 0 to index 7 which is last index of the array.
Example 4:

Input: arr = [6,1,9]
Output: 2
Example 5:

Input: arr = [11,22,7,7,7,7,7,7,7,22,13]
Output: 3
 

Constraints:

1 <= arr.length <= 5 * 10^4
-10^8 <= arr[i] <= 10^8
*/


// Single Queue BFS
var minJumps = function (arr) {
  const max = Number.MAX_SAFE_INTEGER;
  const minMoves = new Array(arr.length).fill(max);
  const similarIndices = arr.reduce((similar, val, index) => {
    similar[val] = similar[val] || [];
    similar[val].push(index);
    return similar;
  }, {})

  minMoves[0] = 0;
  const queue = [0];
  while (queue.length) {
    const currIdx = queue.shift();

    if (currIdx === arr.length - 1) return minMoves[currIdx];

    const nextMoves = minMoves[currIdx] + 1;
    const num = arr[currIdx];

    for (let similarIdx of similarIndices[num]) {
      if (
        similarIdx === currIdx
        || minMoves[similarIdx] <= nextMoves
      ) continue;

      minMoves[similarIdx] = nextMoves;
      queue.push(similarIdx);
    }

    similarIndices[num] = [];

    if (minMoves[currIdx + 1] > nextMoves) {
      minMoves[currIdx + 1] = nextMoves;
      queue.push(currIdx + 1);
    }
    if (minMoves[currIdx - 1] > nextMoves) {
      minMoves[currIdx - 1] = nextMoves;
      queue.push(currIdx - 1);
    }
  }

  return -1;
};

// Double Queue BFS
var minJumps = function (arr) {
  const visited = new Array(arr.length).fill(false);
  const similarIndices = arr.reduce((similar, val, index) => {
    similar[val] = similar[val] || [];
    similar[val].push(index);
    return similar;
  }, {})


  visited[0] = true;
  visited[arr.length - 1] = true;
  let source = new Set([0]);
  let dest = new Set([arr.length - 1]);
  let numMoves = 0;

  while (source.size) {
    if (dest.size < source.size) {
      [source, dest] = [dest, source];
    }

    const next = new Set();

    for (let index of source) {
      if (dest.has(index)) return numMoves;
      const num = arr[index];

      for (let similarIdx of similarIndices[num]) {
        if (similarIdx === index) continue;
        if (dest.has(similarIdx)) return numMoves + 1;
        if (visited[similarIdx]) continue;
        visited[similarIdx] = true;
        next.add(similarIdx);
      }

      similarIndices[num] = [];

      const nextIdx = index + 1;
      if (dest.has(nextIdx)) return numMoves + 1;
      if (visited[nextIdx] === false) {
        visited[nextIdx] = true;
        next.add(nextIdx);
      }

      const prevIdx = index - 1;
      if (dest.has(prevIdx)) return numMoves + 1;
      if (visited[prevIdx] === false) {
        visited[prevIdx] = true;
        next.add(prevIdx);
      }
    }

    source = next;
    numMoves += 1;
  }

  return -1;
};

/*

*/

// const maxLen = 100;
// for (let i = 0; i < 40; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;

//   const nums = new Array(len).fill(0)
//     .map(() => Math.floor(Math.random() * 200) - 100);

//   logOutList(printRow(nums) + ',');
// }

const tests = [
  [100, -23, -23, 404, 100, 23, 23, 23, 3, 404],
  [7],
  [7, 6, 9, 6, 9, 6, 9, 7],
  [6, 1, 9],
  [11, 22, 7, 7, 7, 7, 7, 7, 7, 22, 13],
  [91, -98, 65, 56, -50],
  [-83, 93, 10, 49, -50, -60, 81, -96, 98, -72, 34, -49, 94, 43, -26, -43, 37, -63, 42, 94, 56, -72, 26, 5, 45, 42, 33, -36, 65, 94, 50, 49, -59, 37, 16, 76, 28, -95, -1, -22, 61, 29, 50, -27, 28, -39, 87, -58, 89, 43, 73, -10, -40, -21, 93, 74, -10, -87, -84, -76, -28, 19, 55, 45, 64, -29, 99, -57, -21, -73, -73, 62, 61, 25, -33, 86, -91, 18, -30, -28, 77, -56, -38, 4, -69, 72],
  [55, 40, 30, 58, 72, 59, 15, -40, -11, -8, -92, 75, -4, -84, -84, -40, -99, 61, 32, 97, 94, 24, 66, -19, -80, -83, -92, -26, -60, 9, -22, -13, -64, -85, -77, -83, -96, -68, 83, -5, 15, -81, -95, -91, 41, -93, -59, 3, 54, 34, 40, -70, 59, -92, 10, 56, 90, 98, 76, 2, -95, 26, 72, -21, -29, 67, -99, -66, 81, -37, -50, 65, 19, 42, -74, -11, 55, -37, 69, -14, 42, 56, -49, 21, 33, -97, -28, 96, 48, 40, 46, -57],
  [37, -59, -78, 33, 27, -46, -19, 95, -100, -24, 80, 99, 37, -28, -3, -31, -59, -90, 71, -3, -90, -11, -93, -42, -74, 50, -88, 8, 0, 64, -26, 35, -27, -91, 93, -32],
  [53, 7, 6, 57, -93, -81, -45, -13, 37, 89, 90, -84, -61, 22, 45, 41, -28, 13],
  [10, 23, 11, -2, 7, -91, -16, -57, -1, 31, -32, 34, 12, -41, -12, -94, 39, 46, 49, -56, -23, -53, -28, -69, 28, -16, -90, 56, -89, 96, -26, 29, 61, 49, 55, -12, 81, -82, -99, 79, -37, -66, -6, -35, 7, -59, -63, 28, 40, -25, -6, 41, 28, 1, -74, -76, 37],
  [56, 47, 7, -6, 97, -83, 25, -30, -74, -37, -73, -40, 72, -83, 58, 41, -61, -95, 78, 59, 49, -3, 78, -40, 61, -41, -11, -72, -66, -67, -22, 68, -12, -11, 26, 99, 73, -66, 9, -69, -4, 55, -31, 6, -97, 15, 21, 2, -89, -29, -62, 79, -21, -99, 45, -55, -68, -74, -6, 64, -29, -28, -56, -54, 72, -84, 2, -46, 37, 16, 5, 94, 11, -70, -51, 61, 42, -81, 26, 98, 42, -24, 23],
  [17, -93, -32, -36, -12, 32, -27, -17, -3, 37, -16, 43, -82, -60, 73, 68, 77, -72, -2, -44, -30, 18, -91, 94, -86, 56, 67, -51, 74, -65, 57, -66, 96, 6, 68, -97, -60, -66, -71, 28, -23, 81, 15, 72, 95, 33, -93, 22, 64, 52, -9, 8, -1, -82, 81, -78, -9, 58, 93, -27, 96, 92, 1, -91, 31, 24, 27, 93, -11, 90, -84, 22, 82, 60, -39, -64, -75, 9, -83, -49, 56],
  [33, 74, -86, -70, 42, -53, -86, 68, 52, -58, 39, 27, -64, -46, 38, 90, 73, -18, -79, 78, -43, -38, 19, -33, -59, 15, 82, 88, 4, -22, 97, -75, -31, -17, -91, 80, 2, -30, -90, -98, 72, 92, -100, -32, 21, -24, -85, -97, -62, 54, -16, 93, -46, -83, -99, 62, 87, 97, -68, 35, 86, -93, 86, -59, 31, -78, 90, -69, -80, -99, -61, -57, 92, -82, -92, 2, -65, -51, -23, -69, -100, 74, 21, -79, 46, -48, -36, -36, 50, 56, 9, -76, -23, -80, -21, -93, 2, 24],
  [2, 86, -21, -13, -81, 91, -51, 18, -51, 15, -14, -87, -91, -62, -16, -13, 45, -45, -96, 69, 26, 7, -85, -40, -91, -84, 94, 54, 46, 99, 0, 18, -10, 57, 49, 24, -55, 77, 60],
  [-10, 39, 73, 0, 2, 19, -51, -24, 50, 12, 17, -94, -88, 11, -97, 91, 76, 7, -11],
  [47, -76, -91, 75, -69, 15, 76, -42, -39, -80, -13, 19, -6, 87, -9, -84],
  [94, -42, -79],
  [68, 18, -95, 92, 36, 31, -4, -15, -96, -65, 0, -77, 74, -59, 5, 49, 46, 32, -47, 30, 35, 88, -37, 51, 57, 91, -63, 63, 63, -9, -31, -84, -44, 52, -66, -89, 26, -49, 52, -65, 99, 39, -46, -73, 74, -89, -30, -83, -67, -1, -15, -63, -44, -15, 95],
  [57, 52, -5, -11, 25, -90, -2, -86, 2, 98, -92, -59, 67, 93, -78, -70, 52, 80, 94, -40, -42, -10, -2, -18, -86, -1, 7, 2, 42, 75, 89, 58, -4, -88, -65, -17, 59, -42, -61, -20, 26, -99, 82, 54, -28, -96, 97, -64, 83, 71, 80, 9, 31, -37],
  [-98, -56, -47, -70, -77, -71, -39, 76, 94, 81, -28, -10, 59, 14, 27, -96, -38, -43, 27, 7, -23, 69, -93, -48, 80, -23, -84, 92, -64, -100, -36, 78, -26, -14, 26, -80, 19, 12, 2, 0, 67, 61, -5, -4, -97, 38, -21, -31, -16, 54, -89, -87, -93, 2, 77, -28, 45, -78, -14, -82, -40, -45, -11, 92, -47, 32, -10, -50, 75, 80, 84, 18, -57, -12, -59, -87, -22, -39],
  [84, 22, 40, 58, 16, 9, -93, 18, -51, -5, 52, -26, 48, 64, -40, -4, 28, 73, 80, -50, 5, -97, -28, -76, 47, -29, 99, -57, 95, -82, 76, 46, 32, -71, 56, -50, -95, 98, -72, 92, -7, 60, -99, 87, -5, 54, 95, 22, -41, -75, -70, -80, 23, 60, -4, 37, 43, -100, -25, -46, -63, -85, 79, 53, 76, 2, 96, -60, -42, -16, -56, 41, -20, -5, 64, 30, -60, 67, 40, 80, -31, 95, -98, 27, -95, 63, -4, -40, 18, 70, -58, 40, 62, -21],
  [-62, -62, 87, 31, 76, -77, -39, 58, -44, -34, -79, 16, -26, -74, -19, -21, -75, -14, -4, 92, 75, -17, -67, 67, 10, -58, -62, 56, -37, -49, 25, 82, 1, 61, -28, -43, 66, 39, 10, 40, -23, -46, -50, 2, 99, 45, -40],
  [-12, 40, 55, -95, -59, 56, -58, -8, 24, -55, 74, -20, 47, 65, -16, -38, -16, 20, -54, -23, -90, -76, -4, -18, -74, 95, 72, -21, 72, 9, 76, -62, 62, -88, 76, 88, -58, -84, -25, -52, -10, -85, -99, -65, -10, 16, -3, 76, -35, 96, -28, 50, 37],
  [-77, -88, -53, 53, 43, 19, -28, 88, 35, -12, 97, 61, -92, -46, 3, 43, 14, -33, -95, -58, 54, 92, -17, -7, -7, -5, 33, -91, -23, -82, -77, -59, -29, -93, 24, -93, -62, -6, 13, 26, -28, -33, -50, 45, -84, 38, 35, 69, -65, 81, -94, 98, -69, -92, 48, -22, -39, -13, 4, 61, 8, 46, 67, 60, 22, -26, 17, 94, -1, 91, -27, 64, 75, 29, 1, -36, 51, -17, 75, -87, -69, -33, -97, 34],
  [60, -48, 57, -24, 48, 20, 16, -7, 9, -68, -84],
  [12, -53, -67, -81, 48, -9, 18, 94, 38, 85, -30, 24, 92, 57, 4, -18, -54, 72, -87, -65, -91, 15, -57, 52, -59, 51, 18, 41, -4, 94, -13, -87, -77, 62, -23, 29, 63, 93, 65, 33, -57, 88, -61],
  [98, 66, 58, 45, -63, 9, -22, 20, -25, -53, 37, -45, -61, -95, 43, 63, -76, 6, 75, 93, 30, -60, -90, 70, -51, 1, -23, 27, 88, 19, 1, -71, -50, 85],
  [-23, 5, 9, -83, -80, 62, 21, 56, -57],
  [-16, 28, 59, 10, -84, -92, -13, -52, 62, -47, 41, -92, -51, -70, -14, -75, -68, -83, -35, 15, -85, -9, 85, 67, -5, 96, 19, 58, 70, 57, 74, -59, 28, -11, 54, -52, -81, 43, -42, -19, 4, -10, -7, -51, -88, -100, -43, -61, 84, -41, 44, -12, -17, -3, -82, -79, 87, -74, 29, -39, -18, 9, -23, 21, -67, -81, -20, -83, -32, -28, -58, 7, 91, 26, 84, 62, -82, 22, -62, 8, -71, 95, 90, 79, -51, -37, -89, -17, -58, 54, 65],
  [4, 4, -49, 92, -1, -76, -82, -99, -34, 6, 76, 16],
  [-62, -7, -67, -15, 85, -38, -3, -2, 47, -73, -48, 51, 92, 35, 69, 71, -50, -93, 87, -59, -27, -99, 38, 40, 93, -87, 28, -17, 52, 77, -89, 45, -98, 75, 87, -22, 64, 79, 48, 54, 15, -4, -62, -8, -86, 5, 33, 80, 38, -6, 30, 2, -16, -63, -7, 73, -42, 93, -52, 10, 28, 16, 39, -56, -80, 65, -30, 42, 83, 63, -3, -12, -4, 45, -33, -99, 44, -3, -40, -41],
  [-73],
  [10, -16, 79, 34, 13, 15, 20, 14, -23, 44, -89, 43, 1, -59, 59, -58, 51, -80, -16, -95, -98, -23, 70, -52, -82, 9, -64, 10, 58, -74, -5, -88, -83, -87, -21, 27, -86, 87, -3, -91, 29, -80, -89, 94, -44, -83, -59, -89, 80, 58, 88, 25, 26, 19, 89, 1, 46, 78, -6, -57, -10, 87, 15, 75, -11, 83, 85, -16, -65, 24, 28, -91, 42, -56, -97, -83, -4, 12, -73, 55, -100, -29, 21, -61, 83, 99, 35, -63, 88, 51, -80, 29, 32, -16, -28, 37],
  [25, -79, -14, 40, -25, 79, 94, -8, -57, -59, 64, -3, -56, 66, -38, 65, 64, -88, -65, -84, -99, 99, -93, -11, -42, -50, 69, -88, 51, -85, -26, -42, 39, 88, 53, -77, 1, -1, 19, -51, -63, 23, 13, -45, -87, 38, -4, 70, 77, 8, -65],
  [-33],
  [-38, 35, -31, -28, 90, -77, -13, -7, -30, -27, -100, 10, 41, 7, -5, -17, 0, -92, 98, -64, -74, -65, 77, -1, 45, 61, -2, -18, -79, -40, -82, -84, 52, 87, 48, 50, -64, 25, -16, 0, 26, -24, 95, -80, -5, -32],
  [-32, -90, -45, 78, 75, 21, 99, -20, -83, -44, 43, -32, -75, 66, -57, -64, 36, 76, 77, -96, -70, -37, 8, 20, 77, 95, -82, -65, -6, 32, 87, 28, 12, 28, -19, 92, 92, -96, -79, -63, -73, 89, -100, -8, -80, 79, -100, 67, -57, 23, -48, -8, -60, -18, -78, 31, 47, 34, 29, -85, 4, -6, -77, -61, -76, -43, 79, 67, -22, -4, 34, -63, -42, 5, -7, -5, -62, 45, -43, -77, 16, -19, -64, 24, 33, 4, 11, 91, -17, -48, 40, 98],
  [-18, -28, -29, -67, -26, 43, -71, -32, 0, -63, 62, -9, -30, 35, -50, 33, 65, -56, 81, 32, 16, -60, -90, 45, 20, 13, 21, -5, 68, 35],
  [75, 63, -78, -45, 79, -5, 6, 14, 71, -30, 42, -13, 89, -5, -58, 37, -63, 89, -38, 7, -66, -18, 65, -83, -75, 77, 68, -3, 83, -43, 48, 40, 0, 34, -92, -90, 20, 42, 47, -60, 4, -47, -75, 30, 69, -90, -59, 38, 87, -40, 29, 68, 38, 46, -85, 50, -84, -36, 88, -26, 79, 8, 24, -41, 97, 10, 79, 15, 98, 34, 72, 88, -89, -97, -96, -71, -27, -93, 41, 85, 83, 37, 73],
  [-18, -61, -7, -90, 45, -2, -9, 77, 84, -19, 1, 92, -28, -3, -95, -78, -41, 42, 41, 18, -49, 65, 30, -61, -42, 4, 58, -61, -27, -26, 55, -43, 40, 56, -6, 39, 39, 24, -66, 12, -65],
  [-50, 10, -82, -34, 97, -42, -29, -78, 96, 45, 69, -62, 53, 32, 78, 58, -14, -30, -42, 25, 23, -60, 71, -64, -70, 80, 23, -70, -28, -17, -28, -32],
  [21, 55, -27, -13, -95, -93, -73, -69, 99, -85, 34, -64, 72, 72, 29, -42, -14, 49, 17, -59, -85, 45],
  [74, -70, -89, -4, -90, -62, -37, 23, -47, 70, 94, -56, 35, -53, 12, -64, 72, -93, -37, 33, 21, -78, -27, -14, -68, 45, -78, 27, 68, 99, -8, 32, 29, 95, 26, 0, 89, 31, 75, 60, 80, -13, -53, 35, -76, 27, 77, -39, -57, 84, -34, -16, 43, -66, -79, 89, 93, -39, 21, 17],
  [-94, -73, 93, -6, -39, -54, 60, 4, 27, -46, 49, 73, -26, -47, -48, -8, 6, -21, -3, 33, 80, 11, 35, 87, 74, 1, -60, -28, 67, 86, -76, 87, -88, -89, 96, 78, -80, 13, -30, 70, -32, 26, -43, -100, 28, 5, 40, 20, 70, -95, -94, 48, -29, 20, 90, -3, 75, -79, -69, 68, -87, -44, 92, 76, -79, 56, 43, -94, 90, 12, -39, 61, 19, 96, -12, -84, 44, -99, -22, -71, 66, 95, -49, 47, -8, 39],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(minJumps(test));
  console.timeEnd(i);
  i += 1;
}

/*
[100, -23, -23, 404, 100, 23, 23, 23, 3, 404]
[7]
[7, 6, 9, 6, 9, 6, 9, 7]
[6, 1, 9]
[11, 22, 7, 7, 7, 7, 7, 7, 7, 22, 13]
[91, -98, 65, 56, -50]
[-83, 93, 10, 49, -50, -60, 81, -96, 98, -72, 34, -49, 94, 43, -26, -43, 37, -63, 42, 94, 56, -72, 26, 5, 45, 42, 33, -36, 65, 94, 50, 49, -59, 37, 16, 76, 28, -95, -1, -22, 61, 29, 50, -27, 28, -39, 87, -58, 89, 43, 73, -10, -40, -21, 93, 74, -10, -87, -84, -76, -28, 19, 55, 45, 64, -29, 99, -57, -21, -73, -73, 62, 61, 25, -33, 86, -91, 18, -30, -28, 77, -56, -38, 4, -69, 72]
[55, 40, 30, 58, 72, 59, 15, -40, -11, -8, -92, 75, -4, -84, -84, -40, -99, 61, 32, 97, 94, 24, 66, -19, -80, -83, -92, -26, -60, 9, -22, -13, -64, -85, -77, -83, -96, -68, 83, -5, 15, -81, -95, -91, 41, -93, -59, 3, 54, 34, 40, -70, 59, -92, 10, 56, 90, 98, 76, 2, -95, 26, 72, -21, -29, 67, -99, -66, 81, -37, -50, 65, 19, 42, -74, -11, 55, -37, 69, -14, 42, 56, -49, 21, 33, -97, -28, 96, 48, 40, 46, -57]
[37, -59, -78, 33, 27, -46, -19, 95, -100, -24, 80, 99, 37, -28, -3, -31, -59, -90, 71, -3, -90, -11, -93, -42, -74, 50, -88, 8, 0, 64, -26, 35, -27, -91, 93, -32]
[53, 7, 6, 57, -93, -81, -45, -13, 37, 89, 90, -84, -61, 22, 45, 41, -28, 13]
[10, 23, 11, -2, 7, -91, -16, -57, -1, 31, -32, 34, 12, -41, -12, -94, 39, 46, 49, -56, -23, -53, -28, -69, 28, -16, -90, 56, -89, 96, -26, 29, 61, 49, 55, -12, 81, -82, -99, 79, -37, -66, -6, -35, 7, -59, -63, 28, 40, -25, -6, 41, 28, 1, -74, -76, 37]
[56, 47, 7, -6, 97, -83, 25, -30, -74, -37, -73, -40, 72, -83, 58, 41, -61, -95, 78, 59, 49, -3, 78, -40, 61, -41, -11, -72, -66, -67, -22, 68, -12, -11, 26, 99, 73, -66, 9, -69, -4, 55, -31, 6, -97, 15, 21, 2, -89, -29, -62, 79, -21, -99, 45, -55, -68, -74, -6, 64, -29, -28, -56, -54, 72, -84, 2, -46, 37, 16, 5, 94, 11, -70, -51, 61, 42, -81, 26, 98, 42, -24, 23]
[17, -93, -32, -36, -12, 32, -27, -17, -3, 37, -16, 43, -82, -60, 73, 68, 77, -72, -2, -44, -30, 18, -91, 94, -86, 56, 67, -51, 74, -65, 57, -66, 96, 6, 68, -97, -60, -66, -71, 28, -23, 81, 15, 72, 95, 33, -93, 22, 64, 52, -9, 8, -1, -82, 81, -78, -9, 58, 93, -27, 96, 92, 1, -91, 31, 24, 27, 93, -11, 90, -84, 22, 82, 60, -39, -64, -75, 9, -83, -49, 56]
[33, 74, -86, -70, 42, -53, -86, 68, 52, -58, 39, 27, -64, -46, 38, 90, 73, -18, -79, 78, -43, -38, 19, -33, -59, 15, 82, 88, 4, -22, 97, -75, -31, -17, -91, 80, 2, -30, -90, -98, 72, 92, -100, -32, 21, -24, -85, -97, -62, 54, -16, 93, -46, -83, -99, 62, 87, 97, -68, 35, 86, -93, 86, -59, 31, -78, 90, -69, -80, -99, -61, -57, 92, -82, -92, 2, -65, -51, -23, -69, -100, 74, 21, -79, 46, -48, -36, -36, 50, 56, 9, -76, -23, -80, -21, -93, 2, 24]
[2, 86, -21, -13, -81, 91, -51, 18, -51, 15, -14, -87, -91, -62, -16, -13, 45, -45, -96, 69, 26, 7, -85, -40, -91, -84, 94, 54, 46, 99, 0, 18, -10, 57, 49, 24, -55, 77, 60]
[-10, 39, 73, 0, 2, 19, -51, -24, 50, 12, 17, -94, -88, 11, -97, 91, 76, 7, -11]
[47, -76, -91, 75, -69, 15, 76, -42, -39, -80, -13, 19, -6, 87, -9, -84]
[94, -42, -79]
[68, 18, -95, 92, 36, 31, -4, -15, -96, -65, 0, -77, 74, -59, 5, 49, 46, 32, -47, 30, 35, 88, -37, 51, 57, 91, -63, 63, 63, -9, -31, -84, -44, 52, -66, -89, 26, -49, 52, -65, 99, 39, -46, -73, 74, -89, -30, -83, -67, -1, -15, -63, -44, -15, 95]
[57, 52, -5, -11, 25, -90, -2, -86, 2, 98, -92, -59, 67, 93, -78, -70, 52, 80, 94, -40, -42, -10, -2, -18, -86, -1, 7, 2, 42, 75, 89, 58, -4, -88, -65, -17, 59, -42, -61, -20, 26, -99, 82, 54, -28, -96, 97, -64, 83, 71, 80, 9, 31, -37]
[-98, -56, -47, -70, -77, -71, -39, 76, 94, 81, -28, -10, 59, 14, 27, -96, -38, -43, 27, 7, -23, 69, -93, -48, 80, -23, -84, 92, -64, -100, -36, 78, -26, -14, 26, -80, 19, 12, 2, 0, 67, 61, -5, -4, -97, 38, -21, -31, -16, 54, -89, -87, -93, 2, 77, -28, 45, -78, -14, -82, -40, -45, -11, 92, -47, 32, -10, -50, 75, 80, 84, 18, -57, -12, -59, -87, -22, -39]
[84, 22, 40, 58, 16, 9, -93, 18, -51, -5, 52, -26, 48, 64, -40, -4, 28, 73, 80, -50, 5, -97, -28, -76, 47, -29, 99, -57, 95, -82, 76, 46, 32, -71, 56, -50, -95, 98, -72, 92, -7, 60, -99, 87, -5, 54, 95, 22, -41, -75, -70, -80, 23, 60, -4, 37, 43, -100, -25, -46, -63, -85, 79, 53, 76, 2, 96, -60, -42, -16, -56, 41, -20, -5, 64, 30, -60, 67, 40, 80, -31, 95, -98, 27, -95, 63, -4, -40, 18, 70, -58, 40, 62, -21]
[-62, -62, 87, 31, 76, -77, -39, 58, -44, -34, -79, 16, -26, -74, -19, -21, -75, -14, -4, 92, 75, -17, -67, 67, 10, -58, -62, 56, -37, -49, 25, 82, 1, 61, -28, -43, 66, 39, 10, 40, -23, -46, -50, 2, 99, 45, -40]
[-12, 40, 55, -95, -59, 56, -58, -8, 24, -55, 74, -20, 47, 65, -16, -38, -16, 20, -54, -23, -90, -76, -4, -18, -74, 95, 72, -21, 72, 9, 76, -62, 62, -88, 76, 88, -58, -84, -25, -52, -10, -85, -99, -65, -10, 16, -3, 76, -35, 96, -28, 50, 37]
[-77, -88, -53, 53, 43, 19, -28, 88, 35, -12, 97, 61, -92, -46, 3, 43, 14, -33, -95, -58, 54, 92, -17, -7, -7, -5, 33, -91, -23, -82, -77, -59, -29, -93, 24, -93, -62, -6, 13, 26, -28, -33, -50, 45, -84, 38, 35, 69, -65, 81, -94, 98, -69, -92, 48, -22, -39, -13, 4, 61, 8, 46, 67, 60, 22, -26, 17, 94, -1, 91, -27, 64, 75, 29, 1, -36, 51, -17, 75, -87, -69, -33, -97, 34]
[60, -48, 57, -24, 48, 20, 16, -7, 9, -68, -84]
[12, -53, -67, -81, 48, -9, 18, 94, 38, 85, -30, 24, 92, 57, 4, -18, -54, 72, -87, -65, -91, 15, -57, 52, -59, 51, 18, 41, -4, 94, -13, -87, -77, 62, -23, 29, 63, 93, 65, 33, -57, 88, -61]
[98, 66, 58, 45, -63, 9, -22, 20, -25, -53, 37, -45, -61, -95, 43, 63, -76, 6, 75, 93, 30, -60, -90, 70, -51, 1, -23, 27, 88, 19, 1, -71, -50, 85]
[-23, 5, 9, -83, -80, 62, 21, 56, -57]
[-16, 28, 59, 10, -84, -92, -13, -52, 62, -47, 41, -92, -51, -70, -14, -75, -68, -83, -35, 15, -85, -9, 85, 67, -5, 96, 19, 58, 70, 57, 74, -59, 28, -11, 54, -52, -81, 43, -42, -19, 4, -10, -7, -51, -88, -100, -43, -61, 84, -41, 44, -12, -17, -3, -82, -79, 87, -74, 29, -39, -18, 9, -23, 21, -67, -81, -20, -83, -32, -28, -58, 7, 91, 26, 84, 62, -82, 22, -62, 8, -71, 95, 90, 79, -51, -37, -89, -17, -58, 54, 65]
[4, 4, -49, 92, -1, -76, -82, -99, -34, 6, 76, 16]
[-62, -7, -67, -15, 85, -38, -3, -2, 47, -73, -48, 51, 92, 35, 69, 71, -50, -93, 87, -59, -27, -99, 38, 40, 93, -87, 28, -17, 52, 77, -89, 45, -98, 75, 87, -22, 64, 79, 48, 54, 15, -4, -62, -8, -86, 5, 33, 80, 38, -6, 30, 2, -16, -63, -7, 73, -42, 93, -52, 10, 28, 16, 39, -56, -80, 65, -30, 42, 83, 63, -3, -12, -4, 45, -33, -99, 44, -3, -40, -41]
[-73]
[10, -16, 79, 34, 13, 15, 20, 14, -23, 44, -89, 43, 1, -59, 59, -58, 51, -80, -16, -95, -98, -23, 70, -52, -82, 9, -64, 10, 58, -74, -5, -88, -83, -87, -21, 27, -86, 87, -3, -91, 29, -80, -89, 94, -44, -83, -59, -89, 80, 58, 88, 25, 26, 19, 89, 1, 46, 78, -6, -57, -10, 87, 15, 75, -11, 83, 85, -16, -65, 24, 28, -91, 42, -56, -97, -83, -4, 12, -73, 55, -100, -29, 21, -61, 83, 99, 35, -63, 88, 51, -80, 29, 32, -16, -28, 37]
[25, -79, -14, 40, -25, 79, 94, -8, -57, -59, 64, -3, -56, 66, -38, 65, 64, -88, -65, -84, -99, 99, -93, -11, -42, -50, 69, -88, 51, -85, -26, -42, 39, 88, 53, -77, 1, -1, 19, -51, -63, 23, 13, -45, -87, 38, -4, 70, 77, 8, -65]
[-33]
[-38, 35, -31, -28, 90, -77, -13, -7, -30, -27, -100, 10, 41, 7, -5, -17, 0, -92, 98, -64, -74, -65, 77, -1, 45, 61, -2, -18, -79, -40, -82, -84, 52, 87, 48, 50, -64, 25, -16, 0, 26, -24, 95, -80, -5, -32]
[-32, -90, -45, 78, 75, 21, 99, -20, -83, -44, 43, -32, -75, 66, -57, -64, 36, 76, 77, -96, -70, -37, 8, 20, 77, 95, -82, -65, -6, 32, 87, 28, 12, 28, -19, 92, 92, -96, -79, -63, -73, 89, -100, -8, -80, 79, -100, 67, -57, 23, -48, -8, -60, -18, -78, 31, 47, 34, 29, -85, 4, -6, -77, -61, -76, -43, 79, 67, -22, -4, 34, -63, -42, 5, -7, -5, -62, 45, -43, -77, 16, -19, -64, 24, 33, 4, 11, 91, -17, -48, 40, 98]
[-18, -28, -29, -67, -26, 43, -71, -32, 0, -63, 62, -9, -30, 35, -50, 33, 65, -56, 81, 32, 16, -60, -90, 45, 20, 13, 21, -5, 68, 35]
[75, 63, -78, -45, 79, -5, 6, 14, 71, -30, 42, -13, 89, -5, -58, 37, -63, 89, -38, 7, -66, -18, 65, -83, -75, 77, 68, -3, 83, -43, 48, 40, 0, 34, -92, -90, 20, 42, 47, -60, 4, -47, -75, 30, 69, -90, -59, 38, 87, -40, 29, 68, 38, 46, -85, 50, -84, -36, 88, -26, 79, 8, 24, -41, 97, 10, 79, 15, 98, 34, 72, 88, -89, -97, -96, -71, -27, -93, 41, 85, 83, 37, 73]
[-18, -61, -7, -90, 45, -2, -9, 77, 84, -19, 1, 92, -28, -3, -95, -78, -41, 42, 41, 18, -49, 65, 30, -61, -42, 4, 58, -61, -27, -26, 55, -43, 40, 56, -6, 39, 39, 24, -66, 12, -65]
[-50, 10, -82, -34, 97, -42, -29, -78, 96, 45, 69, -62, 53, 32, 78, 58, -14, -30, -42, 25, 23, -60, 71, -64, -70, 80, 23, -70, -28, -17, -28, -32]
[21, 55, -27, -13, -95, -93, -73, -69, 99, -85, 34, -64, 72, 72, 29, -42, -14, 49, 17, -59, -85, 45]
[74, -70, -89, -4, -90, -62, -37, 23, -47, 70, 94, -56, 35, -53, 12, -64, 72, -93, -37, 33, 21, -78, -27, -14, -68, 45, -78, 27, 68, 99, -8, 32, 29, 95, 26, 0, 89, 31, 75, 60, 80, -13, -53, 35, -76, 27, 77, -39, -57, 84, -34, -16, 43, -66, -79, 89, 93, -39, 21, 17]
[-94, -73, 93, -6, -39, -54, 60, 4, 27, -46, 49, 73, -26, -47, -48, -8, 6, -21, -3, 33, 80, 11, 35, 87, 74, 1, -60, -28, 67, 86, -76, 87, -88, -89, 96, 78, -80, 13, -30, 70, -32, 26, -43, -100, 28, 5, 40, 20, 70, -95, -94, 48, -29, 20, 90, -3, 75, -79, -69, 68, -87, -44, 92, 76, -79, 56, 43, -94, 90, 12, -39, 61, 19, 96, -12, -84, 44, -99, -22, -71, 66, 95, -49, 47, -8, 39]
*/