/*
You want to build n new buildings in a city. The new buildings will be built in a line and are labeled from 1 to n.

However, there are city restrictions on the heights of the new buildings:

The height of each building must be a non-negative integer.
The height of the first building must be 0.
The height difference between any two adjacent buildings cannot exceed 1.
Additionally, there are city restrictions on the maximum height of specific buildings. These restrictions are given as a 2D integer array restrictions where restrictions[i] = [idi, maxHeighti] indicates that building idi must have a height less than or equal to maxHeighti.

It is guaranteed that each building will appear at most once in restrictions, and building 1 will not be in restrictions.

Return the maximum possible height of the tallest building.

 

Example 1:


Input: n = 5, restrictions = [[2,1],[4,1]]
Output: 2
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,1,2], and the tallest building has a height of 2.
Example 2:


Input: n = 6, restrictions = []
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,4,5], and the tallest building has a height of 5.
Example 3:


Input: n = 10, restrictions = [[5,3],[2,5],[7,4],[10,3]]
Output: 5
Explanation: The green area in the image indicates the maximum allowed height for each building.
We can build the buildings with heights [0,1,2,3,3,4,4,5,4,3], and the tallest building has a height of 5.
 

Constraints:

2 <= n <= 109
0 <= restrictions.length <= min(n - 1, 105)
2 <= idi <= n
idi is unique.
0 <= maxHeighti <= 109
*/

var maxBuilding = function (n, restrictions) {
  if (!restrictions.length) {
    return n - 1;
  }

  restrictions.push([1, 0])
  restrictions.sort((a, b) => a[0] - b[0]);
  
  if (restrictions[restrictions.length - 1][0] !== n) {
    restrictions.push([n, 10 ** 9 + 1]);
  }

  for (let i = 1; i < restrictions.length; i += 1) {
    const [position, height] = restrictions[i];
    const [lastPosition, lastHeight] = restrictions[i - 1];
    const distance = position - lastPosition;
    restrictions[i][1] = Math.min(height, lastHeight + distance);
  }

  let best = 0;
  
  for (let i = restrictions.length - 2; i >= 0; i -= 1) {
    const [position, height] = restrictions[i];
    const [lastPosition, lastHeight] = restrictions[i + 1];
    const distance = lastPosition - position;
    restrictions[i][1] = Math.min(height, lastHeight + distance);

    const heightDiff = Math.abs(restrictions[i][1] - lastHeight);

    const tallerBuilding = Math.max(restrictions[i][1], lastHeight);
    const maxHeight = tallerBuilding + Math.max(0, Math.floor((distance - heightDiff) / 2));
    best = Math.max(best, maxHeight);
  }

  return best;
};

/*
  [0,  4, 10, 11,  7,  1]
  [0,  2,  5, 10, 12, 14]
  [0,  2,  5, 10,  7,  1]
   0   2   5   5   3   1


  2 - - - 4
  2 - - - 2

  dist = 5
  diff = 2
  max = 4 + Math.floor((dist - diff) / 2)
  dist = 4
    4 + (4 - 2) / 2 = 5
        5
    4 + (5 - 2) / 2 = 5
    4 + (6 - 2) / 2 = 6

  3 + (4 - 1) / 2 = 4
  3 + (5 - 1) / 2 = 5
  2 + 4 / 2 = 4
*/

const maxLen = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(2, maxLen);
  const restrictions = [];

  let lastBuilding = 1;

  while (lastBuilding < len) {
    const building = numberBetween(lastBuilding + 1, lastBuilding + 20);
    if (building > len) break;
    const maxAllowed = numberBetween(1, 50);
    restrictions.push([building, maxAllowed]);
    lastBuilding = building;
  }



  // logOutList('"' + letters + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([len, restrictions])
}

const tests: Indexable<any>[] = [
  // [18, [[15, 2], [16, 40]]]
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(maxBuilding(test[0], test[1]));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/

