/*
You are given four integers, m, n, introvertsCount, and extrovertsCount. You have an m x n grid, and there are two types of people: introverts and extroverts. There are introvertsCount introverts and extrovertsCount extroverts.

You should decide how many people you want to live in the grid and assign each of them one grid cell. Note that you do not have to have all the people living in the grid.

The happiness of each person is calculated as follows:

Introverts start with 120 happiness and lose 30 happiness for each neighbor (introvert or extrovert).
Extroverts start with 40 happiness and gain 20 happiness for each neighbor (introvert or extrovert).
Neighbors live in the directly adjacent cells north, east, south, and west of a person's cell.

The grid happiness is the sum of each person's happiness. Return the maximum possible grid happiness.

 

Example 1:


Input: m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2
Output: 240
Explanation: Assume the grid is 1-indexed with coordinates (row, column).
We can put the introvert in cell (1,1) and put the extroverts in cells (1,3) and (2,3).
- Introvert at (1,1) happiness: 120 (starting happiness) - (0 * 30) (0 neighbors) = 120
- Extrovert at (1,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
- Extrovert at (2,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
The grid happiness is 120 + 60 + 60 = 240.
The above figure shows the grid in this example with each person's happiness. The introvert stays in the light green cell while the extroverts live on the light purple cells.
Example 2:

Input: m = 3, n = 1, introvertsCount = 2, extrovertsCount = 1
Output: 260
Explanation: Place the two introverts in (1,1) and (3,1) and the extrovert at (2,1).
- Introvert at (1,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
- Extrovert at (2,1) happiness: 40 (starting happiness) + (2 * 20) (2 neighbors) = 80
- Introvert at (3,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
The grid happiness is 90 + 80 + 90 = 260.
Example 3:

Input: m = 2, n = 2, introvertsCount = 4, extrovertsCount = 0
Output: 240
*/

var getMaxGridHappiness = function (m, n, introvertsCount, extrovertsCount) {
  const visited = new Map();

  const rotate = (people) => ((people & (people ^ (1 << n))) << 1);

  const getScoreChange = (idx, int, ext, isInt) => {
    let scoreChange = 0;
    const isPersonAbove = (int & 1 << n) || (ext & 1 << n);
    const isPersonLeft = ((int & 1 << 1) || (ext & 1 << 1)) && (idx % n > 0);

    if (isPersonAbove) {
      const isIntAbove = (int & 1 << n) > 0;
      scoreChange += 20 * (!isInt + !isIntAbove) - 30 * (isInt + isIntAbove);
    }

    if (isPersonLeft) {
      const isIntLeft = (int & 1 << 1) > 0;
      scoreChange += 20 * (!isInt + !isIntLeft) - 30 * (isInt + isIntLeft);
    }

    return scoreChange;
  }

  const placePeople = (idx, int, ext, iRemain, eRemain) => { 
    if (idx === m * n || (!iRemain && !eRemain)) return 0;

    const lookup = `${idx},${int},${ext},${iRemain},${eRemain}`;

    if (visited.get(lookup)) return visited.get(lookup);
    let bestScore = 0;

    const nextInt = rotate(int);
    const nextExt = rotate(ext);

    if (iRemain) {
      const score = 120 + getScoreChange(idx, nextInt, nextExt, 1);
      bestScore = score + placePeople(idx + 1, nextInt | 1, nextExt, iRemain - 1, eRemain);
    }

    if (eRemain) {
      const score = 40 + getScoreChange(idx, nextInt, nextExt, 0);
      bestScore = Math.max(
        bestScore,
        score + placePeople(idx + 1, nextInt, nextExt | 1, iRemain, eRemain - 1)
      );
    }

    bestScore = Math.max(bestScore, placePeople(idx + 1, nextInt, nextExt, iRemain, eRemain));
    visited.set(lookup, bestScore);
    return bestScore;
  }

  return placePeople(0, 0, 0, introvertsCount, extrovertsCount);
};


