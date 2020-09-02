/*
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements from the stream. For each call to the method KthLargest.add, return the element representing the kth largest element in the stream.

Example:

int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
*/


/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  this.heap = nums;
  this.k = k;

  for(let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i -= 1) {
      this.siftDown(i);
  }

  while(this.heap.length > this.k) {
      this.heap[0] = this.heap.pop();
      this.siftDown(0);
  }
};

/**
* @param {number} val
* @return {number}
*/
KthLargest.prototype.add = function(val) {
  if(this.heap.length < this.k) {
      this.heap.push(val);
      this.siftUp();
  } else if (val > this.heap[0]) {
      this.heap[0] = val;
      this.siftDown(0);
  }

  return this.heap[0];
};

/**
* Your KthLargest object will be instantiated and called as such:
* var obj = new KthLargest(k, nums)
* var param_1 = obj.add(val)
*/

KthLargest.prototype.siftDown = function(start) {
  let curr = start;
  const arr = this.heap;

  while(true) {
      const left = curr * 2 + 1;
      const right = left + 1;
      let next = curr;

      if(arr[next] > arr[left]) next = left;
      if(arr[next] > arr[right]) next = right;

      if(next !== curr) {
          [arr[curr], arr[next]] = [arr[next], arr[curr]];
          curr = next;
      } else {
          break;
      }
  }
}

KthLargest.prototype.siftUp = function() {
  let curr = this.heap.length - 1;
  const arr = this.heap;

  while(curr >= 0) {
      const parent = Math.ceil(curr / 2) - 1;
      let next = curr;

      if(arr[parent] > arr[curr]) next = parent;

      if(next !== curr) {
          [arr[curr], arr[next]] = [arr[next], arr[curr]];
          curr = next;
      } else {
          break;
      }
  }
}