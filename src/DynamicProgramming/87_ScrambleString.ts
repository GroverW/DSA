/*
We can scramble a string s to get a string t using the following algorithm:

If the length of the string is 1, stop.
If the length of the string is > 1, do the following:
Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
Apply step 1 recursively on each of the two substrings x and y.
Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.

 

Example 1:

Input: s1 = "great", s2 = "rgeat"
Output: true
Explanation: One possible scenario applied on s1 is:
"great" --> "gr/eat" // divide at random index.
"gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.
"gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at ranom index each of them.
"g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
"r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
"r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
The algorithm stops now and the result string is "rgeat" which is s2.
As there is one possible scenario that led s1 to be scrambled to s2, we return true.
Example 2:

Input: s1 = "abcde", s2 = "caebd"
Output: false
Example 3:

Input: s1 = "a", s2 = "a"
Output: true
 

Constraints:

s1.length == s2.length
1 <= s1.length <= 30
s1 and s2 consist of lower-case English letters.
*/

function isScramble(s1: string, s2: string): boolean {

  const aCode = 'a'.charCodeAt(0);
  const letters = new Array(26).fill(0);
  const canUnscramble = (subS1: string, subS2: string): boolean => {
    if (subS1 === subS2) return true;

    const countsLeft = [...letters];
    let leftZeroes = 0;
    const countsRight = [...letters];
    let rightZeroes = 0;

    for (let curr = 0; curr < subS2.length - 1; curr += 1) {
      const s2Left = subS2.charCodeAt(curr) - aCode;
      const s1Left = subS1.charCodeAt(curr) - aCode;
      const s1Right = subS1.charCodeAt(subS1.length - curr - 1) - aCode;
      
      if (countsLeft[s2Left] < 0) leftZeroes += 1;
      countsLeft[s2Left] += 1;
      if (countsLeft[s1Left] > 0) leftZeroes += 1;
      countsLeft[s1Left] -= 1;
      if (countsRight[s2Left] < 0) rightZeroes += 1;
      countsRight[s2Left] += 1;
      if (countsRight[s1Right] > 0) rightZeroes += 1;
      countsRight[s1Right] -= 1;

      if (leftZeroes === curr + 1) {
        if (
          canUnscramble(subS1.slice(0, curr + 1), subS2.slice(0, curr + 1))
          && canUnscramble(subS1.slice(curr + 1), subS2.slice(curr + 1))
        ) return true;
      }

      if (rightZeroes === curr + 1) {
        if (
          canUnscramble(subS1.slice(subS1.length - curr - 1), subS2.slice(0, curr + 1))
          && canUnscramble(subS1.slice(0, subS1.length - curr - 1), subS2.slice(curr + 1))
        ) return true;
      }
    }

    return false;
  }

  return canUnscramble(s1, s2);
};


/*

*/

// const maxLen: number = 30;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);
//   let s1 = '';
//   for (let i = 0; i < len; i += 1) {
//     s1 += randomLetter({});
//   }
//   let s2 = s1.slice();

//   const scrambleString = (s: string): string => {
//     if (s.length <= 1) return s;
//     const split = numberBetween(0, s.length - 1);
//     const left = s.slice(0, split + 1);
//     const right = s.slice(split + 1);

//     if (Math.random() < .5) {
//       return scrambleString(right) + scrambleString(left);
//     }
//     return scrambleString(left) + scrambleString(right);
//   }

//   s2 = scrambleString(s2);

//   // logOutList('"' + ip + '"')
//   // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   logOutList(printRow([s1, s2]) + ',');
// }

