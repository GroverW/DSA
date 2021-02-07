/*
In a deck of cards, each card has an integer written on it.

Return true if and only if you can choose X >= 2 such that it is possible to split the entire deck into 1 or more groups of cards, where:

Each group has exactly X cards.
All the cards in each group have the same integer.
 

Example 1:

Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].
Example 2:

Input: deck = [1,1,1,2,2,2,3,3]
Output: false´
Explanation: No possible partition.
Example 3:

Input: deck = [1]
Output: false
Explanation: No possible partition.
Example 4:

Input: deck = [1,1]
Output: true
Explanation: Possible partition [1,1].
Example 5:

Input: deck = [1,1,2,2,2,2]
Output: true
Explanation: Possible partition [1,1],[2,2],[2,2].
 

Constraints:

1 <= deck.length <= 10^4
0 <= deck[i] < 10^4
*/

// better with GCD formula
var hasGroupsSizeX = function (deck) {
  const numberFrequency = deck.reduce((freq, num) => {
    freq[num] = freq[num] || 0;
    freq[num] += 1;
    return freq;
  }, {})

  const groups = Object.values(numberFrequency);
  const uniqueSizes = [...new Set(groups)];
  const min = Math.min(...uniqueSizes);

  if (min < 2) return false;
  if (uniqueSizes.every((size) => size % 2 === 0)) return true;
  for (let i = 3; i <= min; i += 2) {
    if (uniqueSizes.every((size) => size % i === 0)) return true;
  }

  return false;
};

const tests = [
  [1, 2, 3, 4, 4, 3, 2, 1],
  [1, 1, 1, 2, 2, 2, 3, 3],
  [1],
  [1, 1],
  [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(hasGroupsSizeX(test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}


/*
[1,2,3,4,4,3,2,1]
[1,1,1,2,2,2,3,3]
[1]
[1,1]
[1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
*/