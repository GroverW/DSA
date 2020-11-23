/*
You are given an array of distinct positive integers locations where locations[i] represents the position of city i. You are also given integers start, finish and fuel representing the starting city, ending city, and the initial amount of fuel you have, respectively.

At each step, if you are at city i, you can pick any city j such that j != i and 0 <= j < locations.length and move to city j. Moving from city i to city j reduces the amount of fuel you have by |locations[i] - locations[j]|. Please notice that |x| denotes the absolute value of x.

Notice that fuel cannot become negative at any point in time, and that you are allowed to visit any city more than once (including start and finish).

Return the count of all possible routes from start to finish.

Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: locations = [2,3,6,8,4], start = 1, finish = 3, fuel = 5
Output: 4
Explanation: The following are all possible routes, each uses 5 units of fuel:
1 -> 3
1 -> 2 -> 3
1 -> 4 -> 3
1 -> 4 -> 2 -> 3
Example 2:

Input: locations = [4,3,1], start = 1, finish = 0, fuel = 6
Output: 5
Explanation: The following are all possible routes:
1 -> 0, used fuel = 1
1 -> 2 -> 0, used fuel = 5
1 -> 2 -> 1 -> 0, used fuel = 5
1 -> 0 -> 1 -> 0, used fuel = 3
1 -> 0 -> 1 -> 0 -> 1 -> 0, used fuel = 5
Example 3:

Input: locations = [5,2,1], start = 0, finish = 2, fuel = 3
Output: 0
Explanation: It's impossible to get from 0 to 2 using only 3 units of fuel since the shortest route needs 4 units of fuel.
Example 4:

Input: locations = [2,1,5], start = 0, finish = 0, fuel = 3
Output: 2
Explanation: There are two possible routes, 0 and 0 -> 1 -> 0.
Example 5:

Input: locations = [1,2,3], start = 0, finish = 2, fuel = 40
Output: 615088286
Explanation: The total number of possible routes is 2615088300. Taking this number modulo 10^9 + 7 gives us 615088286.
 

Constraints:

2 <= locations.length <= 100
1 <= locations[i] <= 10^9
All integers in locations are distinct.
0 <= start, finish < locations.length
1 <= fuel <= 200
*/

var countRoutes = function (locations, start, finish, fuel) {
  const mod = 10 ** 9 + 7;

  const waysToReach = new Array(locations.length).fill(0)
    .map(() => new Array(fuel + 1).fill(0));

  waysToReach[start][0] = 1;
  let numWays = waysToReach[finish][0];

  for (let i = 1; i <= fuel; i += 1) {
    console.log(i);
    for (let j = 0; j < locations.length; j += 1) {
      for (let k = 0; k < locations.length; k += 1) {
        if (k === j) continue;

        const distanceBetweenLocations = Math.abs(locations[j] - locations[k]);
        if (distanceBetweenLocations > i) continue;

        const remainingFuel = i - distanceBetweenLocations;

        waysToReach[j][i] = (waysToReach[j][i] + waysToReach[k][remainingFuel]) % mod;
      }

      if (j === finish) numWays = (numWays + waysToReach[j][i]) % mod;
    }
  }

  return numWays;
};

// for post
var countRoutes = function (locations, start, finish, fuel) {
  const mod = 10 ** 9 + 7;

  const waysToReach = new Array(locations.length).fill(0)
    .map(() => new Array(fuel + 1).fill(0));

  waysToReach[start][0] = 1;
  let waysToReachFinish = waysToReach[finish][0];

  for (let currFuel = 1; currFuel <= fuel; currFuel += 1) {
    for (let to = 0; to < locations.length; to += 1) {
      for (let from = 0; from < locations.length; from += 1) {
        if (from === to) continue;

        const distBetweenLocations = Math.abs(locations[to] - locations[from]);
        
        if (distBetweenLocations > currFuel) continue;

        const remFuel = currFuel - distBetweenLocations;

        waysToReach[to][currFuel] = (waysToReach[to][currFuel] + waysToReach[from][remFuel]) % mod;
      }  
    }
    
    waysToReachFinish = (waysToReachFinish + waysToReach[finish][currFuel]) % mod;
  }

  return waysToReachFinish;
};

/*
  [[0, 1, 2, 4, 6] 1, 4, 5 
  [0, 1, 0, 0, 0] 0
  [1, 0, 1, 0, 0] 1
  [0, 2, 0, 0, 0] 2
  [3, 1, 3, 2, 0] 3
  [1, 6, 1, 0, 0] 4
  [9, 2, 0, 0, 0] 5
*/

// const possibleLocations = new Array(100).fill(0).map((_, i) => i);
// for (let i = 0; i < 10; i += 1) {
//   const numLocations = Math.floor(Math.random() * 50) + 2;
//   const start = Math.floor(Math.random() * numLocations);
//   const finish = Math.floor(Math.random() * numLocations);
//   const fuel = Math.floor(Math.random() * 200) + 1;

//   const locations = randomize(possibleLocations).slice(0, numLocations);

//   logOutList(printGrid([locations, [start, finish, fuel]]))
// }


