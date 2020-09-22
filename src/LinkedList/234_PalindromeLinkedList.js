import { ListNode, buildList } from './helpers';

/*
Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true
Follow up:
Could you do it in O(n) time and O(1) space?
*/

var isPalindrome = function (head) {
  if (!head) return true;

  const start = new ListNode();
  start.next = head;
  let slow = start;
  let slowFollower = start;
  let slowLeader = start.next;
  let fast = start;

  while (fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slowLeader;
    slowLeader = slowLeader.next;
    slow.next = slowFollower;
    slowFollower = slow;
  }

  head.next = null;
  fast = fast.next ? slowLeader.next : slowLeader;

  while (fast && slow) {
    if (fast.val !== slow.val) return false;
    fast = fast.next;
    slow = slow.next;
  }

  return true;
};

const tests = [
  [1, 2],
  [1, 2, 2, 1],
  [1, 2, 3, 2, 1],
  [1, 2, 3, 3, 1],
  [1, 2, 3, 3, 2, 1],
];

for (let test of tests) {
  const head = buildList(test)
  logOutList(isPalindrome(head))
}