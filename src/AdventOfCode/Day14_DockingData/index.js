const fs = require('fs');

const getValue = (mask, val) => {
  const res = mask.split('');
  const valBinary = (+val).toString(2);

  let i = 1;
  let curr = 1;
  let total = 0;

  while (i <= res.length) {
    if (i <= valBinary.length) {
      if (res[res.length - i] === 'X') {
        res[res.length - i] = valBinary[valBinary.length - i];
      }
    }

    total += curr * (res[res.length - i] === '1');
    curr *= 2;
    i += 1;
  }

  return total;
}

const sumMemory = (data) => {
  const mem = {};

  let currentMask;
  for (let [action, value] of data) {
    if (action === 'mask') currentMask = value;
    else mem[action] = getValue(currentMask, value);
  }

  return Object.values(mem).reduce((sum, val) => sum + val, 0);
}

const setBits = (mem, address, idx, xBits, val) => {
  if (idx >= xBits.length) {
    mem[address.join('')] = val;
    return;
  }

  const bit = xBits[idx];

  address[address.length - bit] = '1';
  setBits(mem, address, idx + 1, xBits, val);
  address[address.length - bit] = '0';
  setBits(mem, address, idx + 1, xBits, val);
}

const setAddresses = (mem, mask, address, val) => {
  const res = mask.split('');
  const addressBinary = (+address).toString(2);

  let i = 1;

  const xBits = [];
  // console.log(res);

  while (i <= res.length) {
    if (i <= addressBinary.length) {
      if (res[res.length - i] === '0') {
        res[res.length - i] = addressBinary[addressBinary.length - i];
      }
    }

    if (res[res.length - i] === 'X') xBits.push(i);
    i += 1;
  }

  setBits(mem, res, 0, xBits, val);
}

const sumMemoryAddresses = (data) => {
  const mem = {};

  let currentMask;
  for (let [action, value] of data) {
    if (action === 'mask') currentMask = value;
    else {
      const address = action.slice(4, action.length - 1);
      setAddresses(mem, currentMask, address, +value);
    }
  }

  return Object.values(mem).reduce((sum, val) => sum + val, 0);
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n').map((row) => row.split(' = '));
  console.log(parsed.reduce((maxCount, [code, val]) => {
    if (code === 'mask') {
      const numX = val.split('').filter((bit) => bit === 'X').length;
      return Math.max(maxCount, numX);
    }
    return maxCount;
  }, 0))
  // console.log(parsed);
  console.log(sumMemoryAddresses(parsed));
});

/*

*/