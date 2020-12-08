const fs = require('fs');


const getAmount = (amountString) => [amountString[0], +amountString.slice(1)];

const findLoop = (commands) => {
  let acc = 0;

  let current = 0;
  while (commands[current]) {
    const [command, action] = commands[current].split(' ');
    commands[current] = false;

    const [plusMinus, amount] = getAmount(action);
    const posNeg = plusMinus === '+' ? 1 : -1;
    if (command === 'jmp') {
      current += amount * posNeg;
    } else {
      if (command === 'acc') acc += amount * posNeg;
      current += 1;
    }
  }

  return acc;
}

const fixInstruction = (commands) => {
  const visited = new Set();

  let finalAcc = 0;
  
  const findInstruction = (i, acc, isChanged) => {
    if (i >= commands.length) {
      finalAcc = acc;
      return true;
    }
    if (visited[i]) return false;
    visited[i] = true;

    const [command, action] = commands[i].split(' ');
    const [plusMinus, amount] = getAmount(action);
    const posNeg = plusMinus === '+' ? 1 : -1;

    if (command === 'acc') {
      findInstruction(i + 1, acc + amount * posNeg, isChanged);
    } else if (command === 'jmp') {
      if (!isChanged && findInstruction(i + 1, acc, true)) return true;
      if (findInstruction(i + amount * posNeg, acc, isChanged)) return true;
    } else {
      if (!isChanged && findInstruction(i + 1, acc, true)) return true;
      if (findInstruction(i + 1, acc, isChanged)) return true
    }

    visited[i] = false;
    return false;
  }

  findInstruction(0, 0, false);
  return finalAcc;
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(fixInstruction(parsed));
});