const fs = require('fs');

const getManhattanDistance = (directions) => {
  const moves = {
    N: [-1, 0],
    S: [1, 0],
    E: [0, 1],
    W: [0, -1],
  }

  let x = 0;
  let y = 0;

  let currFacing = 0;
  const facing = ['E', 'S', 'W', 'N'];
  const turns = {
    R: {
      90: 1,
      180: 2,
      270: 3,
    },
    L: {
      90: -1,
      180: -2,
      270: -3,
    }
  }

  const turn = (direction, degree) => {
    const turnAmt = turns[direction][degree];
    if (turnAmt < 0) {
      currFacing += turnAmt;
      if (currFacing < 0) currFacing = 4 + currFacing;
    } else {
      currFacing = (currFacing + turnAmt) % 4;
    }
  }

  for (let direction of directions) {
    const action = direction[0];
    const amount = direction.slice(1);

    if (moves[action]) {
      const [xDiff, yDiff] = moves[action];
      x += amount * xDiff;
      y += amount * yDiff;
    } else if (turns[action]) {
      turn(action, amount);
    } else if (action === 'F') {
      const direction = facing[currFacing];
      const [xDiff, yDiff] = moves[direction];
      x += amount * xDiff;
      y += amount * yDiff;
    }
  }

  return Math.abs(y) + Math.abs(x);
}

const getManhattanDistance2 = (directions) => {
  const moves = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
  }

  let wpX = 10;
  let wpY = 1;

  let x = 0;
  let y = 0;

  const rotateRight = () => {
    const nextY = (wpX <= 0 && wpY >= 0) ? Math.abs(wpX) : -wpX;
    wpX = wpY;
    wpY = nextY;
  }
  const rotateLeft = () => {
    const nextX = (wpX > 0 && wpY < 0) ? Math.abs(wpY) : -wpY;
    wpY = wpX;
    wpX = nextX;
  }
  const flip = () => {
    wpX *= -1;
    wpY *= -1;
  }
  const turns = {
    R: {
      90: () => rotateRight(),
      180: () => flip(),
      270: () => rotateLeft(),
    },
    L: {
      90: () => rotateLeft(),
      180: () => flip(),
      270: () => rotateRight(),
    }
  }

  for (let direction of directions) {
    const action = direction[0];
    const amount = direction.slice(1);

    if (action in moves) {
      const [xDiff, yDiff] = moves[action];
      wpX += amount * xDiff;
      wpY += amount * yDiff;
    } else if (action in turns) {
      turns[action][amount]();
    } else if (action === 'F') {
      x += wpX * amount;
      y += wpY * amount;
    }

    // console.log({ direction }, { wpX }, { wpY }, { x }, { y });
  }

  return Math.abs(y) + Math.abs(x);
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(getManhattanDistance2(parsed));
});