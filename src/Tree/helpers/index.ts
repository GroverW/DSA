import { TreeNodeInterface, TreeVal, SerializedTree } from './types'

export class TreeNode implements TreeNodeInterface {
  val: TreeVal;
  left: TreeNodeInterface | null;
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

type RandomTree = {
  size: number;
  start?: number;
  startingNullChance?: number;
  maxNullChance?: number;
  incrementNullChance?: boolean;
}

export const randomizeTree = ({
  size,
  start = 0,
  startingNullChance = 0.05,
  maxNullChance = 0.2,
  incrementNullChance = true,
}: RandomTree): SerializedTree => {
  const tree: SerializedTree = [start];

  let i = 1;
  let lastValidParent = 0;
  let current = start + 1;
  let currentNullChance = startingNullChance;
  const MAX_NULL_CHANCE = maxNullChance;
  const NULL_INCREMENT = (MAX_NULL_CHANCE - startingNullChance) / size;

  while (i < size) {
    const parent = Math.ceil(tree.length / 2) - 1;
    if (parent > lastValidParent) break;
    if (tree[parent] === null || Math.random() < currentNullChance) {
      tree.push(null);
    } else {
      lastValidParent = tree.length;
      tree.push(current);
      current += 1;
      i += 1;
      if (incrementNullChance) {
        currentNullChance = Math.min(MAX_NULL_CHANCE, currentNullChance + NULL_INCREMENT);
      }
    }
  }

  let j = 0;
  while (i < size) {
    if (j === tree.length) {
      tree.push(i);
      i += 1;
    } else if (tree[j] === null) {
      tree[j] = i;
      i += 1;
    }

    j += 1;
  }

  while (tree[tree.length - 1] === null) {
    tree.pop();
  }

  return tree;
}

export const convertToBST = (tree: SerializedTree): SerializedTree => {
  let current = 1;
  const convert = (idx) => {
    if (idx >= tree.length || tree[idx] === null) return;
    const left = idx * 2 + 1;
    const right = left + 1;
    convert(left);
    tree[idx] = current;
    current += 1;
    convert(right);
  }

  convert(0);

  return tree;
}

export const getTreeEdges = (tree: SerializedTree): SerializedTree[] => {
  const lastParent = Math.floor(tree.length / 2) - 1;
  const edges: SerializedTree[] = [];

  for (let i = 0; i <= lastParent; i += 1) {
    if (!tree[i]) continue;
    const left = i * 2 + 1;
    const right = left + 1;
    if (tree[left]) edges.push([tree[i], tree[left]]);
    if (tree[right]) edges.push([tree[i], tree[right]]);
  }

  return edges;
}