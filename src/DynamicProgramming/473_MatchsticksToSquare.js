/*
Remember the story of Little Match Girl? By now, you know exactly what matchsticks the little match girl has, please find out a way you can make one square by using up all those matchsticks. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

Your input will be several matchsticks the girl has, represented with their stick length. Your output will either be true or false, to represent whether you could make one square using all the matchsticks the little match girl has.

Example 1:
Input: [1,1,2,2,2]
Output: true

Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.
Example 2:
Input: [3,3,3,3,4]
Output: false

Explanation: You cannot find a way to form a square with all the matchsticks.
Note:
The length sum of the given matchsticks is in the range of 0 to 10^9.
The length of the given matchstick array will not exceed 15.
*/

var makesquare = function (nums) {
  const totalLength = nums.reduce((total, val) => total + val, 0);
  nums.sort((a, b) => b - a);

  if (
    nums.length < 4
    || totalLength % 4 !== 0
    || nums[0] > totalLength / 4
  ) return false;

  const edgeLength = totalLength / 4;
  const visited = new Set();

  const canMakeSquare = (currUsed, currLength, numSides) => {
    if (visited.has(currUsed)) return false;
    if (numSides === 3) return true;
    visited.add(currUsed);

    for (let i = 0; i < nums.length; i += 1) {
      if (
        currUsed & (1 << i)
        || currLength + nums[i] > edgeLength
      ) continue;

      const nextUsed = currUsed | (1 << i);
      const nextLength = (currLength + nums[i]) % edgeLength;
      if (canMakeSquare(nextUsed, nextLength, numSides + (nextLength === 0))) return true;
    }

    return false;
  }

  return canMakeSquare(0, 0, 0);
};

/*

*/

// const maxLen = 15;
// let numSuccess = 0;
// while(numSuccess < 50) {
//   const n = Math.floor(Math.random() * maxLen) + 1;

//   const nums = new Array(n).fill(0)
//     .map(() => Math.floor(Math.random() * 20) + 1);

//   if(makesquare(nums) || Math.random() < .01) {
//     logOutList(printRow(nums) + ',');  
//     numSuccess += 1;
//   }

