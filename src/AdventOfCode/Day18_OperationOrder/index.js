const fs = require('fs');

const getNextPosition = (expression, pos) => {
  let i = pos;
  let leftCount = 0;
  let rightCount = 0;
  while (i < expression.length) {
    if (expression[i] === '(') leftCount += 1;
    if (expression[i] === ')') rightCount += 1;
    if (leftCount === rightCount) return i;
    i += 1;
  }

  return i;
}

const calculateExpression = (expression, pos, operators) => {
  let currCalc;
  let currOp;

  for (let i = pos; i < expression.length; i += 1) {

    const val = expression[i];
    if (val === ' ') continue;
    if (val === '(') {
      const currRes = calculateExpression(expression, i + 1, operators);
      currCalc = currOp ? operators[currOp](currCalc, currRes) : currRes;
      i = getNextPosition(expression, i);
    } else if (val === ')') {
      return currCalc;
    } else if (val in operators) {
      currOp = val;
    } else {
      currCalc = currOp ? operators[currOp](currCalc, val) : val;
    }
  }

  return currCalc;
}

const sumExpressions = (expressions) => {
  const operators = {
    '+': (a, b) => BigInt(a) + BigInt(b),
    '*': (a, b) => BigInt(a) * BigInt(b),
  };
  return expressions.reduce((sum, expression) =>
    sum + calculateExpression(expression, 0, operators), BigInt(0));
}

const convertToPostFix = (expression) => {
  const precedence = { '+': 2, '*': 1, '(': 0 }
  const vals = expression.split('').filter((val) => val !== ' ');
  const opStack = []
  const postFix = [];

  for (let val of vals) {
    if (val === '(') {
      opStack.push(val);
    } else if (val === ')') {
      let next = opStack.pop();
      while (next !== '(') {
        postFix.push(next);
        next = opStack.pop();
      }
    } else if (val in precedence) {
      while (
        opStack.length
        && precedence[opStack[opStack.length - 1]] >= precedence[val]
      ) {
        postFix.push(opStack.pop());
      }
      opStack.push(val);
    } else {
      postFix.push(BigInt(val));
    }
  }

  while (opStack.length) postFix.push(opStack.pop());

  return postFix;
}

const calculatePostFixExpression = (expression, operators) => {
  const res = [];
  for (let val of expression) {
    if (val in operators) {
      const b = res.pop();
      const a = res.pop();
      res.push(operators[val](a, b));
    } else {
      res.push(val);
    }
  }
  return res.pop();
}

const sumExpressionsWithPrecedence = (expressions) => {
  const operators = {
    '+': (a, b) => BigInt(a) + BigInt(b),
    '*': (a, b) => BigInt(a) * BigInt(b),
  };
  const postFixExpressions = expressions.map((expression) =>
    convertToPostFix(expression),
  );
  return postFixExpressions.reduce((sum, expression) =>
    sum + calculatePostFixExpression(expression, operators), BigInt(0));
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(sumExpressionsWithPrecedence(parsed));
});

/*

*/