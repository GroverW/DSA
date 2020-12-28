/*
Given a string s, return the last substring of s in lexicographical order.

 

Example 1:

Input: "abab"
Output: "bab"
Explanation: The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".
Example 2:

Input: "leetcode"
Output: "tcode"
 

Note:

1 <= s.length <= 4 * 10^5
s contains only lowercase English letters.
*/

var lastSubstring = function (s) {
  let start = 0;
  let hasDecreased = false;
  for (let i = 1; i < s.length; i += 1) {
    if (s[i] > s[start]) {
      start = i;
      hasDecreased = false;
    } else if (s[i] === s[start] && hasDecreased) {
      const newStart = i;
      let j = newStart;
      let k = start;
      
      while (s[j] === s[k] && k < newStart) {
        j += 1;
        k += 1;
      }

      if (s[j] > s[k]) start = newStart;
      i = j - 1;
    } else {
      hasDecreased = true;
    }
  }

  return s.slice(start);
};

/*

*/


// const maxLen = 100;
// const letters = 'abcdefghijklmnopqrstuvwxyz';
// for (let i = 0; i < 40; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;

//   let str = '';
//   for (let j = 0; j < len; j += 1) {
//     const idx = Math.floor(Math.random() * letters.length);
//     str += letters[idx];
//   }

//   logOutList('"' + str + '",')
//   // logOutList(printRow([target, startFuel, stations]) + ',');
// }

