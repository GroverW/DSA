/*
Given an array A of non-negative integers, the array is squareful if for every pair of adjacent elements, their sum is a perfect square.

Return the number of permutations of A that are squareful.  Two permutations A1 and A2 differ if and only if there is some index i such that A1[i] != A2[i].

 

Example 1:

Input: [1,17,8]
Output: 2
Explanation: 
[1,8,17] and [17,8,1] are the valid permutations.
Example 2:

Input: [2,2,2]
Output: 1
 

Note:

1 <= A.length <= 12
0 <= A[i] <= 1e9
*/

var numSquarefulPerms = function (A) {
  const taken = new Array(A.length).fill(false);
  const visited = new Set();

  const matches = new Array(A.length).fill(0).map(() => []);

  for (let i = 0; i < A.length; i += 1) {
    const val = A[i];
    for (let j = i + 1; j < A.length; j += 1) {
      if (Math.sqrt(val + A[j]) % 1 === 0) {
        matches[i].push(j);
        matches[j].push(i);
      }
    }
  }

  let numPermutations = 0;

  const countPermutations = (idx, permutation) => {
    permutation.push(A[idx]);

    if (permutation.length === A.length) {
      const lookup = permutation.join(',');
      if (visited.has(lookup)) {
        permutation.pop();
        return;
      }
      visited.add(lookup);
      numPermutations += 1;
      permutation.pop();
      return;
    }

    const numsUsed = new Set();
    for (let match of matches[idx]) {
      const num = A[match];
      if (
        taken[match]
        || numsUsed.has(num)
      ) continue;
      numsUsed.add(num);
      taken[match] = true;
      countPermutations(match, permutation);
      taken[match] = false;
    }

    permutation.pop();
    return;
  }

  for (let i = 0; i < A.length; i += 1) {
    taken[i] = true;
    countPermutations(i, []);
    taken[i] = false;
  }

  return numPermutations;

};

const tests = [
  [1, 17, 8],
  [2, 2, 2],
  [2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 8, 17, 8, 1, 8, 17, 8, 1, 8, 17, 8],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(numSquarefulPerms(test));
  console.timeEnd(i);
  i += 1;
}