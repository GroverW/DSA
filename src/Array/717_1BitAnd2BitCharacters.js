/*
We have two special characters. The first character can be represented by one bit 0. The second character can be represented by two bits (10 or 11).

Now given a string represented by several bits. Return whether the last character must be a one-bit character or not. The given string will always end with a zero.

Example 1:
Input:
bits = [1, 0, 0]
Output: True
Explanation:
The only way to decode it is two-bit character and one-bit character. So the last character is one-bit character.
Example 2:
Input:
bits = [1, 1, 1, 0]
Output: False
Explanation:
The only way to decode it is two-bit character and two-bit character. So the last character is NOT one-bit character.
*/

var isOneBitCharacter = function(bits) {
  let i = 0;
  let currType;
  while (i < bits.length) {
      currType = bits[i] === 0 ? 1 : 2;
      i += currType === 1 ? 1 : 2;
  }

  return currType === 1;
};

const tests = [
  [1, 0, 0],
  [1, 1, 1, 0],
];

for (let test of tests) {
  logOutList(isOneBitCharacter(test));
}