var addOperators = function(num, target) {
  const results = [];

  const helper = (currNum, currRes, currIdx, currPath) => {
    if(currIdx === num.length - 1) {
      if(currRes + currNum + +num[currIdx] === target) {
        results.push(currPath + '+' + num[currIdx]);
      }
      if(currRes + currNum - num[currIdx] === target) {
        results.push(currPath + '-' + num[currIdx]);
      }
      if(currRes + currNum * +num[currIdx] === target) {
        results.push(currPath + '*' + num[currIdx]);
      }

      return;
    }
    helper(+num[currIdx], currRes + currNum, currIdx + 1, currPath + '+' + num[currIdx]);
    helper(-num[currIdx], currRes + currNum, currIdx + 1, currPath + '-' + num[currIdx]);
    helper(currNum * +num[currIdx], currRes, currIdx + 1, currPath + '*' + num[currIdx]);
  }

  helper(+num[0], 0, 1, num[0])

  return results;
};

const tests = [
  ["123",6],
  ["232",8],
  ["105",5],
  ["00",0],
  ["3456237490",9191],
]

for(let test of tests) {
  logOutList(addOperators(...test))
}