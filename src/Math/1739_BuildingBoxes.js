/*
You have a cubic storeroom where the width, length, and height of the room are all equal to n units. You are asked to place n boxes in this room where each box is a cube of unit side length. There are however some rules to placing the boxes:

You can place the boxes anywhere on the floor.
If box x is placed on top of the box y, then each side of the four vertical sides of the box y must either be adjacent to another box or to a wall.
Given an integer n, return the minimum possible number of boxes touching the floor.

 

Example 1:



Input: n = 3
Output: 3
Explanation: The figure above is for the placement of the three boxes.
These boxes are placed in the corner of the room, where the corner is on the left side.
Example 2:



Input: n = 4
Output: 3
Explanation: The figure above is for the placement of the four boxes.
These boxes are placed in the corner of the room, where the corner is on the left side.
Example 3:



Input: n = 10
Output: 6
Explanation: The figure above is for the placement of the ten boxes.
These boxes are placed in the corner of the room, where the corner is on the back side.
 

Constraints:

1 <= n <= 109

POST: https://leetcode.com/problems/building-boxes/discuss/1098665/javascript-minimal-math-explanation-80ms
*/

var minimumBoxes = function (n) {
  let totalBoxes = 1;
  let countTouchingFloor = 1;
  let next = 2;

  while (totalBoxes + (next * (next + 1) / 2) < n) {
    totalBoxes += (next * (next + 1) / 2);
    countTouchingFloor += next;
    next += 1;
  }

  let increment = 1;

  while (totalBoxes < n) {
    totalBoxes += increment;
    increment += 1;
    countTouchingFloor += 1;
  }

  return countTouchingFloor;
};

/*
[
  [7, 6, 5, 4, 3, 2, 1, -]
  [6, 5, 4, 3, 2, 1, -, -]
  [5, 4, 3, 2, 1, -, -, -]
  [4, 3, 2, 1, -, -, -, -]
  [3, 2, 1, -, -, -, -, -]
  [3, 1, -, -, -, -, -, -]
  [1, -, -, -, -, -, -, -]
  [-, -, -, -, -, -, -, -]
]
*/
// for (let i = 0; i < 25; i += 1) logOutList(numberBetween(1, 1000000000) + ',')

const tests = [
  1,
  2,
  3,
  10,
  100,
  1000,
  10000,
  100000,
  1000000,
  10000000,
  100000000,
  446070521,
  261230172,
  283760723,
  85093156,
  341638451,
  335879337,
  272667322,
  301878496,
  36372186,
  765166227,
  564931078,
  766899776,
  260044466,
  978041707,
  35714829,
  690692934,
  752246914,
  407781374,
  593658954,
  474012796,
  170166466,
  485300086,
  518515209,
  930159699,
  88198363,
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(minimumBoxes(test));
  console.timeEnd(i);
  i += 1;
}

/*
1
2
3
10
100
1000
10000
100000
1000000
10000000
100000000
446070521
261230172
283760723
85093156
341638451
335879337
272667322
301878496
36372186
765166227
564931078
766899776
260044466
978041707
35714829
690692934
752246914
407781374
593658954
474012796
170166466
485300086
518515209
930159699
88198363


*/
