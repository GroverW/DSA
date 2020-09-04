/*
In a given 2D binary array A, there are two islands.  (An island is a 4-directionally connected group of 1s not connected to any other 1s.)

Now, we may change 0s to 1s so as to connect the two islands together to form 1 island.

Return the smallest number of 0s that must be flipped.  (It is guaranteed that the answer is at least 1.)



Example 1:

Input: A = [[0,1],[1,0]]
Output: 1
Example 2:

Input: A = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
Example 3:

Input: A = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1
*/

var shortestBridge = function (A) {
  const tests = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const waterQueue = [];

  const explore = (r, c) => {
    A[r][c] = -1;

    for (let [rDiff, cDiff] of tests) {
      const rNext = r + rDiff;
      const cNext = c + cDiff;
      if (
        rNext < 0
        || rNext >= A.length
        || cNext < 0
        || cNext >= A[0].length
        || A[rNext][cNext] === -1
      ) continue;

      if (A[rNext][cNext] === 0) {
        A[rNext][cNext] = -1;
        waterQueue.push([rNext, cNext])
      } else {
        explore(rNext, cNext);
      }

    }
  }
  let found = false;
  for (let r = 0; r < A.length; r += 1) {
    for (let c = 0; c < A[0].length; c += 1) {
      if (A[r][c] === 1) {
        explore(r, c);
        found = true;
        break;
      }
    }
    if (found) break;
  }

  let count = 1

  while (waterQueue.length) {
    const end = waterQueue.length;
    for(let i = 0; i < end; i += 1) {
      const [r, c] = waterQueue.shift();

      for (let [rDiff, cDiff] of tests) {
        const rNext = r + rDiff;
        const cNext = c + cDiff;
        if (
          rNext < 0
          || rNext >= A.length
          || cNext < 0
          || cNext >= A[0].length
          || A[rNext][cNext] === -1
        ) continue;

        if (A[rNext][cNext] === 0) {
          A[rNext][cNext] = -1;
          waterQueue.push([rNext, cNext])
        } else if (A[rNext][cNext] === 1) {
          return count;
        }
      }

    }
    count += 1;
  }

  return 0;
};