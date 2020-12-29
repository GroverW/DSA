/*
Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
Example 2:

Input: s = "a"
Output: 0
Example 3:

Input: s = "ab"
Output: 1
 

Constraints:

1 <= s.length <= 2000
s consists of lower-case English letters only.
*/


// manacher's
var minCut = function (s) {
  const minCuts = new Array(s.length).fill(Number.MAX_SAFE_INTEGER);
  minCuts[0] = 0;
  const evenLengths = getPalindromeLengths(s, 0);
  const oddLengths = getPalindromeLengths(s, 1);

  for (let i = 1; i < s.length; i += 1) {
    for (let k = 0; k <= oddLengths[i]; k += 1) {
      minCuts[i + k] = Math.min(
        minCuts[i + k],
        (minCuts[i - k - 1] + 1) || 0,
      );
    }
    for (let j = 0; j <= evenLengths[i]; j += 1) {
      minCuts[i + j - 1] = Math.min(
        minCuts[i + j - 1],
        (minCuts[i - j - 1] + 1) || 0,
      );
    }
    
  }

  return Math.max(0, minCuts[minCuts.length - 1]);
};

const getPalindromeLengths = (s, b = 1) => {
  const len = new Array(s.length).fill(0);
  let mid = 0;
  let right = 0;

  for (let i = 0; i < s.length; i += 1) {
    const mirror = 2 * mid - i;

    if (i < right) {
      len[i] = Math.min(len[mirror], right - i);
    }

    while (s[i + len[i] + b] && s[i + len[i] + b] === s[i - len[i] - 1]) {
      len[i] += 1;

      if (i + len[i] > right) {
        right = i + len[i];
        mid = i;
      }
    }
  }

  return len;
}


// expanding (same runtime)
var minCut = function (s) {
  const minCuts = new Array(s.length).fill(Number.MAX_SAFE_INTEGER);
  minCuts[0] = 0;

  for (let i = 1; i < s.length; i += 1) {
    let j = 0;
    while (s[i + j] && s[i + j] === s[i - j]) {
      minCuts[i + j] = Math.min(
        minCuts[i + j],
        (minCuts[i - j - 1] + 1) || 0,
      )
      j += 1;
    }
    let k = 1;
    while (s[i + k - 1] && s[i + k - 1] === s[i - k]) {
      minCuts[i + k - 1] = Math.min(
        minCuts[i + k - 1],
        (minCuts[i - k - 1] + 1) || 0,
      )
      k += 1;
    }
  }

  return minCuts[minCuts.length - 1];
};

/*

*/


// const maxLen = 100;
// const letters = 'abcdefghijklmnopqrstuvwxyz';
// for (let i = 0; i < 50; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 1;

//   let s = '';
//   let currPalindrome = 0;
//   for (let j = 0; j < len; j += 1) {
//     if (!currPalindrome || Math.random() < .5 || (j - currPalindrome < 0)) {
//       const idx = Math.floor(Math.random() * 26);
//       s += letters[idx];
//       currPalindrome = 1;
//     } else {
//       s += s[j - currPalindrome];
//       currPalindrome += 1;
//     }
//   }


