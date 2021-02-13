/*
Given n boxes, each box is given in the format [status, candies, keys, containedBoxes] where:

status[i]: an integer which is 1 if box[i] is open and 0 if box[i] is closed.
candies[i]: an integer representing the number of candies in box[i].
keys[i]: an array contains the indices of the boxes you can open with the key in box[i].
containedBoxes[i]: an array contains the indices of the boxes found in box[i].
You will start with some boxes given in initialBoxes array. You can take all the candies in any open box and you can use the keys in it to open new boxes and you also can use the boxes you find in it.

Return the maximum number of candies you can get following the rules above.

 

Example 1:

Input: status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]], containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
Output: 16
Explanation: You will be initially given box 0. You will find 7 candies in it and boxes 1 and 2. Box 1 is closed and you don't have a key for it so you will open box 2. You will find 4 candies and a key to box 1 in box 2.
In box 1, you will find 5 candies and box 3 but you will not find a key to box 3 so box 3 will remain closed.
Total number of candies collected = 7 + 4 + 5 = 16 candy.
Example 2:

Input: status = [1,0,0,0,0,0], candies = [1,1,1,1,1,1], keys = [[1,2,3,4,5],[],[],[],[],[]], containedBoxes = [[1,2,3,4,5],[],[],[],[],[]], initialBoxes = [0]
Output: 6
Explanation: You have initially box 0. Opening it you can find boxes 1,2,3,4 and 5 and their keys. The total number of candies will be 6.
Example 3:

Input: status = [1,1,1], candies = [100,1,100], keys = [[],[0,2],[]], containedBoxes = [[],[],[]], initialBoxes = [1]
Output: 1
Example 4:

Input: status = [1], candies = [100], keys = [[]], containedBoxes = [[]], initialBoxes = []
Output: 0
Example 5:

Input: status = [1,1,1], candies = [2,3,2], keys = [[],[],[]], containedBoxes = [[],[],[]], initialBoxes = [2,1,0]
Output: 7
 

Constraints:

1 <= status.length <= 1000
status.length == candies.length == keys.length == containedBoxes.length == n
status[i] is 0 or 1.
1 <= candies[i] <= 1000
0 <= keys[i].length <= status.length
0 <= keys[i][j] < status.length
All values in keys[i] are unique.
0 <= containedBoxes[i].length <= status.length
0 <= containedBoxes[i][j] < status.length
All values in containedBoxes[i] are unique.
Each box is contained in one box at most.
0 <= initialBoxes.length <= status.length
0 <= initialBoxes[i] < status.length
*/

var maxCandies = function (status, candies, keys, containedBoxes, initialBoxes) {
  const AVAILABLE = 1;
  const VISITED = 2;
  const boxes = new Set(initialBoxes);

  let foundCandies = 0;
  let foundNewBoxes = true;

  while (foundNewBoxes) {
    foundNewBoxes = false;

    for (let box of boxes) {
      if (!status[box]) continue;

      status[box] = VISITED;

      foundCandies += candies[box];

      for (let containedBox of containedBoxes[box]) {
        if (status[containedBox] < VISITED) {
          boxes.add(containedBox);
          if (!boxes.has(containedBox)) foundNewBoxes = true;
        }
      }
      
      for (let key of keys[box]) {
        if (status[key] < AVAILABLE) {
          status[key] = AVAILABLE;

          if (boxes.has(key)) foundNewBoxes = true;
        }
      }

      boxes.delete(box);
    }
  }

  return foundCandies;
};

