import { Node, buildList, serializeList } from './helpers';


var sortList = function (head) {
  const [left, right] = splitList(head);

  if (!right) return left;

  return mergeLists(sortList(left), sortList(right))
};

const splitList = (head) => {
  const pointer = new Node();
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
  let head = new Node();
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