/*
Given an array of integers cost and an integer target. Return the maximum integer you can paint under the following rules:

The cost of painting a digit (i+1) is given by cost[i] (0 indexed).
The total cost used must be equal to target.
Integer does not have digits 0.
Since the answer may be too large, return it as string.

If there is no way to paint any integer given the condition, return "0".



Example 1:

Input: cost = [4,3,2,5,6,7,2,5,5], target = 9
Output: "7772"
Explanation:  The cost to paint the digit '7' is 2, and the digit '2' is 3. Then cost("7772") = 2*3+ 3*1 = 9. You could also paint "977", but "7772" is the largest number.
Digit    cost
  1  ->   4
  2  ->   3
  3  ->   2
  4  ->   5
  5  ->   6
  6  ->   7
  7  ->   2
  8  ->   5
  9  ->   5
Example 2:

Input: cost = [7,6,5,5,5,6,8,7,8], target = 12
Output: "85"
Explanation: The cost to paint the digit '8' is 7, and the digit '5' is 5. Then cost("85") = 7 + 5 = 12.
Example 3:

Input: cost = [2,4,6,2,4,6,4,4,4], target = 5
Output: "0"
Explanation: It's not possible to paint any integer with total cost equal to target.
Example 4:

Input: cost = [6,10,15,40,40,40,40,40,40], target = 47
Output: "32211"


Constraints:

cost.length == 9
1 <= cost[i] <= 5000
1 <= target <= 5000
*/

var largestNumber = function (cost, target) {
  const digits = new Array(target + 1).fill(-Infinity);
  digits[0] = 0;

  for (let currentCost = 1; currentCost <= target; currentCost += 1) {
    for (let i = 0; i < cost.length; i += 1) {
      if (digits[currentCost - cost[i]] >= 0) {
        digits[currentCost] = Math.max(
          digits[currentCost],
          digits[currentCost - cost[i]] + 1,
        );
      }
    }
  }

  if (digits[target] < 0) return '0';

  let res = '';
  let digitsRemaining = digits[target];
  let costRemaining = target;
  for (let i = cost.length - 1; i >= 0; i -= 1) {
    while (
      digitsRemaining > 0
      && digits[costRemaining - cost[i]] === digitsRemaining - 1
    ) {
      costRemaining -= cost[i];
      digitsRemaining -= 1;
      res += (i + 1);
    }
  }

  return res;
};


const tests = [
  [[4, 3, 2, 5, 6, 7, 2, 5, 5], 9],
  [[7, 6, 5, 5, 5, 6, 8, 7, 8], 12],
  [[2, 4, 6, 2, 4, 6, 4, 4, 4], 5],
  [[6, 10, 15, 40, 40, 40, 40, 40, 40], 47],
  [[1, 1, 1, 1, 1, 1, 1, 1, 1], 5000],
];

for (let test of tests) {
  logOutList(largestNumber(...test))
}


// Clunkier way of doing it

var largestNumber = function (cost, target) {
  let max = '0';

  const digits = new Array(target + 1).fill(null);
  digits[0] = new Array(10).fill(0);

  for (let currentCost = 1; currentCost <= target; currentCost += 1) {
    for (let i = 0; i < cost.length; i += 1) {
      if (digits[currentCost - cost[i]]) {
        const prevDigits = digits[currentCost - cost[i]];
        const currDigits = [...prevDigits];
        currDigits[i + 1] += 1;
        currDigits[0] += 1;
        if (!digits[currentCost] || isLargerNumber(currDigits, digits[currentCost])) {
          digits[currentCost] = currDigits;
        }
      }
    }
  }



  return digits[target] ? createNumber(digits[target]) : '0';
};

const createNumber = (digits) => {
  let number = '';
  for(let i = 9; i > 0; i -= 1) {
    while(digits[i]) {
      number += i;
      digits[i] -= 1;
    }
  }

  return number;
}

const isLargerNumber = (digits1, digits2) => {
  if(digits1[0] !== digits2[0]) return digits1[0] > digits2[0];
  for (let i = 9; i > 0; i -= 1) {
    if (digits1[i] !== digits2[i]) return digits1[i] > digits2[i];
  }

  return false;
}