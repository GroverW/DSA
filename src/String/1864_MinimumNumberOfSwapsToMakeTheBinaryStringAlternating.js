/*
Given a binary string s, return the minimum number of character swaps to make it alternating, or -1 if it is impossible.

The string is called alternating if no two adjacent characters are equal. For example, the strings "010" and "1010" are alternating, while the string "0100" is not.

Any two characters may be swapped, even if they are not adjacent.

 

Example 1:

Input: s = "111000"
Output: 1
Explanation: Swap positions 1 and 4: "111000" -> "101010"
The string is now alternating.
Example 2:

Input: s = "010"
Output: 0
Explanation: The string is already alternating, no swaps are needed.
Example 3:

Input: s = "1110"
Output: -1
 

Constraints:

1 <= s.length <= 1000
s[i] is either '0' or '1'.
*/

var minSwaps = function(s) {
  let countOnes = 0;
  
  let swapsFromZero = 0;
  let swapsFromOne = 0;
  
  for(let i = 0; i < s.length; i += 1) {
    if (i % 2 && s[i] === '1') swapsFromOne += 1;
    if (i % 2 && s[i] === '0') swapsFromZero += 1;
    if (!(i % 2) && s[i] === '1') swapsFromZero += 1;
    if (!(i % 2) && s[i] === '0') swapsFromOne += 1;
    
    if (s[i] === '1') countOnes += 1;
  }
  
  const countZeroes = s.length - countOnes;
  if (Math.abs(countOnes - countZeroes) > 1) return -1;
  
  if (countZeroes > countOnes) return Math.floor(swapsFromZero / 2);
  if (countOnes > countZeroes) return Math.floor(swapsFromOne / 2);

  return Math.floor(Math.min(swapsFromZero, swapsFromOne) / 2);
};

// const maxLen = 100;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(2, maxLen);
  
//   const option1 = Math.random() < .5 ? '1' : '0';
//   const option2 = option1 === '1' ? '0' : '1';
//   const part1 = new Array(Math.floor(len / 2)).fill(option1);
//   const part2 = new Array(Math.ceil(len / 2)).fill(option2)

//   const s = randomize([...part1, ...part2]).join('')

//   logOutList('"' + s + '"')
//   // logOutList(printRow(arr) + ',')
//   // logOutList(printRow(box));
//   // logOutList(printRow([nums1, nums2]) + ',');
//   // logOutLeetcode([nums, k])
// }

const res = []
let i: number = 0;
for (let test of tests) {
  console.time(i);
  // logOutList(mctFromLeafValues(test))

  logOutList(minSwaps(test))
  // res.push(minSwaps(test))
  console.timeEnd(i);
  i += 1;

}