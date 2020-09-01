import buildTree from './helpers';

var zigzagLevelOrder = function (root) {
  if (!root) return [];
  const results = [];
  const queue = [root];

  let reverse = false;
  let end = 0;
  let start;

  while (end < queue.length) {
    start = end;
    end = queue.length;

    results.push([]);
    const level = results.length - 1;

    for (let i = end - 1; i >= start; i -= 1) {
      const curr = queue[i];
      results[level].push(curr.val);

      if (reverse) {
        if (curr.right) queue.push(curr.right);
        if (curr.left) queue.push(curr.left);
      } else {
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
      }
    }

    reverse = !reverse;
  }

  return results;
};

const tests = [
  [3, 9, 20, null, null, 15, 7],
  [3, 9, 20, 3, null, 15, 7],
  [3, 9, 20, 3, 4, 15, 7, 8, 10, 4, 16, 22, 21, 100, 14, 12, 37],
];

for (let test of tests) {
  const tree = buildTree(test);
  logOutList(zigzagLevelOrder(tree));
}