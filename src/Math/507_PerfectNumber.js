/*
A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. A divisor of an integer x is an integer that can divide x evenly.

Given an integer n, return true if n is a perfect number, otherwise return false.

 

Example 1:

Input: num = 28
Output: true
Explanation: 28 = 1 + 2 + 4 + 7 + 14
1, 2, 4, 7, and 14 are all divisors of 28.
Example 2:

Input: num = 6
Output: true
Example 3:

Input: num = 496
Output: true
Example 4:

Input: num = 8128
Output: true
Example 5:

Input: num = 2
Output: false
 

Constraints:

1 <= num <= 108
*/


var checkPerfectNumber = function (num) {
  if (num === 1) return false;
  const divisors = [1];

  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) divisors.push(i, num / i);
  }

  return divisors.reduce((sum, divisor) => sum + divisor, 0) === num;
};


const tests = [
  28,
  6,
  496,
  8128,
  100000000,
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(cherryPickup(test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
28
6
496
8128
100000000
*/