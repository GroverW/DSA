/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
*/

var generateParenthesis = function (n) {
  const combinations = [];

  const search = (currStr, numOpen, numClosed) => {
    if (currStr.length === n * 2) {
      combinations.push(currStr);
      return;
    }

    if (numOpen < n) search(currStr + '(', numOpen + 1, numClosed);
    if (numOpen > numClosed) search(currStr + ')', numOpen, numClosed + 1);
  }

  search('(', 1, 0);

  return combinations;
};