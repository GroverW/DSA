/*
You are given a (0-indexed) array of positive integers candiesCount where candiesCount[i] represents the number of candies of the ith type you have. You are also given a 2D array queries where queries[i] = [favoriteTypei, favoriteDayi, dailyCapi].

You play a game with the following rules:

You start eating candies on day 0.
You cannot eat any candy of type i unless you have eaten all candies of type i - 1.
You must eat at least one candy per day until you have eaten all the candies.
Construct a boolean array answer such that answer.length == queries.length and answer[i] is true if you can eat a candy of type favoriteTypei on day favoriteDayi without eating more than dailyCapi candies on any day, and false otherwise. Note that you can eat different types of candy on the same day, provided that you follow rule 2.

Return the constructed array answer.

 

Example 1:

Input: candiesCount = [7,4,5,3,8], queries = [[0,2,2],[4,2,4],[2,13,1000000000]]
Output: [true,false,true]
Explanation:
1- If you eat 2 candies (type 0) on day 0 and 2 candies (type 0) on day 1, you will eat a candy of type 0 on day 2.
2- You can eat at most 4 candies each day.
   If you eat 4 candies every day, you will eat 4 candies (type 0) on day 0 and 4 candies (type 0 and type 1) on day 1.
   On day 2, you can only eat 4 candies (type 1 and type 2), so you cannot eat a candy of type 4 on day 2.
3- If you eat 1 candy each day, you will eat a candy of type 2 on day 13.
Example 2:

Input: candiesCount = [5,2,6,4,1], queries = [[3,1,2],[4,10,3],[3,10,100],[4,100,30],[1,3,1]]
Output: [false,true,true,false,false]
 

Constraints:

1 <= candiesCount.length <= 105
1 <= candiesCount[i] <= 105
1 <= queries.length <= 105
queries[i].length == 3
0 <= favoriteTypei < candiesCount.length
0 <= favoriteDayi <= 109
1 <= dailyCapi <= 109
*/

var canEat = function(candiesCount, queries) {
  const totalCandies = [];
  let cumulativeSum = 0;
  
  for (let count of candiesCount) {
    totalCandies.push(cumulativeSum + count);
    cumulativeSum += count;
  }
  
  return queries.map(([type, day, cap]) => {
    const latestDay = totalCandies[type] - 1;
    const earliestDay = Math.floor((totalCandies[type-1] || 0) / cap);
    return day >= earliestDay && day <= latestDay;
  })
};

const tests: Indexable<any>[] = [
  [[10,11,42,42,49,14,44,33,13,49,32,19,48,36,25,38,32,45,30,21,13,45,39,12,12,25,26,18,35,28,1,31,14,16,38,49,26,33,39,39,7,31,20,8,49,36,6,1,32,2,35,10,31,37,13,43,26],
  [[24,579,17],[13,275,40],[38,432,75],[47,62,4],[14,908,33],[19,1031,77],[18,316,71],[54,1558,48],[35,1403,19],[10,449,58],[0,1258,94],[41,1014,59],[33,932,15],[18,1488,46],[51,630,89],[7,362,4],[1,14,3],[0,1029,3],[2,1454,63],[52,19,44],[7,418,18],[42,1505,12],[49,1188,92],[15,1116,76],[47,668,40],[50,468,7],[49,167,8],[51,316,94],[27,1270,58],[1,158,66],[25,979,28],[11,837,84],[27,1311,80],[16,1148,77],[51,1538,34],[19,120,70],[8,1508,7],[24,1464,93],[1,1448,44],[45,331,12],[17,111,4],[6,332,19],[53,1368,98],[23,609,85],[11,1364,69],[54,1066,32],[8,1566,30],[40,1331,21],[16,1478,23],[34,133,65],[17,1484,9],[37,1150,65],[13,885,69],[54,191,46],[21,105,22],[1,37,75],[35,479,79],[37,905,89],[49,551,74],[16,986,26],[21,1325,34],[41,1520,67],[40,611,69],[7,997,22],[32,1108,39],[2,1549,59],[35,553,71],[28,729,93],[15,357,11],[43,566,90],[18,1213,87],[23,10,100],[8,423,18],[19,1270,59],[15,413,64],[44,765,76],[5,17,97],[42,1228,10],[27,1236,44],[5,411,46],[54,458,93],[27,1148,33],[20,429,85],[12,315,88],[56,446,26]]]
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(printRow(canEat(test[0], test[1])));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/
