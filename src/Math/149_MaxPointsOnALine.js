/*
Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

Example 1:

Input: [[1,1],[2,2],[3,3]]
Output: 3
Explanation:
^
|
|        o
|     o
|  o
+------------->
0  1  2  3  4
Example 2:

Input: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
Explanation:
^
|
|  o
|     o        o
|        o
|  o        o
+------------------->
0  1  2  3  4  5  6
*/

var maxPoints = function (points) {
  if (!points.length) return 0;
  let maxPoints = 0;

  for (let i = 0; i < points.length; i += 1) {
    const slopeFrequencies = {};
    const [x1, y1] = points[i];
    let samePoints = 1;
    for (let j = i + 1; j < points.length; j += 1) {
      const [x2, y2] = points[j];
      if(x1 === x2 && y1 === y2) {
        samePoints += 1;
        continue;
      }

      const maxY = y1 > y2 ? y1 : y2;
      const minY = y1 > y2 ? y2 : y1;
      const maxX = maxY === y1 ? x1 : x2;
      const minX = maxY === y1 ? x2 : x1;

      const yDiff = maxY - minY;
      const xDiff = maxX - minX;
      const gcd = getGreatestCommonDenominator(yDiff, xDiff);
      const slope = `${yDiff / gcd},${xDiff / gcd}`;

      slopeFrequencies[slope] = slopeFrequencies[slope] + 1 || 1;
    }
    const currMax = Math.max(0, ...Object.values(slopeFrequencies)) + samePoints;
    maxPoints = Math.max(maxPoints, currMax);

  }

  return maxPoints;
};

const getGreatestCommonDenominator = (num1, num2) => {
  if (num1 === 0) return num2;
  if (num2 === 0) return num1;

  num1 = Math.abs(num1);
  num2 = Math.abs(num2);

  const min = Math.min(num1, num2);
  const max = Math.max(num1, num2);

  return getGreatestCommonDenominator(min, max % min);
}

const tests = [
  [[1, 1], [2, 2], [3, 3]],
  [[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4], [2, 2], [3, 3]],
  [[1, 0], [3, 0], [5, 0], [4, 1], [2, 3], [1, 4], [2, 2], [3, 0]],
  [[0, 1], [0, 3], [0, 5], [4, 1], [2, 3], [1, 4], [2, 2], [0, 3]],
  [[0, 1], [0, 3], [0, 5], [4, 0], [2, 0], [3, 0], [1, 0]],
  [[0, 0], [94911151, 94911150], [94911152, 94911151]],
  [[0, 0]],
  [[0, 0], [1, 1], [0, 0]],
];

for (let test of tests) {
  logOutList(maxPoints(test));
}