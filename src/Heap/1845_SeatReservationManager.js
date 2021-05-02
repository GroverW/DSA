/*
Design a system that manages the reservation state of n seats that are numbered from 1 to n.

Implement the SeatManager class:

SeatManager(int n) Initializes a SeatManager object that will manage n seats numbered from 1 to n. All seats are initially available.
int reserve() Fetches the smallest-numbered unreserved seat, reserves it, and returns its number.
void unreserve(int seatNumber) Unreserves the seat with the given seatNumber.
 

Example 1:

Input
["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"]
[[5], [], [], [2], [], [], [], [], [5]]
Output
[null, 1, 2, null, 2, 3, 4, 5, null]

Explanation
SeatManager seatManager = new SeatManager(5); // Initializes a SeatManager with 5 seats.
seatManager.reserve();    // All seats are available, so return the lowest numbered seat, which is 1.
seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
seatManager.unreserve(2); // Unreserve seat 2, so now the available seats are [2,3,4,5].
seatManager.reserve();    // The available seats are [2,3,4,5], so return the lowest of them, which is 2.
seatManager.reserve();    // The available seats are [3,4,5], so return the lowest of them, which is 3.
seatManager.reserve();    // The available seats are [4,5], so return the lowest of them, which is 4.
seatManager.reserve();    // The only available seat is seat 5, so return 5.
seatManager.unreserve(5); // Unreserve seat 5, so now the available seats are [5].
 

Constraints:

1 <= n <= 105
1 <= seatNumber <= n
For each call to reserve, it is guaranteed that there will be at least one unreserved seat.
For each call to unreserve, it is guaranteed that seatNumber will be reserved.
At most 105 calls in total will be made to reserve and unreserve.

POST: https://leetcode.com/problems/seat-reservation-manager/discuss/1188120/JavaScript-MinHeap
*/

var SeatManager = function (n) {
  this.nextAvailable = 0;
  this.heap = [];
};

SeatManager.prototype.reserve = function () {
  if (this.heap.length) {
    return pop(this.heap);
  }
  this.nextAvailable += 1;
  return this.nextAvailable;
};

SeatManager.prototype.unreserve = function (seatNumber) {
  push(seatNumber, this.heap);
};


// the heap
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
  const res = heap.pop();
  siftDown(heap);
  return res;
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

const maxLen = 200;

const findRandomReserved = (reserved) => {
  const available = reserved
    .map((_, seatNum) => seatNum)
    .filter((seat) => reserved[seat]);
  return randomOption(available);
}

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(10, maxLen);

  const commands = ["SeatManager"];
  const actions = [[len]];

  let reserved = 0;
  const reservations = new Array(len).fill(false);

  const countCalls = numberBetween(10, len * 2);
  for (let i = 0; i < countCalls; i += 1) {
    if (!reserved || Math.random() < .6) {
      commands.push("reserve");
      const seat = reservations.findIndex((reserved) => !reserved);
      reservations[seat] = true;
      reserved += 1;
      actions.push([]);
    } else {
      commands.push('unreserve');
      const seatNumber = findRandomReserved(reservations);
      reservations[seatNumber] = false;
      reserved -= 1;
      actions.push([seatNumber + 1])
    }
  }

  // logOutList('"' + s + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(nums));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([commands, actions])
}