/*
Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

Example 1:
Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
Output: ["i", "love"]
Explanation: "i" and "love" are the two most frequent words.
    Note that "i" comes before "love" due to a lower alphabetical order.
Example 2:
Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
Output: ["the", "is", "sunny", "day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
    with the number of occurrence being 4, 3, 2 and 1 respectively.
Note:
You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Input words contain only lowercase letters.
Follow up:
Try to solve it in O(n log k) time and O(n) extra space.
*/

var topKFrequent = function (words, k) {
  const counts = Object.entries(words.reduce((freq, word) => {
    freq[word] = freq[word] + 1 || 1;
    return freq;
  }, {}));

  heapify(counts);

  const topK = [];
  while (topK.length < k) {
    topK.push(pop(counts));
  }

  return topK;
};

const heapify = (arr) => {
  const start = Math.floor(arr.length / 2) - 1;
  for (let i = start; i >= 0; i -= 1) {
    siftDown(i, arr);
  }
}

const siftDown = (start, arr) => {
  let curr = start;
  while (true) {
    const left = 2 * curr + 1;
    const right = left + 1;
    let next = curr;

    if (arr[left] && wrongOrder(arr[next], arr[left])) next = left;
    if (arr[right] && wrongOrder(arr[next], arr[right])) next = right;

    if (next !== curr) {
      [arr[curr], arr[next]] = [arr[next], arr[curr]];
      curr = next;
    } else break;
  }
}

const wrongOrder = (a, b) => {
  return (
    a[1] < b[1]
    || (a[1] === b[1] && a[0] > b[0])
  );
}

const pop = (arr) => {
  const last = arr.length - 1;
  [arr[0], arr[last]] = [arr[last], arr[0]];
  const res = arr.pop()[0];
  siftDown(0, arr);
  return res;
}

const tests = [
  [["i", "love", "leetcode", "i", "love", "coding"], 2],
  [["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4],
];

for (let test of tests) {
  logOutList(printRow(topKFrequent(...test)));
}