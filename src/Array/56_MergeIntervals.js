/*
Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
*/

var merge = function(intervals) {
  if(!intervals.length) return [];
  intervals.sort((a,b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for(let i = 1; i < intervals.length; i += 1) {
      const [currStart, currEnd] = intervals[i];
      const [prevStart, prevEnd] = merged[merged.length - 1];

      if(currStart > prevEnd) {
          merged.push(intervals[i]);
      } else if(currEnd > prevEnd) {
          merged[merged.length-1][1] = currEnd;
      }
  }

  return merged;
};

var mergeLowMax = function(intervals) {
  const maxEnd = intervals.reduce((max, [_,end]) => Math.max(max, end), 0);
  const diffs = new Array(maxEnd + 1).fill(null);

  for(let [start, end] of intervals) {
      diffs[start] = diffs[start] === null ? 1 : diffs[start] + 1;
      diffs[end] = diffs[end] === null ? -1 : diffs[end] - 1;
  }
  const merged = [];
  let curr = 0;
  let start = null;
  let end = null;
  for(let i = 0; i < diffs.length; i += 1) {
      if(diffs[i] !== null) {
          curr += diffs[i];
          if(start === null) start = i;
          if(curr === 0 && end === null) {
              end = i;
              merged.push([start, end]);
              start = null;
              end = null;
          }
      }
  }

  return merged;
};