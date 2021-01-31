/*
Implement FreqStack, a class which simulates the operation of a stack-like data structure.

FreqStack has two functions:

push(int x), which pushes an integer x onto the stack.
pop(), which removes and returns the most frequent element in the stack.
If there is a tie for most frequent element, the element closest to the top of the stack is removed and returned.
 

Example 1:

Input: 
["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
Output: [null,null,null,null,null,null,null,5,7,5,4]
Explanation:
After making six .push operations, the stack is [5,7,5,7,4,5] from bottom to top.  Then:

pop() -> returns 5, as 5 is the most frequent.
The stack becomes [5,7,5,7,4].

pop() -> returns 7, as 5 and 7 is the most frequent, but 7 is closest to the top.
The stack becomes [5,7,5,4].

pop() -> returns 5.
The stack becomes [5,7,4].

pop() -> returns 4.
The stack becomes [5,7].
 

Note:

Calls to FreqStack.push(int x) will be such that 0 <= x <= 10^9.
It is guaranteed that FreqStack.pop() won't be called if the stack has zero elements.
The total number of FreqStack.push calls will not exceed 10000 in a single test case.
The total number of FreqStack.pop calls will not exceed 10000 in a single test case.
The total number of FreqStack.push and FreqStack.pop calls will not exceed 150000 across all test cases.
*/

// map of stacks O(1)
var FreqStack = function() {
  this.frequencies = {};
  this.groups = new Map();    
  this.maxFreq = 0;
};

