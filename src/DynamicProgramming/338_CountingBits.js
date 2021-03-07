/*
Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Example 1:

Input: 2
Output: [0,1,1]
Example 2:

Input: 5
Output: [0,1,1,2,1,2]
Follow up:

It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.
*/

var countBits = function (num) {
  if (!num) return [0];
  let numBits = [0, 1];
  let nextPowerOfTwo = 2;
  let start = 1;

  for (let current = 2; current < num; current += 1) {
    if (current === nextPowerOfTwo) {
      numBits.push(1);
      start = 1;
      nextPowerOfTwo *= 2;
    } else {
      numBits.push(1 + numBits[start]);
      start += 1;
    }
  }

  return numBits;
};

// for (let i = 0; i < 50; i += 1) logOutList(numberBetween(1, 10000))

const tests = [
  0,
  1,
  400,
  8635,
  8192,
  1943,
  9740,
  9051,
  1185,
  4346,
  6191,
  2086,
  4296,
  7465,
  8331,
  3410,
  8510,
  538,
  4362,
  1520,
  2655,
  945,
  6299,
  8396,
  8532,
  6935,
  6223,
  7911,
  6883,
  9529,
  1632,
  7432,
  3342,
  9950,
  5645,
  7481,
  8803,
  4285,
  7882,
  6957,
  2455,
  3125,
  1940,
  8550,
  4839,
  345,
  5489,
  7294,
  591,
  5363,
  2778,
  3197,
  1397,
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(countBits(test));
  console.timeEnd(i);
  i += 1;
}

/*
00000001
00000010
00000011
00000100

0
1
8635
8192
1943
9740
9051
1185
4346
6191
2086
4296
7465
8331
3410
8510
538
4362
1520
2655
945
6299
8396
8532
6935
6223
7911
6883
9529
1632
7432
3342
9950
5645
7481
8803
4285
7882
6957
2455
3125
1940
8550
4839
345
5489
7294
591
5363
2778
3197
1397
*/
