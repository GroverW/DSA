/*
Given the array orders, which represents the orders that customers have done in a restaurant. More specifically orders[i]=[customerNamei,tableNumberi,foodItemi] where customerNamei is the name of the customer, tableNumberi is the table customer sit at, and foodItemi is the item customer orders.

Return the restaurant's “display table”. The “display table” is a table whose row entries denote how many of each food item each table ordered. The first column is the table number and the remaining columns correspond to each food item in alphabetical order. The first row should be a header whose first column is “Table”, followed by the names of the food items. Note that the customer names are not part of the table. Additionally, the rows should be sorted in numerically increasing order.

 

Example 1:

Input: orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
Output: [["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","2","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]] 
Explanation:
The displaying table looks like:
Table,Beef Burrito,Ceviche,Fried Chicken,Water
3    ,0           ,2      ,1            ,0
5    ,0           ,1      ,0            ,1
10   ,1           ,0      ,0            ,0
For the table 3: David orders "Ceviche" and "Fried Chicken", and Rous orders "Ceviche".
For the table 5: Carla orders "Water" and "Ceviche".
For the table 10: Corina orders "Beef Burrito". 
Example 2:

Input: orders = [["James","12","Fried Chicken"],["Ratesh","12","Fried Chicken"],["Amadeus","12","Fried Chicken"],["Adam","1","Canadian Waffles"],["Brianna","1","Canadian Waffles"]]
Output: [["Table","Canadian Waffles","Fried Chicken"],["1","2","0"],["12","0","3"]] 
Explanation: 
For the table 1: Adam and Brianna order "Canadian Waffles".
For the table 12: James, Ratesh and Amadeus order "Fried Chicken".
Example 3:

Input: orders = [["Laura","2","Bean Burrito"],["Jhon","2","Beef Burrito"],["Melissa","2","Soda"]]
Output: [["Table","Bean Burrito","Beef Burrito","Soda"],["2","1","1","1"]]
 

Constraints:

1 <= orders.length <= 5 * 10^4
orders[i].length == 3
1 <= customerNamei.length, foodItemi.length <= 20
customerNamei and foodItemi consist of lowercase and uppercase English letters and the space character.
tableNumberi is a valid integer between 1 and 500.
*/


function displayTable(orders: string[][]): string[][] {
  orders.sort((a, b) => {
    if(a[2] < b[2]) return -1;
    if(a[2] > b[2]) return 1;
    return +a[1] - +b[1];
  });
  
  const tableLookup = orders.reduce((list, [_, table]) => list.add(table), new Set());
  const dishLookup = orders.reduce((list, [_, __, dish]) => list.add(dish), new Set());
  const tables = [...tableLookup].sort((a, b) => +a - +b);
  const dishes = [...dishLookup].sort();
  const orderTable = [
    ["Table", ...dishes],
    ...tables.map((table) => [table, ...new Array(dishes.length).fill('0')]),
  ];
  
  let currentTable = 1;
  let currentOrder = 1;
  for (let [_, table, order] of orders) {
    if (order !== orderTable[0][currentOrder]) {
      currentOrder += 1;
      currentTable = 1;
    }
    
    while (orderTable[currentTable][0] !== table) currentTable += 1;
    
    orderTable[currentTable][currentOrder] = (+orderTable[currentTable][currentOrder] + 1).toString();
  }
  
  return orderTable;
};


const maxLen: number = 200;

const getRandomDish = (size) => {
  let dish = '';
  for(let i = 0; i < size; i += 1) {
    dish += randomLetter({});
  }
  return dish;
}

for (let i = 0; i < 50; i += 1) {
  const len = numberBetween(1, maxLen);
  const numTables = numberBetween(1, Math.min(20, len));
  const numDishes = numberBetween(1, Math.min(20, len));
  const tables = ['1'];
  const dishes = [];

  for(let i = 0; i < numTables; i += 1) {
    const lastTable = +tables[tables.length - 1];
    const table = numberBetween(lastTable + 1, lastTable + 20);
    tables.push(table.toString());
  }
  for(let i = 0; i < numDishes; i += 1) {
    const dish = getRandomDish(numberBetween(1, 20));
    dishes.push(dish);
  }

  const orders = new Array(len).fill(0)
    .map(() => ['a', randomOption(tables), randomOption(dishes)]);


  // logOutList('"' + ip + '"')
  // logOutList(printRow([houses, costs, len, numColors, target]) + ',')
  // logOutList(printRow([s, t]) + ',');
  logOutList(printRow(orders));
  // logOutLeetcode([serialized, val, depth])
}


const tests: Indexable<any>[] = [
  [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
];

let i: number = 0;
for (let test of tests) {
  console.time(i.toString());
  // logOutLeetcode(test);
  logOutList(displayTable(test));
  console.timeEnd(i.toString());
  i += 1;

}