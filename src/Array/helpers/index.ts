
import { Iterable } from './types';

export const format = <Type>(element: Type): string | Type => {
  if (Array.isArray(element)) {
    return printRow(element);
  } else if (typeof element === 'string') {
    return `"${element}"`;
  } else if (typeof element === 'number') {
    return element;
  } else if (typeof element === 'undefined') {
    return 'undefined';
  } else if (typeof element === 'boolean') {
    return element ? 'true' : 'false';
  } else if (Number.isNaN(element)) {
    return 'NaN';
  } else if (!element) {
    return 'null';
  } else {
    return element;
  }
}

export const printRow = (row: any[]): string => {
  const formatted: string = row.map((item: any[]) => format(item)).join(',')
  return `[${formatted}]`
}

export const printGrid = (grid: any[][]): string => (
  `[
    ${grid.map((row) => printRow(row)).join('\n')},
  ],`
);

export const randomize = <Type>(arr: Type[]): Type[] => {
  const randomized: Type[] = [...arr];
  for (let i = randomized.length - 1; i > 0; i -= 1) {
    const randIdx: number = Math.floor(Math.random() * (i + 1));
    [randomized[i], randomized[randIdx]] = [randomized[randIdx], randomized[i]];
  }

  return randomized;
}

export const randomOption = (options: Iterable): any => {
  const option: number = Math.floor(Math.random() * options.length);
  return options[option];
}

export const numberBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomLetter = ({ upperCase = false, limit = 26, additional = '' }): string =>
  upperCase
    ? randomOption('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, limit) + additional)
    : randomOption('abcdefghijklmnopqrstuvwxyz'.slice(0, limit) + additional);
  

export const randomizeGrid = <Type>(grid: Type[][]): Type[][] => {
  const height: number = grid.length;
  const width: number = grid[0].length;
  const flattened: Type[] = grid.reduce((newGrid, row) => {
    newGrid.push(...row);
    return newGrid;
  }, []);
  const randomized = randomize(flattened);
  const randomGrid = new Array(height).fill(null)
    .map((_, row) => randomized.slice(row * width, row * width + width));

  return randomGrid;
}
