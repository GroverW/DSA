export const TreeNode = function(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const buildTree = (vals) => {
  const root = new TreeNode(vals.shift())
  const queue = [root];

  while(queue.length) {
    const curr = queue.shift();
    const left = vals.shift() || null;
    const right = vals.shift() || null;

    if(left !== null) {
      curr.left = new TreeNode(left);
      queue.push(curr.left);
    }

    if(right !== null) {
      curr.right = new TreeNode(right);
      queue.push(curr.right);
    }
  }

  return root;
}

export default buildTree;
