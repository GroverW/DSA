/*
The frequency of an element is the number of times it occurs in an array.

You are given an integer array nums and an integer k. In one operation, you can choose an index of nums and increment the element at that index by 1.

Return the maximum possible frequency of an element after performing at most k operations.

 

Example 1:

Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make nums = [4,4,4].
4 has a frequency of 3.
Example 2:

Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: There are multiple optimal solutions:
- Increment the first element three times to make nums = [4,4,8,13]. 4 has a frequency of 2.
- Increment the second element four times to make nums = [1,8,8,13]. 8 has a frequency of 2.
- Increment the third element five times to make nums = [1,4,13,13]. 13 has a frequency of 2.
Example 3:

Input: nums = [3,9,6], k = 2
Output: 1
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
1 <= k <= 105
*/

var maxFrequency = function(nums, k) {
  nums.sort((a, b) => a - b);
  
  let start = 0;
  let remain = k;
  let best = 1;

  for (let i = 1; i < nums.length; i += 1) {
    remain -= (nums[i] - nums[i - 1]) * (i - start);
    
    while (remain < 0) {
      remain += nums[i] - nums[start];
      start += 1;
    }
    
    best = Math.max(best, i - start + 1);
  }
  
  return best;
};


/*

*/

// const maxLen = 1000;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);

//   const nums = new Array(len).fill(0).map(() => numberBetween(1, 50));
//   const totalDiff = [...nums]
//     .sort((a, b) => a - b)
//     .reduce((sum, v, i, a) => sum + (v - (a[i - 1] || 0)), 0);
//   const k = numberBetween(1, Math.floor(totalDiff / 2));



//   // logOutList('"' + letters + '"')
//   // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
//   // logOutList(printRow(processes));
//   // logOutList(printRow([nums1, nums2]) + ',');
//   logOutLeetcode([nums, k])
// }

