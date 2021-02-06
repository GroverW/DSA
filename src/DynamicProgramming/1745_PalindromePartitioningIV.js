/*
Given a string s, return true if it is possible to split the string s into three non-empty palindromic substrings. Otherwise, return false.​​​​​

A string is said to be palindrome if it the same string when reversed.

 

Example 1:

Input: s = "abcbdd"
Output: true
Explanation: "abcbdd" = "a" + "bcb" + "dd", and all three substrings are palindromes.
Example 2:

Input: s = "bcbddxy"
Output: false
Explanation: s cannot be split into 3 palindromes.
 

Constraints:

3 <= s.length <= 2000
s​​​​​​ consists only of lowercase English letters.
*/

var checkPartitioning = function (s) {
  const onePalindromeEndings = new Array(s.length).fill(false);
  const twoPalindromeEndings = new Array(s.length).fill(false);

  onePalindromeEndings[0] = true;
  const last = s.length - 1;

  for (let i = 1; i < s.length; i += 1) {
    if (onePalindromeEndings[i - 1]) twoPalindromeEndings[i] = true;
    if (i === last && twoPalindromeEndings[i - 1]) return true;
    
    let j = 1;
    while (s[i + j] && s[i + j] === s[i - j]) {
      if (i - j === 0) onePalindromeEndings[i + j] = true;
      else if (onePalindromeEndings[i - j - 1]) twoPalindromeEndings[i + j] = true;
      
      if (i + j === last && twoPalindromeEndings[i - j - 1]) return true;
      j += 1;
    }

    let k = 1;
    while (s[i + k - 1] && s[i + k - 1] === s[i - k]) {
      if (i - k === 0) onePalindromeEndings[i + k - 1] = true;
      else if (onePalindromeEndings[i - k - 1]) twoPalindromeEndings[i + k - 1] = true;
      
      if (i + k - 1 === last && twoPalindromeEndings[i - k - 1]) return true;
      k += 1;
    }
  }

  return false;
};

/*

*/

// const palindromes = ["anutforajaroftuna", "alletsdellacalledstella", "amoreroma", "arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera", "borroworrob", "kingareyougladyouareking", "tacocat", "wasitacaroracatisaw", "edisawharpomarxramoprahwaside", "madaminedenimadam", "murderforajarofredrum", "mom", "oozyratinasanitaryzoo", "yobananaboy", "ufotofu"]
// const letters = 'abcdefghijklmnopqrstuvwxyz'
// const maxLen = 20;
// for (let i = 0; i < 50; i += 1) {
//   let palindrome = '';

//   let count = 0;
//   while(count < 3) {
//     if(Math.random() < .2) {
//       palindrome += letters[Math.floor(Math.random() * letters.length)];
//     } else {
//       palindrome += palindromes[Math.floor(Math.random() * palindromes.length)];
//       count += 1;
//     }
//   }


