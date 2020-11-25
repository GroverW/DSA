/*
Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.

Every house can be warmed, as long as the house is within the heater's warm radius range. 

Given the positions of houses and heaters on a horizontal line, return the minimum radius standard of heaters so that those heaters could cover all houses.

Notice that all the heaters follow your radius standard, and the warm radius will the same.

 

Example 1:

Input: houses = [1,2,3], heaters = [2]
Output: 1
Explanation: The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.
Example 2:

Input: houses = [1,2,3,4], heaters = [1,4]
Output: 1
Explanation: The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.
Example 3:

Input: houses = [1,5], heaters = [2]
Output: 3
 

Constraints:

1 <= houses.length, heaters.length <= 3 * 104
1 <= houses[i], heaters[i] <= 109
*/

var findRadius = function (houses, heaters) {
  let p1 = 0;
  let p2 = 0;
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  heaters.push(Infinity);

  let maxDistance = 0;

  while (p1 < houses.length) {
    while (
      Math.abs(houses[p1] - heaters[p2]) >=
      Math.abs(houses[p1] - heaters[p2 + 1])
    ) p2 += 1;
    
    const currDistance = Math.abs(houses[p1] - heaters[p2]);
    maxDistance = Math.max(maxDistance, currDistance)
    p1 += 1;
  }

  return maxDistance;
};

const tests = [
  [[1, 2, 3], [2]],
  [[1, 2, 3, 4], [1, 4]],
  [[1, 5], [2]],
  [[4, 5, 6, 7], [1, 6]],
  [[1,5], [10]],
];

for (let test of tests) {
  logOutList(findRadius(...test));
}