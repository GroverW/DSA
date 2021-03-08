/*
Convert a non-negative integer num to its English words representation.

 

Example 1:

Input: num = 123
Output: "One Hundred Twenty Three"
Example 2:

Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"
Example 3:

Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
Example 4:

Input: num = 1234567891
Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"
 

Constraints:

0 <= num <= 231 - 1
*/

var numberToWords = function(num) {
  if (!num) return "Zero";
  
  const numToWordMap = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety",
  }  
  
  let remainder = num;
  const suffixes = ["Billion", "Million", "Thousand", ""];
  const answer = [];
  
  while(remainder) {
    const next = remainder % 1000;
    remainder = Math.floor(remainder / 1000);
    
    answer.unshift(...hundredsToWord(next, numToWordMap, suffixes.pop()));
  }
  
  return answer.join(' ');
};

const hundredsToWord = (num, wordMap, suffix) => {
  if (!num) return [];
  const result = [];
  const tensAndOnes = num % 100;
  const hundreds = Math.floor(num / 100);
  
  if (hundreds) {
    result.push(wordMap[hundreds], 'Hundred')
  }
  
  if (tensAndOnes) {
    if (tensAndOnes <= 20) {
      result.push(wordMap[tensAndOnes]);
    } else {
      const ones = tensAndOnes % 10;
      const tens = Math.floor(tensAndOnes / 10) * 10;
      if (tens) result.push(wordMap[tens])
      if (ones) result.push(wordMap[ones]);
    }
  }
  
  if (suffix) result.push(suffix);
  
  return result;
}

/*

*/

// const maxLen = 100;

// for (let i = 0; i < 25; i += 1) {
  

//   // logOutList('"' + parenString + '",')
//   // logOutList(printRow([commands, actions]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//     logOutList(numberBetween(1, 100) + ',');
//     logOutList(numberBetween(100, 1000) + ',');
//     logOutList(numberBetween(100000, 1000000000) + ',');

//   //   // logOutList(printRow(actions) + '],')
// }

const tests = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  1000,
  999,
  10000,
  99999,
  100000,
  999999,
  1000000,
  9999999,
  10000000,
  99999999,
  100000000,
  999999999,
  78,
  955,
  89007426,
  35,
  528,
  986075944,
  38,
  663,
  734889257,
  63,
  593,
  387468360,
  36,
  220,
  323278535,
  54,
  498,
  248531129,
  88,
  780,
  6278014,
  3,
  518,
  589145373,
  99,
  224,
  358401272,
  6,
  657,
  521836309,
  15,
  583,
  251403683,
  23,
  339,
  655720197,
  39,
  284,
  192952450,
  1,
  325,
  917366405,
  91,
  388,
  335002038,
  4,
  789,
  15061270,
  82,
  397,
  60846266,
  92,
  231,
  51056012,
  59,
  500,
  252992910,
  94,
  455,
  814618097,
  58,
  100,
  614072422,
  50,
  355,
  771044280,
  36,
  591,
  132094751,
  47,
  859,
  481318712,
  2,
  303,
  929183156,
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(numberToWords(test));
  console.timeEnd(i);
  i += 1;
}

/*
0
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
30
40
50
60
70
80
90
100
1000
999
10000
99999
100000
999999
1000000
9999999
10000000
99999999
100000000
999999999
78
955
89007426
35
528
986075944
38
663
734889257
63
593
387468360
36
220
323278535
54
498
248531129
88
780
6278014
3
518
589145373
99
224
358401272
6
657
521836309
15
583
251403683
23
339
655720197
39
284
192952450
1
325
917366405
91
388
335002038
4
789
15061270
82
397
60846266
92
231
51056012
59
500
252992910
94
455
814618097
58
100
614072422
50
355
771044280
36
591
132094751
47
859
481318712
2
303
929183156
*/
