/*
Given a string s, determine if it is valid.

A string s is valid if, starting with an empty string t = "", you can transform t into s after performing the following operation any number of times:

Insert string "abc" into any position in t. More formally, t becomes tleft + "abc" + tright, where t == tleft + tright. Note that tleft and tright may be empty.
Return true if s is a valid string, otherwise, return false.

 

Example 1:

Input: s = "aabcbc"
Output: true
Explanation:
"" -> "abc" -> "aabcbc"
Thus, "aabcbc" is valid.
Example 2:

Input: s = "abcabcababcc"
Output: true
Explanation:
"" -> "abc" -> "abcabc" -> "abcabcabc" -> "abcabcababcc"
Thus, "abcabcababcc" is valid.
Example 3:

Input: s = "abccba"
Output: false
Explanation: It is impossible to get "abccba" using the operation.
Example 4:

Input: s = "cababc"
Output: false
Explanation: It is impossible to get "cababc" using the operation.
 

Constraints:

1 <= s.length <= 2 * 104
s consists of letters 'a', 'b', and 'c'
*/

var isValid = function(s) {
  const stack = [];
  
  for (let letter of s) {
    if (letter === 'a') {
      stack.push(letter);
    } else if (letter === 'b') {
      if (stack[stack.length - 1] !== 'a') {
        return false;
      }
      
      stack[stack.length - 1] = letter;
    } else {
      if (stack[stack.length - 1] !== 'b') {
        return false;
      }
      
      stack.pop();
    }
  }
  
  return stack.length === 0;
};

const tests: Indexable<any>[] = [
  "aabcbc",
  "abcabcababcc",
  "abccba",
  "cababc",
  "aaabcbcbababccc",
];

let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(isValid(test));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}