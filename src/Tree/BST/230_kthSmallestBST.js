import buildTree from '../helpers';

var kthSmallest = function(root, k) {
  let kthSmallest = null;

  const helper = (node, numVisited) => {
      if(!node) return numVisited;

      numVisited = helper(node.left, numVisited) + 1;

      if(numVisited >= k) {
          if(numVisited === k) kthSmallest = node.val
          return Infinity;
      }

      return helper(node.right, numVisited);
  }

  helper(root, 0);

  return kthSmallest;
};

const nodeVals = [41,37,44,24,39,42,48,1,35,38,40,null,43,46,49,0,2,30,36,null,null,null,null,null,null,45,47,null,null,null,null,null,4,29,32,null,null,null,null,null,null,3,9,26,null,31,34,null,null,7,11,25,27,null,null,33,null,6,8,10,16,null,null,null,28,null,null,5,null,null,null,null,null,15,19,null,null,null,null,12,null,18,20,null,13,17,null,null,22,null,14,null,null,21,23]

export { kthSmallest, buildTree };
