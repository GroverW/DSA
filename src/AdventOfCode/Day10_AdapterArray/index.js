const fs = require('fs');

const count1And3Differences = (jolts) => {
  jolts.sort((a, b) => a - b);

  // console.log(jolts)
  let diffs1 = 0 + (jolts[0] === 1);
  let diffs3 = 1 + (jolts[0] === 3);

  jolts.forEach((amount, idx) => {
    diffs1 += (amount - jolts[idx - 1] === 1);
    diffs3 += (amount - jolts[idx - 1] === 3);
  })

  return diffs1 * diffs3;
}

const countDistinctWays = (jolts) => {
  jolts.sort((a, b) => a - b);
  const numWays = new Array(jolts[jolts.length - 1] + 1).fill(0);
  numWays[0] = 1;

  for (let jolt of jolts) {
    numWays[jolt] += (numWays[jolt - 1] || 0);
    numWays[jolt] += (numWays[jolt - 2] || 0);
    numWays[jolt] += (numWays[jolt - 3] || 0);
  }

  // console.log(numWays);
  return numWays[numWays.length - 1];
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n').map((val) => +val);
  // console.log(parsed);
  console.log(countDistinctWays(parsed));
});