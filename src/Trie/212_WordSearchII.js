import { constructTrie } from './helpers';
/*
Given a 2D board and a list of words from the dictionary, find all words in the board.

Each word must be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.



Example:

Input:
board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
]
words = ["oath","pea","eat","rain"]

Output: ["eat","oath"]


Note:

All inputs are consist of lowercase letters a-z.
The values of words are distinct.
*/

var findWords = function (board, words) {
  const trie = constructTrie(words);
  const found = {};

  const tests = [[-1, 0], [1, 0], [0, 1], [0, -1]];

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      const node = trie.children[board[i][j]];
      if (node) {
        search(board, i, j, node, {}, tests, found);
      }
    }
  }

  return Object.keys(found);
};

const search = (board, rStart, cStart, node, visited, tests, found) => {
  if (node.word) found[node.word] = true;
  visited[`${rStart}${cStart}`] = true;

  for (let [rDiff, cDiff] of tests) {
    const rNext = rStart + rDiff;
    const cNext = cStart + cDiff;

    if (rNext < 0 || rNext >= board.length) continue;
    if (cNext < 0 || cNext >= board[0].length) continue;
    if (visited[`${rNext}${cNext}`]) continue;

    const nextNode = node.children[board[rNext][cNext]]
    if (nextNode) {
      search(board, rNext, cNext, nextNode, visited, tests, found);
    }
  }

  visited[`${rStart}${cStart}`] = false;
}