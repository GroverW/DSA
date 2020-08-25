class TrieNode {
  constructor(val, word = false) {
    this.val = val;
    this.word = word;
    this.children = {};
  }
}

const constructTrie = (words) => {
  const trie = new TrieNode();

  for (let word of words) {
    let curr = trie;
    for (let char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode(char);
      }

      curr = curr.children[char];
    }

    curr.word = word;
  }

  return trie;
}

export { Trie, constructTrie };