const tests = [
  [[2, 3, 4, 6, 8], 1, 3, 5],
  [[4, 3, 1], 1, 0, 6],
  [[5, 2, 1], 0, 2, 3],
  [[2, 1, 5], 0, 0, 3],
  [[1, 2, 3], 0, 2, 40],
  [
    [67, 37, 75, 33, 51, 27, 21, 49, 88, 60, 10, 46, 12, 1, 9, 58, 95, 89, 25, 96, 47, 74, 55, 76, 54, 64, 43, 6, 99, 23, 45, 93, 2, 94, 41, 80, 29, 7, 53, 40, 48, 57, 90, 5, 59],
    42, 43, 106
  ],
  [
    [15, 29, 38],
    1, 1, 169
  ],
  [
    [70, 37, 69, 21, 95, 75, 71, 38, 83, 48, 73, 29, 65, 20, 43, 58, 4, 80, 44, 27, 31, 78, 30, 86, 82, 61, 62, 46, 56, 33, 91, 64, 67, 59, 68, 66, 99],
    13, 8, 98
  ],
  [
    [50, 37, 62, 13, 69, 31, 85, 81, 82, 22, 60, 33, 41, 86],
    3, 7, 126
  ],
  [
    [6, 91, 92, 78, 2, 24, 72, 82, 12, 61, 80, 86, 66, 57, 77, 29, 87, 48, 73, 99, 34, 25, 11, 62, 18, 79, 15, 76, 14, 16, 64, 58],
    16, 12, 189
  ],
  [
    [57, 95, 7, 29, 96, 3, 40, 35, 37, 80, 93, 2, 77, 58, 46, 15, 61, 94, 12, 98, 38, 1, 27, 23, 21, 97, 69, 44, 14, 72, 41, 92, 50, 63, 16, 89, 31, 43, 6, 8, 36, 99],
    8, 17, 31
  ],
  [
    [49, 90, 25, 29, 41, 60, 55, 99, 43, 33, 26, 82, 85, 1, 59, 11, 74, 72, 40, 8, 84, 65, 34, 46, 92, 98, 12, 78, 54, 4, 51, 9, 91, 52, 45],
    10, 25, 123
  ],
  [
    [40, 28, 12, 9, 71, 4, 6, 78, 91, 84, 68, 85, 61, 27, 65, 7, 31, 2],
    3, 11, 74
  ],
  [
    [2, 93, 10, 57, 11, 69, 94, 25, 4, 89, 85, 48, 80, 47, 14, 3, 56, 13, 51, 76, 62, 50, 42, 73, 71, 22, 37, 45, 96, 87, 19, 5],
    29, 6, 69
  ],
  [
    [73, 87, 60, 68, 89, 10, 48, 8, 11, 4, 43, 38, 93, 12, 88, 96, 86, 16, 34, 19, 94],
    18, 3, 17
  ]

];

for (let test of tests) {
  logOutList(countRoutes(...test));
}

/*
[2, 3, 6, 8, 4]
1
3
5
[4, 3, 1]
1
0
6
[5, 2, 1]
0
2
3
[2, 1, 5]
0
0
3
[1, 2, 3]
0
2
40
[67, 37, 75, 33, 51, 27, 21, 49, 88, 60, 10, 46, 12, 1, 9, 58, 95, 89, 25, 96, 47, 74, 55, 76, 54, 64, 43, 6, 99, 23, 45, 93, 2, 94, 41, 80, 29, 7, 53, 40, 48, 57, 90, 5, 59]
42
43
106
[15, 29, 38]
1
1
169
[70, 37, 69, 21, 95, 75, 71, 38, 83, 48, 73, 29, 65, 20, 43, 58, 4, 80, 44, 27, 31, 78, 30, 86, 82, 61, 62, 46, 56, 33, 91, 64, 67, 59, 68, 66, 99]
13
8
98
[50, 37, 62, 13, 69, 31, 85, 81, 82, 22, 60, 33, 41, 86]
3
7
126
[6, 91, 92, 78, 2, 24, 72, 82, 12, 61, 80, 86, 66, 57, 77, 29, 87, 48, 73, 99, 34, 25, 11, 62, 18, 79, 15, 76, 14, 16, 64, 58]
16
12
189
[57, 95, 7, 29, 96, 3, 40, 35, 37, 80, 93, 2, 77, 58, 46, 15, 61, 94, 12, 98, 38, 1, 27, 23, 21, 97, 69, 44, 14, 72, 41, 92, 50, 63, 16, 89, 31, 43, 6, 8, 36, 99]
8
17
31
[49, 90, 25, 29, 41, 60, 55, 99, 43, 33, 26, 82, 85, 1, 59, 11, 74, 72, 40, 8, 84, 65, 34, 46, 92, 98, 12, 78, 54, 4, 51, 9, 91, 52, 45]
10
25
123
[40, 28, 12, 9, 71, 4, 6, 78, 91, 84, 68, 85, 61, 27, 65, 7, 31, 2]
3
11
74
[2, 93, 10, 57, 11, 69, 94, 25, 4, 89, 85, 48, 80, 47, 14, 3, 56, 13, 51, 76, 62, 50, 42, 73, 71, 22, 37, 45, 96, 87, 19, 5]
29
6
69
[73, 87, 60, 68, 89, 10, 48, 8, 11, 4, 43, 38, 93, 12, 88, 96, 86, 16, 34, 19, 94]
18
3
17

*/