//   logOutList('"' + s + '",')
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  "miiiiiivaaavvvvrv",
  "aab",
  "a",
  "ab",
  'babad',
  'cbbd',
  'acbbca',
  'lmabcdedcbafd',
  'ababbabbaba',
  "oc",
  "rrvkrlvdddddddleeeepphnwwwkkkkyybrrldvvlpppzlllvvvsrrrrrbkpppnkkooochhhznppctx",
  "rgmmjkkkkkctthhhvjjjgggnnnqrrrrwwnndddeuuuuucllaaahhtiiimmmmaggbssddqaaakkmmmaaaaxx",
  "xxxdrnnnnhttttttzzzzzzdbvvvviiaxxwm",
  "xwwwwwwwpnbbbbbbbnnnndddttwoffbgggakkkyyzbjjkkeddhtttzbedvvrkkwullllakkuuddyaatzhvggynyssbfooozqggp",
  "aaameesrrvwguuuvowwbbffojxxxzzgdduuaaaaaaaaaqqdddwc",
  "qrssprcccclllpnnnnnygffbbbggggupppppftuvjjrrraafaqzlasaqqxxxxxdllllwgnnnnntoohvxwh",
  "ttihppnnxxrxxwwzzzzzzzzzuqqnnnsomzhzgghduggqqdl",
  "aajjjjtkkkkwvvvvvyyanuuhhhhaaaatttfyyyyyyythhttttbvkhhhhhafjddrrsrlqqqorrnnnk",
  "ttttblvvveeeppppj",
  "mmmmhhwwteejaaaaaaaqqvdddiiipjccyywwspffwwnxxiixxxeezzlrrruuu",
  "azhhsbbffpyyypgssskrjhkkkksstttxxxppppcilhhhhauwcokkkkkkkpuhiaaaaavvooooowww",
  "cclaaowwkhddqvooillllllccccclllljj",
  "wwxxppeykkkkkhhhhhhhhffkcccwwvvrrrooo",
  "ffffsdmmrllllqqqoooobiipwbaaaxggyyyyddzzzzzzzpnnxapsqqqqq",
  "zzzzzzaaattthvaaaddcccchhhxcmmmmeeeeehhiiivrysshbooeonggggggpppppppzzzzzziivwwwwwwddd",
  "qbbbaffffekkmmmmmmzzhkvvvammqtttxxeaannnnfzzzzpzzzbbrrrrdccpffffkkgggkvvlliwwttaaaeeekkkknnnnnnd",
  "tbbffddmmmnnniddvvrrrxovvilllljcccckccttxxxuww",
  "eccwwppinjhhpsffrbduunmulzzk",
  "jjjgglffvllllllnwwaaaclllllnnnllmmygggcgggguupcccyyyyoogxxxgggdddppppxqqdddxxttttdsoooh",
  "vszzzuttttttqqxvviziibbrmmmmffffaaaaxrrugooxxeeeevvg",
  "hjoonfccmmhhaooobkkkbbbbbiejjvvejjkkuhhyhhhiiinnnnaammwvvfm",
  "seeqqmzz",
  "mmtlnfwiinlxioooiikoozzzzzzziicdccqpgyyyyxxrrpzbbbbbbbbbuqfqeeeesgrczzzzkkcccwcdddemmojpe",
  "mffdsvuuquuuuupagsvvhhbbbblllddddcsscemoooot",
  "ullrxsdddvyccttzzoogmmdzzkkkoohyyvgeicssxxxxxxeeggpvoooxxx",
  "yyyqxxxiiiiicktnqqd",
  "cxxdddvvhhhhhhbb",
  "miiiiiivaaavvvvrvssssssiimmmssorzeoohffffffcccccxxxnoooooyylhynabbuee",
  "wwq",
  "cccfffeeeeeqqqqwyywwffffffbbvfiqqqvvvllkkmmnn",
  "gxxxxqqy",
  "vvoggqqqootdoiassmtuuwwlkqqxsooooelllllommmm",
  "rrjrccccceewaazkpoopppsovvvqssmdddp",
  "vvfpptaafffttyaandojgggggqipvviwssffeeeeaakkzzzabbppppuug",
  "sdazzzwwwovvvojjjwtzvsyyzzdtfffmmmggegzzzzzzppppp",
  "qqovvvxqsssvcpppfhhhqgggggoppwwwwlqqqlllwhhnyqqqflhwwfsskk",
  "gganncccggt",
  "ffffkuukkkkdssooxzzzrrrraaad",
  "hhhhhyjjjjxxxxxhkkokrrxxvsscctviibyyyttttwjniiussssssseeeeeezzo",
  "jbyyylllsseeuuotttssssvvllbxjnufssvxxkhhhhhhievvllssdmsyyrrrrjyygzzzzhhnwxhjjjjjxavtuuuxj",
  "xxwwmxeeeeppbbaaoohhbdddpsaaaaasssssssssswwwaarnnnlnnnnnnzzztttttooxeahhthqqqjxxxggggqkmm",
  "wwaaaaaaapppzzzjjuoooqqqqkedfqqeenzaaaaiimtdddoooouewwwwmjjskkggiezzhr",
  "iozzzzzzznnvvaauxtkkkkkkkffjjjquffqqvvvzpooooddddddnnkgccctjjbzzdpllvvvppppp",
  "lpppmwffyykkkkkprrhaehssaqqqqlliiithh",
  "kzprjccccc",
  "qoooowqqqqqqqcievbvbbfffyaaaaqqdppbzjdepppjjjrdddkkkyypppppbhvhhpkkrsssieeiirwffahyqmmmmmgsxxddd",
  "dpjxiffqqyykmxth",
  "zzoooufffbbppppyeeghhkkkkccccccccxxpsjjjhhwnnnnnbuuu",
  "eeihooddxxsbbwvjjjgiinnjjaahooasddkkxhhwhhhhhyyyybbzzzddddmooohddgggvvvvvvccie",
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(minCut(test));
  console.timeEnd(i);
  i += 1;
}

