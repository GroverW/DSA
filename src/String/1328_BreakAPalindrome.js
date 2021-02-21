/*
Given a palindromic string of lowercase English letters palindrome, replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome and that it is the lexicographically smallest one possible.

Return the resulting string. If there is no way to replace a character to make it not a palindrome, return an empty string.

A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, a has a character strictly smaller than the corresponding character in b. For example, "abcc" is lexicographically smaller than "abcd" because the first position they differ is at the fourth character, and 'c' is smaller than 'd'.

 

Example 1:

Input: palindrome = "abccba"
Output: "aaccba"
Explanation: There are many ways to make "abccba" not a palindrome, such as "zbccba", "aaccba", and "abacba".
Of all the ways, "aaccba" is the lexicographically smallest.
Example 2:

Input: palindrome = "a"
Output: ""
Explanation: There is no way to replace a single character to make "a" not a palindrome, so return an empty string.
Example 3:

Input: palindrome = "aa"
Output: "ab"
Example 4:

Input: palindrome = "aba"
Output: "abb"
 

Constraints:

1 <= palindrome.length <= 1000
palindrome consists of only lowercase English letters.
*/

var breakPalindrome = function (palindrome) {
  if (palindrome.length <= 1) return '';

  let nonACount = 0;
  let firstNonAPosition = -1;

  const output = palindrome.split('');

  for (let i = 0; i < output.length; i += 1) {
    if (palindrome[i] !== 'a') {
      nonACount += 1;
      if (firstNonAPosition < 0) firstNonAPosition = i;
    }
  }

  if (nonACount <= 1) {
    output[output.length - 1] = 'b';
  } else {
    output[firstNonAPosition] = 'a';
  }

  return output.join('');
};

/*

*/

// const maxLen = 50;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);

//   const firstHalf = new Array(Math.floor(len / 2)).fill('')
//     .map(() => Math.random() < .6 ? 'a' : randomLetter())
//     .join('');

//   const middle = len % 2 === 0 ? '' : randomLetter();
//   const secondHalf = firstHalf.split('').reverse().join('');
//   const palindrome = firstHalf + middle + secondHalf;


//   logOutList('"' + palindrome + '",')
// // logOutList(printRow([commands, actions]) + ',')
// //   // logOutList(printRow(nums) + ',');
// //   // logOutList(n);
// //   // logOutList(printRow(actions) + '],')
// }

const tests = [
  "abccba",
  "a",
  "aa",
  "aba",
  "daaaagaraswwjaatwtaajwwsaragaaaad",
  "aaaaarffraaaaa",
  "atafakskafata",
  "yfaafaoaaaaaaaakiavafavaikaaaaaaaaoafaafy",
  "aataa",
  "aanaa",
  "aaaavaaaoaxssaaaaaaaaaaassxaoaaavaaaa",
  "banaapbrtqsniaaaaalalaaaaainsqtrbpaanab",
  "aaaaaauaaaaaaaauaaaaaa",
  "rmodabadomr",
  "i",
  "aaaaaaaasaayaasaaaaaaaa",
  "waaicavmaaagocavassavacogaaamvaciaaw",
  "paaajyagaceaaasaaaqxxqaaasaaaecagayjaaap",
  "aataa",
  "aaaakaaaaaakaaaa",
  "raagaaafzxramacaaaacamarxzfaaagaar",
  "aaffaa",
  "q",
  "sxcasyaaaxxaaaysacxs",
  "daamaaaamaad",
  "anaaaaawaaaataaaaaataaaawaaaaana",
  "rnamlhsaauaaaganaazaanagaaauaashlmanr",
  "ajrvjaaxaajvrja",
  "avauajdassadjauava",
  "aaeaaaajaajaajaajaajaajaaaaeaa",
  "aaavaaa",
  "xoawjjclaaamaaalcjjwaox",
  "daxaxad",
  "aayaasahqzaaaaaazqhasaayaa",
  "aaaeauwwuaeaaa",
  "faaaaaiaaaaaf",
  "aanaaaaacngqafaaazhaoanpwwpnaoahzaaafaqgncaaaaanaa",
  "aaavaaoacaeabssbaeacaoaavaaa",
  "aaaqaaaaapaaaxaapaapaaxaaapaaaaaqaaa",
  "awagbqdaavahyhavaadqbgawa",
  "daaaaaad",
  "aqaomaaatamaafaamataaamoaqa",
  "lavfynarijaazaaaallaaaazaajiranyfval",
  "aanaaagyavaauqfravaakaakaavarfquaavaygaaanaa",
  "gsaqaaabaakayaaaaiaataagaataaiaaaayakaabaaaqasg",
  "aahrgaabvgaagvbaagrhaa",
  "aaalsaaojoaaslaaa",
  "szabdaaahaaaxyaaadedaaayxaaahaaadbazs",
  "aaaafafapzszpafafaaaa",
  "aaaaxataaaawaaaaaaaawaaaataxaaaa",
  "aaaaaaaaaaabuuaaeyaaaayeaauubaaaaaaaaaaa",
  "anana",
  "akaxfafaaaaaayaaajaaayaaaaaafafxaka",
  "aaahaafbfaahaaa",
];

