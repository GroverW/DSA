/*
For two strings s and t, we say "t divides s" if and only if s = t + ... + t  (t concatenated with itself 1 or more times)

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.



Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: ""
Example 4:

Input: str1 = "ABCDEF", str2 = "ABC"
Output: ""
*/

var gcdOfStrings = function (str1, str2) {
  const small = str1.length <= str2.length ? str1 : str2;
  const large = str1.length <= str2.length ? str2 : str1;
  const smallLen = small.length;
  const largeLen = large.length;

  let curr = 1;
  let divisor = Math.floor(smallLen / curr);
  while (divisor > 0) {
    if (divisor === smallLen / curr && (Math.floor(largeLen / divisor) === largeLen / divisor)) {
      let targetSmall = small.slice(0, divisor);
      let targetLarge = large.slice(0, divisor);
      if (
        targetSmall === targetLarge
        && dividesStr(divisor, small, targetSmall)
        && dividesStr(divisor, large, targetLarge)
      ) return targetSmall;
    }
    curr += 1;
    divisor = Math.floor(smallLen / curr);
  }

  return '';
};

const dividesStr = (len, str, target) => {
  let start = 0;
  while (start < str.length) {
    if (str.slice(start, start + len) !== target) return false;
    start += len;
  }

  return true;
}