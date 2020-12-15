/*
You have an infinite number of stacks arranged in a row and numbered (left to right) from 0, each of the stacks has the same maximum capacity.

Implement the DinnerPlates class:

DinnerPlates(int capacity) Initializes the object with the maximum capacity of the stacks.
void push(int val) Pushes the given positive integer val into the leftmost stack with size less than capacity.
int pop() Returns the value at the top of the rightmost non-empty stack and removes it from that stack, and returns -1 if all stacks are empty.
int popAtStack(int index) Returns the value at the top of the stack with the given index and removes it from that stack, and returns -1 if the stack with that given index is empty.
Example:

Input: 
["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
[[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
Output: 
[null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]

Explanation: 
DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ﹈ ﹈ ﹈ 
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3 
                                                        ﹈ ﹈  
D.pop()            // Returns 4.  The stacks are now:   1  3 
                                                        ﹈ ﹈   
D.pop()            // Returns 3.  The stacks are now:   1 
                                                        ﹈   
D.pop()            // Returns 1.  There are no stacks.
D.pop()            // Returns -1.  There are still no stacks.
 

Constraints:

1 <= capacity <= 20000
1 <= val <= 20000
0 <= index <= 100000
At most 200000 calls will be made to push, pop, and popAtStack.
*/

var DinnerPlates = function (capacity) {
  this.plates = [];
  this.capacities = [0];
  this.missing = [];
  this.maxCap = capacity;
  this.head = 0;
};

/** 
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function (val) {
  if (this.missing.length) {
    const location = this.missing[this.missing.length - 1];
    const idx = location * this.maxCap + this.capacities[location];
    this.plates[idx] = val;
    this.capacities[location] += 1;
    if (this.capacities[location] === this.maxCap) this.missing.pop();
  } else if (this.capacities[this.head] === this.maxCap) {
    this.head += 1;
    const idx = this.head * this.maxCap;
    this.plates[idx] = val;
    this.capacities[this.head] = 1;
  } else {
    const idx = this.head * this.maxCap + this.capacities[this.head];
    this.plates[idx] = val;
    this.capacities[this.head] += 1;
  }
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function () {
  if (!this.capacities[this.head]) return -1;
  const idx = this.head * this.maxCap + this.capacities[this.head] - 1;
  const val = this.plates[idx];
  this.plates[idx] = null;
  this.capacities[this.head] -= 1;

  if (!this.capacities[this.head]) {
    if (this.capacities[this.head - 1] && this.capacities[this.head - 1] === this.maxCap) {
      this.head -= 1;
    } else {
      const nextFull = this.missing.findIndex((index) => this.capacities[index]);

      if (nextFull >= 0) {
        this.head = this.missing[nextFull];
        this.missing = this.missing.slice(nextFull + 1);
      } else {
        this.head = 0;
      }
    }
  }

  return val;
};

/** 
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function (index) {
  if (
    index >= this.capacities.length
    || !this.capacities[index]
  ) return -1;

  if (index === this.head) {
    return this.pop();
  }

  const idx = index * this.maxCap + this.capacities[index] - 1;
  const val = this.plates[idx];

  this.plates[idx] = null;

  if (this.capacities[index] === this.maxCap) {
    this.addMissing(index);
  }
    
  this.capacities[index] -= 1;

  return val;
};

DinnerPlates.prototype.addMissing = function (index) {
  const arr = this.missing;
  arr.push(index);
  let current = arr.length - 1;
  while (current > 0 && arr[current] > arr[current - 1]) {
    [arr[current], arr[current - 1]] = [arr[current - 1], arr[current]];
  }
}

// const maxLen = 100;
// for (let i = 0; i < 20; i += 1) {
//   const len = Math.floor(Math.random() * maxLen) + 2;
//   const actions = ['DinnerPlates']
//   const capacity = Math.floor(Math.random() * 10);
//   const vals = [[capacity]]

//   const list = ['push', 'pop', 'popAtStack']
//   let numPush = 0;
//   let numPop = 0;
//   for (let i = 1; i < len; i += 1) {
//     const actionIdx = Math.floor(Math.random() * 3);
//     const action = list[actionIdx];

//     let val;
//     if (action === list[0]) {
//       val = [Math.floor(Math.random() * 100) + 1];
//       numPop += 1;
//     } else if (action === list[1]) {
//       val = [];
//       numPop += 1;
//     } else {
//       const popAt = Math.max(0, (numPush - numPop) / capacity)
//       val = [Math.floor(Math.random() * popAt)];
//       numPop += 1;
//     }
//     actions.push(action);
//     vals.push(val);
//   }

//   logOutList(printGrid([actions, vals]));
// }

/*

*/

