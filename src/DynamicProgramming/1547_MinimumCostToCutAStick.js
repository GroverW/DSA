/*
Given a wooden stick of length n units. The stick is labelled from 0 to n. For example, a stick of length 6 is labelled as follows:


Given an integer array cuts where cuts[i] denotes a position you should perform a cut at.

You should perform the cuts in order, you can change the order of the cuts as you wish.

The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.

Return the minimum total cost of the cuts.

 

Example 1:


Input: n = 7, cuts = [1,3,4,5]
Output: 16
Explanation: Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:

The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.
Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).
Example 2:

Input: n = 9, cuts = [5,6,1,4,2]
Output: 22
Explanation: If you try the given cuts ordering the cost will be 25.
There are much ordering with total cost <= 25, for example, the order [4, 6, 5, 2, 1] has total cost = 22 which is the minimum possible.
 

Constraints:

2 <= n <= 10^6
1 <= cuts.length <= min(n - 1, 100)
1 <= cuts[i] <= n - 1
All the integers in cuts array are distinct.
*/

var minCost = function(n, cuts) {
  cuts.push(0, n);
  cuts.sort((a, b) => a - b);

  const MIN = 10 ** 9;
  const minCosts = new Array(cuts.length).fill(0)
    .map(() => new Array(cuts.length).fill(0));
  
  for (let spread = 2; spread < cuts.length; spread += 1) {
    for (let start = 0; start < cuts.length - spread; start += 1) {
      const end = start + spread;
      const firstCut = cuts[end] - cuts[start];
      minCosts[spread][start] = MIN;
      
      for (let i = start + 1; i < end; i += 1) {
        minCosts[spread][start] = Math.min(
          minCosts[spread][start],
          firstCut + minCosts[i - start][start] + minCosts[end - i][i]
        )
      }
    }
  }
  
  return minCosts[cuts.length - 1][0];
};



const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  const n = numberBetween(len * 10, 1000000)

  const cuts = [numberBetween(1, 10)];
  for(let i = 1; i < len; i += 1) {
    const last = cuts[cuts.length - 1];
    cuts.push(numberBetween(last + 1, last + Math.floor(n / len)))
  }

  // logOutList('"' + str.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(values));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([n, cuts])
}



const tests: Indexable<any>[] = [
  [7, [1,3,4,5]]  
];



let i: number = 0;
for (let test of tests) {
  const [n, cuts] = test;
  console.time(i.toString());
  // logOutList(minCost(n, cuts))
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}