/*
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: "cbbd"
Output: "bb"
*/

var longestPalindrome = function (s) {
  const odds = getPalindrome(s);
  const evens = getPalindrome(s, 0);

  return odds.length > evens.length ? odds : evens;
};

const getPalindrome = (s, b = 1) => {
  let r = 0;
  let m = 0;
  let longest = 0;
  const pLengths = new Array(s.length).fill(0);

  for (let i = 0; i < s.length; i += 1) {
    let mirror = 2 * m - i;

    if (i < r) {
      pLengths[i] = Math.min(r - i, pLengths[mirror]);
    }

    while (s[i + (pLengths[i] + b)] && s[i + (pLengths[i] + b)] === s[i - (pLengths[i] + 1)]) {
      pLengths[i] += 1;

      if (i + pLengths[i] > r) {
        m = i;
        r = i + pLengths[i];
      }
    }

    if (pLengths[i] > pLengths[longest]) longest = i;
  }

  return s.slice(longest - pLengths[longest], longest + pLengths[longest] + b)
}

const tests = [
  'babad',
  'cbbd',
  'acbbca',
  'lmabcdedcbafd',
  'ababbabbaba',
  'a',
  '',
];

for (let test of tests) {
  logOutList(longestPalindrome(test));
}