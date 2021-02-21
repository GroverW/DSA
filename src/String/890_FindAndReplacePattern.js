/*
You have a list of words and a pattern, and you want to know which words in words matches the pattern.

A word matches the pattern if there exists a permutation of letters p so that after replacing every letter x in the pattern with p(x), we get the desired word.

(Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.)

Return a list of the words in words that match the given pattern. 

You may return the answer in any order.

 

Example 1:

Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"
Output: ["mee","aqq"]
Explanation: "mee" matches the pattern because there is a permutation {a -> m, b -> e, ...}. 
"ccc" does not match the pattern because {a -> c, b -> c, ...} is not a permutation,
since a and b map to the same letter.
 

Note:

1 <= words.length <= 50
1 <= pattern.length = words[i].length <= 20
*/

var findAndReplacePattern = function (words, pattern) {
  return words.filter((word) => wordMatchesPattern(word, pattern));
};

const wordMatchesPattern = (word, pattern) => {
  const wMap = new Array(27).fill(0);
  const pMap = new Array(27).fill(0);
  const aCode = 'a'.charCodeAt(0) - 1;

  if (word.length !== pattern.length) return false;

  for (let i = 0; i < word.length; i += 1) {
    const wLetter = word.charCodeAt(i) - aCode;
    const pLetter = pattern.charCodeAt(i) - aCode;

    if (!!wMap[wLetter] ^ !!pMap[pLetter]) return false;

    if (!wMap[wLetter] && !pMap[pLetter]) {
      wMap[wLetter] = pLetter;
      pMap[pLetter] = wLetter;
      continue;
    }

    if (wMap[wLetter] !== pLetter || pMap[pLetter] !== wLetter) return false;
  }

  return true;
}

/*

*/

// const maxLen = 50;
// const maxWordLen = 20
// const letters = 'abcdef';
// for (let i = 0; i < 200; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;
//   const wordLen = Math.floor(Math.random() * maxWordLen) + 1;

//   let pattern = '';
//   for (let j = 0; j < wordLen; j += 1) {
//     const letterIdx = Math.floor(Math.random() * letters.length);
//     pattern += letters[letterIdx];
//   }

//   const words = [];

//   for(let j = 0; j < len; j += 1) {
//     let word = '';
//     for(let k = 0; k < wordLen; k += 1) {
//       const letterIdx = Math.floor(Math.random() * letters.length);
//       word += letters[letterIdx];
//     }

//     words.push(word);
//   }





//   // logOutList('"' + s + '",')
//   logOutList(printRow([words, pattern]) + ',')
//   // logOutList(printRow(nums) + ',');
//   // logOutList(n);
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [["abc", "deq", "mee", "aqq", "dkd", "ccc"], "abb"],
  [["e", "d", "a", "b", "b", "c", "a", "a", "b", "b", "c", "f", "d", "c", "a", "e", "b", "f", "e", "b", "e", "a", "c", "f", "b", "f", "a", "e", "e", "d", "a", "f", "e", "b", "f", "e", "c", "d", "f", "f", "f", "f", "d"], "b"],
  [["fb", "ea", "be", "de", "aa", "cc", "bb", "af", "fa", "ee"], "aa"],
  [["cdc", "bfa", "ddd", "eaa", "cba", "cbb", "bfb", "aff", "fdf", "bca", "adc", "dbb", "adc", "bce", "feb", "baa", "afb", "cbb", "cef", "fcc", "bcc", "ada", "dff", "edb", "ddc", "fad", "edd", "dec", "cfc", "cce", "dab", "dba", "ebd", "cdc", "fca", "ffd", "daf", "fcd", "feb", "dbc", "dba", "bfb", "dbc", "fbd", "aff", "ceb"], "afd"],
  [["bf", "ee", "ab", "db", "ac", "cc", "ea", "dd", "bf", "cb", "de", "ed", "cd", "fb", "bc", "bb", "cd", "bd", "ae", "ef", "ef", "df", "cf", "bf", "eb", "bb", "cc", "db", "bf", "cc"], "cf"],
  [["fcd", "cad", "ddb", "fed", "dca", "acc", "adb", "ead", "dba", "fcd", "edd", "edb", "aed", "cde", "dee", "cdc", "edf", "dec", "ebd", "baf", "aaa", "bfb", "eed", "cbd", "fee", "ccd", "fef", "cab", "cce", "dcb", "cbb", "bec", "eca", "bea", "fcb", "dfe", "eed", "fdb", "eea", "aae", "fbf", "ded", "eef", "eea", "cdb", "eff"], "cad"],
  [["dbdcd","ddbed","eadae","cfeee","bcaeb","feecd","fcead","bfada","cbaba","cacec","abeae","cbdcf","abfff","feade","aceec","ddaad","cdcbf","aafab","defca","ebecd","eaebd","bcaad","beabd","ddeef","ccdfd","cebfd","cdbcf","dfcec"],"ffacf"],
  [["afefd","cfaaf","aabfd","fefbb","aacbc","affbc","eadfd","abecc","cabaa","acbca","eeecb","cafbc","fecda","edeaa","bbdaf","ccfee","dddde","eeedc","eacbc","ddeed"],"aabee"],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(printRow(findAndReplacePattern(...test)));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
