/*
Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers (h, k), where h is the height of the person and k is the number of people in front of this person who have a height greater than or equal to h. Write an algorithm to reconstruct the queue.

Note:
The number of people is less than 1,100.


Example

Input:
[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

Output:
[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
*/


// makes more sense to me
var reconstructQueue = function (people) {
  people.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  const reconstructed = new Array(people.length).fill(null);

  for (let person of people) {
    const [_, numInFrontOf] = person;
    const index = getNthBlank(reconstructed, numInFrontOf);
    reconstructed[index] = person;
  }

  return reconstructed;
};

const getNthBlank = (arr, num) => {
  let count = 0;
  let i = -1;
  while (count <= num) {
    i += 1;
    count += !arr[i];
  }
  return i;
}

// faster
var reconstructQueue = function (people) {
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]);

  const reconstructed = [];

  for (let person of people) reconstructed.splice(person[1], 0, person);

  return reconstructed;
};

const tests = [
  [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]],
];

for (let test of tests) {
  logOutList(printGrid(reconstructQueue(test)))
}