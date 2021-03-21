import { CanConvertToString } from './types';

let outputList: (HTMLElement | null) = document.getElementById('output-list');

if (outputList === null) {
  outputList = document.createElement('ul');
  document.body.appendChild(outputList);
}

outputList.innerText = '';

export const logOutList = (data: CanConvertToString): void => {
  const listItem: HTMLElement = document.createElement('li')
  listItem.textContent = <string>data;
  outputList?.appendChild(listItem);
}

export const padNumber = (
  num: number,
  digits: number,
  character: string = '0',
): string => {
  const numStr = num.toString();
  const numLength = numStr.length;
  return character.repeat(Math.max(0, digits - numLength)) + numStr;
}