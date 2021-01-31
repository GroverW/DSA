/*
Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences.  If multiple answers exist, you may return any of them.

(A string S is a subsequence of string T if deleting some number of characters from T (possibly 0, and the characters are chosen anywhere from T) results in the string S.)

 

Example 1:

Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.
 

Note:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of lowercase English letters.
*/

var shortestCommonSupersequence = function (str1, str2) {
  const s1Len = str1.length;
  const s2Len = str2.length;

  const edits = new Array(s1Len + 1).fill(0)
    .map(() => new Array(s2Len + 1).fill(0));

  for (let i = s1Len - 1; i >= 0; i -= 1) edits[i][s2Len] = s1Len - i;
  for (let j = s2Len - 1; j >= 0; j -= 1) edits[s1Len][j] = s2Len - j;

  for (let i = s1Len - 1; i >= 0; i -= 1) {
    for (let j = s2Len - 1; j >= 0; j -= 1) {
      if (str1[i] === str2[j]) edits[i][j] = edits[i + 1][j + 1];
      else edits[i][j] = Math.min(edits[i + 1][j], edits[i][j + 1]) + 1;
    }
  }

  let i = 0;
  let j = 0;
  let shortestSuperSequence = '';

  while (i < s1Len && j < s2Len) {
    const addS1 = edits[i + 1][j];
    const addS2 = edits[i][j + 1];
    if (str1[i] === str2[j]) {
      shortestSuperSequence += str1[i];
      i += 1;
      j += 1;
    } else if (addS1 <= addS2) {
      shortestSuperSequence += str1[i];
      i += 1;
    } else {
      shortestSuperSequence += str2[j];
      j += 1;
    }
  }

  while (i < s1Len) {
    shortestSuperSequence += str1[i];
    i += 1;
  }
  while (j < s2Len) {
    shortestSuperSequence += str2[j];
    j += 1;
  }

  return shortestSuperSequence;
};

// const maxLen = 100;
// const letters = 'abcdefghijlkmnopqrstuvwxyz'
// for (let i = 0; i < 50; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;

//   const str1Len = Math.floor(Math.random() * len) + 1;
//   const str2Len = Math.floor(Math.random() * len) + 1;

//   let str1 = '';
//   for (let i = 0; i < str1Len; i += 1) {
//     const letterIdx = Math.floor(Math.random() * letters.length);
//     str1 += letters[letterIdx];
//   }
//   let str2 = '';
//   for (let i = 0; i < str2Len; i += 1) {
//     const letterIdx = Math.floor(Math.random() * letters.length);
//     str2 += letters[letterIdx];
//   }

