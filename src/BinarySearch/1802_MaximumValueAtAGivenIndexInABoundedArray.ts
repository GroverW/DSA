/*
You are given three positive integers n, index and maxSum. You want to construct an array nums (0-indexed) that satisfies the following conditions:

nums.length == n
nums[i] is a positive integer where 0 <= i < n.
abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1.
The sum of all the elements of nums does not exceed maxSum.
nums[index] is maximized.
Return nums[index] of the constructed array.

Note that abs(x) equals x if x >= 0, and -x otherwise.

 

Example 1:

Input: n = 4, index = 2,  maxSum = 6
Output: 2
Explanation: The arrays [1,1,2,1] and [1,2,2,1] satisfy all the conditions. There are no other valid arrays with a larger value at the given index.
Example 2:

Input: n = 6, index = 1,  maxSum = 10
Output: 3
 

Constraints:

1 <= n <= maxSum <= 109
0 <= index < n
*/

function maxValue(n: number, index: number, maxSum: number): number {
  const longSide: number = Math.max(index + 1, n - index);
  const shortSide: number = Math.min(index + 1, n - index);
  let remain: number = maxSum - n;
  
  let left: number = 0;
  let right: number = longSide;
  let mid: number = 0;
  
  while (left < right) {
    mid = Math.ceil((left + right) / 2);
    const area: number = mid ** 2
    const additional: number = mid > shortSide ? (mid - shortSide) * (mid - shortSide + 1) / 2 : 0;
    
    if(area - additional === remain) {
      return mid + 1;
    } else if (area - additional < remain) {
      left = mid;
    } else {
      right = mid - 1;
    }
    
  }
  
  const area: number = left ** 2
  const additional: number = left > shortSide ? (left - shortSide) * (left - shortSide + 1) / 2 : 0;
  const leftOver: number = remain - area + additional;
  return left + 1 + Math.floor(leftOver / n);
};

const tests: any[] = [
  [4,2,6],
  [5,3,13],
  [5,3,14],
  [5,3,15],
  [5,3,16],
  [5,3,17],
  [5,3,18],
  [5,4,18],
  [5,4,19],
  [5,4,20],
  [10000,4258,1000000000]
];



let i: number = 0;
for (let test of tests) {
  const [n, index, maxSum] = test;
  console.time(i.toString());
  logOutList(maxValue(n, index, maxSum));
  console.timeEnd(i.toString());
  i += 1;
}

/*
4
2
6
5
3
13
5
3
14
5
3
15
5
3
16
5
3
17
5
3
18
5
4
18
5
4
19
5
4
20
*/