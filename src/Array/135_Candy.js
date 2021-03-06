/*
There are N children standing in a line. Each child is assigned a rating value.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
What is the minimum candies you must give?

Example 1:

Input: [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
Example 2:

Input: [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
             The third child gets 1 candy because it satisfies the above two conditions.
*/

var candy = function (ratings) {
  if (ratings.length <= 1) return ratings.length;

  const amounts = new Array(ratings.length).fill(1);
  const last = ratings.length - 1;

  for (let i = 1; i <= last; i += 1) {
    if (ratings[i] > ratings[i - 1]) {
      amounts[i] = amounts[i - 1] + 1;
    }
  }

  for (let j = last - 1; j >= 0; j -= 1) {
    if (ratings[j] > ratings[j + 1]) {
      amounts[j] = Math.max(amounts[j], 1 + amounts[j + 1]);
    }

    if (ratings[j] > ratings[j - 1]) {
      amounts[j] = Math.max(amounts[j], 1 + amounts[j - 1]);
    }
  }


  return amounts.reduce((sum, count) => sum + count, 0);
};


/*
[2,1,3,4,3,2,7]

[5, 4, 3, 2, 3, 2, 2, 5, 6, 4, 3, 2, 1]
-1 -1 -1  1  2  1  1  2 -1 -1 -1 -1  1
 4  3  2  1  2  1  1  2  5  4  3  2  1  


[2,1]
0, 0, 1

*/

// const maxLength = 100;
// for (let i = 0; i < 50; i += 1) {
//   const numRanks = Math.floor(Math.random() * maxLength) + 1;

//   const ranks = new Array(numRanks).fill(0)
//     .map(() => Math.floor(Math.random() * 25) + 1);

//   logOutList(printRow(ranks));
// }

/*

*/

