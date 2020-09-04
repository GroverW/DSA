/*
Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

Example:

Input: S = "ADOBECODEBANC", T = "ABC"
Output: "BANC"
Note:

If there is no such window in S that covers all characters in T, return the empty string "".
If there is such window, you are guaranteed that there will always be only one unique minimum window in S.
*/

var minWindow = function (s, t) {
  const freq = {};
  const def = {}
  let count = t.length;
  for (let char of t) {
    def[char] = def[char] + 1 || 1;
    freq[char] = 0;
  };
  let fast = -1;
  let slow = 0;

  let windowEnd = Infinity;
  let windowStart = -Infinity;

  while (fast < s.length) {
    if (count) {
      fast += 1;
      if(def[s[fast]]) {
        freq[s[fast]] += 1;
        if (freq[s[fast]] <= def[s[fast]]) count -= 1;
      }
    } else {
      if (fast - slow < windowEnd - windowStart) {
        windowEnd = fast;
        windowStart = slow;
      }

      if (def[s[slow]]) {
        if (freq[s[slow]] <= def[s[slow]]) count += 1;
        freq[s[slow]] -= 1;
      }

      slow += 1;
    }
  }

  return windowEnd !== Infinity ? s.slice(windowStart, windowEnd + 1) : '';
};

const tests = [
  ["ADOBECODEBANC", "ABC"],
  ["AAAA", "A"],
  ["ABBCDDEFG", "AG"],
  ["aa", "aa"],
];

for (let test of tests) {
  logOutList(minWindow(...test));
}