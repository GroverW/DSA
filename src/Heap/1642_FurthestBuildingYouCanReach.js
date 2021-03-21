/*
You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building i to building i+1 (0-indexed),

If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

 

Example 1:


Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
Example 2:

Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7
Example 3:

Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3
 

Constraints:

1 <= heights.length <= 105
1 <= heights[i] <= 106
0 <= bricks <= 109
0 <= ladders <= heights.length
*/

var furthestBuilding = function (heights, bricks, ladders) {
  const minHeap = [];
  let laddersRemain = ladders;
  let bricksRemain = bricks;

  for (let i = 0; i < heights.length - 1; i += 1) {
    if (heights[i] >= heights[i + 1]) continue;

    const heightDiff = heights[i + 1] - heights[i];
    push(heightDiff, minHeap);

    if (laddersRemain) {
      laddersRemain -= 1;
    } else if (bricksRemain >= minHeap[0]) {
      bricksRemain -= minHeap[0];
      pop(minHeap);
    } else {
      return i;
    }
  }

  return heights.length - 1;
};

const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    if (heap[current] < heap[parent]) {
      [heap[current], heap[parent]] = [heap[parent], heap[current]];
      current = parent;
    } else break;
  }
}

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  heap.pop();
  siftDown(heap);
}

const siftDown = (heap) => {
  let current = 0;
  while (true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;

    if (heap[left] && heap[left] < heap[next]) next = left;
    if (heap[right] && heap[right] < heap[next]) next = right;

    if (next !== current) {
      [heap[current], heap[next]] = [heap[next], heap[current]];
      current = next;
    } else break;
  }
}

const tests = [
  [[4,2,7,6,9,14,12], 5, 1],
  [[4,12,2,7,3,18,20,3,19], 10, 2],
  [[14,3,19,3], 17, 0],
  [[4,12,2,7,3,18,20,3,19], 7, 2],
  [[1,5,1,2,3,4,10000], 4, 1],
]