import { ListNode, buildList } from './helpers';


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