const tests = [
  // [
  //   ["DinnerPlates", "push", "push", "push", "push", "push", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop"],
  //   [[2], [1], [2], [3], [4], [5], [0], [20], [21], [1], [2], [], [], [], [], []],
  // ],
  // [
  //   ["DinnerPlates", "pop", "pop", "popAtStack", "push", "push", "popAtStack", "pop", "push", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "pop", "push", "pop", "pop", "pop", "pop", "push", "push", "popAtStack", "pop", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "push", "popAtStack", "push", "push", "push"],
  //   [[1], [], [], [0], [96], [44], [0], [], [1], [0], [], [], [0], [0], [0], [0], [], [], [2], [], [], [], [], [45], [53], [0], [], [], [21], [], [0], [], [0], [], [65], [19], [0], [55], [36], [32]]
  // ],
  // [
  //   ["DinnerPlates", "pop", "push", "pop", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "pop", "push", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "pop", "pop", "pop", "popAtStack", "pop", "push", "pop", "push", "push", "popAtStack", "popAtStack", "popAtStack", "push", "push", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "push", "push", "popAtStack", "popAtStack", "popAtStack", "push", "push", "pop", "push", "popAtStack", "pop", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "popAtStack", "push", "push", "pop", "popAtStack", "popAtStack", "push", "push", "popAtStack", "push", "push", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "pop", "push", "push", "popAtStack", "pop", "pop", "pop"],
  //   [[3], [], [6], [], [], [], [0], [], [], [0], [], [15], [], [24], [16], [0], [0], [], [0], [10], [10], [0], [0], [], [0], [0], [], [], [], [0], [], [88], [], [31], [1], [0], [0], [0], [43], [52], [], [20], [0], [0], [0], [97], [59], [0], [0], [0], [83], [18], [], [39], [0], [], [0], [54], [0], [], [0], [0], [], [96], [0], [12], [0], [93], [86], [], [0], [0], [34], [84], [0], [73], [1], [], [71], [0], [96], [], [0], [0], [], [54], [85], [0], [], [], []]
  // ],
  // [
  //   ["DinnerPlates", "pop", "popAtStack", "push", "pop", "pop", "pop", "pop", "popAtStack", "pop", "pop", "pop", "popAtStack", "push", "popAtStack", "push", "pop", "popAtStack", "push", "pop", "push", "push", "pop", "pop", "push", "push", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "popAtStack", "push", "popAtStack", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "push", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "push", "pop", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "push", "push", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "push", "pop"],
  //   [[3], [], [0], [1], [], [], [], [], [0], [], [], [], [0], [74], [0], [70], [], [0], [37], [], [24], [90], [], [], [85], [18], [0], [0], [0], [], [86], [], [58], [15], [], [33], [], [], [0], [16], [0], [], [], [0], [], [], [0], [0], [37], [0], [0], [0], [0], [], [83], [22], [0], [86], [0], [0], [0], [0], [0], [0], [], [9], [0], [83], [5], [], [0], [3], [6], [0], [0], [], [55], [54], [0], [], [], [0], [], [1], [0], [], [0], [], [21], [0], [], [14], []]
  // ],
  // [
  //   ["DinnerPlates", "pop", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "popAtStack", "popAtStack", "pop", "pop", "pop", "push", "pop", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "push", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "pop", "pop"],
  //   [[6], [], [0], [0], [], [64], [0], [30], [68], [10], [], [], [9], [75], [65], [82], [0], [0], [90], [0], [0], [], [82], [0], [0], [0], [33], [], [90], [33], [28], [], [98], [76], [78], [83], [], [], [0], [0], [], [], [], [84], [], [0], [81], [45], [0], [0], [], [0], [0], [0], [0], [58], [24], [0], [], [0], [0], [0], [], [6], [], [0], [], [], [0], [], [], [0], [0], [], []]
  // ],
  // [
  //   ["DinnerPlates", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "push", "pop", "popAtStack", "push", "push", "pop", "popAtStack", "popAtStack", "push", "push", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "push", "push", "push", "popAtStack", "push", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "popAtStack", "pop", "pop", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "push", "push", "popAtStack", "pop", "pop", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "push", "pop", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "pop", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "push", "popAtStack", "pop", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "push", "pop", "pop", "push", "popAtStack", "popAtStack"],
  //   [[2], [1], [0], [0], [0], [43], [], [53], [], [0], [88], [59], [], [0], [0], [20], [83], [11], [0], [0], [0], [0], [], [0], [], [71], [0], [69], [94], [50], [70], [0], [75], [], [0], [], [17], [0], [92], [0], [], [], [0], [], [0], [], [0], [85], [59], [0], [], [], [20], [0], [0], [], [0], [], [50], [], [], [0], [], [0], [], [53], [0], [], [], [], [], [0], [], [98], [0], [], [], [58], [38], [], [19], [], [1], [32], [0], [], [0], [45], [0], [93], [0], [93], [94], [], [], [44], [0], [0]]
  // ],
  [
    ["DinnerPlates","push","push","push","push","push","push","push","push","popAtStack","popAtStack","popAtStack","popAtStack","popAtStack","popAtStack","popAtStack","popAtStack","popAtStack","popAtStack","push","push","push","push","push","push","push","push","pop","pop","pop","pop","pop","pop","pop","pop","pop","pop"],
    [[2],[472],[106],[497],[498],[73],[115],[437],[461],[3],[3],[1],[3],[0],[2],[2],[1],[1],[3],[197],[239],[129],[449],[460],[240],[386],[343],[],[],[],[],[],[],[],[],[],[]]
  ],
  // [
  //   ["DinnerPlates", "pop", "pop", "pop", "pop", "pop", "pop", "push", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "push", "push", "pop", "popAtStack", "push", "push", "push", "popAtStack", "pop", "popAtStack", "pop", "push", "push", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "push", "popAtStack", "pop", "push", "pop", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "popAtStack", "push", "popAtStack", "pop", "pop", "push", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "popAtStack", "pop", "pop", "pop", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "push", "popAtStack", "pop", "popAtStack", "pop", "pop", "pop", "push", "push", "push", "pop", "popAtStack", "push", "popAtStack", "pop", "pop", "popAtStack"],
  //   [[9], [], [], [], [], [], [], [78], [], [0], [0], [55], [0], [0], [], [0], [0], [0], [14], [30], [], [0], [12], [5], [68], [0], [], [0], [], [43], [32], [0], [0], [0], [40], [], [0], [0], [0], [0], [32], [10], [0], [], [12], [], [], [], [0], [], [11], [0], [], [0], [14], [0], [], [], [95], [0], [51], [0], [0], [], [0], [], [90], [0], [89], [0], [], [], [], [0], [65], [0], [0], [], [], [], [23], [0], [], [0], [], [], [], [13], [94], [22], [], [0], [16], [0], [], [], [0]]
  // ],
  // [
  //   ["DinnerPlates", "push", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "pop", "pop", "push", "push", "pop", "popAtStack"],
  //   [[6], [67], [0], [71], [0], [], [0], [], [], [75], [32], [], [0]]
  // ],
  // [
  //   ["DinnerPlates", "popAtStack", "pop", "popAtStack", "pop", "pop", "push", "popAtStack", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "push", "push", "popAtStack", "popAtStack", "push", "push", "pop", "pop", "pop", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "push", "push", "pop", "push", "pop", "popAtStack", "pop", "push", "pop", "pop", "push", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "push", "push", "pop"],
  //   [[1], [1], [], [0], [], [], [93], [0], [56], [52], [91], [], [82], [56], [], [84], [51], [], [], [0], [], [], [0], [0], [35], [6], [0], [0], [41], [68], [], [], [], [0], [0], [], [0], [], [0], [], [36], [], [0], [], [78], [0], [0], [44], [0], [40], [0], [31], [67], [86], [], [83], [], [0], [], [14], [], [], [23], [0], [0], [], [80], [], [0], [68], [0], [0], [0], [78], [], [0], [24], [23], []]
  // ],
  // [
  //   ["DinnerPlates", "popAtStack", "pop", "popAtStack", "push", "push", "push", "popAtStack", "pop", "push", "push", "pop", "popAtStack", "pop", "popAtStack", "push", "pop", "popAtStack", "push", "push", "pop", "pop", "pop", "pop", "pop", "popAtStack", "pop", "pop", "push", "push", "push", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "pop", "pop", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "push", "push", "pop", "popAtStack", "pop", "pop", "push", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "pop", "popAtStack", "push", "pop", "push", "push", "pop", "popAtStack"],
  //   [[8], [1], [], [0], [75], [74], [97], [0], [], [29], [20], [], [0], [], [0], [73], [], [0], [69], [83], [], [], [], [], [], [0], [], [], [83], [97], [9], [], [], [0], [0], [0], [0], [50], [], [0], [], [0], [], [80], [], [0], [], [0], [0], [0], [], [], [], [0], [83], [], [0], [0], [7], [18], [], [0], [], [], [90], [10], [], [0], [0], [0], [], [0], [66], [], [0], [0], [], [0], [2], [], [40], [67], [], [0]]
  // ],
  // [
  //   ["DinnerPlates", "push", "pop", "popAtStack", "popAtStack", "push", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "popAtStack", "popAtStack", "popAtStack"],
  //   [[6], [76], [], [0], [0], [30], [], [], [29], [44], [18], [], [60], [], [0], [0], [0]]
  // ],
  // [
  //   ["DinnerPlates", "popAtStack", "push", "pop", "pop", "popAtStack", "popAtStack", "popAtStack"],
  //   [[7], [1], [63], [], [], [0], [0], [0]]
  // ],
  // [
  //   ["DinnerPlates", "push", "push", "push", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "push", "push", "pop", "push", "push", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "push", "popAtStack", "push", "push", "pop", "popAtStack"],
  //   [[9], [77], [52], [61], [], [99], [0], [73], [], [0], [0], [0], [0], [64], [0], [], [0], [83], [61], [], [83], [81], [0], [], [66], [0], [0], [], [0], [], [0], [], [], [0], [], [18], [0], [62], [47], [], [0], [], [0], [0], [], [92], [], [0], [0], [0], [], [16], [], [0], [61], [0], [20], [88], [], [0]]
  // ],
  // [
  //   ["DinnerPlates", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "pop", "pop", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "push", "push", "pop", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "pop", "push", "popAtStack", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "push", "push", "push", "pop", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "pop"],
  //   [[5], [], [0], [], [19], [], [0], [], [0], [0], [45], [0], [0], [0], [0], [], [0], [0], [0], [90], [], [], [], [], [0], [0], [15], [0], [61], [85], [], [], [0], [], [0], [0], [0], [], [], [7], [0], [0], [99], [0], [9], [0], [54], [5], [1], [87], [], [0], [0], [], [70], [], [0], [], [0], []]
  // ],
  // [
  //   ["DinnerPlates", "push", "push", "pop", "push", "pop", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "pop", "pop", "pop", "pop", "popAtStack", "pop", "pop", "pop", "pop", "push", "pop", "popAtStack", "push", "push", "push", "pop", "push", "push", "pop", "pop"],
  //   [[6], [45], [87], [], [77], [], [], [0], [0], [76], [0], [], [], [], [], [0], [], [], [], [], [12], [], [0], [77], [4], [82], [], [47], [13], [], []]
  // ],
  // [
  //   ["DinnerPlates", "push", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "push", "push", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "pop", "pop", "push", "pop", "push", "push", "push", "popAtStack", "pop", "popAtStack", "push"],
  //   [[7], [3], [0], [89], [0], [], [0], [88], [73], [], [8], [], [0], [], [0], [0], [64], [0], [], [0], [], [0], [], [], [49], [], [81], [92], [13], [0], [], [0], [12]]
  // ],
  // [
  //   ["DinnerPlates", "pop", "pop", "pop", "pop", "pop", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "push", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "push", "push", "pop", "push", "pop", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "pop"],
  //   [[6], [], [], [], [], [], [0], [0], [], [0], [], [0], [46], [], [0], [], [], [0], [], [72], [], [0], [41], [93], [], [77], [], [0], [64], [0], [93], [0], [14], []]
  // ],
  // [
  //   ["DinnerPlates", "push", "popAtStack"],
  //   [[9], [96], [0]]
  // ],
  // [
  //   ["DinnerPlates", "popAtStack", "pop", "popAtStack", "pop", "pop", "pop", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "push", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "pop", "pop", "push", "pop"],
  //   [[2], [1], [], [0], [], [], [], [], [8], [0], [0], [0], [], [12], [0], [60], [46], [], [1], [0], [91], [], [0], [], [], [62], []]
  // ],
  // [
  //   ["DinnerPlates", "push", "push", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "pop", "pop"],
  //   [[5], [52], [34], [], [], [0], [0], [0], [0], [0], [0], [0], [], [93], [0], [0], [], [0], [], [], []]
  // ],
  // [
  //   ["DinnerPlates", "pop", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop", "popAtStack", "popAtStack", "push", "push", "push", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "pop", "push", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "push", "pop", "pop", "push", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "push", "push", "pop", "pop", "pop", "push", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "push"],
  //   [[9], [], [38], [0], [0], [], [], [], [], [], [0], [0], [14], [51], [11], [], [], [0], [], [76], [0], [20], [], [0], [], [], [0], [0], [0], [0], [0], [], [55], [], [], [97], [25], [], [0], [0], [0], [], [59], [69], [], [], [44], [0], [], [8], [0], [0], [0], [0], [78], [], [0], [0], [71], [43], [], [], [], [2], [0], [], [], [0], [0], [16], [88], [0], [0], [], [88]]
  // ],
];

