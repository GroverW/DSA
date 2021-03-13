import { calculate } from "./String/224_BasicCalculator";

/*
Given a string that contains only digits 0-9 and a target value, return all possibilities to add binary operators (not unary) +, -, or * between the digits so they evaluate to the target value.

Example 1:

Input: num = "123", target = 6
Output: ["1+2+3", "1*2*3"] 
Example 2:

Input: num = "232", target = 8
Output: ["2*3+2", "2+3*2"]
Example 3:

Input: num = "105", target = 5
Output: ["1*0+5","10-5"]
Example 4:

Input: num = "00", target = 0
Output: ["0+0", "0-0", "0*0"]
Example 5:

Input: num = "3456237490", target = 9191
Output: []
 

Constraints:

0 <= num.length <= 10
num only contain digits.
*/

var addOperators = function (num, target) {
  const validStrings = [];
  const findValidStrings = (idx, expression, totals, last) => {
    const lastTotal = totals[totals.length - 1];
    if (idx === num.length) {
      if (lastTotal === target) {
        validStrings.push(expression.join(''));
      }
      return;
    }

    const current = +num[idx];

    expression.push('+', current);
    totals.push(lastTotal + current);
    findValidStrings(idx + 1, expression, totals, '+');
    expression.pop();
    expression.pop();
    totals.pop();

    expression.push('-', current);
    totals.push(lastTotal - current);
    findValidStrings(idx + 1, expression, totals, '-');
    expression.pop();
    expression.pop();
    totals.pop();


    expression.push('*', current);
    const prevTotal = totals[totals.length - 2] || 0;
    const prevDiff = lastTotal - prevTotal;
    totals[totals.length - 1] = prevTotal + prevDiff * current;
    findValidStrings(idx + 1, expression, totals, '*');
    expression.pop();
    expression.pop();
    totals[totals.length - 1] = lastTotal;

    const prevNum = expression[expression.length - 1];
    if (prevNum) {
      const newNum = prevNum * 10 + current;
      expression[expression.length - 1] = newNum;

      let nextTotal = lastTotal;
      if (last === '+') nextTotal = lastTotal - prevNum + newNum;
      else if (last === '-') nextTotal = lastTotal + prevNum - newNum;
      else if (last === '*') nextTotal = prevTotal + (prevDiff / prevNum) * newNum;
      else nextTotal = newNum;

      totals[totals.length - 1] = nextTotal;
      findValidStrings(idx + 1, expression, totals, last);
      totals[totals.length - 1] = lastTotal;
      expression[expression.length - 1] = prevNum;
    }
  }

  findValidStrings(1, [+num[0]], [+num[0]], '');

  return validStrings;
};

/*

*/

// const maxLen = 10;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);

//   const nums = new Array(len).fill(0).map(() => numberBetween(0, 9));

//   const operators = ['-', '+', '*', '|'];
//   const expression = [nums[0]];
//   for (let i = 1; i < nums.length; i += 1) {
//     const operator = randomOption(operators);
//     if (operator === '|') {
//       expression[expression.length - 1] += nums[i];
//     } else {
//       expression.push(operator, nums[i]);
//     }
//   }

//   const num = nums.join('');
//   const solution = calculate(expression.join(''));

//   // logOutList('"' + parenString + '",')
//   logOutList(printRow([num, solution]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   // logOutList(numberBetween(1, 100) + ',');
//   // logOutList(printRow(rotated) + ',')
// }

const tests = [
  ["123", 6],
  ["232", 8],
  ["105", 5],
  ["00", 0],
  ["3456237490", 9191],
  ["5", 5],
  ["8903961744", 244],
  ["19639373", 31],
  ["94", 13],
  ["629974875", 35],
  ["2060784", 6],
  ["16254", -20],
  ["0", 0],
  ["3071", 3],
  ["97", 2],
  ["9956237989", 134],
  ["6", 6],
  ["3", 3],
  ["416315167", 52],
  ["5997792", 2264],
  ["56237", 12],
  ["986", 23],
  ["891", 16],
  ["816", 15],
  ["073", 0],
  ["58057779", -26],
  ["8963323", -14],
  ["30283", -6],
  ["77279", 32],
  ["7554935805", -42],
  ["1785661", -77],
  ["5", 5],
  ["9704049275", 14],
  ["637310", -19],
  ["8104", 9],
  ["3000637381", 18],
  ["625853", 137],
  ["1426", 16],
  ["97673842", -109],
  ["253215310", 256],
  ["2976704", -55],
  ["1833", -7],
  ["0514", 25],
  ["133", 9],
  ["5803", 16],
  ["5808594336", -16],
  ["132206063", 18],
  ["4903", 10],
  ["735379", -20],
  ["83", 5],
  ["2633935", 34],
  ["9269222", -13],
  ["0", 0],
  ["8", 8],
  ["99621", 3],
];



let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(printRow(addOperators(...test)));
  console.timeEnd(i);
  i += 1;
}

/*
"123"
6
"232"
8
"105"
5
"00"
0
"3456237490"
9191
"5"
5
"8903961744"
244
"19639373"
31
"94"
13
"629974875"
35
"2060784"
6
"16254"
20
"0"
0
"3071"
3
"97"
2
"9956237989"
134
"6"
6
"3"
3
"416315167"
52
"5997792"
2264
"56237"
12
"986"
23
"891"
16
"816"
15
"073"
0
"58057779"
26
"8963323"
14
"30283"
6
"77279"
32
"7554935805"
42
"1785661"
77
"5"
5
"9704049275"
14
"637310"
19
"8104"
9
"3000637381"
18
"625853"
137
"1426"
16
"97673842"
109
"253215310"
256
"2976704"
55
"1833"
7
"0514"
25
"133"
9
"5803"
16
"5808594336"
16
"132206063"
18
"4903"
10
"735379"
20
"83"
5
"2633935"
34
"9269222"
13
"0"
0
"8"
8
"99621"
3
*/