const tests = [
  [[1, 0, 1, 0], [7, 5, 4, 100], [[], [], [1], []], [[1, 2], [3], [], []], [0]],
  [[1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], [[1, 2, 3, 4, 5], [], [], [], [], []], [[1, 2, 3, 4, 5], [], [], [], [], []], [0]],
  [[1, 1, 1], [100, 1, 100], [[], [0, 2], []], [[], [], []], [1]],
  [[1], [100], [[]], [[]], []],
  [[1, 1, 1], [2, 3, 2], [[], [], []], [[], [], []], [2, 1, 0]],
  [
    [1,1,0,1,1,0,0,1,0,0,1,1,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,0,0,1,0,0],
    [732,320,543,300,814,568,947,685,142,111,805,233,813,306,55,1,290,944,36,592,150,596,372,299,644,445,605,202,64,807,753,731,552,766,119,862,453,136,43,572,801,518,936,408,515,215,492,738,154],
    [[42,2,24,8,39,16,46],[20,39,46,21,32,31,43,16,12,23,3],[21,14,30,2,11,13,27,37,4,48],[16,17,15,6],[31,14,3,32,35,19,42,43,44,29,25,41],[7,39,2,3,40,28,37,35,43,22,6,23,48,10,21,11],[27,1,37,3,45,32,30,26,16,2,35,19,31,47,5,14],[28,35,23,17,6],[6,39,34,22],[44,29,36,31,40,22,9,11,17,25,1,14,41],[39,37,11,36,17,42,13,12,7,9,43,41],[23,16,32,37],[36,39,21,41],[15,27,5,42],[11,5,18,48,25,47,17,0,41,26,9,29],[18,36,40,35,12,33,11,5,44,14,46,7],[48,22,11,33,14],[44,12,3,31,25,15,18,28,42,43],[36,9,0,42],[1,22,3,24,9,11,43,8,35,5,41,29,40],[15,47,32,28,33,31,4,43],[1,11,6,37,28],[46,20,47,32,26,15,11,40],[33,45,26,40,12,3,16,18,10,28,5],[14,6,4,46,34,9,33,24,30,12,37],[45,24,18,31,32,39,26,27],[29,0,32,15,7,48,36,26,33,31,18,39,23,34,44],[25,16,42,31,41,35,26,10,3,1,4,29],[8,11,5,40,9,18,10,16,26,30,19,2,14,4],[],[0,20,17,47,41,36,23,42,15,13,27],[7,15,44,38,41,42,26,19,5,47],[],[37,22],[21,24,15,48,33,6,39,11],[23,7,3,29,10,40,1,16,6,8,27],[27,29,25,26,46,15,16],[33,40,10,38,13,19,17,23,32,39,7],[35,3,39,18],[47,11,27,23,35,26,43,4,22,38,44,31,1,0],[],[18,43,46,9,15,3,42,31,13,4,12,39,22],[42,45,47,18,26,41,38,9,0,35,8,16,29,36,31],[3,20,29,12,46,41,23,4,9,27],[19,33],[32,18],[17,28,7,35,6,22,4,43],[41,31,20,28,35,32,24,23,0,33,18,39,29,30,16],[43,47,46]],
    [[14],[],[26],[4,47],[],[6],[39,43,46],[30],[],[],[0,3],[],[],[],[],[27],[],[],[],[],[12],[],[],[41],[],[31],[20,29],[13,35],[18],[10,40],[],[38],[],[],[19],[5],[],[],[11],[1],[15],[],[],[],[24],[],[],[],[]],
    [2,7,8,9,16,17,21,22,23,25,28,32,33,34,36,37,42,44,45,48],
  ],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(maxCandies(...test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
[1, 0, 1, 0]
[7, 5, 4, 100]
[[], [], [1], []]
[[1, 2], [3], [], []]
[0]
[1, 0, 0, 0, 0, 0]
[1, 1, 1, 1, 1, 1]
[[1, 2, 3, 4, 5], [], [], [], [], []]
[[1, 2, 3, 4, 5], [], [], [], [], []]
[0]
[1, 1, 1]
[100, 1, 100]
[[], [0, 2], []]
[[], [], []]
[1]
[1]
[100]
[[]]
[[]]
[]
[1, 1, 1]
[2, 3, 2]
[[], [], []]
[[], [], []]
[2, 1, 0]
[1,1,0,1,1,0,0,1,0,0,1,1,0,0,0,0,1,0,1,1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,0,0,1,0,0]
[732,320,543,300,814,568,947,685,142,111,805,233,813,306,55,1,290,944,36,592,150,596,372,299,644,445,605,202,64,807,753,731,552,766,119,862,453,136,43,572,801,518,936,408,515,215,492,738,154]
[[42,2,24,8,39,16,46],[20,39,46,21,32,31,43,16,12,23,3],[21,14,30,2,11,13,27,37,4,48],[16,17,15,6],[31,14,3,32,35,19,42,43,44,29,25,41],[7,39,2,3,40,28,37,35,43,22,6,23,48,10,21,11],[27,1,37,3,45,32,30,26,16,2,35,19,31,47,5,14],[28,35,23,17,6],[6,39,34,22],[44,29,36,31,40,22,9,11,17,25,1,14,41],[39,37,11,36,17,42,13,12,7,9,43,41],[23,16,32,37],[36,39,21,41],[15,27,5,42],[11,5,18,48,25,47,17,0,41,26,9,29],[18,36,40,35,12,33,11,5,44,14,46,7],[48,22,11,33,14],[44,12,3,31,25,15,18,28,42,43],[36,9,0,42],[1,22,3,24,9,11,43,8,35,5,41,29,40],[15,47,32,28,33,31,4,43],[1,11,6,37,28],[46,20,47,32,26,15,11,40],[33,45,26,40,12,3,16,18,10,28,5],[14,6,4,46,34,9,33,24,30,12,37],[45,24,18,31,32,39,26,27],[29,0,32,15,7,48,36,26,33,31,18,39,23,34,44],[25,16,42,31,41,35,26,10,3,1,4,29],[8,11,5,40,9,18,10,16,26,30,19,2,14,4],[],[0,20,17,47,41,36,23,42,15,13,27],[7,15,44,38,41,42,26,19,5,47],[],[37,22],[21,24,15,48,33,6,39,11],[23,7,3,29,10,40,1,16,6,8,27],[27,29,25,26,46,15,16],[33,40,10,38,13,19,17,23,32,39,7],[35,3,39,18],[47,11,27,23,35,26,43,4,22,38,44,31,1,0],[],[18,43,46,9,15,3,42,31,13,4,12,39,22],[42,45,47,18,26,41,38,9,0,35,8,16,29,36,31],[3,20,29,12,46,41,23,4,9,27],[19,33],[32,18],[17,28,7,35,6,22,4,43],[41,31,20,28,35,32,24,23,0,33,18,39,29,30,16],[43,47,46]]
[[14],[],[26],[4,47],[],[6],[39,43,46],[30],[],[],[0,3],[],[],[],[],[27],[],[],[],[],[12],[],[],[41],[],[31],[20,29],[13,35],[18],[10,40],[],[38],[],[],[19],[5],[],[],[11],[1],[15],[],[],[],[24],[],[],[],[]]
[2,7,8,9,16,17,21,22,23,25,28,32,33,34,36,37,42,44,45,48]
*/