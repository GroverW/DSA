/*
Given a string s. Return all the words vertically in the same order in which they appear in s.
Words are returned as a list of strings, complete with spaces when is necessary. (Trailing spaces are not allowed).
Each word would be put on only one column and that in one column there will be only one word.

 

Example 1:

Input: s = "HOW ARE YOU"
Output: ["HAY","ORO","WEU"]
Explanation: Each word is printed vertically. 
 "HAY"
 "ORO"
 "WEU"
Example 2:

Input: s = "TO BE OR NOT TO BE"
Output: ["TBONTB","OEROOE","   T"]
Explanation: Trailing spaces is not allowed. 
"TBONTB"
"OEROOE"
"   T"
Example 3:

Input: s = "CONTEST IS COMING"
Output: ["CIC","OSO","N M","T I","E N","S G","T"]
 

Constraints:

1 <= s.length <= 200
s contains only upper case English letters.
It's guaranteed that there is only one space between 2 words.
*/




var printVertically = function (s) {
  const words = s.split(' ');
  let remaining = true;
  const vertical = [];

  let current = 0;
  while (remaining) {
    remaining = false;
    let currentVertical = '';
    for (let word of words) {
      if (current >= word.length) {
        currentVertical += ' ';
      } else {
        currentVertical += word[current];

        if (current < word.length - 1) {
          remaining = true;
        }
      }
    }

    vertical.push(currentVertical.trimEnd());
    current += 1;
  }

  return vertical;
};




const maxLen: number = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  // const k = numberBetween(1, maxLen);
  // const jobs = new Array(len).fill(0).map(() => numberBetween(1, 50));

  let words = randomLetter({ upperCase: true });
  for (let i = 1; i < len; i += 1) {
    if (words[i - 1] !== ' ' && Math.random() < .25) {
      words += ' ';
    } else {
      words += randomLetter({ upperCase: true });
    }
  }

  logOutList('"' + words.trimEnd() + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow([s, t]) + ',');
  // logOutList(printRow([jobs, k]) + ',');
  // logOutLeetcode([len, edges, threshold])
}

const tests = [
  "HOW ARE YOU",
  "TO BE OR NOT TO BE",
  "CONTEST IS COMING",
]