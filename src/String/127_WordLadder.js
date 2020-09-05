/*
Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list.
Note:

Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
*/

var ladderLength = function (beginWord, endWord, wordList) {
  const queue = [beginWord]
  const neighbors = getNeighbors(wordList);
  const visited = {};

  let numChanges = 1;

  while (queue.length) {
    for (let end = queue.length; end > 0; end -= 1) {
      const curr = queue.shift();
      if (curr === endWord) return numChanges;

      for (let i = 0; i < curr.length; i += 1) {
        const wildCard = curr.slice(0, i) + '*' + curr.slice(i + 1);
        if (neighbors[wildCard]) {
          for(let neighbor of neighbors[wildCard]) {
            if(!visited[neighbor]) {
              visited[neighbor] = true;
              queue.push(neighbor);
            }
          }
        }
      }
    }
    if (queue.length) numChanges += 1;
  }

  return 0;
};

const getNeighbors = (wordList) => {
  const neighbors = {};
  for (let word of wordList) {
    for (let i = 0; i < word.length; i += 1) {
      const wildCard = word.slice(0, i) + '*' + word.slice(i + 1);
      if (!neighbors[wildCard]) {
        neighbors[wildCard] = [word];
      } else {
        neighbors[wildCard].push(word);
      }
    }
  }

  return neighbors;
}

const tests = [
  ['hit', 'cog', ["hot", "dot", "dog", "lot", "log", "cog"]],
  ['hit', 'cog', ["hot", "dot", "dog", "lot", "log"]],
];

for (let test of tests) {
  logOutList(ladderLength(...test));
}