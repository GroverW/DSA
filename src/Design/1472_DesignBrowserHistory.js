/*
You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.

Implement the BrowserHistory class:

BrowserHistory(string homepage) Initializes the object with the homepage of the browser.
void visit(string url) Visits url from the current page. It clears up all the forward history.
string back(int steps) Move steps back in history. If you can only return x steps in the history and steps > x, you will return only x steps. Return the current url after moving back in history at most steps.
string forward(int steps) Move steps forward in history. If you can only forward x steps in the history and steps > x, you will forward only x steps. Return the current url after forwarding in history at most steps.
 

Example:

Input:
["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]
[["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
Output:
[null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]

Explanation:
BrowserHistory browserHistory = new BrowserHistory("leetcode.com");
browserHistory.visit("google.com");       // You are in "leetcode.com". Visit "google.com"
browserHistory.visit("facebook.com");     // You are in "google.com". Visit "facebook.com"
browserHistory.visit("youtube.com");      // You are in "facebook.com". Visit "youtube.com"
browserHistory.back(1);                   // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
browserHistory.back(1);                   // You are in "facebook.com", move back to "google.com" return "google.com"
browserHistory.forward(1);                // You are in "google.com", move forward to "facebook.com" return "facebook.com"
browserHistory.visit("linkedin.com");     // You are in "facebook.com". Visit "linkedin.com"
browserHistory.forward(2);                // You are in "linkedin.com", you cannot move forward any steps.
browserHistory.back(2);                   // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
browserHistory.back(7);                   // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com"
 

Constraints:

1 <= homepage.length <= 20
1 <= url.length <= 20
1 <= steps <= 100
homepage and url consist of  '.' or lower case English letters.
At most 5000 calls will be made to visit, back, and forward.

*/

var BrowserHistory = function(homepage) {
  this.history = [homepage];
this.position = 0;
this.head = 0;
};

/** 
* @param {string} url
* @return {void}
*/
BrowserHistory.prototype.visit = function(url) {
this.position += 1;
this.head = this.position;
if (this.head < this.history.length) {
  this.history[this.head] = url;
} else {
  this.history.push(url);
}
};

/** 
* @param {number} steps
* @return {string}
*/
BrowserHistory.prototype.back = function(steps) {
this.position = Math.max(0, this.position - steps);
return this.history[this.position];
};

/** 
* @param {number} steps
* @return {string}
*/
BrowserHistory.prototype.forward = function(steps) {
this.position = Math.min(this.head, this.position + steps);
return this.history[this.position];
};

/** 
* Your BrowserHistory object will be instantiated and called as such:
* var obj = new BrowserHistory(homepage)
* obj.visit(url)
* var param_2 = obj.back(steps)
* var param_3 = obj.forward(steps)
*/

/*

*/

// const maxLen = 50;
// const sites = ['google.com', 'yahoo.com', 'twitter.com', 'facebook.com', 'leetcode.com', 'youtube.com', 'reddit.com', 'gmail.com', 'docs.google.com', 'amazon.com'];
// for (let i = 0; i < 25; i += 1) {
//   const len = numberBetween(1, maxLen);
  
//   const options = ['visit', 'visit', 'back', 'forward'];

//   const commands = ['BrowserHistory'];
//   const actions = [['google.com']];
  
//   let currentPosition = 1;
//   let maxPosition = 1;

//   for(let j = 0; j < len; j += 1) {
//     const option = randomOption(options);

//     if (option === 'visit') {
//       const site = randomOption(sites);
//       actions.push([site]);
//       currentPosition += 1;
//       maxPosition = currentPosition;
//     } else if (option === 'back') {
//       const steps = numberBetween(1, currentPosition + 1);
//       actions.push([steps]);
//     } else {
//       const steps = numberBetween(1, maxPosition + 1);
//       actions.push([steps]);
//     }

//     commands.push(option);
//   }


// //   // logOutList('"' + s + '",')
//   logOutList(printRow([commands, actions]) + ',')
// //   // logOutList(printRow(nums) + ',');
// //   // logOutList(n);
// //   // logOutList(printRow(actions) + '],')
// }

