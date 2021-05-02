/*
There is a hotel with n rooms. The rooms are represented by a 2D integer array rooms where rooms[i] = [roomIdi, sizei] denotes that there is a room with room number roomIdi and size equal to sizei. Each roomIdi is guaranteed to be unique.

You are also given k queries in a 2D array queries where queries[j] = [preferredj, minSizej]. The answer to the jth query is the room number id of a room such that:

The room has a size of at least minSizej, and
abs(id - preferredj) is minimized, where abs(x) is the absolute value of x.
If there is a tie in the absolute difference, then use the room with the smallest such id. If there is no such room, the answer is -1.

Return an array answer of length k where answer[j] contains the answer to the jth query.

 

Example 1:

Input: rooms = [[2,2],[1,2],[3,2]], queries = [[3,1],[3,3],[5,2]]
Output: [3,-1,3]
Explanation: The answers to the queries are as follows:
Query = [3,1]: Room number 3 is the closest as abs(3 - 3) = 0, and its size of 2 is at least 1. The answer is 3.
Query = [3,3]: There are no rooms with a size of at least 3, so the answer is -1.
Query = [5,2]: Room number 3 is the closest as abs(3 - 5) = 2, and its size of 2 is at least 2. The answer is 3.
Example 2:

Input: rooms = [[1,4],[2,3],[3,5],[4,1],[5,2]], queries = [[2,3],[2,4],[2,5]]
Output: [2,1,3]
Explanation: The answers to the queries are as follows:
Query = [2,3]: Room number 2 is the closest as abs(2 - 2) = 0, and its size of 3 is at least 3. The answer is 2.
Query = [2,4]: Room numbers 1 and 3 both have sizes of at least 4. The answer is 1 since it is smaller.
Query = [2,5]: Room number 3 is the only room with a size of at least 5. The answer is 3.
 

Constraints:

n == rooms.length
1 <= n <= 105
k == queries.length
1 <= k <= 104
1 <= roomIdi, preferredj <= 107
1 <= sizei, minSizej <= 107

POST: https://leetcode.com/problems/closest-room/discuss/1188280/JavaScript-Binary-Search-Tree
*/

var closestRoom = function (rooms, queries) {
  rooms.sort((a, b) => b[1] - a[1]);
  const byRoomSize = queries
    .map((_, i) => i)
    .sort((a, b) => queries[b][1] - queries[a][1]);

  const closest = new Array(queries.length).fill(-1);
  const binarySearchTree = new BinarySearchTree();
  let currentRoom = 0;

  byRoomSize.forEach((query) => {
    const [preferredRoom, minimumSize] = queries[query];
    if (rooms[0][1] < minimumSize) {
      return;
    }

    while (currentRoom < rooms.length && rooms[currentRoom][1] >= minimumSize) {
      binarySearchTree.add(rooms[currentRoom][0]);
      currentRoom += 1;
    }

    closest[query] = binarySearchTree.search(preferredRoom);
  });

  return closest;
};

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(room) {
    this.root = this.insert(this.root, room);
  }

  insert(node = this.root, room) {
    if (!node) return new TreeNode(room);

    if (node.room < room) {
      node.right = this.insert(node.right, room);
    } else {
      node.left = this.insert(node.left, room);
    }

    return node;
  }

  search(room, node = this.root) {
    if (node.room === room) return room;

    const currentDistance = Math.abs(node.room - room);
    const nextChild = node.room < room ? node.right : node.left;

    if (!nextChild) return node.room;

    const closestChild = this.search(room, nextChild);
    const childDistance = Math.abs(closestChild - room);

    if (childDistance < currentDistance) return closestChild;
    if (childDistance === currentDistance) return Math.min(closestChild, node.room);
    return node.room;
  }
}

class TreeNode {
  constructor(room) {
    this.room = room;
    this.left = null;
    this.right = null;
  }
}


/*

*/

const maxLen = 200;

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  const numQueries = numberBetween(1, maxLen);

  const rooms = new Array(len).fill(0)
    .map((_, room) => [room + 1, numberBetween(1, 50)]);

  const roomsScrambled = randomize(rooms);

  const queries = new Array(numQueries).fill(0)
    .map(() => [numberBetween(1, len), numberBetween(1, 60)]);

  // logOutList('"' + s + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow(nums));
  // logOutList(printRow([nums1, nums2]) + ',');
  logOutLeetcode([roomsScrambled, queries])
}