const tests: Indexable<any>[] = [
  [
    [47, 27, 11, 17, 23, 25, 29, 41, 20, 27, 2, 27, 38, 47, 47, 46, 2, 39, 25, 20, 11, 36, 34, 36, 50, 39, 48, 28, 17, 2, 21, 36, 45, 19, 38, 44, 43, 26, 24, 41, 46, 24, 9, 45, 45, 28, 40, 7, 44, 20, 37, 34, 17, 26, 7, 43, 25, 29, 12, 31, 2, 29, 1, 46, 47, 26, 24, 26, 24, 50, 11, 21, 45, 17, 41, 4, 26, 38, 32, 31, 50, 16, 25, 39, 32, 26, 13, 7, 15, 29, 14, 29, 2, 5, 14, 27, 38, 19, 1, 33, 21, 46, 1, 17, 21, 45, 33, 34, 28, 34, 16, 3, 9, 29, 35, 32, 41, 18, 31, 3, 49, 30, 48, 26, 44, 9, 20, 24, 32, 39, 8, 36, 24, 4, 14, 28, 1, 42, 25, 17, 39, 44, 46, 30, 46, 3, 10, 11, 4, 24, 33, 46, 32, 45, 39, 37, 28, 43, 7, 6, 40, 30, 32, 4, 42, 22, 47, 46, 37, 15, 48, 37, 21, 34, 9, 35, 24, 47, 47, 37, 19, 43, 25, 1, 41, 35, 15, 40, 40, 40, 45, 10, 11, 23, 50, 10, 30, 29, 43, 44, 26, 33, 33, 19, 21, 46, 38, 23, 33, 18, 40, 13, 28, 33, 10, 22, 41, 6, 21, 27, 4, 9, 46, 2, 31, 28, 35, 24, 35, 28, 50, 19, 15, 7, 17, 47, 45, 33, 50, 49, 22, 16, 5, 45, 30, 41, 14, 15, 31, 13, 23, 50, 16, 31, 33, 29, 35, 29, 15, 27, 8, 47, 29, 47, 38, 2, 29, 31, 27, 11, 30, 7, 4, 25, 14, 20, 50, 50, 13, 40, 29, 27, 39, 5, 32, 10, 6, 27, 29, 29, 3, 16, 49, 6, 48, 30, 14, 21, 50, 44, 37, 36, 29, 6, 50, 19, 40, 41, 44, 47, 19, 25, 30, 5, 25, 17, 20, 43, 15, 43, 17, 21, 18, 9, 48, 27, 40, 13, 23, 19, 47, 12, 21, 6, 32, 30, 12, 17, 39, 3, 47, 18, 1, 42, 31, 21, 10, 18, 20, 14, 46, 2, 15, 33, 5, 18, 16, 1, 17, 12, 9, 27, 32, 16, 42, 20, 22, 34, 32, 29, 1, 22, 50, 38, 38, 36, 44, 34, 7, 30, 11, 29, 8, 13, 9, 20, 18, 37, 9, 20, 38, 3, 16, 17, 15, 43, 29, 47, 15, 11, 30, 41, 9, 13, 4, 1, 40, 26, 11, 14, 50, 50, 18, 13, 32, 33, 42, 10, 34, 25, 34, 18, 22, 30, 37, 47, 15, 25, 48, 29, 20, 18, 40, 39, 50, 13, 36, 13, 27, 7, 47, 44, 25, 27, 37, 48, 22, 33, 9, 19, 9, 45, 29, 22, 18, 5, 4, 38, 22, 7, 49, 27, 29, 35, 34, 47, 29, 35, 47, 29, 3, 4, 43, 17, 41, 16, 17, 23, 23, 11, 49, 25, 47, 6, 25, 22, 27, 1, 19, 41, 47, 8, 42, 42, 23, 35, 26, 38, 6, 9, 10, 22, 45, 44, 42, 32, 18, 13, 36, 6, 38, 24, 34, 29, 32, 26, 33, 32, 33, 18, 13, 46, 21, 15, 48, 1, 31, 31, 43, 26, 5, 24, 18, 26, 13, 19, 43, 17, 37, 30, 44, 41, 34, 1, 20, 7, 15, 47, 20, 3, 50, 21, 26, 17, 47, 38, 29, 49, 35, 32, 22, 39, 18, 48, 36, 50, 6, 49, 47, 32, 25, 9, 6, 45, 1, 41, 13, 44, 14, 36, 21, 29, 48, 47, 28, 38, 1, 7, 35, 48, 28, 41, 29, 39, 7, 38, 16, 3, 11, 10, 46, 45, 10, 43, 8, 10, 36, 49, 20, 40, 36, 32, 10, 18, 5, 19, 29, 6, 3, 30, 27, 2, 48, 28, 6, 8, 11, 2, 37, 9, 39, 15, 1, 13, 5, 48, 44, 45, 44, 11, 18, 47, 46, 13, 49, 26, 34, 9, 19, 2, 50, 21, 32, 40, 42, 36, 37, 18, 16, 47, 28, 34, 49, 1, 36, 42, 14, 19, 26, 46, 2, 6, 48, 10, 39, 8, 44, 47, 29, 20, 21, 22, 34, 44, 13, 21, 21, 36, 10, 29, 31, 6, 49, 43, 35, 17, 17, 44, 33, 40, 22, 43, 29, 50, 21, 36, 39, 26, 32, 26, 29, 29, 17, 10, 27, 10, 43, 2, 24, 8, 7, 30, 24, 20, 36, 50, 31, 45, 29, 35, 14, 46, 23, 7, 26, 4, 32, 31, 40, 21, 23, 18, 16, 48, 29, 7, 38, 15, 32, 6, 49, 9, 50, 43, 25, 39, 27, 40, 34, 26, 6, 47, 47, 14, 14, 42, 50, 31, 21, 1, 48, 48, 18, 19, 13, 18, 26, 31, 3, 49, 49, 50, 26, 5, 1, 47, 8, 36, 22, 44, 42, 26, 32, 8, 5, 18, 39, 35, 38, 22, 29, 41, 1, 1, 13, 11, 19, 22, 6, 50, 32, 29, 23, 8, 24, 21, 34, 2, 17, 7, 37, 37, 44, 4, 4, 49, 42, 22, 48, 18, 6, 33, 2, 12, 38, 19, 50, 45, 8, 26, 4, 46, 5, 10, 47, 6, 18, 40, 49, 13, 20, 34, 12, 16, 9, 43, 44, 35, 45, 29, 16, 36, 9, 31, 20, 23, 2, 8, 29, 47, 30, 31, 1, 4, 22, 11, 31, 4, 45, 34, 20, 27, 1, 33, 11, 22, 19, 40, 14, 10, 23, 23, 27, 21, 5, 20, 49, 13, 19, 27, 33, 12, 16, 49, 34, 22, 12, 1, 24, 18, 38, 26, 47, 3, 46, 42, 31, 23, 34, 6, 17, 18, 26, 25, 46, 19, 24, 39, 4, 8, 31, 35, 7, 11, 14, 4, 19, 18, 39, 17, 21, 2, 33, 12, 34, 40, 47, 43, 16, 30, 42, 36, 50, 14, 35, 10, 28, 14, 39, 19, 34],
    17,
  ],
  [
    [15, 15, 24, 36, 46, 9, 21, 17, 28, 45, 4, 42, 32, 36, 30, 14, 15, 36, 2, 9, 20, 8, 42, 42],
    19,
  ]
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(maxFrequency(test[0], test[1]));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/