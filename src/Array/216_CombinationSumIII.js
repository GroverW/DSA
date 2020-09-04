import { printGrid } from './helpers';

/*
Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

Note:

All numbers will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: k = 3, n = 7
Output: [[1,2,4]]
Example 2:

Input: k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]
*/

var combinationSum3 = function (k, n) {
  const numberSets = [];
  const visited = {};
  const queue = [{
    sum: 0,
    nums: [],
    mask: 0,
  }];

  while(queue.length) {

    for (let i = 0; i <= k; i += 1) {
      const end = queue.length;
      const valsLeft = k - i;
      for (let j = 0; j < end; j += 1) {
        const curr = queue.shift();
        if (valsLeft === 0) {
          if (curr.sum === n) {
            numberSets.push(curr.nums);
          }

          continue;
        }

        for (let m = 1; m <= 9; m += 1) {
          const sum = curr.sum + m;

          if (sum > n - valsLeft + 1) break;
          if (curr.mask & 1 << m) continue;

          const mask = curr.mask | 1 << m;
          if (visited[mask]) continue;

          visited[mask] = true;

          const nums = [...curr.nums, m];
          queue.push({ sum, nums, mask })
        }
      }
    }
  }

  return numberSets;
};

const tests = [
  [3, 7],
  [3, 9],
];

for (let [k, n] of tests) {
  logOutList(printGrid(combinationSum3(k, n)));
}