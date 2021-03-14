/*
The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

For example, the beauty of "abaacc" is 3 - 1 = 2.
Given a string s, return the sum of beauty of all of its substrings.

 

Example 1:

Input: s = "aabcb"
Output: 5
Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.
Example 2:

Input: s = "aabcbaa"
Output: 17
 

Constraints:

1 <= s.length <= 500
s consists of only lowercase English letters.

POST: https://leetcode.com/problems/sum-of-beauty-of-all-substrings/discuss/1102477/JavaScript-~140-150ms
*/

var beautySum = function(s) {
  const aCode = 'a'.charCodeAt(0);
  
  let totalBeauty = 0;
  
  for (let i = 0; i < s.length; i += 1) {
    const letters = new Array(26).fill(0)
		.map((_, i) => ({ rank: 0, count: 0 }));
    const ranks = [];
    
    for (let j = i; j < s.length; j += 1) {
      const letter = letters[s.charCodeAt(j) - aCode];
      if (!letter.count) {
        letter.rank = ranks.length;
        ranks.push(letter);
      }
      
      letter.count += 1;
      
      while (letter.rank && letter.count > ranks[letter.rank - 1].count) {
		const prev = ranks[letter.rank - 1];
        [ranks[letter.rank], ranks[prev.rank]] = [ranks[prev.rank], ranks[letter.rank]];
        prev.rank += 1;
        letter.rank -= 1;
      }
      
      totalBeauty += ranks[0].count - ranks[ranks.length - 1].count;
    }
  }
  
  return totalBeauty;
};