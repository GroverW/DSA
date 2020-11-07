/*
You are the manager of a basketball team. For the upcoming tournament, you want to choose the team with the highest overall score. The score of the team is the sum of scores of all the players in the team.

However, the basketball team is not allowed to have conflicts. A conflict exists if a younger player has a strictly higher score than an older player. A conflict does not occur between players of the same age.

Given two lists, scores and ages, where each scores[i] and ages[i] represents the score and age of the ith player, respectively, return the highest overall score of all possible basketball teams.



Example 1:

Input: scores = [1,3,5,10,15], ages = [1,2,3,4,5]
Output: 34
Explanation: You can choose all the players.
Example 2:

Input: scores = [4,5,6,5], ages = [2,1,2,1]
Output: 16
Explanation: It is best to choose the last 3 players. Notice that you are allowed to choose multiple people of the same age.
Example 3:

Input: scores = [1,2,3,5], ages = [8,9,10,1]
Output: 6
Explanation: It is best to choose the first 3 players.


Constraints:

1 <= scores.length, ages.length <= 1000
scores.length == ages.length
1 <= scores[i] <= 106
1 <= ages[i] <= 1000
*/

var bestTeamScore = function (scores, ages) {
  const mapped = ages.map((age, player) => [age, scores[player]])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);


  const maxScores = new Array(mapped.length).fill(0);

  maxScores[0] = mapped[0][1];

  let max = maxScores[0];

  for (let i = 1; i < mapped.length; i += 1) {
    const score = mapped[i][1];
    maxScores[i] = score;
    for (let j = i - 1; j >= 0; j -= 1) {
      const prevScore = mapped[j][1];
      if (score >= prevScore) {
        maxScores[i] = Math.max(maxScores[i], maxScores[j] + score);
      }
    }
    max = Math.max(max, maxScores[i]);
  }

  return max;
};

/*
[1, 2, 3, 2, 2, 4]
[1, 1, 2, 3, 3, 4]
[1, 3, 6, 5, 7, 11]
*/

const tests = [
  [
    [15, 10, 6, 3, 1],
    [5, 4, 3, 2, 1],
  ],
  [
    [4, 5, 6, 5],
    [2, 1, 2, 1],
  ],
  [
    [1, 2, 3, 5],
    [8, 9, 10, 1],
  ],
  [
    [2, 5, 4, 7],
    [3, 5, 1, 5],
  ],
  [
    [1],
    [4],
  ],
]

for (let test of tests) {
  logOutList(bestTeamScore(...test));
}