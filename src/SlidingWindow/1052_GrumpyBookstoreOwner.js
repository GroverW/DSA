/*
Today, the bookstore owner has a store open for customers.length minutes.  Every minute, some number of customers (customers[i]) enter the store, and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy.  If the bookstore owner is grumpy on the i-th minute, grumpy[i] = 1, otherwise grumpy[i] = 0.  When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for X minutes straight, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

 

Example 1:

Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
 

Note:

1 <= X <= customers.length == grumpy.length <= 20000
0 <= customers[i] <= 1000
0 <= grumpy[i] <= 1
*/

var maxSatisfied = function(customers, grumpy, X) {
  let maxExtraCustomers = 0;
  let currentExtraCustomers = 0;

  const totalCount = customers.reduce((total, count, minute) => {
    currentExtraCustomers += count * grumpy[minute];
    if (minute >= X) {
      currentExtraCustomers -= customers[minute - X] * grumpy[minute - X];
    }
    maxExtraCustomers = Math.max(maxExtraCustomers, currentExtraCustomers);
    return total + count * !grumpy[minute];
  }, 0);
  
  return totalCount + maxExtraCustomers;
};

const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const grumpy = new Array(len).fill(0).map(() => numberBetween(0,1));
  const customers = new Array(len).fill(0).map(() => numberBetween(0, 25));
  const X = numberBetween(1, Math.ceil(len / 2));

  // logOutList('"' + s.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(nums));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([customers, grumpy, X])
}