const tests = [
  // [1, 0, 2],
  // [1, 2, 2],
  // [2, 1, 3, 4, 3, 2, 7],
  // [5, 4, 3, 2, 3, 2, 2, 5, 6, 4, 3, 2, 1],
  // [12, 16, 19, 6, 4, 16, 20, 5, 12, 1, 22, 17, 16, 14, 5, 3, 14, 8, 7, 25, 3, 17, 14, 23, 17, 2, 13, 19, 18, 10, 2, 1, 5, 1, 1, 9, 19, 6, 13, 2, 21, 1, 4, 14, 3, 6, 2, 20, 6, 12, 21, 19, 11, 12, 14, 14, 7, 13, 22, 12, 18, 4, 14, 23, 20, 11, 20, 3, 3, 20, 16, 19, 6, 2, 15, 7, 22, 25, 3, 12, 8, 18, 24, 6, 15, 5, 24, 19, 19, 24, 3, 18, 17],
  // [20, 24, 9, 8, 25, 24, 5, 12, 5, 25, 9, 13, 4, 18, 21, 2, 5, 14, 24, 4, 24, 25, 3, 14, 14, 6, 6, 8, 9, 6, 1, 11, 8, 11, 21, 12, 21, 20, 17],
  // [14, 3, 14, 14, 7, 21, 8, 23, 19, 8, 12, 2, 15, 9, 14, 19, 4],
  // [10, 24, 12, 17, 8, 3, 2, 2, 8, 10, 20, 7, 6, 12, 14, 16, 2, 22, 17, 5, 22, 3, 20, 11, 20, 15, 18, 24, 23, 5, 18, 24, 20, 17, 6, 2, 4, 7, 7, 3, 17, 4, 22, 11, 9, 21],
  // [11, 14, 13, 6, 1, 5, 18, 7, 9, 5, 25, 23, 6, 6, 20, 24, 24, 6, 7, 5, 22, 25, 24, 25, 21, 3, 12, 12, 24, 7, 3, 6, 14, 16, 1, 21, 13, 14, 12, 22, 13, 17, 7, 18],
  // [12, 24, 21, 8, 21, 15, 22, 14, 15, 23, 8, 5, 2, 14, 1, 3, 21, 19, 1, 1, 23, 22, 20, 1, 14, 20, 21, 5, 9, 17, 20, 20, 17, 17, 21, 1, 11, 7, 6, 1, 6, 16, 21, 7, 8, 12, 14, 14, 1, 20, 4, 25, 19, 16, 19, 21, 22, 19, 25, 11, 21, 23, 25, 21, 10, 9, 2, 8, 9, 20, 16, 16, 8, 20, 13, 16, 25],
  // [11, 24, 8, 11, 12, 24, 16, 17, 10, 21, 2, 14, 6, 13, 16, 19, 24, 5, 7, 15, 12, 17, 18, 2, 25, 3, 16, 10, 22, 21, 5, 21, 22, 9, 22, 3, 7, 4, 15, 10, 2, 23, 14, 2, 1, 8, 11, 16, 7, 13, 8, 8, 17, 7, 20, 21, 3, 9, 21, 6],
  // [2, 4, 11, 12, 7, 20, 12, 7, 21, 19, 21, 22, 6, 24, 17, 8, 2, 25, 19, 12, 15, 1, 13, 9, 14, 13, 22, 4, 11, 15, 9, 21, 11, 16, 12, 7, 13, 19, 15, 24, 4, 16, 14, 18, 5, 8, 3, 5, 24, 2, 13, 18, 10, 10, 24, 22, 10, 10, 7, 10, 11, 13, 4, 5, 24, 1, 1, 11, 21, 6, 5, 15, 6, 7, 8, 16, 6, 5, 8, 8, 6, 21, 19, 18, 7, 1, 25, 6, 15, 19, 5],
  // [25, 15, 10, 23, 21, 6, 5, 12, 2, 10, 14, 3, 12, 25, 18, 7, 22, 16, 25, 20, 10, 8, 2],
  // [6, 18, 7, 12, 17, 7, 22, 2, 16, 21, 4, 10, 20, 15, 18, 10, 20, 19, 23, 22, 25, 9, 14, 23, 1, 8, 7, 10, 5, 10, 24, 5, 21, 14, 4, 11, 21, 19, 12, 19, 1, 11, 24, 14, 19, 4, 20, 3, 24, 10, 20, 7, 22, 8, 14, 9, 24, 8],
  // [21, 4, 14, 14, 24, 4, 22, 24, 19, 12, 10, 14, 13, 25, 12, 13, 19, 2, 9, 21, 17, 6, 17, 25, 15, 12, 19, 20, 10, 7, 23, 20, 14, 19, 9, 25, 18, 11, 10, 14, 18, 24, 18, 6, 15, 8, 9, 15, 13, 15, 23, 10, 25, 17, 25, 4, 17, 3, 12, 6, 24, 7, 3, 7, 19, 16, 23, 11, 6, 23, 19, 5, 18, 2, 12, 24, 14, 14, 12, 6, 14, 25, 14, 18, 21, 7, 15, 8, 20, 6, 5, 12, 13, 4, 22, 23, 20, 2, 16],
  // [18, 7, 13, 5, 14, 12, 21, 4, 20, 15, 12, 24, 12, 21, 8, 17, 17, 5, 22, 15, 17, 24, 10, 20, 23, 1, 1, 14, 4, 5, 8, 20, 8, 8, 12, 18, 17, 6, 6, 14, 18, 3, 2, 13, 8, 21, 7, 17, 3, 13, 6, 15, 6, 8, 11, 8, 12, 17, 14, 2, 9, 18, 5, 3, 23],
  // [1, 19, 12, 14, 12, 6, 15, 5, 7, 17, 18, 3],
  // [21, 15, 19, 14, 21, 6, 19, 18],
  // [2, 5, 12, 1, 5, 1, 5, 22, 5, 25, 15, 17, 21, 5, 6, 7, 8, 8, 21, 19, 16, 11, 6, 25, 7, 24, 25, 7, 9, 18, 15, 17, 1, 8, 11, 19, 18, 4, 1, 7, 22, 2, 12, 9, 21, 22, 8, 13, 19, 14, 1, 23, 21, 3, 20, 20, 7, 9, 14, 14, 4, 2, 7, 3, 24, 4, 11, 5, 24, 12, 10, 20, 8, 18],
  // [5, 9, 13, 15, 13, 5, 3, 1, 19, 16, 24, 4, 14, 15, 14, 21, 15, 15, 7, 23, 10, 20, 22, 13, 8, 16, 11, 8, 10, 12, 13, 1, 21, 20, 13, 8, 4, 9, 22, 5, 13, 18, 22, 23, 13, 25, 21, 6, 20, 24, 9, 6, 24, 10, 1, 1, 24, 17, 2, 13, 19, 6, 13, 17, 5, 6, 18, 23, 19],
  // [17, 16, 16, 23, 16, 13, 11, 7, 17, 13, 25, 20, 23, 7, 16, 23, 11, 18, 1, 23, 18, 21, 10, 24, 9, 9, 15, 22, 20, 23, 10, 6, 11, 4, 20, 4, 14, 24, 21, 22, 5, 11, 21, 18, 25, 20, 8, 5, 2, 3, 13, 22, 12, 4, 23, 20, 11, 17, 10, 6, 16, 3, 12, 21, 10, 2, 16, 13, 9, 6],
  // [1, 9, 7, 23, 11, 14, 10, 3, 8, 2, 11, 25, 9, 7, 1, 12, 25, 22, 16, 18, 22, 6, 13, 17, 21, 18, 12, 15, 18, 13, 22, 23, 18, 24, 19, 11, 19, 9, 4, 10, 3, 4, 22, 25, 9, 8, 4, 23, 19, 16, 15, 14, 15, 1, 4, 18, 6, 19, 21, 9, 24, 3, 23, 20, 3, 25, 6, 19, 11, 19, 22, 9, 22, 5, 10, 19],
  // [22, 4, 19, 24, 19, 12, 5, 2, 3, 11, 22, 7, 15, 2, 5, 3, 14, 12, 1, 5, 15, 15, 7, 8, 23, 6, 3, 24, 6, 23, 20, 16, 21, 16, 12, 12, 6, 24, 20, 22, 7, 24, 23, 11, 21, 3, 17, 19, 8, 8, 12, 8, 11, 4, 8, 5, 25, 8, 10, 20, 3, 16, 19, 13, 9, 23, 25, 15, 15, 5, 19, 9, 14, 13, 12, 17, 22, 9, 13, 20, 1, 17, 13, 10, 6, 19, 18, 17, 9],
  // [4, 3, 18, 25, 24, 16, 14, 16, 19, 13, 10, 11, 16, 5, 22, 16, 21, 19, 6, 1, 17, 2, 8, 24, 25, 8, 21, 14, 7],
  [5, 14, 11, 13, 23, 7, 22, 23, 22, 2, 7, 23, 23, 3, 23, 1, 21, 9, 8, 22, 14, 25, 18, 2],
  [11, 10, 19, 2, 16, 8, 21, 6, 4, 9, 8, 12, 22, 17, 8, 7, 22, 19, 18, 2, 6, 7, 22, 10, 3, 23, 22, 18, 4, 8, 4, 10, 10, 7, 6, 21, 6, 7, 17, 23, 11, 22, 24, 16, 5, 24, 10, 17, 16, 4, 22, 6, 23, 15, 8, 6, 13, 1, 13, 14, 1, 24, 18, 17, 4, 14, 1, 5, 10, 10, 9, 4, 13, 2, 3],
  [1, 3, 5, 5, 20, 3, 3, 3, 13, 20, 8, 25, 11, 12, 17, 12, 4, 22, 8, 17, 15, 14, 23, 15, 13, 13, 7, 5, 7, 15, 1, 13, 15, 2, 11, 9, 15, 23, 8, 4, 12, 1, 16, 3, 23, 7, 16, 16, 10, 8, 16, 15, 16, 17, 8, 8, 1, 2, 11, 6, 3, 20, 5, 17, 14, 24, 17, 25, 20, 11, 24, 13, 15, 4, 7, 14, 4, 23, 10, 25, 15, 3, 13, 6, 19, 19, 11, 3, 12],
  [13, 25, 12, 9, 18, 11, 4, 20, 1, 4, 13, 20, 11, 18, 14, 21, 14, 14, 9, 24, 21, 25, 21, 10, 23, 25, 20, 8, 16, 21, 6, 11, 21, 16, 24, 14, 14, 15, 15, 1, 6, 23, 12, 10, 21, 3, 23, 7, 6, 15, 2, 22, 13, 17, 8, 19, 7, 17, 22, 7, 9, 7, 11, 18, 12, 12, 14, 12, 14, 21, 1, 20, 11, 25, 6, 16, 9, 21, 14, 16, 11, 19, 7, 17, 12, 22, 21, 16, 24, 15, 13, 16, 25, 5, 8],
  [16, 11, 25, 16, 8, 12, 17, 16, 15, 13, 17, 10, 8, 3, 5, 21, 12, 9, 9, 11, 24, 19, 24, 3, 20, 23, 25, 23, 1, 22, 8, 5, 11, 7, 1, 9, 3, 1, 12, 4, 5, 24, 13, 19, 5, 8, 2, 5, 7, 9, 6, 6, 11, 13, 19, 8, 19, 2, 7, 14, 24, 21, 20, 14, 22, 5, 7, 20, 17, 1, 3, 2, 1, 2, 23, 6, 22, 8, 1, 17],
  [23, 13, 3, 21, 12, 20, 21, 4, 10, 18, 3, 19, 8, 25, 4, 4, 16, 15, 3, 6, 8, 9, 20, 2, 22, 7, 24, 9],
  [4, 25, 25, 17, 22, 10, 6, 6, 24, 19, 25, 11, 14, 19, 15, 13, 13, 16, 3, 7, 8, 11, 13],
  [24, 1, 19, 22, 4, 5, 20, 24, 20, 18, 2, 21, 2, 7, 22, 24, 23, 3, 16, 13, 15, 3, 5, 5, 14, 17, 8, 23],
  [8, 17, 19, 11, 17, 3, 10, 6, 24, 15, 13, 6, 8, 9, 1, 15, 5, 7, 11, 10, 20, 23, 17, 3, 9, 12, 11, 9, 24, 4, 15, 2, 24, 2, 11, 3, 21, 7, 11, 22, 9, 13, 8, 2, 6, 14, 8, 15, 16, 12, 12, 23, 4, 4, 25, 20, 3, 17, 1, 9, 4, 23, 5, 13, 5, 25],
  [11, 5, 14, 19, 12, 7, 23, 9, 15, 24, 9, 19, 11, 5, 12, 13, 8, 15, 10, 22, 18, 21, 21, 20, 8, 21, 17, 21, 12, 12, 21, 15, 3, 3, 2, 8, 21, 18, 24, 2, 20, 23, 19, 7, 23, 3, 18, 1, 7, 10, 24, 16, 6, 14, 4, 19, 25, 18, 11, 15, 7, 21, 23, 19, 15, 23, 1, 4, 16, 2, 2, 9, 13, 18, 16, 6, 7, 6, 15, 21, 17, 7, 22, 20, 11, 19, 22, 14, 11, 18, 14, 14, 19, 1, 25],
  [4, 7, 16, 2, 1, 8, 23, 18, 4, 6, 23, 9, 20, 21, 3, 2, 7, 22, 13, 25, 17, 18, 17, 24, 9, 5, 14, 18, 10, 15, 12, 16, 10, 14, 5, 7, 19, 19, 2, 17, 5, 12, 12, 4, 18],
  [23, 11, 5, 7, 21, 21, 7, 23, 25, 15, 12, 12, 3, 1, 13, 19, 5, 24, 10, 6, 17, 25, 18, 24, 25, 9, 13, 23, 5],
  [17, 16, 19, 22, 22, 19, 21, 1, 11, 14, 21, 18, 2, 12, 23, 11, 22, 11, 1, 5, 14, 14, 11, 11, 4, 13, 25, 20, 16, 10, 7, 8, 25, 17, 8, 13, 18, 6, 23, 5, 16, 4, 16, 8, 12, 2, 12, 20, 14, 7, 13, 5, 5, 16, 8, 24, 10, 21, 6, 9, 1, 20, 21, 7, 21, 7, 17, 1, 2, 4, 23, 17, 18, 24, 19, 13, 4, 1, 23, 20, 16],
  [20, 21, 8, 6, 1, 12, 4, 6, 7, 12, 12, 22, 9, 15, 15, 23, 24, 22, 18, 3, 12, 11, 5, 2, 5, 3, 24, 13, 23, 4, 19, 5, 4, 2, 11, 24],
  [12, 12, 16, 20, 10, 2, 16, 3, 1, 23, 18, 4, 15, 5, 11, 25, 5, 13, 13, 2, 24, 7, 5, 17, 13, 13, 4, 13, 22, 18, 13, 21, 21, 3, 8, 22, 11, 3, 12, 17, 13, 2, 3, 6, 24, 25, 8, 14, 6, 7, 23, 20, 15, 24, 22, 3, 16, 1, 20, 13, 13, 22, 13, 5, 3, 24, 13, 25, 10],
  [14, 1, 5, 21, 6, 17, 18, 5, 5, 6, 15, 15, 14, 18, 19, 18, 6, 6, 21, 23, 9, 17, 21, 1, 25, 14, 24, 3, 18, 12, 1, 22, 15, 6, 5, 18, 13, 14, 8, 23, 18, 15, 4, 23, 20, 10, 5, 24, 8, 11, 24, 4, 19, 11, 17, 3, 15, 19, 6, 14, 21, 17, 5, 5, 9, 21, 2, 2, 15, 3, 9, 23, 13, 24, 6, 8, 6, 24, 21, 7, 6, 9, 22, 24, 18, 6, 19, 15, 17, 24, 2, 6],
  [17, 25, 4, 22, 12, 25, 1, 15, 2, 15, 21, 6, 8, 13, 21, 21, 10, 16, 21, 7, 19, 10, 17, 12, 25, 17],
  [14, 22, 19, 17, 21, 9, 18, 18, 10, 15, 23, 17, 23, 7, 6, 4, 23, 17, 1, 1, 20, 1],
  [19, 8, 9, 25, 4, 5, 20, 5, 25, 20, 25, 21, 20, 6, 21, 23, 5, 8, 6, 16, 24, 2, 23, 1, 9, 14, 7, 13, 10, 18, 4, 20, 7, 13, 19, 2, 13, 4, 11, 18, 9, 5, 15, 20, 25, 10, 25, 1, 3, 22, 17, 3, 22, 25, 25, 14, 23, 11, 25, 3, 25, 23, 5, 13, 13, 3, 24, 25, 17, 17, 5, 25],
  [25, 3, 21, 23, 18, 23, 16, 21, 25, 24, 20, 14, 23, 8, 10, 9, 5],
  [8],
  [20, 21, 11, 19, 9, 15, 17, 21, 4, 25, 4, 1, 14, 1, 9, 14, 12, 25, 2, 7, 6, 1, 22, 20, 19, 23, 4, 11, 1, 5, 13, 19, 15, 11, 14, 21, 21, 22, 18, 7, 9, 9, 2, 10, 23, 23, 25, 13, 4, 18, 19, 7, 16, 25, 15, 8, 25, 6, 4, 8, 12],
  [17, 1],
  [7, 24, 14, 13, 20, 5, 6, 23, 19, 12, 5, 23, 7, 17, 18, 18, 5, 6, 5, 21, 17, 21, 10, 16, 6, 25, 20, 11, 6, 11, 20, 3, 12, 6, 5, 1, 19, 12, 12, 5, 11, 14, 9, 13, 17, 22, 13, 7, 25, 4, 13, 25, 22, 15, 9, 17, 9, 4, 3, 14, 16, 15, 19, 23, 3, 15, 17, 8, 11, 4],
  [10, 7, 23, 15, 23, 23, 10, 24, 18, 20],
  [15, 20, 21, 21, 24, 23, 16, 5, 15, 21, 20, 2, 17, 7, 16, 13, 21, 22, 10, 5, 25, 14, 23, 21, 2, 15, 22, 10, 6, 19, 24, 22, 3, 14, 2, 23, 3, 6, 22, 21, 22, 24, 25, 24, 9, 8, 10, 23, 6, 13, 1, 3, 4, 2, 16, 8, 24, 22, 20],
  [11, 16, 22, 11, 7, 25, 8, 10, 5, 6, 11, 16, 8, 19, 1, 21, 3, 14, 22, 4, 7, 21, 22, 13, 22, 16, 12, 20, 16, 1, 7, 11, 4, 13, 4, 17, 5, 8, 15, 18, 9, 14, 11, 15, 19, 18, 21, 19],
  [20, 19, 5, 5, 7, 1, 4, 23, 9, 22, 25, 3, 4, 16, 2, 4, 13, 16, 18, 11, 19, 6, 3, 11, 3, 15, 21],
  [11, 6, 5, 3, 5, 17, 6, 17, 23, 2, 16, 19, 21, 13, 22, 25, 7, 8, 20, 9, 15, 24, 5, 11, 3, 2, 14, 18, 14, 24, 10, 1, 4, 7, 3, 1, 25, 8, 2, 12, 20, 7, 17, 22, 7, 17, 20, 4, 11, 21, 18, 13, 18, 15, 1, 19, 6, 6, 18, 24, 19, 19, 13, 23, 19, 17, 4, 21, 7, 9, 19, 17, 8, 21, 3, 8, 18, 8, 25, 7, 12, 12, 20, 12, 16, 25, 22, 24, 22, 8, 6, 13, 1, 9, 3],
  [18, 20, 25, 21, 12, 11, 20, 17, 15, 17, 25, 23, 8, 23, 25, 7, 7, 20, 19, 3, 16, 4, 11, 10, 3, 12, 2, 3, 23, 4, 1, 16, 1, 5, 17, 15, 6, 6, 10, 9, 10, 18, 15, 10, 22, 16, 3, 14, 11, 9, 12, 20, 9, 5, 13],
  [21, 3, 18, 1, 7, 25, 18, 8],
  [13, 10, 7, 12, 9, 4, 3, 16, 25, 15, 17, 13, 10, 7, 8, 14, 11, 12, 17, 15, 23, 16, 15, 17, 16, 18, 9, 2, 11, 18, 7, 21, 18, 15, 15, 3, 12, 14],
  [13, 22, 25, 5, 19, 8, 4, 24, 11, 15, 23, 23, 2, 16, 2, 2, 24, 21, 20, 24, 24, 15, 5, 10, 20, 25, 5, 3, 13, 3, 9, 2, 14, 3, 3, 3, 6, 17, 6, 1, 8, 8, 17, 20, 15, 22, 15, 18, 23, 5, 25, 17],
  [1, 24, 11, 12, 9, 4, 8, 21],
  [3, 20, 20, 1, 4, 18, 7, 7, 1, 12, 1, 7, 25, 7, 23, 23, 24, 13, 9, 12, 3, 22, 4, 13, 3, 21, 20, 16, 16, 24, 10, 18, 16, 4, 21, 7, 16, 20],
  [15, 17, 1, 5, 25, 12, 6, 5, 25, 4, 7, 18, 2, 22, 22, 15, 11, 2, 13, 1, 13, 25, 17, 17, 11, 10, 25, 16, 19, 22, 20, 22, 14, 19, 14, 10, 12, 19, 17, 12, 22, 23, 7, 4, 25, 3, 13, 9, 2, 14, 1, 14, 7, 17, 19, 7, 21, 21, 23, 25, 12, 2, 3, 8, 19, 8, 17, 6, 25, 17, 14, 25, 4, 24, 24, 20, 17, 25, 14, 19, 16, 25, 6, 15, 25, 5, 25, 14, 5, 17, 9, 10, 8, 19, 20],
  [10, 4, 7, 5, 16, 8, 22, 13, 5, 25, 11, 18, 17, 4, 23, 10, 24, 10, 22, 20, 13, 1, 12, 10, 12, 20, 10, 13, 14, 23, 9, 21, 20, 4, 16, 14, 19, 1, 11, 18, 12, 25, 17, 25, 10, 1, 15, 15, 19, 7, 8, 23, 13, 8, 4],
  [2, 8, 10, 6, 14, 20, 15, 15, 24, 9, 18, 3, 21, 19, 19, 21, 8, 5, 6, 22, 21, 23, 22, 25, 1, 9, 16, 21, 16, 6, 6, 11, 4, 7, 11, 13, 7, 22, 23, 6, 5, 23, 9, 9, 17, 8, 6, 4, 17, 13, 11, 20, 10, 25, 7, 20, 4, 18, 24, 13, 22, 7, 15, 8, 23, 5, 15, 25, 15, 14, 6, 3, 16, 25, 12, 7, 24, 16, 8, 21, 10, 14, 10, 17, 18, 13, 3, 6],
  [12, 15, 18, 16, 5, 3, 25, 20, 4, 23, 21, 17, 4, 19],
  [4, 23, 25, 20, 3, 8, 19, 14, 16, 9, 10, 23, 13, 9, 21, 17, 7, 18, 18, 3, 23, 2, 16, 18, 13, 18, 24, 21, 14, 14, 7, 9],
  [24, 23, 11, 6, 18, 6, 22, 14, 1, 4, 3, 23, 4, 21, 18, 10, 17, 5, 22, 13, 7, 13, 16, 17, 6, 13, 6, 13, 25, 25, 4, 22, 5, 19, 10, 15, 23, 2, 20, 5, 23, 16, 9, 20, 13, 2, 20, 15, 12, 7, 15, 13, 4, 1, 25, 8, 15, 9, 17, 7, 15, 2, 21, 2, 15, 12, 12],
  [2, 13, 16, 23, 10, 22, 23, 6, 13, 10, 16, 24, 23, 11, 19, 24, 21, 12],
  [10, 21, 1, 9, 5, 10, 13, 5, 20, 18, 21, 9, 1, 18, 23, 2, 9, 24, 7, 12, 18, 17, 5, 22, 4, 8, 12, 24, 9, 4, 15, 19, 1, 15, 22, 8, 23, 19, 22, 21, 23, 24, 7, 17, 16, 17, 15, 2, 17, 3, 19, 4, 17, 7, 12, 5, 16, 6, 21, 12, 2, 12, 18, 7, 4, 9, 10, 16, 24, 7, 6, 1, 7, 4, 17, 12, 4, 8],
  [15, 20, 13, 21, 11, 25, 7, 12, 15, 12, 12, 3, 15, 9, 13, 7, 14, 22, 3, 9, 18, 5, 15, 23, 10, 6, 16, 20, 1, 8, 10, 16, 3, 5, 20, 3, 10, 24, 1, 12, 11, 4, 6, 21, 14, 10, 16, 18, 17, 19, 2, 5, 23, 7],
  [1, 11, 12, 12, 7, 25, 20, 6, 13, 9, 15, 20, 2, 19, 6, 12, 19, 20, 20, 23, 24, 19, 2, 2, 15, 5, 14, 17, 21, 11, 14, 25, 15, 17, 18, 5, 21, 8, 2, 15, 10, 12, 18, 21, 11, 10, 5, 19, 21, 16, 15, 9, 2, 24, 5],
  [20, 5, 16, 18, 15, 20, 16, 25, 9, 25, 9, 11, 3, 8, 8, 12, 15, 6, 25, 18, 17, 14, 24, 7, 24, 24, 3, 14, 16, 6, 3, 4, 23, 14, 24, 18, 19, 10, 1],
  [12, 9, 10, 17, 3, 24, 2, 5, 5, 16, 3, 4],
  [16, 9, 1, 18, 24, 1, 13, 22, 3, 7],
  [3, 5, 25, 11, 11, 14, 24, 8, 11, 16, 22, 16, 15, 14, 15, 12, 24, 11, 21, 15, 20, 13, 24, 16, 2, 16, 2, 7, 9, 13, 18, 22, 1, 19, 11, 16, 10, 2, 5, 3, 5, 9, 11, 9, 5, 16, 8, 10, 25, 6, 20, 13, 15, 10, 17, 18, 14, 5, 5, 10, 11, 12, 22, 13, 13, 13, 1, 22, 2, 2, 21, 2, 9, 14, 14, 22, 15, 11, 10, 3, 4, 7, 3, 7, 1, 17, 7, 15, 5, 4, 22, 19],
  [9, 14, 9, 25, 16, 7, 13, 12, 16, 8, 20, 25, 11, 17, 7, 14, 17, 24, 6, 23, 10, 21, 21, 6, 4, 6, 24, 19, 8, 7, 19, 15, 21, 14, 17, 24, 16, 21, 15, 19, 11, 1, 2, 11, 8, 21, 11, 22, 11, 22, 23, 3, 12, 23],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(candy(test));
  console.timeEnd(i);
  i += 1;
}