const tests = [
  "abab",
  "leetcode",
  "gggfggxyzgggghijklzz",
  "hhebcdhhebddd",
  "hhehheh",
  "gycuedafmjigtmqzhwtegyyvh",
  "oqlyddyfztspsauuosyyks",
  "cddzhbbsqwycszdblpjnkduuclvnlkrtmmvpqmlwqkomkwicloqsxrdoeetayywggpebkusqnblrnmrjdlrdksswuddeirf",
  "bpqsgddtzbyx",
  "nnfjbxvrbajkajaxnqanxfdfxbyzdtdkpdoapfsadugvfhmdcwyyqdxnvxgmchulvgrjxthdzqnbhwvovuf",
  "pkzboudbypauueimcvshtomiyarsicyrbrsqxszhtcgqiqkyeltsxluolxyequrzazmxfqytimnrhjqmwralucbna",
  "cozhtmyyesoasvrxwholtznvjaywscaldslnxqjkbrpzqnrqkxudbckihunnazoxijyoebyhsjdrkry",
  "wxhmnoamggrvmwvakonml",
  "vwtdnmcghbtluvzldvqrqdleidsekmqczsfvoygyuwrnkkaegehvkcsehuaefhanzxwnbezlmxcfqrhdthm",
  "fxmwzuikplfgidbajypeqefqtrfoolqlxpdtkqduokzvbigkitkvmhoqvfvhtfsvbzxzsuskdixwqkdyslwe",
  "yagtqrjahvpavipjpyjrfyxbdofodwuycuidefoicqrnobnhupxkpcciybkiafebvjrrm",
  "zsyptkrqzuenwmbrlbewgbjzcbkhkwtvymwaftlncm",
  "eoyajrrhfxwieusbxfyveidxkrgxkpevzxlxolpwjgkzmhaasshtqatbdktjqgburqlekzylruirlvm",
  "hpzzfyodwfgollpozmskfreyvrlhmzakxyxzoznwnnqprnmldjwzrsvyeduleocreqbiogoyibyavqirba",
  "gibsdbnkcwlvhlcbasfdihvoqnrbtheajuiewpaxkokdzfleneyqu",
  "rxwvryunxcrcldpvdnfaqxojtkgupzfiqqv",
  "orfhvmuvnxuwegfedtqsksonzvahqebzvfj",
  "ogopkmjmpwrsdotugualxikxzdpiuisn",
  "swdeyhhizdopjphahbcqrhhaxrsgwshtthrzperwocwkebfmtykpdizwo",
  "ecuyicviakdpwnpyfdgeflcboq",
  "mcetkwpbwqtxzo",
  "kakaehvwxptezoegwkmepglmblqpvetghwcudubpvnkykyuvyaptzfarcyquhbqgqcxdqcjsewnmfqgsfdmjyi",
  "niylxnvvrzbhaiepbahltypvtupqaysungqxgiosvoleqgrdlzfbihcijkfmjjxijapuwmhtoztgmsfjcmcebmcxrxucio",
  "unfvaopqlnqbvnseqichzzlgqjzvrawqyfgjvxyzmjqzwhzbvqednrry",
  "bvojpuhrocimmvoddmcwjrztinjgkxr",
  "tdktinibiyiquqptjakeqcrblcwjplastobvryyerrjzpjcloac",
  "mclaglhea",
  "eamjabbjauzwrxoofhgh",
  "yqpltaqpexzxovpdgxqffubhrtksgtnamahdgsqhqzbfkmsuajinifzhtibjicxpyylbekpxzoujxmfveivjlpbmiyruysv",
  "ihtwiinmvsftvlbbbldmqekgniqqaykcrzazpgeojfahunkfgabtxcjgmogubpgstdclpatngbbslonvjvqupvdbmersro",
  "qzxtcwihgxvrlgoguetqazvegirvdumellpqsbeiuocqfepxyvaavddkrfnrpekqvbnyysapnsvrbzufsqewiwszsyocwdkuei",
  "duivzoubcnabaongbwvxikddxongxlgoh",
  "glalpjewfuvabmuqgpdqypwwgnmgvzankgxpss",
  "mycimynwckyvlnjepmobbmscektalynaamszuygljx",
  "wrkxvuitjmsnwwwhovvvpwwhahyjpundvbhfrbksgrizzhbgxdnraitkvmghnulpimqanpzilohrezhbmskoarosgjxhmuweijeu",
  "ksbyecjxpqbfafiizxdwmiznfhehuxyqvcywfe",
  "jvrxrcyovrlxpfkkubsjmquxlukxljsopzzwajkvnnpbvzrlce",
  "gewnlwwdlpkrzyztgiodywmmyrrcnxoisfahjrindynxasyafmqysfxalvnukmkahmhgcqwbhupbmkhss",
  "hnvwdrfatmshsopghyrqovdgfwioahyudcdgybrmqghocrgvnqnexnsjqaujygbbyhuzhkhlqmahbgvaxvdkukgqguk",
  "fiyptddslqzihffyduahihmqeqyxioyupftybyj",
  "zabcdezabcdzze",
  "zazbzczdzczddd",
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(lastSubstring(test));
  console.timeEnd(i);
  i += 1;
}

