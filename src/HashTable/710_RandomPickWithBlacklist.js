/*
Given a blacklist B containing unique integers from [0, N), write a function to return a uniform random integer from [0, N) which is NOT in B.

Optimize it such that it minimizes the call to system’s Math.random().

Note:

1 <= N <= 1000000000
0 <= B.length < min(100000, N)
[0, N) does NOT include N. See interval notation.
Example 1:

Input: 
["Solution","pick","pick","pick"]
[[1,[]],[],[],[]]
Output: [null,0,0,0]
Example 2:

Input: 
["Solution","pick","pick","pick"]
[[2,[]],[],[],[]]
Output: [null,1,1,1]
Example 3:

Input: 
["Solution","pick","pick","pick"]
[[3,[1]],[],[],[]]
Output: [null,0,0,2]
Example 4:

Input: 
["Solution","pick","pick","pick"]
[[4,[2]],[],[],[]]
Output: [null,1,3,1]
Explanation of Input Syntax:

The input is two lists: the subroutines called and their arguments. Solution's constructor has two arguments, N and the blacklist B. pick has no arguments. Arguments are always wrapped with a list, even if there aren't any.
*/

var Solution = function (N, blacklist) {
  this.blacklistLookup = new Set(blacklist);
  this.lookup = new Map();
  this.max = N - blacklist.length;
  this.createLookup();
};

Solution.prototype.createLookup = function (N) {
  let nextAvailable = N - 1
  this.blacklistLookup.forEach((num) => {
    if (num >= this.max) return;

    while (this.blacklistLookup.has(nextAvailable)) {
      nextAvailable -= 1;
    }
    this.lookup.set(num, nextAvailable);
    nextAvailable -= 1;
  })
}

Solution.prototype.pick = function () {
  const choice = Math.floor(Math.random() * this.max);
  return this.lookup.has(choice) ? this.lookup.get(choice) : choice;
};

 const maxLen = 100;

 for (let i = 0; i < 200; i += 1) {
   const len = numberBetween(1, maxLen);
   const numPicks = numberBetween(1, maxLen);
   const blacklistLen = numberBetween(0, len - 1)
 
   const options = randomize(new Array(len).fill(0).map((_, i) => i))
 
   const blacklist = options.slice(0, blacklistLen);
 
   const commands = ["Solution", ...new Array(numPicks).fill('pick')];
   const actions = [[len, blacklist], ...new Array(numPicks).fill([])];
 
   // logOutList('"' + instructions + '"')
   // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
   // logOutList(printRow(customers));
   // logOutList(printRow([nums1, nums2]) + ',');
   logOutLeetcode([commands, actions])
 }
 
 
 
 const tests: Indexable<any>[] = [
   // [[773160767], 252264991],
   // [[2, 8, 4, 10, 6], 20]
   [
     ["Solution", "pick", "pick", "pick"],
     [[9, [6, 8]], [], [], []],
   ]
 ];
 
 
 
 let i: number = 0;
 for (let test of tests) {
   const [commands, actions] = test;
   const solution = new Solution(...actions[0]);
   console.time(i.toString());
   for (let i = 1; i < commands.length; i += 1) {
     logOutList(solution.pick())
   }
   // logOutLeetcode(test);
   console.timeEnd(i.toString());
   i += 1;
 
 }