/*
[1, 0, 2]
[1, 2, 2]
[2, 1, 3, 4, 3, 2, 7]
[5, 4, 3, 2, 3, 2, 2, 5, 6, 4, 3, 2, 1]
[12, 16, 19, 6, 4, 16, 20, 5, 12, 1, 22, 17, 16, 14, 5, 3, 14, 8, 7, 25, 3, 17, 14, 23, 17, 2, 13, 19, 18, 10, 2, 1, 5, 1, 1, 9, 19, 6, 13, 2, 21, 1, 4, 14, 3, 6, 2, 20, 6, 12, 21, 19, 11, 12, 14, 14, 7, 13, 22, 12, 18, 4, 14, 23, 20, 11, 20, 3, 3, 20, 16, 19, 6, 2, 15, 7, 22, 25, 3, 12, 8, 18, 24, 6, 15, 5, 24, 19, 19, 24, 3, 18, 17]
[20, 24, 9, 8, 25, 24, 5, 12, 5, 25, 9, 13, 4, 18, 21, 2, 5, 14, 24, 4, 24, 25, 3, 14, 14, 6, 6, 8, 9, 6, 1, 11, 8, 11, 21, 12, 21, 20, 17]
[14, 3, 14, 14, 7, 21, 8, 23, 19, 8, 12, 2, 15, 9, 14, 19, 4]
[10, 24, 12, 17, 8, 3, 2, 2, 8, 10, 20, 7, 6, 12, 14, 16, 2, 22, 17, 5, 22, 3, 20, 11, 20, 15, 18, 24, 23, 5, 18, 24, 20, 17, 6, 2, 4, 7, 7, 3, 17, 4, 22, 11, 9, 21]
[11, 14, 13, 6, 1, 5, 18, 7, 9, 5, 25, 23, 6, 6, 20, 24, 24, 6, 7, 5, 22, 25, 24, 25, 21, 3, 12, 12, 24, 7, 3, 6, 14, 16, 1, 21, 13, 14, 12, 22, 13, 17, 7, 18]
[12, 24, 21, 8, 21, 15, 22, 14, 15, 23, 8, 5, 2, 14, 1, 3, 21, 19, 1, 1, 23, 22, 20, 1, 14, 20, 21, 5, 9, 17, 20, 20, 17, 17, 21, 1, 11, 7, 6, 1, 6, 16, 21, 7, 8, 12, 14, 14, 1, 20, 4, 25, 19, 16, 19, 21, 22, 19, 25, 11, 21, 23, 25, 21, 10, 9, 2, 8, 9, 20, 16, 16, 8, 20, 13, 16, 25]
[11, 24, 8, 11, 12, 24, 16, 17, 10, 21, 2, 14, 6, 13, 16, 19, 24, 5, 7, 15, 12, 17, 18, 2, 25, 3, 16, 10, 22, 21, 5, 21, 22, 9, 22, 3, 7, 4, 15, 10, 2, 23, 14, 2, 1, 8, 11, 16, 7, 13, 8, 8, 17, 7, 20, 21, 3, 9, 21, 6]
[2, 4, 11, 12, 7, 20, 12, 7, 21, 19, 21, 22, 6, 24, 17, 8, 2, 25, 19, 12, 15, 1, 13, 9, 14, 13, 22, 4, 11, 15, 9, 21, 11, 16, 12, 7, 13, 19, 15, 24, 4, 16, 14, 18, 5, 8, 3, 5, 24, 2, 13, 18, 10, 10, 24, 22, 10, 10, 7, 10, 11, 13, 4, 5, 24, 1, 1, 11, 21, 6, 5, 15, 6, 7, 8, 16, 6, 5, 8, 8, 6, 21, 19, 18, 7, 1, 25, 6, 15, 19, 5]
[25, 15, 10, 23, 21, 6, 5, 12, 2, 10, 14, 3, 12, 25, 18, 7, 22, 16, 25, 20, 10, 8, 2]
[6, 18, 7, 12, 17, 7, 22, 2, 16, 21, 4, 10, 20, 15, 18, 10, 20, 19, 23, 22, 25, 9, 14, 23, 1, 8, 7, 10, 5, 10, 24, 5, 21, 14, 4, 11, 21, 19, 12, 19, 1, 11, 24, 14, 19, 4, 20, 3, 24, 10, 20, 7, 22, 8, 14, 9, 24, 8]
[21, 4, 14, 14, 24, 4, 22, 24, 19, 12, 10, 14, 13, 25, 12, 13, 19, 2, 9, 21, 17, 6, 17, 25, 15, 12, 19, 20, 10, 7, 23, 20, 14, 19, 9, 25, 18, 11, 10, 14, 18, 24, 18, 6, 15, 8, 9, 15, 13, 15, 23, 10, 25, 17, 25, 4, 17, 3, 12, 6, 24, 7, 3, 7, 19, 16, 23, 11, 6, 23, 19, 5, 18, 2, 12, 24, 14, 14, 12, 6, 14, 25, 14, 18, 21, 7, 15, 8, 20, 6, 5, 12, 13, 4, 22, 23, 20, 2, 16]
[18, 7, 13, 5, 14, 12, 21, 4, 20, 15, 12, 24, 12, 21, 8, 17, 17, 5, 22, 15, 17, 24, 10, 20, 23, 1, 1, 14, 4, 5, 8, 20, 8, 8, 12, 18, 17, 6, 6, 14, 18, 3, 2, 13, 8, 21, 7, 17, 3, 13, 6, 15, 6, 8, 11, 8, 12, 17, 14, 2, 9, 18, 5, 3, 23]
[1, 19, 12, 14, 12, 6, 15, 5, 7, 17, 18, 3]
[21, 15, 19, 14, 21, 6, 19, 18]
[2, 5, 12, 1, 5, 1, 5, 22, 5, 25, 15, 17, 21, 5, 6, 7, 8, 8, 21, 19, 16, 11, 6, 25, 7, 24, 25, 7, 9, 18, 15, 17, 1, 8, 11, 19, 18, 4, 1, 7, 22, 2, 12, 9, 21, 22, 8, 13, 19, 14, 1, 23, 21, 3, 20, 20, 7, 9, 14, 14, 4, 2, 7, 3, 24, 4, 11, 5, 24, 12, 10, 20, 8, 18]
[5, 9, 13, 15, 13, 5, 3, 1, 19, 16, 24, 4, 14, 15, 14, 21, 15, 15, 7, 23, 10, 20, 22, 13, 8, 16, 11, 8, 10, 12, 13, 1, 21, 20, 13, 8, 4, 9, 22, 5, 13, 18, 22, 23, 13, 25, 21, 6, 20, 24, 9, 6, 24, 10, 1, 1, 24, 17, 2, 13, 19, 6, 13, 17, 5, 6, 18, 23, 19]
[17, 16, 16, 23, 16, 13, 11, 7, 17, 13, 25, 20, 23, 7, 16, 23, 11, 18, 1, 23, 18, 21, 10, 24, 9, 9, 15, 22, 20, 23, 10, 6, 11, 4, 20, 4, 14, 24, 21, 22, 5, 11, 21, 18, 25, 20, 8, 5, 2, 3, 13, 22, 12, 4, 23, 20, 11, 17, 10, 6, 16, 3, 12, 21, 10, 2, 16, 13, 9, 6]
[1, 9, 7, 23, 11, 14, 10, 3, 8, 2, 11, 25, 9, 7, 1, 12, 25, 22, 16, 18, 22, 6, 13, 17, 21, 18, 12, 15, 18, 13, 22, 23, 18, 24, 19, 11, 19, 9, 4, 10, 3, 4, 22, 25, 9, 8, 4, 23, 19, 16, 15, 14, 15, 1, 4, 18, 6, 19, 21, 9, 24, 3, 23, 20, 3, 25, 6, 19, 11, 19, 22, 9, 22, 5, 10, 19]
[22, 4, 19, 24, 19, 12, 5, 2, 3, 11, 22, 7, 15, 2, 5, 3, 14, 12, 1, 5, 15, 15, 7, 8, 23, 6, 3, 24, 6, 23, 20, 16, 21, 16, 12, 12, 6, 24, 20, 22, 7, 24, 23, 11, 21, 3, 17, 19, 8, 8, 12, 8, 11, 4, 8, 5, 25, 8, 10, 20, 3, 16, 19, 13, 9, 23, 25, 15, 15, 5, 19, 9, 14, 13, 12, 17, 22, 9, 13, 20, 1, 17, 13, 10, 6, 19, 18, 17, 9]
[4, 3, 18, 25, 24, 16, 14, 16, 19, 13, 10, 11, 16, 5, 22, 16, 21, 19, 6, 1, 17, 2, 8, 24, 25, 8, 21, 14, 7]

[5, 14, 11, 13, 23, 7, 22, 23, 22, 2, 7, 23, 23, 3, 23, 1, 21, 9, 8, 22, 14, 25, 18, 2]
[11, 10, 19, 2, 16, 8, 21, 6, 4, 9, 8, 12, 22, 17, 8, 7, 22, 19, 18, 2, 6, 7, 22, 10, 3, 23, 22, 18, 4, 8, 4, 10, 10, 7, 6, 21, 6, 7, 17, 23, 11, 22, 24, 16, 5, 24, 10, 17, 16, 4, 22, 6, 23, 15, 8, 6, 13, 1, 13, 14, 1, 24, 18, 17, 4, 14, 1, 5, 10, 10, 9, 4, 13, 2, 3]
[1, 3, 5, 5, 20, 3, 3, 3, 13, 20, 8, 25, 11, 12, 17, 12, 4, 22, 8, 17, 15, 14, 23, 15, 13, 13, 7, 5, 7, 15, 1, 13, 15, 2, 11, 9, 15, 23, 8, 4, 12, 1, 16, 3, 23, 7, 16, 16, 10, 8, 16, 15, 16, 17, 8, 8, 1, 2, 11, 6, 3, 20, 5, 17, 14, 24, 17, 25, 20, 11, 24, 13, 15, 4, 7, 14, 4, 23, 10, 25, 15, 3, 13, 6, 19, 19, 11, 3, 12]
[13, 25, 12, 9, 18, 11, 4, 20, 1, 4, 13, 20, 11, 18, 14, 21, 14, 14, 9, 24, 21, 25, 21, 10, 23, 25, 20, 8, 16, 21, 6, 11, 21, 16, 24, 14, 14, 15, 15, 1, 6, 23, 12, 10, 21, 3, 23, 7, 6, 15, 2, 22, 13, 17, 8, 19, 7, 17, 22, 7, 9, 7, 11, 18, 12, 12, 14, 12, 14, 21, 1, 20, 11, 25, 6, 16, 9, 21, 14, 16, 11, 19, 7, 17, 12, 22, 21, 16, 24, 15, 13, 16, 25, 5, 8]
[16, 11, 25, 16, 8, 12, 17, 16, 15, 13, 17, 10, 8, 3, 5, 21, 12, 9, 9, 11, 24, 19, 24, 3, 20, 23, 25, 23, 1, 22, 8, 5, 11, 7, 1, 9, 3, 1, 12, 4, 5, 24, 13, 19, 5, 8, 2, 5, 7, 9, 6, 6, 11, 13, 19, 8, 19, 2, 7, 14, 24, 21, 20, 14, 22, 5, 7, 20, 17, 1, 3, 2, 1, 2, 23, 6, 22, 8, 1, 17]
[23, 13, 3, 21, 12, 20, 21, 4, 10, 18, 3, 19, 8, 25, 4, 4, 16, 15, 3, 6, 8, 9, 20, 2, 22, 7, 24, 9]
[4, 25, 25, 17, 22, 10, 6, 6, 24, 19, 25, 11, 14, 19, 15, 13, 13, 16, 3, 7, 8, 11, 13]
[24, 1, 19, 22, 4, 5, 20, 24, 20, 18, 2, 21, 2, 7, 22, 24, 23, 3, 16, 13, 15, 3, 5, 5, 14, 17, 8, 23]
[8, 17, 19, 11, 17, 3, 10, 6, 24, 15, 13, 6, 8, 9, 1, 15, 5, 7, 11, 10, 20, 23, 17, 3, 9, 12, 11, 9, 24, 4, 15, 2, 24, 2, 11, 3, 21, 7, 11, 22, 9, 13, 8, 2, 6, 14, 8, 15, 16, 12, 12, 23, 4, 4, 25, 20, 3, 17, 1, 9, 4, 23, 5, 13, 5, 25]
[11, 5, 14, 19, 12, 7, 23, 9, 15, 24, 9, 19, 11, 5, 12, 13, 8, 15, 10, 22, 18, 21, 21, 20, 8, 21, 17, 21, 12, 12, 21, 15, 3, 3, 2, 8, 21, 18, 24, 2, 20, 23, 19, 7, 23, 3, 18, 1, 7, 10, 24, 16, 6, 14, 4, 19, 25, 18, 11, 15, 7, 21, 23, 19, 15, 23, 1, 4, 16, 2, 2, 9, 13, 18, 16, 6, 7, 6, 15, 21, 17, 7, 22, 20, 11, 19, 22, 14, 11, 18, 14, 14, 19, 1, 25]
[4, 7, 16, 2, 1, 8, 23, 18, 4, 6, 23, 9, 20, 21, 3, 2, 7, 22, 13, 25, 17, 18, 17, 24, 9, 5, 14, 18, 10, 15, 12, 16, 10, 14, 5, 7, 19, 19, 2, 17, 5, 12, 12, 4, 18]
[23, 11, 5, 7, 21, 21, 7, 23, 25, 15, 12, 12, 3, 1, 13, 19, 5, 24, 10, 6, 17, 25, 18, 24, 25, 9, 13, 23, 5]
[17, 16, 19, 22, 22, 19, 21, 1, 11, 14, 21, 18, 2, 12, 23, 11, 22, 11, 1, 5, 14, 14, 11, 11, 4, 13, 25, 20, 16, 10, 7, 8, 25, 17, 8, 13, 18, 6, 23, 5, 16, 4, 16, 8, 12, 2, 12, 20, 14, 7, 13, 5, 5, 16, 8, 24, 10, 21, 6, 9, 1, 20, 21, 7, 21, 7, 17, 1, 2, 4, 23, 17, 18, 24, 19, 13, 4, 1, 23, 20, 16]
[20, 21, 8, 6, 1, 12, 4, 6, 7, 12, 12, 22, 9, 15, 15, 23, 24, 22, 18, 3, 12, 11, 5, 2, 5, 3, 24, 13, 23, 4, 19, 5, 4, 2, 11, 24]
[12, 12, 16, 20, 10, 2, 16, 3, 1, 23, 18, 4, 15, 5, 11, 25, 5, 13, 13, 2, 24, 7, 5, 17, 13, 13, 4, 13, 22, 18, 13, 21, 21, 3, 8, 22, 11, 3, 12, 17, 13, 2, 3, 6, 24, 25, 8, 14, 6, 7, 23, 20, 15, 24, 22, 3, 16, 1, 20, 13, 13, 22, 13, 5, 3, 24, 13, 25, 10]
[14, 1, 5, 21, 6, 17, 18, 5, 5, 6, 15, 15, 14, 18, 19, 18, 6, 6, 21, 23, 9, 17, 21, 1, 25, 14, 24, 3, 18, 12, 1, 22, 15, 6, 5, 18, 13, 14, 8, 23, 18, 15, 4, 23, 20, 10, 5, 24, 8, 11, 24, 4, 19, 11, 17, 3, 15, 19, 6, 14, 21, 17, 5, 5, 9, 21, 2, 2, 15, 3, 9, 23, 13, 24, 6, 8, 6, 24, 21, 7, 6, 9, 22, 24, 18, 6, 19, 15, 17, 24, 2, 6]
[17, 25, 4, 22, 12, 25, 1, 15, 2, 15, 21, 6, 8, 13, 21, 21, 10, 16, 21, 7, 19, 10, 17, 12, 25, 17]
[14, 22, 19, 17, 21, 9, 18, 18, 10, 15, 23, 17, 23, 7, 6, 4, 23, 17, 1, 1, 20, 1]
[19, 8, 9, 25, 4, 5, 20, 5, 25, 20, 25, 21, 20, 6, 21, 23, 5, 8, 6, 16, 24, 2, 23, 1, 9, 14, 7, 13, 10, 18, 4, 20, 7, 13, 19, 2, 13, 4, 11, 18, 9, 5, 15, 20, 25, 10, 25, 1, 3, 22, 17, 3, 22, 25, 25, 14, 23, 11, 25, 3, 25, 23, 5, 13, 13, 3, 24, 25, 17, 17, 5, 25]
[25, 3, 21, 23, 18, 23, 16, 21, 25, 24, 20, 14, 23, 8, 10, 9, 5]
[8]
[20, 21, 11, 19, 9, 15, 17, 21, 4, 25, 4, 1, 14, 1, 9, 14, 12, 25, 2, 7, 6, 1, 22, 20, 19, 23, 4, 11, 1, 5, 13, 19, 15, 11, 14, 21, 21, 22, 18, 7, 9, 9, 2, 10, 23, 23, 25, 13, 4, 18, 19, 7, 16, 25, 15, 8, 25, 6, 4, 8, 12]
[17, 1]
[7, 24, 14, 13, 20, 5, 6, 23, 19, 12, 5, 23, 7, 17, 18, 18, 5, 6, 5, 21, 17, 21, 10, 16, 6, 25, 20, 11, 6, 11, 20, 3, 12, 6, 5, 1, 19, 12, 12, 5, 11, 14, 9, 13, 17, 22, 13, 7, 25, 4, 13, 25, 22, 15, 9, 17, 9, 4, 3, 14, 16, 15, 19, 23, 3, 15, 17, 8, 11, 4]
[10, 7, 23, 15, 23, 23, 10, 24, 18, 20]
[15, 20, 21, 21, 24, 23, 16, 5, 15, 21, 20, 2, 17, 7, 16, 13, 21, 22, 10, 5, 25, 14, 23, 21, 2, 15, 22, 10, 6, 19, 24, 22, 3, 14, 2, 23, 3, 6, 22, 21, 22, 24, 25, 24, 9, 8, 10, 23, 6, 13, 1, 3, 4, 2, 16, 8, 24, 22, 20]
[11, 16, 22, 11, 7, 25, 8, 10, 5, 6, 11, 16, 8, 19, 1, 21, 3, 14, 22, 4, 7, 21, 22, 13, 22, 16, 12, 20, 16, 1, 7, 11, 4, 13, 4, 17, 5, 8, 15, 18, 9, 14, 11, 15, 19, 18, 21, 19]
[20, 19, 5, 5, 7, 1, 4, 23, 9, 22, 25, 3, 4, 16, 2, 4, 13, 16, 18, 11, 19, 6, 3, 11, 3, 15, 21]
[11, 6, 5, 3, 5, 17, 6, 17, 23, 2, 16, 19, 21, 13, 22, 25, 7, 8, 20, 9, 15, 24, 5, 11, 3, 2, 14, 18, 14, 24, 10, 1, 4, 7, 3, 1, 25, 8, 2, 12, 20, 7, 17, 22, 7, 17, 20, 4, 11, 21, 18, 13, 18, 15, 1, 19, 6, 6, 18, 24, 19, 19, 13, 23, 19, 17, 4, 21, 7, 9, 19, 17, 8, 21, 3, 8, 18, 8, 25, 7, 12, 12, 20, 12, 16, 25, 22, 24, 22, 8, 6, 13, 1, 9, 3]
[18, 20, 25, 21, 12, 11, 20, 17, 15, 17, 25, 23, 8, 23, 25, 7, 7, 20, 19, 3, 16, 4, 11, 10, 3, 12, 2, 3, 23, 4, 1, 16, 1, 5, 17, 15, 6, 6, 10, 9, 10, 18, 15, 10, 22, 16, 3, 14, 11, 9, 12, 20, 9, 5, 13]
[21, 3, 18, 1, 7, 25, 18, 8]
[13, 10, 7, 12, 9, 4, 3, 16, 25, 15, 17, 13, 10, 7, 8, 14, 11, 12, 17, 15, 23, 16, 15, 17, 16, 18, 9, 2, 11, 18, 7, 21, 18, 15, 15, 3, 12, 14]
[13, 22, 25, 5, 19, 8, 4, 24, 11, 15, 23, 23, 2, 16, 2, 2, 24, 21, 20, 24, 24, 15, 5, 10, 20, 25, 5, 3, 13, 3, 9, 2, 14, 3, 3, 3, 6, 17, 6, 1, 8, 8, 17, 20, 15, 22, 15, 18, 23, 5, 25, 17]
[1, 24, 11, 12, 9, 4, 8, 21]
[3, 20, 20, 1, 4, 18, 7, 7, 1, 12, 1, 7, 25, 7, 23, 23, 24, 13, 9, 12, 3, 22, 4, 13, 3, 21, 20, 16, 16, 24, 10, 18, 16, 4, 21, 7, 16, 20]
[15, 17, 1, 5, 25, 12, 6, 5, 25, 4, 7, 18, 2, 22, 22, 15, 11, 2, 13, 1, 13, 25, 17, 17, 11, 10, 25, 16, 19, 22, 20, 22, 14, 19, 14, 10, 12, 19, 17, 12, 22, 23, 7, 4, 25, 3, 13, 9, 2, 14, 1, 14, 7, 17, 19, 7, 21, 21, 23, 25, 12, 2, 3, 8, 19, 8, 17, 6, 25, 17, 14, 25, 4, 24, 24, 20, 17, 25, 14, 19, 16, 25, 6, 15, 25, 5, 25, 14, 5, 17, 9, 10, 8, 19, 20]
[10, 4, 7, 5, 16, 8, 22, 13, 5, 25, 11, 18, 17, 4, 23, 10, 24, 10, 22, 20, 13, 1, 12, 10, 12, 20, 10, 13, 14, 23, 9, 21, 20, 4, 16, 14, 19, 1, 11, 18, 12, 25, 17, 25, 10, 1, 15, 15, 19, 7, 8, 23, 13, 8, 4]
[2, 8, 10, 6, 14, 20, 15, 15, 24, 9, 18, 3, 21, 19, 19, 21, 8, 5, 6, 22, 21, 23, 22, 25, 1, 9, 16, 21, 16, 6, 6, 11, 4, 7, 11, 13, 7, 22, 23, 6, 5, 23, 9, 9, 17, 8, 6, 4, 17, 13, 11, 20, 10, 25, 7, 20, 4, 18, 24, 13, 22, 7, 15, 8, 23, 5, 15, 25, 15, 14, 6, 3, 16, 25, 12, 7, 24, 16, 8, 21, 10, 14, 10, 17, 18, 13, 3, 6]
[12, 15, 18, 16, 5, 3, 25, 20, 4, 23, 21, 17, 4, 19]
[4, 23, 25, 20, 3, 8, 19, 14, 16, 9, 10, 23, 13, 9, 21, 17, 7, 18, 18, 3, 23, 2, 16, 18, 13, 18, 24, 21, 14, 14, 7, 9]
[24, 23, 11, 6, 18, 6, 22, 14, 1, 4, 3, 23, 4, 21, 18, 10, 17, 5, 22, 13, 7, 13, 16, 17, 6, 13, 6, 13, 25, 25, 4, 22, 5, 19, 10, 15, 23, 2, 20, 5, 23, 16, 9, 20, 13, 2, 20, 15, 12, 7, 15, 13, 4, 1, 25, 8, 15, 9, 17, 7, 15, 2, 21, 2, 15, 12, 12]
[2, 13, 16, 23, 10, 22, 23, 6, 13, 10, 16, 24, 23, 11, 19, 24, 21, 12]
[10, 21, 1, 9, 5, 10, 13, 5, 20, 18, 21, 9, 1, 18, 23, 2, 9, 24, 7, 12, 18, 17, 5, 22, 4, 8, 12, 24, 9, 4, 15, 19, 1, 15, 22, 8, 23, 19, 22, 21, 23, 24, 7, 17, 16, 17, 15, 2, 17, 3, 19, 4, 17, 7, 12, 5, 16, 6, 21, 12, 2, 12, 18, 7, 4, 9, 10, 16, 24, 7, 6, 1, 7, 4, 17, 12, 4, 8]
[15, 20, 13, 21, 11, 25, 7, 12, 15, 12, 12, 3, 15, 9, 13, 7, 14, 22, 3, 9, 18, 5, 15, 23, 10, 6, 16, 20, 1, 8, 10, 16, 3, 5, 20, 3, 10, 24, 1, 12, 11, 4, 6, 21, 14, 10, 16, 18, 17, 19, 2, 5, 23, 7]
[1, 11, 12, 12, 7, 25, 20, 6, 13, 9, 15, 20, 2, 19, 6, 12, 19, 20, 20, 23, 24, 19, 2, 2, 15, 5, 14, 17, 21, 11, 14, 25, 15, 17, 18, 5, 21, 8, 2, 15, 10, 12, 18, 21, 11, 10, 5, 19, 21, 16, 15, 9, 2, 24, 5]
[20, 5, 16, 18, 15, 20, 16, 25, 9, 25, 9, 11, 3, 8, 8, 12, 15, 6, 25, 18, 17, 14, 24, 7, 24, 24, 3, 14, 16, 6, 3, 4, 23, 14, 24, 18, 19, 10, 1]
[12, 9, 10, 17, 3, 24, 2, 5, 5, 16, 3, 4]
[16, 9, 1, 18, 24, 1, 13, 22, 3, 7]
[3, 5, 25, 11, 11, 14, 24, 8, 11, 16, 22, 16, 15, 14, 15, 12, 24, 11, 21, 15, 20, 13, 24, 16, 2, 16, 2, 7, 9, 13, 18, 22, 1, 19, 11, 16, 10, 2, 5, 3, 5, 9, 11, 9, 5, 16, 8, 10, 25, 6, 20, 13, 15, 10, 17, 18, 14, 5, 5, 10, 11, 12, 22, 13, 13, 13, 1, 22, 2, 2, 21, 2, 9, 14, 14, 22, 15, 11, 10, 3, 4, 7, 3, 7, 1, 17, 7, 15, 5, 4, 22, 19]
[9, 14, 9, 25, 16, 7, 13, 12, 16, 8, 20, 25, 11, 17, 7, 14, 17, 24, 6, 23, 10, 21, 21, 6, 4, 6, 24, 19, 8, 7, 19, 15, 21, 14, 17, 24, 16, 21, 15, 19, 11, 1, 2, 11, 8, 21, 11, 22, 11, 22, 23, 3, 12, 23]
*/