/*
Given a string s of lowercase letters, you need to find the maximum number of non-empty substrings of s that meet the following conditions:

The substrings do not overlap, that is for any two substrings s[i..j] and s[k..l], either j < k or i > l is true.
A substring that contains a certain character c must also contain all occurrences of c.
Find the maximum number of substrings that meet the above conditions. If there are multiple solutions with the same number of substrings, return the one with minimum total length. It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in any order.

 

Example 1:

Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation: The following are all the possible substrings that meet the conditions:
[
  "adefaddaccc"
  "adefadda",
  "ef",
  "e",
  "f",
  "ccc",
]
If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose "adefadda", we are left with "ccc" which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also, that it's not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.
Example 2:

Input: s = "abbaccd"
Output: ["d","bb","cc"]
Explanation: Notice that while the set of substrings ["d","abba","cc"] also has length 3, it's considered incorrect since it has larger total length.
 

Constraints:

1 <= s.length <= 10^5
s contains only lowercase English letters.
*/

var maxNumOfSubstrings = function(s) {
  const intervals = new Array(26).fill(0).map(() => [-1, -1]);
  const aCode = 'a'.charCodeAt(0);
  
  for (let i = 0; i < s.length; i += 1) {
    const charCode = s.charCodeAt(i) - aCode;
    if (intervals[charCode][0] < 0) {
      intervals[charCode][0] = i;
    }
    
    intervals[charCode][1] = i;
  }
  
  const groups = new Array(26).fill(0).map((_, i) => i);
  
  const find = (group) => (group === groups[group] ? group : find(groups[group]));

  const union = (groupA, groupB) => {
    groups[groupB] = groupA;
    intervals[groupA][0] = Math.min(intervals[groupA][0], intervals[groupB][0])
    intervals[groupA][1] = Math.max(intervals[groupA][1], intervals[groupB][1])
  }
  
  const last = [];

  for(let i = 0; i < s.length; i += 1) {
    const charCode = s.charCodeAt(i) - aCode;
    const letter = s[i];
    
    if (letter === s[last[last.length - 1]]) continue;

    const group = find(charCode);

    if (i === intervals[group][0]) {
      last.push(i);
      continue;
    }

    while (last.length) {
      const prevIdx = last[last.length - 1];
      const prevCode = s.charCodeAt(prevIdx) - aCode;

      if (prevIdx < intervals[group][0]) break;

      const prevGroup = find(prevCode);
      
      if (intervals[prevGroup][1] > i && group !== prevGroup) {
        union(group, prevGroup);
      }

      last.pop();
    }

    last.push(i);
  }
  
  return intervals
    .filter(([start], i) => start >= 0 && i === groups[i])
    .sort((a, b) => a[0] - b[0] || b[1] - a[1])
    .filter(([_, end], i, a) => i === a.length - 1 || end < a[i + 1][0])
    .map(([start, end]) => s.slice(start, end + 1));
};



const maxLen = 75;

for (let i = 0; i < 400; i += 1) {
  const len = numberBetween(2, maxLen);

  const arr = new Array(len).fill(0).map(() => randomLetter({ limit: 25 }))

  logOutList('"' + arr.join('') + '"')
  // logOutList(printRow(arr) + ',')
  // logOutList(printRow(arr));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([n, cuts])
  "jkklmlanjnjauewroiuweqoiuwer"
}


const tests: Indexable<any>[] = [
//   "simgsuollbhryxkrmsrhvcfcfeljhdwsk",
// "hpxxjppojrlywntntffymqvr"
];


let i: number = 0;
for (let test of tests) {
  console.time(i);
  // logOutList(mctFromLeafValues(test))

  logOutList(printRow(maxNumOfSubstrings(test)))
  console.timeEnd(i);
  i += 1;

}