/** 
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function(x) {
    const freq = this.frequencies[x] + 1 || 1;
    const group = this.groups.get(freq) || [];
    group.push(x);
    this.groups.set(freq, group);
    this.frequencies[x] = freq;
    this.maxFreq = Math.max(this.maxFreq, freq);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
    const group = this.groups.get(this.maxFreq);
    const res = group.pop();
    this.frequencies[res] -= 1;
    if (!group.length) this.maxFreq -= 1;
    return res;
};


// using heap (slow, too much code) O(log k)
class StackNode {
  constructor(val, idx) {
    this.idx = idx;
    this.val = val;
    this.locations = [];
  }

  get freq() {
    return this.locations.length;
  }

  get last() {
    return this.locations[this.locations.length - 1];
  }

  push(location) {
    this.locations.push(location);
  }

  pop() {
    this.locations.pop();
    return this.val;
  }
}

var FreqStack = function () {
  this.nodes = {};
  this.heap = [];
  this.next = 0;
};

/** 
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function (x) {
  let node = this.nodes[x];

  if (!node) {
    node = new StackNode(x, this.heap.length);
    this.nodes[x] = node;
    this.heap.push(node)
  }

  node.push(this.next);
  this.next += 1;
  this.siftUp(node.idx)
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  const node = this.heap[0];
  const res = node.pop();

  if (!node.freq) {
    const last = this.heap.length - 1;
    [this.heap[0], this.heap[last]] = [this.heap[last], this.heap[0]];
    this.heap[0].idx = 0;
    this.heap.pop();
    delete this.nodes[res];
  }

  this.siftDown();
  return res;
};

FreqStack.prototype.siftUp = function (start) {
  let current = start;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;

    if (
      this.heap[parent].freq > this.heap[current].freq
      || (
        this.heap[parent].freq === this.heap[current].freq
        && this.heap[parent].last > this.heap[current].last
      )
    ) break;

    this.heap[current].idx = parent;
    this.heap[parent].idx = current;
    [this.heap[current], this.heap[parent]] = [this.heap[parent], this.heap[current]];
    current = parent;
  }
}

FreqStack.prototype.siftDown = function () {
  let current = 0;
  while (true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;

    if (
      this.heap[left]
      && (
        this.heap[left].freq > this.heap[next].freq
        || (this.heap[left].freq === this.heap[next].freq
            && this.heap[left].last > this.heap[next].last)
      )
    ) next = left;
    if (
      this.heap[right]
      && (
        this.heap[right].freq > this.heap[next].freq
        || (this.heap[right].freq === this.heap[next].freq
            && this.heap[right].last > this.heap[next].last)
      )
    ) next = right;

    if (next !== current) {
      this.heap[current].idx = next;
      this.heap[next].idx = current;
      [this.heap[current], this.heap[next]] = [this.heap[next], this.heap[current]];
      current = next;
    } else break;
  }
}

// const maxLen = 100;
// for (let i = 0; i < 50; i += 1) {

//   const len = Math.floor(Math.random() * maxLen) + 1;

//   const commands = ['FreqStack'];
//   const actions = [[]];

//   let pushCount = 0;
//   let popCount = 0;

//   for (let j = 0; j < len; j += 1) {
//     if (pushCount <= popCount || Math.random() > .4) {
//       const num = Math.floor(Math.random() * 15);
//       commands.push('push');
//       actions.push([num]);
//       pushCount += 1;
//     } else {
//       commands.push('pop');
//       actions.push([]);
//       popCount += 1;
//     }
//   }


//   // logOutList('"' + fixed + '",')
//   logOutList(printRow([commands, actions]) + ',')
//   // logOutList(printRow([fixed]) + ',');
//   // logOutList(n);
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"],
  [[], [5], [7], [5], [7], [4], [5], [], [], [], []]],
  [["FreqStack", "push", "push", "push", "push", "pop", "pop", "push", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "pop"], [[], [2], [10], [5], [12], [], [], [4], [], [], [], [9], [], [10], [], [8], [3], [4], [], [], [], [11], [9], [9], [], [6], [7], [2], [], [2], [8], [4], [11], [], [], [], []]],
  [["FreqStack", "push", "push", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push"], [[], [0], [12], [12], [1], [12], [], [9], [], [], [8], [], [], [1], [12], [], [4], [], [11], [12], [12], [], [], [11], [4], [0], [3], [], [10], [14], [5], [], [10], [], [], [0], [0], [14], [], [], [8], [], [], [], [1], [2], [10], [], [8]]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "push", "pop", "push", "push", "push", "pop"], [[], [12], [], [4], [], [7], [1], [6], [1], [], [], [], [4], [14], [3], [], [5], [8], [], [], [11], [], [1], [9], [], [9], [10], [1], []]],
  [["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "push"], [[], [14], [4], [10], [6], [13], [2], [], [10], [1], [2], [], [3], [], [4], [4], [], [13], [8], [1], [], [5], [8], [13], [2], [11], [12], [2], [], [12], [], [10], [9], [], [3], [5], [12], [], [9], [], [], [9], [2], [], [14], [11], [], [], [5], [3], [7], [4], [0], [5]]],
  [["FreqStack", "push"], [[], [0]]],
  [["FreqStack", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "pop", "pop", "pop", "pop", "pop", "push", "push", "pop", "push"], [[], [10], [9], [2], [], [], [], [5], [], [12], [], [9], [], [7], [], [6], [], [5], [], [3], [7], [], [], [10], [6], [], [], [9], [10], [], [12], [12], [4], [], [], [14], [4], [13], [], [], [6], [9], [6], [], [], [0], [4], [2], [], [13], [], [0], [], [], [], [], [], [], [], [10], [9], [], [10]]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push"], [[], [5], [], [10], [], [3], [9], [3], [], [2], [6], [], [9], [13], [], [], [], [4], [7], [13], [], [0]]],
  [["FreqStack", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "pop", "pop", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop"], [[], [9], [], [13], [13], [13], [], [8], [10], [], [13], [6], [7], [6], [10], [], [11], [8], [0], [], [12], [7], [13], [], [9], [7], [7], [13], [], [4], [], [], [], [4], [10], [], [], [2], [], [14], [], [4], [], [7], [8], [], [], [], [11], [1], [1], [], [], [2], [9], [14], [], [4], [8], [2], [], [0], [6], [4], [2], []]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "pop"], [[], [5], [], [2], [], [14], [], [12], [], [6], [4], [6], [14], [], [], [5], [4], [], [], [10], [6], [8], [], [9], [8], [13], [], []]],
  [["FreqStack", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "pop", "push"], [[], [0], [14], [], [], [7], [0], [3], [7], [10], [], [5], [], [7], [14], [], [], [12], [], [], [1], [12], [], [3]]],
  [["FreqStack", "push", "push", "push", "push", "push", "pop"], [[], [9], [14], [7], [5], [2], []]],
  [["FreqStack", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "pop"], [[], [2], [9], [10], [11], [], [], [12], [0], [], [10], [], [2], [], [4], [4], [], [9], [], [], [1], [6], [4], [], [], []]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop"], [[], [0], [], [1], [], [9], [], [7], [7], [14], [], [8], [12], [14], [11], [1], [2], [14], [5], [9], [], [7], [6], [], [6], [], [], [7], [], [], [7], [10], [6], [9], [], [5], [2], [], [], [10], [], [], [11], [9], [6], [11], [3], [3], [7], [], [3], [], [1], [10], [14], []]],
  [["FreqStack", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "push", "pop", "pop", "push"], [[], [7], [14], [11], [], [7], [13], [3], [4], [], [], [7], [7], [9], [11], [], [0], [12], [2], [], [], [12], [0], [10], [3], [], [], [8], [8], [11], [9], [2], [12], [], [8], [1], [6], [14], [], [14], [], [13], [], [], [11], [9], [13], [], [6], [12], [7], [], [14], [], [], [], [2], [6], [10], [11], [10], [12], [7], [6], [], [6], [], [5], [], [], [], [0], [], [14], [], [0], [2], [1], [6], [11], [9], [], [2], [13], [0], [0], [5], [], [2], [], [], [0]]],
  [["FreqStack", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop"], [[], [10], [], [12], [13], [], [0], [5], [2], [10], [], []]],
  [["FreqStack", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "pop", "push", "push", "push", "push"], [[], [3], [7], [12], [3], [], [], [2], [10], [], [2], [10], [7], [], [3], [12], [13], [], [], [3], [], [11], [], [], [3], [], [0], [], [13], [9], [14], [3], [], [12], [6], [], [], [13], [], [8], [2], [14], [14], [2], [9], [], [], [], [7], [5], [9], [], [0], [], [], [13], [], [13], [], [3], [6], [], [8], [1], [], [8], [4], [12], [3]]],
  [["FreqStack", "push", "push", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "push"], [[], [7], [11], [10], [9], [3], [], [5], [], [], [9], [], [13], [], [4], [5], [0], [5], [], [], [12], [], [14], [14], [0], [], [], [0], [5], [5], [4], [10], [1], [], [14], [], [2], [12], [13], [4], [], [9], [8], [8], [7], [], [], [11], [12], [], [], [10], [], [11], [12]]],
  [["FreqStack", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "pop", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "push"], [[], [5], [11], [], [2], [], [13], [1], [], [11], [], [8], [8], [12], [], [8], [], [11], [14], [8], [8], [11], [], [], [], [], [], [9], [], [9], [5], [], [], [], [6], [0], [8], [11], [], [11], [], [12], [6], [11]]],
  [["FreqStack", "push", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "pop", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "pop", "push", "pop", "pop", "pop", "pop", "push", "pop", "push", "push", "push", "pop"], [[], [6], [14], [], [8], [], [13], [], [6], [], [5], [], [3], [13], [3], [], [], [], [4], [12], [14], [8], [], [], [], [9], [], [], [], [13], [3], [], [13], [0], [7], [7], [], [2], [12], [14], [10], [], [4], [11], [], [], [], [], [3], [8], [11], [], [], [1], [13], [9], [], [], [], [5], [9], [7], [11], [7], [], [9], [12], [5], [], [], [12], [13], [], [], [7], [10], [1], [13], [0], [], [12], [], [], [], [], [12], [], [13], [9], [6], []]],
  [["FreqStack", "push", "push", "push", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "push"], [[], [8], [10], [5], [1], [3], [], [5], [13], [], [], [], [], [11], [1], [4], [11], [], [2], [6], [5], [5], [2], [], [], [11], [12], [], [], [1], [14], [0], [11], [13], [13], [6], [], [], [11], [1], [], [1], [], [], [8], [14], [6], [], [11], [], [13], [10], [13], [14], [], [12], [1], [13], [13], [3], [12], [2], [], [8], [12], [3], [7], [], [], [13], [10], [10], [0], [], [3], [], [], [4], [], [], [1], [], [], [3], [], [], [4], [], [], [9], [6], [8], [4], [], [], [], [4]]],
  [["FreqStack", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "push", "push", "push", "push", "push"], [[], [7], [7], [3], [2], [], [9], [3], [4], [9], [], [12], [8], [], [12], [], [9], [1], [3], [], [14], [0], [9], [], [13], [12], [13], [8], [1], [9], [], [], [], [13], [], [10], [6], [11], [5], [13]]],
  [["FreqStack", "push", "push", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop"], [[], [4], [13], [0], [], [10], [], [14], [], [7], [], [4], [], [6], [], [10], [], [], [], [4], [], [14], [], [6], [], [2], [], [14], [7], [], [], [8], [], [14], [], [9], [], [6], [], [4], [0], [], [], [2], [4], [9], [], [12], [], [14], [], [5], [12], [], [], [2], [], [12], [], [], [1], [], [4], [], [], [14], [1], [4], [], [], [6], [4], [], [], [8], [10], [0], [13], [], []]],
  [["FreqStack", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "push", "push", "push"], [[], [5], [], [6], [5], [], [], [5], [3], [8], [], [], [3], [1], [], [9], [6], [6], [14], [], [2], [1], [0], [5], [13], [1], [9], [13], [0], [6], [], [10], [7], [3], [], [9], [10], [], [], [], [11], [], [], [12], [14], [], [0], [2], [3], [], [2], [], [], [8], [13], [], [0], [7], [], [], [5], [7], [5], [8], [], [], [], [], [8], [], [0], [], [], [12], [1], [9], [0], [13]]],
  [["FreqStack", "push", "push", "push", "push", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "pop"], [[], [4], [13], [14], [7], [], [12], [9], [], [], [3], [4], [], [10], [13], [], [4], [10], [4], [9], [], [], [2], [], [0], [], [], []]],
  [["FreqStack", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "push", "push", "pop", "pop", "pop", "pop", "push", "pop", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push"], [[], [9], [2], [0], [], [1], [], [10], [5], [14], [5], [3], [5], [10], [0], [6], [5], [4], [1], [0], [], [], [], [], [12], [11], [], [], [], [], [11], [], [], [], [6], [11], [], [], [6], [8], [], [], [9], [], [12], [], [], [13], [], [3], [], [2], [], [10], [10], [], [9], [4], [], [], [], [], [], [], [6], [], [8], [], [1], [], [13], [13], [13], [12], [], [7], [], [6], [4], [6], [], [6], [], [3]]],
  [["FreqStack", "push", "push", "pop", "pop", "push", "push", "pop"], [[], [6], [4], [], [], [0], [13], []]],
  [["FreqStack", "push", "push", "push", "push", "push", "pop", "pop", "push", "pop", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "pop"], [[], [12], [13], [7], [12], [2], [], [], [9], [], [], [], [], [6], [8], [8], [], [2], [6], [], [6], [], [10], [], [], [6], [8], [14], [6], [7], [], [], [13], [6], [10], [], [], []]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "pop", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "push", "push", "pop"], [[], [2], [], [12], [], [3], [12], [12], [5], [], [], [10], [], [2], [], [14], [11], [], [10], [1], [0], [], [1], [], [], [11], [14], [], [5], [3], [3], [], [4], [11], [7], [6], [], [3], [], [], [5], [], [], [8], [7], [14], [3], [1], [5], [9], [7], [0], [8], [], [], [], [13], [5], [6], [], [], [], [], [], [5], [4], [10], [14], [], [14], [0], [13], [], [], [], [0], [], [11], [1], []]],
  [["FreqStack", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push"], [[], [2], [], [8], [9], [9], [11], [], [], [6], [4], [], [11]]],
  [["FreqStack", "push", "push", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop"], [[], [1], [3], [5], [], [13], [], [], [6], [7], [], [], [7], [], [10], [8], [2], [1], [], [7], [0], []]],
  [["FreqStack", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push"], [[], [8], [13], [], [6], [4], [5], [], [14], [], [10], [5], [8], [9], [], [], [12], [], [], [8], [11], [], [], [4], [13], [], [], [6]]],
  [["FreqStack", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "pop"], [[], [1], [9], [], [4], [3], [6], [14], [9], [13], [12], [], [], [], [1], [], [5], [], [8], [3], [7], [7], [1], [11], [10], [11], [5], [1], [11], [6], [8], [9], [], [8], [3], [], [13], [10], [], [], [0], [10], [0], [1], [11], []]],
  [["FreqStack", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "pop"], [[], [4], [3], [], [4], [], [1], [], [], [0], [10], [], [], [8], [], [10], [2], [10], [], [7], [], [], [2], [], [2], [], [], [0], [13], [], [3], [12], [7], [5], [], [], [1], [9], [13], [11], [], [], [14], [], [8], [14], [5], [13], [], [8], [6], [], [10], [11], [12], [9], [], [0], [], [8], [13], [], [8], [], [], []]],
  [["FreqStack", "push", "push", "pop", "pop", "push", "push", "pop", "push", "pop"], [[], [13], [3], [], [], [1], [10], [], [9], []]],
  [["FreqStack", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "push", "push", "push", "push", "pop", "push"], [[], [5], [0], [], [4], [2], [13], [], [5], [14], [], [12], [11], [5], [14], [], [], [1], [5], [], [11], [10], [], [], [], [3], [0], [10], [12], [8], [11], [], [], [], [], [], [2], [13], [14], [11], [], [14], [12], [9], [1], [6], [], [14], [], [1], [9], [], [], [6], [], [], [], [4], [8], [11], [6], [], [2], [12], [5], [4], [0], [5], [3], [9], [], [6], [], [], [2], [], [6], [], [], [3], [12], [1], [7], [], [5]]],
  [["FreqStack", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "push", "pop", "push", "push", "pop", "push", "push", "push", "pop", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push"], [[], [6], [], [13], [5], [9], [9], [], [3], [9], [3], [6], [3], [11], [11], [], [2], [1], [3], [], [], [6], [12], [], [3], [], [], [5], [3], [], [10], [12], [14], [], [12], [7], [2], [2], [6], [9], [13], [], [], [12], [], [13], [3], [], [11], [11], [3], [], [], [1], [], [4], [10], [12], [0], [], [2], [], [], [], [14], [9], [0], [], [13], [], [13], [8], [], [13], [8], [9], [14], [1], [7], [8], [3], [2], [4], [], [3], [4], [7], [], [0], [10]]],
  [["FreqStack", "push", "pop", "push", "push", "push", "pop", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "push"], [[], [7], [], [8], [6], [4], [], [], [8], [], [10], [5], [], [], [13], [], [10], [], [11], [3]]],
  [["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "pop"], [[], [10], [6], [8], [9], [12], [3], [], [], [2], [12], [], [], [11], [6], [3], [], [], [1], [7], [6], [3], [1], [], [], [], [], []]],
  [["FreqStack", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "push"], [[], [2], [11], [], [], [1], [6], [3], [], [], [], [14], [6], [], [], [1], [1], [], [], [11], [1], [], [5], [], [], [5], [], [14], [4]]],
  [["FreqStack", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "pop", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push"], [[], [5], [], [11], [7], [13], [], [3], [12], [5], [], [9], [10], [], [6], [12], [], [12], [], [10], [], [11], [], [], [], [11], [], [1], [], [10], [10], [], [5], [], [1], [1], [], [0], [], [9], [], [], [], [13], [5], [1], [14], [], [6], [], [3], [12], [3], [], [11], [], [14], [14], [8], [10], [1], [2], [7], [7], [12]]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "push", "push", "push"], [[], [14], [], [9], [], [12], [14], [8], [], [13], [4], [], [], [], [10], [12], [10], [3], [10], [], [14], [13], [], [2], [13], [1], [2], [14]]],
  [["FreqStack", "push", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "push", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "pop", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "push"], [[], [6], [], [13], [2], [], [], [3], [9], [], [9], [3], [3], [14], [1], [], [6], [10], [], [4], [9], [], [], [3], [11], [13], [], [9], [13], [14], [], [11], [10], [10], [13], [], [], [13], [0], [], [], [8], [10], [1], [], [], [], [5], [], [2], [1], [], [], [8], [], [], [3], [13], [], [], [], [], [9], [13], [2], [], [13], [2], [2], [], [11], [3]]],
  [["FreqStack", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "pop", "pop", "pop", "pop", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "push", "pop", "pop", "push"], [[], [1], [14], [12], [11], [6], [], [7], [], [5], [], [6], [], [0], [0], [], [], [], [9], [9], [12], [], [], [], [], [], [], [10], [], [7], [10], [3], [14], [7], [11], [10], [], [12], [], [1], [8], [1], [], [1], [5], [3], [13], [9], [], [6], [1], [], [5], [], [11], [0], [10], [0], [3], [1], [7], [8], [], [], [10], [], [], [2]]],
  [["FreqStack", "push", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "pop", "push", "pop", "pop", "push", "push", "push", "push", "push", "pop", "pop", "push"], [[], [6], [], [12], [5], [], [1], [], [3], [4], [10], [], [], [2], [14], [9], [], [], [], [5], [], [], [6], [], [], [12], [8], [7], [2], [12], [], [], [3]]],
  [["FreqStack", "push", "pop", "push", "push", "push", "pop", "push", "pop", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "pop", "push", "pop", "pop", "pop", "pop", "pop", "push", "pop", "push"], [[], [12], [], [1], [10], [13], [], [3], [], [], [], [2], [4], [], [13], [], [4], [13], [3], [0], [8], [], [2], [], [], [], [], [], [3], [], [9]]],
  [["FreqStack", "push", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "pop", "pop", "pop", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "push", "pop", "pop", "pop", "pop", "push", "pop", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "push", "pop", "pop", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "push", "pop", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "push", "pop", "pop"], [[], [12], [1], [], [0], [6], [7], [], [10], [13], [12], [11], [], [8], [7], [4], [], [1], [], [13], [6], [2], [], [4], [], [11], [], [], [], [], [3], [8], [], [13], [], [], [7], [0], [], [], [], [], [5], [], [], [2], [], [], [], [12], [1], [11], [1], [], [], [6], [], [7], [], [], [], [0], [4], [12], [], [1], [6], [8], [13], [4], [], [], [], [3], [4], [], [14], [], [12], [9], [0], [6], [], [], [7], [], []]],
  [["FreqStack", "push", "pop", "push", "push", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "push", "push", "pop", "push", "pop", "push", "pop", "push", "push", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop", "push", "push", "push", "pop", "pop", "push", "pop"], [[], [2], [], [12], [5], [], [], [5], [6], [9], [], [], [7], [2], [12], [5], [], [], [6], [6], [], [0], [], [13], [7], [7], [], [5], [], [1], [], [14], [11], [9], [9], [9], [], [], [0], [13], [3], [8], [], [], [], [0], [], [12], [8], [11], [11], [], [], [], [9], [4], [9], [5], [], [], [], [], [6], [], [3], [8], [8], [6], [5], [13], [11], [2], [8], [], [], [], [], [11], [10], [10], [], [], [5], []]],
  [["FreqStack", "push", "pop", "push", "pop", "push", "pop", "push", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "pop"], [[], [14], [], [9], [], [6], [], [7], [10], [], [4], [14], [], [0], [], [], []]],
  [["FreqStack", "push", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "pop", "pop", "push", "push", "push", "push", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "pop", "push", "pop", "push", "push", "push", "push", "pop", "push", "push", "pop", "pop", "push", "push", "pop", "pop", "push", "push"], [[], [13], [], [3], [10], [1], [], [5], [7], [], [12], [], [], [], [], [13], [1], [0], [12], [], [10], [], [11], [0], [], [5], [], [], [], [12], [], [10], [3], [7], [14], [], [11], [12], [], [], [3], [6], [], [], [3], [6]]],
  [["FreqStack", "push", "push", "pop", "pop", "push", "push", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "pop", "push", "pop", "pop", "push", "pop", "push", "push", "push", "pop", "pop", "pop", "push", "pop", "pop", "push", "pop", "push", "push", "push", "push", "push", "push", "push"], [[], [11], [0], [], [], [9], [10], [9], [], [11], [10], [], [4], [], [], [11], [], [5], [], [9], [], [], [4], [], [8], [8], [5], [], [], [], [10], [], [], [14], [], [6], [9], [5], [7], [3], [7], [6]]],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  const freqStack = new FreqStack();

  const res = [];

  for (let i = 1; i < test[0].length; i += 1) {
    const command = test[0][i];
    const action = test[1][i];
    res.push(freqStack[command](...action));
  }
  logOutList(printRow(res.map((val) => val === undefined ? null : val)));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*

["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
["FreqStack","push","push","push","push","pop","pop","push","pop","pop","pop","push","pop","push","pop","push","push","push","pop","pop","pop","push","push","push","pop","push","push","push","pop","push","push","push","push","pop","pop","pop","pop"]
[[],[2],[10],[5],[12],[],[],[4],[],[],[],[9],[],[10],[],[8],[3],[4],[],[],[],[11],[9],[9],[],[6],[7],[2],[],[2],[8],[4],[11],[],[],[],[]]
["FreqStack","push","push","push","push","push","pop","push","pop","pop","push","pop","pop","push","push","pop","push","pop","push","push","push","pop","pop","push","push","push","push","pop","push","push","push","pop","push","pop","pop","push","push","push","pop","pop","push","pop","pop","pop","push","push","push","pop","push"]
[[],[0],[12],[12],[1],[12],[],[9],[],[],[8],[],[],[1],[12],[],[4],[],[11],[12],[12],[],[],[11],[4],[0],[3],[],[10],[14],[5],[],[10],[],[],[0],[0],[14],[],[],[8],[],[],[],[1],[2],[10],[],[8]]
["FreqStack","push","pop","push","pop","push","push","push","push","pop","pop","pop","push","push","push","pop","push","push","pop","pop","push","pop","push","push","pop","push","push","push","pop"]
[[],[12],[],[4],[],[7],[1],[6],[1],[],[],[],[4],[14],[3],[],[5],[8],[],[],[11],[],[1],[9],[],[9],[10],[1],[]]
["FreqStack","push","push","push","push","push","push","pop","push","push","push","pop","push","pop","push","push","pop","push","push","push","pop","push","push","push","push","push","push","push","pop","push","pop","push","push","pop","push","push","push","pop","push","pop","pop","push","push","pop","push","push","pop","pop","push","push","push","push","push","push"]
[[],[14],[4],[10],[6],[13],[2],[],[10],[1],[2],[],[3],[],[4],[4],[],[13],[8],[1],[],[5],[8],[13],[2],[11],[12],[2],[],[12],[],[10],[9],[],[3],[5],[12],[],[9],[],[],[9],[2],[],[14],[11],[],[],[5],[3],[7],[4],[0],[5]]
["FreqStack","push"]
[[],[0]]
["FreqStack","push","push","push","pop","pop","pop","push","pop","push","pop","push","pop","push","pop","push","pop","push","pop","push","push","pop","pop","push","push","pop","pop","push","push","pop","push","push","push","pop","pop","push","push","push","pop","pop","push","push","push","pop","pop","push","push","push","pop","push","pop","push","pop","pop","pop","pop","pop","pop","pop","push","push","pop","push"]
[[],[10],[9],[2],[],[],[],[5],[],[12],[],[9],[],[7],[],[6],[],[5],[],[3],[7],[],[],[10],[6],[],[],[9],[10],[],[12],[12],[4],[],[],[14],[4],[13],[],[],[6],[9],[6],[],[],[0],[4],[2],[],[13],[],[0],[],[],[],[],[],[],[],[10],[9],[],[10]]
["FreqStack","push","pop","push","pop","push","push","push","pop","push","push","pop","push","push","pop","pop","pop","push","push","push","pop","push"]
[[],[5],[],[10],[],[3],[9],[3],[],[2],[6],[],[9],[13],[],[],[],[4],[7],[13],[],[0]]
["FreqStack","push","pop","push","push","push","pop","push","push","pop","push","push","push","push","push","pop","push","push","push","pop","push","push","push","pop","push","push","push","push","pop","push","pop","pop","pop","push","push","pop","pop","push","pop","push","pop","push","pop","push","push","pop","pop","pop","push","push","push","pop","pop","push","push","push","pop","push","push","push","pop","push","push","push","push","pop"]
[[],[9],[],[13],[13],[13],[],[8],[10],[],[13],[6],[7],[6],[10],[],[11],[8],[0],[],[12],[7],[13],[],[9],[7],[7],[13],[],[4],[],[],[],[4],[10],[],[],[2],[],[14],[],[4],[],[7],[8],[],[],[],[11],[1],[1],[],[],[2],[9],[14],[],[4],[8],[2],[],[0],[6],[4],[2],[]]
["FreqStack","push","pop","push","pop","push","pop","push","pop","push","push","push","push","pop","pop","push","push","pop","pop","push","push","push","pop","push","push","push","pop","pop"]
[[],[5],[],[2],[],[14],[],[12],[],[6],[4],[6],[14],[],[],[5],[4],[],[],[10],[6],[8],[],[9],[8],[13],[],[]]
["FreqStack","push","push","pop","pop","push","push","push","push","push","pop","push","pop","push","push","pop","pop","push","pop","pop","push","push","pop","push"]
[[],[0],[14],[],[],[7],[0],[3],[7],[10],[],[5],[],[7],[14],[],[],[12],[],[],[1],[12],[],[3]]
["FreqStack","push","push","push","push","push","pop"]
[[],[9],[14],[7],[5],[2],[]]
["FreqStack","push","push","push","push","pop","pop","push","push","pop","push","pop","push","pop","push","push","pop","push","pop","pop","push","push","push","pop","pop","pop"]
[[],[2],[9],[10],[11],[],[],[12],[0],[],[10],[],[2],[],[4],[4],[],[9],[],[],[1],[6],[4],[],[],[]]
["FreqStack","push","pop","push","pop","push","pop","push","push","push","pop","push","push","push","push","push","push","push","push","push","pop","push","push","pop","push","pop","pop","push","pop","pop","push","push","push","push","pop","push","push","pop","pop","push","pop","pop","push","push","push","push","push","push","push","pop","push","pop","push","push","push","pop"]
[[],[0],[],[1],[],[9],[],[7],[7],[14],[],[8],[12],[14],[11],[1],[2],[14],[5],[9],[],[7],[6],[],[6],[],[],[7],[],[],[7],[10],[6],[9],[],[5],[2],[],[],[10],[],[],[11],[9],[6],[11],[3],[3],[7],[],[3],[],[1],[10],[14],[]]
["FreqStack","push","push","push","pop","push","push","push","push","pop","pop","push","push","push","push","pop","push","push","push","pop","pop","push","push","push","push","pop","pop","push","push","push","push","push","push","pop","push","push","push","push","pop","push","pop","push","pop","pop","push","push","push","pop","push","push","push","pop","push","pop","pop","pop","push","push","push","push","push","push","push","push","pop","push","pop","push","pop","pop","pop","push","pop","push","pop","push","push","push","push","push","push","pop","push","push","push","push","push","pop","push","pop","pop","push"]
[[],[7],[14],[11],[],[7],[13],[3],[4],[],[],[7],[7],[9],[11],[],[0],[12],[2],[],[],[12],[0],[10],[3],[],[],[8],[8],[11],[9],[2],[12],[],[8],[1],[6],[14],[],[14],[],[13],[],[],[11],[9],[13],[],[6],[12],[7],[],[14],[],[],[],[2],[6],[10],[11],[10],[12],[7],[6],[],[6],[],[5],[],[],[],[0],[],[14],[],[0],[2],[1],[6],[11],[9],[],[2],[13],[0],[0],[5],[],[2],[],[],[0]]
["FreqStack","push","pop","push","push","pop","push","push","push","push","pop","pop"]
[[],[10],[],[12],[13],[],[0],[5],[2],[10],[],[]]
["FreqStack","push","push","push","push","pop","pop","push","push","pop","push","push","push","pop","push","push","push","pop","pop","push","pop","push","pop","pop","push","pop","push","pop","push","push","push","push","pop","push","push","pop","pop","push","pop","push","push","push","push","push","push","pop","pop","pop","push","push","push","pop","push","pop","pop","push","pop","push","pop","push","push","pop","push","push","pop","push","push","push","push"]
[[],[3],[7],[12],[3],[],[],[2],[10],[],[2],[10],[7],[],[3],[12],[13],[],[],[3],[],[11],[],[],[3],[],[0],[],[13],[9],[14],[3],[],[12],[6],[],[],[13],[],[8],[2],[14],[14],[2],[9],[],[],[],[7],[5],[9],[],[0],[],[],[13],[],[13],[],[3],[6],[],[8],[1],[],[8],[4],[12],[3]]
["FreqStack","push","push","push","push","push","pop","push","pop","pop","push","pop","push","pop","push","push","push","push","pop","pop","push","pop","push","push","push","pop","pop","push","push","push","push","push","push","pop","push","pop","push","push","push","push","pop","push","push","push","push","pop","pop","push","push","pop","pop","push","pop","push","push"]
[[],[7],[11],[10],[9],[3],[],[5],[],[],[9],[],[13],[],[4],[5],[0],[5],[],[],[12],[],[14],[14],[0],[],[],[0],[5],[5],[4],[10],[1],[],[14],[],[2],[12],[13],[4],[],[9],[8],[8],[7],[],[],[11],[12],[],[],[10],[],[11],[12]]
["FreqStack","push","push","pop","push","pop","push","push","pop","push","pop","push","push","push","pop","push","pop","push","push","push","push","push","pop","pop","pop","pop","pop","push","pop","push","push","pop","pop","pop","push","push","push","push","pop","push","pop","push","push","push"]
[[],[5],[11],[],[2],[],[13],[1],[],[11],[],[8],[8],[12],[],[8],[],[11],[14],[8],[8],[11],[],[],[],[],[],[9],[],[9],[5],[],[],[],[6],[0],[8],[11],[],[11],[],[12],[6],[11]]
["FreqStack","push","push","pop","push","pop","push","pop","push","pop","push","pop","push","push","push","pop","pop","pop","push","push","push","push","pop","pop","pop","push","pop","pop","pop","push","push","pop","push","push","push","push","pop","push","push","push","push","pop","push","push","pop","pop","pop","pop","push","push","push","pop","pop","push","push","push","pop","pop","pop","push","push","push","push","push","pop","push","push","push","pop","pop","push","push","pop","pop","push","push","push","push","push","pop","push","pop","pop","pop","pop","push","pop","push","push","push","pop"]
[[],[6],[14],[],[8],[],[13],[],[6],[],[5],[],[3],[13],[3],[],[],[],[4],[12],[14],[8],[],[],[],[9],[],[],[],[13],[3],[],[13],[0],[7],[7],[],[2],[12],[14],[10],[],[4],[11],[],[],[],[],[3],[8],[11],[],[],[1],[13],[9],[],[],[],[5],[9],[7],[11],[7],[],[9],[12],[5],[],[],[12],[13],[],[],[7],[10],[1],[13],[0],[],[12],[],[],[],[],[12],[],[13],[9],[6],[]]
["FreqStack","push","push","push","push","push","pop","push","push","pop","pop","pop","pop","push","push","push","push","pop","push","push","push","push","push","pop","pop","push","push","pop","pop","push","push","push","push","push","push","push","pop","pop","push","push","pop","push","pop","pop","push","push","push","pop","push","pop","push","push","push","push","pop","push","push","push","push","push","push","push","pop","push","push","push","push","pop","pop","push","push","push","push","pop","push","pop","pop","push","pop","pop","push","pop","pop","push","pop","pop","push","pop","pop","push","push","push","push","pop","pop","pop","push"]
[[],[8],[10],[5],[1],[3],[],[5],[13],[],[],[],[],[11],[1],[4],[11],[],[2],[6],[5],[5],[2],[],[],[11],[12],[],[],[1],[14],[0],[11],[13],[13],[6],[],[],[11],[1],[],[1],[],[],[8],[14],[6],[],[11],[],[13],[10],[13],[14],[],[12],[1],[13],[13],[3],[12],[2],[],[8],[12],[3],[7],[],[],[13],[10],[10],[0],[],[3],[],[],[4],[],[],[1],[],[],[3],[],[],[4],[],[],[9],[6],[8],[4],[],[],[],[4]]
["FreqStack","push","push","push","push","pop","push","push","push","push","pop","push","push","pop","push","pop","push","push","push","pop","push","push","push","pop","push","push","push","push","push","push","pop","pop","pop","push","pop","push","push","push","push","push"]
[[],[7],[7],[3],[2],[],[9],[3],[4],[9],[],[12],[8],[],[12],[],[9],[1],[3],[],[14],[0],[9],[],[13],[12],[13],[8],[1],[9],[],[],[],[13],[],[10],[6],[11],[5],[13]]
["FreqStack","push","push","push","pop","push","pop","push","pop","push","pop","push","pop","push","pop","push","pop","pop","pop","push","pop","push","pop","push","pop","push","pop","push","push","pop","pop","push","pop","push","pop","push","pop","push","pop","push","push","pop","pop","push","push","push","pop","push","pop","push","pop","push","push","pop","pop","push","pop","push","pop","pop","push","pop","push","pop","pop","push","push","push","pop","pop","push","push","pop","pop","push","push","push","push","pop","pop"]
[[],[4],[13],[0],[],[10],[],[14],[],[7],[],[4],[],[6],[],[10],[],[],[],[4],[],[14],[],[6],[],[2],[],[14],[7],[],[],[8],[],[14],[],[9],[],[6],[],[4],[0],[],[],[2],[4],[9],[],[12],[],[14],[],[5],[12],[],[],[2],[],[12],[],[],[1],[],[4],[],[],[14],[1],[4],[],[],[6],[4],[],[],[8],[10],[0],[13],[],[]]
["FreqStack","push","pop","push","push","pop","pop","push","push","push","pop","pop","push","push","pop","push","push","push","push","pop","push","push","push","push","push","push","push","push","push","push","pop","push","push","push","pop","push","push","pop","pop","pop","push","pop","pop","push","push","pop","push","push","push","pop","push","pop","pop","push","push","pop","push","push","pop","pop","push","push","push","push","pop","pop","pop","pop","push","pop","push","pop","pop","push","push","push","push","push"]
[[],[5],[],[6],[5],[],[],[5],[3],[8],[],[],[3],[1],[],[9],[6],[6],[14],[],[2],[1],[0],[5],[13],[1],[9],[13],[0],[6],[],[10],[7],[3],[],[9],[10],[],[],[],[11],[],[],[12],[14],[],[0],[2],[3],[],[2],[],[],[8],[13],[],[0],[7],[],[],[5],[7],[5],[8],[],[],[],[],[8],[],[0],[],[],[12],[1],[9],[0],[13]]
["FreqStack","push","push","push","push","pop","push","push","pop","pop","push","push","pop","push","push","pop","push","push","push","push","pop","pop","push","pop","push","pop","pop","pop"]
[[],[4],[13],[14],[7],[],[12],[9],[],[],[3],[4],[],[10],[13],[],[4],[10],[4],[9],[],[],[2],[],[0],[],[],[]]
["FreqStack","push","push","push","pop","push","pop","push","push","push","push","push","push","push","push","push","push","push","push","push","pop","pop","pop","pop","push","push","pop","pop","pop","pop","push","pop","pop","pop","push","push","pop","pop","push","push","pop","pop","push","pop","push","pop","pop","push","pop","push","pop","push","pop","push","push","pop","push","push","pop","pop","pop","pop","pop","pop","push","pop","push","pop","push","pop","push","push","push","push","pop","push","pop","push","push","push","pop","push","pop","push"]
[[],[9],[2],[0],[],[1],[],[10],[5],[14],[5],[3],[5],[10],[0],[6],[5],[4],[1],[0],[],[],[],[],[12],[11],[],[],[],[],[11],[],[],[],[6],[11],[],[],[6],[8],[],[],[9],[],[12],[],[],[13],[],[3],[],[2],[],[10],[10],[],[9],[4],[],[],[],[],[],[],[6],[],[8],[],[1],[],[13],[13],[13],[12],[],[7],[],[6],[4],[6],[],[6],[],[3]]
["FreqStack","push","push","pop","pop","push","push","pop"]
[[],[6],[4],[],[],[0],[13],[]]
["FreqStack","push","push","push","push","push","pop","pop","push","pop","pop","pop","pop","push","push","push","pop","push","push","pop","push","pop","push","pop","pop","push","push","push","push","push","pop","pop","push","push","push","pop","pop","pop"]
[[],[12],[13],[7],[12],[2],[],[],[9],[],[],[],[],[6],[8],[8],[],[2],[6],[],[6],[],[10],[],[],[6],[8],[14],[6],[7],[],[],[13],[6],[10],[],[],[]]
["FreqStack","push","pop","push","pop","push","push","push","push","pop","pop","push","pop","push","pop","push","push","pop","push","push","push","pop","push","pop","pop","push","push","pop","push","push","push","pop","push","push","push","push","pop","push","pop","pop","push","pop","pop","push","push","push","push","push","push","push","push","push","push","pop","pop","pop","push","push","push","pop","pop","pop","pop","pop","push","push","push","push","pop","push","push","push","pop","pop","pop","push","pop","push","push","pop"]
[[],[2],[],[12],[],[3],[12],[12],[5],[],[],[10],[],[2],[],[14],[11],[],[10],[1],[0],[],[1],[],[],[11],[14],[],[5],[3],[3],[],[4],[11],[7],[6],[],[3],[],[],[5],[],[],[8],[7],[14],[3],[1],[5],[9],[7],[0],[8],[],[],[],[13],[5],[6],[],[],[],[],[],[5],[4],[10],[14],[],[14],[0],[13],[],[],[],[0],[],[11],[1],[]]
["FreqStack","push","pop","push","push","push","push","pop","pop","push","push","pop","push"]
[[],[2],[],[8],[9],[9],[11],[],[],[6],[4],[],[11]]
["FreqStack","push","push","push","pop","push","pop","pop","push","push","pop","pop","push","pop","push","push","push","push","pop","push","push","pop"]
[[],[1],[3],[5],[],[13],[],[],[6],[7],[],[],[7],[],[10],[8],[2],[1],[],[7],[0],[]]
["FreqStack","push","push","pop","push","push","push","pop","push","pop","push","push","push","push","pop","pop","push","pop","pop","push","push","pop","pop","push","push","pop","pop","push"]
[[],[8],[13],[],[6],[4],[5],[],[14],[],[10],[5],[8],[9],[],[],[12],[],[],[8],[11],[],[],[4],[13],[],[],[6]]
["FreqStack","push","push","pop","push","push","push","push","push","push","push","pop","pop","pop","push","pop","push","pop","push","push","push","push","push","push","push","push","push","push","push","push","push","push","pop","push","push","pop","push","push","pop","pop","push","push","push","push","push","pop"]
[[],[1],[9],[],[4],[3],[6],[14],[9],[13],[12],[],[],[],[1],[],[5],[],[8],[3],[7],[7],[1],[11],[10],[11],[5],[1],[11],[6],[8],[9],[],[8],[3],[],[13],[10],[],[],[0],[10],[0],[1],[11],[]]
["FreqStack","push","push","pop","push","pop","push","pop","pop","push","push","pop","pop","push","pop","push","push","push","pop","push","pop","pop","push","pop","push","pop","pop","push","push","pop","push","push","push","push","pop","pop","push","push","push","push","pop","pop","push","pop","push","push","push","push","pop","push","push","pop","push","push","push","push","pop","push","pop","push","push","pop","push","pop","pop","pop"]
[[],[4],[3],[],[4],[],[1],[],[],[0],[10],[],[],[8],[],[10],[2],[10],[],[7],[],[],[2],[],[2],[],[],[0],[13],[],[3],[12],[7],[5],[],[],[1],[9],[13],[11],[],[],[14],[],[8],[14],[5],[13],[],[8],[6],[],[10],[11],[12],[9],[],[0],[],[8],[13],[],[8],[],[],[]]
["FreqStack","push","push","pop","pop","push","push","pop","push","pop"]
[[],[13],[3],[],[],[1],[10],[],[9],[]]
["FreqStack","push","push","pop","push","push","push","pop","push","push","pop","push","push","push","push","pop","pop","push","push","pop","push","push","pop","pop","pop","push","push","push","push","push","push","pop","pop","pop","pop","pop","push","push","push","push","pop","push","push","push","push","push","pop","push","pop","push","push","pop","pop","push","pop","pop","pop","push","push","push","push","pop","push","push","push","push","push","push","push","push","pop","push","pop","pop","push","pop","push","pop","pop","push","push","push","push","pop","push"]
[[],[5],[0],[],[4],[2],[13],[],[5],[14],[],[12],[11],[5],[14],[],[],[1],[5],[],[11],[10],[],[],[],[3],[0],[10],[12],[8],[11],[],[],[],[],[],[2],[13],[14],[11],[],[14],[12],[9],[1],[6],[],[14],[],[1],[9],[],[],[6],[],[],[],[4],[8],[11],[6],[],[2],[12],[5],[4],[0],[5],[3],[9],[],[6],[],[],[2],[],[6],[],[],[3],[12],[1],[7],[],[5]]
["FreqStack","push","pop","push","push","push","push","pop","push","push","push","push","push","push","push","pop","push","push","push","pop","pop","push","push","pop","push","pop","pop","push","push","pop","push","push","push","pop","push","push","push","push","push","push","push","pop","pop","push","pop","push","push","pop","push","push","push","pop","pop","push","pop","push","push","push","push","pop","push","pop","pop","pop","push","push","push","pop","push","pop","push","push","pop","push","push","push","push","push","push","push","push","push","push","pop","push","push","push","pop","push","push"]
[[],[6],[],[13],[5],[9],[9],[],[3],[9],[3],[6],[3],[11],[11],[],[2],[1],[3],[],[],[6],[12],[],[3],[],[],[5],[3],[],[10],[12],[14],[],[12],[7],[2],[2],[6],[9],[13],[],[],[12],[],[13],[3],[],[11],[11],[3],[],[],[1],[],[4],[10],[12],[0],[],[2],[],[],[],[14],[9],[0],[],[13],[],[13],[8],[],[13],[8],[9],[14],[1],[7],[8],[3],[2],[4],[],[3],[4],[7],[],[0],[10]]
["FreqStack","push","pop","push","push","push","pop","pop","push","pop","push","push","pop","pop","push","pop","push","pop","push","push"]
[[],[7],[],[8],[6],[4],[],[],[8],[],[10],[5],[],[],[13],[],[10],[],[11],[3]]
["FreqStack","push","push","push","push","push","push","pop","pop","push","push","pop","pop","push","push","push","pop","pop","push","push","push","push","push","pop","pop","pop","pop","pop"]
[[],[10],[6],[8],[9],[12],[3],[],[],[2],[12],[],[],[11],[6],[3],[],[],[1],[7],[6],[3],[1],[],[],[],[],[]]
["FreqStack","push","push","pop","pop","push","push","push","pop","pop","pop","push","push","pop","pop","push","push","pop","pop","push","push","pop","push","pop","pop","push","pop","push","push"]
[[],[2],[11],[],[],[1],[6],[3],[],[],[],[14],[6],[],[],[1],[1],[],[],[11],[1],[],[5],[],[],[5],[],[14],[4]]
["FreqStack","push","pop","push","push","push","pop","push","push","push","pop","push","push","pop","push","push","pop","push","pop","push","pop","push","pop","pop","pop","push","pop","push","pop","push","push","pop","push","pop","push","push","pop","push","pop","push","pop","pop","pop","push","push","push","push","pop","push","pop","push","push","push","pop","push","pop","push","push","push","push","push","push","push","push","push"]
[[],[5],[],[11],[7],[13],[],[3],[12],[5],[],[9],[10],[],[6],[12],[],[12],[],[10],[],[11],[],[],[],[11],[],[1],[],[10],[10],[],[5],[],[1],[1],[],[0],[],[9],[],[],[],[13],[5],[1],[14],[],[6],[],[3],[12],[3],[],[11],[],[14],[14],[8],[10],[1],[2],[7],[7],[12]]
["FreqStack","push","pop","push","pop","push","push","push","pop","push","push","pop","pop","pop","push","push","push","push","push","pop","push","push","pop","push","push","push","push","push"]
[[],[14],[],[9],[],[12],[14],[8],[],[13],[4],[],[],[],[10],[12],[10],[3],[10],[],[14],[13],[],[2],[13],[1],[2],[14]]
["FreqStack","push","pop","push","push","pop","pop","push","push","pop","push","push","push","push","push","pop","push","push","pop","push","push","pop","pop","push","push","push","pop","push","push","push","pop","push","push","push","push","pop","pop","push","push","pop","pop","push","push","push","pop","pop","pop","push","pop","push","push","pop","pop","push","pop","pop","push","push","pop","pop","pop","pop","push","push","push","pop","push","push","push","pop","push","push"]
[[],[6],[],[13],[2],[],[],[3],[9],[],[9],[3],[3],[14],[1],[],[6],[10],[],[4],[9],[],[],[3],[11],[13],[],[9],[13],[14],[],[11],[10],[10],[13],[],[],[13],[0],[],[],[8],[10],[1],[],[],[],[5],[],[2],[1],[],[],[8],[],[],[3],[13],[],[],[],[],[9],[13],[2],[],[13],[2],[2],[],[11],[3]]
["FreqStack","push","push","push","push","push","pop","push","pop","push","pop","push","pop","push","push","pop","pop","pop","push","push","push","pop","pop","pop","pop","pop","pop","push","pop","push","push","push","push","push","push","push","pop","push","pop","push","push","push","pop","push","push","push","push","push","pop","push","push","pop","push","pop","push","push","push","push","push","push","push","push","pop","pop","push","pop","pop","push"]
[[],[1],[14],[12],[11],[6],[],[7],[],[5],[],[6],[],[0],[0],[],[],[],[9],[9],[12],[],[],[],[],[],[],[10],[],[7],[10],[3],[14],[7],[11],[10],[],[12],[],[1],[8],[1],[],[1],[5],[3],[13],[9],[],[6],[1],[],[5],[],[11],[0],[10],[0],[3],[1],[7],[8],[],[],[10],[],[],[2]]
["FreqStack","push","pop","push","push","pop","push","pop","push","push","push","pop","pop","push","push","push","pop","pop","pop","push","pop","pop","push","pop","pop","push","push","push","push","push","pop","pop","push"]
[[],[6],[],[12],[5],[],[1],[],[3],[4],[10],[],[],[2],[14],[9],[],[],[],[5],[],[],[6],[],[],[12],[8],[7],[2],[12],[],[],[3]]
["FreqStack","push","pop","push","push","push","pop","push","pop","pop","pop","push","push","pop","push","pop","push","push","push","push","push","pop","push","pop","pop","pop","pop","pop","push","pop","push"]
[[],[12],[],[1],[10],[13],[],[3],[],[],[],[2],[4],[],[13],[],[4],[13],[3],[0],[8],[],[2],[],[],[],[],[],[3],[],[9]]
["FreqStack","push","push","pop","push","push","push","pop","push","push","push","push","pop","push","push","push","pop","push","pop","push","push","push","pop","push","pop","push","pop","pop","pop","pop","push","push","pop","push","pop","pop","push","push","pop","pop","pop","pop","push","pop","pop","push","pop","pop","pop","push","push","push","push","pop","pop","push","pop","push","pop","pop","pop","push","push","push","pop","push","push","push","push","push","pop","pop","pop","push","push","pop","push","pop","push","push","push","push","pop","pop","push","pop","pop"]
[[],[12],[1],[],[0],[6],[7],[],[10],[13],[12],[11],[],[8],[7],[4],[],[1],[],[13],[6],[2],[],[4],[],[11],[],[],[],[],[3],[8],[],[13],[],[],[7],[0],[],[],[],[],[5],[],[],[2],[],[],[],[12],[1],[11],[1],[],[],[6],[],[7],[],[],[],[0],[4],[12],[],[1],[6],[8],[13],[4],[],[],[],[3],[4],[],[14],[],[12],[9],[0],[6],[],[],[7],[],[]]
["FreqStack","push","pop","push","push","pop","pop","push","push","push","pop","pop","push","push","push","push","pop","pop","push","push","pop","push","pop","push","push","push","pop","push","pop","push","pop","push","push","push","push","push","pop","pop","push","push","push","push","pop","pop","pop","push","pop","push","push","push","push","pop","pop","pop","push","push","push","push","pop","pop","pop","pop","push","pop","push","push","push","push","push","push","push","push","push","pop","pop","pop","pop","push","push","push","pop","pop","push","pop"]
[[],[2],[],[12],[5],[],[],[5],[6],[9],[],[],[7],[2],[12],[5],[],[],[6],[6],[],[0],[],[13],[7],[7],[],[5],[],[1],[],[14],[11],[9],[9],[9],[],[],[0],[13],[3],[8],[],[],[],[0],[],[12],[8],[11],[11],[],[],[],[9],[4],[9],[5],[],[],[],[],[6],[],[3],[8],[8],[6],[5],[13],[11],[2],[8],[],[],[],[],[11],[10],[10],[],[],[5],[]]
["FreqStack","push","pop","push","pop","push","pop","push","push","pop","push","push","pop","push","pop","pop","pop"]
[[],[14],[],[9],[],[6],[],[7],[10],[],[4],[14],[],[0],[],[],[]]
["FreqStack","push","pop","push","push","push","pop","push","push","pop","push","pop","pop","pop","pop","push","push","push","push","pop","push","pop","push","push","pop","push","pop","pop","pop","push","pop","push","push","push","push","pop","push","push","pop","pop","push","push","pop","pop","push","push"]
[[],[13],[],[3],[10],[1],[],[5],[7],[],[12],[],[],[],[],[13],[1],[0],[12],[],[10],[],[11],[0],[],[5],[],[],[],[12],[],[10],[3],[7],[14],[],[11],[12],[],[],[3],[6],[],[],[3],[6]]
["FreqStack","push","push","pop","pop","push","push","push","pop","push","push","pop","push","pop","pop","push","pop","push","pop","push","pop","pop","push","pop","push","push","push","pop","pop","pop","push","pop","pop","push","pop","push","push","push","push","push","push","push"]
[[],[11],[0],[],[],[9],[10],[9],[],[11],[10],[],[4],[],[],[11],[],[5],[],[9],[],[],[4],[],[8],[8],[5],[],[],[],[10],[],[],[14],[],[6],[9],[5],[7],[3],[7],[6]]


[null,null,null,null,null,null,null,5,7,5,4]
[null,null,null,null,null,12,5,null,4,10,2,null,9,null,10,null,null,null,4,3,8,null,null,null,9,null,null,null,2,null,null,null,null,11,4,8,2]
[null,null,null,null,null,null,12,null,12,9,null,8,1,null,null,12,null,4,null,null,null,12,12,null,null,null,null,0,null,null,null,11,null,10,5,null,null,null,0,14,null,0,8,14,null,null,null,10,null]
[null,null,12,null,4,null,null,null,null,1,6,1,null,null,null,3,null,null,8,5,null,11,null,null,9,null,null,null,1]
[null,null,null,null,null,null,null,2,null,null,null,10,null,3,null,null,4,null,null,null,1,null,null,null,null,null,null,null,2,null,13,null,null,10,null,null,null,12,null,9,5,null,null,2,null,null,11,14,null,null,null,null,null,null]
[null,null]
[null,null,null,null,2,9,10,null,5,null,12,null,9,null,7,null,6,null,5,null,null,7,3,null,null,6,10,null,null,10,null,null,null,12,4,null,null,null,13,4,null,null,null,6,9,null,null,null,2,null,13,null,0,4,0,6,14,12,9,null,null,9,null]
[null,null,5,null,10,null,null,null,3,null,null,6,null,null,9,13,2,null,null,null,13,null]
[null,null,9,null,null,null,13,null,null,13,null,null,null,null,null,10,null,null,null,8,null,null,null,13,null,null,null,null,7,null,13,7,7,null,null,10,4,null,6,null,13,null,4,null,null,8,7,14,null,null,null,1,11,null,null,null,9,null,null,null,2,null,null,null,null,2]
[null,null,5,null,2,null,14,null,12,null,null,null,null,6,14,null,null,4,5,null,null,null,6,null,null,null,8,13]
[null,null,null,14,0,null,null,null,null,null,7,null,5,null,null,7,14,null,12,10,null,null,12,null]
[null,null,null,null,null,null,2]
[null,null,null,null,null,11,10,null,null,0,null,10,null,2,null,null,4,null,9,4,null,null,null,4,6,1]
[null,null,0,null,1,null,9,null,null,null,7,null,null,null,null,null,null,null,null,null,14,null,null,7,null,6,14,null,7,6,null,null,null,null,9,null,null,2,5,null,10,7,null,null,null,null,null,null,null,11,null,3,null,null,null,14]
[null,null,null,null,11,null,null,null,null,7,4,null,null,null,null,7,null,null,null,7,2,null,null,null,null,3,0,null,null,null,null,null,null,12,null,null,null,null,8,null,14,null,13,14,null,null,null,9,null,null,null,12,null,11,14,7,null,null,null,null,null,null,null,null,6,null,6,null,12,10,11,null,6,null,14,null,null,null,null,null,null,9,null,null,null,null,null,0,null,2,0,null]
[null,null,10,null,null,13,null,null,null,null,10,2]
[null,null,null,null,null,3,12,null,null,10,null,null,null,7,null,null,null,3,2,null,3,null,11,13,null,3,null,0,null,null,null,null,3,null,null,12,6,null,13,null,null,null,null,null,null,2,14,9,null,null,null,9,null,7,14,null,13,null,13,null,null,3,null,null,8,null,null,null,null]
[null,null,null,null,null,null,3,null,5,9,null,9,null,13,null,null,null,null,5,0,null,12,null,null,null,14,0,null,null,null,null,null,null,5,null,14,null,null,null,null,4,null,null,null,null,7,8,null,null,12,11,null,10,null,null]
[null,null,null,11,null,2,null,null,1,null,11,null,null,null,8,null,8,null,null,null,null,null,8,11,8,14,11,null,9,null,null,5,9,12,null,null,null,null,8,null,11,null,null,null]
[null,null,null,14,null,8,null,13,null,6,null,5,null,null,null,3,13,3,null,null,null,null,8,14,12,null,9,4,6,null,null,3,null,null,null,null,7,null,null,null,null,13,null,null,11,4,10,14,null,null,null,11,8,null,null,null,13,9,1,null,null,null,null,null,7,null,null,null,5,12,null,null,13,12,null,null,null,null,null,7,null,12,0,13,9,null,12,null,null,null,9]
[null,null,null,null,null,null,3,null,null,5,13,1,5,null,null,null,null,11,null,null,null,null,null,2,5,null,null,11,12,null,null,null,null,null,null,null,6,13,null,null,1,null,1,11,null,null,null,6,null,11,null,null,null,null,14,null,null,null,null,null,null,null,13,null,null,null,null,13,12,null,null,null,null,10,null,13,3,null,10,8,null,1,1,null,3,13,null,4,4,null,null,null,null,8,4,6,null]
[null,null,null,null,null,7,null,null,null,null,9,null,null,3,null,12,null,null,null,3,null,null,null,9,null,null,null,null,null,null,9,1,8,null,13,null,null,null,null,null]
[null,null,null,null,0,null,10,null,14,null,7,null,4,null,6,null,10,13,4,null,4,null,14,null,6,null,2,null,null,7,14,null,8,null,14,null,9,null,6,null,null,0,4,null,null,null,9,null,12,null,14,null,null,12,5,null,2,null,12,4,null,1,null,4,2,null,null,null,4,1,null,null,4,6,null,null,null,null,13,0]
[null,null,5,null,null,5,6,null,null,null,8,3,null,null,1,null,null,null,null,6,null,null,null,null,null,null,null,null,null,null,6,null,null,null,3,null,null,9,10,0,null,13,9,null,null,14,null,null,null,3,null,2,2,null,null,13,null,null,0,7,null,null,null,null,5,5,8,7,null,8,null,0,0,null,null,null,null,null]
[null,null,null,null,null,7,null,null,9,12,null,null,4,null,null,13,null,null,null,null,4,10,null,4,null,0,2,9]
[null,null,null,null,0,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,5,5,0,10,null,null,5,11,12,1,null,11,4,6,null,null,11,6,null,null,8,6,null,9,null,12,0,null,13,null,3,null,2,null,null,10,null,null,9,10,4,3,14,5,null,6,null,8,null,1,null,null,null,null,13,null,13,null,null,null,6,null,6,null]
[null,null,null,4,6,null,null,13]
[null,null,null,null,null,null,12,2,null,9,7,13,12,null,null,null,8,null,null,6,null,6,null,10,2,null,null,null,null,null,6,8,null,null,null,6,6,10]
[null,null,2,null,12,null,null,null,null,12,5,null,10,null,2,null,null,11,null,null,null,0,null,1,1,null,null,14,null,null,null,3,null,null,null,null,11,null,3,3,null,5,6,null,null,null,null,null,null,null,null,null,null,7,8,5,null,null,null,5,3,14,7,6,null,null,null,null,14,null,null,null,13,0,14,null,0,null,null,1]
[null,null,2,null,null,null,null,9,11,null,null,4,null]
[null,null,null,null,5,null,13,3,null,null,7,6,null,7,null,null,null,null,1,null,null,0]
[null,null,null,13,null,null,null,5,null,14,null,null,null,null,8,9,null,12,5,null,null,8,11,null,null,4,13,null]
[null,null,null,9,null,null,null,null,null,null,null,12,13,9,null,1,null,5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,11,null,null,3,null,null,8,1,null,null,null,null,null,11]
[null,null,null,3,null,4,null,1,4,null,null,10,0,null,8,null,null,null,10,null,7,2,null,2,null,2,10,null,null,13,null,null,null,null,5,7,null,null,null,null,11,13,null,14,null,null,null,null,13,null,null,8,null,null,null,null,9,null,0,null,null,8,null,8,12,13]
[null,null,null,3,13,null,null,10,null,9]
[null,null,null,0,null,null,null,13,null,null,5,null,null,null,null,14,5,null,null,5,null,null,11,10,1,null,null,null,null,null,null,11,12,8,10,0,null,null,null,null,11,null,null,null,null,null,14,null,14,null,null,9,1,null,6,12,14,null,null,null,null,6,null,null,null,null,null,null,null,null,5,null,4,2,null,2,null,6,6,null,null,null,null,12,null]
[null,null,6,null,null,null,null,9,null,null,null,null,null,null,null,3,null,null,null,3,11,null,null,6,null,3,3,null,null,3,null,null,null,12,null,null,null,null,null,null,null,9,2,null,12,null,null,13,null,null,null,3,11,null,1,null,null,null,null,12,null,2,10,11,null,null,null,9,null,13,null,null,13,null,null,null,null,null,null,null,null,null,null,2,null,null,null,3,null,null]
[null,null,7,null,null,null,4,6,null,8,null,null,5,10,null,13,null,10,null,null]
[null,null,null,null,null,null,null,3,12,null,null,12,2,null,null,null,6,3,null,null,null,null,null,1,6,3,7,1]
[null,null,null,11,2,null,null,null,3,6,1,null,null,6,14,null,null,1,1,null,null,1,null,5,11,null,5,null,null]
[null,null,5,null,null,null,13,null,null,null,5,null,null,10,null,null,12,null,12,null,10,null,11,6,9,null,11,null,1,null,null,10,null,5,null,null,1,null,0,null,9,1,10,null,null,null,null,14,null,6,null,null,null,3,null,11,null,null,null,null,null,null,null,null,null]
[null,null,14,null,9,null,null,null,8,null,null,4,13,14,null,null,null,null,null,10,null,null,10,null,null,null,null,null]
[null,null,6,null,null,2,13,null,null,9,null,null,null,null,null,3,null,null,3,null,null,9,4,null,null,null,3,null,null,null,14,null,null,null,null,13,10,null,null,13,10,null,null,null,1,10,11,null,13,null,null,1,9,null,8,2,null,null,13,3,5,8,null,null,null,13,null,null,null,2,null,null]
[null,null,null,null,null,null,6,null,7,null,5,null,6,null,null,0,0,11,null,null,null,12,9,9,12,14,1,null,10,null,null,null,null,null,null,null,10,null,7,null,null,null,1,null,null,null,null,null,3,null,null,1,null,5,null,null,null,null,null,null,null,null,1,8,null,10,7,null]
[null,null,6,null,null,5,null,1,null,null,null,10,4,null,null,null,9,14,2,null,5,3,null,6,12,null,null,null,null,null,12,2,null]
[null,null,12,null,null,null,13,null,3,10,1,null,null,4,null,13,null,null,null,null,null,8,null,2,0,3,13,4,null,3,null]
[null,null,null,1,null,null,null,7,null,null,null,null,12,null,null,null,4,null,1,null,null,null,6,null,13,null,11,4,2,7,null,null,8,null,13,3,null,null,0,7,8,11,null,5,13,null,2,10,6,null,null,null,null,1,12,null,6,null,7,11,1,null,null,null,12,null,null,null,null,null,4,0,13,null,null,4,null,14,null,null,null,null,6,0,null,12,7]
[null,null,2,null,null,5,12,null,null,null,9,6,null,null,null,null,5,12,null,null,6,null,0,null,null,null,7,null,5,null,7,null,null,null,null,null,9,9,null,null,null,null,13,8,3,null,0,null,null,null,null,11,11,8,null,null,null,null,9,5,9,4,null,6,null,null,null,null,null,null,null,null,null,8,2,11,13,null,null,null,10,11,null,5]
[null,null,14,null,9,null,6,null,null,10,null,null,14,null,0,4,7]
[null,null,13,null,null,null,1,null,null,7,null,12,5,10,3,null,null,null,null,12,null,10,null,null,0,null,5,11,0,null,12,null,null,null,null,14,null,null,12,11,null,null,3,6,null,null]
[null,null,null,0,11,null,null,null,9,null,null,10,null,4,11,null,11,null,5,null,9,10,null,4,null,null,null,8,5,8,null,10,9,null,14,null,null,null,null,null,null,null]
*/