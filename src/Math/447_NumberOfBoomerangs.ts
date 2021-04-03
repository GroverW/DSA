/*

*/

// object ~450ms
function numberOfBoomerangs(points: number[][]): number {
  let numBoomerangs = 0;
  for (let [x1, y1] of points) {
    const countDistances: { [distance: number]: number } = {};
    for (let [x2, y2] of points) {
      if (x1 === x2 && y1 === y2) continue;
      const distance = Math.abs(y2 - y1) ** 2 + Math.abs(x2 - x1) ** 2;
      const count = countDistances[distance] || 0;
      numBoomerangs += count * 2;
      countDistances[distance] = count + 1;
    }
  }
  
  return numBoomerangs;
};

// map ~200ms
function numberOfBoomerangs(points: number[][]): number {
  let numBoomerangs = 0;
  for (let [x1, y1] of points) {
    const countDistances = new Map<number, number>();
    for (let [x2, y2] of points) {
      if (x1 === x2 && y1 === y2) continue;
      const distance = Math.abs(y2 - y1) ** 2 + Math.abs(x2 - x1) ** 2;
      const count = countDistances.get(distance) || 0;
      numBoomerangs += count * 2;
      countDistances.set(distance, count + 1);
    }
  }
  
  return numBoomerangs;
};


/*
[0,0], [1, 0], [2, 0]


*/

// const maxLen: number = 100;

// for (let i = 0; i < 50; i += 1) {
//   const len = numberBetween(1, maxLen);
//   const used = new Set();
  
//   const points = [];
//   for(let i = 0; i < len; i += 1) {
//     let x = numberBetween(1, 25);
//     let y = numberBetween(1, 25);
//     while(used.has(`${x},${y}`)) {
//       x = numberBetween(1, 25);
//       y = numberBetween(1, 25);
//     }

//     points.push([x, y]);
//     used.add(`${x},${y}`);
//   }

//   // logOutList('"' + ip + '"')
//   // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
//   // logOutList(printRow([s, t]) + ',');
//   logOutList(printRow(points) + ',');
// }

