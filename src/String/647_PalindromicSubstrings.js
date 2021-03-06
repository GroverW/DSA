/*
Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.

Example 1:

Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".


Example 2:

Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
*/

var countSubstrings = function(s) {
  let count = 0;

  for(let i = 0; i < s.length; i += 1) {
      count += 1;

      let j = 1;
      while(s[i+j] && s[i + j] === s[i - j]) {
          count += 1;
          j += 1;
      }
      j = 0;
      while(s[i+j] && s[i + j] === s[i - j - 1]) {
          count += 1
          j += 1;
      };
  }

  return count;
};