/*
Given an integer, write a function to determine if it is a power of two.

Example 1:

Input: 1
Output: true
Explanation: 20 = 1
Example 2:

Input: 16
Output: true
Explanation: 24 = 16
Example 3:

Input: 218
Output: false
*/

var isPowerOfTwo = function (n) {
  let curr = 0;
  let ans = 2 ** curr;


  while (ans <= n) {
    if (ans === n) return true;
    curr += 1;
    ans = 2 ** curr;
  }

  return false;
};