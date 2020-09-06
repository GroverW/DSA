/*
n a warehouse, there is a row of barcodes, where the i-th barcode is barcodes[i].

Rearrange the barcodes so that no two adjacent barcodes are equal.  You may return any answer, and it is guaranteed an answer exists.



Example 1:

Input: [1,1,1,2,2,2]
Output: [2,1,2,1,2,1]
Example 2:

Input: [1,1,1,1,2,2,3,3]
Output: [1,3,1,3,2,1,2,1]
*/

var rearrangeBarcodes = function (barcodes) {
  const counts = Object.entries(barcodes.reduce((freq, val) => {
    freq[val] = freq[val] + 1 || 1;
    return freq;
  }, {}))

  heapify(counts);

  const reorganized = [];
  while (counts.length) {
    const [first, second] = pop2(counts);
    reorganized.push(first);
    if (second) reorganized.push(second);
  }

  return reorganized;
};

const heapify = (arr) => {
  const start = Math.floor(arr.length / 2) - 1;
  for (let i = start; i >= 0; i -= 1) {
    siftDown(i, arr);
  }
}

const pop = (i, heap) => {
  const res = heap[i][0];
  heap[i][1] -= 1;
  if (!heap[i][1]) {
    const last = heap.length - 1;
    [heap[i], heap[last]] = [heap[last], heap[i]];
    heap.pop();
  }
  siftDown(i, heap);
  return res;
}

const pop2 = (heap) => {
  let first;
  let second;
  if (heap[1]) second = pop(1, heap);
  first = pop(0, heap);
  return [first, second];
}

const siftDown = (start, arr) => {
  let curr = start;
  while (true) {
    const left = curr * 2 + 1;
    const right = left + 1;
    let next = curr;

    if (arr[left] && arr[next][1] < arr[left][1]) next = left;
    if (arr[right] && arr[next][1] < arr[right][1]) next = right;

    if (next !== curr) {
      [arr[curr], arr[next]] = [arr[next], arr[curr]];
      curr = next;
    } else break;
  }
}

const tests = [
  [1, 1, 1, 1, 2, 2, 2],
  [1, 1, 1, 1, 2, 2, 3, 3],
];

for (let test of tests) {
  logOutList(printRow(rearrangeBarcodes(test)));
}

// SIMPLER!!!
var rearrangeBarcodes = function (barcodes) {
  const map = {};
  barcodes.forEach(b => map[b] = (map[b] || 0) + 1);
  const keys = Object.keys(map).sort((k1, k2) => map[k1] - map[k2]);

  let idx = 1;
  for (let k of keys) {
    let t = map[k];

    for (let i = 0; i < t; i++) {
      if (idx >= barcodes.length) idx = 0;
      barcodes[idx] = k;
      idx += 2;
    }
  }

  return barcodes;
};