/*
A string is considered beautiful if it satisfies the following conditions:

Each of the 5 English vowels ('a', 'e', 'i', 'o', 'u') must appear at least once in it.
The letters must be sorted in alphabetical order (i.e. all 'a's before 'e's, all 'e's before 'i's, etc.).
For example, strings "aeiou" and "aaaaaaeiiiioou" are considered beautiful, but "uaeio", "aeoiu", and "aaaeeeooo" are not beautiful.

Given a string word consisting of English vowels, return the length of the longest beautiful substring of word. If no such substring exists, return 0.

A substring is a contiguous sequence of characters in a string.

 

Example 1:

Input: word = "aeiaaioaaaaeiiiiouuuooaauuaeiu"
Output: 13
Explanation: The longest beautiful substring in word is "aaaaeiiiiouuu" of length 13.
Example 2:

Input: word = "aeeeiiiioooauuuaeiou"
Output: 5
Explanation: The longest beautiful substring in word is "aeiou" of length 5.
Example 3:

Input: word = "a"
Output: 0
Explanation: There is no beautiful substring, so return 0.
 

Constraints:

1 <= word.length <= 5 * 105
word consists of characters 'a', 'e', 'i', 'o', and 'u'.
*/

var longestBeautifulSubstring = function(word) {
  let start = 0;
  let longest = 0;
  let countLetters = 1;
  let last = word[0];
  
  for(let i = 1; i < word.length; i += 1) {
    const letter = word[i];
    
    if (letter > last) {
      countLetters += 1;
    } else if(letter < last) {
      countLetters = 1;
      start = i;
    }
    
    if (countLetters === 5) {
      longest = Math.max(longest, i - start + 1);
    }
    
    last = letter;
  }  
  
  return longest;
};

const maxLen = 1000;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const letters = new Array(len).fill('').map(() => randomOption('aeiou')).join('')
  
  

  logOutList('"' + letters + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([piles, h])
}