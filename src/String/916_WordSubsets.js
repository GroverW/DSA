/*
We are given two arrays A and B of words.  Each word is a string of lowercase letters.

Now, say that word b is a subset of word a if every letter in b occurs in a, including multiplicity.  For example, "wrr" is a subset of "warrior", but is not a subset of "world".

Now say a word a from A is universal if for every b in B, b is a subset of a. 

Return a list of all universal words in A.  You can return the words in any order.

 

Example 1:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["e","o"]
Output: ["facebook","google","leetcode"]
Example 2:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["l","e"]
Output: ["apple","google","leetcode"]
Example 3:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["e","oo"]
Output: ["facebook","google"]
Example 4:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["lo","eo"]
Output: ["google","leetcode"]
Example 5:

Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["ec","oc","ceo"]
Output: ["facebook","leetcode"]
 

Note:

1 <= A.length, B.length <= 10000
1 <= A[i].length, B[i].length <= 10
A[i] and B[i] consist only of lowercase letters.
All words in A[i] are unique: there isn't i != j with A[i] == A[j].
*/

var wordSubsets = function (A, B) {
  const aCode = 'a'.charCodeAt(0);
  const maxBCounts = B.reduce((counts, word) => {
    const letterCounts = new Array(26).fill(0);
    for (let i = 0; i < word.length; i += 1) {
      const letter = word.charCodeAt(i) - aCode;
      letterCounts[letter] += 1;
      counts[letter] = Math.max(counts[letter], letterCounts[letter]);
    }
    return counts;
  }, new Array(26).fill(0));

  return A.filter((word) => {
    const letterCounts = new Array(26).fill(0);
    for (let letter of word) {
      letterCounts[letter.charCodeAt(0) - aCode] += 1;
    }
    return letterCounts.every((count, i) => count >= maxBCounts[i]);
  });
};

const tests = [
  [["amazon", "apple", "facebook", "google", "leetcode"], ["e", "o"]],
  [["amazon", "apple", "facebook", "google", "leetcode"], ["l", "e"]],
  [["amazon", "apple", "facebook", "google", "leetcode"], ["e", "oo"]],
  [["amazon", "apple", "facebook", "google", "leetcode"], ["lo", "eo"]],
  [["amazon", "apple", "facebook", "google", "leetcode"], ["ec", "oc", "ceo"]],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(printRow(wordSubsets(...test)));
  console.timeEnd(i);
  i += 1;
}

/*

*/