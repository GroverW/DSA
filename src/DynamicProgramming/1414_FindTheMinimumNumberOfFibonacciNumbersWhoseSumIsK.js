/*
Given the number k, return the minimum number of Fibonacci numbers whose sum is equal to k, whether a Fibonacci number could be used multiple times.

The Fibonacci numbers are defined as:

F1 = 1
F2 = 1
Fn = Fn-1 + Fn-2 , for n > 2.
It is guaranteed that for the given constraints we can always find such fibonacci numbers that sum k.


Example 1:

Input: k = 7
Output: 2
Explanation: The Fibonacci numbers are: 1, 1, 2, 3, 5, 8, 13, ...
For k = 7 we can use 2 + 5 = 7.
Example 2:

Input: k = 10
Output: 2
Explanation: For k = 10 we can use 2 + 8 = 10.
Example 3:

Input: k = 19
Output: 3
Explanation: For k = 19 we can use 1 + 5 + 13 = 19.


Constraints:

1 <= k <= 10^9
*/


var findMinFibonacciNumbers = function (k) {
  const fibNums = generateFibonacciNumbers(k);

  let remainder = k - fibNums[fibNums.length - 1];
  let count = 1;

  let left = 0;
  let right = fibNums.length - 2;
  let mid;

  while (left <= right && remainder) {
    mid = Math.floor((left + right) / 2);

    if (fibNums[mid] === remainder) {
      return count + 1;
    } else if(fibNums[mid] < remainder && fibNums[mid + 1] > remainder) {
      remainder -= fibNums[mid];
      count += 1;
      right = mid - 1;
      left = 0;
    } else if(fibNums[mid] < remainder) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return count;
};

const generateFibonacciNumbers = (max) => {
  const nums = [1];

  let first = 0;
  let second = -1;
  let curr = 1;

  while (curr <= max) {
    nums.push(curr);
    first += 1;
    second += 1;
    curr = nums[first] + nums[second];
  }

  return nums;
}


const tests = [
  1, 5, 7, 10, 19, 16, 244,
];

for (let test of tests) {
  logOutList(findMinFibonacciNumbers(test))
}
