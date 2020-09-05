/*
Find the total area covered by two rectilinear rectangles in a 2D plane.

Each rectangle is defined by its bottom left corner and top right corner as shown in the figure.

Rectangle Area

Example:

Input: A = -3, B = 0, C = 3, D = 4, E = 0, F = -1, G = 9, H = 2
Output: 45
Note:

Assume that the total area is never beyond the maximum possible value of int.
*/

var computeArea = function (A, B, C, D, E, F, G, H) {
  const a1 = (D - B) * (C - A);
  const a2 = (H - F) * (G - E);

  if (
    A >= G
    || E >= C
    || B >= H
    || F >= D
  ) return a1 + a2;

  const maxX1 = Math.max(A, E);
  const minX2 = Math.min(C, G);
  const maxY1 = Math.max(B, F);
  const minY2 = Math.min(D, H);
  const overlap = (minX2 - maxX1) * (minY2 - maxY1);

  return a1 + a2 - Math.max(0, overlap);
};

const tests = [
  [-3, 0, 3, 4, 0, -1, 9, 2],
  [-3, 2, 3, 4, 0, -1, 9, 2],
  [-3, -1, 4, 4, 0, 0, 3, 2],
  [-3, -1, 4, 4, 0, 3, 5, 5],
  [-3, -1, 4, 4, -5, 0, 1, 3],
  [-2, -2, 2, 2, 3, 3, 4, 4],
];

for (let test of tests) {
  logOutList(computeArea(...test));
}