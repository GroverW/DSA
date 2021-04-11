/*
A sentence is a list of words that are separated by a single space with no leading or trailing spaces. For example, "Hello World", "HELLO", "hello world hello world" are all sentences. Words consist of only uppercase and lowercase English letters.

Two sentences sentence1 and sentence2 are similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. For example, sentence1 = "Hello my name is Jane" and sentence2 = "Hello Jane" can be made equal by inserting "my name is" between "Hello" and "Jane" in sentence2.

Given two sentences sentence1 and sentence2, return true if sentence1 and sentence2 are similar. Otherwise, return false.

 

Example 1:

Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
Output: true
Explanation: sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".
Example 2:

Input: sentence1 = "of", sentence2 = "A lot of words"
Output: false
Explanation: No single sentence can be inserted inside one of the sentences to make it equal to the other.
Example 3:

Input: sentence1 = "Eating right now", sentence2 = "Eating"
Output: true
Explanation: sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.
Example 4:

Input: sentence1 = "Luky", sentence2 = "Lucccky"
Output: false
 

Constraints:

1 <= sentence1.length, sentence2.length <= 100
sentence1 and sentence2 consist of lowercase and uppercase English letters and spaces.
The words in sentence1 and sentence2 are separated by a single space.
*/


// overly complicated
var areSentencesSimilar = function (sentence1, sentence2) {
  const words1 = sentence1.split(' ');
  const words2 = sentence2.split(' ');
  return (
    beginsWith(words1, words2)
    || endsWith(words1, words2)
    || sandwiches(words1, words2)
    || beginsWith(words2, words1)
    || endsWith(words2, words1)
    || sandwiches(words2, words1)
  )
};

const beginsWith = (w1, w2) => {
  return w2.every((word, idx) => w1[idx] === word)
}

const endsWith = (w1, w2) => {
  const w1End = w1.slice(w1.length - w2.length);
  return beginsWith(w1End, w2);
}

const sandwiches = (w1, w2) => {
  let left = 0;
  let right = 1;
  while (left <= w2.length - right) {
    if (w2[left] === w1[left]) {
      left += 1;
    } else if (w2[w2.length - right] === w1[w1.length - right]) {
      right += 1;
    } else {
      return false;
    }
  }
  return true;
}


// cleaner
var areSentencesSimilar = function(sentence1, sentence2) {
  const words1 = sentence1.split(' ');
  const words2 = sentence2.split(' ');
  const longer = words1.length > words2.length ? words1 : words2;
  const shorter = longer === words1 ? words2 : words1;
  
  return sandwiches(longer, shorter);
};

const sandwiches = (w1, w2) => {
  let left = 0;
  let right1 = w1.length - 1;
  let right2 = w2.length - 1;
  while (left <= right2) {
    if (w2[left] === w1[left]) {
      left += 1;
    } else if (w2[right2] === w1[right1]) {
      right1 -= 1;
      right2 -= 1;
    } else {
      return false;
    }
  }
  return true;
}


const tests: Indexable<any>[] = [
  [
    "My name is Haley",
    "My Haley",
  ],
  [
    "MY NAME IS HALEY",
    "my haley",
  ],
  [
    "of",
    "A lot of words",
  ],
  [
    "Eating right now",
    "Eating",
  ],
  [
    "Eating right now",
    "right now",
  ],
  [
    "right now",
    "Eating right now",
  ],
  [
    "right",
    "Eating right now",
  ],
  [
    "Eating",
    "Eating right now",
  ],
  [
    "Eating right now",
    "Eating right now",
  ],
  [
    "lucky",
    "luccky",
  ],
  [
    "a a a a b",
    "a a a",
  ],
  [
    "a a a a b",
    "a b",
  ],
  [
    "b a b a a b",
    "b a a b",
  ],
  [
    "b a b a a b",
    "a b a",
  ],
  [
    "eTUny i b S EZx JBJ xXz",
    "eTUny i b R EZx JBJ xXz",
  ],
  [
    "eTUny i b R UFKQJ EZx JBJ Q xXz",
    "eTUny i R EZx JBJ xXz",
  ],
];


let i: number = 0;
for (let test of tests) {
  const [sentence1, sentence2] = test;
  console.time(i.toString());
  // logOutLeetcode(test);
  logOutList(areSentencesSimilar(sentence1, sentence2));
  console.timeEnd(i.toString());
  i += 1;

}

/*
"My name is Haley"
"My Haley"
"MY NAME IS HALEY"
"my haley"
"of"
"A lot of words"
"Eating right now"
"Eating"
"Eating right now"
"right now"
"right now"
"Eating right now"
"right"
"Eating right now"
"Eating"
"Eating right now"
"Eating right now"
"Eating right now"
"lucky"
"luccky"
"a a a a b"
"a a a"
"a a a a b"
"a b"
"b a b a a b"
"b a a b"
"b a b a a b"
"a b a"
"eTUny i b S EZx JBJ xXz"
"eTUny i b R EZx JBJ xXz"
"eTUny i b R UFKQJ EZx JBJ Q xXz"
"eTUny i R EZx JBJ xXz"
*/