export default class Heap<T> {
  list: T[];
  comparator: Function;

  constructor(comparator: Function, list = []) {
    this.comparator = comparator;
    this.list = list;
    this.heapify();
  }

  heapify(): void {
    const start: number = Math.floor(this.list.length / 2) - 1;
    for (let i = start; i >= 0; i -= 1) {
      this.siftDown(i);
    }
  }

  push(val: T): void {
    this.list.push(val);
    this.siftUp();
  }

  siftUp(): void {
    let current: number = this.list.length - 1;

    while (current > 0) {
      const parent: number = Math.ceil(current / 2) - 1;

      if (this.comparator(this.list[current], this.list[parent])) {
        [this.list[current], this.list[parent]] = [this.list[parent], this.list[current]];
        current = parent;
      } else {
        break;
      }
    }
  }

  pop(): T | null {
    if (!this.list.length) {
      return null;
    }
    const last: number = this.list.length - 1;
    [this.list[0], this.list[last]] = [this.list[last], this.list[0]];
    const result: T = this.list.pop()!;
    this.siftDown();
    return result;
  }

  siftDown(start = 0): void {
    let current: number = start;

    while (true) {
      const left: number = current * 2 + 1;
      const right: number = left + 1;
      let next: number = current;

      if (this.list[left] && this.comparator(this.list[left], this.list[next])) next = left;
      if (this.list[right] && this.comparator(this.list[right], this.list[next])) next = right;

      if (next !== current) {
        [this.list[current], this.list[next]] = [this.list[next], this.list[current]];
        current = next;
      } else {
        break;
      }
    }
  }

  peak(): T | null {
    return this.list[0] || null;
  }

  size(): number {
    return this.list.length;
  }
}
