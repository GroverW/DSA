/*
Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

 

Example 1:

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
Example 2:

Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
Example 3:

Input: s = ""
Output: 0
 

Constraints:

0 <= s.length <= 3 * 104
s[i] is '(', or ')'.
*/

// with stack
var longestValidParentheses = function (s) {
  let maxLen = 0;
  const stack = [];

  for (let paren of s) {
    if (paren === '(') {
      stack.push(0)
    } else if (stack.length) {
      let lastLen = 0;
      
      while (stack.length && stack[stack.length - 1]) lastLen += stack.pop();

      if (stack.length && !stack[stack.length - 1]) {
        lastLen += 2;
        stack.pop();
        while (stack.length && stack[stack.length - 1]) lastLen += stack.pop();
        stack.push(lastLen);
        maxLen = Math.max(maxLen, lastLen);
      }
    }
  }

  return maxLen;
};

/*

*/


const maxLen = 100;
for (let i = 0; i < 50; i += 1) {
  const len = Math.floor(Math.random() * maxLen) + 1;

  let str = '';
  const parens = ['(', ')']
  for (let i = 0; i < len; i += 1) {
    const paren = Math.floor(Math.random() * parens.length);
    str += parens[paren];
  }

  logOutList('"' + str + '"')
  // logOutList(printRow(nums) + ',')
  // logOutList(printRow(actions) + '],')
}

const tests = [
  "(()",
  ")()())",
  "(()(()()(()))))",
  "()(()(()()(())))()()())()())))(((((()((()",
  "))()()))(()(()))))))))(()()((()(()(()((()))))(()((()(())())",
  "))(()(())(((())))(",
  "())))))(())(()((()))(()((())))(())))((())((())))))))()(())()()()((()()(()(((()(())(()(())",
  ")())())(((()()()()(((())(()()(()))(",
  "(())()()))()()((((()(()(()()))()(((()((())(((()()())))((())()(())()((((()(()())())(((()))))(()(((",
  ")()(()(())))()()(())()(())(())(()()()(())(()))((()))())))()()()((()(()()))(()(()))(((()(())(()))(()",
  "()(()()(((((())))))))((()(()(()()()))(())))()(((((()())))))())()()))(()(())(()((",
  ")(((",
  "()()(((()((())))(()()))()(()((((((()(()()((()))()(()()()())(((()",
  ")()()))(())))))(()(",
  "()(()()())()))()(((((())())))))()",
  "()((()()())))))()()))))((())((())()(",
  ")(())()(((()(())()(()()()((()((()())((())())(())))((()(()(",
  "()((())",
  "((((((()())()((())((()())()())()()((((((()(()()))(()((()((()(((()(()()(())))()((())()))",
  "(((())(((((())(((((()(())(()()))))())((()(()(((())((",
  "(())()()(()))())",
  "()(((()((())((()((())()))))()(()))()(()()))))))))(((()((()))))(()((()))))(((()(())()))))((((()(",
  "()()()((()))()())))()())()()((",
  "())))()((()((()()()()()(()((()())()())()(()()))()())())()((()()(()(",
  ")()(((()(((()()))(()()(())(()))())))()()((()(()((",
  "()))())(()()())(((()())())())))((()(((()(())()((())))(())()(((((()((()()()",
  "))(())()(((()))())(()()())))(())))()(())(()))))())",
  "()())()(()(()))",
  ")(()()((()))))(())))))()((()()))(())((())(",
  "(()))((((()((())(((())()(()))(()(())()))(()())))(((()(((((()))()()()((((())(())(())))()())))))))(())",
  ")",
  ")(()()()))((()())(((((()())(((()))((",
  "((()()(()(())()))((((()()((())()(((()(()(()))()())(()))))(()()(())))(())(((((())((()()(()((()())",
  "()))(()))()()()((()))))",
  "()()))(()()()(()))(())()()(((())))))((()(())(((",
  "((()(((()()))))))())))))(()())()(()())(())((()()((",
  "((()(())(())()()()()())))))(()))))())(())))))((())))(((()()(()()(",
  "(((",
  ")(())())(())((((()(())))))))())))((((()())()(()(())))((()((()(())())",
  ")))((()())))(())",
  "((()((((())(()))(()()(()(((",
  ")))))()()()))))(",
  ")()())(()()(()))((()()(())()())()()((()())())))(())((()((()))",
  "((())(()((((()(())()))())(()))())()(()()((()())()()(()()))(((",
  "(()((()))))(()(()(())(())(",
  ")()()(((((()))()(((()()",
  ")())())(()())((((()((",
  "))()))))()(((()(((((())())",
  "(()))))((((()((()))()())(()())))))(((()()())(",
  "()))(((((())))())()((()()))(()((()))(())()())()))((((())))()))((((((((()()((((()))())",
  ")(()(()",
  "((((()())()()())()))(())))(((()(()))((())())())()())))())))()))))()()((((())(())())))()))((()(()",
  ")((((((()((()(",
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(longestValidParentheses(test));
  console.timeEnd(i);
  i += 1;
}

