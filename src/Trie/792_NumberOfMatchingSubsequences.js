/*
Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 

Example 1:

Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".
Example 2:

Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2
 

Constraints:

1 <= s.length <= 5 * 104
1 <= words.length <= 5000
1 <= words[i].length <= 50
s and words[i] consist of only lowercase English letters.
*/


// seems insane that this should workd, but ok
var numMatchingSubseq = function (s, words) {
  let totalMatches = 0;

  nextWord:
  for (let word of words) {
    let start = -1;

    for (let letter of word) {
      start = s.indexOf(letter, start + 1);

      if (start < 0) continue nextWord;
    }

    totalMatches += 1;
  }

  return totalMatches;
}


// not mine - same idea but much better than Trie
var numMatchingSubseq = function(S, words) {
  const bucket = [...Array(26)].map(() => []);
  let counter = 0;
  
  function getCharId(char) {
      return char.charCodeAt() - 'a'.charCodeAt()
  }
  
  for(let word of words) {
      const idx = getCharId(word[0]);
      bucket[idx].push(word);
  }
  
  for(let char of S) {
      const idx = getCharId(char);
      const currBucket = bucket[idx]
      bucket[idx] = []
      
      for(let word of currBucket) {
          word = word.slice(1);
          if(!word.length) {
              counter++;
              continue;
          }
          const nextIdx = getCharId(word[0]);
          bucket[nextIdx].push(word)
      }
  }
  return counter;
};



// w/ Trie, slow
var numMatchingSubseq = function (s, words) {
  const trie = buildTrie(words);
  const aCode = 'a'.charCodeAt(0);

  const letters = new Array(26).fill(0).map(() => []);

  addChildren(trie, letters);

  let totalWords = 0;
  for (let letter of s) {
    const charCode = letter.charCodeAt(0) - aCode;
    const nodes = letters[charCode];
    letters[charCode] = [];

    nodes.forEach((node) => {
      totalWords += node.words;
      addChildren(node, letters);
    });
  }

  return totalWords;
};

const addChildren = (node, letters) => {
  const aCode = 'a'.charCodeAt(0);

  Object.entries(node.children).forEach(([letter, node]) => {
    const charCode = letter.charCodeAt(0) - aCode;
    letters[charCode].push(node);
  })
}

class TrieNode {
  children = {};
  words = 0;
}

const buildTrie = (words) => {
  const root = new TrieNode();

  words.forEach((word) => {
    let current = root;
    for (let letter of word) {
      current.children[letter] = current.children[letter] || new TrieNode();
      current = current.children[letter];
    }
    current.words += 1;
  });

  return root;
}


const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);

  const words = new Array(len).fill('').map(() => {
    return new Array(numberBetween(1, 50)).fill('').map(() => randomLetter({})).join('');
  })
  const s = new Array(numberBetween(maxLen * 10, maxLen * 50)).fill('').map(() => randomLetter({})).join('');

  // logOutList('"' + arr.join('') + '"')
  // logOutList(printRow(arr) + ',')
  // logOutList(printRow(arr));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([s, words])
}