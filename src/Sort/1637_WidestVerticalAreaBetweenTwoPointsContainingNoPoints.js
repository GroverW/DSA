/*
Given n points on a 2D plane where points[i] = [xi, yi], Return the widest vertical area between two points such that no points are inside the area.

A vertical area is an area of fixed-width extending infinitely along the y-axis (i.e., infinite height). The widest vertical area is the one with the maximum width.

Note that points on the edge of a vertical area are not considered included in the area.

 

Example 1:

​
Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
Explanation: Both the red and the blue area are optimal.
Example 2:

Input: points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]
Output: 3
 

Constraints:

n == points.length
2 <= n <= 105
points[i].length == 2
0 <= xi, yi <= 109
*/

var maxWidthOfVerticalArea = function (points) {
  let maxGap = 0;
  points.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < points.length; i += 1) {
    maxGap = Math.max(maxGap, points[i][0] - points[i - 1][0]);
  }

  return maxGap;
};

// for (let i = 0; i < 10; i += 1) {
//   let numPoints = Math.floor(Math.random() * 100);
//   const points = [];
//   for (let j = 0; j < numPoints; j += 1) {
//     const x = Math.floor(Math.random() * 100);
//     const y = Math.floor(Math.random() * 100);
//     points.push([x, y]);
//   }
//   logOutList(printGrid(points));
// }

const tests = [
  [[8, 7], [9, 9], [7, 4], [9, 7]],
  [[3, 1], [9, 0], [1, 0], [1, 4], [5, 3], [8, 8]],
  [[74, 65], [12, 32], [60, 73], [68, 31], [92, 80], [28, 39], [96, 60], [37, 30], [85, 32], [46, 6], [45, 43], [83, 12], [34, 69], [33, 3], [78, 7], [22, 85], [98, 40], [43, 40], [0, 33], [23, 60], [53, 54], [79, 81]],
  [[12, 62], [68, 82], [51, 28], [31, 40], [47, 80], [90, 41], [16, 43], [42, 28], [91, 68], [52, 52], [2, 61], [66, 38], [41, 85], [23, 10], [12, 76], [95, 75], [90, 35], [54, 60], [59, 22], [88, 5], [85, 18]],
  [[93, 16], [66, 14], [94, 71], [43, 52], [54, 29], [76, 28], [73, 91], [64, 12], [89, 37], [84, 67], [0, 49], [96, 80]],
  [[99, 67], [7, 79], [6, 31], [3, 20], [14, 88], [52, 9], [10, 68], [44, 58], [97, 30], [43, 3], [32, 95], [71, 68], [38, 37], [81, 98], [21, 63], [23, 11], [45, 8], [67, 69], [96, 76], [9, 8], [87, 64], [10, 69], [19, 73], [36, 86], [13, 64], [34, 7], [48, 80], [74, 67], [72, 4], [18, 21], [34, 81], [31, 10], [68, 85], [43, 78], [3, 0], [71, 81], [1, 83], [52, 46], [95, 50], [30, 20], [70, 88], [63, 22], [19, 51], [44, 85], [51, 48], [55, 2], [66, 11], [33, 99], [23, 8], [52, 89], [73, 50], [97, 86], [63, 55], [86, 44], [23, 99], [34, 0], [74, 59], [73, 75], [50, 8], [20, 25]],
  [[31, 14], [54, 4], [39, 35], [20, 2], [48, 63], [8, 88], [37, 32], [66, 13], [68, 20], [14, 46], [86, 86], [50, 46], [17, 95], [60, 66], [89, 60], [51, 15], [91, 59], [3, 29]],
  [[56, 0], [88, 39], [38, 89], [85, 76], [38, 22], [85, 57], [0, 57], [49, 22], [87, 34], [63, 71], [23, 67], [5, 0], [67, 81], [99, 60], [7, 27], [96, 21], [43, 39], [25, 45], [55, 34], [52, 9], [90, 9], [27, 72], [76, 5], [5, 10], [25, 44], [58, 68], [8, 80]],
  [[76, 61], [8, 50], [62, 63], [73, 30], [19, 46], [4, 42], [79, 86], [4, 40], [92, 35], [20, 61], [50, 85], [45, 9], [57, 80], [78, 49], [2, 16], [42, 97], [24, 69], [31, 76], [48, 2], [75, 51], [46, 66], [80, 94], [7, 52], [29, 6], [23, 47], [26, 49], [84, 7], [21, 6], [56, 28], [82, 73], [33, 74], [22, 50], [26, 76], [51, 88], [32, 34], [22, 65], [5, 92], [90, 10], [73, 80], [18, 70], [36, 37], [63, 66], [59, 60], [84, 77], [49, 82], [60, 25]],
  [[16, 88], [15, 70], [37, 97], [63, 27], [0, 80], [42, 3], [8, 21], [45, 13], [82, 9], [61, 81], [19, 32], [2, 17], [96, 11], [81, 74], [86, 56], [79, 43], [50, 21], [38, 38], [68, 25], [52, 63], [11, 11], [88, 80], [49, 38], [34, 75], [77, 70], [83, 67], [80, 92], [39, 77], [92, 76], [77, 82]],
  [[26, 26], [90, 98], [69, 27], [76, 25], [13, 14], [53, 98], [13, 91], [63, 48], [44, 75], [30, 44], [78, 19], [87, 5], [42, 64], [22, 60], [42, 42], [51, 63], [84, 31], [7, 72], [13, 41], [20, 67], [97, 82], [95, 76], [24, 21], [44, 32], [63, 76], [27, 89], [11, 97], [89, 25], [83, 96], [82, 86], [99, 37], [86, 17], [42, 42], [92, 49], [1, 51], [79, 45], [44, 23], [58, 33], [63, 16], [92, 93], [80, 6], [47, 67], [16, 88], [61, 0], [65, 95], [64, 80], [49, 84], [17, 73], [73, 73], [75, 97], [28, 58], [13, 9], [58, 59], [63, 63], [55, 75], [66, 2], [48, 8], [92, 10], [34, 59], [65, 95], [38, 74], [18, 36], [34, 45], [70, 41], [8, 41], [12, 91], [95, 71], [95, 21], [75, 27], [43, 88], [89, 76], [46, 61], [52, 16], [68, 96], [83, 19], [55, 48], [29, 44]],
  [[7, 78], [72, 20], [53, 15], [26, 3], [75, 28], [6, 24], [84, 83], [72, 48], [15, 8], [79, 61], [4, 2], [4, 43], [52, 6], [25, 50], [39, 68], [56, 79], [49, 72], [72, 77], [35, 32], [41, 74], [60, 1], [30, 31], [48, 81], [23, 98], [66, 6], [88, 93], [98, 45], [33, 12], [19, 38], [13, 60], [29, 51], [7, 15], [26, 5], [69, 61], [48, 24]],
];

