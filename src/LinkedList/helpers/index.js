export class ListNode {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

export const buildList = (list) => {
  const head = new ListNode();
  let curr = head;

  for(let val of list) {
    const node = new ListNode(val);
    curr.next = node;
    curr = curr.next;
  }

  return head.next;
}

export const serializeList = (head) => {
  const nodeVals = [];
  let curr = head;

  while(curr) {
    nodeVals.push(curr.val);
    curr = curr.next;
  }

  return nodeVals;
}

export const printList = (head) => serializeList(head).join('->');