const tests: Indexable<any>[] = [
  [[0,0],[1,0],[2,0]],
  [[12,8],[8,23],[17,14],[3,5],[24,25],[3,15],[24,4],[8,18],[2,25],[25,14],[20,11],[5,21],[22,13],[1,13],[11,11],[20,24],[7,13],[2,15],[17,7],[20,25],[21,17],[1,7],[19,16],[8,25],[22,14],[16,24],[10,7],[19,3],[18,25],[10,22],[21,2],[7,25],[10,20],[17,19],[23,16],[7,1],[16,12],[16,19],[17,18],[7,2],[1,6]],
[[8,10],[25,15],[21,18],[22,2],[3,9],[7,22],[5,7],[19,21],[25,14],[25,24],[2,6],[23,9],[9,15],[19,13],[15,13],[13,22]],
[[11,11],[12,7],[3,4],[19,16],[25,10],[25,23],[22,9],[20,17],[22,4],[24,21],[15,16],[11,5],[16,21],[6,11],[22,13],[10,10],[4,1],[5,20],[18,1],[3,25],[18,11],[20,14],[9,21],[13,22],[2,13],[17,2],[15,20],[19,20],[12,3],[16,1],[20,24],[16,23],[8,13],[25,22],[22,3],[18,12],[4,25],[2,9],[9,2],[8,15],[7,12],[13,3],[2,17],[16,9],[7,3],[6,13],[2,2],[13,12],[3,13],[15,6],[12,20],[7,6],[5,13],[1,5],[13,14],[25,19],[6,23],[3,6]],
[[3,14],[5,13],[23,9],[14,1],[21,6],[14,10],[7,23],[10,19],[3,4],[25,13],[5,23],[9,25],[22,17],[8,17],[2,15],[18,13],[14,4],[12,21],[11,3],[12,25],[22,16],[10,18],[25,10],[3,9],[21,2],[4,19],[5,1],[17,25],[25,18],[1,13],[3,3],[8,15],[23,1],[24,25],[24,24],[18,4],[16,4],[17,1],[12,9],[7,25],[22,21],[5,10],[2,2],[5,21],[15,16],[4,25],[15,12],[5,8],[9,20],[20,11],[16,8],[9,24],[24,14],[20,13],[21,10],[2,12],[16,5],[22,13],[16,23],[20,25],[8,16],[21,21],[19,24],[19,11],[18,18],[23,5],[2,7],[10,23],[17,16],[9,19],[13,3],[20,22],[14,22],[17,19],[8,18],[21,17],[12,14],[10,4],[12,15],[20,4],[24,17],[20,17],[14,24],[13,17],[10,7],[18,25],[13,21],[14,14],[22,7],[8,1],[22,25],[23,6],[23,3],[4,24]],
[[25,10],[17,22],[4,4],[7,11],[15,17],[15,9],[7,8],[11,16],[19,15],[18,10],[23,6],[6,8],[3,11],[7,7],[16,5],[16,23],[7,19],[12,2],[25,18],[6,10],[12,15],[20,7],[1,22],[10,4],[8,24],[12,10],[18,6],[1,8],[17,19],[24,11],[6,19],[8,23],[22,2],[8,14],[18,7],[4,1],[6,18]],
[[23,3],[20,21],[17,2],[3,11],[5,10],[6,18],[24,6],[18,21],[5,11],[19,1],[5,23],[15,7],[10,8],[4,6],[11,22],[17,23],[8,11],[6,14],[6,22],[14,23],[1,8],[13,24],[12,19],[10,5],[8,25],[10,20],[3,10],[12,24],[21,20],[20,2],[21,1],[7,16],[24,5],[9,12],[13,20],[13,6],[8,16],[23,22],[10,19],[5,25],[15,18],[8,20],[9,1],[21,24],[4,9],[16,10],[18,2],[13,16],[6,21],[5,5],[23,1],[7,15],[1,11],[21,18],[25,24],[9,7],[2,5],[8,10],[22,16],[6,11],[16,18],[18,4],[13,21],[3,22],[20,12],[3,23],[1,24],[18,18],[24,24],[9,18],[25,25],[19,11],[1,6],[22,5],[13,11],[15,20],[7,1],[14,25],[21,4],[9,9],[7,19],[19,4],[15,14],[2,21],[1,23],[18,11],[4,13],[9,2],[10,18],[20,23],[20,4],[1,20],[24,1],[4,8],[18,8],[18,3]],
[[20,8],[8,20],[9,22],[24,10]],
[[8,25],[23,1],[1,14],[19,20],[12,16],[21,23],[8,11],[13,10],[15,23],[5,10],[23,4],[8,12],[8,22],[3,17],[13,13],[16,16],[2,13],[18,4],[11,23],[23,8],[7,4],[14,20],[19,9],[23,20],[22,23],[5,11],[6,19],[23,6],[5,16],[11,6],[18,2],[12,20],[14,17],[11,12],[7,19],[16,3],[8,24],[10,17],[14,1],[14,12],[3,23],[19,8],[6,11],[19,18],[5,12],[6,13],[25,5],[21,25],[15,12],[24,9],[4,13],[8,4],[23,10],[18,14],[13,2],[3,6],[10,6],[14,22],[15,9],[21,15],[6,16],[20,2],[4,7],[24,15],[3,18],[16,14],[22,1],[2,20],[11,8],[13,21],[2,15],[1,7],[25,14],[15,18],[15,2]],
[[20,25],[9,11],[24,5],[10,12],[23,21],[18,15],[5,19],[21,18],[12,11],[19,18],[11,3],[22,13],[22,5],[9,18],[11,24],[9,15],[8,11],[16,12],[13,22],[20,15],[20,17],[2,23],[3,11],[7,8],[21,20],[4,6],[5,18],[25,15],[22,10],[25,23],[16,19],[2,16],[13,14],[18,16],[2,25],[8,1],[4,13],[16,11],[18,11],[3,18],[3,5],[12,5],[10,5],[6,9],[11,22],[19,17],[10,13],[12,19],[24,6],[6,13],[10,6],[1,12],[6,11],[17,11],[5,8],[7,21],[6,20],[14,18],[19,13],[18,3]],
[[23,7],[25,7],[10,17],[15,23],[12,13],[10,24],[8,12],[9,11],[1,17],[5,17],[21,19],[13,18],[23,13],[15,1],[9,10],[21,11],[1,11],[17,2],[17,17],[20,6],[14,22],[20,5],[13,6],[21,22],[5,19],[22,7],[2,17],[24,9],[22,12],[16,22],[24,24],[6,8],[5,21],[20,22],[12,15],[2,16],[18,8],[18,12],[1,10],[14,3],[18,7],[8,19],[11,4],[25,3],[11,13],[2,25],[14,20],[11,1],[2,19],[25,16],[12,24],[20,16],[22,10],[14,6]],
[[21,5],[14,5],[8,1],[6,19],[12,14],[18,15],[7,13],[9,25],[13,3],[12,11],[17,14],[25,7],[6,22],[16,9],[16,13],[13,17],[11,14],[17,19],[12,17],[16,5],[3,25],[10,17],[7,22],[18,18],[8,5],[13,10],[12,8],[20,10]],
[[7,7],[3,2],[9,19],[9,18],[25,7],[19,11],[4,18],[21,3],[8,6],[2,3],[20,11],[5,13],[3,1],[6,5],[3,14],[11,6],[5,9],[1,8],[22,15],[24,2],[25,2],[25,24],[9,11],[13,3],[24,25],[5,25],[12,15],[8,24],[9,9],[16,21],[12,10],[25,3],[10,23],[18,16],[21,4],[22,18],[4,4],[15,1],[14,7],[21,18],[6,15],[17,3],[21,9],[6,23],[20,20],[21,14],[9,4],[4,11],[6,14],[6,7],[3,13],[17,10],[15,4],[9,7],[12,9],[10,4],[3,19],[16,2],[20,22],[20,21],[22,14],[19,13],[7,22],[20,1],[20,7],[14,23],[2,16],[7,1],[25,25],[23,10],[2,11],[15,12],[6,10],[20,12],[5,21],[12,13],[11,7],[14,15],[24,17],[25,10],[23,22],[15,8],[21,22],[17,8],[1,17]],
[[6,23],[8,13],[4,7],[17,11],[7,21],[25,2],[18,12],[20,23],[16,10],[8,22],[17,20],[16,8],[15,24],[8,3],[25,4],[17,14],[20,22],[6,6],[2,10],[1,8],[13,19],[20,4],[14,6],[3,24],[11,21],[19,17],[5,4],[7,19],[11,4],[15,23],[7,15],[21,21],[18,8],[18,11],[8,12],[20,8],[25,18],[25,20],[19,12],[9,2],[17,7],[17,24],[7,22],[19,11],[7,25],[6,9],[12,11],[7,5],[12,9],[1,17],[20,20],[11,24],[12,13],[18,19],[21,5],[5,24],[1,22],[11,7],[9,21],[25,24],[5,25],[19,21],[21,22],[11,2],[6,20],[13,1],[19,16],[25,8],[11,18],[14,19],[8,15],[8,7],[7,16],[18,25],[11,11],[21,4],[21,14],[19,23],[8,16],[21,15]],
[[11,12],[13,10],[9,19],[11,22],[19,1],[10,6],[5,24],[25,5],[17,5],[15,3],[22,3]],
[[10,15],[9,25],[18,25]],
[[6,10],[4,10],[9,15],[6,6],[3,23],[23,15],[3,15],[22,13],[8,1],[9,8],[17,16],[24,4],[5,25],[21,21],[25,2],[20,6],[9,21],[17,3],[14,6],[22,20],[19,12],[14,13],[22,1],[12,1],[24,15],[15,21],[4,22],[2,13],[3,13],[25,23],[3,10],[16,19],[19,7],[24,14],[16,13],[23,25],[3,22],[6,7],[16,16],[18,11],[9,2],[17,12],[13,7],[14,4],[25,13],[25,5],[5,21],[12,3],[6,16],[18,5],[22,11],[7,15],[23,4],[25,8],[12,16],[13,6],[12,9],[25,11],[19,9],[21,2],[23,21],[10,12],[10,22],[12,11],[3,14],[7,6],[23,2],[16,25],[15,16],[11,24],[19,2],[19,20],[9,23],[11,11],[18,24],[9,24]],
[[5,25],[2,4],[3,8],[15,10],[18,5],[24,8],[3,6],[15,4],[21,17],[12,18],[1,13]],
[[24,8],[24,22],[3,17],[5,13],[1,19],[24,25],[18,8],[12,23],[6,23],[8,19],[7,3],[17,11],[9,12],[16,16],[14,25],[2,21],[22,20],[15,22],[22,7],[10,24],[11,6],[10,22],[7,10],[12,18],[16,11],[15,17],[13,8],[21,15],[3,14],[15,9],[7,16],[2,12],[8,23],[13,17],[11,11],[23,6],[24,18],[15,1],[4,12],[13,19],[17,21],[11,2],[24,20],[4,21],[19,25],[15,2],[5,6],[19,7],[4,13],[2,23],[10,1],[8,3],[22,6],[23,8],[5,20],[15,15],[20,4],[19,4],[5,1],[1,6],[7,11],[16,4],[4,9],[2,5],[8,9],[3,4]],
[[2,8],[13,18]],
[[20,7],[25,13],[13,7],[1,18],[16,6],[19,12],[17,2],[21,20],[4,19],[6,14],[7,11],[25,7],[22,21],[10,16],[5,9],[18,22],[4,13],[7,1],[5,7],[23,7],[19,13],[9,8],[22,15],[23,19],[24,4],[4,21],[11,24],[16,25],[22,10],[25,3],[14,3],[14,4]],
[[13,7],[7,10],[2,16],[25,4],[21,8],[14,17],[14,9],[4,5],[5,14],[1,25],[14,5],[14,15],[12,13],[10,1],[22,6]],
[[6,2],[24,25],[8,20],[25,3],[18,9],[24,5],[3,8],[17,20],[25,8],[6,1],[23,21]],
[[2,1],[15,11],[16,15],[21,10],[15,18],[25,11],[9,9],[7,4],[3,25],[4,15],[3,16],[13,3],[14,2],[19,19],[17,2],[23,13],[21,1],[23,7],[16,24]],
[[17,8],[14,19],[9,20],[2,12],[1,14],[7,11],[9,4],[16,23],[16,19],[20,1],[4,4],[18,15],[23,13],[5,6],[14,11],[15,18],[15,14],[15,10],[12,17],[21,14],[12,20],[15,19],[5,7],[4,12],[1,12],[3,9],[17,15],[14,10],[22,23],[24,12],[4,2],[16,13],[15,20],[25,25],[11,5]],
[[5,23],[10,7],[2,15],[11,21],[24,23],[4,5],[7,19],[10,15],[16,10],[20,5],[3,3],[8,4],[24,19],[16,11],[5,24],[14,19],[12,14],[8,6],[1,13],[23,11],[4,10],[14,25],[25,21],[18,3],[22,5],[8,11],[1,11],[13,12],[11,25],[12,5],[23,10],[4,8],[5,19],[6,17],[25,5],[5,6],[2,12],[19,8],[12,12],[17,17],[6,7],[20,23],[9,24],[18,19],[20,2],[16,23],[16,17],[19,23],[9,15],[13,21],[18,9]],
[[22,17],[18,24],[7,15],[18,11],[21,5],[10,9],[11,15],[8,24],[6,20],[24,9],[22,25],[8,19],[20,9],[1,24],[12,15],[16,5],[2,3],[4,21],[22,4],[24,21],[4,1],[21,8],[4,6],[4,7],[8,1],[23,10],[11,18],[8,22],[24,24],[20,23],[4,14],[15,2],[11,1],[6,15],[14,1],[6,16],[17,21],[9,19],[9,10],[11,22],[21,3],[20,4],[17,25],[24,13],[12,19],[5,19],[12,16],[18,4],[14,21],[20,14],[7,19],[14,3],[1,23],[23,11],[16,18],[22,10],[8,15],[1,8],[6,3],[25,10],[2,4],[6,7],[9,16],[4,20],[2,16],[9,3],[17,9],[7,22],[21,14],[22,5],[18,5],[14,5],[19,22],[13,24],[11,21],[6,8],[16,12],[10,1],[5,7],[6,25],[25,9],[12,4],[15,6],[1,1],[4,22],[17,8],[10,13],[9,1],[7,24],[4,23],[5,21],[23,24],[2,10],[25,3],[23,22],[4,25],[9,6],[3,20],[7,17],[10,25]],
[[15,17],[8,18],[11,9],[7,14],[1,19],[22,23],[9,21],[24,3],[22,21],[8,10],[19,8],[2,4],[7,16],[5,19],[22,25],[5,5],[21,15],[12,20],[19,2],[24,12],[10,5],[23,21],[22,10],[12,2],[24,14],[14,21],[3,7],[18,10],[17,24],[8,20],[9,25],[10,22],[11,17],[19,9],[3,17],[14,8],[18,24],[13,14],[18,15],[7,15],[9,8],[15,18],[25,1],[3,2],[11,22],[23,22],[10,11],[23,24],[1,12],[12,12],[3,18],[24,11],[12,7],[13,22],[15,20],[9,1],[18,6],[14,15],[10,3],[6,11],[13,9],[8,25],[24,20],[16,23],[4,3],[2,18],[23,13],[7,20],[24,2],[19,12],[12,1],[15,12],[9,12],[20,22],[16,17],[13,7],[15,13],[20,15],[9,5],[9,13],[22,2],[20,21],[17,17],[17,16],[15,4],[21,4],[25,4],[9,3],[5,6],[11,21],[1,16],[10,9],[2,24],[7,25],[5,4],[16,13],[6,16]],
[[14,11],[11,21],[14,21],[16,2],[3,5],[8,20],[14,14],[12,20],[14,20],[16,19],[3,14],[18,2],[4,25],[3,7],[8,2],[4,3],[23,3],[23,22],[12,14],[25,9],[16,12],[17,18],[4,2],[22,1],[8,22],[7,11],[7,13],[22,13],[22,15],[15,23],[19,21],[24,13],[12,17],[6,12],[20,1],[17,11],[22,9],[2,15],[5,25],[3,16],[16,21],[19,4],[21,9],[9,11],[2,11],[25,20],[10,6],[12,7],[24,6],[18,20],[7,14],[6,21],[4,21],[8,25],[15,1],[20,14],[20,10],[11,22],[19,11],[20,20],[19,6],[18,8],[14,23],[24,12],[5,7],[17,17],[18,3],[10,24],[19,16],[17,24],[16,13],[12,18]],
[[9,1],[14,15],[24,24],[18,23],[25,19],[6,17],[2,8],[16,4],[18,1],[21,24],[17,1],[14,5],[13,18],[9,23],[21,23],[10,8],[13,25],[5,18],[14,17],[18,17],[20,9],[17,6],[21,19],[12,22],[9,3],[20,11],[24,16],[1,21],[7,4],[10,4],[7,10],[9,11]],
[[17,17],[20,21],[19,16],[22,4],[7,14],[2,16],[24,25],[25,21],[10,9],[7,18],[11,18],[8,17],[6,17],[23,8],[12,2],[8,23],[12,23],[25,23],[7,17],[25,22],[12,19],[12,24],[2,12],[4,7],[21,15],[21,17],[14,7],[8,18],[25,25],[12,18],[14,20],[3,3],[11,8],[21,11],[3,5],[15,25],[8,20],[9,14],[9,10],[25,11],[21,14],[3,20],[24,15],[23,16],[8,12],[6,8],[18,12],[25,12],[16,25],[10,18],[23,3],[22,13],[20,20],[15,20],[6,2],[19,4],[15,7],[19,11],[6,19],[22,11],[19,17],[17,20],[14,25],[21,24],[4,15],[17,16],[2,11],[23,14],[21,22],[3,17],[25,15],[25,1],[3,13],[3,2],[13,2],[13,5],[25,17],[9,12],[13,24],[12,16],[9,1],[16,14],[16,4],[2,18],[14,19],[10,13],[14,13]],
[[11,25],[14,10],[16,5],[18,9],[10,5],[23,25],[3,13],[18,3],[8,14],[11,5],[1,16],[8,20],[1,10],[1,12],[15,4],[6,16],[23,24],[3,3],[9,11],[1,6],[6,18],[17,22],[5,6],[22,7],[20,12],[3,14],[25,20],[6,21],[12,16],[1,24],[6,2],[12,17],[19,14],[23,14],[19,5],[5,21],[22,1],[24,3],[4,9],[24,2],[11,16],[8,22],[6,4],[10,7],[6,8],[15,23],[1,18],[15,21],[22,22],[16,13],[19,10],[18,2],[13,9],[11,12],[6,17],[4,4],[5,12],[23,6],[24,22],[7,10],[2,10],[4,1],[6,3],[23,8],[25,10],[21,18],[6,1],[1,17],[15,2],[7,1],[22,21],[9,15],[21,11],[22,5],[22,17],[11,23],[15,22],[16,18],[8,3],[13,1],[19,1],[13,23],[10,11],[21,10],[18,18],[25,12]],
[[7,25],[23,19],[6,17],[9,15],[21,7],[2,22],[17,6],[21,8],[12,13],[1,13],[17,12],[16,4],[6,12],[3,11],[18,5],[11,18],[13,4],[13,3],[1,21],[19,9],[24,12],[15,2],[9,23],[9,6],[2,1],[17,3],[6,16],[5,12],[14,12],[6,18],[19,10],[14,8],[24,3],[10,4],[23,7],[15,8],[8,13],[4,8],[16,1],[15,1],[14,16],[22,21],[2,17],[25,17],[25,14],[13,13],[25,8],[1,20],[23,4],[4,13],[2,9],[11,24],[23,10],[12,10],[5,11],[5,9],[14,2],[8,6],[22,8],[21,13],[25,3],[1,18],[4,20],[2,5],[9,1],[16,14],[25,1],[17,21],[8,21],[24,21],[16,13]],
[[24,7],[19,22],[2,3],[13,4],[11,18],[4,6],[22,21],[3,6],[17,9],[19,5],[20,8],[23,13],[13,15],[18,22],[11,11],[18,13],[18,24],[16,1],[13,17],[6,13],[21,19],[6,9],[23,14],[9,14],[11,10],[18,15],[21,16],[9,6],[11,19],[15,23],[15,12],[6,7],[9,19],[7,25],[23,12],[8,4],[7,7],[3,1],[7,10],[11,3],[11,5],[16,24],[19,6],[8,24],[3,22],[10,5],[12,1],[9,10],[21,4],[18,7],[24,6],[13,19],[25,23],[17,5],[8,7],[7,5],[8,2],[12,9],[6,2],[15,1],[5,10],[13,14],[7,3],[18,2],[7,12],[25,1],[9,23],[4,19],[24,20],[6,17]],
[[20,3],[16,15],[19,6],[1,21]],
[[21,6]],
[[17,19],[25,2],[8,11],[13,25],[17,20],[2,6],[17,9],[20,25],[10,21],[1,11],[24,19],[2,13],[14,13],[23,25],[25,19],[1,3],[19,24],[20,13],[20,6],[7,10],[7,1],[5,7],[10,3],[19,11],[18,6],[7,20],[6,17]],
[[17,23],[11,11],[4,5],[5,7],[14,9],[11,8],[21,3],[22,25],[22,8],[13,11],[11,10],[9,14],[17,4],[13,3],[1,3],[12,18],[22,15],[21,11],[20,2],[8,3],[13,2],[16,22],[21,12],[5,9],[14,8],[9,23],[25,7],[16,10],[12,7],[17,10],[7,10],[6,1],[22,19],[2,22],[23,5],[6,8],[13,14],[3,16],[15,13],[2,20],[25,18],[14,13],[8,8],[5,1],[24,12],[10,24],[3,17],[6,24],[20,17],[19,10],[10,21],[13,19],[4,8],[1,2],[5,4]],
[[3,24],[17,24],[18,14],[19,6],[6,11],[21,24],[20,4],[3,3],[21,4],[16,1],[5,17],[10,19],[13,7]],
[[6,21],[23,6],[16,23],[22,11],[16,22],[19,18],[19,5],[5,16],[8,4],[5,17]],
[[18,13],[6,10],[12,17],[13,2],[1,23],[11,22],[7,2],[22,8],[12,3],[14,17],[5,24],[1,1],[3,13],[7,18],[11,2],[21,24],[22,16],[14,16],[25,14],[9,12],[14,4],[12,13],[4,24],[3,7],[19,5],[13,6],[1,14],[15,18],[18,5],[4,19],[21,6],[10,16],[3,19],[18,11],[7,25],[24,12],[22,25],[19,6],[25,21],[5,12],[12,4],[12,9],[6,12],[11,10],[11,1],[22,4],[11,17],[16,23],[19,2]],
[[1,7],[21,1],[9,17],[15,20],[18,17],[19,1],[13,3],[18,20],[19,7],[18,11],[20,23],[7,22],[13,6],[11,12],[19,24],[23,2],[20,9],[17,5],[19,5],[16,7],[11,18],[18,24],[6,24],[2,20],[14,1],[19,13]],
[[5,7],[23,10],[24,7],[20,6],[7,12],[10,2],[16,8],[7,9],[19,10],[14,14],[5,4],[16,16],[7,3],[10,8],[22,22],[18,16],[21,21],[23,8],[14,1],[21,10],[25,1],[9,12],[19,18],[25,15],[14,25],[17,13],[13,11],[5,24],[5,2],[6,14],[14,23],[11,20],[21,20],[24,12],[20,25],[12,17],[1,8],[18,22],[16,22],[8,23],[6,24],[20,17],[23,15],[14,13],[8,25],[18,14],[20,8],[13,14],[12,5],[2,25],[20,18],[6,17],[14,12],[5,10],[17,11],[16,4],[5,13],[21,1],[14,16],[11,9],[8,21],[25,23],[6,2],[7,14],[23,20],[5,25],[11,3],[25,3],[10,9],[6,18],[4,21],[19,9],[15,8],[1,11],[23,5],[4,10],[2,5],[9,2],[5,15],[17,23],[19,20],[22,9],[24,19],[13,4],[4,24],[2,9],[14,17],[10,25],[23,25],[1,16],[17,12],[25,2],[18,9],[2,12]],
[[10,23],[21,10],[3,14],[10,13],[5,7],[4,21],[17,9],[23,21],[20,22],[9,24],[6,7],[23,4],[19,9],[21,22],[18,6],[6,8],[11,20],[19,23],[6,24],[10,19],[18,23],[7,10],[23,25],[8,22],[8,10],[9,23],[7,17],[14,15],[25,19],[1,10],[20,23],[7,23],[20,19],[8,6],[7,6],[16,9],[18,14],[8,24],[21,11],[17,14],[2,3],[17,19],[22,10],[13,22],[15,11],[3,16],[4,12],[2,12],[3,5],[4,4],[22,13],[5,12],[18,18],[23,20],[16,19],[17,18],[5,24],[1,6],[5,22],[8,4],[15,19],[25,13]],
[[10,21],[15,2],[21,7],[17,5],[21,4],[23,2],[2,3],[8,22],[3,6],[25,7],[2,25],[6,6],[13,1],[18,23],[10,13],[22,15],[3,17],[10,9],[5,24],[1,3],[19,24],[22,10],[23,15],[9,18],[25,16],[13,24],[21,16],[20,2],[1,13],[21,11],[17,15],[10,8],[6,7],[24,24],[16,1],[14,17],[12,5],[9,8],[9,24],[6,4],[3,14],[8,15],[6,23],[22,18],[23,25],[10,25],[8,25],[1,16],[20,25],[13,23],[13,15],[16,17],[14,3],[20,6],[12,8],[24,1],[21,17],[5,20],[8,10],[4,22],[25,4],[6,2],[7,7],[18,20],[7,20]],
[[3,19],[21,4],[2,24],[25,10],[2,25],[21,18],[12,12],[9,9],[12,1],[7,11],[19,13],[5,17],[8,22],[3,14],[11,3],[4,25],[4,17]],
[[15,21],[23,24],[17,21],[3,16],[9,20],[10,11],[16,1],[21,21],[19,7],[18,18],[1,24],[8,13],[9,8],[25,8],[12,18],[17,14],[6,22],[4,22],[21,5],[19,24],[10,17],[1,7],[8,1],[25,9],[22,3],[23,11]],
[[15,10],[1,21],[9,10],[8,12],[20,3],[20,7],[15,13],[19,25],[1,16],[15,20],[21,7],[11,15],[14,8],[21,25],[9,25],[2,22],[10,4],[24,13],[25,4],[25,9],[18,22],[8,9],[11,18],[19,19],[14,14],[24,20],[4,24],[3,9],[16,4],[12,18],[2,25],[13,3],[24,6],[14,15],[4,22],[22,10],[9,19],[8,7],[1,18],[3,23],[19,24],[8,20],[16,13],[8,1],[9,6],[1,15],[2,16],[14,20],[15,4],[13,25],[11,8],[4,17],[13,11],[12,15],[17,22],[19,9],[15,5],[22,1],[23,25],[5,5],[13,22],[2,13],[18,4],[16,1],[17,4],[18,20],[18,24],[15,14],[8,23],[13,16],[23,15],[1,8],[6,9],[7,2],[12,23],[4,20],[25,25],[10,13],[11,20]],
[[22,1],[4,24],[18,20],[12,3],[23,22],[8,13],[19,21],[10,17],[9,12],[25,13],[10,12],[5,21],[22,4],[21,5],[21,3],[12,9],[25,7],[5,1],[7,9],[18,11],[15,15],[1,16],[16,7],[3,14],[4,3],[5,19],[25,5],[17,16],[7,17],[22,8],[18,9],[1,20],[11,4],[11,3],[6,25],[19,12],[9,7],[19,9],[14,18],[13,11],[22,23],[15,19],[21,20],[11,8],[24,24],[23,8],[13,5],[2,3],[8,15],[16,21],[12,12],[20,23],[1,15],[2,20],[8,3],[17,23],[9,11],[22,7],[4,11],[22,13],[22,9],[18,7],[11,10],[16,25],[3,9],[4,9],[7,22],[21,4],[13,20],[23,2],[22,20],[18,21],[9,19],[9,9],[14,19],[11,20],[13,23],[9,5],[20,25]],
[[19,3],[25,19],[21,3],[17,7],[14,7],[13,6],[16,2],[9,14]],
[[6,6],[12,13],[14,3]],
];



