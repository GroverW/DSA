/*
Given two strings s and t, your goal is to convert s into t in k moves or less.

During the ith (1 <= i <= k) move you can:

Choose any index j (1-indexed) from s, such that 1 <= j <= s.length and j has not been chosen in any previous move, and shift the character at that index i times.
Do nothing.
Shifting a character means replacing it by the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Shifting a character by i means applying the shift operations i times.

Remember that any index j can be picked at most once.

Return true if it's possible to convert s into t in no more than k moves, otherwise return false.

 

Example 1:

Input: s = "input", t = "ouput", k = 9
Output: true
Explanation: In the 6th move, we shift 'i' 6 times to get 'o'. And in the 7th move we shift 'n' to get 'u'.
Example 2:

Input: s = "abc", t = "bcd", k = 10
Output: false
Explanation: We need to shift each character in s one time to convert it into t. We can shift 'a' to 'b' during the 1st move. However, there is no way to shift the other characters in the remaining moves to obtain t from s.
Example 3:

Input: s = "aab", t = "bbb", k = 27
Output: true
Explanation: In the 1st move, we shift the first 'a' 1 time to get 'b'. In the 27th move, we shift the second 'a' 27 times to get 'b'.
 

Constraints:

1 <= s.length, t.length <= 10^5
0 <= k <= 10^9
s, t contain only lowercase English letters.
*/

var canConvertString = function(s, t, k) {
  if (s.length !== t.length) return false;
  const numMoves = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);
  let minMovesRequired = 0;
  
  for(let i = 0; i < s.length; i += 1) {
    if (s[i] === t[i]) continue;
    const letterS = s.charCodeAt(i) - aCode;
    const letterT = t.charCodeAt(i) - aCode;
    const distance = letterT > letterS
      ? letterT - letterS
      : 26 - letterS + letterT
    
    minMovesRequired = Math.max(minMovesRequired, 26 * numMoves[distance] + distance);
    numMoves[distance] += 1;
    // if (minMovesRequired > k) return false;
  }
  return minMovesRequired;
};
/*

*/

// const maxLen = 100;

// for (let i = 0; i < 25; i += 1) {
//   const len = numberBetween(1, maxLen);

//   const s = new Array(len).fill('').map(() => randomLetter({})).join('');
//   const t = new Array(len).fill('').map(() => randomLetter({})).join('');


//   // logOutList('"' + parenString + '",')
//   // logOutList(printRow([nums, k]) + ',')
//   logOutList(printRow([s, t]) + ',');
//   // logOutList(numberBetween(1, 100) + ',');
//   // logOutList(printRow(edges))
// }

