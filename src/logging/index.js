const output = document.getElementById('output');
const outputList = document.getElementById('output-list');
output.innerText = '';
outputList.innerText = '';

export const logOutList = (data) => {
  const listItem = document.createElement('li')
  listItem.innerText = data;
  outputList.appendChild(listItem);
}
