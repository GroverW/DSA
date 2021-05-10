/*
Given a binary string s (a string consisting only of '0's and '1's), we can split s into 3 non-empty strings s1, s2, s3 (s1+ s2+ s3 = s).

Return the number of ways s can be split such that the number of characters '1' is the same in s1, s2, and s3.

Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: s = "10101"
Output: 4
Explanation: There are four ways to split s in 3 parts where each part contain the same number of letters '1'.
"1|010|1"
"1|01|01"
"10|10|1"
"10|1|01"
Example 2:

Input: s = "1001"
Output: 0
Example 3:

Input: s = "0000"
Output: 3
Explanation: There are three ways to split s in 3 parts.
"0|0|00"
"0|00|0"
"00|0|0"
Example 4:

Input: s = "100100010100110"
Output: 12
 

Constraints:

3 <= s.length <= 10^5
s[i] is '0' or '1'.
*/

var numWays = function(s) {
  const MOD = 10 ** 9 + 7;
  const countIndices = [];
  let countOnes = 0;
  let countAllZeros = 0;
  
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '1') {
      countOnes += 1;
      countIndices.push(i);
    }
    
    countAllZeros = (countAllZeros + Math.max(0, s.length - i - 2)) % MOD;
  }
  
  if (!countOnes) return countAllZeros;
  if (countOnes % 3) return 0;
  
  const targetCount = countOnes / 3;
  const endFirst = countIndices[targetCount - 1];
  const startSecond = countIndices[targetCount];
  const endSecond = countIndices[targetCount * 2 - 1];
  const startThird = countIndices[targetCount * 2];
  
  return ((startSecond - endFirst) * (startThird - endSecond)) % MOD;
};

const maxLen = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(3, maxLen);

  const options = '0000000001';
  
  const str = new Array(len).fill('').map(() => randomOption(options));
  const countOnes = str.reduce((count, val) => count + (val === '1' ? 1 : 0), 0)
  str.push('1'.repeat(3 - countOnes % 3))

  logOutList('"' + str.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(grid));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([values, labels, num_wanted, use_limit])
}