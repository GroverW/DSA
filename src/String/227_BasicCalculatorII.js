const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => Math.floor(a / b),
}

const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 }

/**
* @param {string} s
* @return {number}
*/
var calculate = function (s) {
  const polishList = convertToPolish(s);
  return evaluatePolish(polishList);
};

const convertToPolish = (s) => {
  const opStack = [];
  const polishList = [];

  let currVal = '';

  for (let char of s) {
    if (char === ' ') {
      continue;
    } else if (operators[char]) {
      if (currVal.length) {
        polishList.push(+currVal);
        currVal = '';
      }

      while (opStack.length && precedence[opStack[opStack.length - 1]] >= precedence[char]) {
        polishList.push(opStack.pop())
      }
      opStack.push(char);
    } else {
      currVal += char;
    }

  }

  if(currVal.length) polishList.push(+currVal);

  while (opStack.length) {
    polishList.push(opStack.pop());
  }

  return polishList;
}

const evaluatePolish = (polishList) => {
  const evalStack = [];

  for (let val of polishList) {
    if (operators[val]) {
      const b = evalStack.pop();
      const a = evalStack.pop();
      evalStack.push(operators[val](a, b));
    } else {
      evalStack.push(val);
    }
  }

  return evalStack.pop();
}

const tests = [
  "3+2*2",
  "1 + 1",
  " 3/2 ",
  " 3+5 / 2 ",
  " 3+5 * 100 / 144 + 7 / 2 ",
]

for(let test of tests) {
  logOutList(calculate(test))
}