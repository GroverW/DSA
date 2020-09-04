/*
Given a string s, you are allowed to convert it to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.

Example 1:

Input: "aacecaaa"
Output: "aaacecaaa"
Example 2:

Input: "abcd"
Output: "dcbabcd"
*/

var shortestPalindrome = function (s) {
  const odds = getPalindrome(s);
  const evens = getPalindrome(s, 0);
  const res = odds.length < evens.length ? odds : evens;

  return res.split('').reverse().join('') + s;
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

    if (pLengths[i] > pLengths[longest] && i - pLengths[i] === 0) longest = i;
  }

  return s.slice(longest + pLengths[longest] + b)
}

const tests = [
  "aacecaaa",
  'abcd',
  'accdedccfg',
  'accaccag',
];

for (let test of tests) {
  logOutList(shortestPalindrome(test));
}