/*
Given a positive integer, return its corresponding column title as appear in an Excel sheet.

For example:

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB 
    ...
Example 1:

Input: 1
Output: "A"
Example 2:

Input: 28
Output: "AB"
Example 3:

Input: 701
Output: "ZY"
*/

var convertToTitle = function (n) {
  const headings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let columnTitle = [];
  let fromDecimalRemaining = n;

  while (fromDecimalRemaining) {
    fromDecimalRemaining -= 1;
    const headingIdx = fromDecimalRemaining % 26;
    columnTitle.push(headings[headingIdx]);
    fromDecimalRemaining = Math.floor(fromDecimalRemaining / 26);
  }

  return columnTitle.reverse().join('');
};

const tests = [
  1,
  28,
  701,
  702,
  700,
  18252,
  18253,
  18254,
  18255,
  18256,
  18257,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  3728273,
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(convertToTitle(test));
  // logOutList(printRow(braceExpansionII(test)) + ',');
  // logOutList(printRow(intersectionSizeTwo(test)));
  console.timeEnd(i);
  i += 1;
}

/*
1
28
701
702
700
18252
18253
18254
18255
18256
18257
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
3728273
*/