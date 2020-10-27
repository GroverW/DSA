/*
Given a string s, find the length of the longest substring without repeating characters.



Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
Example 4:

Input: s = ""
Output: 0
*/

var lengthOfLongestSubstring = function (s) {
  let longest = 0, sub = '';

  for (let i = 0; i < s.length; i++) {
    if (sub.indexOf(s[i]) !== -1) {
      longest = Math.max(longest, sub.length);
      sub = sub.slice(sub.indexOf(s[i]) + 1);
    }
    sub += s[i];
  }

  return Math.max(longest, sub.length);
};

// cleaner
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let maxLength = 0;
  const used = new Set();

  for (let i = 0; i < s.length; i += 1) {
    const character = s[i];
    while (used.has(character)) {
      used.delete(s[start]);
      start += 1;
    }

    used.add(character);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
};

const tests = [
  "abcabcbb",
  "bbbbb",
  "pwwkew",
  "apIASHPEWIOpaoisdhowiefhpSOIhPSIHFDpwoiefnap29 pasdihf _@(*H 2-hsa ",
  "padisn 123piasd -2 -avjcxb23 j",
  "apdsaipah9-8dsav- a9 8d-ha -",
  "apibcvaOIPE!@pwfenQnpiOFHiu-",
  "aAbBcCdD",
];

for (let test of tests) {
  logOutList(lengthOfLongestSubstring(test));
}