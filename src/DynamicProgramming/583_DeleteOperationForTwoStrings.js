import { logOut, logOutList } from './logging';
import { printRow } from './Array/helpers';

// swapping 1d arrays
var minDistance = function (word1, word2) {
  let temp = new Array(word2.length + 1).fill(0);
  let numDeletes = new Array(word2.length + 1).fill(0).map((_, i) => i);

  for (let i = 1; i <= word1.length; i += 1) {
    temp[0] = i;
    for (let j = 1; j <= word2.length; j += 1) {
      if (word1[i-1] === word2[j-1]) temp[j] = numDeletes[j - 1];
      else temp[j] = Math.min(temp[j - 1], numDeletes[j]) + 1;
    }
    [temp, numDeletes] = [numDeletes, temp];
  }

  return numDeletes[word2.length];
};

// 2d array
var minDistance = function (word1, word2) {
  const numDeletes = new Array(word1.length + 1).fill(0)
    .map(() => new Array(word2.length + 1).fill(0));

  for (let i = 1; i <= word1.length; i += 1) numDeletes[i][0] = numDeletes[i - 1][0] + 1;
  for (let j = 1; j <= word2.length; j += 1) numDeletes[0][j] = numDeletes[0][j - 1] + 1;

  for (let i = 1; i <= word1.length; i += 1) {
    for (let j = 1; j <= word2.length; j += 1) {
      if (word1[i-1] === word2[j-1]) numDeletes[i][j] = numDeletes[i - 1][j - 1];
      else numDeletes[i][j] = Math.min(numDeletes[i - 1][j], numDeletes[i][j - 1]) + 1;
    }
  }

  return numDeletes[word1.length][word2.length];
};

// for (let i = 0; i < 10; i += 1) {
//   const len1 = Math.floor(Math.random() * 20) + 1;
//   const len2 = Math.floor(Math.random() * 20) + 1;

//   let word1 = '';
//   let word2 = '';

//   const aCode = 'a'.charCodeAt(0);
//   for (let i = 0; i < len1; i += 1) {
//     const letter = Math.floor(Math.random() * 26) + aCode;
//     word1 += String.fromCharCode(letter);
//   }
//   for (let j = 0; j < len1; j += 1) {
//     const letter = Math.floor(Math.random() * 26) + aCode;
//     word2 += String.fromCharCode(letter);
//   }

//   logOutList(printRow([word1, word2]));
// }


const tests = [
  ['seeata', 'eaat'],
  ['sea', 'eat'],
  ['uhvgpvreqsdpvxmc', 'ddprkrmvkxhkovur'],
  ['lvyghpqjwmukagtv', 'ahzizdwtmzxfhajo'],
  ['qvgiityout', 'khnlzhmtzn'],
  ['qdpqsuse', 'azbumntv'],
  ['furnhjpjyaewrlz', 'mbutwvyufucinlc'],
  ['ovdixrsvclckr', 'nhrihrltqzfqt'],
  ['yzunyvxeiqk', 'oqtofslryjr'],
  ['cwhhlxgsfwosuwnmm', 'bhaflqinzfemaybmy'],
  ['xsbgdponeluyaokzd', 'sxnyskuzzvlawosfd'],
  ['wanftwvjptzyt', 'wsvhekidvwebk'],
  ['', ''],
  ['a', ''],
  ['a', 'b'],
  ['a', 'a'],
  ['a', 'aaaaaaaaaa']
];

for (let test of tests) {
  logOutList(minDistance(...test));
}

/*
"seeata"
"eaat"
"sea"
"eat"
"uhvgpvreqsdpvxmc"
"ddprkrmvkxhkovur"
"lvyghpqjwmukagtv"
"ahzizdwtmzxfhajo"
"qvgiityout"
"khnlzhmtzn"
"qdpqsuse"
"azbumntv"
"furnhjpjyaewrlz"
"mbutwvyufucinlc"
"ovdixrsvclckr"
"nhrihrltqzfqt"
"yzunyvxeiqk"
"oqtofslryjr"
"cwhhlxgsfwosuwnmm"
"bhaflqinzfemaybmy"
"xsbgdponeluyaokzd"
"sxnyskuzzvlawosfd"
"wanftwvjptzyt"
"wsvhekidvwebk"


2
4
2
22  24
22  24
16  18
12  14
22  
18  20
18  20
22  24
22  
22

2
4
2
24
24
18
14
22
20
20
24
22
22
*/
