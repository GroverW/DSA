/*
Given an array of scores that are non-negative integers. Player 1 picks one of the numbers from either end of the array followed by the player 2 and then player 1 and so on. Each time a player picks a number, that number will not be available for the next player. This continues until all the scores have been chosen. The player with the maximum score wins.

Given an array of scores, predict whether player 1 is the winner. You can assume each player plays to maximize his score.

Example 1:

Input: [1, 5, 2]
Output: False
Explanation: Initially, player 1 can choose between 1 and 2. 
If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). 
So, final score of player 1 is 1 + 2 = 3, and player 2 is 5. 
Hence, player 1 will never be the winner and you need to return False.
 

Example 2:

Input: [1, 5, 233, 7]
Output: True
Explanation: Player 1 first chooses 1. Then player 2 have to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.
Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.
 

Constraints:

1 <= length of the array <= 20.
Any scores in the given array are non-negative integers and will not exceed 10,000,000.
If the scores of both players are equal, then player 1 is still the winner.
*/


function PredictTheWinner(nums: number[]): boolean {
  const getBestScore = (
    isPlayer1: boolean,
    left: number,
    right: number,
  ): number => {
    const addOrSubtract = isPlayer1 ? 1 : -1;

    if (left === right) return nums[left] * addOrSubtract;

    const leftScore = nums[left] * addOrSubtract + getBestScore(!isPlayer1, left + 1, right);
    const rightScore = nums[right] * addOrSubtract + getBestScore(!isPlayer1, left, right - 1);

    if (!isPlayer1) return Math.min(leftScore, rightScore);

    return Math.max(leftScore, rightScore);
  }

  return getBestScore(true, 0, nums.length - 1) >= 0;
};

/*
1 1 3 4 10

1 1 3
2 3 6
*/

// const maxLen: number = 20;

// for (let i = 0; i < 50; i += 1) {
//   const len: number = numberBetween(1, maxLen);

//   const nums = new Array(len).fill(0).map(() => numberBetween(1, 25));
//   // logOutList('"' + ip + '"')
//   // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   logOutList(printRow(nums) + ',');
// }

