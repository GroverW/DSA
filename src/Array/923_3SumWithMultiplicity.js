/*
Given an integer array A, and an integer target, return the number of tuples i, j, k  such that i < j < k and A[i] + A[j] + A[k] == target.

As the answer can be very large, return it modulo 109 + 7.

 

Example 1:

Input: A = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
Explanation: 
Enumerating by the values (A[i], A[j], A[k]):
(1, 2, 5) occurs 8 times;
(1, 3, 4) occurs 8 times;
(2, 2, 4) occurs 2 times;
(2, 3, 3) occurs 2 times.
Example 2:

Input: A = [1,1,2,2,2,2], target = 5
Output: 12
Explanation: 
A[i] = 1, A[j] = A[k] = 2 occurs 12 times:
We choose one 1 from [1,1] in 2 ways,
and two 2s from [2,2,2,2] in 6 ways.
 

Constraints:

3 <= A.length <= 3000
0 <= A[i] <= 100
0 <= target <= 300
*/

var threeSumMulti = function (A, target) {
  const counts = new Array(101).fill(0);

  const nums = A.filter((num) => {
    const toKeep = !counts[num];
    counts[num] += 1;
    return toKeep;
  });

  nums.sort((a, b) => a - b);

  let countTriples = 0;
  const mod = 10 ** 9 + 7;

  for (let i = 0; i < nums.length; i += 1) {
    const num1 = nums[i];
    if (num1 > target) break;
    if (num1 === target / 3 && counts[num1] > 2) {
      countTriples += counts[num1] * (counts[num1] - 1) * (counts[num1] - 2) / 6;
      countTriples %= mod;
      continue;
    }

    let left = i + (counts[num1] === 1);
    let right = nums.length - 1;

    while (left <= right) {
      const num2 = nums[left];
      const num3 = nums[right];
      const currSum = num1 + num2 + num3;

      if (currSum === target) {
        if (num1 === num2) {
          if (num2 !== num3) {
            countTriples += counts[num3] * counts[num2] * (counts[num2] - 1) / 2;
          }
        } else if (num2 === num3) {
          if (counts[num2] > 1) {
            countTriples += counts[num1] * counts[num2] * (counts[num2] - 1) / 2;
          };
        } else {
          countTriples += counts[num1] * counts[num2] * counts[num3];
        }
        left += 1;
        right -= 1;
      } else if (currSum < target) {
        left += 1;
      } else {
        right -= 1;
      }

      countTriples %= mod;
    }
  }

  return countTriples;
};

// for (let i = 0; i < 20; i += 1) {
//   const numEnvelopes = Math.floor(Math.random() * 100);

//   const envelopes = [];
//   for (let j = 0; j < numEnvelopes; j += 1) {
//     const w = Math.floor(Math.random() * 50);
//     const h = Math.floor(Math.random() * 50);
//     envelopes.push([w, h]);
//   }

//   logOutList(printGrid(envelopes));
// }



const tests = [
  [[1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8],
  [[1, 1, 2, 2, 2, 2], 5],
  [[1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8], 9],
  [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8], 9],
  [[2, 2, 1, 3, 3, 3, 3, 3], 7],
  [[3, 3, 0, 0, 3, 2, 2, 3], 6],
];

for (let test of tests) {
  logOutList(threeSumMulti(...test));
}