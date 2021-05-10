/*
In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string end, return True if and only if there exists a sequence of moves to transform one string to the other.

 

Example 1:

Input: start = "RXXLRXRXL", end = "XRLXXRRLX"
Output: true
Explanation: We can transform start to end following these steps:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX
Example 2:

Input: start = "X", end = "L"
Output: false
Example 3:

Input: start = "LLR", end = "RRL"
Output: false
Example 4:

Input: start = "XL", end = "LX"
Output: true
Example 5:

Input: start = "XLLR", end = "LXLX"
Output: false
 

Constraints:

1 <= start.length <= 104
start.length == end.length
Both start and end will only consist of characters in 'L', 'R', and 'X'.
*/

var canTransform = function(start, end) {
  const [X, L, R] = ['X', 'L', 'R'];
  
  let sRCount = 0;
  let eRCount = 0;
  let sLCount = 0;
  let eLCount = 0;
  
  const LbeforeR = (sLetter, eLetter) => {
    return (sLetter === L || eLetter === L) && sRCount;
  }

  const RBeforeL = (sLetter, eLetter) => {
    return (sLetter === R || eLetter === R) && eLCount;
  }

  const mixedLetters = (sLetter, eLetter) => {
    return (sLetter === R && eLetter === L) || (sLetter === L && eLetter === R);
  }

  for (let i = 0; i < start.length; i += 1) {
    const [sLetter, eLetter] = [start[i], end[i]];
    if (sLetter === X && eLetter === X) continue;
    if (
      LbeforeR(sLetter, eLetter)
      || RBeforeL(sLetter, eLetter)
      || mixedLetters(sLetter, eLetter)
    ) return false;
    
    if (sLetter === eLetter) continue;
    
    if (sLetter === R) sRCount += 1;
    if (eLetter === R) eRCount += 1;

    if (eLetter === L) eLCount += 1;
    if (sLetter === L) sLCount += 1;
    
    if (eRCount > sRCount || sLCount > eLCount) return false;
    if (sRCount === eRCount) {
      sRCount = 0;
      eRCount = 0;
    }

    if (sLCount === eLCount) {
      sLCount = 0;
      eLCount = 0;
    }
  }

  return sRCount === eRCount && sLCount === eLCount;
};

const tests: Indexable<any>[] = [
  // [[773160767], 252264991],
  // [[2, 8, 4, 10, 6], 20]
  // [[0,0,1,2,3,3,4,7,7,8], 3, 5]
  ["RXXLRXRXL","XRLXXRRLX"],
  ["X","L"],
  ["LLR","RRL"],
  ["XL","LX"],
  ["XLLR","LXLX"],
  ["RXXXRXXXLXL","RXRLLXXXXXX"]
];



let i: number = 0;
for (let test of tests) {
  const [start, end] = test;
  console.time(i.toString());
  logOutList(canTransform(start, end))
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}