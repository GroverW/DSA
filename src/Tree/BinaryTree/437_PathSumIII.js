import buildTree from '../helpers';


var pathSum = function (root, sum) {
  let totalPaths = 0;

  const helper = (node, pathSums) => {
    if (!node) return;

    if(node.val === sum) totalPaths += 1;

    pathSums.forEach((v,i) => {
      pathSums[i] += node.val
      if (pathSums[i] === sum) totalPaths += 1;
    });
    pathSums.push(node.val);

    helper(node.left, pathSums);
    helper(node.right, pathSums);

    pathSums.forEach((v,i) => pathSums[i] -= node.val);
    pathSums.pop();
  }

  helper(root, [])

  return totalPaths;
};


const tests = [
  [[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8],
  [[1, -2, -3, 1, 3, -2, null, -1], -2],
  [[0, 1, 0, 0], 1],
]

for (let test of tests) {
  const [vals, sum] = test;
  const tree = buildTree(vals);
  logOutList(pathSum(tree, sum))
}