/*
Given two strings s1, s2, find the lowest ASCII sum of deleted characters to make two strings equal.

Example 1:
Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
Deleting "t" from "eat" adds 116 to the sum.
At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.
Example 2:
Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let",
adds 100[d]+101[e]+101[e] to the sum.  Deleting "e" from "leet" adds 101[e] to the sum.
At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.
Note:

0 < s1.length, s2.length <= 1000.
All elements of each string will have an ASCII value in [97, 122].
*/

// 1D Array
var minimumDeleteSum = function(s1, s2) {
  const s1Len = s1.length;
  const s2Len = s2.length;
  const s1Lookup = s1.split('').map((letter) => letter.charCodeAt(0))
  const s2Lookup = s2.split('').map((letter) => letter.charCodeAt(0))
  
  const minDelete = [...s2Lookup, 0];

  for (let j = s2Len - 1; j >= 0; j -= 1) {
      minDelete[j] = s2Lookup[j] + minDelete[j + 1];
  }

  for(let i = s1Len - 1; i >= 0; i -= 1) {
    let last = minDelete[s2Len]
    minDelete[s2Len] += s1Lookup[i];
    
    for(let j = s2Len - 1; j >= 0; j -= 1) {
      const save = minDelete[j];
      if (s1Lookup[i] === s2Lookup[j]) {
        minDelete[j] = last;
      } else {
        minDelete[j] = Math.min(
          minDelete[j] + s1Lookup[i],
          minDelete[j + 1] + s2Lookup[j],
        );
      }
      last = save;
    }
  }
  
  return minDelete[0];
};

// 2D Array
var minimumDeleteSum = function(s1, s2) {
  const s1Len = s1.length;
  const s2Len = s2.length;
  const s1Lookup = s1.split('').map((letter) => letter.charCodeAt(0))
  const s2Lookup = s2.split('').map((letter) => letter.charCodeAt(0))
  const minDelete = new Array(s1Len + 1).fill(0)
    .map(() => new Array(s2Len + 1).fill(0));

  for(let i = s1Len - 1; i >= 0; i -= 1) {
      minDelete[i][s2Len] = s1Lookup[i] + minDelete[i + 1][s2Len];
  }
  for(let j = s2Len - 1; j >= 0; j -= 1) {
      minDelete[s1Len][j] = s2Lookup[j] + minDelete[s1Len][j + 1];
  }

  for(let i = s1Len - 1; i >= 0; i -= 1) {
    for(let j = s2Len - 1; j >= 0; j -= 1) {
      if(s1Lookup[i] === s2Lookup[j]) {
        minDelete[i][j] = minDelete[i + 1][j + 1];
      } else {
        minDelete[i][j] = Math.min(
          minDelete[i + 1][j] + s1Lookup[i],
          minDelete[i][j + 1] + s2Lookup[j],
        );
      }
      
    }
  }
  
  return minDelete[0][0];
};


const tests = [
  ["sea", "eat"],
  ["delete", "leet"],
  ["aposidhfpaosdhfioashdpfoiahsdoifhasdiopfh", "aopsidhfoiansdofnapwoiehbfpoiascv"],
  ["zzzzzzzzaaaaaabhoiadpshasdhiof", "oiasdhpfoiashdfipasheeeee"],
  ["zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", "a"]
];



let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(minimumDeleteSum(...test));
  console.timeEnd(i);
  i += 1;
}

/*

*/