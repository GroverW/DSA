/*
Given a list of folders, remove all sub-folders in those folders and return in any order the folders after removing.

If a folder[i] is located within another folder[j], it is called a sub-folder of it.

The format of a path is one or more concatenated strings of the form: / followed by one or more lowercase English letters. For example, /leetcode and /leetcode/problems are valid paths while an empty string and / are not.



Example 1:

Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b/" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
Example 2:

Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d/" will be removed because they are subfolders of "/a".
Example 3:

Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]


Constraints:

1 <= folder.length <= 4 * 10^4
2 <= folder[i].length <= 100
folder[i] contains only lowercase letters and '/'
folder[i] always starts with character '/'
Each folder name is unique.
*/


// a little slow. should study better solutions
var removeSubfolders = function (folder) {
  folder.sort((a, b) => a.length - b.length);

  folder.forEach((path, index) => {
    const splitPath = path.split('/');
    splitPath[0] = index;
    lengthCounts[splitPath.length].push(splitPath);
  });

  const pathLookup = new TrieNode();
  const filteredPaths = [];

  lengthCounts.forEach((pathList) => {
    pathList.forEach((path) => {
      if (addPath(pathLookup, path)) {
        const folderIndex = path[0];
        filteredPaths.push(folder[folderIndex])
      }
    })
  })

  return filteredPaths;
};

const addPath = (root, path) => {
  let currentNode = root;

  for (let i = 1; i < path.length; i += 1) {
    const folder = path[i];
    if (!currentNode.children.get(folder)) {
      currentNode.children.set(folder, new TrieNode());
    }

    currentNode = currentNode.children.get(folder);
    if (currentNode.isPathEnding) return false;
  }

  currentNode.isPathEnding = true;
  return true;
}

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isPathEnding = false;
  }
}

const tests = [
  ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"],
  ["/a", "/a/b/c", "/a/b/d"],
  ["/a/b/c", "/a/b/ca", "/a/b/d"],
  ["/a/b/c/", "/b/c/d", "/c/d/e/"],
  ["/ap/ax/ay","/ap/aq/au","/aa/ab/af","/aa/ai/am","/ap/ax","/ap/aq/ar"]
];

for (let test of tests) {
  logOutList(printRow(removeSubfolders(test)));
}