import { ListNodeInterface, ListVal, SerializedList } from './types';

export class ListNode implements ListNodeInterface {
  val: ListVal;
  next: ListNode | null;

  constructor(val: ListVal = null, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export const buildList = (list: SerializedList): ListNode | null => {
  const head: ListNode = new ListNode();
  let curr: ListNode = head;

  for(let val of list) {
    const node = new ListNode(val);
    curr.next = node;
    curr = curr.next;
  }

  return head.next;
}

export const serializeList = (head: ListNode): SerializedList => {
  const nodeVals: SerializedList = [];
  let curr: ListNode | null = head;

  while (curr) {
    nodeVals.push(curr.val);
    curr = curr.next;
  }

  return nodeVals;
}

export const printList = (head: ListNode): string => serializeList(head).join('->');
