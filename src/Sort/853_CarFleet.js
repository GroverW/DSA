/*
N cars are going to the same destination along a one lane road.  The destination is target miles away.

Each car i has a constant speed speed[i] (in miles per hour), and initial position position[i] miles towards the target along the road.

A car can never pass another car ahead of it, but it can catch up to it, and drive bumper to bumper at the same speed.

The distance between these two cars is ignored - they are assumed to have the same position.

A car fleet is some non-empty set of cars driving at the same position and same speed.  Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.


How many car fleets will arrive at the destination?



Example 1:

Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 and 8 become a fleet, meeting each other at 12.
The car starting at 0 doesn't catch up to any other car, so it is a fleet by itself.
The cars starting at 5 and 3 become a fleet, meeting each other at 6.
Note that no other cars meet these fleets before the destination, so the answer is 3.

Note:

0 <= N <= 10 ^ 4
0 < target <= 10 ^ 6
0 < speed[i] <= 10 ^ 6
0 <= position[i] < target
All initial positions are different.
*/

var carFleet = function (target, position, speed) {
  const cars = position.map((pos, i) => [pos, speed[i]]).sort((a, b) => b[0] - a[0]);

  let fleetTime = (target - cars[0][0]) / cars[0][1];
  let fleets = 1;

  for (let [position, speed] of cars) {
    const time = (target - position) / speed;
    if (time > fleetTime) {
      fleetTime = time;
      fleets += 1;
    }
  }

  return fleets;
};

const tests = [
  [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]],
  [21,
    [14, 5, 16, 15, 10, 3, 18, 7, 13, 1, 8, 19, 11, 20, 9, 6, 17],
    [1, 15, 6, 12, 5, 2, 17, 11, 10, 18, 12, 13, 8, 9, 4, 3, 13],
  ],
  [
    24,
    [1, 12, 21, 20, 8, 23, 16, 10, 14],
    [14, 19, 23, 18, 9, 21, 9, 15, 8],
  ],
  [
    12,
    [10, 9, 4, 11, 5, 1],
    [5, 11, 9, 10, 7, 10],
  ],
  [
    32,
    [21, 24, 28, 19],
    [6, 22, 2, 26],
  ],
  [
    9,
    [5, 3, 1],
    [8, 8, 5],
  ],
  [
    42,
    [6, 9, 21, 18, 35, 37, 10, 41, 20, 2, 32, 31, 5, 36, 13, 11, 38, 4],
    [20, 30, 6, 11, 39, 41, 25, 4, 41, 39, 32, 22, 2, 19, 20, 27, 21, 3],
  ],
  [
    8,
    [3, 0, 2, 4],
    [4, 5, 6, 1],
  ],
  [
    9,
    [3, 4],
    [2, 4],
  ],
  [
    6,
    [5, 2, 4, 0, 3],
    [3, 5, 1, 4, 4],
  ],
  [
    2,
    [0],
    [1],]
];

for (let test of tests) {
  logOutList(carFleet(...test));
}