/*
"(()"
")()())"
"(()(()()(()))))"
"()(()(()()(())))()()())()())))(((((()((()"
"))()()))(()(()))))))))(()()((()(()(()((()))))(()((()(())())"
"))(()(())(((())))("
"())))))(())(()((()))(()((())))(())))((())((())))))))()(())()()()((()()(()(((()(())(()(())"
")())())(((()()()()(((())(()()(()))("
"(())()()))()()((((()(()(()()))()(((()((())(((()()())))((())()(())()((((()(()())())(((()))))(()((("
")()(()(())))()()(())()(())(())(()()()(())(()))((()))())))()()()((()(()()))(()(()))(((()(())(()))(()"
"()(()()(((((())))))))((()(()(()()()))(())))()(((((()())))))())()()))(()(())(()(("
")((("
"()()(((()((())))(()()))()(()((((((()(()()((()))()(()()()())(((()"
")()()))(())))))(()("
"()(()()())()))()(((((())())))))()"
"()((()()())))))()()))))((())((())()("
")(())()(((()(())()(()()()((()((()())((())())(())))((()(()("
"()((())"
"((((((()())()((())((()())()())()()((((((()(()()))(()((()((()(((()(()()(())))()((())()))"
"(((())(((((())(((((()(())(()()))))())((()(()(((())(("
"(())()()(()))())"
"()(((()((())((()((())()))))()(()))()(()()))))))))(((()((()))))(()((()))))(((()(())()))))((((()("
"()()()((()))()())))()())()()(("
"())))()((()((()()()()()(()((()())()())()(()()))()())())()((()()(()("
")()(((()(((()()))(()()(())(()))())))()()((()(()(("
"()))())(()()())(((()())())())))((()(((()(())()((())))(())()(((((()((()()()"
"))(())()(((()))())(()()())))(())))()(())(()))))())"
"()())()(()(()))"
")(()()((()))))(())))))()((()()))(())((())("
"(()))((((()((())(((())()(()))(()(())()))(()())))(((()(((((()))()()()((((())(())(())))()())))))))(())"
")"
")(()()()))((()())(((((()())(((()))(("
"((()()(()(())()))((((()()((())()(((()(()(()))()())(()))))(()()(())))(())(((((())((()()(()((()())"
"()))(()))()()()((()))))"
"()()))(()()()(()))(())()()(((())))))((()(())((("
"((()(((()()))))))())))))(()())()(()())(())((()()(("
"((()(())(())()()()()())))))(()))))())(())))))((())))(((()()(()()("
"((("
")(())())(())((((()(())))))))())))((((()())()(()(())))((()((()(())())"
")))((()())))(())"
"((()((((())(()))(()()(()((("
")))))()()()))))("
")()())(()()(()))((()()(())()())()()((()())())))(())((()((()))"
"((())(()((((()(())()))())(()))())()(()()((()())()()(()()))((("
"(()((()))))(()(()(())(())("
")()()(((((()))()(((()()"
")())())(()())((((()(("
"))()))))()(((()(((((())())"
"(()))))((((()((()))()())(()())))))(((()()())("
"()))(((((())))())()((()()))(()((()))(())()())()))((((())))()))((((((((()()((((()))())"
")(()(()"
"((((()())()()())()))(())))(((()(()))((())())())()())))())))()))))()()((((())(())())))()))((()(()"
")((((((()((()("


*/