/*

*/

// const max = 5;
// for (let i = 0; i < 50; i += 1) {
//   const m = Math.floor(Math.random() * max) + 1;
//   const n = Math.floor(Math.random() * max) + 1;

//   const maxPeople = Math.min(m * n, 6);
//   const numInt = Math.floor(Math.random() * maxPeople);
//   const numExt = Math.floor(Math.random() * maxPeople);

//   logOutList(printRow([m, n, numInt, numExt]));
// }

/*

*/

const tests = [
  [2, 3, 1, 2],
  [3, 1, 2, 1],
  [2, 2, 4, 0],
  [5, 2, 2, 1],
  [2, 2, 1, 3],
  [1, 3, 1, 0],
  [1, 3, 1, 2],
  [1, 3, 2, 2],
  [3, 4, 3, 4],
  [5, 2, 0, 5],
  [2, 1, 1, 1],
  [5, 1, 4, 4],
  [1, 2, 0, 0],
  [2, 3, 5, 2],
  [4, 5, 2, 4],
  [3, 4, 2, 4],
  [5, 1, 2, 2],
  [1, 1, 0, 0],
  [1, 2, 1, 1],
  [2, 2, 2, 3],
  [5, 4, 4, 5],
  [3, 3, 2, 5],
  [4, 5, 2, 5],
  [2, 5, 0, 4],
  [2, 3, 2, 4],
  [2, 5, 3, 3],
  [2, 2, 3, 1],
  [5, 5, 4, 5],
  [2, 4, 2, 2],
  [3, 4, 4, 2],
  [2, 4, 5, 1],
  [4, 4, 5, 0],
  [5, 3, 1, 4],
  [2, 3, 0, 5],
  [1, 2, 1, 0],
  [5, 2, 0, 4],
  [3, 1, 2, 0],
  [4, 4, 0, 0],
  [2, 4, 1, 5],
  [4, 3, 3, 0],
  [1, 3, 2, 0],
  [5, 5, 5, 3],
  [1, 3, 2, 1],
  [4, 5, 5, 1],
  [5, 3, 4, 3],
  [5, 4, 0, 1],
  [2, 3, 0, 4],
  [2, 1, 1, 0],
  [2, 5, 5, 3],
  [4, 1, 2, 1],
  [4, 1, 1, 2],
  [3, 4, 3, 5],
  [2, 3, 3, 5],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(getMaxGridHappiness(...test));
  console.timeEnd(i);
  i += 1;
}

/*
2
3
1
2
3
1
2
1
2
2
4
0
4
1
3
0
4
1
0
3
3
5
1
2
3
5
3
2
5
4
5
0
5
4
0
5
4
2
5
0
4
2
4
0
5
5
1
3
5
5
5
0
5
3
0
1
5
3
3
0
5
3
2
2
5
3
1
3
3
2
4
0
3
2
3
2
2
5
2
0
2
5
2
2
1
3
0
2
1
3
0
2
5
5
2
1
5
5
1
4
2
4
1
2
2
4
2
3
5
4
1
4
5
4
0
4
2
1
0
1
2
1
0
1
5
5
1
0
5
5
0
4
2
3
4
0
2
3
1
1
4
4
0
2
4
4
1
0
5
4
1
3
5
4
0
5
2
2
0
3
2
2
1
1
4
4
4
0
4
4
2
2
5
2
1
1
5
2
1
3
5
5
3
1
5
5
1
4
5
1
2
2
5
1
1
3
4
4
2
1
4
4
0
4
1
5
1
1
1
5
0
1

240
260
240
300
200
240
480
600
400
480
480
320
600
40
360
360
320
360
400
240
360
120
120
280
440
240
440
440
320
40
40
120
320
360
160
120
120
320
400
200
160
480
360
160
320
400
440
350
320
280
320
160
40
*/