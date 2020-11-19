/*
Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

 

Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/

var permuteUnique = function (nums) {
  const visited = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b);
  const output = [];

  const makeCombinations = (currCombo) => {
    if (currCombo.length === nums.length) {
      output.push([...currCombo]);
      return;
    }
    
    for(let i = 0; i < nums.length; i += 1) {
      if(visited[i]) continue;
      
      currCombo.push(nums[i]);
      visited[i] = true;
      
      makeCombinations(currCombo);
      
      currCombo.pop();
      visited[i] = false;
      
      while(nums[i] === nums[i + 1]) i += 1;
    }
  }

  makeCombinations([]);

  return output;
};

// for (let i = 0; i < 10; i += 1) {
//   const length = Math.floor(Math.random() * 8) + 1;

//   const nums = [];

//   for (let i = 0; i < length; i += 1) {
//     nums.push(Math.floor(Math.random() * 21) - 10)
//   }

//   logOutList(printRow(nums))
// }

const tests = [
  [1, 1, 2],
  [1, 2, 3],
  [4, 1, -3, 10, 1],
  [-6, 7],
  [5, -10, 6, 8, -1, -4, -9, 2],
  [8],
  [1, 1, 0, 7, 5, 0, -10],
  [-3, 4, 7, 6],
  [3, -2],
  [1, -6, 5, -10, -5, -10, 5, -6],
  [-5, -9, 4, 6, -10, -3],
  [5, 10, 6, -6, -4, -3],
];

for (let test of tests) {
  logOutList(printGrid(permuteUnique(test)));
}

/*
[1, 1, 2]
[1, 2, 3]
[4, 1, -3, 10, 1]
[-6, 7]
[5, -10, 6, 8, -1, -4, -9, 2]
[8]
[1, 1, 0, 7, 5, 0, -10]
[-3, 4, 7, 6]
[3, -2]
[1, -6, 5, -10, -5, -10, 5, -6]
[-5, -9, 4, 6, -10, -3]
[5, 10, 6, -6, -4, -3]
*/
