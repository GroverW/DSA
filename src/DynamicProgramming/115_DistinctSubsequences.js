/*
Given two strings s and t, return the number of distinct subsequences of s which equals t.

A string's subsequence is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the remaining characters' relative positions. (i.e., "ACE" is a subsequence of "ABCDE" while "AEC" is not).

It is guaranteed the answer fits on a 32-bit signed integer.

 

Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from S.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from S.
babgbag
babgbag
babgbag
babgbag
babgbag
 

Constraints:

0 <= s.length, t.length <= 1000
s and t consist of English letters.
*/

var numDistinct = function (s, t) {
  let distinct = new Array(s.length + 1).fill(1);
  let next = new Array(s.length + 1).fill(0);

  for (let i = t.length - 1; i >= 0; i -= 1) {
    next[s.length] = 0;
    for (let j = s.length - 1; j >= 0; j -= 1) {
      next[j] = next[j + 1] + distinct[j + 1] * (s[j] === t[i]);
    }

    [distinct, next] = [next, distinct];
  }

  return distinct[0];
};

/*
[      r  a  b  b  b  i  t
   [0, 0, 0, 0, 0, 0, 0, 0]
 r [0, 1, 1, 1, 1, 1, 1, 1]
 a [0, 0, 1, 1, 1, 1, 1, 1]
 b [0, 0, 0, 1, 2, 3, 3, 3]
 b [0, 0, 0, 0, 1, 3, 3, 3]
 i [0, 0, 0, 0, 0, 0, 3, 3]
 t [0, 0, 0, 0, 0, 0, 0, 3]
]
       b  a  b  g  b  a  g
   [1, 0, 0, 0, 0, 0, 0, 0]
 b [0, 1, 1, 2, 2, 3, 3, 3]
 a [0, 0, 1, 1, 1, 1, 4, 4]
 g [0, 0, 0, 0, 1, 1, 1, 5]
*/

// const maxLen = 100;

// for (let i = 0; i < 50; i += 1) {
//   const sLen = numberBetween(1, maxLen);
//   const tLen = numberBetween(1, 5);


//   let s = '';
//   for(let i = 0; i < sLen; i += 1) s += randomLetter({ limit: 10 });

//   let t = '';
//   for(let j = 0; j < tLen; j += 1) t += randomLetter({ limit: 10 });

