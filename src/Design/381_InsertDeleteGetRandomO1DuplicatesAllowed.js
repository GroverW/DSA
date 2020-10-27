/*
Design a data structure that supports all following operations in average O(1) time.

Note: Duplicate elements are allowed.
insert(val): Inserts an item val to the collection.
remove(val): Removes an item val from the collection if present.
getRandom: Returns a random element from current collection of elements. The probability of each element being returned is linearly related to the number of same value the collection contains.
Example:

// Init an empty collection.
RandomizedCollection collection = new RandomizedCollection();

// Inserts 1 to the collection. Returns true as the collection did not contain 1.
collection.insert(1);

// Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
collection.insert(1);

// Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
collection.insert(2);

// getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
collection.getRandom();

// Removes 1 from the collection, returns true. Collection now contains [1,2].
collection.remove(1);

// getRandom should return 1 and 2 both equally likely.
collection.getRandom();
*/

var RandomizedCollection = function () {
  this.nums = [];
  this.lookups = {};
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function (val) {
  this.nums.push(val);
  this.lookups[val] = this.lookups[val] || new Map();
  const lookup = this.lookups[val];
  const next = lookup.size + 2;
  const index = this.nums.length - 1;
  lookup.set(-next, index);
  lookup.set(index, -next);
  return lookup.size === 2;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function (val) {
  const lookup = this.lookups[val];
  if (!lookup || !lookup.size) return false;
  const last = this.nums.length - 1;
  const index = lookup.get(-lookup.size);
  const list = this.nums;

  if (last !== index) {
    const lastVal = list[last];
    const updated = this.lookups[lastVal];

    [list[last], list[index]] = [list[index], list[last]];

    const lastSize = updated.get(last);
    updated.delete(last);
    updated.set(index, lastSize);
    updated.set(lastSize, index);
  }

  lookup.delete(-lookup.size);
  lookup.delete(index);
  list.pop();
  return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function () {
  const val = Math.floor(Math.random() * this.nums.length);
  return this.nums[val];
};

const tests = [
  [
    ["RandomizedCollection", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"],
    [[], [1], [2], [2], [], [1], [2], []],
  ],
  [
    ["RandomizedCollection", "insert", "insert", "insert", "insert", "insert", "insert", "remove", "remove", "remove", "remove", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"],
    [[], [1], [1], [2], [1], [2], [2], [1], [2], [2], [2], [], [], [], [], [], [], [], [], [], []],
  ],
];

for (let test of tests) {
  let randomizedCollection;
  for (let i = 0; i < test[0].length; i += 1) {
    const command = test[0][i];
    const val = test[1][i];
    if (command === "RandomizedCollection") randomizedCollection = new RandomizedCollection();
    else logOutList(randomizedCollection[command](...val));
  }
}