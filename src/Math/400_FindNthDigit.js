/*
Find the nth digit of the infinite integer sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...

Note:
n is positive and will fit within the range of a 32-bit signed integer (n < 231).

Example 1:

Input:
3

Output:
3
Example 2:

Input:
11

Output:
0

Explanation:
The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.

*/

var findNthDigit = function (n) {
  let count = 9;
  let numberOfDigits = 1;

  let maxSmaller = 0;

  while (maxSmaller + count * numberOfDigits < n) {
    maxSmaller += count * numberOfDigits;
    count *= 10;
    numberOfDigits += 1;
  }

  const digitsIntoRange = n - maxSmaller;
  const numberInRange = Math.floor(digitsIntoRange / numberOfDigits);
  const digitPosition = digitsIntoRange % numberOfDigits;
  const digit = digitPosition || numberOfDigits;
  const number = 10 ** (numberOfDigits - 1) + numberInRange - !digitPosition;
  return +(number.toString())[digit - 1];
};

/*
9 * 1
90 * 2 (180)
900 * 3 (2700)
9000 * 4 (36000)
90000 * 5 (450000)
900000 * 6 (5400000)
9000000 * 7 (63000000)
90000000 * 8 (720000000)
*/

// for(let i = 0; i < 50; i += 1) logOutList(numberBetween(1, 2000000000))

const tests = [
  1,
  10,
  11,
  2104,
  2040241,
  9292923,
  1016302093,
  1628248187,
  1217551897,
  997243215,
  563611907,
  739135364,
  1484970012,
  267483178,
  656312414,
  380847520,
  1215578556,
  1362642294,
  501680246,
  1083301877,
  1701170224,
  1443836671,
  1812078125,
  1918851535,
  60470602,
  1249427183,
  711571876,
  1517374522,
  1526910151,
  688749636,
  908644184,
  1193485667,
  230984436,
  1095814475,
  1479562802,
  948719092,
  93216852,
  228722439,
  1964351161,
  344729374,
  109846795,
  505286547,
  1951365642,
  1845451912,
  524220071,
  275891674,
  1286719745,
  1831916673,
  1227205236,
  113283271,
  1295364908,
  478778502,
  390641610,
  638670772,
  1799423581,
  1370633149,
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(findNthDigit(test));
  console.timeEnd(i);
  i += 1;
}

/*
1
10
11
2104
2040241
9292923
1016302093
1628248187
1217551897
997243215
563611907
739135364
1484970012
267483178
656312414
380847520
1215578556
1362642294
501680246
1083301877
1701170224
1443836671
1812078125
1918851535
60470602
1249427183
711571876
1517374522
1526910151
688749636
908644184
1193485667
230984436
1095814475
1479562802
948719092
93216852
228722439
1964351161
344729374
109846795
505286547
1951365642
1845451912
524220071
275891674
1286719745
1831916673
1227205236
113283271
1295364908
478778502
390641610
638670772
1799423581
1370633149

*/
