/*
Given a list of words, list of  single letters (might be repeating) and score of every character.

Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).

It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.

 

Example 1:

Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation:
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.
Example 2:

Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation:
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.
Example 3:

Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation:
Letter "e" can only be used once.
 

Constraints:

1 <= words.length <= 14
1 <= words[i].length <= 15
1 <= letters.length <= 100
letters[i].length == 1
score.length == 26
0 <= score[i] <= 10
words[i], letters[i] contains only lower case English letters.
*/

var maxScoreWords = function (words, letters, score) {
  const aCode = 'a'.charCodeAt(0);
  const wordScores = [];

  const wordLookups = words.map((word) => {
    let wordScore = 0;
    const letterArr = word.split('').reduce((counts, letter) => {
      const letterCode = letter.charCodeAt(0) - aCode;
      wordScore += score[letterCode];
      counts[letterCode] += 1;
      return counts;
    }, new Array(26).fill(0))
    wordScores.push(wordScore);
    return letterArr;
  });

  const letterCounts = letters.reduce((counts, letter) => {
    const letterCode = letter.charCodeAt(0) - aCode;
    counts[letterCode] += 1;
    return counts;
  }, new Array(26).fill(0));

  let maxScore = 0;

  const findMaxScore = (wordIdx, currentScore, remainingLetters) => {

    for (let i = 0; i < wordLookups[wordIdx].length; i += 1) {
      if (wordLookups[wordIdx][i] > remainingLetters[i]) return;
      remainingLetters[i] -= wordLookups[wordIdx][i];
    }

    const nextScore = currentScore + wordScores[wordIdx];
    maxScore = Math.max(maxScore, nextScore);

    for (let i = wordIdx + 1; i < wordLookups.length; i += 1) {
      findMaxScore(i, nextScore, [...remainingLetters])
    }
  }

  for (let i = 0; i < wordLookups.length; i += 1) {
    findMaxScore(i, 0, [...letterCounts]);
  }

  return maxScore;
};

// for (let i = 0; i < 10; i += 1) {
//   const numWords = Math.floor(Math.random() * 14) + 1;
//   const numLetters = Math.floor(Math.random() * 100) + 1;

//   const words = [];
//   const letters = [];
//   const scores = new Array(26).fill(0);
//   const aCode = 'a'.charCodeAt(0);

//   for (let j = 0; j < numWords; j += 1) {
//     const wordLength = Math.floor(Math.random() * 15) + 1;
//     let word = '';
//     for (let k = 0; k < wordLength; k += 1) {
//       word += String.fromCharCode(Math.floor(Math.random() * 26) + aCode);
//     }
//     words.push(word);
//   }

//   for (let n = 0; n < numLetters; n += 1) {
//     letters.push(String.fromCharCode(Math.floor(Math.random() * 26) + aCode))
//   }

//   for (let letter of letters) {
//     const letterCode = letter.charCodeAt(0) - aCode;
//     if (!scores[letterCode]) scores[letterCode] = Math.floor(Math.random() * 10)
//   }

//   logOutList(printGrid([
//     words,
//     letters,
//     scores,
//   ]))
// }


