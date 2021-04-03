/*

*/

function recoverTree(root: TreeNode | null): void {
  const fixTree = (node: TreeNode | null, min: number, max: number): TreeNode | null => {
    if (!node) return null;

    const left = fixTree(node.left, min, node.val);
    const right = fixTree(node.right, node.val, max);

    let currentMin = node;
    let currentMax = node;

    if (left && left.val < currentMin.val) currentMin = left;
    if (left && left.val > currentMax.val) currentMax = left;
    if (right && right.val < currentMin.val) currentMin = right;
    if (right && right.val > currentMax.val) currentMax = right;

    if (currentMin.val < min) return currentMin;
    if (currentMax.val > max) return currentMax;

    if(right && left && right.val < left.val) {
      [right.val, left.val] = [left.val, right.val];
      return null;
    }
    
    if(left && left.val > node.val) {
      [node.val, left.val] = [left.val, node.val];
    }
    if(right && right.val < node.val) {
      [node.val, right.val] = [right.val, node.val];
    }

    return null;
  }

  fixTree(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

// const MIN = Number.MIN_SAFE_INTEGER;
// const MAX = Number.MAX_SAFE_INTEGER;
// const isValid = (tree, idx = 0, min = MIN, max = MAX): boolean => {
//   if (idx >= tree.length || tree[idx] === null) return true;

//   if(tree[idx] < min || tree[idx] > max) return false;

//   const left = idx * 2 + 1;
//   const right = left + 1;

//   return isValid(tree, left, min, tree[idx]) && isValid(tree, right, tree[idx], max);
// }

// const maxLen: number = 100;

// for (let i = 0; i < 50; i += 1) {
  // const len = numberBetween(3, maxLen);
  // const serialized = randomizeTree({ size: len, start: 1, startingNullChance: 0.01 })
  // convertToBST(serialized);

  // while(isValid(serialized, 0)) {
  //   let first = numberBetween(0, serialized.length - 1);
  //   while(!serialized[first]) {
  //     first = numberBetween(0, serialized.length - 1);
  //   }

  //   let second = numberBetween(0, serialized.length - 1);
  //   while(second === first || !serialized[second]) {
  //     second = numberBetween(0, serialized.length - 1);
  //   }
    
  //   [serialized[first], serialized[second]] = [serialized[second], serialized[first]]
  // }

  // logOutList('"' + ip + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow([s, t]) + ',');
  // logOutList(printRow(serialized));
  // logOutLeetcode([serialized, val, depth])
// }