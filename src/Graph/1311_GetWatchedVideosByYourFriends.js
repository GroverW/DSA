/*
There are n people, each person has a unique id between 0 and n-1. Given the arrays watchedVideos and friends, where watchedVideos[i] and friends[i] contain the list of watched videos and the list of friends respectively for the person with id = i.

Level 1 of videos are all watched videos by your friends, level 2 of videos are all watched videos by the friends of your friends and so on. In general, the level k of videos are all watched videos by people with the shortest path exactly equal to k with you. Given your id and the level of videos, return the list of videos ordered by their frequencies (increasing). For videos with the same frequency order them alphabetically from least to greatest.



Example 1:



Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 1
Output: ["B","C"]
Explanation:
You have id = 0 (green color in the figure) and your friends are (yellow color in the figure):
Person with id = 1 -> watchedVideos = ["C"]
Person with id = 2 -> watchedVideos = ["B","C"]
The frequencies of watchedVideos by your friends are:
B -> 1
C -> 2
Example 2:



Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 2
Output: ["D"]
Explanation:
You have id = 0 (green color in the figure) and the only friend of your friends is the person with id = 3 (yellow color in the figure).


Constraints:

n == watchedVideos.length == friends.length
2 <= n <= 100
1 <= watchedVideos[i].length <= 100
1 <= watchedVideos[i][j].length <= 8
0 <= friends[i].length < n
0 <= friends[i][j] < n
0 <= id < n
1 <= level < n
if friends[i] contains j, then friends[j] contains i
*/

var watchedVideosByFriends = function (watchedVideos, friends, id, level) {
  const visited = new Array(friends.length).fill(false);
  visited[id] = true;

  const queue = [id];

  let currLevel = 0;

  while (queue.length) {
    currLevel += 1;
    for (let end = queue.length - 1; end >= 0; end -= 1) {
      const curr = queue.shift();

      for (let friend of friends[curr]) {
        if (visited[friend]) continue;

        visited[friend] = true;
        queue.push(friend);
      }
    }
    if(currLevel === level) break;
  }

  const watchedFreq = queue.reduce((freq, id) => {
    for(let video of watchedVideos[id]) {
      freq[video] = freq[video] + 1 || 1;
    }
    return freq;
  }, {});

  return Object.entries(watchedFreq)
    .sort((a, b) => {
      const [titleA, countA] = a;
      const [titleB, countB] = b;
      if (countA !== countB) return countA - countB;
      return titleA < titleB ? -1 : 1;
    })
    .map((entry) => entry[0]);
};


const tests = [
  [
    [["A", "B"], ["C"], ["B", "C"], ["D"]],
    [[1, 2], [0, 3], [0, 3], [1, 2]],
    0,
    1
  ],
  [
    [["A", "B"], ["C"], ["B", "C"], ["D"]],
    [[1, 2], [0, 3], [0, 3], [1, 2]],
    0,
    2
  ],
  [
    [["A", "B"], ["B"], ["B", "B"], ["D"], ["D"], ["B", "E"], ["A", "B", "D"],
    ["A", "B", "C"], ["A", "B", "C"], ["A", "C", "D"]],
    [[1, 2, 3], [0, 4, 5], [0], [0, 6], [1], [1], [3, 7, 8, 9], [6], [6], [6]],
    0,
    3
  ]
];

/*
            0
        1   2   3
      4   5     6
              7   8   9
*/

for (let test of tests) {
  logOutList(watchedVideosByFriends(...test))
}