//   // logOutList('"' + encoded + '",')
//   // logOutList(printRow([nums, k]) + ',')
//   logOutList(printRow([str1, str2]) + ',');
//   // logOutList(n);
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  ["abac", "cab"],
  ["abcdefg", "abdffgh"],
  ["aabacc", "babcac"],
  ["hmxphhum", "hlzpluph"],
  ["ghmxghugxl", "ppggxhhull"],
  ["gmmgzggluguh", "hpgppmglluuu"],
  ["cbbc", "cabaabbc"],
  ["emzwqgukbrneodmtoljlbxluwqomxbitwxrzqbli", "focfwqhzsfcjktaprsbkhhrrsfepkzfhiiszylkmzrkxvvshmjsneieoaxbyuwknacdkoqcwzwjuxxbp"],
  ["qhfhitbryjqtakprthzu", "munujjfaczrvbpjycslulgnqrkhlpiomtioclnybgatjjxvezrfcquetwhrohpury"],
  ["nqykwlhtdsgszjbjcusvdeligcprtwjgqnnjq", "usbowlt"],
  ["ucbqwaaldmtkwtghlfktvkpl", "csucjytjymgovczysrccbumcvcdw"],
  ["cmaltvszllyoogfkdoidsnagrvpvcmodaienbeji", "ajxpytnkgdiyqukmodulwpewgkzhzukiwvn"],
  ["kgxhyasaenwfmcrrfao", "ofzwdig"],
  ["vmveqrrrvefvixknkaofgruntahwpzogyemddvdsptvasws", "htuqbnghmemphkwbhsihgcxwjqwmdyjllqdhirwwizjcgjilxrpvhuwcrb"],
  ["a", "fpmtfqrljykjvtfqjjtatkvfypcbigeggtspeeaoqumvb"],
  ["oy", "t"],
  ["wnbe", "kx"],
  ["mhyvzvagixrvaelvimzajcneetpjkvzqfxcuih", "qtucbxnbppedpljtoepsmuskalylcopvuldhsswjrfvzsefuighpmfw"],
  ["evsjgkqlbxjblufriusprydhkirxjrblxevrh", "isnascrupjipiqglrolezfkjfppgege"],
  ["dofzifihwnqyqjyrvcsxdvyazvscplcknrbstenlszvdvkihnfjqqe", "gptkjlyixzujthvsmnskljidvmzomoatbjzlghaxglibsnnyner"],
  ["hnb", "pvrgtjhgs"],
  ["pfskcmgmyqxdnttiqmezczuk", "kfxpjxaqwrtskmmqjsmdr"],
  ["probn", "x"],
  ["ubihqtrzvrasolkcwbyfdoubrlx", "vplswmgtcmndciffcerlzm"],
  ["rjjklvjyxvbykwa", "rqtedf"],
  ["gkxfsirpzyebxltdgsxhvdhzm", "ohyistwhndbahhlihpiyltxeinyeajddaadlujjudhw"],
  ["lafjy", "eqfmtxrqkpjmdzwycfjrbceguoqzajtoreifsukghydbcglgyjpoxrjtxxo"],
  ["q", "e"],
  ["saflznhwpprz", "fsxswrluxouxprozrtvdgrpgstvurhtwyvqhvgbeekqnsfnhipwswdl"],
  ["fnfc", "domevtzpqpnav"],
  ["exdgnoc", "znqclxd"],
  ["ubxrtbtmmnnhpjmhdfvhoopalsauoajsjjdsmijzswoszeymiejys", "sbifqzfjsegwbixtuskylielsfrurjhcvkexouwzogq"],
  ["igjdgiyi", "kbbjzysvpsnvxtfpob"],
  ["m", "o"],
  ["dtlt", "dzhbctwzo"],
  ["qpkhmrrqmhypjakwerticsrvmduezqjhidylsepexg", "egopnhbdjjgdmpqlofnvuhlclbfglx"],
  ["ckwigvtgqqqhcoborroxekqkguyaxfmtmoobflog", "u"],
  ["vmmzycefoxeghixfagnzqb", "el"],
  ["guahaiw", "seqbwdsyrsqxcrogjpo"],
  ["qaujdzzxmzjtbtapvhogzlvwebrtapcssvxxeualuzvpxymuvndpvawv", "mwnvlqqmjxmzrhpdsrctra"],
  ["vcmblzsnlwmpqplcllnccpdbxsrvubgn", "rcmiahvwvbgshpipifwotligtuqhczkqvsbvlmagfqoevqxhwyrexqrzhs"],
  ["izklciwwwkkfupyffkqjmpxvsxhnmqdtctueh", "jzbpihrvegsdoigwoynhsrgkjnxg"],
  ["pdrjnolwkuzekfpwjjxsehjulbwudnymesgvkqz", "lrgdjjgimolbppoeyeykotswxgaduqeed"],
  ["tdhtajemfijgihagimbbznaivwxezpooygwbxajbojkwcvnftwuf", "jywkdqjwaqgiidbqjcqbztxbstlxfueyfzbmrmuhixoaf"],
  ["ymim", "cipxgpthguepndndgheajfgqzgvhrtqbtubnkz"],
  ["bwssjmsmqaoozitybkgypo", "ivvadgjjpxrjzorvxxrtamfoakdpybfalchhtvbbqdxxxcabzhkved"],
  ["ydjtyquvxain", "nbdckwmlicanhmzqxztecxytideawx"],
  ["qprcjpkxvwhrpqdgzpmiroihqitdpngysr", "nxpvva"],
  ["bakrjuibujfgabdloyjcqj", "oz"],
  ["qnjstlacyytb", "rhxvdlfaetopofkraidqnkmanbmxpbiuvwrssbxhmrdkbrobsymwidndwkgofuu"],
  ["fasefkgjqrzhmow", "rrolmfzkocotcndpydjhhbwllylssuoyerdyi"],
  ["exnbhvdksgst", "jsbujwaqensrljvber"],
  ["psrihfcpdvvannjajetnjrbgpcchovyuzumqwpxuncgeddnvzndrjmnfyyfycxxihlwsytns", "fbqwdgygfasplxqelkqzhfgpaxytzfxkebijtsiewbvqbfs"],
  ["iimlpbx", "nua"],
  ["zpapytneyvapdjzmpvmm", "foscvppkgvygvwztm"],
  ["xbshrbzvmyfwwknmsugijnolrxzwbuqeqshybkpgfsmgpybfct", "mrfjimszutogdsrapzuspzmsokkrgjiunjcjyflsbxmzucdtgfmdwzgrkaf"],
  ["xqfgctddwozdwryczfouoqmeupol", "l"],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(shortestCommonSupersequence(...test));
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
"abac"
"cab"
"abcdefg"
"abdffgh"
"aabacc"
"babcac"
"hmxphhum"
"hlzpluph"
"ghmxghugxl"
"ppggxhhull"
"gmmgzggluguh"
"hpgppmglluuu"
"cbbc"
"cabaabbc"
"emzwqgukbrneodmtoljlbxluwqomxbitwxrzqbli"
"focfwqhzsfcjktaprsbkhhrrsfepkzfhiiszylkmzrkxvvshmjsneieoaxbyuwknacdkoqcwzwjuxxbp"
"qhfhitbryjqtakprthzu"
"munujjfaczrvbpjycslulgnqrkhlpiomtioclnybgatjjxvezrfcquetwhrohpury"
"nqykwlhtdsgszjbjcusvdeligcprtwjgqnnjq"
"usbowlt"
"ucbqwaaldmtkwtghlfktvkpl"
"csucjytjymgovczysrccbumcvcdw"
"cmaltvszllyoogfkdoidsnagrvpvcmodaienbeji"
"ajxpytnkgdiyqukmodulwpewgkzhzukiwvn"
"kgxhyasaenwfmcrrfao"
"ofzwdig"
"vmveqrrrvefvixknkaofgruntahwpzogyemddvdsptvasws"
"htuqbnghmemphkwbhsihgcxwjqwmdyjllqdhirwwizjcgjilxrpvhuwcrb"
"a"
"fpmtfqrljykjvtfqjjtatkvfypcbigeggtspeeaoqumvb"
"oy"
"t"
"wnbe"
"kx"
"mhyvzvagixrvaelvimzajcneetpjkvzqfxcuih"
"qtucbxnbppedpljtoepsmuskalylcopvuldhsswjrfvzsefuighpmfw"
"evsjgkqlbxjblufriusprydhkirxjrblxevrh"
"isnascrupjipiqglrolezfkjfppgege"
"dofzifihwnqyqjyrvcsxdvyazvscplcknrbstenlszvdvkihnfjqqe"
"gptkjlyixzujthvsmnskljidvmzomoatbjzlghaxglibsnnyner"
"hnb"
"pvrgtjhgs"
"pfskcmgmyqxdnttiqmezczuk"
"kfxpjxaqwrtskmmqjsmdr"
"probn"
"x"
"ubihqtrzvrasolkcwbyfdoubrlx"
"vplswmgtcmndciffcerlzm"
"rjjklvjyxvbykwa"
"rqtedf"
"gkxfsirpzyebxltdgsxhvdhzm"
"ohyistwhndbahhlihpiyltxeinyeajddaadlujjudhw"
"lafjy"
"eqfmtxrqkpjmdzwycfjrbceguoqzajtoreifsukghydbcglgyjpoxrjtxxo"
"q"
"e"
"saflznhwpprz"
"fsxswrluxouxprozrtvdgrpgstvurhtwyvqhvgbeekqnsfnhipwswdl"
"fnfc"
"domevtzpqpnav"
"exdgnoc"
"znqclxd"
"ubxrtbtmmnnhpjmhdfvhoopalsauoajsjjdsmijzswoszeymiejys"
"sbifqzfjsegwbixtuskylielsfrurjhcvkexouwzogq"
"igjdgiyi"
"kbbjzysvpsnvxtfpob"
"m"
"o"
"dtlt"
"dzhbctwzo"
"qpkhmrrqmhypjakwerticsrvmduezqjhidylsepexg"
"egopnhbdjjgdmpqlofnvuhlclbfglx"
"ckwigvtgqqqhcoborroxekqkguyaxfmtmoobflog"
"u"
"vmmzycefoxeghixfagnzqb"
"el"
"guahaiw"
"seqbwdsyrsqxcrogjpo"
"qaujdzzxmzjtbtapvhogzlvwebrtapcssvxxeualuzvpxymuvndpvawv"
"mwnvlqqmjxmzrhpdsrctra"
"vcmblzsnlwmpqplcllnccpdbxsrvubgn"
"rcmiahvwvbgshpipifwotligtuqhczkqvsbvlmagfqoevqxhwyrexqrzhs"
"izklciwwwkkfupyffkqjmpxvsxhnmqdtctueh"
"jzbpihrvegsdoigwoynhsrgkjnxg"
"pdrjnolwkuzekfpwjjxsehjulbwudnymesgvkqz"
"lrgdjjgimolbppoeyeykotswxgaduqeed"
"tdhtajemfijgihagimbbznaivwxezpooygwbxajbojkwcvnftwuf"
"jywkdqjwaqgiidbqjcqbztxbstlxfueyfzbmrmuhixoaf"
"ymim"
"cipxgpthguepndndgheajfgqzgvhrtqbtubnkz"
"bwssjmsmqaoozitybkgypo"
"ivvadgjjpxrjzorvxxrtamfoakdpybfalchhtvbbqdxxxcabzhkved"
"ydjtyquvxain"
"nbdckwmlicanhmzqxztecxytideawx"
"qprcjpkxvwhrpqdgzpmiroihqitdpngysr"
"nxpvva"
"bakrjuibujfgabdloyjcqj"
"oz"
"qnjstlacyytb"
"rhxvdlfaetopofkraidqnkmanbmxpbiuvwrssbxhmrdkbrobsymwidndwkgofuu"
"fasefkgjqrzhmow"
"rrolmfzkocotcndpydjhhbwllylssuoyerdyi"
"exnbhvdksgst"
"jsbujwaqensrljvber"
"psrihfcpdvvannjajetnjrbgpcchovyuzumqwpxuncgeddnvzndrjmnfyyfycxxihlwsytns"
"fbqwdgygfasplxqelkqzhfgpaxytzfxkebijtsiewbvqbfs"
"iimlpbx"
"nua"
"zpapytneyvapdjzmpvmm"
"foscvppkgvygvwztm"
"xbshrbzvmyfwwknmsugijnolrxzwbuqeqshybkpgfsmgpybfct"
"mrfjimszutogdsrapzuspzmsokkrgjiunjcjyflsbxmzucdtgfmdwzgrkaf"
"xqfgctddwozdwryczfouoqmeupol"
"l"
*/