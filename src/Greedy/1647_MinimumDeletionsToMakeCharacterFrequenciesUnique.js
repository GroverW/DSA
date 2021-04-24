/*
A string s is called good if there are no two different characters in s that have the same frequency.

Given a string s, return the minimum number of characters you need to delete to make s good.

The frequency of a character in a string is the number of times it appears in the string. For example, in the string "aab", the frequency of 'a' is 2, while the frequency of 'b' is 1.

 

Example 1:

Input: s = "aab"
Output: 0
Explanation: s is already good.
Example 2:

Input: s = "aaabbbcc"
Output: 2
Explanation: You can delete two 'b's resulting in the good string "aaabcc".
Another way it to delete one 'b' and one 'c' resulting in the good string "aaabbc".
Example 3:

Input: s = "ceabaacb"
Output: 2
Explanation: You can delete both 'c's resulting in the good string "eabaab".
Note that we only care about characters that are still in the string at the end (i.e. frequency of 0 is ignored).
 

Constraints:

1 <= s.length <= 105
s contains only lowercase English letters.
*/

var minDeletions = function(s) {
  const counts = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);
  for(let letter of s) {
    counts[letter.charCodeAt(0) - aCode] += 1;
  }
  const letterCounts = counts
    .filter((count) => count)
    .sort((a, b) => b - a);
  
  let deletions = 0;
  for(let i = 1; i < letterCounts.length; i += 1) {
    if(letterCounts[i] >= letterCounts[i - 1]) {
      const additionalDeletions = Math.min(
        letterCounts[i],
        letterCounts[i] - letterCounts[i - 1] + 1,
      );
      deletions += additionalDeletions;
      letterCounts[i] -= additionalDeletions;
    }
  }
  
  return deletions;
};

/*
  [9, 10, 15, 16, 24, 50, 55]

  [9, 10, ]
*/

const maxLen = 400;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  let s = new Array(len).fill('')
    .map(() => randomLetter({})).join('')
  
  

  logOutList('"' + s + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([nums, maxBit])
}

const tests: Indexable<any>[] = [
  // "laywwrqulq",
  // "kbehevilwhlfpfavuaehectbfuyluutxmg",
  // "acvzanrzbsuvmrnujyqkz",
  // "ppr",
  // "sdpmfdnmubbetzzlpaewixjfzvngskatjhiqpoqemlzrzwekefxsfxwwtuovfsllezjrunivqitbliklfplsibrcvsheq",
  // "deuuzjhsubbtvgydpwnwxfcgjgrheupvrhhligrurzrxch",
  // "zzduskswl",
  // "pgtmvxilwifntwrdszfsgcpckbsmhbapcdxrvnggg",
  // "cjoxbrdbstdbhs",
  // "ucbavznozqynvkmystrmvqvhrzolqovvn",
  // "osheozr",
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(minDeletions(test));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/
