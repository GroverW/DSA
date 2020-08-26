class Node {
  constructor(val, next) {
    this.val = val || null;
    this.next = next || null;
  }
}

const buildList = (list) => {
  const head = new Node();
  let curr = head;

  for(let val of list) {
    const node = new Node(val);
    curr.next = node;
    curr = curr.next;
  }

  return head.next;
}

const serializeList = (head) => {
  const nodeVals = [];
  let curr = head;

  while(curr) {
    nodeVals.push(curr.val);
    curr = curr.next;
  }

  return nodeVals;
}

export { Node, buildList, serializeList };