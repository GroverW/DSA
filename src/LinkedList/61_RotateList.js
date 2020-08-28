import { buildList, serializeList } from './helpers';

/*
Given a linked list, rotate the list to the right by k places, where k is non-negative.

Example 1:

Input: 1->2->3->4->5->NULL, k = 2
Output: 4->5->1->2->3->NULL
Explanation:
rotate 1 steps to the right: 5->1->2->3->4->NULL
rotate 2 steps to the right: 4->5->1->2->3->NULL
Example 2:

Input: 0->1->2->NULL, k = 4
Output: 2->0->1->NULL
Explanation:
rotate 1 steps to the right: 2->0->1->NULL
rotate 2 steps to the right: 1->2->0->NULL
rotate 3 steps to the right: 0->1->2->NULL
rotate 4 steps to the right: 2->0->1->NULL
*/

var rotateRight = function(head, k) {
  if(!head) return null;
  let fast = head;
  let slow = head;
  let count = k % getLength(head);

  while(count) {
    fast = fast.next;

    count -= 1;
  }

  while(fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  fast.next = head;
  const start = slow.next;
  slow.next = null;

  return start;
};

const getLength = (head) => {
  let curr = head;
  let length = 0;

  while(curr) {
    length += 1;
    curr = curr.next;
  }

  return length;
}

const tests = [
  [[1, 2, 3, 4, 5], 2],
  [[1, 2, 3, 4, 5], 1],
  [[1, 2, 3], 4],
  [[1, 2, 3], 5],
  [[1, 2, 3], 6],
  [[1,2], 5],
];

for (let [vals, amt] of tests) {
  const list = buildList(vals);
  logOutList(serializeList(rotateRight(list, amt)))
}