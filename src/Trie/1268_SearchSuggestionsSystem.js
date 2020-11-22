/*
Given an array of strings products and a string searchWord. We want to design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with the searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return list of lists of the suggested products after each character of searchWord is typed. 

 

Example 1:

Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
After typing mou, mous and mouse the system suggests ["mouse","mousepad"]
Example 2:

Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
Example 3:

Input: products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
Output: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]
Example 4:

Input: products = ["havana"], searchWord = "tatiana"
Output: [[],[],[],[],[],[],[]]
 

Constraints:

1 <= products.length <= 1000
There are no repeated elements in products.
1 <= Σ products[i].length <= 2 * 10^4
All characters of products[i] are lower-case English letters.
1 <= searchWord.length <= 1000
All characters of searchWord are lower-case English letters.
*/

// with Trie (slower, but more practical?)
var suggestedProducts = function (products, searchWord) {
  const aCode = 'a'.charCodeAt(0);
  const trie = buildTrie(products);
  const searchResults = [];

  const getResults = (node, currTarget, currDepth, currResult) => {
    if (!node) return 0;
    if (currTarget === searchWord.length) return 1;
    if (node.word) currResult.push(node.word);
    if (currResult.length === 3) return 2;

    for (let child of node.children) {
      if (child) {
        const status = getResults(child, currTarget, currDepth + 1, currResult);
        if (status === 1) return 1;
        else if (status === 2) {
          if (currDepth === currTarget) break;
          else return 2;
        }
      }
    }

    if (currDepth === currTarget) {
      searchResults.push(currResult);
      
      if (currResult.length && currTarget < searchWord.length - 1) {
        const nextLetter = searchWord[currTarget + 1].charCodeAt(0) - aCode;
        getResults(node.children[nextLetter], currTarget + 1, currDepth + 1, []);
      }
      
      return 1;
    }
  }

  const firstLetter = searchWord[0].charCodeAt(0) - aCode;
  getResults(trie.children[firstLetter], 0, 0, []);

  for (let i = searchResults.length; i < searchWord.length; i += 1) {
    searchResults.push([]);
  }

  return searchResults;
};

class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.word = false;
  }
}

const buildTrie = (words) => {
  const aCode = 'a'.charCodeAt(0);
  const trie = new TrieNode();

  for (let word of words) {
    let current = trie;
    for (let letter of word) {
      const letterCode = letter.charCodeAt(0) - aCode;

      if (!current.children[letterCode]) {
        current.children[letterCode] = new TrieNode();
      }

      current = current.children[letterCode];
    }
    current.word = word;
  }

  return trie;
}

// by sorting - faster, more straightforward, less practical?
var suggestedProducts = function (products, searchWord) {
  products.sort();
  const searchResults = [];

  for (let i = 0; i < searchWord.length; i += 1) {
    products = products.filter((product) => product[i] === searchWord[i]);
    searchResults.push(products.slice(0, 3));
  }

  return searchResults;
};

const tests = [
  [["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"],
  [["havana"], "havana"],
  [["bags", "baggage", "banner", "box", "cloths"], "bags"],
  [["havana"], "tatiana"],
  [["a", "b", "c"], "a"],
  [["a", "aa", "aaa", "aaaa", "ab", "aab", "aaab", "aaaab"], "aaaaa"],
];

for (let test of tests) {
  logOutList(printGrid(suggestedProducts(...test)));
}

/*
["mobile", "mouse", "moneypot", "monitor", "mousepad"]
"mouse"
["havana"]
"havana"
["bags", "baggage", "banner", "box", "cloths"]
"bags"
["havana"]
"tatiana"
["a", "b", "c"]
"a"
*/