//   logOutList('"' + palindrome + '",')
//   // logOutList(printRow([commands, actions]) + ',')
//   // logOutList(printRow(grid) + ',');
//   // logOutList(n);
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  "abcbdd",
  "bcbddxy",
  "miiiiiivaaavvvvrv",
  "aab",
  'babad',
  'cbbd',
  'acbbca',
  'lmabcdedcbafd',
  'ababbabbaba',
  "oozyratinasanitaryzooborroworrobamoreroma",
  "anutforajaroftunaaalletsdellacalledstellaalletsdellacalledstella",
  "edisawharpomarxramoprahwasideborroworrobkingareyougladyouareking",
  "murderforajarofredrumalletsdellacalledstellatacocat",
  "arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraalletsdellacalledstellatacocat",
  "edisawharpomarxramoprahwasidekingareyougladyouarekingalletsdellacalledstella",
  "borroworrobyobananaboyvoozyratinasanitaryzoo",
  "madaminedenimadammadaminedenimadamanutforajaroftuna",
  "talletsdellacalledstellamommom",
  "qumomalletsdellacalledstellaugmadaminedenimadam",
  "cnmomdwasitacaroracatisawarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera",
  "amoreromajwasitacaroracatisawanutforajaroftuna",
  "anutforajaroftunaborroworrobkingareyougladyouareking",
  "arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewerastacocatufotofu",
  "oozyratinasanitaryzookingareyougladyouarekingtacocat",
  "borroworroboozyratinasanitaryzoowasitacaroracatisaw",
  "borroworrobyobananaboyxamoreroma",
  "murderforajarofredrummadaminedenimadamanutforajaroftuna",
  "udarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraanutforajaroftunastacocat",
  "ialletsdellacalledstellaarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera",
  "arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweravarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraamoreroma",
  "borroworrobamoreromajtacocat",
  "anutforajaroftunaalletsdellacalledstellazanutforajaroftuna",
  "jamoreromaoozyratinasanitaryzoooozyratinasanitaryzoo",
  "pwasitacaroracatisawamoreromaborroworrob",
  "momanutforajaroftunaufotofu",
  "arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweramadaminedenimadamyedisawharpomarxramoprahwaside",
  "oozyratinasanitaryzooewkingareyougladyouarekingborroworrob",
  "hwasitacaroracatisawbbborroworrobufotofu",
  "madaminedenimadamufotofuufotofu",
  "momoozyratinasanitaryzoowasitacaroracatisaw",
  "wasitacaroracatisawyobananaboymadaminedenimadam",
  "qwasitacaroracatisawmommom",
  "yanutforajaroftunakingareyougladyouarekingufotofu",
  "momyobananaboyborroworrob",
  "ufotofumomedisawharpomarxramoprahwaside",
  "fborroworroblwasitacaroracatisawamoreroma",
  "wasitacaroracatisawmadaminedenimadamarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera",
  "farewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweramomkingareyougladyouareking",
  "alletsdellacalledstellanyedisawharpomarxramoprahwasideufotofu",
  "kingareyougladyouarekingkingareyougladyouarekinganutforajaroftuna",
  "soozyratinasanitaryzoobamoreromatacocat",
  "imomanutforajaroftunamurderforajarofredrum",
  "oozyratinasanitaryzooamoreromawasitacaroracatisaw",
  "amoreromaedisawharpomarxramoprahwasidealletsdellacalledstella",
  "arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraedisawharpomarxramoprahwasidemurderforajarofredrum",
  "tyobananaboygtacocatikingareyougladyouareking",
  "madaminedenimadamamoreromamadaminedenimadam",
  "edisawharpomarxramoprahwasideedisawharpomarxramoprahwasidetacocat",
  "borroworrobmadaminedenimadamdtacocat",
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(checkPartitioning(test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
"abcbdd"
"bcbddxy"
"miiiiiivaaavvvvrv"
"aab"
'babad',
'cbbd',
'acbbca',
'lmabcdedcbafd',
'ababbabbaba',
"oozyratinasanitaryzooborroworrobamoreroma"
"anutforajaroftunaaalletsdellacalledstellaalletsdellacalledstella"
"edisawharpomarxramoprahwasideborroworrobkingareyougladyouareking"
"murderforajarofredrumalletsdellacalledstellatacocat"
"arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraalletsdellacalledstellatacocat"
"edisawharpomarxramoprahwasidekingareyougladyouarekingalletsdellacalledstella"
"borroworrobyobananaboyvoozyratinasanitaryzoo"
"madaminedenimadammadaminedenimadamanutforajaroftuna"
"talletsdellacalledstellamommom"
"qumomalletsdellacalledstellaugmadaminedenimadam"
"cnmomdwasitacaroracatisawarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera"
"amoreromajwasitacaroracatisawanutforajaroftuna"
"anutforajaroftunaborroworrobkingareyougladyouareking"
"arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewerastacocatufotofu"
"oozyratinasanitaryzookingareyougladyouarekingtacocat"
"borroworroboozyratinasanitaryzoowasitacaroracatisaw"
"borroworrobyobananaboyxamoreroma"
"murderforajarofredrummadaminedenimadamanutforajaroftuna"
"udarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraanutforajaroftunastacocat"
"ialletsdellacalledstellaarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera"
"arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweravarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraamoreroma"
"borroworrobamoreromajtacocat"
"anutforajaroftunaalletsdellacalledstellazanutforajaroftuna"
"jamoreromaoozyratinasanitaryzoooozyratinasanitaryzoo"
"pwasitacaroracatisawamoreromaborroworrob"
"momanutforajaroftunaufotofu"
"arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweramadaminedenimadamyedisawharpomarxramoprahwaside"
"oozyratinasanitaryzooewkingareyougladyouarekingborroworrob"
"hwasitacaroracatisawbbborroworrobufotofu"
"madaminedenimadamufotofuufotofu"
"momoozyratinasanitaryzoowasitacaroracatisaw"
"wasitacaroracatisawyobananaboymadaminedenimadam"
"qwasitacaroracatisawmommom"
"yanutforajaroftunakingareyougladyouarekingufotofu"
"momyobananaboyborroworrob"
"ufotofumomedisawharpomarxramoprahwaside"
"fborroworroblwasitacaroracatisawamoreroma"
"wasitacaroracatisawmadaminedenimadamarewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptonewera"
"farewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweramomkingareyougladyouareking"
"alletsdellacalledstellanyedisawharpomarxramoprahwasideufotofu"
"kingareyougladyouarekingkingareyougladyouarekinganutforajaroftuna"
"soozyratinasanitaryzoobamoreromatacocat"
"imomanutforajaroftunamurderforajarofredrum"
"oozyratinasanitaryzooamoreromawasitacaroracatisaw"
"amoreromaedisawharpomarxramoprahwasidealletsdellacalledstella"
"arewenotpurenosirpanamasmoodynoriegabragsitisgarbageironydoomsamanaprisoneruptoneweraedisawharpomarxramoprahwasidemurderforajarofredrum"
"tyobananaboygtacocatikingareyougladyouareking"
"madaminedenimadamamoreromamadaminedenimadam"
"edisawharpomarxramoprahwasideedisawharpomarxramoprahwasidetacocat"
"borroworrobmadaminedenimadamdtacocat"
*/