const tests: Indexable<any>[] = [
  ['great', 'rgeat'],
  ['abcde', 'caebd'],
  ["mlafcoczggvrcqhwvkoxf","glmcfaozcokxfvwhrcvgq"],
  ["uuxpwbbslhctohvnefhfhkjffp","sxupwbbufehhfffjkpvnotclhh"],
  ["cyjpwje","jwejpcy"],
  ["xxjdaxjyfmzhkxxqy","yjmzfhyxxkqxxjxad"],
  ["rhzzguuise","iuesgzuzhr"],
  ["qxuhmrvwagqzqoaq","vwahrmgzoqqaqqxu"],
  ["vjlfunsbfccrldlggef","cfnbsrcvlfjudlglgef"],
  ["flc","flc"],
  ["axgnjskolwplceazjidgzrhfakpam","fpkamagdirhzjzaecllosknjxagwp"],
  ["rykin","ykinr"],
  ["wbxdzpvaziaeghgjkpj","jpjkghdxwbegaizavpz"],
  ["mlfstsygnnvdkexp","vkdxepnygntsflsm"],
  ["vipowtrrm","mrrtwpoiv"],
  ["nlxgvhdfe","fvhdgxlne"],
  ["rqvfdtncnie","inenctdrfqv"],
  ["edsunisiqdfrwtxuyugolj","desuinisdqjyulgouxrfwt"],
  ["btsmwvyyfsdhy","sdhfymyyvwbst"],
  ["ngjsnscwsyxpigtgnyyfaidz","piwscsnyxgyngtfyzidasjgn"],
  ["pxwckvthseidngouqwdrgvoaja","diespxkvtwchjaoquowdgrvgna"],
  ["lhojmlic","lhojmilc"],
  ["fhjs","fhjs"],
  ["uezufdhefjbddchdu","duhedffzueuhcdjbd"],
  ["sdivrqpaumqqd","aqpridsvumqqd"],
  ["hgavvjnxthxrcpjauaenmycgs","nymgcsxxhtrcpajaeuvjvnahg"],
  ["hipg","ipgh"],
  ["q","q"],
  ["wzwhndrsobixtzmpcwyy","wdznhwrspwcyymztxibo"],
  ["jpm","mpj"],
  ["mochburwwnbk","brwuwnhcombk"],
  ["ev","ve"],
  ["avkscyrimgihsppnmyec","imrcyskvaginphpsecym"],
  ["hvcifohquuctviqnctocqqc","vhcqcqqnctotvcuuificohq"],
  ["xzuctnequcmulfubbivcpbjvdq","uzcxeuqtnmculiubbfbcpvjvdq"],
  ["ppcxnhcfylka","ppcxnfhclkya"],
  ["svns","svsn"],
  ["iuplpiyke","eykipluip"],
  ["otjnooeoiyhjafzy","zyfaoontjoeoiyjh"],
  ["dsukffvkjlcmhtywwyncsjbqt","cnyjsbqtythwwmvksudffjclk"],
  ["ojybpsdziqsc","dzqsiypsbojc"],
  ["zydjgduyfekgktlztlye","ztlleytkgfyudyjzdgek"],
  ["xwgkbumvvqehiuedz","uedzkbgxwqvmvuihe"],
  ["txwhzmbbmhcsbl","hlcsbhxwtmbmzb"],
  ["lxdssbazmfssghknxqnxavtvtwnxww","sfmzabssdxlwxwnqxwvtaxtvnsghkn"],
  ["oohcsxwfxqnnhtrsbzictwvk","nxqnfwhohcoxstwvkbzicsrt"],
  ["etywkbzsavshffqnnmkrsmlhsw","rksmmhlswsazkbvshqffnytwen"],
  ["zqzxlbhkrelmtjvqxbibufoun","unxzzqtvjmlrkhlbeqxoibufb"],
  ["gnhjyxwumgjdv","dvgmjuwxhjygn"],
  ["jwkq","jqwk"],
  ["z","z"],
  ["vvkeeobo","eeobokvv"],
];



let i: number = 0;
for (let test of tests) {
  const [s1, s2] = test;
  console.time(i.toString());
  // logOutLeetcode(test);
  logOutList(isScramble(s1, s2));
  console.timeEnd(i.toString());
  i += 1;

}

