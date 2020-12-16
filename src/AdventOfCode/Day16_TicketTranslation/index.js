const { count } = require('console');
const fs = require('fs');


const sumInvalidTickets = (ranges, ownTicket, nearbyTickets) => {
  const validRanges = ranges.map(([range1, range2]) => {
    const [r1From, r1To] = range1.split('-');
    const [r2From, r2To] = range2.split('-');

    return [+r1From, +r1To, +r2From, +r2To];
  });

  return nearbyTickets.reduce((sumInvalid, ticket) =>
    sumInvalid + ticket.split(',').reduce((sum, val) => {
      return sum + val * validRanges.every(([f1, t1, f2, t2]) =>
        (val < f1 || (val > t1 && val < f2) || val > t2)
      );
    }, 0), 0)
}

const getFieldOrder = (ranges, ownTicket, nearbyTickets) => {
  const validRanges = ranges.map(([range1, range2]) => {
    const [r1From, r1To] = range1.split('-');
    const [r2From, r2To] = range2.split('-');

    return [+r1From, +r1To, +r2From, +r2To];
  });

  const ownTicketValues = ownTicket.split(',').map((val) => +val);
  const ticketValues = nearbyTickets.map((ticket) => ticket.split(',').map((val) => +val));
  ticketValues.push(ownTicketValues);

  const invalidValues = new Set();

  const isInvalid = (val) => validRanges.every(([f1, t1, f2, t2]) =>
    (val < f1 || (val > t1 && val < f2) || val > t2)
  )

  ticketValues.forEach((ticket, row) => {
    ticket.forEach((value, col) => {
      if (isInvalid(value)) {
        invalidValues.add(`${row},${col}`);
      }
    })
  })

  const ticketColumns = new Array(20).fill(-1);
  const ticketFields = new Array(20).fill(-1);
  const possible = new Array(20).fill(null)
    .map(() => new Array(20).fill(true));

  // console.log(ticketValues);

  for (let ticketCol = 0; ticketCol < ownTicketValues.length; ticketCol += 1) {
    for (let ticket = 0; ticket < ticketValues.length; ticket += 1) {
      const val = ticketValues[ticket][ticketCol];
      if (invalidValues.has(`${ticket},${ticketCol}`)) continue;

      validRanges.forEach(([f1, t1, f2, t2], field) => {
        if (val < f1 || (val > t1 && val < f2) || val > t2) possible[field][ticketCol] = false;
      });
    }

    let countPossible = 0;
    let lastPossible;
    for (let field = 0; field < possible.length; field += 1) {
      if (!possible[field][ticketCol]) continue;
      countPossible += 1;
      lastPossible = field;
    }

    if (countPossible === 1) {
      for (let col = 0; col < possible.length; col += 1) {
        if (col === ticketCol) continue;
        possible[lastPossible][col] = false;
      }
      ticketColumns[ticketCol] = lastPossible;
      ticketFields[lastPossible] = ticketCol;
    }
  }

  for (let field = 0; field < possible.length; field += 1) {
    let countPossible = 0;
    let lastPossible;
    for (let col = 0; col < possible.length; col += 1) {
      countPossible += possible[field][col];
      if (possible[field][col]) lastPossible = col;
    }

    if (countPossible === 1) {
      for (let row = 0; row < possible.length; row += 1) {
        if (row === field) continue;
        possible[row][lastPossible] = false;
      }
      ticketColumns[lastPossible] = field;
      ticketFields[field] = lastPossible;
    }
  }

  const solve = (col) => {
    if (col === 20) return true;
    if (ticketColumns[col] >= 0) return solve(col + 1);

    for (let row = 0; row < possible.length; row += 1) {
      if (!possible[row][col] || ticketFields[row] >= 0) continue;

      ticketFields[row] = col;
      ticketColumns[col] = row;
      if (solve(col + 1)) return true;
      ticketFields[row] = -1;
      ticketColumns[col] = -1;
    }

    return false;
  }

  solve(0);
  console.log({ ticketColumns }, { ticketFields }, {ownTicketValues});
  return ownTicketValues.slice(0,6).reduce((sum, _, col) => {
    const column = ticketFields[col];
    return sum * ownTicketValues[column];
  }, 1);
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  const instructions = parsed.slice(0, 20);
  const ranges = instructions.map((instruction) => {
    const [_, rangeText] = instruction.split(': ');
    return rangeText.split(' or ');
  })
  const ownTicket = parsed[22];
  const nearbyTickets = parsed.slice(25);
  console.log(getFieldOrder(ranges, ownTicket, nearbyTickets));
});

/*[
[F, T, F, F, F, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, F, T, F, T, T, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, T, T, F, T, F, F, F, F],
[T, T, T, T, T, T, T, T, T, T, T, T, T, T, F, T, F, T, T, T*],
[T, T, F, F, T, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, F, T, T, T, T, F, T, T, F, T, F, T, F, T*],
[F, F, F, F, F, F, F, T, F, F, F, F, T, F, F, F, F, F, F, F],
[F, T, F, F, T, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, T, F, F, T, F, F, F, F],
[T, T, T, T, T, T, F, T, T, T, T, T, T, T, F, T, F, T, T, T*],
[T, T, F, T, T, T, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, F, F, F, F, F, F, F, F],
[F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, F, F, F, F],
[F, F, F, F, F, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, F, T, T, T, T, T, T, T, F, T, F, T, F, T*],
[T, T, T, T, T, T, F, T, F, T, T, F, T, T, F, T, F, T, F, T*],
[T, T, T, T, T, T, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, F, T, T, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, T, T, T, T, T, T, T, T, F, T, T, T, T, T]]

[
[F, T, F, F, F, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, F, T, F, T, T, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, T, T, F, T, F, F, F, F],
[T, T, T, T, T, T, T, T, T, T, T, T, T, T, F, T, F, T, T, T],
[T, T, F, F, T, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, F, T, T, T, T, F, T, T, F, T, F, T, F, T],
[F, F, F, F, F, F, F, T, F, F, F, F, T, F, F, F, F, F, F, F],
[F, T, F, F, T, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, T, F, F, T, F, F, F, F],
[T, T, T, T, T, T, F, T, T, T, T, T, T, T, F, T, F, T, T, T],
[T, T, F, T, T, T, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, F, F, F, F, F, F, F, F],
[F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, F, F, F, F],
[F, F, F, F, F, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, F, T, T, T, T, T, T, T, F, T, F, T, F, T],
[T, T, T, T, T, T, F, T, F, T, T, F, T, T, F, T, F, T, F, T],
[T, T, T, T, T, T, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[T, T, F, T, T, F, F, T, F, T, F, F, T, T, F, T, F, T, F, F],
[F, F, F, F, F, F, F, T, F, F, F, F, T, T, F, T, F, T, F, F],
[T, T, T, T, T, T, T, T, T, T, T, T, T, T, F, T, T, T, T, T]]
*/