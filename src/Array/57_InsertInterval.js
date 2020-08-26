/*
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
*/

var insert = function (intervals, newInterval) {
  const result = [];
  const [newStart, newEnd] = newInterval;
  let lastEnd = -Infinity;
  let isInserted = false;


  for (let interval of intervals) {
    if (!isInserted) {
      if (newStart <= interval[0]) {
        result.push(newInterval);
        lastEnd = newEnd;
        isInserted = true;
      } else if (newStart <= interval[1]) {
        if (newEnd > interval[1]) {
          interval[1] = newEnd;
        }

        isInserted = true;
      }
    }

    if (interval[0] > lastEnd) {
      result.push(interval);
      lastEnd = interval[1];
    } else if (interval[1] > lastEnd) {
      result[result.length - 1][1] = interval[1];
    }
  }

  if(!isInserted) result.push(newInterval);
  return result;
};

const tests = [
  [[[1, 3], [6, 9]], [2, 5]],
  [[[1,2],[3,5],[6,7],[8,10],[12,16]], [3, 19]],
  [[], [3, 19]],
];

for (let test of tests) {
  logOutList(insert(...test))
}