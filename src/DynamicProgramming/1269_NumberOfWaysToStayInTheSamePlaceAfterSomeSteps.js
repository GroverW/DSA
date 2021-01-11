/*
You have a pointer at index 0 in an array of size arrLen. At each step, you can move 1 position to the left, 1 position to the right in the array or stay in the same place  (The pointer should not be placed outside the array at any time).

Given two integers steps and arrLen, return the number of ways such that your pointer still at index 0 after exactly steps steps.

Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: steps = 3, arrLen = 2
Output: 4
Explanation: There are 4 differents ways to stay at index 0 after 3 steps.
Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay
Example 2:

Input: steps = 2, arrLen = 4
Output: 2
Explanation: There are 2 differents ways to stay at index 0 after 2 steps
Right, Left
Stay, Stay
Example 3:

Input: steps = 4, arrLen = 2
Output: 8
 

Constraints:

1 <= steps <= 500
1 <= arrLen <= 10^6
*/

var numWays = function (steps, arrLen) {
  const len = Math.min(253, arrLen + 2);

  let ways = new Array(len).fill(0);
  let temp = new Array(len).fill(0);

  ways[1] = 1;

  const mod = 10 ** 9 + 7;

  for (let i = 1; i <= steps; i += 1) {
    const numSteps = Math.min(i + 2, ways.length - 1);
    for (let j = 1; j < numSteps; j += 1) {
      temp[j] = (ways[j] + ways[j - 1] + ways[j + 1]) % mod;
    }

    [temp, ways] = [ways, temp];
  }

  return ways[1];
};

/*

*/

// const maxLen = 100;
// for (let i = 0; i < 50; i += 1) {
  // const len = Math.floor(Math.random() * maxLen) + 1;

  // const intervals = [];

  // for (let j = 0; j < len; j += 1) {
  //   const start = Math.floor(Math.random() * 100) + 1;
  //   const finish = start + Math.floor(Math.random() * 20) + 1;
  //   intervals.push([start, finish]);
  // }

  // const steps = Math.floor(Math.random() * 500) + 1;
  // const arrLen = Math.floor(Math.random() * 500) + 1;
  // const nums = [steps, arrLen]

  // logOutList('"' + encoded + '",')
  // logOutList(printRow([nums, k]) + ',')
  // logOutList(printRow(nums) + ',');
  // logOutList(n);
  // logOutList(printRow(actions) + '],')
// }

const tests = [
  [3, 2],
  [2, 4],
  [4, 2],
  [500, 100000],
  [88, 487],
  [409, 366],
  [430, 230],
  [149, 88],
  [423, 370],
  [391, 463],
  [329, 378],
  [482, 345],
  [217, 50],
  [36, 114],
  [83, 405],
  [356, 227],
  [369, 293],
  [366, 307],
  [27, 46],
  [349, 164],
  [261, 347],
  [94, 262],
  [364, 448],
  [468, 399],
  [283, 115],
  [15, 342],
  [181, 368],
  [225, 398],
  [250, 399],
  [167, 186],
  [200, 95],
  [200, 464],
  [37, 412],
  [150, 252],
  [402, 397],
  [49, 116],
  [492, 366],
  [295, 221],
  [153, 310],
  [271, 229],
  [495, 438],
  [236, 16],
  [380, 102],
  [335, 495],
  [41, 164],
  [141, 246],
  [27, 71],
  [241, 219],
  [168, 276],
  [311, 44],
  [66, 26],
  [310, 427],
  [357, 448],
  [227, 321],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(numWays(...test));
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
3
2
2
4
4
2
500
100000
88
487
409
366
430
230
149
88
423
370
391
463
329
378
482
345
217
50
36
114
83
405
356
227
369
293
366
307
27
46
349
164
261
347
94
262
364
448
468
399
283
115
15
342
181
368
225
398
250
399
167
186
200
95
200
464
37
412
150
252
402
397
49
116
492
366
295
221
153
310
271
229
495
438
236
16
380
102
335
495
41
164
141
246
27
71
241
219
168
276
311
44
66
26
310
427
357
448
227
321
*/