//   // logOutList('"' + parenString + '",')
//   // logOutList(printRow([commands, actions]) + ',')
//   logOutList(printRow([s, t]) + ',');
//   //   // logOutList(n);
//   //   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [
    "rabbbit",
    "rabbit",
  ],
  [
    "babgbag",
    "bag",
  ],
  [
    "ffllaffaffllaaggg",
    "flag",
  ],
  ["gadggcdfbfafifgbdbhhjicjbbihighabbeeefhciiajicc", "ag"],
  ["eefgdieibhieghgiafifjahhghgfjeibdahcbiiieghhacccihjejcjeihibjaeachae", "jh"],
  ["cjehehcfifghbfhigbchcgbgjhcidijhaacccihfched", "dga"],
  ["hgagchdcjadafaehcbeeadidgcaegbhhacecdadef", "gie"],
  ["hieiehfbfdihfagdaadjeh", "jhcc"],
  ["gfaedgijb", "a"],
  ["jedgjcfcgicgfagidjbcafcbaciebbccbahbhdchbehcecfbcahbhaahfiehfiegeaf", "i"],
  ["afdeegbacfibhddgbjcghhhhafeafejagfg", "bjjd"],
  ["gcaedibjdheacibbheifbheghfdefafaagfgfffeiagahbahjhbbefbbjhbgdhgicjfbcfdgfehad", "gjf"],
  ["bcjdjbajehgaaehddbdfaebjigcgcdcchjjidfijhhefcbbiafdcjcbffadiffifdahc", "ge"],
  ["iaibchaabdedcgahgidjeafajiaibebhbabgehifffhhiejdchaceajejedceidfaahjbgdjghcdcdfjbiihaeaccddadeee", "cbhbf"],
  ["gbeagceiiffaecadeeibcjjeajjjcbcjjijfjeiadhdcbeh", "bdie"],
  ["bhideebddcdjchffdffeaadagdjghjagbcfiecfjbgjgchbigddddccdbabjgefdgdbffgdbi", "cc"],
  ["ebchfbahaghacddihdahaicheabeijjchifbgfhcdciiadhagbediijjcddfcgjccbajgdjjhehhgfgeg", "fe"],
  ["adibcjccbdjcgedcfegifeggjchdgef", "fae"],
  ["hahchcihgfcjccjhggjehfgdehjegjgjieihe", "fjj"],
  ["icfdcihcjgdifhicgcjeehcjjacgafdiiaadhbiegdaajebddeedadfahiiijcdhdjaiehiebcei", "cffhj"],
  ["jeghbjiagdidjjbbfjbjjgcebgicbbjdecibjaicbaaffafad", "bhbag"],
  ["jghaibhdhgjdihdebcejdgahaiejbjjjgfghieejchigagghhabfcbgbcchgabdac", "gfch"],
  ["ggeeffefjgeiijjjefefifccfcigcdg", "f"],
  ["icjiibdagebfc", "abc"],
  ["ghcfcaabjihhajhgccfibjaieeecegccbebajcegajegcihiffjfadebbijbaefeg", "gcf"],
  ["acbiagfeaafhfdagadjjcbbddgcdfjbfgebgcheafebigddbcghfajdjdideecjcfaehaajeh", "b"],
  ["ghjcadicdiigidcddcfijhhjhbgjhijjjdhdcacedbjhfjgjdfdaggccchagfaahcdjcffhdiiiggdajbjfgjb", "jhbhg"],
  ["dgj", "id"],
  ["hiaefjhjffcibidjgifijhfehccfbacgid", "gdg"],
  ["aecb", "dh"],
  ["jhcgcbddffdjeejhdigafaeacciifgahbhchgeiihjjgiiafbgdffbaiijcfjdabdfjgecdjiaeiidhjchfdje", "ihgdj"],
  ["aehjedghjadbcgfbgf", "ed"],
  ["fcfaciggghhigbcjahbaafdbfcdiegfeaefifdacgb", "j"],
  ["jiahjichecdefhhfaajaaffaiciijajhhhachafabacgecgejhhbddecbgfcafbbbdgifjhcgfijbajgbijf", "ee"],
  ["fbiaccgjbbdebfafceeadchcbahhaegffjjhdaaidbgbf", "adhi"],
  ["bdiddccahffj", "fb"],
  ["cjccaddhaejfggcifdhcadiiffbcghbiahgaacceehbbjecchdjdgcdidcbjfcehdaefhcjiffieibcff", "chh"],
  ["bgcfjhidjcjd", "abfa"],
  ["bbecbadeabcgeac", "d"],
  ["cebhacidfibhhjebjacaabhihehaehjjjbhhgbiabiijbjigaffceahidhcageibgceadgbdfcaabbjci", "idj"],
  ["ajdgchhhhgaafefjhcchejiefdcacaciffceggebfcbfeddehjggahigebgffdhhbgehjdcjadahhcacdghjfbbgdjgbb", "je"],
  ["hchjecajjejhbeiaiigeidcgfbdbigdffbbbhchg", "cgcg"],
  ["abgdbifhbedbfgedcbbhddbjccigahhjjhgahebbebgehehejffaieijbgieghbgdbfaaabhdajfbjahcegjjegibgfj", "b"],
  ["bjjhdcafjgfbdhbidhjidahgjffacdgcdabdafjbjdgdfagjcfjfbd", "cjb"],
  ["hjdgiibfdbbehbjda", "diajb"],
  ["ehidfghhjgaiebebiabhhdgdgaifeaicibghahacgibagbdcfhgjjciaijegchbjcbcfiahfchhhbchgiehieagedccca", "ch"],
  ["hdgdjieibdggigbjajbigddicdabjedghjabbacfhhcfhdjdb", "eaceg"],
  ["ecjdhfdbbjaadcijfjcfcfcjieecbciadfhficeiffhaehijfchhgaifehhfeehibdbafajd", "cd"],
  ["ebcchfbhijaj", "ebdhg"],
  ["befcieefahgjfbegbhhgfebjfdiiaabfhfdhhfeficebihfhjifbeabfgccdhdgcfjafahib", "geg"],
  ["faahfafihfeedaefcjeafdbjbbdaehedhijjhbjaajeadafjcgidfhdddbbieafiihhcchcihagbjefjfcjgdbcai", "h"],
  ["bcgcbfhadedabecdhaiihcjccgjbfdfbdgjjaghjeeiifcdaiafcbjggfdibehfacddahhggjbdidacg", "bc"],
  ["gffgjfffchjibbgjfcehagcacebcjj", "fehb"],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(numDistinct(...test));
  console.timeEnd(i);
  i += 1;
}

