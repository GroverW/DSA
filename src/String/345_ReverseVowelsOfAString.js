/*
Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:

Input: "hello"
Output: "holle"
Example 2:

Input: "leetcode"
Output: "leotcede"
Note:
The vowels does not include the letter "y".
*/

// first attempt
var reverseVowels = function(s) {
  const vowels = 'aeiouAEIOU';

  let sVowels = '';
  for(let letter of s) {
      if(vowels.includes(letter)) sVowels += letter;
  }

  let current = sVowels.length - 1;
  let res = '';

  for(let letter of s) {
      if(vowels.includes(letter)) {
          res += sVowels[current];
          current -= 1;
      } else {
          res += letter;
      }
  }

  return res;
};

// more optimized

var reverseVowels = function (s) {
  const vowels = 'aeiou';

  let start = 0;
  let end = s.length - 1;
  const letters = s.split('');

  while (start < end) {
    const startLower = letters[start].toLowerCase();
    const endLower = letters[end].toLowerCase();
    const startIsVowel = vowels.includes(startLower);
    const endIsVowel = vowels.includes(endLower);

    if (startIsVowel && endIsVowel) {
      [letters[start], letters[end]] = [letters[end], letters[start]];
      start += 1;
      end -= 1;
    } else if (startIsVowel) {
      end -= 1;
    } else if (endIsVowel) {
      start += 1;
    } else {
      start += 1;
      end -= 1;
    }
  }

  return letters.join('');
};

const tests = [
  "hello",
  "leetcode",
  "aA",
];

for (let test of tests) {
  logOutList(reverseVowels(test));
}