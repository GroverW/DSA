/*
A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.



Example 1:

Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
*/

var partitionLabels = function(S) {
  const freq = {};
  const partitions = [];

  for (let char of S) {
      freq[char] = freq[char] + 1 || 1;
  }

  let letters = {};
  let lettersTouched = 0;
  let partitionSize = 0;

  for(let i = 0; i < S.length; i += 1) {
      partitionSize += 1;
      const char = S[i];
      if(!letters[char]) lettersTouched += 1;
      letters[char] = true;
      freq[char] -= 1;
      if(freq[char] === 0) {
          letters[char] = false;
          lettersTouched -= 1;
          if(lettersTouched === 0) {
              partitions.push(partitionSize);
              partitionSize = 0;
          }
      }
  }

  return partitions;
};