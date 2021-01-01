/*
Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.

Each time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.

Find the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.

 

Example 1:

Input: board = "WRRBBW", hand = "RB"
Output: -1
Explanation: WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW
Example 2:

Input: board = "WWRRBBWW", hand = "WRBRW"
Output: 2
Explanation: WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty
Example 3:

Input: board = "G", hand = "GGGGG"
Output: 2
Explanation: G -> G[G] -> GG[G] -> empty 
Example 4:

Input: board = "RBYYBBRRB", hand = "YRBGB"
Output: 3
Explanation: RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty 
 

Constraints:

You may assume that the initial row of balls on the table won’t have any 3 or more consecutive balls with the same color.
1 <= board.length <= 16
1 <= hand.length <= 5
Both input strings will be non-empty and only contain characters 'R','Y','B','G','W'.
*/

const getNextBoard = (board, insertIdx, color) => {
  const stack = [];
  for (let i = 0; i < board.length; i += 1) {
    if (i === insertIdx) {
      if (stack[stack.length - 1] === color) {
        stack[stack.length - 1] += color;
      } else {
        stack.push(color);
      }
    }


    if (!stack.length || board[i] !== stack[stack.length - 1][0]) {
      stack.push(board[i]);
    } else if (board[i] !== board[i + 1]) {
      stack[stack.length - 1] += board[i];
      if (stack[stack.length - 1].length >= 3) stack.pop();
    } else {
      stack[stack.length - 1] += board[i];
    }
  }

  return stack.join('');
}

var findMinStep = function (board, hand) {
  const colorLookup = 'RYBGW';

  const handCounts = hand.split('')
    .reduce((counts, color) => {
      counts[colorLookup.indexOf(color)] += 1;
      return counts;
    }, [0, 0, 0, 0, 0]);

  const visited = new Set();
  const queue = [[board, handCounts]];

  while (queue.length) {
    const [currBoard, currCounts] = pop(queue);

    for (let i = 0; i < currCounts.length; i += 1) {
      if (!currCounts[i]) continue;
      const color = colorLookup[i];
      for (let j = 0; j < currBoard.length; j += 1) {
        const nextBoard = getNextBoard(currBoard, j, color)
        if (!nextBoard) return hand.length - currCounts.reduce((sum, count) => sum + count, 0) + 1;
        if (visited.has(nextBoard)) continue;
        visited.add(nextBoard);
        const nextCounts = [...currCounts];
        nextCounts[i] -= 1;
        push([nextBoard, nextCounts], queue);
      }
    }
  }

  return -1;
}

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  const res = heap.pop();
  siftDown(heap);
  return res;
}

const push = (val, heap) => {
  heap.push(val);
  siftUp(heap);
}

const siftUp = (heap) => {
  let current = heap.length - 1;
  while (current > 0) {
    const parent = Math.ceil(current / 2) - 1;
    let next = current;
    if (heap[parent][0].length > heap[next][0].length) next = parent;

    if (next !== current) {
      [heap[next], heap[current]] = [heap[current], heap[next]];
      current = next;
    } else break;
  }
}

const siftDown = (heap) => {
  let current = 0;
  while (true) {
    const left = current * 2 + 1;
    const right = left + 1;
    let next = current;

    if (heap[left] && heap[left][0].length < heap[next][0].length) next = left;
    if (heap[right] && heap[right][0].length < heap[next][0].length) next = right;

    if (next !== current) {
      [heap[next], heap[current]] = [heap[current], heap[next]];
      current = next;
    } else break;
  }
}


/*

*/


// const maxLen = 16;
// const colors = 'RBGYW'
// for (let i = 0; i < 1; i += 1) {
//   // const len = Math.floor(Math.random() * maxLen) + 1;
//   // const handCount = Math.floor(Math.random() * 5) + 1;
//   const len = maxLen
//   const handCount = 5;

