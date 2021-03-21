/*
Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

If possible, output any possible result.  If not possible, return the empty string.

Example 1:

Input: S = "aab"
Output: "aba"
Example 2:

Input: S = "aaab"
Output: ""
Note:

S will consist of lowercase letters and have length in range [1, 500].
*/

// w/ sort
var reorganizeString = function (s) {
  const reorganized = s.split('')
  const counts = reorganized.reduce((counts, letter) => {
    counts[letter] = counts[letter] + 1 || 1;
    return counts;
  }, {});
  
  const letterCounts = Object.entries(counts)
    .sort((countsA, countsB) => countsA[1] - countsB[1])
  
  if (letterCounts[letterCounts.length - 1][1] > Math.ceil(s.length / 2)) return '';
  
  let idx = 1;
  for (let [letter, count] of letterCounts) {
    for (let i = 0; i < count; i++) {
      if (idx >= s.length) idx = 0;
      reorganized[idx] = letter;
      idx += 2;
    }
  }
  return reorganized.join('');
};

// w/ heap (too complicated)
var reorganizeString = function (S) {
  const freq = {};
  let max = 0;


  for (let char of S) {
    freq[char] = freq[char] + 1 || 1;
    max = Math.max(max, freq[char]);
  }

  if (max > Math.ceil(S.length / 2)) return '';

  const counts = heapify(Object.entries(freq));

  let organized = '';

  while (counts.length) {
    const [first, second] = pop2(counts);
    organized += first + second;
  }

  return organized;
};

const heapify = (arr) => {
  const start = Math.floor((arr.length / 2) - 1);
  for (let i = start; i >= 0; i -= 1) siftDown(i, arr);

  return arr;
}

const siftDown = (start, arr) => {
  let curr = start;
  while (true) {
    const left = 2 * curr + 1;
    const right = left + 1;
    let next = curr;

    if (arr[left] && arr[next][1] < arr[left][1]) next = left;
    if (arr[right] && arr[next][1] < arr[right][1]) next = right;

    if (next !== curr) {
      [arr[next], arr[curr]] = [arr[curr], arr[next]];
      curr = next;
    } else {
      break;
    }
  }
}

const pop2 = (heap) => {
  const leftChild = (heap[1] && heap[1][1]) || 0;
  const rightChild = (heap[2] && heap[2][1]) || 0;
  const child = leftChild >= rightChild ? 1 : 2;

  let second = '';

  if (leftChild) {
    const last = heap.length - 1;
    second = heap[child][0];
    heap[child][1] -= 1;
    if (!heap[child][1]) {
      [heap[child], heap[last]] = [heap[last], heap[child]]
      heap.pop();
    }
    siftDown(child, heap);
  }

  const first = heap[0][0];
  heap[0][1] -= 1;
  if (!heap[0][1]){
    const last = heap.length - 1;
    [heap[0], heap[last]] = [heap[last], heap[0]]
    heap.pop()
  };
  siftDown(0, heap);

  return [first, second];
}