/*
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true
 

Constraints:

1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.
*/

var isIsomorphic = function(s, t) {
  const sMap = {};
  const tMap = {};
  return s.split('').every((character, position) => {
      if (!(t[position] in tMap) && !(character in sMap)) {
          tMap[t[position]] = character;
          sMap[character] = t[position];
      }
      return tMap[t[position]] === tMap[sMap[character]];
  });
};

const tests = [
  ["egg", "add"],
  ["ege", "add"],
  ["foo", "bar"],
  ["paper", "title"],
  ["paper  ", "title  "],
  ["badc", "baba"],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(isIsomorphic(...test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}