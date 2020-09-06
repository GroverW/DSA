export const TreeNode = function(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

export const buildTree = (vals) => {
  if(!vals.length) return null;
  const root = new TreeNode(vals.shift())
  const queue = [root];

  while(queue.length) {
    const curr = queue.shift();
    const left = vals.shift();
    const right = vals.shift();

    if(left !== null && left !== undefined) {
      curr.left = new TreeNode(left);
      queue.push(curr.left);
    }

    if(right !== null && right !== undefined) {
      curr.right = new TreeNode(right);
      queue.push(curr.right);
    }
  }

  return root;
}
