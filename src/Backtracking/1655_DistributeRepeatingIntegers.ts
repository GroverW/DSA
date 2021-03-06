/*
You are given an array of n integers, nums, where there are at most 50 unique values in the array. You are also given an array of m customer order quantities, quantity, where quantity[i] is the amount of integers the ith customer ordered. Determine if it is possible to distribute nums such that:

The ith customer gets exactly quantity[i] integers,
The integers the ith customer gets are all equal, and
Every customer is satisfied.
Return true if it is possible to distribute nums according to the above conditions.

 

Example 1:

Input: nums = [1,2,3,4], quantity = [2]
Output: false
Explanation: The 0th customer cannot be given two different integers.
Example 2:

Input: nums = [1,2,3,3], quantity = [2]
Output: true
Explanation: The 0th customer is given [3,3]. The integers [1,2] are not used.
Example 3:

Input: nums = [1,1,2,2], quantity = [2,2]
Output: true
Explanation: The 0th customer is given [1,1], and the 1st customer is given [2,2].
Example 4:

Input: nums = [1,1,2,3], quantity = [2,2]
Output: false
Explanation: Although the 0th customer could be given [1,1], the 1st customer cannot be satisfied.
Example 5:

Input: nums = [1,1,1,1,1], quantity = [2,3]
Output: true
Explanation: The 0th customer is given [1,1], and the 1st customer is given [1,1,1].
 

Constraints:

n == nums.length
1 <= n <= 105
1 <= nums[i] <= 1000
m == quantity.length
1 <= m <= 10
1 <= quantity[i] <= 105
There are at most 50 unique values in nums.
*/

// slow
function canDistribute(nums: number[], quantity: number[]): boolean {
  const counts = nums.reduce((frequency, num) =>
    frequency.set(num, (frequency.get(num) + 1) || 1),
    new Map(),
  );
  const topCounts = [...counts.values()]
    .sort((a, b) => b - a)
    .slice(0, quantity.length);

  quantity.sort((a, b) => b - a);

  const canDistributeAll = (idx: number) => {
    if (idx === quantity.length) return true;

    for (let i = 0; i < topCounts.length; i += 1) {
      if (topCounts[i] < quantity[idx]) continue;
      topCounts[i] -= quantity[idx];
      if (canDistributeAll(idx + 1)) return true;
      topCounts[i] += quantity[idx];
    }

    return false;
  }

  return canDistributeAll(0);
};


// const maxLen: number = 100;

// for (let i = 0; i < 100; i += 1) {
//   const len = numberBetween(1, maxLen);
//   // const len = 100000;
//   const numQuantity = numberBetween(1, 10);
//   // const numQuantity = 10;

//   const nums = [];
//   for(let i = 0; i < len; i += 1) {
//     nums.push(numberBetween(1, 20));
//   }

//   const counts = nums.reduce((frequency, num) =>
//     frequency.set(num, (frequency.get(num) + 1) || 1),
//     new Map(),
//   );
//   const maxQuantity = Math.max(...counts.values());

//   const quantities = new Array(numQuantity).fill(0).map(() => numberBetween(1, maxQuantity))

//   // logOutList('"' + ip + '"')
//   // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   // logOutList(printRow([nums, quantities]) + ',');
//   logOutLeetcode([nums, quantities])
// }


