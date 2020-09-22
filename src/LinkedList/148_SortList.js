import { ListNode, buildList, serializeList } from './helpers';

/*
Given the head of a linked list, return the list after sorting it in ascending order.

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?



Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []


Constraints:

The number of nodes in the list is in the range [0, 5 * 104].
-105 <= Node.val <= 105
*/

var sortList = function (head) {
  const [left, right] = splitList(head);

  if (!right) return left;

  return mergeLists(sortList(left), sortList(right))
};

const splitList = (head) => {
  const pointer = new ListNode();
  pointer.next = head;
  let slow = pointer;
  let fast = pointer;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  fast = slow.next;
  slow.next = null;

  if(fast === head) fast = null;

  return [head, fast];
}

const mergeLists = (list1, list2) => {
  let head = new ListNode();
  let curr = head;

  while (list1 || list2) {
    if (!list1) {
      curr.next = list2;
      list2 = list2.next;
    } else if (!list2) {
      curr.next = list1;
      list1 = list1.next;
    } else if (list1.val < list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }

    curr = curr.next;
  }

  return head.next;
};

const tests = [
  [4, 2, 1, 3],
  [-1, 5, 3, 4, 0],
];

for (let test of tests) {
  const list = buildList(test);
  logOutList(serializeList(sortList(list)))
}