/*
"gadggcdfbfafifgbdbhhjicjbbihighabbeeefhciiajicc"
"ag"
"eefgdieibhieghgiafifjahhghgfjeibdahcbiiieghhacccihjejcjeihibjaeachae"
"jh"
"cjehehcfifghbfhigbchcgbgjhcidijhaacccihfched"
"dga"
"hgagchdcjadafaehcbeeadidgcaegbhhacecdadef"
"gie"
"hieiehfbfdihfagdaadjeh"
"jhcc"
"gfaedgijb"
"a"
"jedgjcfcgicgfagidjbcafcbaciebbccbahbhdchbehcecfbcahbhaahfiehfiegeaf"
"i"
"afdeegbacfibhddgbjcghhhhafeafejagfg"
"bjjd"
"gcaedibjdheacibbheifbheghfdefafaagfgfffeiagahbahjhbbefbbjhbgdhgicjfbcfdgfehad"
"gjf"
"bcjdjbajehgaaehddbdfaebjigcgcdcchjjidfijhhefcbbiafdcjcbffadiffifdahc"
"ge"
"iaibchaabdedcgahgidjeafajiaibebhbabgehifffhhiejdchaceajejedceidfaahjbgdjghcdcdfjbiihaeaccddadeee"
"cbhbf"
"gbeagceiiffaecadeeibcjjeajjjcbcjjijfjeiadhdcbeh"
"bdie"
"bhideebddcdjchffdffeaadagdjghjagbcfiecfjbgjgchbigddddccdbabjgefdgdbffgdbi"
"cc"
"ebchfbahaghacddihdahaicheabeijjchifbgfhcdciiadhagbediijjcddfcgjccbajgdjjhehhgfgeg"
"fe"
"adibcjccbdjcgedcfegifeggjchdgef"
"fae"
"hahchcihgfcjccjhggjehfgdehjegjgjieihe"
"fjj"
"icfdcihcjgdifhicgcjeehcjjacgafdiiaadhbiegdaajebddeedadfahiiijcdhdjaiehiebcei"
"cffhj"
"jeghbjiagdidjjbbfjbjjgcebgicbbjdecibjaicbaaffafad"
"bhbag"
"jghaibhdhgjdihdebcejdgahaiejbjjjgfghieejchigagghhabfcbgbcchgabdac"
"gfch"
"ggeeffefjgeiijjjefefifccfcigcdg"
"f"
"icjiibdagebfc"
"abc"
"ghcfcaabjihhajhgccfibjaieeecegccbebajcegajegcihiffjfadebbijbaefeg"
"gcf"
"acbiagfeaafhfdagadjjcbbddgcdfjbfgebgcheafebigddbcghfajdjdideecjcfaehaajeh"
"b"
"ghjcadicdiigidcddcfijhhjhbgjhijjjdhdcacedbjhfjgjdfdaggccchagfaahcdjcffhdiiiggdajbjfgjb"
"jhbhg"
"dgj"
"id"
"hiaefjhjffcibidjgifijhfehccfbacgid"
"gdg"
"aecb"
"dh"
"jhcgcbddffdjeejhdigafaeacciifgahbhchgeiihjjgiiafbgdffbaiijcfjdabdfjgecdjiaeiidhjchfdje"
"ihgdj"
"aehjedghjadbcgfbgf"
"ed"
"fcfaciggghhigbcjahbaafdbfcdiegfeaefifdacgb"
"j"
"jiahjichecdefhhfaajaaffaiciijajhhhachafabacgecgejhhbddecbgfcafbbbdgifjhcgfijbajgbijf"
"ee"
"fbiaccgjbbdebfafceeadchcbahhaegffjjhdaaidbgbf"
"adhi"
"bdiddccahffj"
"fb"
"cjccaddhaejfggcifdhcadiiffbcghbiahgaacceehbbjecchdjdgcdidcbjfcehdaefhcjiffieibcff"
"chh"
"bgcfjhidjcjd"
"abfa"
"bbecbadeabcgeac"
"d"
"cebhacidfibhhjebjacaabhihehaehjjjbhhgbiabiijbjigaffceahidhcageibgceadgbdfcaabbjci"
"idj"
"ajdgchhhhgaafefjhcchejiefdcacaciffceggebfcbfeddehjggahigebgffdhhbgehjdcjadahhcacdghjfbbgdjgbb"
"je"
"hchjecajjejhbeiaiigeidcgfbdbigdffbbbhchg"
"cgcg"
"abgdbifhbedbfgedcbbhddbjccigahhjjhgahebbebgehehejffaieijbgieghbgdbfaaabhdajfbjahcegjjegibgfj"
"b"
"bjjhdcafjgfbdhbidhjidahgjffacdgcdabdafjbjdgdfagjcfjfbd"
"cjb"
"hjdgiibfdbbehbjda"
"diajb"
"ehidfghhjgaiebebiabhhdgdgaifeaicibghahacgibagbdcfhgjjciaijegchbjcbcfiahfchhhbchgiehieagedccca"
"ch"
"hdgdjieibdggigbjajbigddicdabjedghjabbacfhhcfhdjdb"
"eaceg"
"ecjdhfdbbjaadcijfjcfcfcjieecbciadfhficeiffhaehijfchhgaifehhfeehibdbafajd"
"cd"
"ebcchfbhijaj"
"ebdhg"
"befcieefahgjfbegbhhgfebjfdiiaabfhfdhhfeficebihfhjifbeabfgccdhdgcfjafahib"
"geg"
"faahfafihfeedaefcjeafdbjbbdaehedhijjhbjaajeadafjcgidfhdddbbieafiihhcchcihagbjefjfcjgdbcai"
"h"
"bcgcbfhadedabecdhaiihcjccgjbfdfbdgjjaghjeeiifcdaiafcbjggfdibehfacddahhggjbdidacg"
"bc"
"gffgjfffchjibbgjfcehagcacebcjj"
"fehb"
*/
