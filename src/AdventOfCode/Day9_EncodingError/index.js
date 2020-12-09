const fs = require('fs');

const findFirstNon2Sum = (numbers) => {
  const nums = numbers.map((num) => BigInt(num));
  const trailing25 = new Set(nums.slice(0, 25));
  for (let i = 25; i < nums.length; i += 1) {
    let missing = nums[i];
    for (let j = i - 25; j < i; j += 1) {
      if (trailing25.has(missing - nums[j])) {
        missing = false;
        break;
      }
    }

    if (missing) return missing;
    trailing25.delete(nums[i - 25]);
    trailing25.add(nums[i]);
  }
}

const findSubarrayAddingToNon2SumNumber = (numbers, target) => {
  const nums = numbers.map((num) => BigInt(num));

  let start = 0;
  let current = 0;
  let currentSum = nums[current];

  while (current < nums.length) {
    if (currentSum === target) {
      break;
    } else if (currentSum < target) {
      current += 1;
      currentSum += nums[current];
    } else {
      currentSum -= nums[start];
      start += 1;
    }
  }

  const numberRange = nums.slice(start, current + 1);
  const [min, max] = numberRange.reduce((minMax, val) => {
    const [min, max] = minMax;
    if(val < min) minMax[0] = val;
    if(val > max) minMax[1] = val;
    return minMax;
  }, [BigInt(999999999999999), BigInt(-1)]);

  return [numberRange, min + max];
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n');
  // console.log(parsed);
  console.log(findSubarrayAddingToNon2SumNumber(parsed, findFirstNon2Sum(parsed)));
});