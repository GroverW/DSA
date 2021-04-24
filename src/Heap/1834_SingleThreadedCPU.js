/*
You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.

You have a single-threaded CPU that can process at most one task at a time and will act in the following way:

If the CPU is idle and there are no available tasks to process, the CPU remains idle.
If the CPU is idle and there are available tasks, the CPU will choose the one with the shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
Once a task is started, the CPU will process the entire task without stopping.
The CPU can finish a task then start a new one instantly.
Return the order in which the CPU will process the tasks.

 

Example 1:

Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
Output: [0,2,3,1]
Explanation: The events go as follows: 
- At time = 1, task 0 is available to process. Available tasks = {0}.
- Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
- At time = 2, task 1 is available to process. Available tasks = {1}.
- At time = 3, task 2 is available to process. Available tasks = {1, 2}.
- Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
- At time = 4, task 3 is available to process. Available tasks = {1, 3}.
- At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
- At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
- At time = 10, the CPU finishes task 1 and becomes idle.
Example 2:

Input: tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
Output: [4,3,2,0,1]
Explanation: The events go as follows:
- At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
- Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
- At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
- At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
- At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
- At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
- At time = 40, the CPU finishes task 1 and becomes idle.
 

Constraints:

tasks.length == n
1 <= n <= 105
1 <= enqueueTimei, processingTimei <= 109
*/

var getOrder = function(tasks) {
  tasks.forEach((task, i) => task.push(i))
  tasks.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let endTime = 0;
  let current = 0;
  const heap = [];
  const order = [];
  while(current < tasks.length) {
    if (tasks[current][0] <= endTime) {
      tasks[current].push(current);
      push(tasks[current], heap);
      current += 1;
    } else if (!heap.length) {
      endTime = tasks[current][0];
    } else {
      const next = pop(heap);
      endTime += next[1];
      order.push(next[2]);
    }
  }
  
  while(heap.length) {
    const next = pop(heap);
    order.push(next[2]);
  }
  
  return order;
};

const compare = (node1, node2) => {
  return (
    node1
    && (
      node1[1] < node2[1]
      || node1[1] === node2[1]
      && node1[2] < node2[2]
    )
  );
}


const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    
    if (compare(heap[current], heap[parent])) {
      [heap[parent], heap[current]] = [heap[current], heap[parent]];
      current = parent;
    } else break;
  }
}

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  const res = heap.pop();
  siftDown(heap);
  return res;
}

const siftDown = (heap) => {
  let current = 0;
  while(true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;
    
    if(compare(heap[left], heap[next])) next = left;
    if(compare(heap[right], heap[next])) next = right;
    
    if(next !== current) {
      [heap[next], heap[current]] = [heap[current], heap[next]];
      current = next;
    } else break;
  }
}

/*
  [9, 10, 15, 16, 24, 50, 55]

  [9, 10, ]
*/

const maxLen: number = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const processes = new Array(len).fill(0)
    .map(() => [numberBetween(1, 100), numberBetween(1, 20)]);

  // logOutList('"' + words.trimEnd() + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([nums1, nums2])
}

const tests: Indexable<any>[] = [
  [[1,2],[2,4],[3,2],[4,1]],
  [[2,4],[1,2],[3,2],[4,1]]
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(printRow(getOrder(test)));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/
