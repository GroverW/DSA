/*
Two strings are considered close if you can attain one from the other using the following operations:

Operation 1: Swap any two existing characters.
For example, abcde -> aecdb
Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
You can use the operations on either string as many times as necessary.

Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

 

Example 1:

Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"
Example 2:

Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
Example 3:

Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"
Example 4:

Input: word1 = "cabbba", word2 = "aabbss"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any amount of operations.
 

Constraints:

1 <= word1.length, word2.length <= 105
word1 and word2 contain only lowercase English letters.
*/

var closeStrings = function (word1, word2) {
  if (word1.length !== word2.length) return false;

  const letters1 = new Array(26).fill(0);
  const letters2 = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < word1.length; i += 1) {
    letters1[word1.charCodeAt(i) - aCode] += 1;
    letters2[word2.charCodeAt(i) - aCode] += 1;
  }

  for (let i = 0; i < letters1.length; i += 1) {
    if (!!letters1[i] ^ !!letters2[i]) return false;
  }

  const counts1 = letters1.sort((a, b) => a - b).join(',');
  const counts2 = letters2.sort((a, b) => a - b).join(',');

  return counts1 === counts2;
};

const tests = [
  ["abc", "bca"],
  ["a", "aa"],
  ["cabbba", "abbccc"],
  ["aabbccddee", "aabbccddff"],
  ["cabbba", "aabbss"]
]