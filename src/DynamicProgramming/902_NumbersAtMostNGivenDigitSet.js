/*
Given an array of digits, you can write numbers using each digits[i] as many times as we want.  For example, if digits = ['1','3','5'], we may write numbers such as '13', '551', and '1351315'.

Return the number of positive integers that can be generated that are less than or equal to a given integer n.

 

Example 1:

Input: digits = ["1","3","5","7"], n = 100
Output: 20
Explanation: 
The 20 numbers that can be written are:
1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.
Example 2:

Input: digits = ["1","4","9"], n = 1000000000
Output: 29523
Explanation: 
We can write 3 one digit numbers, 9 two digit numbers, 27 three digit numbers,
81 four digit numbers, 243 five digit numbers, 729 six digit numbers,
2187 seven digit numbers, 6561 eight digit numbers, and 19683 nine digit numbers.
In total, this is 29523 integers that can be written using the digits array.
Example 3:

Input: digits = ["7"], n = 8
Output: 1
 

Constraints:

1 <= digits.length <= 9
digits[i].length == 1
digits[i] is a digit from '1' to '9'.
All the values in digits are unique.
1 <= n <= 109
*/

var atMostNGivenDigitSet = function (digits, n) {
  const maxDigits = n.toString();

  const counts = new Array(maxDigits.length).fill(0)
    .map((_, digit) => digits.length ** (maxDigits.length - digit - 1));

  const sums = [...counts];
  for (let i = sums.length - 2; i >= 0; i -= 1) sums[i] += sums[i + 1];

  let totalNums = 0;

  const findTotals = (index) => {
    if (index === counts.length) {
      totalNums += 1;
      return;
    }

    digits.forEach((digit) => {
      if (digit < maxDigits[index]) totalNums += counts[index];
      else if (digit === maxDigits[index]) findTotals(index + 1);
    });
  }

  digits.forEach((digit) => {
    if (digit < maxDigits[0]) totalNums += sums[0];
    else if (digit >= maxDigits[0]) totalNums += sums[1] || 0;

    if (digit === maxDigits[0]) findTotals(1);
  });

  return totalNums;
};

// const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
// for (let i = 0; i < 10; i += 1) {
//   const max = 10 ** (i + 1);
//   const numDigits = Math.floor(Math.random() * 9) + 1;
//   const randomized = randomize(digits);
//   const selected = randomized.slice(randomized.length - numDigits);
//   for (let j = 0; j < 3; j += 1) {
//     const num = Math.floor(Math.random() * max);

//     logOutList(printRow([selected, num]));
//   }
// }
/*
  131
  *1 *3 *5 *7
  16 16 16 16
   4  4  4  4
   1  1  1  1


*/

const tests = [
  [["1", "3", "5", "7"], 100],
  [["1", "3", "5", "7"], 131],
  [["1", "4", "9"], 1000000000],
  [["7"], 8],
  [["9", "6", "1", "5", "2", "8"], 4],
  [["9", "6", "1", "5", "2", "8"], 8],
  [["9", "6", "1", "5", "2", "8"], 5],
  [["4", "7", "9", "2", "6", "5", "1", "8", "3"], 50],
  [["4", "7", "9", "2", "6", "5", "1", "8", "3"], 42],
  [["4", "7", "9", "2", "6", "5", "1", "8", "3"], 87],
  [["9", "4", "6", "1", "5"], 282],
  [["9", "4", "6", "1", "5"], 101],
  [["9", "4", "6", "1", "5"], 201],
  [["2", "4", "3", "9", "8", "1"], 2897],
  [["2", "4", "3", "9", "8", "1"], 5333],
  [["2", "4", "3", "9", "8", "1"], 8192],
  [["1", "4", "7", "3", "5", "8"], 43688],
  [["1", "4", "7", "3", "5", "8"], 96300],
  [["1", "4", "7", "3", "5", "8"], 72305],
  [["6", "3", "5", "8", "2", "4", "9", "1", "7"], 567375],
  [["6", "3", "5", "8", "2", "4", "9", "1", "7"], 585230],
  [["6", "3", "5", "8", "2", "4", "9", "1", "7"], 278222],
  [["4"], 2375722],
  [["4"], 6498678],
  [["4"], 8875123],
  [["7", "4", "1", "6", "8", "5", "2"], 94861618],
  [["7", "4", "1", "6", "8", "5", "2"], 56159120],
  [["7", "4", "1", "6", "8", "5", "2"], 1324836],
  [["8", "6", "1", "4", "2", "3"], 928497527],
  [["8", "6", "1", "4", "2", "3"], 472408116],
  [["8", "6", "1", "4", "2", "3"], 774800816],
  [["4", "7", "2", "5", "1", "6", "8"], 676300211],
  [["4", "7", "2", "5", "1", "6", "8"], 684672572],
  [["4", "7", "2", "5", "1", "6", "8"], 148882406],
];

for (let test of tests) {
  logOutList(atMostNGivenDigitSet(...test));
}

/*
["1", "3", "5", "7"]
100
["1", "3", "5", "7"]
131
["1", "4", "9"]
1000000000
["7"]
8
["1", "2", "5", "6", "8", "9"]
4
["1", "2", "5", "6", "8", "9"]
8
["1", "2", "5", "6", "8", "9"]
5
["1", "2", "3", "4", "5", "6", "7", "8", "9"]
50
["1", "2", "3", "4", "5", "6", "7", "8", "9"]
42
["1", "2", "3", "4", "5", "6", "7", "8", "9"]
87
["1", "4", "5", "6", "9"]
282
["1", "4", "5", "6", "9"]
101
["1", "4", "5", "6", "9"]
201
["1", "2", "3", "4", "8", "9"]
2897
["1", "2", "3", "4", "8", "9"]
5333
["1", "2", "3", "4", "8", "9"]
8192
["1", "3", "4", "5", "7", "8"]
43688
["1", "3", "4", "5", "7", "8"]
96300
["1", "3", "4", "5", "7", "8"]
72305
["1", "2", "3", "4", "5", "6", "7", "8", "9"]
567375
["1", "2", "3", "4", "5", "6", "7", "8", "9"]
585230
["1", "2", "3", "4", "5", "6", "7", "8", "9"]
278222
["4"]
2375722
["4"]
6498678
["4"]
8875123
["1", "2", "4", "5", "6", "7", "8"]
94861618
["1", "2", "4", "5", "6", "7", "8"]
56159120
["1", "2", "4", "5", "6", "7", "8"]
1324836
["1", "2", "3", "4", "6", "8"]
928497527
["1", "2", "3", "4", "6", "8"]
472408116
["1", "2", "3", "4", "6", "8"]
774800816
["1", "2", "4", "5", "6", "7", "8"]
676300211
["1", "2", "4", "5", "6", "7", "8"]
684672572
["1", "2", "4", "5", "6", "7", "8"]
148882406
*/