let i = 0;
// const expected = [null,-1,-1,-1,-1,null,43,null,53,-1,null,null,59,88,-1,null,null,null,83,20,-1,-1,11,-1,-1,null,71,null,null,null,null,94,null,70,75,50,null,17,null,92,69,-1,-1,-1,-1,-1,-1,null,null,59,85,-1,null,20,-1,-1,-1,-1,null,50,-1,-1,-1,-1,-1,null,53,-1,-1,-1,-1,-1,-1,null,98,-1,-1,null,null,38,null,19,null,null,1,32,58,null,45,null,93,null,null,94,93,null,44,-1];
const expected = [null,null,null,null,null,null,null,null,null,461,437,498,-1,106,115,73,497,-1,-1,null,null,null,null,null,null,null,null,343,386,240,460,449,129,239,197,472,-1];
for (let test of tests) {
  // const mountainArray = new MountainArray(test);
  let dinnerPlates;
  console.time(i);
  for (let i = 0; i < test[0].length; i += 1) {
    const action = test[0][i];
    const vals = test[1][i];

    if (action === 'DinnerPlates') dinnerPlates = new DinnerPlates(...vals);
    else logOutList(dinnerPlates[action](...vals) + ` ... ${expected[i]}`);
  }
  // logOutList(numberOfArithmeticSlices(mountainArray));
  // logOutList(printRow(pathsWithMaxScore(test)));
  console.timeEnd(i);
  i += 1;
}

