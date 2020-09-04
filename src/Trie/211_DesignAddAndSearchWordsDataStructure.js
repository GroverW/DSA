/*
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.


Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
*/

var WordDictionary = function () {
  this.start = new TrieNode();
};

/**
* Adds a word into the data structure.
* @param {string} word
* @return {void}
*/
WordDictionary.prototype.addWord = function (word) {
  let curr = this.start;
  for (let char of word) {
    if (!curr.children[char]) {
      curr.children[char] = new TrieNode();
    }
    curr = curr.children[char];
  }
  curr.isWordEnding = true;
};

/**
* Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
* @param {string} word
* @return {boolean}
*/
WordDictionary.prototype.search = function (word) {
  let curr;
  const queue = [this.start];
  for (let char of word) {
    const end = queue.length;
    for (let i = 0; i < end; i += 1) {
      curr = queue.shift();
      if (char === '.') {
        queue.push(...Object.values(curr.children));
      } else if (curr.children[char]) {
        queue.push(curr.children[char]);
      }
    }
    if (!queue.length) return false;
  }

  return queue.some((node) => node.isWordEnding);
};

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/
class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnding = false;
  }
}

const tests = [
  ['WordDictionary', ''],
  ['addWord', 'bad'],
  ['addWord', 'dad'],
  ['addWord', 'mad'],
  ['search', 'pad'],
  ['search', 'bad'],
  ['search', '.ad'],
  ['search', 'b..'],
  ['WordDictionary', ''],
  ['addWord', 'at'],
  ['addWord', 'and'],
  ['addWord', 'an'],
  ['addWord', 'add'],
  ['search', 'a'],
  ['search', '.at'],
  ['addWord', 'bat'],
  ['search', '.at'],
  ['search', 'an.'],
  ['search', 'a.d.'],
  ['search', 'b.'],
  ['search', 'a.d'],
  ['search', '.'],
];

let obj;
for (let [step, val] of tests) {
  if (step === 'WordDictionary') {
    obj = new WordDictionary();
    logOutList('New Game!');
  } else if (step === 'addWord') {
    obj.addWord(val);
  } else if (step === 'search') {
    logOutList(obj.search(val));
  }
}