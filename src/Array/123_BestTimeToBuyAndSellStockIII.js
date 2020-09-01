var maxProfit = function (prices) {
  const maxUntil = new Array(prices.length).fill(0);

  let localMin = prices[0];
  for (let i = 1; i < prices.length; i += 1) {
    maxUntil[i] = Math.max(maxUntil[i - 1], prices[i] - localMin);
    localMin = Math.min(localMin, prices[i]);
  }

  let currMax = maxUntil[maxUntil.length - 1];

  let localMax = prices[prices.length - 1];
  for(let i = prices.length - 2; i >= 2; i -= 1) {
    currMax = Math.max(currMax, localMax - prices[i] + maxUntil[i - 1]);
    localMax = Math.max(localMax, prices[i]);
  }

  return currMax;
};

const tests = [
  [3, 3, 5, 0, 0, 3, 1, 4],
  [1, 2, 3, 4, 5],
  [7, 6, 4, 3, 1],
  [1],
];

for (let test of tests) {
  logOutList(maxProfit(test));
}