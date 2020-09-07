/*
There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w.

Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.

Example 1:
Input:
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
Output: 200
Explanation:
The graph looks like this:


The cheapest price from city 0 to city 2 with at most 1 stop costs 200, as marked red in the picture.
Example 2:
Input:
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0
Output: 500
Explanation:
The graph looks like this:


The cheapest price from city 0 to city 2 with at most 0 stop costs 500, as marked blue in the picture.


Constraints:

The number of nodes n will be in range [1, 100], with nodes labeled from 0 to n - 1.
The size of flights will be in range [0, n * (n - 1) / 2].
The format of each flight will be (src, dst, price).
The price of each flight will be in the range [1, 10000].
k is in the range of [0, n - 1].
There will not be any duplicated flights or self cycles.
*/

// DFS ~280-300 ms
var findCheapestPrice = function (n, flights, src, dst, K) {
  const graph = new Array(n).fill(null).map(() => []);
  for (let [from, to, cost] of flights) graph[from].push([to, cost]);
  let minPrice = Infinity;

  const search = (node, cost, stops) => {
    if (stops > K || cost > minPrice) return;
    if (node === dst) {
      minPrice = Math.min(minPrice, cost);
      return;
    }

    for (let [to, price] of graph[node]) {
      search(to, cost + price, stops + 1);
    }
  }

  search(src, 0, -1)

  return minPrice === Infinity ? -1 : minPrice;
};

// HEAP ~ 180ms
var findCheapestPrice = function (n, flights, src, dst, K) {
  const graph = new Array(n).fill(null).map(() => []);
  for (let [from, to, cost] of flights) graph[from].push([to, cost]);
  let minCost = Infinity;

  const queue = [[src, 0, -1]]

  while (queue.length) {
    const [from, cost, stops] = pop(queue);

    if(from === dst) {
      minCost = Math.min(minCost, cost);
      continue;
    }
    if (cost > minCost || stops >= K) continue;

    for(let [to, price] of graph[from]) {
      push([to, cost + price, stops + 1], queue);
    }
  }

  return minCost === Infinity ? -1 : minCost;
};

const push = (node, heap) => {
  heap.push(node);
  siftUp(heap);
}

const pop = (heap) => {
  const last = heap.length - 1;
  [heap[0], heap[last]] = [heap[last], heap[0]];
  const node = heap.pop();
  siftDown(0, heap);
  return node;
}

const siftUp = (heap) => {
  let curr = heap.length - 1;
  while (curr > 0) {
    const parent = Math.ceil(curr / 2) - 1;
    if (heap[parent][1] > heap[curr][1]) {
      [heap[curr], heap[parent]] = [heap[parent], heap[curr]];
      curr = parent;
    } else break;
  }
}

const siftDown = (start, heap) => {
  let curr = start;
  while (true) {
    const left = curr * 2 + 1;
    const right = left + 1;
    let next = curr;
    if (heap[left] && heap[next][1] > heap[left][1]) next = left;
    if (heap[right] && heap[next][1] > heap[right][1]) next = right;
    if (next !== curr) {
      [heap[curr], heap[next]] = [heap[next], heap[curr]];
      curr = next;
    } else break;
  }
}

// SUPER CLEVER!! ~80-90ms
var findCheapestPrice = function (n, flights, src, dst, K) {
  const costs = new Array(n).fill(Infinity);
  costs[src] = 0;

  for(let i = 0; i <= K; i += 1) {
    const nextCosts = [...costs];
    for(let [from, to, price] of flights) {
      nextCosts[to] = Math.min(nextCosts[to], costs[from] + price);
    }
    costs = nextCosts;
  }

  return costs[dst] === Infinity ? -1 : costs[dst];
};