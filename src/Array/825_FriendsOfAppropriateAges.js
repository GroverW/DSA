/*
Some people will make friend requests. The list of their ages is given and ages[i] is the age of the ith person. 

Person A will NOT friend request person B (B != A) if any of the following conditions are true:

age[B] <= 0.5 * age[A] + 7
age[B] > age[A]
age[B] > 100 && age[A] < 100
Otherwise, A will friend request B.

Note that if A requests B, B does not necessarily request A.  Also, people will not friend request themselves.

How many total friend requests are made?

Example 1:

Input: [16,16]
Output: 2
Explanation: 2 people friend request each other.
Example 2:

Input: [16,17,18]
Output: 2
Explanation: Friend requests are made 17 -> 16, 18 -> 17.
Example 3:

Input: [20,30,100,110,120]
Output: 3
Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.
 

Notes:

1 <= ages.length <= 20000.
1 <= ages[i] <= 120.
*/

var numFriendRequests = function (ages) {
  const ageGroups = ages.reduce((groups, age) => {
    groups[age] += 1;
    return groups;
  }, new Array(121).fill(0));

  let start = 0;
  let totalWithinRange = 0;
  let totalRequests = 0;

  for (let age = 0; age < ageGroups.length; age += 1) {
    const groupSize = ageGroups[age];
    const minAgeInRange = age / 2 + 7
    
    if (!groupSize || minAgeInRange >= age) {
      totalWithinRange += groupSize;
      continue;
    }
    
    while (start <= minAgeInRange) {
      totalWithinRange -= ageGroups[start];
      start += 1;
    }

    totalRequests += groupSize * totalWithinRange;
    totalRequests += groupSize * (groupSize - 1);
    totalWithinRange += groupSize;
  }

  return totalRequests;
};

/*

*/

const maxLen = 100;

for (let i = 0; i < 100; i += 1) {
  const len = numberBetween(1, maxLen);

  const nums = new Array(len).fill(0).map(() => numberBetween(1, 120))

  // logOutList('"' + s.join('') + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  logOutList(printRow(nums));
  // logOutList(printRow([nums1, nums2]) + ',');
  // logOutLeetcode([len, restrictions])
}

const tests: Indexable<any>[] = [
  
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  logOutList(numFriendRequests(test));
  // logOutLeetcode(test);
  console.timeEnd(i.toString());
  i += 1;

}

/*

*/
