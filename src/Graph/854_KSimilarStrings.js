/*
Strings s1 and s2 are k-similar (for some non-negative integer k) if we can swap the positions of two letters in s1 exactly k times so that the resulting string equals s2.

Given two anagrams s1 and s2, return the smallest k for which s1 and s2 are k-similar.

 

Example 1:

Input: s1 = "ab", s2 = "ba"
Output: 1
Example 2:

Input: s1 = "abc", s2 = "bca"
Output: 2
Example 3:

Input: s1 = "abac", s2 = "baca"
Output: 2
Example 4:

Input: s1 = "aabc", s2 = "abca"
Output: 2
 

Constraints:

1 <= s1.length <= 20
s2.length == s1.length
s1 and s2 contain only lowercase letters from the set {'a', 'b', 'c', 'd', 'e', 'f'}.
s2 is an anagram of s1.
*/

var kSimilarity = function (s1, s2) {
  const visited = new Set();
  let swaps = 0;
  const queue = [s1];
  while (queue.length) {
    for (let end = queue.length - 1; end >= 0; end -= 1) {
      const current = queue.shift();
      if (current === s2) return swaps;

      for (let i = 0; i < current.length; i += 1) {
        if (current[i] === s2[i]) continue;

        for (let j = i + 1; j < current.length; j += 1) {
          if (s2[j] !== current[i] || current[j] === s2[j]) continue;

          const letters = current.split('');
          [letters[i], letters[j]] = [letters[j], letters[i]];
          const next = letters.join('');
          if (visited.has(next)) continue;
          visited.add(next);
          queue.push(next);
        }
        break;
      }
    }
    swaps += 1;
  }
};


const maxLen: number = 20;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);

  let s2 = '';
  for(let j = 0; j < len; j += 1) {
    s2 += randomLetter({ limit: 6 });
  }

  const s1 = randomize(s2.split('')).join('');

  // logOutList('"' + words.trimEnd() + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(stones));
  // logOutList(printRow([jobs, k]) + ',');
  logOutLeetcode([s1, s2])
}

const tests = [
  ["ab", "ba"],
  ["abc", "bca"],
  ["aabc", "abca"],
  ["abcdef", "fedcba"],
  ["aacde", "cdaea"],
  ["cffeeae", "eaefecf"],
  ["dedbccddfeecafea", "fddeabfcdecdaece"],
  ["affdbeeddcbeddbeddc", "bfebdbddecceddddfea"],
  ["abeeccdcc", "edceccbac"],
  ["fdedc", "ceddf"],
  ["cdebdaebfbffbdeccdbd", "deacdedecffbbbfbdcdb"],
  ["aacbfaccee", "aabcacfeec"],
  ["bcbafeccffbadadaaf", "abcafcdffaeabadbcf"],
  ["acccceaaabcedacdecbb", "cbcaaaceaccdbbdaecce"],
  ["eafbedadeebaaeaf", "aabeabeafdfeaede"],
  ["fbcdee", "cefbed"],
  ["fdd", "fdd"],
  ["bdeebdbaf", "aedfbbdeb"],
  ["aeeafbbaf", "aeffabaeb"],
  ["abefddabadff", "fadbdfaefbad"],
  ["ceadbbeb", "cbbadeeb"],
  ["bfcadfebdcdd", "ebfabcddcddf"],
  ["cfaddbaae", "caadbdefa"],
  ["ffbaabefbefc", "bceffbbaaeff"],
  ["babebe", "abeebb"],
  ["ebbdfbecabcc", "dbbbfecacecb"],
  ["cedafedeefdbeefe", "dadeeefeeeffcedb"],
  ["ad", "ad"],
  ["dddeaafcdbc", "addfdcacdeb"],
  ["aaafadabedccadbfcea", "badaaaadeffeabacccd"],
  ["cdcdfdfeda", "ddfdfeadcc"],
  ["aadcbdaed", "badeacdda"],
  ["bcfccddbbfccadffe", "cdbcfbfecfcdbacdf"],
  ["eefccdeddfcbfcdfce", "cfbcfcdfeceeddfdce"],
  ["cccaeeefaaeddcaec", "ddccaecaaeeefccae"],
  ["efcafaac", "faacafec"],
  ["bfdafaeaecdced", "afecdcaeefdabd"],
  ["cbdabdf", "fbdacbd"],
  ["cccedacebcacdeea", "aceeabcddcaececc"],
  ["dffbfffbbeab", "dffbabefffbb"],
  ["dbdb", "dbbd"],
  ["cddedce", "deedcdc"],
  ["eadbacfee", "eeefacbda"],
  ["afecfbecade", "efaebfecdca"],
  ["bceee", "ecebe"],
  ["bee", "eeb"],
  ["dcfbdeacabfceeffbfa", "fcbadaeeffbefcadbcf"],
  ["beafbeefbcdfac", "eedcbafabffebc"],
  ["fcdafeebedcaeecee", "ffeaeaecbdeceecde"],
  ["beadaaedf", "aaeddbfae"],
  ["bdfebfcfdc", "cfbebfdfcd"],
  ["ffaacbcaff", "afcfacffab"],
  ["bcabbb", "bbbcba"],
  ["fadaabbaefc", "adafafbeacb"],
  ["acaacaeee", "ecaeecaaa"],
];