/*
["DinnerPlates", "push", "push", "push", "push", "push", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop"]
[[2], [1], [2], [3], [4], [5], [1], [20], [21], [1], [2], [], [], [], [], []]
["DinnerPlates", "pop", "pop", "popAtStack", "push", "push", "popAtStack", "pop", "push", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "pop", "push", "pop", "pop", "pop", "pop", "push", "push", "popAtStack", "pop", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "push", "popAtStack", "push", "push", "push"]
[[1], [], [], [0], [96], [44], [0], [], [1], [0], [], [], [0], [0], [0], [0], [], [], [2], [], [], [], [], [45], [53], [0], [], [], [21], [], [0], [], [0], [], [65], [19], [0], [55], [36], [32]]
["DinnerPlates", "pop", "push", "pop", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "pop", "push", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "pop", "pop", "pop", "popAtStack", "pop", "push", "pop", "push", "push", "popAtStack", "popAtStack", "popAtStack", "push", "push", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "push", "push", "popAtStack", "popAtStack", "popAtStack", "push", "push", "pop", "push", "popAtStack", "pop", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "popAtStack", "push", "push", "pop", "popAtStack", "popAtStack", "push", "push", "popAtStack", "push", "push", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "pop", "push", "push", "popAtStack", "pop", "pop", "pop"]
[[3], [], [6], [], [], [], [0], [], [], [0], [], [15], [], [24], [16], [0], [0], [], [0], [10], [10], [0], [0], [], [0], [0], [], [], [], [0], [], [88], [], [31], [1], [0], [0], [0], [43], [52], [], [20], [0], [0], [0], [97], [59], [0], [0], [0], [83], [18], [], [39], [0], [], [0], [54], [0], [], [0], [0], [], [96], [0], [12], [0], [93], [86], [], [0], [0], [34], [84], [0], [73], [1], [], [71], [0], [96], [], [0], [0], [], [54], [85], [0], [], [], []]
["DinnerPlates", "pop", "popAtStack", "push", "pop", "pop", "pop", "pop", "popAtStack", "pop", "pop", "pop", "popAtStack", "push", "popAtStack", "push", "pop", "popAtStack", "push", "pop", "push", "push", "pop", "pop", "push", "push", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "push", "push", "pop", "push", "pop", "pop", "popAtStack", "push", "popAtStack", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "push", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "push", "pop", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "push", "push", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "push", "pop"]
[[3], [], [0], [1], [], [], [], [], [0], [], [], [], [0], [74], [0], [70], [], [0], [37], [], [24], [90], [], [], [85], [18], [0], [0], [0], [], [86], [], [58], [15], [], [33], [], [], [0], [16], [0], [], [], [0], [], [], [0], [0], [37], [0], [0], [0], [0], [], [83], [22], [0], [86], [0], [0], [0], [0], [0], [0], [], [9], [0], [83], [5], [], [0], [3], [6], [0], [0], [], [55], [54], [0], [], [], [0], [], [1], [0], [], [0], [], [21], [0], [], [14], []]
["DinnerPlates", "pop", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "push", "push", "pop", "pop", "push", "push", "push", "push", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "push", "push", "push", "pop", "push", "push", "push", "push", "pop", "pop", "popAtStack", "popAtStack", "pop", "pop", "pop", "push", "pop", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "push", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "pop", "pop"]
[[6], [], [0], [0], [], [64], [0], [30], [68], [10], [], [], [9], [75], [65], [82], [0], [0], [90], [0], [0], [], [82], [0], [0], [0], [33], [], [90], [33], [28], [], [98], [76], [78], [83], [], [], [0], [0], [], [], [], [84], [], [0], [81], [45], [0], [0], [], [0], [0], [0], [0], [58], [24], [0], [], [0], [0], [0], [], [6], [], [0], [], [], [0], [], [], [0], [0], [], []]
["DinnerPlates", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "push", "pop", "popAtStack", "push", "push", "pop", "popAtStack", "popAtStack", "push", "push", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "push", "push", "push", "popAtStack", "push", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "popAtStack", "pop", "pop", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "push", "push", "popAtStack", "pop", "pop", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "push", "pop", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "pop", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "pop", "push", "push", "pop", "push", "pop", "push", "push", "popAtStack", "pop", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "push", "pop", "pop", "push", "popAtStack", "popAtStack"]
[[2], [1], [0], [0], [0], [43], [], [53], [], [0], [88], [59], [], [0], [0], [20], [83], [11], [0], [0], [0], [0], [], [0], [], [71], [0], [69], [94], [50], [70], [0], [75], [], [0], [], [17], [0], [92], [0], [], [], [0], [], [0], [], [0], [85], [59], [0], [], [], [20], [0], [0], [], [0], [], [50], [], [], [0], [], [0], [], [53], [0], [], [], [], [], [0], [], [98], [0], [], [], [58], [38], [], [19], [], [1], [32], [0], [], [0], [45], [0], [93], [0], [93], [94], [], [], [44], [0], [0]]
["DinnerPlates", "pop", "pop", "pop", "pop", "pop", "pop", "push", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "push", "push", "pop", "popAtStack", "push", "push", "push", "popAtStack", "pop", "popAtStack", "pop", "push", "push", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "push", "popAtStack", "pop", "push", "pop", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "pop", "popAtStack", "push", "popAtStack", "pop", "pop", "push", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "popAtStack", "pop", "pop", "pop", "popAtStack", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "push", "popAtStack", "pop", "popAtStack", "pop", "pop", "pop", "push", "push", "push", "pop", "popAtStack", "push", "popAtStack", "pop", "pop", "popAtStack"]
[[9], [], [], [], [], [], [], [78], [], [0], [0], [55], [0], [0], [], [0], [0], [0], [14], [30], [], [0], [12], [5], [68], [0], [], [0], [], [43], [32], [0], [0], [0], [40], [], [0], [0], [0], [0], [32], [10], [0], [], [12], [], [], [], [0], [], [11], [0], [], [0], [14], [0], [], [], [95], [0], [51], [0], [0], [], [0], [], [90], [0], [89], [0], [], [], [], [0], [65], [0], [0], [], [], [], [23], [0], [], [0], [], [], [], [13], [94], [22], [], [0], [16], [0], [], [], [0]]
["DinnerPlates", "push", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "pop", "pop", "push", "push", "pop", "popAtStack"]
[[6], [67], [0], [71], [0], [], [0], [], [], [75], [32], [], [0]]
["DinnerPlates", "popAtStack", "pop", "popAtStack", "pop", "pop", "push", "popAtStack", "push", "push", "push", "pop", "push", "push", "pop", "push", "push", "pop", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "push", "push", "popAtStack", "popAtStack", "push", "push", "pop", "pop", "pop", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "push", "push", "pop", "push", "pop", "popAtStack", "pop", "push", "pop", "pop", "push", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "push", "push", "pop"]
[[1], [1], [], [0], [], [], [93], [0], [56], [52], [91], [], [82], [56], [], [84], [51], [], [], [0], [], [], [0], [0], [35], [6], [0], [0], [41], [68], [], [], [], [0], [0], [], [0], [], [0], [], [36], [], [0], [], [78], [0], [0], [44], [0], [40], [0], [31], [67], [86], [], [83], [], [0], [], [14], [], [], [23], [0], [0], [], [80], [], [0], [68], [0], [0], [0], [78], [], [0], [24], [23], []]
["DinnerPlates", "popAtStack", "pop", "popAtStack", "push", "push", "push", "popAtStack", "pop", "push", "push", "pop", "popAtStack", "pop", "popAtStack", "push", "pop", "popAtStack", "push", "push", "pop", "pop", "pop", "pop", "pop", "popAtStack", "pop", "pop", "push", "push", "push", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "pop", "pop", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "push", "push", "pop", "popAtStack", "pop", "pop", "push", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "pop", "popAtStack", "push", "pop", "push", "push", "pop", "popAtStack"]
[[8], [1], [], [0], [75], [74], [97], [0], [], [29], [20], [], [0], [], [0], [73], [], [0], [69], [83], [], [], [], [], [], [0], [], [], [83], [97], [9], [], [], [0], [0], [0], [0], [50], [], [0], [], [0], [], [80], [], [0], [], [0], [0], [0], [], [], [], [0], [83], [], [0], [0], [7], [18], [], [0], [], [], [90], [10], [], [0], [0], [0], [], [0], [66], [], [0], [0], [], [0], [2], [], [40], [67], [], [0]]
["DinnerPlates", "push", "pop", "popAtStack", "popAtStack", "push", "pop", "pop", "push", "push", "push", "pop", "push", "pop", "popAtStack", "popAtStack", "popAtStack"]
[[6], [76], [], [0], [0], [30], [], [], [29], [44], [18], [], [60], [], [0], [0], [0]]
["DinnerPlates", "popAtStack", "push", "pop", "pop", "popAtStack", "popAtStack", "popAtStack"]
[[7], [1], [63], [], [], [0], [0], [0]]
["DinnerPlates", "push", "push", "push", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "push", "push", "pop", "push", "push", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "push", "popAtStack", "push", "push", "pop", "popAtStack"]
[[9], [77], [52], [61], [], [99], [0], [73], [], [0], [0], [0], [0], [64], [0], [], [0], [83], [61], [], [83], [81], [0], [], [66], [0], [0], [], [0], [], [0], [], [], [0], [], [18], [0], [62], [47], [], [0], [], [0], [0], [], [92], [], [0], [0], [0], [], [16], [], [0], [61], [0], [20], [88], [], [0]]
["DinnerPlates", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "pop", "pop", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "push", "push", "pop", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "pop", "push", "popAtStack", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "push", "push", "push", "pop", "popAtStack", "popAtStack", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "pop"]
[[5], [], [0], [], [19], [], [0], [], [0], [0], [45], [0], [0], [0], [0], [], [0], [0], [0], [90], [], [], [], [], [0], [0], [15], [0], [61], [85], [], [], [0], [], [0], [0], [0], [], [], [7], [0], [0], [99], [0], [9], [0], [54], [5], [1], [87], [], [0], [0], [], [70], [], [0], [], [0], []]
["DinnerPlates", "push", "push", "pop", "push", "pop", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "pop", "pop", "pop", "pop", "popAtStack", "pop", "pop", "pop", "pop", "push", "pop", "popAtStack", "push", "push", "push", "pop", "push", "push", "pop", "pop"]
[[6], [45], [87], [], [77], [], [], [0], [0], [76], [0], [], [], [], [], [0], [], [], [], [], [12], [], [0], [77], [4], [82], [], [47], [13], [], []]
["DinnerPlates", "push", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "push", "push", "pop", "push", "pop", "popAtStack", "pop", "popAtStack", "popAtStack", "push", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "pop", "pop", "push", "pop", "push", "push", "push", "popAtStack", "pop", "popAtStack", "push"]
[[7], [3], [0], [89], [0], [], [0], [88], [73], [], [8], [], [0], [], [0], [0], [64], [0], [], [0], [], [0], [], [], [49], [], [81], [92], [13], [0], [], [0], [12]]
["DinnerPlates", "pop", "pop", "pop", "pop", "pop", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "popAtStack", "push", "pop", "popAtStack", "pop", "pop", "popAtStack", "pop", "push", "pop", "popAtStack", "push", "push", "pop", "push", "pop", "popAtStack", "push", "popAtStack", "push", "popAtStack", "push", "pop"]
[[6], [], [], [], [], [], [0], [0], [], [0], [], [0], [46], [], [0], [], [], [0], [], [72], [], [0], [41], [93], [], [77], [], [0], [64], [0], [93], [0], [14], []]
["DinnerPlates", "push", "popAtStack"]
[[9], [96], [0]]
["DinnerPlates", "popAtStack", "pop", "popAtStack", "pop", "pop", "pop", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "push", "push", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "pop", "pop", "push", "pop"]
[[2], [1], [], [0], [], [], [], [], [8], [0], [0], [0], [], [12], [0], [60], [46], [], [1], [0], [91], [], [0], [], [], [62], []]
["DinnerPlates", "push", "push", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "pop", "popAtStack", "pop", "pop", "pop"]
[[5], [52], [34], [], [], [0], [0], [0], [0], [0], [0], [0], [], [93], [0], [0], [], [0], [], [], []]
["DinnerPlates", "pop", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop", "popAtStack", "popAtStack", "push", "push", "push", "pop", "pop", "popAtStack", "pop", "push", "popAtStack", "push", "pop", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "pop", "pop", "push", "push", "pop", "popAtStack", "popAtStack", "popAtStack", "pop", "push", "push", "pop", "pop", "push", "popAtStack", "pop", "push", "popAtStack", "popAtStack", "popAtStack", "popAtStack", "push", "pop", "popAtStack", "popAtStack", "push", "push", "pop", "pop", "pop", "push", "popAtStack", "pop", "pop", "popAtStack", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "push"]
[[9], [], [38], [0], [0], [], [], [], [], [], [0], [0], [14], [51], [11], [], [], [0], [], [76], [0], [20], [], [0], [], [], [0], [0], [0], [0], [0], [], [55], [], [], [97], [25], [], [0], [0], [0], [], [59], [69], [], [], [44], [0], [], [8], [0], [0], [0], [0], [78], [], [0], [0], [71], [43], [], [], [], [2], [0], [], [], [0], [0], [16], [88], [0], [0], [], [88]]


[null,-1,-1,-1,-1,null,43,null,53,-1,null,null,59,88,-1,null,null,null,83,20,0,0,11,0,-1,null,71,null,null,null,null,94,null,70,75,50,null,17,null,92,69,-1,-1,-1,-1,-1,-1,null,null,59,85,-1,null,20,-1,-1,-1,-1,null,50,-1,-1,-1,-1,-1,null,53,-1,-1,-1,-1,-1,-1,null,98,-1,-1,null,null,38,null,19,null,null,1,32,58,null,45,null,93,null,null,94,93,null,44,-1],
[null,-1,-1,-1,-1,null,43,null,53,-1,null,null,59,88,-1,null,null,null,83,20,-1,-1,11,-1,-1,null,71,null,null,null,null,94,null,70,75,50,null,17,null,92,69,-1,-1,-1,-1,-1,-1,null,null,59,85,-1,null,20,-1,-1,-1,-1,null,50,-1,-1,-1,-1,-1,null,53,-1,-1,-1,-1,-1,-1,null,98,-1,-1,null,null,38,null,19,null,null,1,32,58,null,45,null,93,null,null,94,93,null,44,-1],

let x = [
[null,null,null,null,null,null,4,null,null,20,21,5,3,2,1,-1],
[null,-1,-1,-1,null,null,96,44,null,1,-1,-1,-1,-1,-1,-1,-1,-1,null,2,-1,-1,-1,null,null,45,53,-1,null,21,-1,-1,-1,-1,null,null,65,null,null,null],
[null,-1,null,6,-1,-1,-1,-1,-1,-1,-1,null,15,null,null,16,24,-1,-1,null,null,10,10,-1,-1,-1,-1,-1,-1,-1,-1,null,88,null,null,1,31,-1,null,null,52,null,20,43,-1,null,null,59,97,-1,null,null,18,null,39,83,-1,null,54,-1,-1,-1,-1,null,96,null,12,null,null,86,93,-1,null,null,84,null,null,1,null,71,null,96,73,34,-1,null,null,85,54,-1,-1],
[null,-1,-1,null,1,-1,-1,-1,-1,-1,-1,-1,-1,null,74,null,70,-1,null,37,null,null,90,24,null,null,18,85,-1,-1,null,86,null,null,15,null,33,58,-1,null,16,-1,-1,-1,-1,-1,-1,-1,null,37,-1,-1,-1,-1,null,null,22,null,86,83,-1,-1,-1,-1,-1,null,9,null,null,5,83,null,null,6,3,-1,null,null,54,55,-1,-1,-1,null,1,-1,-1,-1,null,21,-1,null,14],
[null,-1,-1,-1,-1,null,64,null,null,null,10,68,null,null,null,null,82,65,null,90,75,9,null,82,30,-1,null,33,null,null,null,28,null,null,null,null,83,78,76,98,33,90,-1,null,84,-1,null,null,45,81,-1,-1,-1,-1,-1,null,null,24,58,-1,-1,-1,-1,null,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[null,-1,-1,-1,-1,null,43,null,53,-1,null,null,59,88,-1,null,null,null,83,20,0,0,11,0,-1,null,71,null,null,null,null,94,null,70,75,50,null,17,null,92,69,-1,-1,-1,-1,-1,-1,null,null,59,85,-1,null,20,-1,-1,-1,-1,null,50,-1,-1,-1,-1,-1,null,53,-1,-1,-1,-1,-1,-1,null,98,-1,-1,null,null,38,null,19,null,null,1,32,58,null,45,null,93,null,null,94,93,null,44,-1],
[null,-1,-1,-1,-1,-1,-1,null,78,-1,-1,null,55,-1,-1,-1,-1,-1,null,null,30,14,null,null,null,68,5,12,-1,null,null,32,43,-1,null,40,-1,-1,-1,-1,null,null,10,32,null,12,-1,-1,-1,-1,null,11,-1,-1,null,14,-1,-1,null,95,null,51,-1,-1,-1,-1,null,90,null,89,-1,-1,-1,-1,null,65,-1,-1,-1,-1,null,23,-1,-1,-1,-1,-1,null,null,null,22,94,null,16,13,-1,-1],
[null,null,67,null,71,-1,-1,-1,-1,null,null,32,75],
[null,-1,-1,-1,-1,-1,null,93,null,null,null,91,null,null,56,null,null,51,84,56,82,52,-1,-1,null,null,35,-1,null,null,68,6,41,-1,-1,-1,-1,-1,-1,-1,null,36,-1,-1,null,78,-1,null,44,null,40,null,null,null,86,null,83,31,67,null,14,-1,null,23,-1,-1,null,80,-1,null,68,-1,-1,null,78,-1,null,null,23],
[null,-1,-1,-1,null,null,null,97,74,null,null,20,29,75,-1,null,73,-1,null,null,83,69,-1,-1,-1,-1,-1,-1,null,null,null,9,97,83,-1,-1,-1,null,50,-1,-1,-1,-1,null,80,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,83,-1,-1,null,null,18,7,-1,-1,null,null,10,90,-1,-1,-1,-1,null,66,-1,-1,-1,-1,null,2,null,null,67,40],
[null,null,76,-1,-1,null,30,-1,null,null,null,18,null,60,44,29,-1],
[null,-1,null,63,-1,-1,-1,-1],
[null,null,null,null,61,null,99,null,73,52,77,-1,-1,null,64,-1,-1,null,null,61,null,null,81,83,null,66,83,-1,-1,-1,-1,-1,-1,-1,-1,null,18,null,null,47,62,-1,-1,-1,-1,null,92,-1,-1,-1,-1,null,16,-1,null,61,null,null,88,20],
[null,-1,-1,-1,null,19,-1,-1,-1,-1,null,45,-1,-1,-1,-1,-1,-1,-1,null,90,-1,-1,-1,-1,-1,null,15,null,null,85,61,-1,-1,-1,-1,-1,-1,-1,null,7,-1,null,99,null,9,null,null,null,null,87,1,5,54,null,70,-1,-1,-1,-1],
[null,null,null,87,null,77,45,-1,-1,null,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,12,-1,null,null,null,82,null,null,13,47],
[null,null,3,null,89,-1,-1,null,null,73,null,8,88,-1,-1,-1,null,64,-1,-1,-1,-1,-1,-1,null,49,null,null,null,13,92,81,null],
[null,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,46,-1,-1,-1,-1,-1,null,72,-1,null,null,93,null,77,41,null,64,null,93,null,14],
[null,null,96],
[null,-1,-1,-1,-1,-1,-1,-1,null,8,-1,-1,-1,null,12,null,null,46,null,1,null,91,60,-1,-1,null,62],
[null,null,null,34,52,-1,-1,-1,-1,-1,-1,-1,-1,null,93,-1,-1,-1,-1,-1,-1],
[null,-1,null,38,-1,-1,-1,-1,-1,-1,-1,-1,null,null,null,11,51,14,-1,null,76,null,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,55,-1,null,null,25,97,-1,-1,-1,null,null,69,59,null,44,-1,null,8,-1,-1,-1,null,78,-1,-1,null,null,43,71,-1,null,2,-1,-1,-1,-1,null,null,88,16,-1,null],
]


let y = [
[null,null,null,null,null,null,4,null,null,20,21,5,3,2,1,-1],
[null,-1,-1,-1,null,null,96,44,null,1,-1,-1,-1,-1,-1,-1,-1,-1,null,2,-1,-1,-1,null,null,45,53,-1,null,21,-1,-1,-1,-1,null,null,65,null,null,null],
[null,-1,null,6,-1,-1,-1,-1,-1,-1,-1,null,15,null,null,16,24,-1,-1,null,null,10,10,-1,-1,-1,-1,-1,-1,-1,-1,null,88,null,null,1,31,-1,null,null,52,null,20,43,-1,null,null,59,97,-1,null,null,18,null,39,83,-1,null,54,-1,-1,-1,-1,null,96,null,12,null,null,86,93,-1,null,null,84,null,null,1,null,71,null,96,73,34,-1,null,null,85,54,-1,-1],
[null,-1,-1,null,1,-1,-1,-1,-1,-1,-1,-1,-1,null,74,null,70,-1,null,37,null,null,90,24,null,null,18,85,-1,-1,null,86,null,null,15,null,33,58,-1,null,16,-1,-1,-1,-1,-1,-1,-1,null,37,-1,-1,-1,-1,null,null,22,null,86,83,-1,-1,-1,-1,-1,null,9,null,null,5,83,null,null,6,3,-1,null,null,54,55,-1,-1,-1,null,1,-1,-1,-1,null,21,-1,null,14],
[null,-1,-1,-1,-1,null,64,null,null,null,10,68,null,null,null,null,82,65,null,90,75,9,null,82,30,-1,null,33,null,null,null,28,null,null,null,null,83,78,76,98,33,90,-1,null,84,-1,null,null,45,81,-1,-1,-1,-1,-1,null,null,24,58,-1,-1,-1,-1,null,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[null,-1,-1,-1,-1,null,43,null,53,-1,null,null,59,88,-1,null,null,null,83,20,-1,-1,11,-1,-1,null,71,null,null,null,null,94,null,70,75,50,null,17,null,92,69,-1,-1,-1,-1,-1,-1,null,null,59,85,-1,null,20,-1,-1,-1,-1,null,50,-1,-1,-1,-1,-1,null,53,-1,-1,-1,-1,-1,-1,null,98,-1,-1,null,null,38,null,19,null,null,1,32,58,null,45,null,93,null,null,94,93,null,44,-1],
[null,-1,-1,-1,-1,-1,-1,null,78,-1,-1,null,55,-1,-1,-1,-1,-1,null,null,30,14,null,null,null,68,5,12,-1,null,null,32,43,-1,null,40,-1,-1,-1,-1,null,null,10,32,null,12,-1,-1,-1,-1,null,11,-1,-1,null,14,-1,-1,null,95,null,51,-1,-1,-1,-1,null,90,null,89,-1,-1,-1,-1,null,65,-1,-1,-1,-1,null,23,-1,-1,-1,-1,-1,null,null,null,22,94,null,16,13,-1,-1],
[null,null,67,null,71,-1,-1,-1,-1,null,null,32,75],
[null,-1,-1,-1,-1,-1,null,93,null,null,null,91,null,null,56,null,null,51,84,56,82,52,-1,-1,null,null,35,-1,null,null,68,6,41,-1,-1,-1,-1,-1,-1,-1,null,36,-1,-1,null,78,-1,null,44,null,40,null,null,null,86,null,83,31,67,null,14,-1,null,23,-1,-1,null,80,-1,null,68,-1,-1,null,78,-1,null,null,23],
[null,-1,-1,-1,null,null,null,97,74,null,null,20,29,75,-1,null,73,-1,null,null,83,69,-1,-1,-1,-1,-1,-1,null,null,null,9,97,83,-1,-1,-1,null,50,-1,-1,-1,-1,null,80,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,83,-1,-1,null,null,18,7,-1,-1,null,null,10,90,-1,-1,-1,-1,null,66,-1,-1,-1,-1,null,2,null,null,67,40],
[null,null,76,-1,-1,null,30,-1,null,null,null,18,null,60,44,29,-1],
[null,-1,null,63,-1,-1,-1,-1],
[null,null,null,null,61,null,99,null,73,52,77,-1,-1,null,64,-1,-1,null,null,61,null,null,81,83,null,66,83,-1,-1,-1,-1,-1,-1,-1,-1,null,18,null,null,47,62,-1,-1,-1,-1,null,92,-1,-1,-1,-1,null,16,-1,null,61,null,null,88,20],
[null,-1,-1,-1,null,19,-1,-1,-1,-1,null,45,-1,-1,-1,-1,-1,-1,-1,null,90,-1,-1,-1,-1,-1,null,15,null,null,85,61,-1,-1,-1,-1,-1,-1,-1,null,7,-1,null,99,null,9,null,null,null,null,87,1,5,54,null,70,-1,-1,-1,-1],
[null,null,null,87,null,77,45,-1,-1,null,76,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,12,-1,null,null,null,82,null,null,13,47],
[null,null,3,null,89,-1,-1,null,null,73,null,8,88,-1,-1,-1,null,64,-1,-1,-1,-1,-1,-1,null,49,null,null,null,13,92,81,null],
[null,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,46,-1,-1,-1,-1,-1,null,72,-1,null,null,93,null,77,41,null,64,null,93,null,14],
[null,null,96],
[null,-1,-1,-1,-1,-1,-1,-1,null,8,-1,-1,-1,null,12,null,null,46,null,1,null,91,60,-1,-1,null,62],
[null,null,null,34,52,-1,-1,-1,-1,-1,-1,-1,-1,null,93,-1,-1,-1,-1,-1,-1],
[null,-1,null,38,-1,-1,-1,-1,-1,-1,-1,-1,null,null,null,11,51,14,-1,null,76,null,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,null,55,-1,null,null,25,97,-1,-1,-1,null,null,69,59,null,44,-1,null,8,-1,-1,-1,null,78,-1,-1,null,null,43,71,-1,null,2,-1,-1,-1,-1,null,null,88,16,-1,null],
]

for(let i = 0; i < x.length; i += 1) {
  if(x[i].length !== y[i].length) console.log('wrong len', i);
  for(let j = 0; j < x[i].length; j += 1) {
    if(x[i][j] !== y[i][j]) console.log({row: i}, {col: j}, {x: x[i][j]}, {y: y[i][j]})
  }
}
*/