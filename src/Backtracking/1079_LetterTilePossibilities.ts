/*
You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

 

Example 1:

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
Example 2:

Input: tiles = "AAABBC"
Output: 188
Example 3:

Input: tiles = "V"
Output: 1
 

Constraints:

1 <= tiles.length <= 7
tiles consists of uppercase English letters.
*/

var numTilePossibilities = function (tiles: string): number {
  const permutations = new Set();
  const visited: boolean[] = [...Array(tiles.length).fill(false)];

  const buildPermutations = (permutation: string) => {
    if (permutation) permutations.add(permutation);

    for (let i = 0; i < tiles.length; i += 1) {
      if (visited[i]) continue;
      visited[i] = true;
      buildPermutations(permutation + tiles[i]);
      visited[i] = false;
    }
  }

  buildPermutations('');

  return permutations.size;
};