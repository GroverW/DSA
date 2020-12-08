/*
A move consists of taking a point (x, y) and transforming it to either (x, x+y) or (x+y, y).

Given a starting point (sx, sy) and a target point (tx, ty), return True if and only if a sequence of moves exists to transform the point (sx, sy) to (tx, ty). Otherwise, return False.

Examples:
Input: sx = 1, sy = 1, tx = 3, ty = 5
Output: True
Explanation:
One series of moves that transforms the starting point to the target is:
(1, 1) -> (1, 2)
(1, 2) -> (3, 2)
(3, 2) -> (3, 5)

Input: sx = 1, sy = 1, tx = 2, ty = 2
Output: False

Input: sx = 1, sy = 1, tx = 1, ty = 1
Output: True

Note:

sx, sy, tx, ty will all be integers in the range [1, 10^9].
*/

// w/ binary search (oops)
var reachingPoints = function (sx, sy, tx, ty) {
  if (tx === sx && ty === sy) return true;
  if (tx < sx || ty < sy) return false;

  let nextX = tx;
  let nextY = ty;

  if (ty > tx) {
    nextY = findNext(ty, tx, sy);
  } else {
    nextX = findNext(tx, ty, sx);
  }

  return reachingPoints(sx, sy, nextX, nextY)
};

const findNext = (large, small, floor) => {
  let maxIncs = Math.floor(large / small);

  if (maxIncs <= 1) return large - small;

  let left = 1;
  let right = maxIncs;
  let mid;

  while (left < right) {
    mid = Math.floor((left + right) / 2);
    const result = large - mid * small;

    if (result >= floor && result - small < floor) {
      return result;
    } else if (result > floor) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return large - right * small;
}


// w/ mod
var reachingPoints = function (sx, sy, tx, ty) {
  if (tx === sx && ty === sy) return true;
  if (tx < sx || ty < sy || tx === ty) return false;

  if (ty === sy) return (tx - sx) % ty === 0;
  if (tx === sx) return (ty - sy) % tx === 0;

  return ty > tx
    ? reachingPoints(sx, sy, tx, ty % tx)
    : reachingPoints(sx, sy, tx % ty, ty);
};


/*

*/


// const generateSolution = () => {
//   const max = 200000000;
//   const startX = Math.floor(Math.random() * 10) + 1;
//   const startY = Math.floor(Math.random() * 10) + 1;

//   let currX = startX;
//   let currY = startY;
//   while (currX < max && currY < max) {
//     if (Math.random() < 0.5) {
//       currX += currY;
//     } else {
//       currY += currX;
//     }
//   }
//   return [startX, startY, currX, currY];
// }
// const maxStart = 10;
// const maxEnd = 1000000;
// for (let i = 0; i < 40; i += 1) {
//   const isRandom = Math.random() > 0.8;


//   const randomPoints = [
//     Math.floor(Math.random() * maxStart) + 1,
//     Math.floor(Math.random() * maxStart) + 1,
//     Math.floor(Math.random() * maxEnd) + maxStart,
//     Math.floor(Math.random() * maxEnd) + maxStart,
//   ]

//   const points = isRandom ? randomPoints : generateSolution();

//   logOutList(printRow(points));
// }

/*

*/

const tests = [
  [1, 1, 1000000000, 1],
  [1, 2, 3, 5],
  [4, 8, 176550432, 280120508],
  [9, 4, 161315412, 232099871],
  [6, 1, 68133305, 259619481],
  [4, 2, 216868, 465720],
  [1, 7, 116878201, 282887311],
  [3, 2, 648609, 293450],
  [4, 6, 214208434, 150628386],
  [2, 2, 197949860, 251122306],
  [7, 5, 277867600, 195675121],
  [10, 7, 68300021, 222953266],
  [7, 7, 122468822, 291340581],
  [3, 8, 92069771, 221333971],
  [4, 5, 242438, 510477],
  [9, 3, 238315566, 171397437],
  [7, 1, 164488567, 280785305],
  [7, 7, 301195202, 169193017],
  [9, 8, 183203457, 239810456],
  [6, 4, 220573924, 172813426],
  [2, 10, 83878126, 233866376],
  [6, 1, 247009703, 74776153],
  [5, 9, 293724, 31364],
  [10, 4, 159833296, 263029278],
  [2, 8, 254291190, 99320698],
  [8, 10, 148473038, 320494826],
  [10, 9, 462952, 761708],
  [2, 2, 297024764, 163212554],
  [10, 9, 302891377, 196092834],
  [4, 6, 285270292, 182020726],
  [5, 7, 250254925, 145627004],
  [8, 4, 124990120, 306409692],
  [5, 10, 63411315, 227752925],
  [4, 5, 650255, 227361],
  [4, 5, 126867285, 287368231],
  [2, 2, 219818572, 173294258],
  [3, 6, 118950684, 205016157],
  [2, 1, 256117325, 182085187],
  [9, 9, 172907532, 223046793],
  [5, 6, 335241683, 196613314],
  [9, 6, 120572538, 265997955],
  [10, 8, 77332086, 265689316],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(reachingPoints(...test));
  console.timeEnd(i);
  i += 1;
}

/*
1
2
3
5
4
8
176550432
280120508
9
4
161315412
232099871
6
1
68133305
259619481
4
2
216868
465720
1
7
116878201
282887311
3
2
648609
293450
4
6
214208434
150628386
2
2
197949860
251122306
7
5
277867600
195675121
10
7
68300021
222953266
7
7
122468822
291340581
3
8
92069771
221333971
4
5
242438
510477
9
3
238315566
171397437
7
1
164488567
280785305
7
7
301195202
169193017
9
8
183203457
239810456
6
4
220573924
172813426
2
10
83878126
233866376
6
1
247009703
74776153
5
9
293724
31364
10
4
159833296
263029278
2
8
254291190
99320698
8
10
148473038
320494826
10
9
462952
761708
2
2
297024764
163212554
10
9
302891377
196092834
4
6
285270292
182020726
5
7
250254925
145627004
8
4
124990120
306409692
5
10
63411315
227752925
4
5
650255
227361
4
5
126867285
287368231
2
2
219818572
173294258
3
6
118950684
205016157
2
1
256117325
182085187
9
9
172907532
223046793
5
6
335241683
196613314
9
6
120572538
265997955
10
8
77332086
265689316
*/