const tests: Indexable<any>[] = [
  [1, 5, 2],
  [1, 5, 233, 7],
  [24, 18, 25, 18, 23, 22, 23, 5, 16, 13, 14, 7, 14, 13, 13, 16, 12, 4, 24, 21],
  [18, 5, 3, 25, 12, 12, 14, 18, 23, 5, 3],
  [15, 3, 23, 21, 3, 2, 2, 3],
  [17, 13, 1, 24],
  [20, 23, 22, 23, 16, 8, 24, 8, 20, 15, 10, 3, 14, 8, 3, 19, 25],
  [8, 11, 11],
  [10, 9, 13, 13, 23, 20, 1, 5, 4, 7],
  [20, 14, 20, 10, 7],
  [25, 11, 24, 13, 20, 24, 8, 6, 16, 3, 4, 11, 11, 18, 5],
  [3, 22, 17, 15, 14, 9],
  [1, 14, 23, 17],
  [14, 15, 3, 12, 16, 21, 8, 11, 15, 6],
  [18, 10, 6, 10, 22, 14, 11, 12, 13, 22, 9],
  [12, 1, 14, 5, 21, 10, 22, 19, 3, 7, 10, 22, 19, 15, 8, 1],
  [9, 16, 11, 25, 12, 19, 18, 2, 7, 11, 15, 15],
  [11, 9, 11, 11, 15, 11, 25, 16, 1, 9, 8, 10, 21, 23, 4, 12, 16],
  [21, 25, 22, 9, 15, 14, 21, 6, 12, 15, 17, 2, 7, 25, 22, 8, 10, 5, 25, 5],
  [11, 21, 25, 20, 3, 14, 13, 15, 19, 4, 11, 23, 12, 12, 18, 16],
  [16, 7, 3, 5, 16, 19, 1, 18, 8],
  [20, 12, 21, 5, 19, 18],
  [6, 23, 3, 11, 17, 12, 3, 9, 14, 8, 10, 14, 23, 19, 12, 2, 23],
  [21, 12, 12, 7],
  [17, 18, 14, 2, 4, 25, 1, 14, 9, 8, 7, 14, 7, 22, 9, 21, 15, 5, 1, 17],
  [10, 14, 13, 15, 24, 24, 20, 24, 24, 3, 10, 9, 18, 11, 6],
  [24, 7, 22, 14, 16, 4],
  [5, 19, 25, 24, 9, 25, 17, 25, 14, 20, 8, 23, 18, 20],
  [2, 4, 24, 18, 19, 13, 12, 25, 11, 15, 14, 15, 17, 17, 6],
  [17, 14, 3, 6, 5, 1, 7, 20, 21, 25, 11, 4, 17, 21, 2],
  [2, 20, 20, 25, 14, 12],
  [8, 5, 17],
  [7, 11, 13, 7, 1, 3, 10, 18, 6, 23, 1, 21, 9, 20, 12],
  [25, 3, 23, 22, 24, 16, 3, 4, 9, 25, 24, 17, 15, 11, 14],
  [2, 20, 7, 9, 20, 6, 16, 24, 19, 7, 17, 4, 10, 7, 24, 25, 11, 14, 15],
  [20, 18, 14, 24, 5, 10, 11, 22, 11, 19, 15, 9],
  [8, 19, 10, 25, 2, 4, 1, 18, 11, 24],
  [1, 6, 8, 16, 1, 5, 12, 23, 23, 1, 1, 24, 21],
  [17, 16, 22, 24, 19, 5, 19, 14, 13, 23, 14, 12, 24, 9, 6],
  [20, 10, 25, 12, 22, 16, 20],
  [19, 19, 15, 24, 7, 18, 24, 4, 10, 5, 22, 20, 23, 9, 10, 19, 3, 7, 12, 21],
  [14, 15, 12, 20, 5, 14, 2, 17, 13, 19, 18],
  [1, 14],
  [4, 13, 13, 25],
  [22, 21, 22, 24, 10, 25, 15, 4, 2, 12, 22, 18, 24, 6, 21, 22, 4, 7, 19, 19],
  [10, 19, 10, 14, 23, 15, 21, 23, 4, 3, 5, 2],
  [25, 4, 19, 23, 12, 24, 12, 10, 20, 15, 25],
  [17, 13, 24, 15, 2, 13, 11, 9, 7, 16, 21, 17, 23, 19, 12, 21, 15, 10, 6],
  [13, 7, 16, 8, 17, 20, 1, 24, 13, 1, 15, 21, 12, 2],
  [1, 4],
  [14, 17, 3, 21, 21, 5, 1, 25, 3, 8, 2, 18, 11, 18, 16, 12, 22, 6],
  [23, 22, 18, 18, 4, 22, 15, 3, 11, 3, 19, 23, 24, 19, 22, 21, 20],
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  // randomOption(test)
  logOutList(PredictTheWinner(test));
  console.timeEnd(i.toString());
  i += 1;
}