//   // logOutList('"' + palindrome + '",')
//   // logOutList(printRow([commands, actions]) + ',')
//   // logOutList(printRow(nums) + ',');
//   // logOutList(n);
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [1, 1, 2, 2, 2],
  [3, 3, 3, 3, 4],
  [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3],
  [2, 2, 2, 2, 2, 6],
  [],
  [20,19,18,16,15,14,13,8,7,7,7,7,6,6,5],
  [20,20,19,18,18,17,6,5,4,3,2,2,1,1,1],
  [20,17,14,13,13,12,10,9,8,7,6,6,5,4],
  [20,18,18,17,13,11,10,7,3,2,1],
  [19,18,17,14,14,10,7,6,5,5,5,4,4,3],
  [20,19,17,15,14,14,11,9,9,8,7,6,3],
  [18,15,14,13,13,11,10,7,7,4],
  [18,18,16,16,15,11,11,10,8,7,6,2,1,1],
  [16,13,13,13,9,9,3,3,1],
  [19,5],
  [20,19,18,15,15,12,11,8,7,4,3,3,1],
  [14,13,11,7,5,2,2,1,1],
  [20,17,17,14,12,10,9,7,6,5,4,3,3,1],
  [19,18,17,16,15,13,10,7,6,6,5,5,3],
  [18,12,10,8,8,7,6,3],
  [17,16,15,13,11,10,8,6,5,4,3,3,1],
  [19,18,17,17,14,13,12,9,6,3,3,3,2,1],
  [19,16,14,12,10,10,8,7,7,7,5,4,1],
  [18,18,16,14,12,11,11,11,9,9,7,7,6,6,5],
  [18,18,16,15,15,14,11,10,10,10,7,6,2],
  [20,17,17,10,10,10,9,8,8,7,6,6,3,3,2],
  [2],
  [19,18,16,15,15,11,9,9,8,6,5,3,2],
  [20,20,19,17,16,15,14,13,11,11,11,10,3],
  [18,17,15,14,14,11,10,10,9,8,3,2,1],
  [20,19,12,11,9,9,5,4,3],
  [16,15,14,13,13,12,11,6,3,1],
  [20,19,19,14,13,13,11,9,7,5,2],
  [20,20,20,18,16,15,14,13,9,9,8,8,6,6,6],
  [19,14,10,9,9,7,5,5,4,3,3],
  [18,1],
  [19,19,16,10,9,9,8,5,4,3,2],
  [19,18,18,17,16,13,13,11,8,4,3],
  [19,17,17,15,14,11,10,9,9,8,6,6,2,1],
  [20,20,17,15,13,10,9,8,7,6,6,3,2],
  [19,19,17,17,16,12,12,7,4,4,3,3,2,1],
  [19,18,16,16,15,15,14,13,13,12,10,7,6,1,1],
  [19,18,18,16,15,14,13,13,11,11,8,5,5,2],
  [19,18,18,18,15,15,15,13,12,9,8,8,8,5,3],
  [18,17,15,10,7,6,6,4,4,1],
  [20,19,18,15,13,11,9,5,5,1],
  [19,18,18,17,13,10,10,7,7,5,5,3],
  [20,19,13,13,11,9,8,6,5,4,4],
  [20,18,17,16,13,8,6,6,6,6,3,3,1,1],
  [19,17,16,16,15,14,14,10,10,8,8,4,1],
  [20,18,17,15,15,14,14,13,10,8,7,6,4,3],
  [18,16,15,12,12,11,11,10,7,7,5,3,1],
  [19,19,13,10,10,6,6,6,5,5,5,4,3,3,2],
  [18,16,16,14,13,13,13,12,12,10,7,5,5,4,2],
  [20,17,17,16,16,13,12,7,7,4,2,1],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(makesquare(test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
[1, 1, 2, 2, 2]
[3, 3, 3, 3, 4]
[5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3]
[2, 2, 2, 2, 2, 6]
[]
[20,19,18,16,15,14,13,8,7,7,7,7,6,6,5]
[20,20,19,18,18,17,6,5,4,3,2,2,1,1,1]
[20,17,14,13,13,12,10,9,8,7,6,6,5,4]
[20,18,18,17,13,11,10,7,3,2,1]
[19,18,17,14,14,10,7,6,5,5,5,4,4,3]
[20,19,17,15,14,14,11,9,9,8,7,6,3]
[18,15,14,13,13,11,10,7,7,4]
[18,18,16,16,15,11,11,10,8,7,6,2,1,1]
[16,13,13,13,9,9,3,3,1]
[19,5]
[20,19,18,15,15,12,11,8,7,4,3,3,1]
[14,13,11,7,5,2,2,1,1]
[20,17,17,14,12,10,9,7,6,5,4,3,3,1]
[19,18,17,16,15,13,10,7,6,6,5,5,3]
[18,12,10,8,8,7,6,3]
[17,16,15,13,11,10,8,6,5,4,3,3,1]
[19,18,17,17,14,13,12,9,6,3,3,3,2,1]
[19,16,14,12,10,10,8,7,7,7,5,4,1]
[18,18,16,14,12,11,11,11,9,9,7,7,6,6,5]
[18,18,16,15,15,14,11,10,10,10,7,6,2]
[20,17,17,10,10,10,9,8,8,7,6,6,3,3,2]
[2]
[19,18,16,15,15,11,9,9,8,6,5,3,2]
[20,20,19,17,16,15,14,13,11,11,11,10,3]
[18,17,15,14,14,11,10,10,9,8,3,2,1]
[20,19,12,11,9,9,5,4,3]
[16,15,14,13,13,12,11,6,3,1]
[20,19,19,14,13,13,11,9,7,5,2]
[20,20,20,18,16,15,14,13,9,9,8,8,6,6,6]
[19,14,10,9,9,7,5,5,4,3,3]
[18,1]
[19,19,16,10,9,9,8,5,4,3,2]
[19,18,18,17,16,13,13,11,8,4,3]
[19,17,17,15,14,11,10,9,9,8,6,6,2,1]
[20,20,17,15,13,10,9,8,7,6,6,3,2]
[19,19,17,17,16,12,12,7,4,4,3,3,2,1]
[19,18,16,16,15,15,14,13,13,12,10,7,6,1,1]
[19,18,18,16,15,14,13,13,11,11,8,5,5,2]
[19,18,18,18,15,15,15,13,12,9,8,8,8,5,3]
[18,17,15,10,7,6,6,4,4,1]
[20,19,18,15,13,11,9,5,5,1]
[19,18,18,17,13,10,10,7,7,5,5,3]
[20,19,13,13,11,9,8,6,5,4,4]
[20,18,17,16,13,8,6,6,6,6,3,3,1,1]
[19,17,16,16,15,14,14,10,10,8,8,4,1]
[20,18,17,15,15,14,14,13,10,8,7,6,4,3]
[18,16,15,12,12,11,11,10,7,7,5,3,1]
[19,19,13,10,10,6,6,6,5,5,5,4,3,3,2]
[18,16,16,14,13,13,13,12,12,10,7,5,5,4,2]
[20,17,17,16,16,13,12,7,7,4,2,1]
*/