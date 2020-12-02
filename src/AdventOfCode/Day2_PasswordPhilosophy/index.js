const fs = require('fs');


const isValidPassword = (parts) => {
  const [min, max, reqLetter, password] = parts;
  let count = 0;
  for(let letter of password) {
    count += (letter === reqLetter);
    if (count > max) return false;
  }

  return count >= min;
}

const passwordPhilosophy = (passwordParts) => {
  return passwordParts.filter((parts) => isValidPassword(parts)).length;
}

const isValidPassword2 = (parts) => {
  const [pos1, pos2, reqLetter, password] = parts;
  let totalMatches = 0;
  totalMatches += (password[pos1-1] === reqLetter) + (password[pos2-1] === reqLetter);

  return totalMatches === 1;
}

const passwordPhilosophy2 = (passwordParts) => {
  return passwordParts.filter((parts) => isValidPassword2(parts)).length;
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n').map((line) => {
    const [nums, required, password] = line.split(' ');
    const [min, max] = nums.split('-');
    const reqLetter = required[0];
    return [+min, +max, reqLetter, password];
  });
  // console.log(parsed);
  console.log(passwordPhilosophy2(parsed));
});