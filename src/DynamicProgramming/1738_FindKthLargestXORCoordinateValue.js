/*
You are given a 2D matrix of size m x n, consisting of non-negative integers. You are also given an integer k.

The value of coordinate (a, b) of the matrix is the XOR of all matrix[i][j] where 0 <= i <= a < m and 0 <= j <= b < n (0-indexed).

Find the kth largest value (1-indexed) of all the coordinates of matrix.

 

Example 1:

Input: matrix = [[5,2],[1,6]], k = 1
Output: 7
Explanation: The value of coordinate (0,1) is 5 XOR 2 = 7, which is the largest value.
Example 2:

Input: matrix = [[5,2],[1,6]], k = 2
Output: 5
Explanation: The value of coordinate (0,0) is 5 = 5, which is the 2nd largest value.
Example 3:

Input: matrix = [[5,2],[1,6]], k = 3
Output: 4
Explanation: The value of coordinate (1,0) is 5 XOR 1 = 4, which is the 3rd largest value.
Example 4:

Input: matrix = [[5,2],[1,6]], k = 4
Output: 0
Explanation: The value of coordinate (1,1) is 5 XOR 2 XOR 1 XOR 6 = 0, which is the 4th largest value.
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 1000
0 <= matrix[i][j] <= 106
1 <= k <= m * n
*/

// apparently faster to just sort the entire matrix
// also, can do matrix[i][j] ^= matrix[i-1][j] ^ matrix[i][j-1] ^ matrix[i-1][j-1]
const replace = (val, heap) => {
  heap[0] = val;
  siftDown(heap);
}

const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const siftDown = (heap) => {
  let current = 0;
  while(true) {
      const left = current * 2 + 1;
      const right = left + 1;
      let next = current;
      
      if (heap[left] < heap[next]) next = left;
      if (heap[right] < heap[next]) next = right;
      
      if(next !== current) {
          [heap[current], heap[next]] = [heap[next], heap[current]];
          current = next;
      } else break;
  }
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while(current > 0) {
      const parent = Math.ceil(current / 2) - 1;
      
      if (heap[current] < heap[parent]) {
          [heap[current], heap[parent]] = [heap[parent], heap[current]];
          current = parent;
      } else break;
  }
}

var kthLargestValue = function(matrix, k) {
  const heap = [];
  
  const coordsXOR = new Array(matrix[0].length).fill(0);
  for(let i = 0; i < matrix.length; i += 1) {
      for(let j = 0; j < matrix[0].length; j += 1) {
          matrix[i][j] ^= matrix[i][j - 1] || 0;
          coordsXOR[j] ^= matrix[i][j];
          
          if (heap.length < k) push(coordsXOR[j], heap);
          else if (coordsXOR[j] > heap[0]) replace(coordsXOR[j], heap);
      }
  }
  
  return heap[0];
};