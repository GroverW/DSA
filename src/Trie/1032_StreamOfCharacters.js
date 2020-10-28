/*
Implement the StreamChecker class as follows:

StreamChecker(words): Constructor, init the data structure with the given words.
query(letter): returns true if and only if for some k >= 1, the last k characters queried (in order from oldest to newest, including this letter just queried) spell one of the words in the given list.


Example:

StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.
streamChecker.query('a');          // return false
streamChecker.query('b');          // return false
streamChecker.query('c');          // return false
streamChecker.query('d');          // return true, because 'cd' is in the wordlist
streamChecker.query('e');          // return false
streamChecker.query('f');          // return true, because 'f' is in the wordlist
streamChecker.query('g');          // return false
streamChecker.query('h');          // return false
streamChecker.query('i');          // return false
streamChecker.query('j');          // return false
streamChecker.query('k');          // return false
streamChecker.query('l');          // return true, because 'kl' is in the wordlist


Note:

1 <= words.length <= 2000
1 <= words[i].length <= 2000
Words will only consist of lowercase English letters.
Queries will only consist of lowercase English letters.
The number of queries is at most 40000.
*/

// SLOW w/ queue
class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

var StreamChecker = function (words) {
  this.trie = new TrieNode();
  this.streamQueue = [];

  for (let word of words) {
    let current = this.trie;
    for (let letter of word) {
      current.children[letter] = current.children[letter] || new TrieNode();
      current = current.children[letter];
    }
    current.isWordEnd = true;
  }
};

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
  const queue = [];
  let foundWord = false;

  this.streamQueue.push(this.trie);

  for (let node of this.streamQueue) {
    node = node.children[letter];
    if (!node) continue;
    if (node.isWordEnd) foundWord = true;
    queue.push(node);
  }

  this.streamQueue = queue;
  return foundWord;
};

// FAST w/ string and reverse trie
class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

var StreamChecker = function (words) {
  this.trie = new TrieNode();
  this.streamQueue = [];
  this.maxLength = 0;

  for (let word of words) {
    let current = this.trie;
    this.maxLength = Math.max(this.maxLength, word.length);
    for (let i = word.length - 1; i >= 0; i -= 1) {
      const letter = word[i];
      current.children[letter] = current.children[letter] || new TrieNode();
      current = current.children[letter];
    }
    current.isWordEnd = true;
  }
};

/**
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function (letter) {
  this.streamQueue.push(letter);
  if (this.streamQueue.length > this.maxLength) this.streamQueue.shift();

  return this.search(this.streamQueue);
};

StreamChecker.prototype.search = function (word) {
  let current = this.trie;
  for (let i = word.length - 1; i >= 0; i -= 1) {
    const letter = word[i];
    current = current.children[letter];
    if (!current) return false;
    if (current.isWordEnd) return true;
  }

  return false;
}

const tests = [
  [["cd", "f", "kl"], ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']],
  [["ab", "ba", "aaab", "abab", "baa"], [["a"], ["a"], ["a"], ["a"], ["a"], ["b"], ["a"], ["b"], ["a"], ["b"], ["b"], ["b"], ["a"], ["b"], ["a"], ["b"], ["b"], ["b"], ["b"], ["a"], ["b"], ["a"], ["b"], ["a"], ["a"], ["a"], ["b"], ["a"], ["a"], ["a"]]]
];

for (let [words, letters] of tests) {
  const streamChecker = new StreamChecker(words);
  for (let letter of letters) {
    logOutList(streamChecker.query(letter))
  }
}