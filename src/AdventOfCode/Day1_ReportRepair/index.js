const fs = require('fs');


const reportRepair2Sum = (nums) => {
  const visited = new Set();
  for (let num of nums) {
    if (visited.has(2020 - num)) {
      console.log(num, 2020 - num)
      return (num * (2020 - num));
    }
    visited.add(num);
  }
}

const reportRepair3Sum = (nums) => {
  for (let i = 0; i < nums.length; i += 1) {
    const num1 = nums[i];
    const target = 2020 - num1;
    const visited = new Set();
    for (let j = i + 1; j < nums.length; j += 1) {
      const num2 = nums[j];
      if(visited.has(target - num2)) {
        const num3 = target - num2;
        console.log(num1, num2, num3);
        return num1 * num2 * num3;
      }
      visited.add(num2);
    }
  }
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n').map((num) => +num);
  console.log(reportRepair3Sum(parsed));
});