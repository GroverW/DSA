/*
You are given two strings a and b that consist of lowercase letters. In one operation, you can change any character in a or b to any lowercase letter.

Your goal is to satisfy one of the following three conditions:

Every letter in a is strictly less than every letter in b in the alphabet.
Every letter in b is strictly less than every letter in a in the alphabet.
Both a and b consist of only one distinct letter.
Return the minimum number of operations needed to achieve your goal.

 

Example 1:

Input: a = "aba", b = "caa"
Output: 2
Explanation: Consider the best way to make each condition true:
1) Change b to "ccc" in 2 operations, then every letter in a is less than every letter in b.
2) Change a to "bbb" and b to "aaa" in 3 operations, then every letter in b is less than every letter in a.
3) Change a to "aaa" and b to "aaa" in 2 operations, then a and b consist of one distinct letter.
The best way was done in 2 operations (either condition 1 or condition 3).
Example 2:

Input: a = "dabadd", b = "cda"
Output: 3
Explanation: The best way is to make condition 1 true by changing b to "eee".
 

Constraints:

1 <= a.length, b.length <= 105
a and b consist only of lowercase letters.
*/

var minCharacters = function (a, b) {
  const aCounts = new Array(26).fill(0);
  const bCounts = new Array(26).fill(0);

  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < a.length; i += 1) aCounts[a.charCodeAt(i) - aCode] += 1;
  for (let i = 0; i < b.length; i += 1) bCounts[b.charCodeAt(i) - aCode] += 1;

  let minDiff = a.length + b.length;
  let aCountFromStart = aCounts[0];
  let bCountFromStart = bCounts[0];
  let aCountFromEnd = aCounts[25];
  let bCountFromEnd = bCounts[25];

  for (let i = 1; i < 25; i += 1) {
    aCountFromStart += aCounts[i];
    bCountFromStart += bCounts[i];
    aCountFromEnd += aCounts[25 - i];
    bCountFromEnd += bCounts[25 - i];

    minDiff = Math.min(
      minDiff,
      aCountFromStart + b.length - bCountFromStart,
      bCountFromStart + a.length - aCountFromStart,
      aCountFromEnd + b.length - bCountFromEnd,
      bCountFromEnd + a.length - aCountFromEnd,
    );
  }

  const transformAToOneLetter = a.length - Math.max(...aCounts);
  const transformBToOneLetter = b.length - Math.max(...bCounts);

  return Math.min(
    minDiff,
    transformAToOneLetter + transformBToOneLetter,
  );
};

/*

  [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0]
  [1, 3, 0, 1, 0, 0, 3, 1, 1, 0, 0, 1, 0, 2, 1, 0, 1, 0, 3, 0, 2, 2, 1, 2, 3, 0]
  " bcdeklpqsuw"
  "abbbdggghilnnoqsssuuvvwxxyyy"
*/