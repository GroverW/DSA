function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

var serialize = function(root) {
  let queue = [root];
  const serialized = [];

  while(queue.length) {
      const curr = queue.shift();

      if(!curr) {
          serialized.push(curr);
          continue;
      }

      serialized.push(curr.val);
      queue.push(curr.left);
      queue.push(curr.right);
  }

  return serialized.join(',');
};

var deserialize = function(data) {
  const list = data.split(',');
  const queue = [];

  let listIdx = 0;

  const head = list[listIdx].length ? new TreeNode(+list[listIdx]) : null;
  listIdx += 1;
  if(head) queue.push(head);

  while(queue.length) {
      const curr = queue.shift();

      curr.left = list[listIdx].length ? new TreeNode(+list[listIdx]) : null;
      listIdx += 1;
      curr.right = list[listIdx].length ? new TreeNode(+list[listIdx]) : null;
      listIdx += 1;

      if(curr.left) queue.push(curr.left);
      if(curr.right) queue.push(curr.right);
  }

  return head;
};

const tests = [
  "1,2,3,,,4,5,,,,"
];

for (let test of tests) {
  logOutList(deserialize(test))
}