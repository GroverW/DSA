/*
We have a set of items: the i-th item has value values[i] and label labels[i].

Then, we choose a subset S of these items, such that:

|S| <= num_wanted
For every label L, the number of items in S with label L is <= use_limit.
Return the largest possible sum of the subset S.

 

Example 1:

Input: values = [5,4,3,2,1], labels = [1,1,2,2,3], num_wanted = 3, use_limit = 1
Output: 9
Explanation: The subset chosen is the first, third, and fifth item.
Example 2:

Input: values = [5,4,3,2,1], labels = [1,3,3,3,2], num_wanted = 3, use_limit = 2
Output: 12
Explanation: The subset chosen is the first, second, and third item.
Example 3:

Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], num_wanted = 3, use_limit = 1
Output: 16
Explanation: The subset chosen is the first and fourth item.
Example 4:

Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], num_wanted = 3, use_limit = 2
Output: 24
Explanation: The subset chosen is the first, second, and fourth item.
 

Note:

1 <= values.length == labels.length <= 20000
0 <= values[i], labels[i] <= 20000
1 <= num_wanted, use_limit <= values.length
*/

// cleaner
var largestValsFromLabels = function(values, labels, num_wanted, use_limit) {
  const isLabelAvailable = getIsLabelAvailable(use_limit);
  return values
    .map((_, i) => i)
    .sort((a, b) => values[b] - values[a])
    .filter((i) => isLabelAvailable(labels[i]))
    .slice(0, num_wanted)
    .reduce((total, i) => total + values[i], 0);
};

const getIsLabelAvailable = (limit) => {
  const labelsUsed = new Map();
  
  return (label) => {
    const countUsed = labelsUsed.get(label) || 0;
    
    if (countUsed === limit) {
      return false;
    }
    
    labelsUsed.set(label, countUsed + 1);
    return true;
  }
}



var largestValsFromLabels = function(values, labels, num_wanted, use_limit) {
  const labelsRemain = new Map();
  return values
    .map((_, i) => i)
    .sort((a, b) => values[b] - values[a])
    .filter((i) => {
      const label = labels[i];
      const labelsAvailable = labelsRemain.get(label) ?? use_limit;
      if (!labelsAvailable) return false;
      labelsRemain.set(label, labelsAvailable - 1);
      return true;
    })
    .slice(0, num_wanted)
    .reduce((total, i) => total + values[i], 0)
};

const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);

  const values = new Array(len).fill(0).map(() => numberBetween(0, 50))
  const labels = new Array(len).fill(0).map(() => numberBetween(0, 10))

  const num_wanted = numberBetween(1, len);
  const use_limit = numberBetween(1, Math.min(10, len));

  // logOutList('"' + instructions + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(grid));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([values, labels, num_wanted, use_limit])
}



const tests: Indexable<any>[] = [
  // [[773160767], 252264991],
  // [[2, 8, 4, 10, 6], 20]
  // [[0,0,1,2,3,3,4,7,7,8], 3, 5]
  [[5,4,3,2,1], [1,1,2,2,3], 3, 1]
];