/*
[1, 5, 2]
[1, 5, 233, 7]
[24, 18, 25, 18, 23, 22, 23, 5, 16, 13, 14, 7, 14, 13, 13, 16, 12, 4, 24, 21]
[18, 5, 3, 25, 12, 12, 14, 18, 23, 5, 3]
[15, 3, 23, 21, 3, 2, 2, 3]
[17, 13, 1, 24]
[20, 23, 22, 23, 16, 8, 24, 8, 20, 15, 10, 3, 14, 8, 3, 19, 25]
[8, 11, 11]
[10, 9, 13, 13, 23, 20, 1, 5, 4, 7]
[20, 14, 20, 10, 7]
[25, 11, 24, 13, 20, 24, 8, 6, 16, 3, 4, 11, 11, 18, 5]
[3, 22, 17, 15, 14, 9]
[1, 14, 23, 17]
[14, 15, 3, 12, 16, 21, 8, 11, 15, 6]
[18, 10, 6, 10, 22, 14, 11, 12, 13, 22, 9]
[12, 1, 14, 5, 21, 10, 22, 19, 3, 7, 10, 22, 19, 15, 8, 1]
[9, 16, 11, 25, 12, 19, 18, 2, 7, 11, 15, 15]
[11, 9, 11, 11, 15, 11, 25, 16, 1, 9, 8, 10, 21, 23, 4, 12, 16]
[21, 25, 22, 9, 15, 14, 21, 6, 12, 15, 17, 2, 7, 25, 22, 8, 10, 5, 25, 5]
[11, 21, 25, 20, 3, 14, 13, 15, 19, 4, 11, 23, 12, 12, 18, 16]
[16, 7, 3, 5, 16, 19, 1, 18, 8]
[20, 12, 21, 5, 19, 18]
[6, 23, 3, 11, 17, 12, 3, 9, 14, 8, 10, 14, 23, 19, 12, 2, 23]
[21, 12, 12, 7]
[17, 18, 14, 2, 4, 25, 1, 14, 9, 8, 7, 14, 7, 22, 9, 21, 15, 5, 1, 17]
[10, 14, 13, 15, 24, 24, 20, 24, 24, 3, 10, 9, 18, 11, 6]
[24, 7, 22, 14, 16, 4]
[5, 19, 25, 24, 9, 25, 17, 25, 14, 20, 8, 23, 18, 20]
[2, 4, 24, 18, 19, 13, 12, 25, 11, 15, 14, 15, 17, 17, 6]
[17, 14, 3, 6, 5, 1, 7, 20, 21, 25, 11, 4, 17, 21, 2]
[2, 20, 20, 25, 14, 12]
[8, 5, 17]
[7, 11, 13, 7, 1, 3, 10, 18, 6, 23, 1, 21, 9, 20, 12]
[25, 3, 23, 22, 24, 16, 3, 4, 9, 25, 24, 17, 15, 11, 14]
[2, 20, 7, 9, 20, 6, 16, 24, 19, 7, 17, 4, 10, 7, 24, 25, 11, 14, 15]
[20, 18, 14, 24, 5, 10, 11, 22, 11, 19, 15, 9]
[8, 19, 10, 25, 2, 4, 1, 18, 11, 24]
[1, 6, 8, 16, 1, 5, 12, 23, 23, 1, 1, 24, 21]
[17, 16, 22, 24, 19, 5, 19, 14, 13, 23, 14, 12, 24, 9, 6]
[20, 10, 25, 12, 22, 16, 20]
[19, 19, 15, 24, 7, 18, 24, 4, 10, 5, 22, 20, 23, 9, 10, 19, 3, 7, 12, 21]
[14, 15, 12, 20, 5, 14, 2, 17, 13, 19, 18]
[1, 14]
[4, 13, 13, 25]
[22, 21, 22, 24, 10, 25, 15, 4, 2, 12, 22, 18, 24, 6, 21, 22, 4, 7, 19, 19]
[10, 19, 10, 14, 23, 15, 21, 23, 4, 3, 5, 2]
[25, 4, 19, 23, 12, 24, 12, 10, 20, 15, 25]
[17, 13, 24, 15, 2, 13, 11, 9, 7, 16, 21, 17, 23, 19, 12, 21, 15, 10, 6]
[13, 7, 16, 8, 17, 20, 1, 24, 13, 1, 15, 21, 12, 2]
[1, 4]
[14, 17, 3, 21, 21, 5, 1, 25, 3, 8, 2, 18, 11, 18, 16, 12, 22, 6]
[23, 22, 18, 18, 4, 22, 15, 3, 11, 3, 19, 23, 24, 19, 22, 21, 20]
*/