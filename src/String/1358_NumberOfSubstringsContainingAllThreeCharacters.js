/*
Given a string s consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence of all these characters a, b and c.



Example 1:

Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).
Example 2:

Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".
Example 3:

Input: s = "abc"
Output: 1


Constraints:

3 <= s.length <= 5 x 10^4
s only consists of a, b or c characters.
*/


// UGLY!
var numberOfSubstrings = function (s) {
  let counts = {
    'a': 0,
    'b': 0,
    'c': 0,
  };

  let curr = 0;
  let follow = 0;
  counts[s[curr]] += 1;
  let remaining = 2;
  let numSubstrings = 0;

  while (true) {
    if (remaining > 0 && curr < s.length - 1) {
      curr += 1;
      counts[s[curr]] += 1;
      if (counts[s[curr]] === 1) remaining -= 1;
    } else if (remaining === 0) {
      numSubstrings += Math.max(1, s.length - curr);
      counts[s[follow]] -= 1;
      if (counts[s[follow]] === 0) remaining += 1;
      follow += 1;
    } else {
      break;
    }
  }

  return numSubstrings;
};




const tests = [
  "abcabc",
  "aaacb",
  "abacbabacbacbcbbcbbbabcbabacbbaaaabcabcbababc",
  "abc",
  "acaccbbab",
  "bcaccbcc",
  "cacca",
  "cbaaaccbbaabccccbcacbcabaababbbbccabaac",
];

for (let test of tests) {
  logOutList(numberOfSubstrings(test));
}