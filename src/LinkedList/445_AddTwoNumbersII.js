/*
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

Example:

Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7
*/

var addTwoNumbers = function (l1, l2) {
  let num1 = '';
  let num2 = '';
  let ptr1 = l1;
  let ptr2 = l2;

  while (ptr1 || ptr2) {
    if (ptr1) {
      num1 += ptr1.val;
      ptr1 = ptr1.next;
    }
    if (ptr2) {
      num2 += ptr2.val;
      ptr2 = ptr2.next;
    }
  }

  let n1 = num1.length - 1;
  let n2 = num2.length - 1;
  let total = '';

  let carry = 0;

  while (n1 >= 0 || n2 >= 0) {
    const val1 = n1 >= 0 ? +num1[n1] : 0;
    const val2 = n2 >= 0 ? +num2[n2] : 0;
    const sum = val1 + val2 + carry;
    carry = sum > 9;
    total = (sum % 10) + total;
    n1 -= 1;
    n2 -= 1;
  }

  if (carry) total = '1' + total;


  let start = new ListNode();
  let curr = start;
  for (let num of total) {
    curr.next = new ListNode(+num);
    curr = curr.next;
  }

  return start.next;
};