const tests = [
  [
    ["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"],
    [["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
  ],
  [
    ["BrowserHistory","visit","back","visit","visit","forward","visit","visit","visit","visit","back","visit","back","visit","back","back","back","forward","forward","visit","visit","visit","visit","visit","visit","forward","visit","back","visit","forward","forward","forward","back"],
    [["google.com"],["amazon.com"],[1],["facebook.com"],["twitter.com"],[3],["amazon.com"],["google.com"],["gmail.com"],["gmail.com"],[2],["reddit.com"],[5],["facebook.com"],[9],[1],[7],[6],[1],["gmail.com"],["facebook.com"],["amazon.com"],["google.com"],["google.com"],["yahoo.com"],[3],["youtube.com"],[15],["twitter.com"],[11],[16],[18],[1]],
  ],
  [
    ["BrowserHistory","visit","back","visit","back","visit","visit","visit","visit","visit","forward","forward","back","back","back","back"],
    [["google.com"],["leetcode.com"],[1],["yahoo.com"],[4],["facebook.com"],["docs.google.com"],["amazon.com"],["yahoo.com"],["twitter.com"],[1],[7],[7],[6],[7],[8]],
  ],
  [
    ["BrowserHistory","back","visit","back","back","forward","back","visit","forward","back","forward","forward","visit","visit","back","back","visit","back","back","visit","visit","forward","visit","back","visit","forward","forward","visit","visit","visit","visit","visit","back","back","forward","visit","visit","visit","visit","back","forward","visit","visit","visit","back","visit","visit","visit","back","visit","visit"],
    [["google.com"],[1],["amazon.com"],[3],[3],[3],[2],["reddit.com"],[3],[2],[4],[4],["yahoo.com"],["amazon.com"],[2],[6],["facebook.com"],[4],[2],["google.com"],["docs.google.com"],[5],["yahoo.com"],[4],["reddit.com"],[10],[2],["google.com"],["youtube.com"],["docs.google.com"],["reddit.com"],["reddit.com"],[11],[4],[8],["google.com"],["reddit.com"],["reddit.com"],["yahoo.com"],[18],[11],["reddit.com"],["yahoo.com"],["amazon.com"],[21],["reddit.com"],["gmail.com"],["youtube.com"],[25],["youtube.com"],["youtube.com"]],
  ],
  [
    ["BrowserHistory","back","visit","forward","forward","visit","visit","forward","visit","visit","visit","back","forward","forward","back","forward","forward","back","visit","visit","back","back","forward","visit","back","visit","visit","forward","visit","visit","visit","visit","forward","visit","visit","forward","forward","visit","visit","forward","forward","forward","back","visit","visit","back","visit","visit","visit"],
    [["google.com"],[1],["twitter.com"],[1],[2],["amazon.com"],["gmail.com"],[1],["reddit.com"],["leetcode.com"],["leetcode.com"],[1],[1],[1],[6],[2],[6],[5],["leetcode.com"],["yahoo.com"],[3],[5],[9],["facebook.com"],[8],["leetcode.com"],["leetcode.com"],[2],["yahoo.com"],["youtube.com"],["twitter.com"],["reddit.com"],[16],["gmail.com"],["yahoo.com"],[7],[15],["twitter.com"],["amazon.com"],[6],[19],[7],[14],["facebook.com"],["reddit.com"],[8],["yahoo.com"],["leetcode.com"],["facebook.com"]],
  ],
  [
    ["BrowserHistory","back"],
    [["google.com"],[2]],
  ],
  [
    ["BrowserHistory","back","back","back","forward","visit","visit","visit","forward","back","visit","back","back","forward","back","visit","back","back","visit","visit","back","forward","visit","back","back","forward","back","visit","visit","visit","visit","visit","back","visit","back","visit","forward","visit","forward","back","visit","visit","visit","visit","back","forward","forward","back"],
    [["google.com"],[2],[2],[1],[2],["yahoo.com"],["amazon.com"],["amazon.com"],[3],[1],["reddit.com"],[5],[6],[1],[5],["leetcode.com"],[4],[4],["reddit.com"],["gmail.com"],[3],[7],["leetcode.com"],[9],[9],[10],[9],["google.com"],["google.com"],["yahoo.com"],["amazon.com"],["leetcode.com"],[13],["docs.google.com"],[12],["docs.google.com"],[6],["facebook.com"],[13],[17],["leetcode.com"],["google.com"],["twitter.com"],["facebook.com"],[13],[14],[4],[20]],
  ],
  [
    ["BrowserHistory","visit","visit","forward","forward","visit","visit","back","visit","visit","forward","forward","visit","back","forward","visit","back","visit","forward","visit","visit","back","visit","forward","visit","visit","back","visit","forward","forward","back","visit","visit","back","visit","visit","visit","forward","visit","forward","visit","forward","forward","visit","forward","back","back","visit"],
    [["google.com"],["leetcode.com"],["twitter.com"],[1],[3],["youtube.com"],["gmail.com"],[6],["docs.google.com"],["amazon.com"],[4],[6],["google.com"],[8],[1],["docs.google.com"],[10],["google.com"],[2],["google.com"],["twitter.com"],[13],["docs.google.com"],[6],["yahoo.com"],["amazon.com"],[5],["reddit.com"],[7],[1],[14],["amazon.com"],["reddit.com"],[15],["yahoo.com"],["youtube.com"],["facebook.com"],[21],["twitter.com"],[11],["youtube.com"],[24],[10],["reddit.com"],[9],[14],[3],["amazon.com"]],
  ],
  [
    ["BrowserHistory","visit","back","forward","back","visit","visit","back","visit","back","back","visit","visit","visit","forward","visit","visit","visit","forward","back","visit","visit","forward","visit","visit","forward","back","visit","back"],
    [["google.com"],["reddit.com"],[2],[1],[1],["amazon.com"],["yahoo.com"],[1],["gmail.com"],[6],[6],["youtube.com"],["facebook.com"],["youtube.com"],[3],["leetcode.com"],["youtube.com"],["google.com"],[6],[1],["yahoo.com"],["reddit.com"],[5],["docs.google.com"],["leetcode.com"],[11],[6],["facebook.com"],[3]],
  ],
  [
    ["BrowserHistory","forward","back","visit","visit","forward","visit","visit","visit","visit","forward","back","visit","visit","back","visit","visit","visit","back","forward","back","visit","visit","forward","forward","forward","back","forward","visit","back","back","forward","visit","visit","visit","back","visit","visit","forward","visit"],
    [["google.com"],[1],[2],["leetcode.com"],["twitter.com"],[3],["yahoo.com"],["gmail.com"],["amazon.com"],["amazon.com"],[4],[4],["gmail.com"],["amazon.com"],[10],["yahoo.com"],["yahoo.com"],["gmail.com"],[3],[13],[13],["amazon.com"],["leetcode.com"],[12],[12],[6],[11],[3],["gmail.com"],[14],[13],[12],["amazon.com"],["docs.google.com"],["youtube.com"],[16],["leetcode.com"],["yahoo.com"],[6],["leetcode.com"]],
  ],
  [
    ["BrowserHistory","visit","visit","back","visit","visit","forward","visit","forward","forward","forward","visit","visit","forward","visit","visit","forward","visit"],
    [["google.com"],["twitter.com"],["amazon.com"],[4],["yahoo.com"],["google.com"],[3],["amazon.com"],[3],[6],[7],["facebook.com"],["gmail.com"],[6],["reddit.com"],["amazon.com"],[5],["gmail.com"]],
  ],
  [
    ["BrowserHistory","visit","visit","visit","forward","visit","back"],
    [["google.com"],["facebook.com"],["reddit.com"],["facebook.com"],[5],["leetcode.com"],[3]],
  ],
  [
    ["BrowserHistory","visit","back","back","back","visit","forward","visit","back","visit","visit","visit"],
    [["google.com"],["facebook.com"],[1],[3],[3],["amazon.com"],[1],["yahoo.com"],[2],["leetcode.com"],["youtube.com"],["docs.google.com"]],
  ],
  [
    ["BrowserHistory","visit","back","visit","visit","visit","visit","visit","forward","visit","visit","forward","back","visit","forward","visit","forward","visit","visit","visit","visit","visit","visit","back","forward","back","back","back","forward","visit","forward","forward","visit","back","back","visit","back","forward","visit","visit","visit","back","forward"],
    [["google.com"],["twitter.com"],[1],["google.com"],["facebook.com"],["facebook.com"],["youtube.com"],["youtube.com"],[2],["leetcode.com"],["yahoo.com"],[9],[7],["leetcode.com"],[1],["amazon.com"],[5],["gmail.com"],["facebook.com"],["leetcode.com"],["amazon.com"],["leetcode.com"],["gmail.com"],[17],[17],[18],[16],[6],[12],["facebook.com"],[1],[3],["yahoo.com"],[10],[3],["amazon.com"],[17],[18],["docs.google.com"],["gmail.com"],["google.com"],[1],[15]],
  ],
  [
    ["BrowserHistory","forward","visit","visit","visit","back","visit","visit","forward","forward","visit","forward","visit","visit","visit","back","visit","back","visit","back","visit","forward","visit","back","back","back","back","visit","back","visit","forward","back","forward","visit","visit","back","forward"],
    [["google.com"],[1],["google.com"],["twitter.com"],["twitter.com"],[3],["yahoo.com"],["amazon.com"],[6],[4],["leetcode.com"],[8],["amazon.com"],["youtube.com"],["facebook.com"],[9],["leetcode.com"],[5],["amazon.com"],[13],["twitter.com"],[4],["google.com"],[9],[4],[8],[2],["google.com"],[7],["docs.google.com"],[4],[3],[9],["google.com"],["reddit.com"],[15],[17]],
  ],
  [
    ["BrowserHistory","back","visit","visit","visit","visit","back","forward","back","back","visit","forward","visit","forward","back","back","visit","forward","back","visit","visit","visit","back","back","visit","back","visit","visit","forward","back"],
    [["google.com"],[1],["docs.google.com"],["twitter.com"],["amazon.com"],["amazon.com"],[4],[2],[5],[2],["gmail.com"],[2],["reddit.com"],[2],[1],[6],["youtube.com"],[1],[1],["docs.google.com"],["twitter.com"],["facebook.com"],[3],[2],["youtube.com"],[9],["gmail.com"],["youtube.com"],[3],[3]],
  ],
  [
    ["BrowserHistory","visit","forward","visit","visit","forward","back","forward","forward","back","back","visit","forward","forward","back","back"],
    [["google.com"],["reddit.com"],[2],["leetcode.com"],["google.com"],[1],[5],[1],[3],[1],[3],["leetcode.com"],[4],[5],[5],[5]],
  ],
  [
    ["BrowserHistory","visit","visit","visit"],
    [["google.com"],["google.com"],["docs.google.com"],["youtube.com"]],
  ],
  [
    ["BrowserHistory","forward","visit","visit","visit","visit","visit","visit","visit","visit","forward","back","visit","forward","visit","visit","forward","back","visit","back","back","visit","visit","visit","visit","back","visit","visit","back","forward","back","visit","visit","visit","visit","visit","forward","back","back","visit","forward","visit","back","visit","forward"],
    [["google.com"],[2],["leetcode.com"],["amazon.com"],["amazon.com"],["facebook.com"],["yahoo.com"],["leetcode.com"],["docs.google.com"],["twitter.com"],[6],[4],["amazon.com"],[2],["yahoo.com"],["leetcode.com"],[3],[4],["leetcode.com"],[3],[10],["twitter.com"],["reddit.com"],["google.com"],["facebook.com"],[9],["amazon.com"],["docs.google.com"],[16],[16],[5],["gmail.com"],["docs.google.com"],["google.com"],["youtube.com"],["gmail.com"],[2],[21],[3],["amazon.com"],[13],["amazon.com"],[5],["reddit.com"],[1]],
  ],
  [
    ["BrowserHistory","forward","back","forward","forward","visit","visit","forward","visit","visit","visit","forward","visit","forward","visit","visit","back","visit","visit","forward","visit","back","back","visit","visit","back","back","visit","visit","visit","visit","visit","forward","visit","visit","visit","back","visit","forward","forward","visit","visit","visit","back","back","visit","forward","visit","visit","visit","visit"],
    [["google.com"],[1],[2],[2],[2],["yahoo.com"],["yahoo.com"],[4],["docs.google.com"],["yahoo.com"],["amazon.com"],[4],["youtube.com"],[2],["google.com"],["youtube.com"],[6],["reddit.com"],["leetcode.com"],[1],["gmail.com"],[9],[13],["youtube.com"],["reddit.com"],[14],[9],["leetcode.com"],["twitter.com"],["leetcode.com"],["google.com"],["twitter.com"],[10],["amazon.com"],["youtube.com"],["facebook.com"],[11],["twitter.com"],[4],[11],["amazon.com"],["gmail.com"],["facebook.com"],[24],[6],["amazon.com"],[19],["twitter.com"],["docs.google.com"],["gmail.com"],["leetcode.com"]],
  ],
  [
    ["BrowserHistory","visit","forward","forward","visit","visit","visit","forward","visit","visit","visit","visit","visit","back","visit","visit","back","visit"],
    [["google.com"],["twitter.com"],[2],[2],["leetcode.com"],["amazon.com"],["yahoo.com"],[3],["reddit.com"],["google.com"],["docs.google.com"],["docs.google.com"],["google.com"],[7],["twitter.com"],["gmail.com"],[1],["docs.google.com"]],
  ],
  [
    ["BrowserHistory","forward","visit","visit","visit","visit"],
    [["google.com"],[2],["twitter.com"],["gmail.com"],["docs.google.com"],["gmail.com"]],
  ],
  [
    ["BrowserHistory","visit","forward"],
    [["google.com"],["amazon.com"],[1]],
  ],
  [
    ["BrowserHistory","forward","visit","forward","back","forward","back","visit","back","visit","forward","visit","back","forward","visit","visit","back","visit","forward","visit","visit","back","forward","forward","visit","back","forward","visit","visit","visit","visit","visit","back","back","back"],
    [["google.com"],[1],["docs.google.com"],[1],[3],[1],[3],["yahoo.com"],[4],["twitter.com"],[1],["twitter.com"],[1],[2],["gmail.com"],["amazon.com"],[7],["docs.google.com"],[2],["twitter.com"],["facebook.com"],[6],[1],[8],["facebook.com"],[10],[3],["yahoo.com"],["facebook.com"],["leetcode.com"],["facebook.com"],["yahoo.com"],[6],[15],[11]],
  ],
  [
    ["BrowserHistory","forward","forward","back","forward","forward","visit","back","back","forward","visit","visit","visit","visit","visit","back","visit","forward","forward","visit","visit","forward","visit","back","visit","visit"],
    [["google.com"],[2],[1],[2],[2],[2],["youtube.com"],[3],[3],[1],["gmail.com"],["reddit.com"],["docs.google.com"],["docs.google.com"],["gmail.com"],[4],["leetcode.com"],[6],[3],["gmail.com"],["youtube.com"],[11],["amazon.com"],[10],["google.com"],["twitter.com"]],
  ],
  [
    ["BrowserHistory","visit","back","visit","forward","visit","visit","forward","visit","visit","forward"],
    [["google.com"],["docs.google.com"],[3],["leetcode.com"],[3],["facebook.com"],["amazon.com"],[5],["twitter.com"],["twitter.com"],[3]],
  ],
];

let i = 0;
for (let test of tests) {
  const browserHistory = new BrowserHistory(...test[1][0]);
  console.time(i);
  for(let i = 1; i < test[0].length; i += 1) {
    logOutList(browserHistory[test[0][i]](...test[1][i]));
  }
  console.timeEnd(i);
  i += 1;
}

/*
["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]
[["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
["BrowserHistory","visit","back","visit","visit","forward","visit","visit","visit","visit","back","visit","back","visit","back","back","back","forward","forward","visit","visit","visit","visit","visit","visit","forward","visit","back","visit","forward","forward","forward","back"]
[["google.com"],["amazon.com"],[1],["facebook.com"],["twitter.com"],[3],["amazon.com"],["google.com"],["gmail.com"],["gmail.com"],[2],["reddit.com"],[5],["facebook.com"],[9],[1],[7],[6],[1],["gmail.com"],["facebook.com"],["amazon.com"],["google.com"],["google.com"],["yahoo.com"],[3],["youtube.com"],[15],["twitter.com"],[11],[16],[18],[1]]
["BrowserHistory","visit","back","visit","back","visit","visit","visit","visit","visit","forward","forward","back","back","back","back"]
[["google.com"],["leetcode.com"],[1],["yahoo.com"],[4],["facebook.com"],["docs.google.com"],["amazon.com"],["yahoo.com"],["twitter.com"],[1],[7],[7],[6],[7],[8]]
["BrowserHistory","back","visit","back","back","forward","back","visit","forward","back","forward","forward","visit","visit","back","back","visit","back","back","visit","visit","forward","visit","back","visit","forward","forward","visit","visit","visit","visit","visit","back","back","forward","visit","visit","visit","visit","back","forward","visit","visit","visit","back","visit","visit","visit","back","visit","visit"]
[["google.com"],[1],["amazon.com"],[3],[3],[3],[2],["reddit.com"],[3],[2],[4],[4],["yahoo.com"],["amazon.com"],[2],[6],["facebook.com"],[4],[2],["google.com"],["docs.google.com"],[5],["yahoo.com"],[4],["reddit.com"],[10],[2],["google.com"],["youtube.com"],["docs.google.com"],["reddit.com"],["reddit.com"],[11],[4],[8],["google.com"],["reddit.com"],["reddit.com"],["yahoo.com"],[18],[11],["reddit.com"],["yahoo.com"],["amazon.com"],[21],["reddit.com"],["gmail.com"],["youtube.com"],[25],["youtube.com"],["youtube.com"]]
["BrowserHistory","back","visit","forward","forward","visit","visit","forward","visit","visit","visit","back","forward","forward","back","forward","forward","back","visit","visit","back","back","forward","visit","back","visit","visit","forward","visit","visit","visit","visit","forward","visit","visit","forward","forward","visit","visit","forward","forward","forward","back","visit","visit","back","visit","visit","visit"]
[["google.com"],[1],["twitter.com"],[1],[2],["amazon.com"],["gmail.com"],[1],["reddit.com"],["leetcode.com"],["leetcode.com"],[1],[1],[1],[6],[2],[6],[5],["leetcode.com"],["yahoo.com"],[3],[5],[9],["facebook.com"],[8],["leetcode.com"],["leetcode.com"],[2],["yahoo.com"],["youtube.com"],["twitter.com"],["reddit.com"],[16],["gmail.com"],["yahoo.com"],[7],[15],["twitter.com"],["amazon.com"],[6],[19],[7],[14],["facebook.com"],["reddit.com"],[8],["yahoo.com"],["leetcode.com"],["facebook.com"]]
["BrowserHistory","back"]
[["google.com"],[2]]
["BrowserHistory","back","back","back","forward","visit","visit","visit","forward","back","visit","back","back","forward","back","visit","back","back","visit","visit","back","forward","visit","back","back","forward","back","visit","visit","visit","visit","visit","back","visit","back","visit","forward","visit","forward","back","visit","visit","visit","visit","back","forward","forward","back"]
[["google.com"],[2],[2],[1],[2],["yahoo.com"],["amazon.com"],["amazon.com"],[3],[1],["reddit.com"],[5],[6],[1],[5],["leetcode.com"],[4],[4],["reddit.com"],["gmail.com"],[3],[7],["leetcode.com"],[9],[9],[10],[9],["google.com"],["google.com"],["yahoo.com"],["amazon.com"],["leetcode.com"],[13],["docs.google.com"],[12],["docs.google.com"],[6],["facebook.com"],[13],[17],["leetcode.com"],["google.com"],["twitter.com"],["facebook.com"],[13],[14],[4],[20]]
["BrowserHistory","visit","visit","forward","forward","visit","visit","back","visit","visit","forward","forward","visit","back","forward","visit","back","visit","forward","visit","visit","back","visit","forward","visit","visit","back","visit","forward","forward","back","visit","visit","back","visit","visit","visit","forward","visit","forward","visit","forward","forward","visit","forward","back","back","visit"]
[["google.com"],["leetcode.com"],["twitter.com"],[1],[3],["youtube.com"],["gmail.com"],[6],["docs.google.com"],["amazon.com"],[4],[6],["google.com"],[8],[1],["docs.google.com"],[10],["google.com"],[2],["google.com"],["twitter.com"],[13],["docs.google.com"],[6],["yahoo.com"],["amazon.com"],[5],["reddit.com"],[7],[1],[14],["amazon.com"],["reddit.com"],[15],["yahoo.com"],["youtube.com"],["facebook.com"],[21],["twitter.com"],[11],["youtube.com"],[24],[10],["reddit.com"],[9],[14],[3],["amazon.com"]]
["BrowserHistory","visit","back","forward","back","visit","visit","back","visit","back","back","visit","visit","visit","forward","visit","visit","visit","forward","back","visit","visit","forward","visit","visit","forward","back","visit","back"]
[["google.com"],["reddit.com"],[2],[1],[1],["amazon.com"],["yahoo.com"],[1],["gmail.com"],[6],[6],["youtube.com"],["facebook.com"],["youtube.com"],[3],["leetcode.com"],["youtube.com"],["google.com"],[6],[1],["yahoo.com"],["reddit.com"],[5],["docs.google.com"],["leetcode.com"],[11],[6],["facebook.com"],[3]]
["BrowserHistory","forward","back","visit","visit","forward","visit","visit","visit","visit","forward","back","visit","visit","back","visit","visit","visit","back","forward","back","visit","visit","forward","forward","forward","back","forward","visit","back","back","forward","visit","visit","visit","back","visit","visit","forward","visit"]
[["google.com"],[1],[2],["leetcode.com"],["twitter.com"],[3],["yahoo.com"],["gmail.com"],["amazon.com"],["amazon.com"],[4],[4],["gmail.com"],["amazon.com"],[10],["yahoo.com"],["yahoo.com"],["gmail.com"],[3],[13],[13],["amazon.com"],["leetcode.com"],[12],[12],[6],[11],[3],["gmail.com"],[14],[13],[12],["amazon.com"],["docs.google.com"],["youtube.com"],[16],["leetcode.com"],["yahoo.com"],[6],["leetcode.com"]]
["BrowserHistory","visit","visit","back","visit","visit","forward","visit","forward","forward","forward","visit","visit","forward","visit","visit","forward","visit"]
[["google.com"],["twitter.com"],["amazon.com"],[4],["yahoo.com"],["google.com"],[3],["amazon.com"],[3],[6],[7],["facebook.com"],["gmail.com"],[6],["reddit.com"],["amazon.com"],[5],["gmail.com"]]
["BrowserHistory","visit","visit","visit","forward","visit","back"]
[["google.com"],["facebook.com"],["reddit.com"],["facebook.com"],[5],["leetcode.com"],[3]]
["BrowserHistory","visit","back","back","back","visit","forward","visit","back","visit","visit","visit"]
[["google.com"],["facebook.com"],[1],[3],[3],["amazon.com"],[1],["yahoo.com"],[2],["leetcode.com"],["youtube.com"],["docs.google.com"]]
["BrowserHistory","visit","back","visit","visit","visit","visit","visit","forward","visit","visit","forward","back","visit","forward","visit","forward","visit","visit","visit","visit","visit","visit","back","forward","back","back","back","forward","visit","forward","forward","visit","back","back","visit","back","forward","visit","visit","visit","back","forward"]
[["google.com"],["twitter.com"],[1],["google.com"],["facebook.com"],["facebook.com"],["youtube.com"],["youtube.com"],[2],["leetcode.com"],["yahoo.com"],[9],[7],["leetcode.com"],[1],["amazon.com"],[5],["gmail.com"],["facebook.com"],["leetcode.com"],["amazon.com"],["leetcode.com"],["gmail.com"],[17],[17],[18],[16],[6],[12],["facebook.com"],[1],[3],["yahoo.com"],[10],[3],["amazon.com"],[17],[18],["docs.google.com"],["gmail.com"],["google.com"],[1],[15]]
["BrowserHistory","forward","visit","visit","visit","back","visit","visit","forward","forward","visit","forward","visit","visit","visit","back","visit","back","visit","back","visit","forward","visit","back","back","back","back","visit","back","visit","forward","back","forward","visit","visit","back","forward"]
[["google.com"],[1],["google.com"],["twitter.com"],["twitter.com"],[3],["yahoo.com"],["amazon.com"],[6],[4],["leetcode.com"],[8],["amazon.com"],["youtube.com"],["facebook.com"],[9],["leetcode.com"],[5],["amazon.com"],[13],["twitter.com"],[4],["google.com"],[9],[4],[8],[2],["google.com"],[7],["docs.google.com"],[4],[3],[9],["google.com"],["reddit.com"],[15],[17]]
["BrowserHistory","back","visit","visit","visit","visit","back","forward","back","back","visit","forward","visit","forward","back","back","visit","forward","back","visit","visit","visit","back","back","visit","back","visit","visit","forward","back"]
[["google.com"],[1],["docs.google.com"],["twitter.com"],["amazon.com"],["amazon.com"],[4],[2],[5],[2],["gmail.com"],[2],["reddit.com"],[2],[1],[6],["youtube.com"],[1],[1],["docs.google.com"],["twitter.com"],["facebook.com"],[3],[2],["youtube.com"],[9],["gmail.com"],["youtube.com"],[3],[3]]
["BrowserHistory","visit","forward","visit","visit","forward","back","forward","forward","back","back","visit","forward","forward","back","back"]
[["google.com"],["reddit.com"],[2],["leetcode.com"],["google.com"],[1],[5],[1],[3],[1],[3],["leetcode.com"],[4],[5],[5],[5]]
["BrowserHistory","visit","visit","visit"]
[["google.com"],["google.com"],["docs.google.com"],["youtube.com"]]
["BrowserHistory","forward","visit","visit","visit","visit","visit","visit","visit","visit","forward","back","visit","forward","visit","visit","forward","back","visit","back","back","visit","visit","visit","visit","back","visit","visit","back","forward","back","visit","visit","visit","visit","visit","forward","back","back","visit","forward","visit","back","visit","forward"]
[["google.com"],[2],["leetcode.com"],["amazon.com"],["amazon.com"],["facebook.com"],["yahoo.com"],["leetcode.com"],["docs.google.com"],["twitter.com"],[6],[4],["amazon.com"],[2],["yahoo.com"],["leetcode.com"],[3],[4],["leetcode.com"],[3],[10],["twitter.com"],["reddit.com"],["google.com"],["facebook.com"],[9],["amazon.com"],["docs.google.com"],[16],[16],[5],["gmail.com"],["docs.google.com"],["google.com"],["youtube.com"],["gmail.com"],[2],[21],[3],["amazon.com"],[13],["amazon.com"],[5],["reddit.com"],[1]]
["BrowserHistory","forward","back","forward","forward","visit","visit","forward","visit","visit","visit","forward","visit","forward","visit","visit","back","visit","visit","forward","visit","back","back","visit","visit","back","back","visit","visit","visit","visit","visit","forward","visit","visit","visit","back","visit","forward","forward","visit","visit","visit","back","back","visit","forward","visit","visit","visit","visit"]
[["google.com"],[1],[2],[2],[2],["yahoo.com"],["yahoo.com"],[4],["docs.google.com"],["yahoo.com"],["amazon.com"],[4],["youtube.com"],[2],["google.com"],["youtube.com"],[6],["reddit.com"],["leetcode.com"],[1],["gmail.com"],[9],[13],["youtube.com"],["reddit.com"],[14],[9],["leetcode.com"],["twitter.com"],["leetcode.com"],["google.com"],["twitter.com"],[10],["amazon.com"],["youtube.com"],["facebook.com"],[11],["twitter.com"],[4],[11],["amazon.com"],["gmail.com"],["facebook.com"],[24],[6],["amazon.com"],[19],["twitter.com"],["docs.google.com"],["gmail.com"],["leetcode.com"]]
["BrowserHistory","visit","forward","forward","visit","visit","visit","forward","visit","visit","visit","visit","visit","back","visit","visit","back","visit"]
[["google.com"],["twitter.com"],[2],[2],["leetcode.com"],["amazon.com"],["yahoo.com"],[3],["reddit.com"],["google.com"],["docs.google.com"],["docs.google.com"],["google.com"],[7],["twitter.com"],["gmail.com"],[1],["docs.google.com"]]
["BrowserHistory","forward","visit","visit","visit","visit"]
[["google.com"],[2],["twitter.com"],["gmail.com"],["docs.google.com"],["gmail.com"]]
["BrowserHistory","visit","forward"]
[["google.com"],["amazon.com"],[1]]
["BrowserHistory","forward","visit","forward","back","forward","back","visit","back","visit","forward","visit","back","forward","visit","visit","back","visit","forward","visit","visit","back","forward","forward","visit","back","forward","visit","visit","visit","visit","visit","back","back","back"]
[["google.com"],[1],["docs.google.com"],[1],[3],[1],[3],["yahoo.com"],[4],["twitter.com"],[1],["twitter.com"],[1],[2],["gmail.com"],["amazon.com"],[7],["docs.google.com"],[2],["twitter.com"],["facebook.com"],[6],[1],[8],["facebook.com"],[10],[3],["yahoo.com"],["facebook.com"],["leetcode.com"],["facebook.com"],["yahoo.com"],[6],[15],[11]]
["BrowserHistory","forward","forward","back","forward","forward","visit","back","back","forward","visit","visit","visit","visit","visit","back","visit","forward","forward","visit","visit","forward","visit","back","visit","visit"]
[["google.com"],[2],[1],[2],[2],[2],["youtube.com"],[3],[3],[1],["gmail.com"],["reddit.com"],["docs.google.com"],["docs.google.com"],["gmail.com"],[4],["leetcode.com"],[6],[3],["gmail.com"],["youtube.com"],[11],["amazon.com"],[10],["google.com"],["twitter.com"]]
["BrowserHistory","visit","back","visit","forward","visit","visit","forward","visit","visit","forward"]
[["google.com"],["docs.google.com"],[3],["leetcode.com"],[3],["facebook.com"],["amazon.com"],[5],["twitter.com"],["twitter.com"],[3]]
*/