//   let board;
//   let hand;
//   do {
//     board = '';
//     let streak = 0;
//     for (let i = 0; i < len; i += 1) {
//       let idx = Math.floor(Math.random() * colors.length);;
//       if (streak === 2) {
//         while (colors[idx] === board[board.length - 1]) {
//           idx = Math.floor(Math.random() * colors.length);
//         }
//         streak = 1;
//       } else if (colors[idx] === board[board.length - 1]) {
//         streak = 2;
//       } else {
//         streak = 1;
//       }
//       board += colors[idx];
//     }

//     const boardCounts = board.split('').reduce((total, val) => {
//       const colorIdx = colors.indexOf(val);
//       total[colorIdx] += 1;
//       return total;
//     }, [0, 0, 0, 0, 0])

//     hand = '';
//     for (let i = 0; i < boardCounts.length; i += 1) {
//       if (boardCounts[i] === 1) hand += colors[i].repeat(2);
//       if (boardCounts[i] === 2) hand += colors[i];
//     }
    
//     for (let i = hand.length; i < handCount; i += 1) {
//       const idx = Math.floor(Math.random() * board.length);
//       hand += board[idx];
//     }
//     hand = randomize(hand.split('')).join('');

//     if (hand.length > handCount) {
//       board = 'B';
//       hand = 'R';
//     }

//   } while (findMinStep(board, hand) < 0)

//   // logOutList('"' + str + '"')
//   logOutList(printRow([board, hand]) + ',')
//   // logOutList(printRow(actions) + '],')
// }

const tests = [
  ["WRRBBW", "RB"],
  ["WWRRBBWW", "WRBRW"],
  ["G", "GGGGG"],
  ["RBYYBBRRB", "YRBGB"],
  ["GWW", "WGWWG"],
  ["WB", "BBWW"],
  ["GGB", "GBGBG"],
  ["WB", "WBBBW"],
  ["YYBBB", "BBYB"],
  ["RRWWRRBBRR", "WB"],
  ["YYYGYYRGRWWWYYGG", "GGGRY"],
  ["WBBRWGYRRRYYGBBG", "BWRRB"],
  ["WGWBWWGWGGGWWGWG", "BBWGG"],
  ["YYBRYYBBYYBBRRBB", "BYBBR"],
  ["BRRWWWRGGWBYYBGB", "WYBWB"],
  ["WWYWGYGGGYWWGWYY", "WWWYG"],
  ["BBBBWWYGRRGYYWWB", "BWYRG"],
  ["BYBBBYYYBWYWWBGG", "BYWYG"],
  ["WWYBBBYWRRWWGGWR", "RGYRR"],
  ["BYGGYBYBWBBBBBWB", "WBGBY"],
  ["WYBYBYWYYYYGGGYW", "YBYYY"],
  ["RRGGGRGWRRRRGGWG", "GRGWR"],
  ["YGGGYRWWWGGGRRRY", "GWRRG"],
  ["WWWYRRYYBBBBYYRY", "WBRBY"],
  ["GRBRRWWGGGWRBRYY", "YGRBG"],
  ["WWRRGRWRGRGGGGRR", "RGGGR"],
  ["RYBBBYYRBBRBBBBB", "BBBBB"],
  ["GRWGGRRRWWGRRWRG", "WRGWR"],
  ["GYGGGGYGRBRBBBRR", "BYBGG"],
  ["RBBRRRBYBBBBYYYY", "BRBYR"],
];

let i = 0;
for (let test of tests) {
  console.time(i);
  logOutList(findMinStep(...test));
  console.timeEnd(i);
  i += 1;
}

/*
"WRRBBW"
"RB"
"WWRRBBWW"
"WRBRW"
"G"
"GGGGG"
"RBYYBBRRB"
"YRBGB"
"GWW"
"WGWWG"
"WB"
"BBWW"
"GGB"
"GBGBG"
"WB"
"WBBBW"
"YYBBB"
"BBYB"
"RRWWRRBBRR"
"WB"
*/