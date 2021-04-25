/*
It is a sweltering summer day, and a boy wants to buy some ice cream bars.

At the store, there are n ice cream bars. You are given an array costs of length n, where costs[i] is the price of the ith ice cream bar in coins. The boy initially has coins coins to spend, and he wants to buy as many ice cream bars as possible. 

Return the maximum number of ice cream bars the boy can buy with coins coins.

Note: The boy can buy the ice cream bars in any order.

 

Example 1:

Input: costs = [1,3,2,4,1], coins = 7
Output: 4
Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.
Example 2:

Input: costs = [10,6,8,7,7,8], coins = 5
Output: 0
Explanation: The boy cannot afford any of the ice cream bars.
Example 3:

Input: costs = [1,6,3,1,2,5], coins = 20
Output: 6
Explanation: The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.
 

Constraints:

costs.length == n
1 <= n <= 105
1 <= costs[i] <= 105
1 <= coins <= 108
*/

var maxIceCream = function(costs, coins) {
  costs.sort((a, b) => a - b);
  let countIceCreamBars = 0;
  let remainingCoins = coins;
  for(let cost of costs) {
    if(remainingCoins < cost) {
      return countIceCreamBars;
    }
    
    countIceCreamBars += 1;
    remainingCoins -= cost;
  }
  
  return countIceCreamBars;
};

const maxLen: number = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const costs = new Array(len).fill(0).map(() => numberBetween(1, 20));
  const totalCost = costs.reduce((total, cost) => total + cost, 0);
  const coins = numberBetween(1, totalCost);

  // logOutList('"' + words.trimEnd() + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([costs, coins])
}

const tests: Indexable<any>[] = [
  
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(printRow(getOrder(test)));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/