/*
"great"
"rgeat"
"abcde"
"caebd"
"mlafcoczggvrcqhwvkoxf"
"glmcfaozcokxfvwhrcvgq"
"uuxpwbbslhctohvnefhfhkjffp"
"sxupwbbufehhfffjkpvnotclhh"
"cyjpwje"
"jwejpcy"
"xxjdaxjyfmzhkxxqy"
"yjmzfhyxxkqxxjxad"
"rhzzguuise"
"iuesgzuzhr"
"qxuhmrvwagqzqoaq"
"vwahrmgzoqqaqqxu"
"vjlfunsbfccrldlggef"
"cfnbsrcvlfjudlglgef"
"flc"
"flc"
"axgnjskolwplceazjidgzrhfakpam"
"fpkamagdirhzjzaecllosknjxagwp"
"rykin"
"ykinr"
"wbxdzpvaziaeghgjkpj"
"jpjkghdxwbegaizavpz"
"mlfstsygnnvdkexp"
"vkdxepnygntsflsm"
"vipowtrrm"
"mrrtwpoiv"
"nlxgvhdfe"
"fvhdgxlne"
"rqvfdtncnie"
"inenctdrfqv"
"edsunisiqdfrwtxuyugolj"
"desuinisdqjyulgouxrfwt"
"btsmwvyyfsdhy"
"sdhfymyyvwbst"
"ngjsnscwsyxpigtgnyyfaidz"
"piwscsnyxgyngtfyzidasjgn"
"pxwckvthseidngouqwdrgvoaja"
"diespxkvtwchjaoquowdgrvgna"
"lhojmlic"
"lhojmilc"
"fhjs"
"fhjs"
"uezufdhefjbddchdu"
"duhedffzueuhcdjbd"
"sdivrqpaumqqd"
"aqpridsvumqqd"
"hgavvjnxthxrcpjauaenmycgs"
"nymgcsxxhtrcpajaeuvjvnahg"
"hipg"
"ipgh"
"q"
"q"
"wzwhndrsobixtzmpcwyy"
"wdznhwrspwcyymztxibo"
"jpm"
"mpj"
"mochburwwnbk"
"brwuwnhcombk"
"ev"
"ve"
"avkscyrimgihsppnmyec"
"imrcyskvaginphpsecym"
"hvcifohquuctviqnctocqqc"
"vhcqcqqnctotvcuuificohq"
"xzuctnequcmulfubbivcpbjvdq"
"uzcxeuqtnmculiubbfbcpvjvdq"
"ppcxnhcfylka"
"ppcxnfhclkya"
"svns"
"svsn"
"iuplpiyke"
"eykipluip"
"otjnooeoiyhjafzy"
"zyfaoontjoeoiyjh"
"dsukffvkjlcmhtywwyncsjbqt"
"cnyjsbqtythwwmvksudffjclk"
"ojybpsdziqsc"
"dzqsiypsbojc"
"zydjgduyfekgktlztlye"
"ztlleytkgfyudyjzdgek"
"xwgkbumvvqehiuedz"
"uedzkbgxwqvmvuihe"
"txwhzmbbmhcsbl"
"hlcsbhxwtmbmzb"
"lxdssbazmfssghknxqnxavtvtwnxww"
"sfmzabssdxlwxwnqxwvtaxtvnsghkn"
"oohcsxwfxqnnhtrsbzictwvk"
"nxqnfwhohcoxstwvkbzicsrt"
"etywkbzsavshffqnnmkrsmlhsw"
"rksmmhlswsazkbvshqffnytwen"
"zqzxlbhkrelmtjvqxbibufoun"
"unxzzqtvjmlrkhlbeqxoibufb"
"gnhjyxwumgjdv"
"dvgmjuwxhjygn"
"jwkq"
"jqwk"
"z"
"z"
"vvkeeobo"
"eeobokvv"
*/