/*
Given two integers a and b, return any string s such that:

s has length a + b and contains exactly a 'a' letters, and exactly b 'b' letters,
The substring 'aaa' does not occur in s, and
The substring 'bbb' does not occur in s.
 

Example 1:

Input: a = 1, b = 2
Output: "abb"
Explanation: "abb", "bab" and "bba" are all correct answers.
Example 2:

Input: a = 4, b = 1
Output: "aabaa"
 

Constraints:

0 <= a, b <= 100
It is guaranteed such an s exists for the given a and b.
*/

// clever
var strWithout3a3b = function(a, b) {
  if (a === 0) return 'b'.repeat(b);
  if (b === 0) return 'a'.repeat(a);
  if (a === b) return 'ab'.repeat(a);
  if (a > b) return 'aab' + strWithout3a3b(a - 2, b - 1);
  return 'bba' + strWithout3a3b(a - 1, b - 2);
}


var strWithout3a3b = function(a, b) {
  let larger = Math.max(a, b);
  let smaller = Math.min(a, b);
  let letter1 = larger === a ? 'a' : 'b';
  let letter2 = larger === a ? 'b' : 'a';
  
  let result = '';
  
  while (larger) {
    result += letter1;
    larger -= 1;
    
    if (larger > smaller) {
      result += letter1;
      larger -= 1;
    }
    
    if (smaller) {
      result += letter2;
      smaller -= 1;  
    }
  }
  
  return result;
};