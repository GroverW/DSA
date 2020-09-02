class Heap {
  constructor(comparator) {
    this.comparator = comparator;
    this.list = []
  }

  push(val) {
    this.list.push(val);
    if (this.list.length > 1) this.siftUp(this.list);
  }

  siftUp(arr) {
    let curr = arr.length - 1;


    while (true) {
      const parent = Math.ceil(curr / 2) - 1;
      let next;

      if (this.comparator(arr[curr], arr[parent])) next = parent;

      if (next !== undefined) {
        [arr[next], arr[curr]] = [arr[curr], arr[next]];
        curr = next;
      } else {
        break;
      }
    }
  }

  pop() {
    const arr = this.list;
    [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
    const val = arr.pop();
    this.siftDown(arr);
    return val;
  }

  siftDown(arr) {
    let curr = 0;

    while (true) {
      const left = curr * 2 + 1;
      const right = left + 1;
      let next = curr;

      if (this.comparator(arr[next], arr[left])) next = left;
      if (this.comparator(arr[next], arr[right])) next = right;

      if (next !== curr) {
        [arr[next], arr[curr]] = [arr[curr], arr[next]];
        curr = next;
      } else {
        break;
      }
    }
  }

  peak() {
    return this.list[0] || 0;
  }

  size() {
    return this.list.length;
  }
}

export default Heap;