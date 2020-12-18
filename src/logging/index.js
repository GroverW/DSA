const output = document.getElementById('output');
const outputList = document.getElementById('output-list');
output.innerText = '';
outputList.innerText = '';

export const logOutList = (data) => {
  const listItem = document.createElement('li')
  listItem.innerText = data;
  outputList.appendChild(listItem);
}

export const padNumber = (num, digits, character = '0') => {
  const numStr = num.toString();
  const numLength = numStr.length;
  return character.repeat(Math.max(0, digits - numLength)) + numStr;
}