["abc", "deq", "mee", "aqq", "dkd", "ccc"]
"abb"
["e", "d", "a", "b", "b", "c", "a", "a", "b", "b", "c", "f", "d", "c", "a", "e", "b", "f", "e", "b", "e", "a", "c", "f", "b", "f", "a", "e", "e", "d", "a", "f", "e", "b", "f", "e", "c", "d", "f", "f", "f", "f", "d"]
"b"
["fb", "ea", "be", "de", "aa", "cc", "bb", "af", "fa", "ee"]
"aa"
["cdc", "bfa", "ddd", "eaa", "cba", "cbb", "bfb", "aff", "fdf", "bca", "adc", "dbb", "adc", "bce", "feb", "baa", "afb", "cbb", "cef", "fcc", "bcc", "ada", "dff", "edb", "ddc", "fad", "edd", "dec", "cfc", "cce", "dab", "dba", "ebd", "cdc", "fca", "ffd", "daf", "fcd", "feb", "dbc", "dba", "bfb", "dbc", "fbd", "aff", "ceb"]
"afd"
["bf", "ee", "ab", "db", "ac", "cc", "ea", "dd", "bf", "cb", "de", "ed", "cd", "fb", "bc", "bb", "cd", "bd", "ae", "ef", "ef", "df", "cf", "bf", "eb", "bb", "cc", "db", "bf", "cc"]
"cf"
["fcd", "cad", "ddb", "fed", "dca", "acc", "adb", "ead", "dba", "fcd", "edd", "edb", "aed", "cde", "dee", "cdc", "edf", "dec", "ebd", "baf", "aaa", "bfb", "eed", "cbd", "fee", "ccd", "fef", "cab", "cce", "dcb", "cbb", "bec", "eca", "bea", "fcb", "dfe", "eed", "fdb", "eea", "aae", "fbf", "ded", "eef", "eea", "cdb", "eff"]
"cad"
["dbdcd","ddbed","eadae","cfeee","bcaeb","feecd","fcead","bfada","cbaba","cacec","abeae","cbdcf","abfff","feade","aceec","ddaad","cdcbf","aafab","defca","ebecd","eaebd","bcaad","beabd","ddeef","ccdfd","cebfd","cdbcf","dfcec"]
"ffacf"
["afefd","cfaaf","aabfd","fefbb","aacbc","affbc","eadfd","abecc","cabaa","acbca","eeecb","cafbc","fecda","edeaa","bbdaf","ccfee","dddde","eeedc","eacbc","ddeed"]
"aabee"

*/