for (let test of tests) {
  logOutList(maxWidthOfVerticalArea(test));
}

/*
[[8, 7], [9, 9], [7, 4], [9, 7]]
[[3, 1], [9, 0], [1, 0], [1, 4], [5, 3], [8, 8]]
[[74, 65], [12, 32], [60, 73], [68, 31], [92, 80], [28, 39], [96, 60], [37, 30], [85, 32], [46, 6], [45, 43], [83, 12], [34, 69], [33, 3], [78, 7], [22, 85], [98, 40], [43, 40], [0, 33], [23, 60], [53, 54], [79, 81]]
[[12, 62], [68, 82], [51, 28], [31, 40], [47, 80], [90, 41], [16, 43], [42, 28], [91, 68], [52, 52], [2, 61], [66, 38], [41, 85], [23, 10], [12, 76], [95, 75], [90, 35], [54, 60], [59, 22], [88, 5], [85, 18]]
[[93, 16], [66, 14], [94, 71], [43, 52], [54, 29], [76, 28], [73, 91], [64, 12], [89, 37], [84, 67], [0, 49], [96, 80]]
[[99, 67], [7, 79], [6, 31], [3, 20], [14, 88], [52, 9], [10, 68], [44, 58], [97, 30], [43, 3], [32, 95], [71, 68], [38, 37], [81, 98], [21, 63], [23, 11], [45, 8], [67, 69], [96, 76], [9, 8], [87, 64], [10, 69], [19, 73], [36, 86], [13, 64], [34, 7], [48, 80], [74, 67], [72, 4], [18, 21], [34, 81], [31, 10], [68, 85], [43, 78], [3, 0], [71, 81], [1, 83], [52, 46], [95, 50], [30, 20], [70, 88], [63, 22], [19, 51], [44, 85], [51, 48], [55, 2], [66, 11], [33, 99], [23, 8], [52, 89], [73, 50], [97, 86], [63, 55], [86, 44], [23, 99], [34, 0], [74, 59], [73, 75], [50, 8], [20, 25]]
[[31, 14], [54, 4], [39, 35], [20, 2], [48, 63], [8, 88], [37, 32], [66, 13], [68, 20], [14, 46], [86, 86], [50, 46], [17, 95], [60, 66], [89, 60], [51, 15], [91, 59], [3, 29]]
[[56, 0], [88, 39], [38, 89], [85, 76], [38, 22], [85, 57], [0, 57], [49, 22], [87, 34], [63, 71], [23, 67], [5, 0], [67, 81], [99, 60], [7, 27], [96, 21], [43, 39], [25, 45], [55, 34], [52, 9], [90, 9], [27, 72], [76, 5], [5, 10], [25, 44], [58, 68], [8, 80]]
[[76, 61], [8, 50], [62, 63], [73, 30], [19, 46], [4, 42], [79, 86], [4, 40], [92, 35], [20, 61], [50, 85], [45, 9], [57, 80], [78, 49], [2, 16], [42, 97], [24, 69], [31, 76], [48, 2], [75, 51], [46, 66], [80, 94], [7, 52], [29, 6], [23, 47], [26, 49], [84, 7], [21, 6], [56, 28], [82, 73], [33, 74], [22, 50], [26, 76], [51, 88], [32, 34], [22, 65], [5, 92], [90, 10], [73, 80], [18, 70], [36, 37], [63, 66], [59, 60], [84, 77], [49, 82], [60, 25]]
[[16, 88], [15, 70], [37, 97], [63, 27], [0, 80], [42, 3], [8, 21], [45, 13], [82, 9], [61, 81], [19, 32], [2, 17], [96, 11], [81, 74], [86, 56], [79, 43], [50, 21], [38, 38], [68, 25], [52, 63], [11, 11], [88, 80], [49, 38], [34, 75], [77, 70], [83, 67], [80, 92], [39, 77], [92, 76], [77, 82]]
[[26, 26], [90, 98], [69, 27], [76, 25], [13, 14], [53, 98], [13, 91], [63, 48], [44, 75], [30, 44], [78, 19], [87, 5], [42, 64], [22, 60], [42, 42], [51, 63], [84, 31], [7, 72], [13, 41], [20, 67], [97, 82], [95, 76], [24, 21], [44, 32], [63, 76], [27, 89], [11, 97], [89, 25], [83, 96], [82, 86], [99, 37], [86, 17], [42, 42], [92, 49], [1, 51], [79, 45], [44, 23], [58, 33], [63, 16], [92, 93], [80, 6], [47, 67], [16, 88], [61, 0], [65, 95], [64, 80], [49, 84], [17, 73], [73, 73], [75, 97], [28, 58], [13, 9], [58, 59], [63, 63], [55, 75], [66, 2], [48, 8], [92, 10], [34, 59], [65, 95], [38, 74], [18, 36], [34, 45], [70, 41], [8, 41], [12, 91], [95, 71], [95, 21], [75, 27], [43, 88], [89, 76], [46, 61], [52, 16], [68, 96], [83, 19], [55, 48], [29, 44]]
[[7, 78], [72, 20], [53, 15], [26, 3], [75, 28], [6, 24], [84, 83], [72, 48], [15, 8], [79, 61], [4, 2], [4, 43], [52, 6], [25, 50], [39, 68], [56, 79], [49, 72], [72, 77], [35, 32], [41, 74], [60, 1], [30, 31], [48, 81], [23, 98], [66, 6], [88, 93], [98, 45], [33, 12], [19, 38], [13, 60], [29, 51], [7, 15], [26, 5], [69, 61], [48, 24]]
*/