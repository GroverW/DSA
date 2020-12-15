const fs = require('fs');

const get2020ThNumberSpoken = (numbers) => {

  const lastSpoken = {};
  for (let i = 0; i < numbers.length; i += 1) {
    lastSpoken[numbers[i]] = i + 1;
  }

  // console.log(lastSpoken)

  let current = numbers[numbers.length - 1];
  let last;
  for (let j = numbers.length + 1; j <= 30000000; j += 1) {
    // console.log(j, {current}, {last}, lastSpoken);?
    last = current;
    if (last in lastSpoken) {
      current = j - 1 - lastSpoken[last];
    } else {
      current = 0;
    }

    lastSpoken[last] = j - 1;
  }
  // console.log({current}, {last}, lastSpoken);
  
  return current;
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split(',');
  // console.log(parsed);
  console.log(get2020ThNumberSpoken(parsed));
});

/*
*/