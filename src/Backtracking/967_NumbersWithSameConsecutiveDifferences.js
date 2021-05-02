/*
Return all non-negative integers of length n such that the absolute difference between every two consecutive digits is k.

Note that every number in the answer must not have leading zeros. For example, 01 has one leading zero and is invalid.

You may return the answer in any order.

 

Example 1:

Input: n = 3, k = 7
Output: [181,292,707,818,929]
Explanation: Note that 070 is not a valid number, because it has leading zeroes.
Example 2:

Input: n = 2, k = 1
Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
Example 3:

Input: n = 2, k = 0
Output: [11,22,33,44,55,66,77,88,99]
Example 4:

Input: n = 2, k = 2
Output: [13,20,24,31,35,42,46,53,57,64,68,75,79,86,97]
 

Constraints:

2 <= n <= 9
0 <= k <= 9
*/

var numsSameConsecDiff = function(n, k) {
  if (!k) {
    return new Array(9).fill('').map((_, i) => +((i + 1).toString().repeat(n)))
  }
  
  const numbers = [];
  
  const findNumbers = (num, last) => {
    if (num.length === n) {
      numbers.push(+num)
      return;
    }
    
    const nextHigher = last + k;
    if (nextHigher <= 9) {
      findNumbers(num + nextHigher, nextHigher);
    }
    
    const nextLower = last - k;
    if (nextLower >= 0) {
      findNumbers(num + nextLower, nextLower);
    }
  }
  
  for(let i = 1; i <= 9; i += 1) {
    if(i + k > 9 && i - k < 0) continue;
    findNumbers(i.toString(), i);
  }
  
  return numbers;
};