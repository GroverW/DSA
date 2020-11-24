/*
You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]
Example 3:

Input: nums = [1,-1], k = 1
Output: [1,-1]
Example 4:

Input: nums = [9,11], k = 2
Output: [11]
Example 5:

Input: nums = [4,-2], k = 2
Output: [4]
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
1 <= k <= nums.length
*/

// with stack (way faster and simpler)
var maxSlidingWindow = function (nums, k) {
  const stack = [];
  const result = [];

  for (let i = 0; i < nums.length; i += 1) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }

    stack.push(i);

    if (i >= k - 1) {
      if (stack[0] <= i - k) stack.shift();
      result.push(nums[stack[0]]);
    }
  }

  return result;
};


// with heap and linked list (to be improved w/ map)
var maxSlidingWindow = function (nums, k) {
  const list = new LinkedList();
  const heap = [];
  const output = [];
  for (let i = 0; i < nums.length; i += 1) {
    list.push(nums[i]);
    push(list.head, heap);
    if (list.size > k) {
      const node = list.pop();
      popFrom(node.idx, heap);
    }
    if (list.size === k) output.push(heap[0].val);
  }

  return output;
};

class Node {
  constructor(val) {
    this.val = val;
    this.idx = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.tail = null;
    this.head = null;
    this.size = 0;
  }

  push(val) {
    const node = new Node(val);
    if (!this.tail) this.tail = node;

    if (!this.head) this.head = node;
    else {
      this.head.next = node;
      this.head = node;
    }

    this.size += 1;
  }

  pop() {
    const node = this.tail;
    this.tail = this.tail.next;
    node.next = null;
    this.size -= 1;
    return node;
  }
}

const push = (node, heap) => {
  heap.push(node);
  node.idx = heap.length - 1;
  siftUp(node.idx, heap);
}

const popFrom = (index, heap) => {
  const last = heap.length - 1;
  if (index === last) return heap.pop();
  heap[last].idx = index;
  [heap[index], heap[last]] = [heap[last], heap[index]];
  heap.pop();
  const parent = Math.max(0, Math.ceil(index / 2) - 1);
  heap[index].val > heap[parent].val
    ? siftUp(index, heap)
    : siftDown(index, heap);
}

const siftUp = (start, heap) => {
  let current = start;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    let next = current;

    if (heap[next].val > heap[parent].val) next = parent;

    if (next !== current) {
      heap[current].idx = next;
      heap[next].idx = current;
      [heap[next], heap[current]] = [heap[current], heap[next]];
      current = next;
    } else break;
  }
}

const siftDown = (start, heap) => {
  let current = start;
  while (true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;

    if (heap[left] && heap[left].val > heap[next].val) next = left;
    if (heap[right] && heap[right].val > heap[next].val) next = right;

    if (next !== current) {
      heap[current].idx = next;
      heap[next].idx = current;
      [heap[next], heap[current]] = [heap[current], heap[next]];
      current = next;
    } else break;
  }
}

// for (let i = 0; i < 10; i += 1) {
//   const length = Math.floor(Math.random() * 100) + 1;

//   const nums = new Array(length).fill(0)
//     .map(() => Math.floor(Math.random() * 1000) + 1);

//   const k = Math.floor(Math.random() * length) + 1

//   logOutList(printRow([nums, k]))
// }

const tests = [
  [[1, 3, -1, -3, 5, 3, 6, 7], 3],
  [[1], 1],
  [[1, -1], 1],
  [[9, 11], 2],
  [
    [847, 170, 900, 999, 710, 748, 676, 173, 856, 55, 995, 208, 796, 205, 976, 502, 646, 474, 210, 956, 646, 459, 202, 152, 771, 282, 433, 699, 48, 635, 391, 615, 694, 363, 223, 720, 638, 308, 95, 135, 186, 663, 309, 390, 349, 416, 384, 271, 280, 522],
    15
  ],
  [
    [307, 418, 334],
    3
  ],
  [
    [96, 605, 367, 506, 597, 560, 929, 376, 938, 878, 177, 337, 806, 197, 707, 997],
    5
  ],
  [
    [358, 518, 456, 838, 30, 262, 348, 14, 909],
    3
  ],
  [
    [432, 496, 516, 827, 987, 939, 732, 931, 840, 173, 964, 463, 772, 991, 526, 45, 68, 600, 566, 709, 998, 281, 742, 330, 517, 539, 892, 851, 802, 784, 636, 207, 602, 244, 343, 955],
    10
  ],
  [
    [15, 621, 772, 322, 937, 36, 599, 590, 310, 218, 745, 386, 923, 328, 918, 687, 597, 432, 698, 22, 537, 936, 199, 689, 821, 477, 899, 62, 937, 557, 672, 378, 143, 856, 450, 47, 142, 237, 874, 391, 120, 322, 385, 36, 328, 633, 763, 314, 890, 129, 932, 6, 99, 859, 670, 457, 846, 632, 173, 99, 698],
    37
  ],
  [
    [115, 237, 783, 134, 751, 225, 953, 985, 87, 411, 409, 500, 116, 884, 704, 736, 320, 548, 252, 684, 574, 719, 616, 587, 114, 622, 403, 269, 253, 392, 594, 601],
    27
  ],
  [
    [764, 875, 179, 132, 612, 642, 485, 487, 579, 381, 827, 912, 784, 800, 570, 629, 422, 821, 322, 688, 523, 968, 364, 343, 246, 715, 533, 561, 329, 587, 169, 890, 790, 297, 371, 352, 249, 442, 978],
    21
  ],
  [
    [310, 247, 510, 471, 70, 866, 279, 530, 830, 616, 876, 313, 931, 273, 639, 169, 724, 855, 755, 135, 918, 576, 415, 882, 672, 617, 635, 641, 766, 358, 381, 207, 477, 811, 141, 17, 468, 654, 117, 571, 481, 420, 241, 429, 295, 62, 868, 171, 918, 515, 848],
    3
  ],
  [
    [988, 366, 758, 927, 736, 533, 767, 789, 490, 97, 432, 789, 652, 362, 440, 868, 956, 574, 217, 590, 430, 477, 893, 748, 910, 52, 911, 836, 934, 291, 212, 974, 988, 409, 420, 610, 665, 504, 147, 860, 151, 497, 185, 613, 632, 845, 908, 503, 761, 213, 735, 500, 738, 793, 120, 532, 466, 8, 784, 514, 177, 221, 987, 860, 521, 528, 686, 769, 865, 470, 962, 347, 832, 405, 967, 96, 636, 345, 316, 515, 863, 917, 688, 246, 810, 23],
    48
  ],

];

for (let test of tests) {
  logOutList(printRow(maxSlidingWindow(...test)));
}
