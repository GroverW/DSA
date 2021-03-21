import { TreeNodeInterface, TreeVal, SerializedTree } from './types'

export class TreeNode implements TreeNodeInterface {
  val: TreeVal;
  left:  TreeNodeInterface | null;
  right: TreeNodeInterface | null;

  constructor(
    val: TreeVal = null,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export const buildTree = (vals: SerializedTree): TreeNode | null => {
  const valsCopy = [...vals];
  if (!vals.length) return null;
  const root = new TreeNode(valsCopy.shift());
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const curr: TreeNode = queue.shift()!;
    const left = valsCopy.shift();
    const right = valsCopy.shift();

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

export const serializeTreeInOrder = (root: TreeNode): SerializedTree => {
  const queue: TreeNode[] = [root];
  const serialized: SerializedTree = [];

  while (queue.length) {
    const curr: TreeNode = queue.shift()!;
    serialized.push(curr.val);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }

  return serialized;
}

export const serializeTreePreOrder = (root: TreeNode): SerializedTree => {
  const stack: TreeNode[] = [root];
  const serialized: SerializedTree = [];

  while (stack.length) {
    const curr: TreeNode = stack.pop()!;
    serialized.push(curr.val);
    if (curr.right) stack.push(curr.right);
    if (curr.left) stack.push(curr.left);
  }

  return serialized;
}

export const serializeTreePostOrder = (root: TreeNode): SerializedTree => {
  const stack: TreeNode[] = [root];
  const serialized: SerializedTree = [];

  while (stack.length) {
    const curr: TreeNode = stack.pop()!;
    serialized.unshift(curr.val);
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }

  return serialized;
}

export const getFirstNodeByValue = (root: TreeNode, target: number): TreeNode | null => {
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const curr: TreeNode = stack.pop()!;
    if (curr.val === target) return curr;
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }

  return null;
}