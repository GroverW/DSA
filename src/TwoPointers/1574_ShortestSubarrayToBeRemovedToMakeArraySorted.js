/*
Given an integer array arr, remove a subarray (can be empty) from arr such that the remaining elements in arr are non-decreasing.

A subarray is a contiguous subsequence of the array.

Return the length of the shortest subarray to remove.

 

Example 1:

Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray we can remove is [10,4,2] of length 3. The remaining elements after that will be [1,2,3,3,5] which are sorted.
Another correct solution is to remove the subarray [3,10,4].
Example 2:

Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Since the array is strictly decreasing, we can only keep a single element. Therefore we need to remove a subarray of length 4, either [5,4,3,2] or [4,3,2,1].
Example 3:

Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing. We do not need to remove any elements.
Example 4:

Input: arr = [1]
Output: 0
 

Constraints:

1 <= arr.length <= 10^5
0 <= arr[i] <= 10^9
*/

// just pointers

var findLengthOfShortestSubarray = function(arr) {
  let left = 0;
  
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < arr[i - 1]) break;
    left = i;
  }
  
  let minSize = arr.length - left - 1;
  for (let i = arr.length - 1; i > left; i -= 1) {
    if (i < arr.length - 1 && arr[i] > arr[i + 1]) break;
    
    while (left >= 0 && arr[left] > arr[i]) {
      left -= 1;
    }

    minSize = Math.min(minSize, i - left - 1);
  }
  
  return minSize;
};


// stack
var findLengthOfShortestSubarray = function(arr) {
  const fromLeft = [arr[0]];
  
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < arr[i - 1]) break;
    fromLeft.push(arr[i]);
  }
  
  let minSize = arr.length - fromLeft.length;
  for (let i = arr.length - 1; i >= fromLeft.length; i -= 1) {
    if(i < arr.length - 1 && arr[i] > arr[i + 1]) break;
    
    while (fromLeft.length && fromLeft[fromLeft.length - 1] > arr[i]) {
      fromLeft.pop();
    }

    minSize = Math.min(minSize, i - fromLeft.length);
  }
  
  return minSize;
};



// binary search but this obviously can be improved
var findLengthOfShortestSubarray2 = function(arr) {
  const fromRight = [arr[arr.length - 1]];
  
  for (let i = arr.length - 2; i >= 0; i -= 1) {
    if (arr[i] > arr[i + 1]) break;
    fromRight.push(arr[i]);
  }
  
  let minSize = arr.length - 1;
  for (let i = 0; i < arr.length - fromRight.length; i += 1) {
    if(i > 0 && arr[i] < arr[i - 1]) break;
    
    const numMatched = getNumMatches(fromRight, arr[i]);
    const size = arr.length - i - numMatched - 1;
    
    if (!numMatched || size >= minSize) {
      return minSize;
    }
    
    minSize = size;
  }
  
  return minSize;
};

const getNumMatches = (arr, target) => {
  if (arr[0] < target) return 0;
  
  let left = 0;
  let right = arr.length - 1;
  let mid = left;
  
  while(left < right) {
    mid = Math.ceil((left + right) / 2);
    
    if (arr[mid] < target) {
      right = mid - 1;
    } else {
      left = mid;
    }
  }
  
  return right + 1;
}

const tests: Indexable<any>[] = [
  [58,68,54,45,52,21,33,35,54,22,58,13,67,31,25,66,27,75,57,81,30,44,22,45,34,21,8,11,82,60,37,35,3,44,31,80,40,74,1,2,47],
  [1,2,3,10,4,2,3,5],
  [5,4,3,2,1],
  [1,2,3],
  [1],
  [1,2,1,1,1,2],
  [1,2,3,1,2,3,1,2,3],
  [1,2,3,4,3,4,5,6],
];

let i: number = 0;
for (let test of tests) {
  console.time(i);
  logOutList(findLengthOfShortestSubarray(test))
  console.timeEnd(i);
  i += 1;

}