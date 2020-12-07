const fs = require('fs');

const countBagColorsContainingShinyGold = (rules) => {
  const containedList = rules.reduce((contained, rule) => {
    const [containingBag, ...containedBags] = rule;
    containedBags.forEach((bag) => {
      contained[bag] = contained[bag] || [];
      contained[bag].push(containingBag);
    })
    return contained;
  }, {});

  // console.log(containedList)

  const start = 'shiny gold bags';
  const queue = [start];
  const visited = new Set([start]);

  let count = 0;
  while (queue.length) {
    const currentBag = queue.shift();

    const bagList = containedList[currentBag] || [];
    for (let bag of bagList) {
      if (visited.has(bag)) continue;

      visited.add(bag);
      queue.push(bag);
      count += 1;
    }
  }

  return count;
}

const countBagsInShinyGold = (rules) => {
  const containingList = rules.reduce((containing, rule) => {
    const [containingBag, ...containedBags] = rule;
    containing[containingBag] = [];
    containedBags.forEach((bagRule) => {
      containing[containingBag].push(bagRule);
    })
    return containing;
  }, {});

  const start = 'shiny gold bags';
  const queue = [[1, start]];
  let totalCount = 0;

  // console.log(containingList)


  while (queue.length) {
    const [currentCount, currentBag] = queue.shift();

    const bagList = containingList[currentBag] || [];

    console.log(currentCount, currentBag, bagList);
    totalCount += currentCount;

    for (let [count, bag] of bagList) {
      queue.push([currentCount * count, bag]);
    }
  }

  return totalCount - 1;
}

const getBagNames = (rules) => rules.map((rule) => {
  const [containing, contained] = rule.split(' contain ');
  const removedPeriod = contained.slice(0, contained.length - 1);
  if (removedPeriod === 'no other bags') return [containing];
  const containedBags = removedPeriod
    .split(', ')
    .map((bag) => {
      const last = bag[bag.length - 1] === 's' ? '' : 's';
      return bag.slice(bag.indexOf(' ') + 1) + last
    })
  return [containing, ...containedBags];
});

const getBagCounts = (rules) => rules.map((rule) => {
  const [containing, contained] = rule.split(' contain ');
  const removedPeriod = contained.slice(0, contained.length - 1);
  if (removedPeriod === 'no other bags') return [containing];
  const containedBags = removedPeriod
    .split(', ')
    .map((bag) => {
      const last = bag[bag.length - 1] === 's' ? '' : 's';
      const count = +bag[0];
      return [count, bag.slice(bag.indexOf(' ') + 1) + last];
    })
  return [containing, ...containedBags];
});

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const rules = data.split('\r\n');
  const parsed = getBagCounts(rules)
  // console.log(parsed);
  console.log(countBagsInShinyGold(parsed));
});