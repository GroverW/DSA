const fs = require('fs');

const countValidPassports = (passports) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let count = 0;
  return passports.reduce((total, passport) => {
    const parts = passport
      .split(/\s+/)
      .map((item) => item.split(':'))

    return total + requiredFields.every((field) => parts.includes(field))
  }, 0)
}
const countValidPassports2 = (passports) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const isValidNumber = (value, digits, min, max) => {
    const num = +value;
    return (
      value.length === digits
      && !Number.isNaN(num)
      && num >= min
      && num <= max
    )
  }
  const isValidHeight = (height) => {
    const cmIn = height.slice(-2);
    if (cmIn === 'in') {
      if (height.length !== 4) return false;
      return isValidNumber(height.slice(0, 2), 2, 59, 76);
    } else if (cmIn === 'cm') {
      if (height.length !== 5) return false;
      return isValidNumber(height.slice(0, 3), 3, 150, 193);
    }
    return false;
  }

  const isValidColor = (color) => {
    if (color.length !== 7) return false;
    if (color[0] !== '#') return false;
    const validValues = '0123456789abcdef';

    return color
      .slice(1)
      .split('')
      .every((val) => validValues.includes(val));
  }

  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]

  const validation = {
    byr: (value) => isValidNumber(value, 4, 1920, 2002),
    iyr: (value) => isValidNumber(value, 4, 2010, 2020),
    eyr: (value) => isValidNumber(value, 4, 2020, 2030),
    hgt: (value) => isValidHeight(value),
    hcl: (value) => isValidColor(value),
    ecl: (value) => validEyeColors.includes(value),
    pid: (value) => isValidNumber(value, 9, 0, 999999999),
  }

  const isValid = (field, value) => {
    if (!value) return false;

    return validation[field](value);
  }

  return passports.reduce((total, passport) => {
    const partLookup = passport
      .split(/\s+/)
      .map((item) => item.split(':'))
      .reduce((lookup, [key, value]) => {
        lookup[key] = value;
        return lookup;
      }, {});

    return total + requiredFields.every((field) => isValid(field, partLookup[field]))
  }, 0)
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const parsed = data.split('\r\n\r\n');
  // console.log(parsed[0]);
  console.log(countValidPassports2(parsed));
});