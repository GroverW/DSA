/*
Given a string and a string dictionary, find the longest string in the dictionary that can be formed by deleting some characters of the given string. If there are more than one possible results, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

Example 1:
Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

Output:
"apple"
Example 2:
Input:
s = "abpcplea", d = ["a","b","c"]

Output:
"a"
Note:
All the strings in the input will only contain lower-case letters.
The size of the dictionary won't exceed 1,000.
The length of all the strings in the input won't exceed 1,000.
*/

var findLongestWord = function (s, d) {
  let maxLength = 0;
  let maxWord = '';

  for (let word of d) {
    if (
      word.length > maxLength
      || (word.length === maxLength && word < maxWord)
    ) {
      if (isSubsequence(word, s)) {
        maxLength = word.length;
        maxWord = word;
      }
    }
  }

  return maxWord;
};

const isSubsequence = (word1, word2) => {
  let curr = 0;

  for(let char of word2) {
    if(word1[curr] === char) {
      curr += 1;
    }
  }

  return curr === word1.length;
}

const tests = [
  ['abpcplea', ["ale","apple","monkey","plea"]],
  ['abpcplea', ["a","b","c"]],
];

for (let test of tests) {
  logOutList(findLongestWord(...test));
}