/*
Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.



Example 1:

Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.
Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.


Constraints:

1 <= arr.length <= 10^5
1 <= arr[i] <= 10^9
0 <= k <= arr.length
*/

// by sorting
var findLeastNumOfUniqueInts = function(arr, k) {
  const counts = Object.values(arr.reduce((freq, val) => {
      freq[val] = freq[val] + 1 || 1;
      return freq;
  }, {})).sort((a,b) => a - b);



  let numElements = counts.length;

  for(let count of counts) {
      k -= count;

      if(k >= 0) numElements -= 1;
  }

  return numElements;
};


// with heap
var findLeastNumOfUniqueInts = function(arr, k) {
  const counts = Object.values(arr.reduce((freq, val) => {
      freq[val] = freq[val] + 1 || 1;
      return freq;
  }, {}));

  heapify(counts);

  let numElements = counts.length;

  while(k > 0) {
      k -= pop(counts);

      if(k >= 0) numElements -= 1;
  }

  return numElements;
};


const heapify = (arr) => {
  const start = Math.floor(arr.length / 2) - 1;

  for(let i = start; i >= 0; i -= 1) {
      siftDown(i, arr);
  }
}

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  const res = heap.pop();
  siftDown(0, heap);
  return res;
}

const siftDown = (start, heap) => {
  let curr = start;
  while(true) {
      const left = curr * 2 + 1;
      const right = left + 1;
      let next = curr;

      if(heap[next] > heap[left]) next = left;
      if(heap[next] > heap[right]) next = right;

      if(next !== curr) {
          [heap[curr], heap[next]] = [heap[next], heap[curr]];
          curr = next;
      } else break;
  }
}