/*
Two strings X and Y are similar if we can swap two letters (in different positions) of X, so that it equals Y. Also two strings X and Y are similar if they are equal.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list A of strings.  Every string in A is an anagram of every other string in A.  How many groups are there?



Example 1:

Input: A = ["tars","rats","arts","star"]
Output: 2
*/

var numSimilarGroups = function (A) {
  const groups = {};
  let numGroups = 0;

  for (let word1 of A) {
    if (groups[word1]) continue;

    const stack = [word1];
    numGroups += 1;

    while (stack.length) {
      const currWord = stack.pop();
      groups[currWord] = true;

      for (let nextWord of A) {
        if (
          nextWord !== currWord
          && !groups[nextWord]
          && similar(currWord, nextWord)
        ) {
          stack.push(nextWord);
        }
      }
    }
  }

  return numGroups;
};

const similar = (word1, word2) => {
  let differences = 0;
  for (let i = 0; i < word1.length; i += 1) {
    if (word1[i] !== word2[i]) {
      differences += 1;
      if (differences > 2) return false;
    }
  }
  return true;
}

const tests = [
  ["tars", "rats", "arts", "star"],
  ["crabs", "carbs", "crasb", "arcsb", "brcas"],
];

for (let test of tests) {
  logOutList(numSimilarGroups(test))
}