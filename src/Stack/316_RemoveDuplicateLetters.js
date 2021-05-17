/*
Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/

 

Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 

Constraints:

1 <= s.length <= 104
s consists of lowercase English letters.
*/


// smart
var removeDuplicateLetters = function (s) {
  const last = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i += 1) {
    const letter = s.charCodeAt(i) - aCode;
    last[letter] = i;
  }

  const used = new Array(26).fill(0);
  const sequence = [];
  
  for (let i = 0; i < s.length; i += 1) {
    const letter = s.charCodeAt(i) - aCode;
    if (used[letter]) continue;

    while (
      sequence.length
      && sequence[sequence.length - 1] > letter
      && last[sequence[sequence.length - 1]] > i
    ) {
      const removed = sequence.pop();
      used[removed] = 0;
    }
      
    sequence.push(letter);
    used[letter] = 1;
  }

  return sequence.map((letter) => String.fromCharCode(letter + aCode)).join('');
};


// worse
var removeDuplicateLetters = function (s) {
  const counts = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  const sequence = [];

  for (let i = 0; i < s.length; i += 1) {
    const letter = s.charCodeAt(i) - aCode;
    counts[letter] += 1;
  }

  for (let i = 0; i < s.length; i += 1) {
    const letter = s.charCodeAt(i) - aCode;
    counts[letter] -= 1;
    
    const position = sequence.indexOf(letter);
    
    if (position < 0) {
      sequence.push(letter);
      continue;
    }
    
    let j = position + 1;

    while (
      j < sequence.length - 1
      && sequence[j] > sequence[position]
      && counts[sequence[j]]
    ) j += 1;
      
    if (sequence[j] > sequence[position]) continue;

    sequence.splice(position, 1);
    sequence.push(letter);
  }

  return sequence.map((letter) => String.fromCharCode(letter + aCode)).join('');
};


const maxLen = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);

  const s = new Array(len).fill('').map(() => randomLetter({})).join('');

  logOutList('"' + s + '"')
  // logOutList(printRow(arr) + ',')
  // logOutList(printRow(arr));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([s, words])
}