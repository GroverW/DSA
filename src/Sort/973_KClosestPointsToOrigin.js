/*

*/

//METHOD 1 O(N log K)
var kClosest = function (points, K) {
  const distances = new Array(points.length)
    .fill(null)
    .map((_, i) => [
      i,
      Math.sqrt(Math.abs(points[i][0]) ** 2 + Math.abs(points[i][1]) ** 2)
    ]
    );

  heapify(distances);

  const kClosest = [];
  let i = 0;
  while (distances.length && i < K) {
    kClosest.push(points[pop(distances)]);
    i += 1;
  }

  return kClosest;
};

const heapify = (arr) => {
  const start = Math.floor(arr.length / 2) - 1;
  for (let i = start; i >= 0; i -= 1) {
    siftDown(i, arr);
  }
}

const pop = (arr) => {
  const last = arr.length - 1;
  [arr[0], arr[last]] = [arr[last], arr[0]];
  const res = arr.pop()[0];
  siftDown(0, arr);
  return res;
}

const siftDown = (start, arr) => {
  let curr = start;
  while (true) {
    const leftChild = curr * 2 + 1;
    const rightChild = leftChild + 1;
    let next = curr;

    if (arr[leftChild] && arr[next][1] > arr[leftChild][1]) next = leftChild;
    if (arr[rightChild] && arr[next][1] > arr[rightChild][1]) next = rightChild;

    if (next !== curr) {
      [arr[curr], arr[next]] = [arr[next], arr[curr]];
      curr = next;
    } else {
      break;
    }
  }
}

//METHOD 2 O(N log N)
var kClosest = function (points, K) {
  const distances = new Array(points.length)
    .fill(null)
    .map((_, i) => [
      i,
      Math.sqrt(Math.abs(points[i][0]) ** 2 + Math.abs(points[i][1]) ** 2)
    ]
    ).sort((a, b) => a[1] - b[1]);

  return distances.slice(0,K).map((d) => points[d[0]]);
};

// OR

var kClosest = function (points, K) {
  return points.sort((a, b) => {
      return (
          Math.sqrt(Math.abs(a[0] ** 2) + Math.abs(a[1] ** 2))
          - Math.sqrt(Math.abs(b[0] ** 2) + Math.abs(b[1] ** 2))
      )
  }).slice(0, K);
};