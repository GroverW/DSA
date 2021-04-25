/*
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

 

Example 1:

Input: piles = [3,6,7,11], h = 8
Output: 4
Example 2:

Input: piles = [30,11,23,4,20], h = 5
Output: 30
Example 3:

Input: piles = [30,11,23,4,20], h = 6
Output: 23
 

Constraints:

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109
*/

var minEatingSpeed = function(piles, h) {
  let min = 0;
  let max = 10 ** 9;
  let mid = min;
  
  while (min < max) {
    mid = Math.floor((min + max) / 2);
    
    if (canFinish(piles, mid, h)) {
      max = mid;
    } else {
      min = mid + 1;
    }
  }
  
  return max;
};

const canFinish = (piles, rate, hours) => {
  const hoursRequired = piles.reduce(
    (total, pile) => total + Math.ceil(pile / rate), 
    0,
  );
  
  return hoursRequired <= hours;
}

const maxLen = 100;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  
  const piles = new Array(len).fill(0).map(() => numberBetween(1, 100));
  const total = piles.reduce((sum, pile) => sum + pile, 0);
  const minH = piles.length;
  const maxH = Math.floor((total + minH) / 10);
  const h = numberBetween(minH, maxH);
  
  

  // logOutList('"' + s + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(processes));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([piles, h])
}