const fs = require('fs');

const convertToBinary = (onBit, binaryStr) => {
  let current = 0;
  let currBit = binaryStr.length - 1;

  for (let bit of binaryStr) {
    if (bit === onBit) {
      current |= 1 << currBit;
    }
    currBit -= 1;
  }

  return current;
}

const getMaxSeatPosition = (seats) => {
  return seats.reduce((maxSeatNumber, seat) => {
    const rowDetails = seat.slice(0, 7);
    const colDetails = seat.slice(7);
    const row = convertToBinary('B', rowDetails);
    const col = convertToBinary('R', colDetails);
    return Math.max(maxSeatNumber, row * 8 + col);
  }, 0);
}

const getMissingSeatPosition = (seats) => {
  let minRow = Infinity;
  let maxRow = -Infinity;
  
  const FILLED_ROW = 2 ** 8 - 1;
  const rows = new Array(128).fill(0);
  
  seats.forEach((seat) => {
    const row = convertToBinary('B', seat.slice(0, 7));
    const col = convertToBinary('R', seat.slice(7));
    minRow = Math.min(minRow, row);
    maxRow = Math.max(maxRow, row);
    rows[row] |= 1 << col;
  });
  
  const seatedRow = rows.findIndex((takenSeats, row) => (
    takenSeats > 0
    && row !== minRow
    && row !== maxRow
    && takenSeats < FILLED_ROW
  ));
  
  const missingSeat = rows[seatedRow] ^ FILLED_ROW;
  console.log(seatedRow, rows[seatedRow], missingSeat)
  return seatedRow * 8 + Math.log2(missingSeat);
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(getMissingSeatPosition(parsed));
});
// console.log(getMaxSeatPosition(['FBFBBFFRLR']))

/*
  0101100
  101
  11110111
*/