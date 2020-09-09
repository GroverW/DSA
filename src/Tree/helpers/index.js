export const TreeNode = function (val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

export const buildTree = (vals) => {
  if (!vals.length) return null;
  const root = new TreeNode(vals.shift())
  const queue = [root];

  while (queue.length) {
    const curr = queue.shift();
    const left = vals.shift();
    const right = vals.shift();

    if (left !== null && left !== undefined) {
      curr.left = new TreeNode(left);
      queue.push(curr.left);
    }

    if (right !== null && right !== undefined) {
      curr.right = new TreeNode(right);
      queue.push(curr.right);
    }
  }

  return root;
}

export const serializeTreeInOrder = (root) => {
  const queue = [root];
  const serialized = [];

  while (queue.length) {
    const curr = queue.shift();
    serialized.push(curr.val);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }

  return serialized;
}

export const serializeTreePreOrder = (root) => {
  const stack = [root];
  const serialized = [];

  while (stack.length) {
    const curr = stack.pop();
    serialized.push(curr.val);
    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
  }

  return serialized;
}

export const serializeTreePostOrder = (root) => {
  const stack = [root];
  const serialized = [];

  while (stack.length) {
    const curr = stack.pop();
    serialized.unshift(curr.val);
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }

  return serialized;
}