let i = 0;
for (let test of tests) {
  console.time(i);
    logOutList(breakPalindrome(test));
  console.timeEnd(i);
  i += 1;
}

/*
"abccba"
"a"
"aa"
"aba"
"daaaagaraswwjaatwtaajwwsaragaaaad"
"aaaaarffraaaaa"
"atafakskafata"
"yfaafaoaaaaaaaakiavafavaikaaaaaaaaoafaafy"
"aataa"
"aanaa"
"aaaavaaaoaxssaaaaaaaaaaassxaoaaavaaaa"
"banaapbrtqsniaaaaalalaaaaainsqtrbpaanab"
"aaaaaauaaaaaaaauaaaaaa"
"rmodabadomr"
"i"
"aaaaaaaasaayaasaaaaaaaa"
"waaicavmaaagocavassavacogaaamvaciaaw"
"paaajyagaceaaasaaaqxxqaaasaaaecagayjaaap"
"aataa"
"aaaakaaaaaakaaaa"
"raagaaafzxramacaaaacamarxzfaaagaar"
"aaffaa"
"q"
"sxcasyaaaxxaaaysacxs"
"daamaaaamaad"
"anaaaaawaaaataaaaaataaaawaaaaana"
"rnamlhsaauaaaganaazaanagaaauaashlmanr"
"ajrvjaaxaajvrja"
"avauajdassadjauava"
"aaeaaaajaajaajaajaajaajaaaaeaa"
"aaavaaa"
"xoawjjclaaamaaalcjjwaox"
"daxaxad"
"aayaasahqzaaaaaazqhasaayaa"
"aaaeauwwuaeaaa"
"faaaaaiaaaaaf"
"aanaaaaacngqafaaazhaoanpwwpnaoahzaaafaqgncaaaaanaa"
"aaavaaoacaeabssbaeacaoaavaaa"
"aaaqaaaaapaaaxaapaapaaxaaapaaaaaqaaa"
"awagbqdaavahyhavaadqbgawa"
"daaaaaad"
"aqaomaaatamaafaamataaamoaqa"
"lavfynarijaazaaaallaaaazaajiranyfval"
"aanaaagyavaauqfravaakaakaavarfquaavaygaaanaa"
"gsaqaaabaakayaaaaiaataagaataaiaaaayakaabaaaqasg"
"aahrgaabvgaagvbaagrhaa"
"aaalsaaojoaaslaaa"
"szabdaaahaaaxyaaadedaaayxaaahaaadbazs"
"aaaafafapzszpafafaaaa"
"aaaaxataaaawaaaaaaaawaaaataxaaaa"
"aaaaaaaaaaabuuaaeyaaaayeaauubaaaaaaaaaaa"
"anana"
"akaxfafaaaaaayaaajaaayaaaaaafafxaka"
"aaahaafbfaahaaa"
*/