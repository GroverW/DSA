/*
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
Output:
[
  "cats and dog",
  "cat sand dog"
]
Example 2:

Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
Output:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
Output:
[]
*/

var wordBreak = function (s, wordDict) {
  const prefixes = new Array(s.length).fill(null).map(() => []);
  prefixes.push([""]);

  let lastFound = prefixes.length - 1;

  for (let i = s.length - 1; i >= 0; i -= 1) {
    let isPossibleToContinue = false;
    for (let word of wordDict) {
      if (i + word.length >= lastFound) isPossibleToContinue = true;
      if (i + word.length > s.length) continue;

      if (prefixes[i + word.length].length && word === s.slice(i, i + word.length)) {
        prefixes[i].push(word);
        lastFound = i;
      }
    }

    if (!isPossibleToContinue) return [];
  }
  const wordBreakList = [];

  const joinWords = (idx, path) => {
    if(idx === s.length) {
      wordBreakList.push(path.join(' '));
      return;
    }
    
    for(let word of prefixes[idx]) {
      path.push(word);
      joinWords(idx + word.length, path);
      path.pop();
    }
  }

  joinWords(0, []);

  return wordBreakList;
};



// for (let i = 0; i < 20; i += 1) {
//   const len = Math.floor(Math.random() * 30) + 1;
//   let str = '';

//   logOutList(printGrid(grid));
// }

/*

*/

const tests = [
  ["catsanddog", ["cat", "cats", "and", "sand", "dog"]],
  ["pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]],
  ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
  ["ilikesamsung", ["i", "like", "sam", "sung", "samsung", "mobile", "ice", "cream", "icecream", "man", "go", "mango"]],
  ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"]],
  ["a", ["a"]],
];

for (let test of tests) {
  logOutList(printRow(wordBreak(...test)));
}

/*
"catsanddog"
["cat", "cats", "and", "sand", "dog"]
"pineapplepenapple"
["apple", "pen", "applepen", "pine", "pineapple"]
"catsandog"
["cats", "dog", "sand", "and", "cat"]
"ilikesamsung"
["i", "like", "sam", "sung", "samsung", "mobile", "ice", "cream", "icecream", "man", "go", "mango"]
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"]
"a"
["a"]
*/