/*
"aab"
"a"
"ab"
"babad"
"cbbd"
"acbbca"
"lmabcdedcbafd"
"ababbabbaba"
"oc"
"rrvkrlvdddddddleeeepphnwwwkkkkyybrrldvvlpppzlllvvvsrrrrrbkpppnkkooochhhznppctx"
"rgmmjkkkkkctthhhvjjjgggnnnqrrrrwwnndddeuuuuucllaaahhtiiimmmmaggbssddqaaakkmmmaaaaxx"
"xxxdrnnnnhttttttzzzzzzdbvvvviiaxxwm"
"xwwwwwwwpnbbbbbbbnnnndddttwoffbgggakkkyyzbjjkkeddhtttzbedvvrkkwullllakkuuddyaatzhvggynyssbfooozqggp"
"aaameesrrvwguuuvowwbbffojxxxzzgdduuaaaaaaaaaqqdddwc"
"qrssprcccclllpnnnnnygffbbbggggupppppftuvjjrrraafaqzlasaqqxxxxxdllllwgnnnnntoohvxwh"
"ttihppnnxxrxxwwzzzzzzzzzuqqnnnsomzhzgghduggqqdl"
"aajjjjtkkkkwvvvvvyyanuuhhhhaaaatttfyyyyyyythhttttbvkhhhhhafjddrrsrlqqqorrnnnk"
"ttttblvvveeeppppj"
"mmmmhhwwteejaaaaaaaqqvdddiiipjccyywwspffwwnxxiixxxeezzlrrruuu"
"azhhsbbffpyyypgssskrjhkkkksstttxxxppppcilhhhhauwcokkkkkkkpuhiaaaaavvooooowww"
"cclaaowwkhddqvooillllllccccclllljj"
"wwxxppeykkkkkhhhhhhhhffkcccwwvvrrrooo"
"ffffsdmmrllllqqqoooobiipwbaaaxggyyyyddzzzzzzzpnnxapsqqqqq"
"zzzzzzaaattthvaaaddcccchhhxcmmmmeeeeehhiiivrysshbooeonggggggpppppppzzzzzziivwwwwwwddd"
"qbbbaffffekkmmmmmmzzhkvvvammqtttxxeaannnnfzzzzpzzzbbrrrrdccpffffkkgggkvvlliwwttaaaeeekkkknnnnnnd"
"tbbffddmmmnnniddvvrrrxovvilllljcccckccttxxxuww"
"eccwwppinjhhpsffrbduunmulzzk"
"jjjgglffvllllllnwwaaaclllllnnnllmmygggcgggguupcccyyyyoogxxxgggdddppppxqqdddxxttttdsoooh"
"vszzzuttttttqqxvviziibbrmmmmffffaaaaxrrugooxxeeeevvg"
"hjoonfccmmhhaooobkkkbbbbbiejjvvejjkkuhhyhhhiiinnnnaammwvvfm"
"seeqqmzz"
"mmtlnfwiinlxioooiikoozzzzzzziicdccqpgyyyyxxrrpzbbbbbbbbbuqfqeeeesgrczzzzkkcccwcdddemmojpe"
"mffdsvuuquuuuupagsvvhhbbbblllddddcsscemoooot"
"ullrxsdddvyccttzzoogmmdzzkkkoohyyvgeicssxxxxxxeeggpvoooxxx"
"yyyqxxxiiiiicktnqqd"
"cxxdddvvhhhhhhbb"
"miiiiiivaaavvvvrvssssssiimmmssorzeoohffffffcccccxxxnoooooyylhynabbuee"
"wwq"
"cccfffeeeeeqqqqwyywwffffffbbvfiqqqvvvllkkmmnn"
"gxxxxqqy"
"vvoggqqqootdoiassmtuuwwlkqqxsooooelllllommmm"
"rrjrccccceewaazkpoopppsovvvqssmdddp"
"vvfpptaafffttyaandojgggggqipvviwssffeeeeaakkzzzabbppppuug"
"sdazzzwwwovvvojjjwtzvsyyzzdtfffmmmggegzzzzzzppppp"
"qqovvvxqsssvcpppfhhhqgggggoppwwwwlqqqlllwhhnyqqqflhwwfsskk"
"gganncccggt"
"ffffkuukkkkdssooxzzzrrrraaad"
"hhhhhyjjjjxxxxxhkkokrrxxvsscctviibyyyttttwjniiussssssseeeeeezzo"
"jbyyylllsseeuuotttssssvvllbxjnufssvxxkhhhhhhievvllssdmsyyrrrrjyygzzzzhhnwxhjjjjjxavtuuuxj"
"xxwwmxeeeeppbbaaoohhbdddpsaaaaasssssssssswwwaarnnnlnnnnnnzzztttttooxeahhthqqqjxxxggggqkmm"
"wwaaaaaaapppzzzjjuoooqqqqkedfqqeenzaaaaiimtdddoooouewwwwmjjskkggiezzhr"
"iozzzzzzznnvvaauxtkkkkkkkffjjjquffqqvvvzpooooddddddnnkgccctjjbzzdpllvvvppppp"
"lpppmwffyykkkkkprrhaehssaqqqqlliiithh"
"kzprjccccc"
"qoooowqqqqqqqcievbvbbfffyaaaaqqdppbzjdepppjjjrdddkkkyypppppbhvhhpkkrsssieeiirwffahyqmmmmmgsxxddd"
"dpjxiffqqyykmxth"
"zzoooufffbbppppyeeghhkkkkccccccccxxpsjjjhhwnnnnnbuuu"
"eeihooddxxsbbwvjjjgiinnjjaahooasddkkxhhwhhhhhyyyybbzzzddddmooohddgggvvvvvvccie"
*/