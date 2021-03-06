/*
Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.

Example 1:

Input: a = 1, b = 2
Output: 3
Example 2:

Input: a = -2, b = 3
Output: 1
*/

var getSum = function(a, b) {
  let carry = 0;
  
  while (b) {
    carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  
  return a;
};