let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  // logOutLeetcode(test);
  logOutList(numberOfBoomerangs(test));
  console.timeEnd(i.toString());
  i += 1;

}

/*
[[0,0],[1,0],[2,0]]
[[12,8],[8,23],[17,14],[3,5],[24,25],[3,15],[24,4],[8,18],[2,25],[25,14],[20,11],[5,21],[22,13],[1,13],[11,11],[20,24],[7,13],[2,15],[17,7],[20,25],[21,17],[1,7],[19,16],[8,25],[22,14],[16,24],[10,7],[19,3],[18,25],[10,22],[21,2],[7,25],[10,20],[17,19],[23,16],[7,1],[16,12],[16,19],[17,18],[7,2],[1,6]]
[[8,10],[25,15],[21,18],[22,2],[3,9],[7,22],[5,7],[19,21],[25,14],[25,24],[2,6],[23,9],[9,15],[19,13],[15,13],[13,22]]
[[11,11],[12,7],[3,4],[19,16],[25,10],[25,23],[22,9],[20,17],[22,4],[24,21],[15,16],[11,5],[16,21],[6,11],[22,13],[10,10],[4,1],[5,20],[18,1],[3,25],[18,11],[20,14],[9,21],[13,22],[2,13],[17,2],[15,20],[19,20],[12,3],[16,1],[20,24],[16,23],[8,13],[25,22],[22,3],[18,12],[4,25],[2,9],[9,2],[8,15],[7,12],[13,3],[2,17],[16,9],[7,3],[6,13],[2,2],[13,12],[3,13],[15,6],[12,20],[7,6],[5,13],[1,5],[13,14],[25,19],[6,23],[3,6]]
[[3,14],[5,13],[23,9],[14,1],[21,6],[14,10],[7,23],[10,19],[3,4],[25,13],[5,23],[9,25],[22,17],[8,17],[2,15],[18,13],[14,4],[12,21],[11,3],[12,25],[22,16],[10,18],[25,10],[3,9],[21,2],[4,19],[5,1],[17,25],[25,18],[1,13],[3,3],[8,15],[23,1],[24,25],[24,24],[18,4],[16,4],[17,1],[12,9],[7,25],[22,21],[5,10],[2,2],[5,21],[15,16],[4,25],[15,12],[5,8],[9,20],[20,11],[16,8],[9,24],[24,14],[20,13],[21,10],[2,12],[16,5],[22,13],[16,23],[20,25],[8,16],[21,21],[19,24],[19,11],[18,18],[23,5],[2,7],[10,23],[17,16],[9,19],[13,3],[20,22],[14,22],[17,19],[8,18],[21,17],[12,14],[10,4],[12,15],[20,4],[24,17],[20,17],[14,24],[13,17],[10,7],[18,25],[13,21],[14,14],[22,7],[8,1],[22,25],[23,6],[23,3],[4,24]]
[[25,10],[17,22],[4,4],[7,11],[15,17],[15,9],[7,8],[11,16],[19,15],[18,10],[23,6],[6,8],[3,11],[7,7],[16,5],[16,23],[7,19],[12,2],[25,18],[6,10],[12,15],[20,7],[1,22],[10,4],[8,24],[12,10],[18,6],[1,8],[17,19],[24,11],[6,19],[8,23],[22,2],[8,14],[18,7],[4,1],[6,18]]
[[23,3],[20,21],[17,2],[3,11],[5,10],[6,18],[24,6],[18,21],[5,11],[19,1],[5,23],[15,7],[10,8],[4,6],[11,22],[17,23],[8,11],[6,14],[6,22],[14,23],[1,8],[13,24],[12,19],[10,5],[8,25],[10,20],[3,10],[12,24],[21,20],[20,2],[21,1],[7,16],[24,5],[9,12],[13,20],[13,6],[8,16],[23,22],[10,19],[5,25],[15,18],[8,20],[9,1],[21,24],[4,9],[16,10],[18,2],[13,16],[6,21],[5,5],[23,1],[7,15],[1,11],[21,18],[25,24],[9,7],[2,5],[8,10],[22,16],[6,11],[16,18],[18,4],[13,21],[3,22],[20,12],[3,23],[1,24],[18,18],[24,24],[9,18],[25,25],[19,11],[1,6],[22,5],[13,11],[15,20],[7,1],[14,25],[21,4],[9,9],[7,19],[19,4],[15,14],[2,21],[1,23],[18,11],[4,13],[9,2],[10,18],[20,23],[20,4],[1,20],[24,1],[4,8],[18,8],[18,3]]
[[20,8],[8,20],[9,22],[24,10]]
[[8,25],[23,1],[1,14],[19,20],[12,16],[21,23],[8,11],[13,10],[15,23],[5,10],[23,4],[8,12],[8,22],[3,17],[13,13],[16,16],[2,13],[18,4],[11,23],[23,8],[7,4],[14,20],[19,9],[23,20],[22,23],[5,11],[6,19],[23,6],[5,16],[11,6],[18,2],[12,20],[14,17],[11,12],[7,19],[16,3],[8,24],[10,17],[14,1],[14,12],[3,23],[19,8],[6,11],[19,18],[5,12],[6,13],[25,5],[21,25],[15,12],[24,9],[4,13],[8,4],[23,10],[18,14],[13,2],[3,6],[10,6],[14,22],[15,9],[21,15],[6,16],[20,2],[4,7],[24,15],[3,18],[16,14],[22,1],[2,20],[11,8],[13,21],[2,15],[1,7],[25,14],[15,18],[15,2]]
[[20,25],[9,11],[24,5],[10,12],[23,21],[18,15],[5,19],[21,18],[12,11],[19,18],[11,3],[22,13],[22,5],[9,18],[11,24],[9,15],[8,11],[16,12],[13,22],[20,15],[20,17],[2,23],[3,11],[7,8],[21,20],[4,6],[5,18],[25,15],[22,10],[25,23],[16,19],[2,16],[13,14],[18,16],[2,25],[8,1],[4,13],[16,11],[18,11],[3,18],[3,5],[12,5],[10,5],[6,9],[11,22],[19,17],[10,13],[12,19],[24,6],[6,13],[10,6],[1,12],[6,11],[17,11],[5,8],[7,21],[6,20],[14,18],[19,13],[18,3]]
[[23,7],[25,7],[10,17],[15,23],[12,13],[10,24],[8,12],[9,11],[1,17],[5,17],[21,19],[13,18],[23,13],[15,1],[9,10],[21,11],[1,11],[17,2],[17,17],[20,6],[14,22],[20,5],[13,6],[21,22],[5,19],[22,7],[2,17],[24,9],[22,12],[16,22],[24,24],[6,8],[5,21],[20,22],[12,15],[2,16],[18,8],[18,12],[1,10],[14,3],[18,7],[8,19],[11,4],[25,3],[11,13],[2,25],[14,20],[11,1],[2,19],[25,16],[12,24],[20,16],[22,10],[14,6]]
[[21,5],[14,5],[8,1],[6,19],[12,14],[18,15],[7,13],[9,25],[13,3],[12,11],[17,14],[25,7],[6,22],[16,9],[16,13],[13,17],[11,14],[17,19],[12,17],[16,5],[3,25],[10,17],[7,22],[18,18],[8,5],[13,10],[12,8],[20,10]]
[[7,7],[3,2],[9,19],[9,18],[25,7],[19,11],[4,18],[21,3],[8,6],[2,3],[20,11],[5,13],[3,1],[6,5],[3,14],[11,6],[5,9],[1,8],[22,15],[24,2],[25,2],[25,24],[9,11],[13,3],[24,25],[5,25],[12,15],[8,24],[9,9],[16,21],[12,10],[25,3],[10,23],[18,16],[21,4],[22,18],[4,4],[15,1],[14,7],[21,18],[6,15],[17,3],[21,9],[6,23],[20,20],[21,14],[9,4],[4,11],[6,14],[6,7],[3,13],[17,10],[15,4],[9,7],[12,9],[10,4],[3,19],[16,2],[20,22],[20,21],[22,14],[19,13],[7,22],[20,1],[20,7],[14,23],[2,16],[7,1],[25,25],[23,10],[2,11],[15,12],[6,10],[20,12],[5,21],[12,13],[11,7],[14,15],[24,17],[25,10],[23,22],[15,8],[21,22],[17,8],[1,17]]
[[6,23],[8,13],[4,7],[17,11],[7,21],[25,2],[18,12],[20,23],[16,10],[8,22],[17,20],[16,8],[15,24],[8,3],[25,4],[17,14],[20,22],[6,6],[2,10],[1,8],[13,19],[20,4],[14,6],[3,24],[11,21],[19,17],[5,4],[7,19],[11,4],[15,23],[7,15],[21,21],[18,8],[18,11],[8,12],[20,8],[25,18],[25,20],[19,12],[9,2],[17,7],[17,24],[7,22],[19,11],[7,25],[6,9],[12,11],[7,5],[12,9],[1,17],[20,20],[11,24],[12,13],[18,19],[21,5],[5,24],[1,22],[11,7],[9,21],[25,24],[5,25],[19,21],[21,22],[11,2],[6,20],[13,1],[19,16],[25,8],[11,18],[14,19],[8,15],[8,7],[7,16],[18,25],[11,11],[21,4],[21,14],[19,23],[8,16],[21,15]]
[[11,12],[13,10],[9,19],[11,22],[19,1],[10,6],[5,24],[25,5],[17,5],[15,3],[22,3]]
[[10,15],[9,25],[18,25]]
[[6,10],[4,10],[9,15],[6,6],[3,23],[23,15],[3,15],[22,13],[8,1],[9,8],[17,16],[24,4],[5,25],[21,21],[25,2],[20,6],[9,21],[17,3],[14,6],[22,20],[19,12],[14,13],[22,1],[12,1],[24,15],[15,21],[4,22],[2,13],[3,13],[25,23],[3,10],[16,19],[19,7],[24,14],[16,13],[23,25],[3,22],[6,7],[16,16],[18,11],[9,2],[17,12],[13,7],[14,4],[25,13],[25,5],[5,21],[12,3],[6,16],[18,5],[22,11],[7,15],[23,4],[25,8],[12,16],[13,6],[12,9],[25,11],[19,9],[21,2],[23,21],[10,12],[10,22],[12,11],[3,14],[7,6],[23,2],[16,25],[15,16],[11,24],[19,2],[19,20],[9,23],[11,11],[18,24],[9,24]]
[[5,25],[2,4],[3,8],[15,10],[18,5],[24,8],[3,6],[15,4],[21,17],[12,18],[1,13]]
[[24,8],[24,22],[3,17],[5,13],[1,19],[24,25],[18,8],[12,23],[6,23],[8,19],[7,3],[17,11],[9,12],[16,16],[14,25],[2,21],[22,20],[15,22],[22,7],[10,24],[11,6],[10,22],[7,10],[12,18],[16,11],[15,17],[13,8],[21,15],[3,14],[15,9],[7,16],[2,12],[8,23],[13,17],[11,11],[23,6],[24,18],[15,1],[4,12],[13,19],[17,21],[11,2],[24,20],[4,21],[19,25],[15,2],[5,6],[19,7],[4,13],[2,23],[10,1],[8,3],[22,6],[23,8],[5,20],[15,15],[20,4],[19,4],[5,1],[1,6],[7,11],[16,4],[4,9],[2,5],[8,9],[3,4]]
[[2,8],[13,18]]
[[20,7],[25,13],[13,7],[1,18],[16,6],[19,12],[17,2],[21,20],[4,19],[6,14],[7,11],[25,7],[22,21],[10,16],[5,9],[18,22],[4,13],[7,1],[5,7],[23,7],[19,13],[9,8],[22,15],[23,19],[24,4],[4,21],[11,24],[16,25],[22,10],[25,3],[14,3],[14,4]]
[[13,7],[7,10],[2,16],[25,4],[21,8],[14,17],[14,9],[4,5],[5,14],[1,25],[14,5],[14,15],[12,13],[10,1],[22,6]]
[[6,2],[24,25],[8,20],[25,3],[18,9],[24,5],[3,8],[17,20],[25,8],[6,1],[23,21]]
[[2,1],[15,11],[16,15],[21,10],[15,18],[25,11],[9,9],[7,4],[3,25],[4,15],[3,16],[13,3],[14,2],[19,19],[17,2],[23,13],[21,1],[23,7],[16,24]]
[[17,8],[14,19],[9,20],[2,12],[1,14],[7,11],[9,4],[16,23],[16,19],[20,1],[4,4],[18,15],[23,13],[5,6],[14,11],[15,18],[15,14],[15,10],[12,17],[21,14],[12,20],[15,19],[5,7],[4,12],[1,12],[3,9],[17,15],[14,10],[22,23],[24,12],[4,2],[16,13],[15,20],[25,25],[11,5]]
[[5,23],[10,7],[2,15],[11,21],[24,23],[4,5],[7,19],[10,15],[16,10],[20,5],[3,3],[8,4],[24,19],[16,11],[5,24],[14,19],[12,14],[8,6],[1,13],[23,11],[4,10],[14,25],[25,21],[18,3],[22,5],[8,11],[1,11],[13,12],[11,25],[12,5],[23,10],[4,8],[5,19],[6,17],[25,5],[5,6],[2,12],[19,8],[12,12],[17,17],[6,7],[20,23],[9,24],[18,19],[20,2],[16,23],[16,17],[19,23],[9,15],[13,21],[18,9]]
[[22,17],[18,24],[7,15],[18,11],[21,5],[10,9],[11,15],[8,24],[6,20],[24,9],[22,25],[8,19],[20,9],[1,24],[12,15],[16,5],[2,3],[4,21],[22,4],[24,21],[4,1],[21,8],[4,6],[4,7],[8,1],[23,10],[11,18],[8,22],[24,24],[20,23],[4,14],[15,2],[11,1],[6,15],[14,1],[6,16],[17,21],[9,19],[9,10],[11,22],[21,3],[20,4],[17,25],[24,13],[12,19],[5,19],[12,16],[18,4],[14,21],[20,14],[7,19],[14,3],[1,23],[23,11],[16,18],[22,10],[8,15],[1,8],[6,3],[25,10],[2,4],[6,7],[9,16],[4,20],[2,16],[9,3],[17,9],[7,22],[21,14],[22,5],[18,5],[14,5],[19,22],[13,24],[11,21],[6,8],[16,12],[10,1],[5,7],[6,25],[25,9],[12,4],[15,6],[1,1],[4,22],[17,8],[10,13],[9,1],[7,24],[4,23],[5,21],[23,24],[2,10],[25,3],[23,22],[4,25],[9,6],[3,20],[7,17],[10,25]]
[[15,17],[8,18],[11,9],[7,14],[1,19],[22,23],[9,21],[24,3],[22,21],[8,10],[19,8],[2,4],[7,16],[5,19],[22,25],[5,5],[21,15],[12,20],[19,2],[24,12],[10,5],[23,21],[22,10],[12,2],[24,14],[14,21],[3,7],[18,10],[17,24],[8,20],[9,25],[10,22],[11,17],[19,9],[3,17],[14,8],[18,24],[13,14],[18,15],[7,15],[9,8],[15,18],[25,1],[3,2],[11,22],[23,22],[10,11],[23,24],[1,12],[12,12],[3,18],[24,11],[12,7],[13,22],[15,20],[9,1],[18,6],[14,15],[10,3],[6,11],[13,9],[8,25],[24,20],[16,23],[4,3],[2,18],[23,13],[7,20],[24,2],[19,12],[12,1],[15,12],[9,12],[20,22],[16,17],[13,7],[15,13],[20,15],[9,5],[9,13],[22,2],[20,21],[17,17],[17,16],[15,4],[21,4],[25,4],[9,3],[5,6],[11,21],[1,16],[10,9],[2,24],[7,25],[5,4],[16,13],[6,16]]
[[14,11],[11,21],[14,21],[16,2],[3,5],[8,20],[14,14],[12,20],[14,20],[16,19],[3,14],[18,2],[4,25],[3,7],[8,2],[4,3],[23,3],[23,22],[12,14],[25,9],[16,12],[17,18],[4,2],[22,1],[8,22],[7,11],[7,13],[22,13],[22,15],[15,23],[19,21],[24,13],[12,17],[6,12],[20,1],[17,11],[22,9],[2,15],[5,25],[3,16],[16,21],[19,4],[21,9],[9,11],[2,11],[25,20],[10,6],[12,7],[24,6],[18,20],[7,14],[6,21],[4,21],[8,25],[15,1],[20,14],[20,10],[11,22],[19,11],[20,20],[19,6],[18,8],[14,23],[24,12],[5,7],[17,17],[18,3],[10,24],[19,16],[17,24],[16,13],[12,18]]
[[9,1],[14,15],[24,24],[18,23],[25,19],[6,17],[2,8],[16,4],[18,1],[21,24],[17,1],[14,5],[13,18],[9,23],[21,23],[10,8],[13,25],[5,18],[14,17],[18,17],[20,9],[17,6],[21,19],[12,22],[9,3],[20,11],[24,16],[1,21],[7,4],[10,4],[7,10],[9,11]]
[[17,17],[20,21],[19,16],[22,4],[7,14],[2,16],[24,25],[25,21],[10,9],[7,18],[11,18],[8,17],[6,17],[23,8],[12,2],[8,23],[12,23],[25,23],[7,17],[25,22],[12,19],[12,24],[2,12],[4,7],[21,15],[21,17],[14,7],[8,18],[25,25],[12,18],[14,20],[3,3],[11,8],[21,11],[3,5],[15,25],[8,20],[9,14],[9,10],[25,11],[21,14],[3,20],[24,15],[23,16],[8,12],[6,8],[18,12],[25,12],[16,25],[10,18],[23,3],[22,13],[20,20],[15,20],[6,2],[19,4],[15,7],[19,11],[6,19],[22,11],[19,17],[17,20],[14,25],[21,24],[4,15],[17,16],[2,11],[23,14],[21,22],[3,17],[25,15],[25,1],[3,13],[3,2],[13,2],[13,5],[25,17],[9,12],[13,24],[12,16],[9,1],[16,14],[16,4],[2,18],[14,19],[10,13],[14,13]]
[[11,25],[14,10],[16,5],[18,9],[10,5],[23,25],[3,13],[18,3],[8,14],[11,5],[1,16],[8,20],[1,10],[1,12],[15,4],[6,16],[23,24],[3,3],[9,11],[1,6],[6,18],[17,22],[5,6],[22,7],[20,12],[3,14],[25,20],[6,21],[12,16],[1,24],[6,2],[12,17],[19,14],[23,14],[19,5],[5,21],[22,1],[24,3],[4,9],[24,2],[11,16],[8,22],[6,4],[10,7],[6,8],[15,23],[1,18],[15,21],[22,22],[16,13],[19,10],[18,2],[13,9],[11,12],[6,17],[4,4],[5,12],[23,6],[24,22],[7,10],[2,10],[4,1],[6,3],[23,8],[25,10],[21,18],[6,1],[1,17],[15,2],[7,1],[22,21],[9,15],[21,11],[22,5],[22,17],[11,23],[15,22],[16,18],[8,3],[13,1],[19,1],[13,23],[10,11],[21,10],[18,18],[25,12]]
[[7,25],[23,19],[6,17],[9,15],[21,7],[2,22],[17,6],[21,8],[12,13],[1,13],[17,12],[16,4],[6,12],[3,11],[18,5],[11,18],[13,4],[13,3],[1,21],[19,9],[24,12],[15,2],[9,23],[9,6],[2,1],[17,3],[6,16],[5,12],[14,12],[6,18],[19,10],[14,8],[24,3],[10,4],[23,7],[15,8],[8,13],[4,8],[16,1],[15,1],[14,16],[22,21],[2,17],[25,17],[25,14],[13,13],[25,8],[1,20],[23,4],[4,13],[2,9],[11,24],[23,10],[12,10],[5,11],[5,9],[14,2],[8,6],[22,8],[21,13],[25,3],[1,18],[4,20],[2,5],[9,1],[16,14],[25,1],[17,21],[8,21],[24,21],[16,13]]
[[24,7],[19,22],[2,3],[13,4],[11,18],[4,6],[22,21],[3,6],[17,9],[19,5],[20,8],[23,13],[13,15],[18,22],[11,11],[18,13],[18,24],[16,1],[13,17],[6,13],[21,19],[6,9],[23,14],[9,14],[11,10],[18,15],[21,16],[9,6],[11,19],[15,23],[15,12],[6,7],[9,19],[7,25],[23,12],[8,4],[7,7],[3,1],[7,10],[11,3],[11,5],[16,24],[19,6],[8,24],[3,22],[10,5],[12,1],[9,10],[21,4],[18,7],[24,6],[13,19],[25,23],[17,5],[8,7],[7,5],[8,2],[12,9],[6,2],[15,1],[5,10],[13,14],[7,3],[18,2],[7,12],[25,1],[9,23],[4,19],[24,20],[6,17]]
[[20,3],[16,15],[19,6],[1,21]]
[[21,6]]
[[17,19],[25,2],[8,11],[13,25],[17,20],[2,6],[17,9],[20,25],[10,21],[1,11],[24,19],[2,13],[14,13],[23,25],[25,19],[1,3],[19,24],[20,13],[20,6],[7,10],[7,1],[5,7],[10,3],[19,11],[18,6],[7,20],[6,17]]
[[17,23],[11,11],[4,5],[5,7],[14,9],[11,8],[21,3],[22,25],[22,8],[13,11],[11,10],[9,14],[17,4],[13,3],[1,3],[12,18],[22,15],[21,11],[20,2],[8,3],[13,2],[16,22],[21,12],[5,9],[14,8],[9,23],[25,7],[16,10],[12,7],[17,10],[7,10],[6,1],[22,19],[2,22],[23,5],[6,8],[13,14],[3,16],[15,13],[2,20],[25,18],[14,13],[8,8],[5,1],[24,12],[10,24],[3,17],[6,24],[20,17],[19,10],[10,21],[13,19],[4,8],[1,2],[5,4]]
[[3,24],[17,24],[18,14],[19,6],[6,11],[21,24],[20,4],[3,3],[21,4],[16,1],[5,17],[10,19],[13,7]]
[[6,21],[23,6],[16,23],[22,11],[16,22],[19,18],[19,5],[5,16],[8,4],[5,17]]
[[18,13],[6,10],[12,17],[13,2],[1,23],[11,22],[7,2],[22,8],[12,3],[14,17],[5,24],[1,1],[3,13],[7,18],[11,2],[21,24],[22,16],[14,16],[25,14],[9,12],[14,4],[12,13],[4,24],[3,7],[19,5],[13,6],[1,14],[15,18],[18,5],[4,19],[21,6],[10,16],[3,19],[18,11],[7,25],[24,12],[22,25],[19,6],[25,21],[5,12],[12,4],[12,9],[6,12],[11,10],[11,1],[22,4],[11,17],[16,23],[19,2]]
[[1,7],[21,1],[9,17],[15,20],[18,17],[19,1],[13,3],[18,20],[19,7],[18,11],[20,23],[7,22],[13,6],[11,12],[19,24],[23,2],[20,9],[17,5],[19,5],[16,7],[11,18],[18,24],[6,24],[2,20],[14,1],[19,13]]
[[5,7],[23,10],[24,7],[20,6],[7,12],[10,2],[16,8],[7,9],[19,10],[14,14],[5,4],[16,16],[7,3],[10,8],[22,22],[18,16],[21,21],[23,8],[14,1],[21,10],[25,1],[9,12],[19,18],[25,15],[14,25],[17,13],[13,11],[5,24],[5,2],[6,14],[14,23],[11,20],[21,20],[24,12],[20,25],[12,17],[1,8],[18,22],[16,22],[8,23],[6,24],[20,17],[23,15],[14,13],[8,25],[18,14],[20,8],[13,14],[12,5],[2,25],[20,18],[6,17],[14,12],[5,10],[17,11],[16,4],[5,13],[21,1],[14,16],[11,9],[8,21],[25,23],[6,2],[7,14],[23,20],[5,25],[11,3],[25,3],[10,9],[6,18],[4,21],[19,9],[15,8],[1,11],[23,5],[4,10],[2,5],[9,2],[5,15],[17,23],[19,20],[22,9],[24,19],[13,4],[4,24],[2,9],[14,17],[10,25],[23,25],[1,16],[17,12],[25,2],[18,9],[2,12]]
[[10,23],[21,10],[3,14],[10,13],[5,7],[4,21],[17,9],[23,21],[20,22],[9,24],[6,7],[23,4],[19,9],[21,22],[18,6],[6,8],[11,20],[19,23],[6,24],[10,19],[18,23],[7,10],[23,25],[8,22],[8,10],[9,23],[7,17],[14,15],[25,19],[1,10],[20,23],[7,23],[20,19],[8,6],[7,6],[16,9],[18,14],[8,24],[21,11],[17,14],[2,3],[17,19],[22,10],[13,22],[15,11],[3,16],[4,12],[2,12],[3,5],[4,4],[22,13],[5,12],[18,18],[23,20],[16,19],[17,18],[5,24],[1,6],[5,22],[8,4],[15,19],[25,13]]
[[10,21],[15,2],[21,7],[17,5],[21,4],[23,2],[2,3],[8,22],[3,6],[25,7],[2,25],[6,6],[13,1],[18,23],[10,13],[22,15],[3,17],[10,9],[5,24],[1,3],[19,24],[22,10],[23,15],[9,18],[25,16],[13,24],[21,16],[20,2],[1,13],[21,11],[17,15],[10,8],[6,7],[24,24],[16,1],[14,17],[12,5],[9,8],[9,24],[6,4],[3,14],[8,15],[6,23],[22,18],[23,25],[10,25],[8,25],[1,16],[20,25],[13,23],[13,15],[16,17],[14,3],[20,6],[12,8],[24,1],[21,17],[5,20],[8,10],[4,22],[25,4],[6,2],[7,7],[18,20],[7,20]]
[[3,19],[21,4],[2,24],[25,10],[2,25],[21,18],[12,12],[9,9],[12,1],[7,11],[19,13],[5,17],[8,22],[3,14],[11,3],[4,25],[4,17]]
[[15,21],[23,24],[17,21],[3,16],[9,20],[10,11],[16,1],[21,21],[19,7],[18,18],[1,24],[8,13],[9,8],[25,8],[12,18],[17,14],[6,22],[4,22],[21,5],[19,24],[10,17],[1,7],[8,1],[25,9],[22,3],[23,11]]
[[15,10],[1,21],[9,10],[8,12],[20,3],[20,7],[15,13],[19,25],[1,16],[15,20],[21,7],[11,15],[14,8],[21,25],[9,25],[2,22],[10,4],[24,13],[25,4],[25,9],[18,22],[8,9],[11,18],[19,19],[14,14],[24,20],[4,24],[3,9],[16,4],[12,18],[2,25],[13,3],[24,6],[14,15],[4,22],[22,10],[9,19],[8,7],[1,18],[3,23],[19,24],[8,20],[16,13],[8,1],[9,6],[1,15],[2,16],[14,20],[15,4],[13,25],[11,8],[4,17],[13,11],[12,15],[17,22],[19,9],[15,5],[22,1],[23,25],[5,5],[13,22],[2,13],[18,4],[16,1],[17,4],[18,20],[18,24],[15,14],[8,23],[13,16],[23,15],[1,8],[6,9],[7,2],[12,23],[4,20],[25,25],[10,13],[11,20]]
[[22,1],[4,24],[18,20],[12,3],[23,22],[8,13],[19,21],[10,17],[9,12],[25,13],[10,12],[5,21],[22,4],[21,5],[21,3],[12,9],[25,7],[5,1],[7,9],[18,11],[15,15],[1,16],[16,7],[3,14],[4,3],[5,19],[25,5],[17,16],[7,17],[22,8],[18,9],[1,20],[11,4],[11,3],[6,25],[19,12],[9,7],[19,9],[14,18],[13,11],[22,23],[15,19],[21,20],[11,8],[24,24],[23,8],[13,5],[2,3],[8,15],[16,21],[12,12],[20,23],[1,15],[2,20],[8,3],[17,23],[9,11],[22,7],[4,11],[22,13],[22,9],[18,7],[11,10],[16,25],[3,9],[4,9],[7,22],[21,4],[13,20],[23,2],[22,20],[18,21],[9,19],[9,9],[14,19],[11,20],[13,23],[9,5],[20,25]]
[[19,3],[25,19],[21,3],[17,7],[14,7],[13,6],[16,2],[9,14]]
[[6,6],[12,13],[14,3]]
*/