const tests = [
  [
    ["dog", "cat", "dad", "good"],
    ["a", "a", "c", "d", "d", "d", "g", "o", "o"],
    [1, 0, 9, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    ["xxxz", "ax", "bx", "cx"],
    ["z", "a", "b", "c", "x", "x", "x"],
    [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10],
  ],
  [
    ["leetcode"],
    ["l", "e", "t", "c", "o", "d"],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ],
  [
    ["iohaegltdo", "cemxbzwkoaxfb", "hjdful", "hozjqh", "rtfsxawvo", "cfejlghaicqus", "ynnabemluskwyia", "zkhfw", "psnj", "ijaaw", "grqtsfduwsdlbm"],
    ["e", "u", "h", "b", "h", "a", "e", "z", "z", "x", "e", "k", "v", "j", "n", "j", "c", "h", "h", "h", "o", "r", "u", "i", "h", "k", "t", "b", "o", "f", "e", "u", "h", "g", "q", "b", "q", "x", "q", "e", "y", "q", "d", "t", "c", "y", "r", "e", "j", "q", "u"],
    [8, 5, 8, 7, 5, 5, 5, 9, 1, 7, 5, 0, 0, 7, 1, 0, 6, 2, 0, 9, 3, 4, 0, 5, 6, 4]
  ],
  [
    ["cjhfpyqmegogcr"],
    ["p", "r", "k", "f"],
    [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 7, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
  ],
  [
    ["gdve", "uwhqagbomheqsoa", "pfrareqyyz", "qyqmwjpelwfox", "gxnclnhvr"],
    ["c", "l", "d", "m", "f", "h", "e", "n", "o", "j", "c", "s", "g", "g", "p", "q", "y", "z", "m", "l", "i", "t", "z", "x", "o"],
    [0, 0, 5, 9, 3, 2, 9, 0, 6, 1, 0, 9, 3, 3, 7, 1, 4, 0, 9, 6, 0, 0, 0, 9, 2, 7]
  ],
  [
    ["pdu", "sxefz", "ta", "vdjtw", "uigqgnwkoszvy", "saxw"],
    ["z", "c", "m", "o", "i", "e", "m", "a", "b", "c", "c", "u", "x", "b", "f", "n", "x", "r", "p", "u", "l", "j", "w", "f", "w", "h", "f", "s", "p", "r", "k", "q", "q", "a", "f", "s", "b", "j", "q", "y", "m", "f", "c", "c", "x", "i", "x", "q", "u", "q", "a", "m", "y", "v", "z", "e", "t", "b", "z", "l", "y", "n", "a", "d", "i", "w", "w", "z", "v", "x", "b", "q", "n", "n", "n", "z", "e", "t", "t", "h", "r", "a", "s", "p", "c", "n", "g"],
    [7, 6, 1, 2, 9, 4, 6, 4, 2, 9, 6, 1, 5, 8, 9, 3, 3, 1, 4, 2, 3, 8, 9, 9, 8, 6]
  ],
  [
    ["edwcqukwuqvv", "fnyqlsrlvrz", "yovg", "eqpucqruwsramg", "mfsaganouhlti", "uudlys", "hgtsfzgu", "fjaghm", "mkeagls", "xneormlrldzgj", "mdgxkcoot"],
    ["x", "q", "p", "b", "s", "x", "i", "z", "x", "x"],
    [0, 7, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 3, 5, 0, 7, 0, 0, 0, 0, 5, 0, 4]
  ],
  [
    ["w", "fidqlnjcejpn", "aehqli", "pgxmtaqk", "lmdycs"],
    ["l", "a", "j", "u", "u", "g", "x", "n", "h", "r", "l", "m", "p", "j", "g", "h", "t", "p", "g", "y", "l", "t", "d", "k", "n", "w", "t", "t", "l", "o", "f", "m", "x", "p", "f", "y", "a", "q", "m", "u", "v", "m", "m", "r", "r", "d", "s", "r", "m", "c", "k", "r", "k", "z", "j", "w", "o", "s", "f", "z", "g", "k", "m", "v", "n", "i", "l", "b", "s", "d", "m", "n", "e"],
    [3, 3, 3, 4, 8, 1, 2, 7, 5, 7, 6, 2, 3, 7, 1, 3, 3, 7, 2, 1, 4, 2, 8, 5, 4, 2]
  ],
  [
    ["xhzi", "aoltaakctzhfc", "i", "moklogzczoyzjpp", "fylobyavxwjk"],
    ["u", "a", "e", "e", "x", "o", "v", "o", "w", "g", "i", "x", "a", "l", "i", "v", "a", "x", "c", "l", "c", "k", "k", "u", "h", "h", "e", "e", "j", "z", "m", "q", "d", "v", "d", "k", "b", "k", "j"],
    [4, 9, 1, 5, 5, 0, 4, 2, 1, 1, 7, 2, 1, 0, 7, 0, 6, 0, 0, 0, 4, 7, 2, 4, 0, 9]
  ],
  [
    ["bqgoklfjjxuovp", "itouhaucht", "bdkfm", "buufilkshgkpc"],
    ["h", "o", "y", "x", "w", "s", "f", "h", "s", "o", "j", "o", "t", "m", "m", "u", "e", "x", "z", "h", "q", "w", "v", "u", "l", "t", "y", "l", "r", "o", "a", "i", "x", "y"],
    [2, 0, 0, 0, 7, 0, 0, 7, 4, 5, 0, 5, 6, 0, 8, 0, 9, 6, 9, 2, 3, 3, 4, 8, 2, 5]
  ],
  [
    ["uaowozqccy", "iqipumotxrlc", "lwja", "lyotcguxossnc", "chczjbewgbpdq", "rcihdkaqkkxekn", "mmzpfzb", "ssgjuvebgk", "houjdozaxga", "cnyv", "mchrdzziubia"],
    ["g", "x", "f", "x", "t", "t", "w", "t", "a", "z", "q", "l", "b", "t", "l", "p", "j", "p", "q", "t", "v", "i", "m", "n", "u", "x", "o", "f", "x", "c", "d", "b", "l", "k", "l", "u", "z", "z", "w", "o", "p", "s", "w", "f"],
    [7, 1, 9, 8, 0, 5, 0, 0, 5, 8, 0, 5, 7, 6, 2, 2, 4, 0, 7, 2, 1, 2, 1, 6, 0, 2]
  ],
  [
    ["cv", "iimvtoc", "zkwtumnpfrmlyz", "hmnrnil"],
    ["d", "t", "d", "o", "w", "l", "k", "b", "c", "b", "y", "t", "w", "j", "n", "g", "u", "d", "o", "w", "i", "q", "i", "a", "i", "v", "f", "x", "l", "o", "w", "i", "d", "v", "a", "m", "k", "b", "v", "t", "w", "f", "y", "e", "y", "c", "b", "d"],
    [2, 8, 1, 6, 1, 4, 1, 0, 8, 2, 2, 8, 0, 5, 9, 0, 7, 0, 0, 2, 1, 4, 6, 9, 4, 0]
  ]
];

for (let test of tests) {
  logOutList(maxScoreWords(...test));
}

/*
["dog", "cat", "dad", "good"]
["a", "a", "c", "d", "d", "d", "g", "o", "o"]
[1, 0, 9, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
["xxxz", "ax", "bx", "cx"]
["z", "a", "b", "c", "x", "x", "x"]
[4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 10]
["leetcode"]
["l", "e", "t", "c", "o", "d"]
[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
["iohaegltdo", "cemxbzwkoaxfb", "hjdful", "hozjqh", "rtfsxawvo", "cfejlghaicqus", "ynnabemluskwyia", "zkhfw", "psnj", "ijaaw", "grqtsfduwsdlbm"]
["e", "u", "h", "b", "h", "a", "e", "z", "z", "x", "e", "k", "v", "j", "n", "j", "c", "h", "h", "h", "o", "r", "u", "i", "h", "k", "t", "b", "o", "f", "e", "u", "h", "g", "q", "b", "q", "x", "q", "e", "y", "q", "d", "t", "c", "y", "r", "e", "j", "q", "u"]
[8, 5, 8, 7, 5, 5, 5, 9, 1, 7, 5, 0, 0, 7, 1, 0, 6, 2, 0, 9, 3, 4, 0, 5, 6, 4]
["cjhfpyqmegogcr"]
["p", "r", "k", "f"]
[0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 7, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
["gdve", "uwhqagbomheqsoa", "pfrareqyyz", "qyqmwjpelwfox", "gxnclnhvr"]
["c", "l", "d", "m", "f", "h", "e", "n", "o", "j", "c", "s", "g", "g", "p", "q", "y", "z", "m", "l", "i", "t", "z", "x", "o"]
[0, 0, 5, 9, 3, 2, 9, 0, 6, 1, 0, 9, 3, 3, 7, 1, 4, 0, 9, 6, 0, 0, 0, 9, 2, 7]
["pdu", "sxefz", "ta", "vdjtw", "uigqgnwkoszvy", "saxw"]
["z", "c", "m", "o", "i", "e", "m", "a", "b", "c", "c", "u", "x", "b", "f", "n", "x", "r", "p", "u", "l", "j", "w", "f", "w", "h", "f", "s", "p", "r", "k", "q", "q", "a", "f", "s", "b", "j", "q", "y", "m", "f", "c", "c", "x", "i", "x", "q", "u", "q", "a", "m", "y", "v", "z", "e", "t", "b", "z", "l", "y", "n", "a", "d", "i", "w", "w", "z", "v", "x", "b", "q", "n", "n", "n", "z", "e", "t", "t", "h", "r", "a", "s", "p", "c", "n", "g"]
[7, 6, 1, 2, 9, 4, 6, 4, 2, 9, 6, 1, 5, 8, 9, 3, 3, 1, 4, 2, 3, 8, 9, 9, 8, 6]
["edwcqukwuqvv", "fnyqlsrlvrz", "yovg", "eqpucqruwsramg", "mfsaganouhlti", "uudlys", "hgtsfzgu", "fjaghm", "mkeagls", "xneormlrldzgj", "mdgxkcoot"]
["x", "q", "p", "b", "s", "x", "i", "z", "x", "x"]
[0, 7, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 3, 5, 0, 7, 0, 0, 0, 0, 5, 0, 4]
["w", "fidqlnjcejpn", "aehqli", "pgxmtaqk", "lmdycs"]
["l", "a", "j", "u", "u", "g", "x", "n", "h", "r", "l", "m", "p", "j", "g", "h", "t", "p", "g", "y", "l", "t", "d", "k", "n", "w", "t", "t", "l", "o", "f", "m", "x", "p", "f", "y", "a", "q", "m", "u", "v", "m", "m", "r", "r", "d", "s", "r", "m", "c", "k", "r", "k", "z", "j", "w", "o", "s", "f", "z", "g", "k", "m", "v", "n", "i", "l", "b", "s", "d", "m", "n", "e"]
[3, 3, 3, 4, 8, 1, 2, 7, 5, 7, 6, 2, 3, 7, 1, 3, 3, 7, 2, 1, 4, 2, 8, 5, 4, 2]
["xhzi", "aoltaakctzhfc", "i", "moklogzczoyzjpp", "fylobyavxwjk"]
["u", "a", "e", "e", "x", "o", "v", "o", "w", "g", "i", "x", "a", "l", "i", "v", "a", "x", "c", "l", "c", "k", "k", "u", "h", "h", "e", "e", "j", "z", "m", "q", "d", "v", "d", "k", "b", "k", "j"]
[4, 9, 1, 5, 5, 0, 4, 2, 1, 1, 7, 2, 1, 0, 7, 0, 6, 0, 0, 0, 4, 7, 2, 4, 0, 9]
["bqgoklfjjxuovp", "itouhaucht", "bdkfm", "buufilkshgkpc"]
["h", "o", "y", "x", "w", "s", "f", "h", "s", "o", "j", "o", "t", "m", "m", "u", "e", "x", "z", "h", "q", "w", "v", "u", "l", "t", "y", "l", "r", "o", "a", "i", "x", "y"]
[2, 0, 0, 0, 7, 0, 0, 7, 4, 5, 0, 5, 6, 0, 8, 0, 9, 6, 9, 2, 3, 3, 4, 8, 2, 5]
["uaowozqccy", "iqipumotxrlc", "lwja", "lyotcguxossnc", "chczjbewgbpdq", "rcihdkaqkkxekn", "mmzpfzb", "ssgjuvebgk", "houjdozaxga", "cnyv", "mchrdzziubia"]
["g", "x", "f", "x", "t", "t", "w", "t", "a", "z", "q", "l", "b", "t", "l", "p", "j", "p", "q", "t", "v", "i", "m", "n", "u", "x", "o", "f", "x", "c", "d", "b", "l", "k", "l", "u", "z", "z", "w", "o", "p", "s", "w", "f"]
[7, 1, 9, 8, 0, 5, 0, 0, 5, 8, 0, 5, 7, 6, 2, 2, 4, 0, 7, 2, 1, 2, 1, 6, 0, 2]
["cv", "iimvtoc", "zkwtumnpfrmlyz", "hmnrnil"]
["d", "t", "d", "o", "w", "l", "k", "b", "c", "b", "y", "t", "w", "j", "n", "g", "u", "d", "o", "w", "i", "q", "i", "a", "i", "v", "f", "x", "l", "o", "w", "i", "d", "v", "a", "m", "k", "b", "v", "t", "w", "f", "y", "e", "y", "c", "b", "d"]
[2, 8, 1, 6, 1, 4, 1, 0, 8, 2, 2, 8, 0, 5, 9, 0, 7, 0, 0, 2, 1, 4, 6, 9, 4, 0]
*/