const tests: Indexable<any>[] = [
  // [[15,2,9,10,5,18,15,1,7,15,5,10,11,14,13,5,19,17,7,12,1,12,6,3,17,12,8,11,8,4,11,3,8,15,12,10,18,8,14,18,6,6,8,6,16,1,5,16,19,9,9,8,12,12,11,8,10,5,13,2,7,2,17,2,12,3,17,2,1,8,12,16,16,2,2,13,11,6,1,9,20,20,18,15,1,2,9,7],[1,7,4]],
  // [[3,9,6,13,8,1,1,4,4,4,6,5,9,15,18,5,9,17,5,12,18,3,14,16,13,7,1,17,2,1,6,2,4,3,5,4,9,11,10,13,2,20,3,8,19,18,19,7,1,10,12,8,20,14,18,11,17,4,3,11,9,17,18,18,14,20,18,12,1,16,17,2,5,18,10,1,2,4,3,14,11,1,9,7,19,3,12,8,14,15,11,9,13,11,6,14],[3,6,7,4,4,7,5]],
  // [[2,5,15,6,14,20,3,14,14,3,6,19,10,17,9,4,20,5,14,15,8,18,11,8,1,20,13,12,2,15,10,17,13,13,18,17,7,4,19,16,11,10,8,9,6,5,7,3,3,17,16,19],[4]],
  // [[1,5,7,10,7,19,13,14,13,13,14,19,3,14,9,7,8,4,11,11],[1,3,1,3,1,1,2,3,1,3]],
  // [[9,20,11,9,11,3,5,10,3,20],[2,2,1,1,1,1]],
  // [[14,7,14,3,6,12,6,12,19,2,10,15,8,13,14,6,1,3,19,20,8,19,5,10,4,19,8,10,11,1,19,20,11,6,13,1,12,4,16,2,6,4,19,15,13,18,6,7,9,2,20,13,13,5,8,18,7,14,7,13,4,7,17,19,10,18,12,19,14,14,5,12],[2,1,3,1,5,7]],
  // [[5,9,4,12,20,5,19,14,17,2,20,7,3,1,18,14,18,5,14,5,11,20,14,8,10,14,8,4,11,16,1],[4,1,2,1,1,1]],
  // [[5,13,14,9,14,8,4,10,11,15,1,6,3,9,10,4,16,19,18,19,7,11,6,15,20,10,14,8,10,14,9,19,2,13,5,15,3,2,19,14,12,19,3],[3,1,1,4,3,5]],
  // [[18,9,5,5,2,12,17,11,11,18,18,10,19,18,18,7,5,13,13,20,7,17,11,16,3,8,2,2,18,3,17,20,14,8,18,2,16,17,16,4,2],[2,4,6,5,2,2,3,2,1]],
  // [[18,14,19,11,18,4,1,3,20,13,14,16,19,13,19,12,19,20,11,1,16,16,12,3,5,13,20,3,18,19,4,12,15,11,9,19,11,17,17,12,7,8,3,2],[1,6,6,1,1,3]],
  // [[8,13,19,12,2,6,13,16,14,14,2,6,1,11,17,9,6,20,19,16,3,11],[2,1,2,1,2,1,3,1,1,1]],
  // [[2,12,14,9,10,11,1,18,8,5,20,7,10,9,9,5,10,6,15,7,10,1,8,1,8],[3,4,1,2,4,3,3,1,4,2]],
  // [[9,5,10,14,2,8,3,17,10,6,3,3,18,8,4,8,18,11,13,18,7,3,7,9,5,7,20,6,10,14,18,5,17,10,14,7,15,16,15,20,11,19,19,16,4,1,13,3,1,17,7,4,4,11,20,7,2,3,12,11,8,19,13,18,19],[3,1,2,1,6,3,4]],
  // [[18,5,7,14,13,7,18,6,4,4,9,12,9,17,10,14,16,17,12,13,2,8,12,1,2,11,1,14,10,11,20,13,12,5,17,19,7,1,1,14,18,10,16,1,16,2,19,6,1,9,17,3,7,11,17,15,4,5,18,17,13,6,9,13,6,13,7,15,1,18,17,15,6,9,19,6,6,20,7],[4,5]],
  // [[1,14,16,11,14,14,2,6,13,6,16,12,7,15,8,7,12,13,19,18,16,8,10,17,4,17,16,17,12,13,20,7,10,10,11,6,19,4,14,12,10,13,11,19,4,12,5,16,17,6,15,13,11,3,5,13,17,7,16,7,4,13,19,10,9,14,8,17,2,5,15,4,2,15,4,15,8,6,14,1,6,2,2,8,5,15,3,1],[4,7,5,5,1,6,6,1,3]],
  // [[17,10,14,12,15,15,11,10,19,2,10,18,16,13,10,20,1,1,17,6,3,10,16,2,8,13,10,1,18,5,4,15,8,3,3,14,9,14,15,19,16,15,17,17,9,14,1,2,16,7,14,4,2,17,6,15,13,1,12,18,1,9,14,3,20,7,9,5,15,10,9,7,9,4,10,15,20,1,4,17,13,15,9,13,16,14,18,19,7,8,8,19],[7,9,8,2,9,7]],
  // [[9,18,18,5,18,16,8,14,2,7,15,18,6,9,2,14,19,20,12,17,20,11,14,16,13,2,9,2,2,17,10,5,20,12,14,15,20,9,9,12,9,8,7,4,17,1,3,11,15,12,2,2,9,15,20,4,14,20,10,2,9,11],[7,2]],
  // [[8,17,5,16,20,9,3,11,18,12,9,18,13,8,9,4,10,4,17,10,4,15,17,9,14,20,6,10,17,16,3,7,20,17,16,10,2,7,11,1,6,14,20,10,13,17,4,4,17,11,15,9,3,1,16,3,10,20,20,12,8,19,17,7,2,13,10,3,9,3,18,13,19,16,15,2,6,2],[8,2,6,4,1,6,8]],
  // [[10,4,10,9,20,3,16,20,5,5,19,9,6,6,2,10,6,8,10,20,17,3,15,1,19,16,3,19,4,4,4,18,15,2,9,5,7,1,6,2,16,13,9,13,8,12,1,12,18,18,20,14,14,2,5,10,16,10,11,17,5,5,4,13,20,11,7,1,16,17,12,8,2,17,10,6,2,7,8,5,11,15,16,6,2,18,10,17,20,5],[5,6]],
  // [[6,8,18,1,16,17,4,11,14,6,6,3,15,11,9,1,3,2,1],[2,2,2]],
  // [[12,17,11,19,10,14,1,14,16,10,14,6,15,17,15,17,17,13,3,16,4,6,3,12,11,5,4,19,17,13,2,5,16,1,3,15,20,18,13,10,15,15,6,16,6,2,12,12,17,1,6,12,19,11,7,4,14,12,13,19,16,19,13,18,17,19,16,13,13],[4,2]],
  // [[11,18,7,12,7,20,1,13,6,4,9,6,18,14,7,18,18,17,11,9,1,11,17,18,3,12,12,10,15,14,12,4,16,12,19,7,9,11,5,17,16,17,12,6,13,4,16,18,14,17,18,2,10,17,1,8,14,10,1,9,8,20,10,10,8,1,20,3,5,3,12,6,9,13,10,11],[1,5,2,2,1,4,3,6,2,1]],
  // [[3,1,10,19,19,9,14,13,2,12,16,20,11,2,5,9,5,2,20,18,14,18,18,3,11,19,9,17,20,14,17,11,12,6,12,11,9,2,12,18,14,19,15,1,13,20,10,4,17,11,2,5,5,15,4,10,5,4],[3,3]],
  // [[9,3,2,6,20,15,4,19,17,8,18,7,8,15,2,15,18,13,16,13,6,13,18,11,3,4,11,17,8,11,19,3,8,2,1,19,9,7,10,1,6,2,9,14,14,11,2,9,7,13,19,7,5,15,8,19,7,7,14,12,12,8,5,9,12,7,14,10,7,14,13,9,17,14,1,17,20,9,6,5,4,5,9],[5,8,4,4,2]],
  // [[4,14,17,14,2,8,15,15,14,2,9,19,16,1,16,14,12,1,5,13,3,7,3,2,6,5,14,17,17,7,15,17,16,12,11,20,1,9,11],[2,2]],
  // [[5,20,18,7,14,13,2,6,7,7,7,4,19,3,13,7,16,14,20,17,14,14,6,3,10,19,17,9,8,20,11,5],[2]],
  // [[10,11,15,13,17,13,6,18,17,2,5,20,18,16,18,1,19,14,12,1,16,8,20,14,2,19,12,12,12,15,18,20,5,8,13,7,15,5,2,2,12,19,17,11,10,8,5,16,14,6,13,2,18,5,18,15,14,2,11,4,17,2,4,14,17,11,16,9,1,19,9],[2,7,7,3,6,6,6,1,1]],
  // [[10,19,10,8,9,14,6,16,3,20,11,15,3,16,18,19,13,17,20,7,6,16,17,7,5,13,2,2,1,20,3,3,12,11,1,3,6,8,14,5,15,17,5,1,13,2,5,18,7,12,13,8,14,17,5,17,17,20,17,12,9,9,6,1,2,13,10,10,7,12,20,11,8,8,20,19,15,3,11,14,5,12,19,8,14,19,13,10,1,20,8],[6,7]],
  // [[10,4,4,11,10,12,10,19,12,20,9,20,6,19,15],[2,3,2,3,3,2,1,3,2,3]],
  // [[20,17,17,12,15,13,16,19,8,12,17,5,15,16,9,13,18,16,5,3,4,11,15,12,12,13,12,16,16,7,9,8,6,17,8,11,20,6,4,2,11,2,20,3,2,3,18,14,5,7,17,6,10,9,13],[4,3,2,2,4]],
  // [[20,20,9,18,8,16],[2,2,2,1,1,1,1,1,1]],
  // [[17,4,11,1,5,5,15,17,16,15,10,9,13,2,13,7,5],[1,2,1,2]],
  // [[11,6,14,13,13,2,2,16,1,13,15,13,17,16,2,10,14,7,2,1,6,1,16,20,15,19,8,3,12,6,4,10,18,4,9,8,12,18,9,17,7,14,3,15,2,7,13,20,14,20,16],[5,5,2,3,2,1,1,5,5,2]],
  // [[18,7,7,7,13,6,10,20,1,1,18,4,18,20,12,6,4,8,1,9,19,17,2,18,4,18,4,19,4,1,6,9,14,2,16,12,10,14,10,6,3,9,13,12,12,5,13,18,14,8,13,20,17,15,7,20,16,9,18,14,1,10,6,12,2,18],[6,4,5,3,6,2,4,8,5]],
  // [[11,2,13,17,19,14,1,2,1,1,4,11,20,13,14,18,11,11,20,7,14,4,2,20,17,13,9,4,2,2,16,12,11,18,2,5,15,1,6,3,13,8,17,5,14,13,14,5,18,9,6,12,9,11,17,19,9,8,3,8,18,3,16,7,18,2,6,7,9,13],[5,1,6]],
  // [[6,18,13,9,14,4,19,7,15,15,14,12,1,12,18,13,13,2,3,10,10,8,20,15,7],[1,1,1]],
  // [[7,18,11,10,20,14,11,8,13,7,18,3,3,16,18,9,4,16,16,6,12,6,2,11,3,13,3,15,4,11,13,7,1,5,12,7,18,17,8,17,5,17,16,12,8],[2,4,4]],
  // [[18,18,6,14,18,6,4,12,6,13],[2,1,2,3,3,3,1,2,3]],
  // [[11,12,18,7,18,16,11,17,8,20,10,13,1,4,9],[1]],
  // [[11,18,8,13,8,2,2,16,7,4,5,6,9,3,4,19,2,16,7,6,19,5,2,4,16,16,13,13,17,5,12,8,10,9,3,14,17,18,14,15],[3,1]],
  // [[14,5,17,13,17,13],[1]],
  // [[6,10,9,12,7,3,10,6,14,6,9,6,10,12],[1,3]],
  // [[1,3,2,11,15,16,5,8,9,1,10,10,7,3],[2,2,2,2,1,2,1,1,1,2]],
  // [[12,4,9,4,16,9,10,19,17,10,12,5,15,10,6,9,10,19,1,16,17,15,10,14,15,8,4,4,19,18,13,9,14,14,15,8,19,17,17,5,17,15,15,12,4,13,3,11,13,18,13,2,12,11,7,13,17,4,16,18,4,18,16,12,13,7,3,19,20,11,18,10,7,14,2,18,3,12,13,17,4,3,19,15,14,19,14,2,14,13,9,7,18,14],[1,8,4]],
  // [[3,18,3,12,19,14,1],[1,2,2,2,2,2,1,2,2,2]],
  // [[10,13,11,11,5,1,10,2,20,15,13,17,13,10,17,3,13,3,14,6],[2,4,4,4,1]],
  // [[18,1,1,15,13,19,7,17,4,2,18,14,15,11,9,13,12,6,5,7,4,12,17,16,9,7,1,14,3,19,16,11,1,13,4,6,7,20,9,11,5,4,12,14,17,16,19,5,13,4,14,20,1,14,15,12,16,5,8,18,2,8,11,3,3,10,3,5,20,3,1,19,18,14],[2,5,3,2,2,2,6]],
  // [[10,9,1,18,5,20,9,10,11,10,9,13,15,2,1,5,20,2,12,16,1,9,5,14,10,18,19,10,11,6,15,19,19,13,13,5,5,4,10,2,15,17,16,9,5,12,16,15,20,14,18,1,6,20,6,16,19,19,9,2,17,4,12,5,15,18,17,17,5,2,8,11,4,16,10,12,13,15,20,12,8,6,7,1,10,13,7,17,9,4,4,17],[6,6,7]],
  // [[14,3,8,17,8,13,2,8,12,13,3,6,1,10,6,5,19,2,9,10,19,18,6,5,13,4,17,11,2,7,2,10,14,17,2,7,9,1,18,3],[3,4,5,3,2,3,2,1,4]],
  // [[18,10,9,8,14,12,16,3,12,2,11,18,13,10,19,5,11,16,16,9,3,10,7,15,6],[3,3,3,3,1,3,1,3,1,2]],
  [
    [1,1,1,1,1],
    [2,3]
  ],
  [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],
    [10,10,10,10,10,10,10,10,10,50],
  ]
];

let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  const [nums, quantities] = test;
  // logOutLeetcode(test);
  logOutList(canDistribute(nums, quantities));
  console.timeEnd(i.toString());
  i += 1;

}