/*
"abab"
"leetcode"
"gggfggxyzgggghijklzz"
"hhebcdhhebddd"
"hhehheh"
"gycuedafmjigtmqzhwtegyyvh"
"oqlyddyfztspsauuosyyks"
"cddzhbbsqwycszdblpjnkduuclvnlkrtmmvpqmlwqkomkwicloqsxrdoeetayywggpebkusqnblrnmrjdlrdksswuddeirf"
"bpqsgddtzbyx"
"nnfjbxvrbajkajaxnqanxfdfxbyzdtdkpdoapfsadugvfhmdcwyyqdxnvxgmchulvgrjxthdzqnbhwvovuf"
"pkzboudbypauueimcvshtomiyarsicyrbrsqxszhtcgqiqkyeltsxluolxyequrzazmxfqytimnrhjqmwralucbna"
"cozhtmyyesoasvrxwholtznvjaywscaldslnxqjkbrpzqnrqkxudbckihunnazoxijyoebyhsjdrkry"
"wxhmnoamggrvmwvakonml"
"vwtdnmcghbtluvzldvqrqdleidsekmqczsfvoygyuwrnkkaegehvkcsehuaefhanzxwnbezlmxcfqrhdthm"
"fxmwzuikplfgidbajypeqefqtrfoolqlxpdtkqduokzvbigkitkvmhoqvfvhtfsvbzxzsuskdixwqkdyslwe"
"yagtqrjahvpavipjpyjrfyxbdofodwuycuidefoicqrnobnhupxkpcciybkiafebvjrrm"
"zsyptkrqzuenwmbrlbewgbjzcbkhkwtvymwaftlncm"
"eoyajrrhfxwieusbxfyveidxkrgxkpevzxlxolpwjgkzmhaasshtqatbdktjqgburqlekzylruirlvm"
"hpzzfyodwfgollpozmskfreyvrlhmzakxyxzoznwnnqprnmldjwzrsvyeduleocreqbiogoyibyavqirba"
"gibsdbnkcwlvhlcbasfdihvoqnrbtheajuiewpaxkokdzfleneyqu"
"rxwvryunxcrcldpvdnfaqxojtkgupzfiqqv"
"orfhvmuvnxuwegfedtqsksonzvahqebzvfj"
"ogopkmjmpwrsdotugualxikxzdpiuisn"
"swdeyhhizdopjphahbcqrhhaxrsgwshtthrzperwocwkebfmtykpdizwo"
"ecuyicviakdpwnpyfdgeflcboq"
"mcetkwpbwqtxzo"
"kakaehvwxptezoegwkmepglmblqpvetghwcudubpvnkykyuvyaptzfarcyquhbqgqcxdqcjsewnmfqgsfdmjyi"
"niylxnvvrzbhaiepbahltypvtupqaysungqxgiosvoleqgrdlzfbihcijkfmjjxijapuwmhtoztgmsfjcmcebmcxrxucio"
"unfvaopqlnqbvnseqichzzlgqjzvrawqyfgjvxyzmjqzwhzbvqednrry"
"bvojpuhrocimmvoddmcwjrztinjgkxr"
"tdktinibiyiquqptjakeqcrblcwjplastobvryyerrjzpjcloac"
"mclaglhea"
"eamjabbjauzwrxoofhgh"
"yqpltaqpexzxovpdgxqffubhrtksgtnamahdgsqhqzbfkmsuajinifzhtibjicxpyylbekpxzoujxmfveivjlpbmiyruysv"
"ihtwiinmvsftvlbbbldmqekgniqqaykcrzazpgeojfahunkfgabtxcjgmogubpgstdclpatngbbslonvjvqupvdbmersro"
"qzxtcwihgxvrlgoguetqazvegirvdumellpqsbeiuocqfepxyvaavddkrfnrpekqvbnyysapnsvrbzufsqewiwszsyocwdkuei"
"duivzoubcnabaongbwvxikddxongxlgoh"
"glalpjewfuvabmuqgpdqypwwgnmgvzankgxpss"
"mycimynwckyvlnjepmobbmscektalynaamszuygljx"
"wrkxvuitjmsnwwwhovvvpwwhahyjpundvbhfrbksgrizzhbgxdnraitkvmghnulpimqanpzilohrezhbmskoarosgjxhmuweijeu"
"ksbyecjxpqbfafiizxdwmiznfhehuxyqvcywfe"
"jvrxrcyovrlxpfkkubsjmquxlukxljsopzzwajkvnnpbvzrlce"
"gewnlwwdlpkrzyztgiodywmmyrrcnxoisfahjrindynxasyafmqysfxalvnukmkahmhgcqwbhupbmkhss"
"hnvwdrfatmshsopghyrqovdgfwioahyudcdgybrmqghocrgvnqnexnsjqaujygbbyhuzhkhlqmahbgvaxvdkukgqguk"
"fiyptddslqzihffyduahihmqeqyxioyupftybyj"
"zabcdezabcdzze"
"zazbzczdzczddd"
*/