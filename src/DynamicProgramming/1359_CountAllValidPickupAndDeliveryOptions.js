/*
Given n orders, each order consist in pickup and delivery services. 

Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 

Since the answer may be too large, return it modulo 10^9 + 7.

 

Example 1:

Input: n = 1
Output: 1
Explanation: Unique order (P1, D1), Delivery 1 always is after of Pickup 1.
Example 2:

Input: n = 2
Output: 6
Explanation: All possible orders: 
(P1,P2,D1,D2), (P1,P2,D2,D1), (P1,D1,P2,D2), (P2,P1,D1,D2), (P2,P1,D2,D1) and (P2,D2,P1,D1).
This is an invalid order (P1,D2,P2,D1) because Pickup 2 is after of Delivery 2.
Example 3:

Input: n = 3
Output: 90
 

Constraints:

1 <= n <= 500
*/

var countOrders = function (n) {
  const mod = 10 ** 9 + 7;

  let newPermutations = 1;
  let currAnswer = 1;

  for (let i = 2; i <= n; i += 1) {
    newPermutations += 4 * i - 3;
    currAnswer = currAnswer * newPermutations % mod;
  }

  return currAnswer;
};

/*
P1 d1

P2 D2 * *
* P2 D2 *
* * P2 D2
P2 * D2 *
* P2 * D2
P2 * * D2

P3 D3 * * * *
* P3 D3 * * *
* * P3 D3 * *
* * * P3 D3 *
* * * * P3 D3
P3 * D3 * * *
* P3 * D3 * *
* * P3 * D3 *
* * * P3 * D3
P3 * * D3 * *
* P3 * * D3 *
* * P3 * * D3
P3 * * * D3 *
* P3 * * * D3
P3 * * * * D3

*/

const tests = [
  1, 2, 3, 4, 5, 6, 24, 39, 11, 500
];

for (let test of tests) {
  logOutList(countOrders(test));
}

/*
1
2
3
4
5
6
24
39
11
500
*/