const tests = [
  ["cwpkdfcgjuzqqylolttylxzactfnpejqonavptxlwrqgyrve","utgirluzzzkbxaivmohuuhnijhrxumywlvfljxxoaaqakxhb"],
["nmkfbeturbuwnfapjmq","ehcxlresibkvhjdjysj"],
["gzwudzqyxwmafjvcjtxiwymxofryynuiulj","qrlhqpikgweqsoshchhsrtefdxltubpjwjw"],
["nykdikwrvcyawkbccjurakromwwbsaloufrnhyblzdbphx","oalwwcygokkhonsktyorhybrjuhczfiktjwcichrgrpnfi"],
["ifiqyedfterbxbygicraczwowndleei","wrfkvxwhklhzejhgggdschazahiyixu"],
["dqxyjaadofjowtxwnvwelhdw","mewycsxecsuuaybyjzrifzvy"],
["lxsinnfiiyhqthimrdgurfkqlnlpyetzzwozafekgqvnaluqkabikbdeqonyscf","ncdzekxmsaxktzwonmywrnyfdnwblifykphmygrihhhqmzcqmsbpmmnkexpcjku"],
["ftxnmdiqotgzxzernenhuxvnuuvm","ttnkobhrlluhksiutczkyjvrdjzq"],
["hynunpcdxrwxwugpffpxjwivvqxfekrcukdkgonqkfhwdamynclzrmolmkmnugzld","cfhcyxhkfhqjfpqrcjvqbihgeqwqpqnlhgsckstfmshzlivlbegjszhnhujfqggtg"],
["dzpjntwmhkqcxwshxuyxmxxsmdjjnfurxb","txxffyxgwbyzlsiruuvrjaoqgdulvstbcn"],
["tlxinufqgfunbxcnhzgfyqyqfhujavrxphwbkxgvbjf","aanafdhglckawrwvjnymetmtxizdunbiaicbqbxopfn"],
["diqtmafiquuifafjckzndtbrdljlldjvqnqsiozapzsngchgnuvdoa","rtvnlntyurpxvyonlowbisltndrcscphbqcncfxctduarioxwylucc"],
["ktkxcrecpfhzaysccayocnvheiwdfnkcwxemlthgvuwwcvbyddxzzqucbitctsjhqkcsjuvnjnqnotcbtmdywjwb","oirxxahaqgurofyoethvdbvgeqisjqycnlzuendqcozdeoxeoptowfbpjydblppcervxbjwbyhwqnaacuxiniidq"],
["qooifvuohlgwhrfghc","wcuxhykvojdefmhfvr"],
["ezvjrdfujfgkmatdeuumzfbwmqdbksakgykuoiyraorassatabwzzqjpaqvozjmggqfbioajhlqbahq","nhaqiukgjfgaoktrsyomqubkzwbqrkgxqajwnbtymukpzjzoawqrgziehidmvcfumkcwjqauhldmlzd"],
["ausekeiufqsobsvkckrokghwosfedeugcliymvvzyxfasvpifnuvdynbkzxmlebkhvizzobnsbfcicfthdutmtfcfhld","fvhaowdzbasxtjmsxoqphjmsotwneiuzpfldtoavkwmmtonivytblgyhpluqkjcszcpqqmzqknehcfrrejxoixlunpam"],
["rrttfrvcaddvdooiuqhrcuvidemnxlvofifnqktdzcswkzbgogyncomwqcdgwwwgoxyovpddbfcidmczeyisyfjwfohiozkn","ictcxmrlhgklkudwueljxirmjiqohjpxiiwjsyrijauwpijenwbaedqacetrrtqqgltjxzsvffouaecwfckbtfigfmiswxau"],
["jxvlqiwut","xndulbffg"],
["njwdrtsvnmbbzllgpmvkmqnirqdwikkjskwbyfwjalnjjkwsgbluwylpaxmifqiahjnck","zisxzedmlpfqovkbcefmbebcyhkxmbsbqzpvuheluoywigetulzdhkisjcgvxeahtdspp"],
["ngzlurxxwdrwvtbcoonanbqdhfmzjpelsklukxnjhhnhmqkyjweivbrtqifdvmijurogqmgqgtelqjnoioblryxlswypgwci","ntzpdrvysgodzncpgorrxszygsnsjbbpknxxxkssfvfarkkxagqqwxxdxnhilfzmqxvqsjhhuuskqjxniasglgghmxryfsyt"],
["ytscdrpsgztbjzzxuwjekbhdojopkuoybvydtoplpkpufgjfhmh","fvxdiahpbjquubxegbwaydrhpilnwvhuldillnhruitsjnsgmnz"],
["pipsauykxysiyivpiz","mxwjpkxpluthuaefjh"],
["tbpvjexbjdkzcykjmeocjzbsmeyccaqfkikxurbgvpjzaiqjwvjwyetplpskyurqbup","rkqkigsylnzwdnnbrbrknkezbqxuxsfnnedbrnhvlypxkdyypfmnpmjkpatfxvfqwus"],
["waduzosxgenuyoddgeww","ydqvcebcmtgdclrkmjof"],
["bn","zh"],
];



let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(canConvertString(...test));
  console.timeEnd(i);
  i += 1;
}

