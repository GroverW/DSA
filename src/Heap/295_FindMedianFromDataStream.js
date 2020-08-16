import Heap from './helpers';
import { median } from 'src/Math';

var MedianFinder = function () {
  this.minHeap = new Heap((a, b) => a < b);
  this.maxHeap = new Heap((a, b) => a > b);
};


MedianFinder.prototype.addNum = function (num) {
  if (num >= this.minHeap.peak()) {
    this.minHeap.push(num);
    while (this.minHeap.size() - this.maxHeap.size() > 1) {
      this.maxHeap.push(this.minHeap.pop());
    }
  } else {
    this.maxHeap.push(num);
    while (this.maxHeap.size() - this.minHeap.size() > 1) {
      this.minHeap.push(this.maxHeap.pop());
    }
  }
};


MedianFinder.prototype.findMedian = function () {
  if (this.maxHeap.size() === this.minHeap.size()) {
    return (this.maxHeap.peak() + this.minHeap.peak()) / 2;
  } else if (this.maxHeap.size() > this.minHeap.size()) {
    return this.maxHeap.peak();
  }

  return this.minHeap.peak();
};

const test = [7, 5, 19, 9, 0, 3, 16, 2, 3, 14, 4, 9, 2, 0, 0, 15, 17, 18, 19, 5, 18, 3, 7, 5, 3, 0, 2, 18, 9, 12, 10, 1, 13, 4, 10, 8, 0, 12, 1, 5];

const arr = [];
const medianFinder = new MedianFinder();

for (let val of test) {
  arr.push(val);
  medianFinder.addNum(val);
  console.log(medianFinder.findMedian(), median(arr));
}