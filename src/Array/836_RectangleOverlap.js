/*
A rectangle is represented as a list [x1, y1, x2, y2], where (x1, y1) are the coordinates of its bottom-left corner, and (x2, y2) are the coordinates of its top-right corner.

Two rectangles overlap if the area of their intersection is positive.  To be clear, two rectangles that only touch at the corner or edges do not overlap.

Given two (axis-aligned) rectangles, return whether they overlap.

Example 1:

Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
Output: true
Example 2:

Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
Output: false
*/

var isRectangleOverlap = function(rec1, rec2) {
  const [r1x1, r1y1, r1x2, r1y2] = rec1;
  const [r2x1, r2y1, r2x2, r2y2] = rec2;

  if(
      r2y2 <= r1y1
      || r2x2 <= r1x1
      || r2x1 >= r1x2
      || r2y1 >= r1y2
  ) return false;

  return true;
};