/*
"cwpkdfcgjuzqqylolttylxzactfnpejqonavptxlwrqgyrve"
"utgirluzzzkbxaivmohuuhnijhrxumywlvfljxxoaaqakxhb"
101
"cwpkdfcgjuzqqylolttylxzactfnpejqonavptxlwrqgyrve"
"utgirluzzzkbxaivmohuuhnijhrxumywlvfljxxoaaqakxhb"
100
"nmkfbeturbuwnfapjmq"
"ehcxlresibkvhjdjysj"
46
"nmkfbeturbuwnfapjmq"
"ehcxlresibkvhjdjysj"
45
"gzwudzqyxwmafjvcjtxiwymxofryynuiulj"
"qrlhqpikgweqsoshchhsrtefdxltubpjwjw"
122
"gzwudzqyxwmafjvcjtxiwymxofryynuiulj"
"qrlhqpikgweqsoshchhsrtefdxltubpjwjw"
121
"nykdikwrvcyawkbccjurakromwwbsaloufrnhyblzdbphx"
"oalwwcygokkhonsktyorhybrjuhczfiktjwcichrgrpnfi"
92
"nykdikwrvcyawkbccjurakromwwbsaloufrnhyblzdbphx"
"oalwwcygokkhonsktyorhybrjuhczfiktjwcichrgrpnfi"
91
"ifiqyedfterbxbygicraczwowndleei"
"wrfkvxwhklhzejhgggdschazahiyixu"
82
"dqxyjaadofjowtxwnvwelhdw"
"mewycsxecsuuaybyjzrifzvy"
82
"lxsinnfiiyhqthimrdgurfkqlnlpyetzzwozafekgqvnaluqkabikbdeqonyscf"
"ncdzekxmsaxktzwonmywrnyfdnwblifykphmygrihhhqmzcqmsbpmmnkexpcjku"
158
"ftxnmdiqotgzxzernenhuxvnuuvm"
"ttnkobhrlluhksiutczkyjvrdjzq"
108
"hynunpcdxrwxwugpffpxjwivvqxfekrcukdkgonqkfhwdamynclzrmolmkmnugzld"
"cfhcyxhkfhqjfpqrcjvqbihgeqwqpqnlhgsckstfmshzlivlbegjszhnhujfqggtg"
138
"dzpjntwmhkqcxwshxuyxmxxsmdjjnfurxb"
"txxffyxgwbyzlsiruuvrjaoqgdulvstbcn"
101
"tlxinufqgfunbxcnhzgfyqyqfhujavrxphwbkxgvbjf"
"aanafdhglckawrwvjnymetmtxizdunbiaicbqbxopfn"
122
"diqtmafiquuifafjckzndtbrdljlldjvqnqsiozapzsngchgnuvdoa"
"rtvnlntyurpxvyonlowbisltndrcscphbqcncfxctduarioxwylucc"
134
"ktkxcrecpfhzaysccayocnvheiwdfnkcwxemlthgvuwwcvbyddxzzqucbitctsjhqkcsjuvnjnqnotcbtmdywjwb"
"oirxxahaqgurofyoethvdbvgeqisjqycnlzuendqcozdeoxeoptowfbpjydblppcervxbjwbyhwqnaacuxiniidq"
215
"qooifvuohlgwhrfghc"
"wcuxhykvojdefmhfvr"
50
"ezvjrdfujfgkmatdeuumzfbwmqdbksakgykuoiyraorassatabwzzqjpaqvozjmggqfbioajhlqbahq"
"nhaqiukgjfgaoktrsyomqubkzwbqrkgxqajwnbtymukpzjzoawqrgziehidmvcfumkcwjqauhldmlzd"
137
"ausekeiufqsobsvkckrokghwosfedeugcliymvvzyxfasvpifnuvdynbkzxmlebkhvizzobnsbfcicfthdutmtfcfhld"
"fvhaowdzbasxtjmsxoqphjmsotwneiuzpfldtoavkwmmtonivytblgyhpluqkjcszcpqqmzqknehcfrrejxoixlunpam"
187
"rrttfrvcaddvdooiuqhrcuvidemnxlvofifnqktdzcswkzbgogyncomwqcdgwwwgoxyovpddbfcidmczeyisyfjwfohiozkn"
"ictcxmrlhgklkudwueljxirmjiqohjpxiiwjsyrijauwpijenwbaedqacetrrtqqgltjxzsvffouaecwfckbtfigfmiswxau"
186
"jxvlqiwut"
"xndulbffg"
35
"njwdrtsvnmbbzllgpmvkmqnirqdwikkjskwbyfwjalnjjkwsgbluwylpaxmifqiahjnck"
"zisxzedmlpfqovkbcefmbebcyhkxmbsbqzpvuheluoywigetulzdhkisjcgvxeahtdspp"
150
"ngzlurxxwdrwvtbcoonanbqdhfmzjpelsklukxnjhhnhmqkyjweivbrtqifdvmijurogqmgqgtelqjnoioblryxlswypgwci"
"ntzpdrvysgodzncpgorrxszygsnsjbbpknxxxkssfvfarkkxagqqwxxdxnhilfzmqxvqsjhhuuskqjxniasglgghmxryfsyt"
157
"ytscdrpsgztbjzzxuwjekbhdojopkuoybvydtoplpkpufgjfhmh"
"fvxdiahpbjquubxegbwaydrhpilnwvhuldillnhruitsjnsgmnz"
109
"pipsauykxysiyivpiz"
"mxwjpkxpluthuaefjh"
51
"tbpvjexbjdkzcykjmeocjzbsmeyccaqfkikxurbgvpjzaiqjwvjwyetplpskyurqbup"
"rkqkigsylnzwdnnbrbrknkezbqxuxsfnnedbrnhvlypxkdyypfmnpmjkpatfxvfqwus"
171
"waduzosxgenuyoddgeww"
"ydqvcebcmtgdclrkmjof"
61
"bn"
"zh"
24
*/