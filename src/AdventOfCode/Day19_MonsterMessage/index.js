const fs = require('fs');




// count number of messages that match rule 0
const mapRules = (rules) => {
  const rulesets = new Array(rules.length).fill(null).map(() => []);
  rules.forEach((rule) => {
    const [ruleNum, matches] = rule.split(': ');
    const matchOptions = matches.split(' | ');
    const matchedRules = matchOptions
      .map((option) => {
        if (option.includes('a') || option.includes('b')) return option[1];
        return option.split(' ').map((val) => +val);
      });
    rulesets[ruleNum] = matchedRules;
  });

  return rulesets;
}

const mergeMessages = (set1, set2, messageList) => {
  let output = [];

  if (!set2.length) output = set1;
  if (!set1.length) output = set2;

  for (let msg1 of set1) {
    for (let msg2 of set2) {
      output.push(msg1 + msg2);
    }
  }

  return output.filter((msg) => messageList.some((m) => m.includes(msg)));
}

const countValidMessages = (rules, messages) => {
  const numRules = rules.length;
  const rulesets = mapRules(rules);

  const validMessages = new Array(numRules).fill(null).map(() => [])
  validMessages[41] = rulesets[41];
  validMessages[48] = rulesets[48];

  const getValidMessages = (rule) => {
    if (validMessages[rule].length) return validMessages[rule]

    const messageOptions = []
    for (let ruleset of rulesets[rule]) {
      let rulesetMessages;
      for (let subrule of ruleset) {
        const ruleMessages = getValidMessages(subrule);
        if (rulesetMessages) {
          rulesetMessages = mergeMessages(rulesetMessages, ruleMessages, messages);
        } else rulesetMessages = ruleMessages;
      }
      messageOptions.push(...rulesetMessages);
    }
    validMessages[rule] = messageOptions;
    if (rule === 11) debugger;
    return validMessages[rule];
  }

  getValidMessages(0);
  let validMessageCount = 0;
  const rule0Messages = new Set(validMessages[0]);
  for (let message of messages) {
    if (rule0Messages.has(message)) validMessageCount += 1;
  }
  return validMessageCount;
}




const countValidWithLoops = (rules, messages) => {
  const numRules = rules.length;
  const rulesets = mapRules(rules);

  const validMessages = new Array(numRules).fill(null);
  validMessages[41] = rulesets[41];
  validMessages[48] = rulesets[48];

  const getValidMessages = (rule) => {
    if (validMessages[rule]) return validMessages[rule]

    const messageOptions = []
    for (let ruleset of rulesets[rule]) {
      let rulesetMessages = [];
      for (let subrule of ruleset) {
        rulesetMessages = mergeMessages(
          rulesetMessages,
          getValidMessages(subrule),
          messages
        );
      }
      messageOptions.push(...rulesetMessages);
    }
    validMessages[rule] = messageOptions;
    return validMessages[rule];
  }

  getValidMessages(42);
  getValidMessages(31);

  const valid42 = validMessages[42];
  const valid31 = validMessages[31];

  const checkIfMatches = (msg, rem31, idx) => {
    if (idx === 0) return true;

    const currentSlice = msg.slice(idx - 8, idx);
    if (rem31 && valid31.some((m) => m === currentSlice)) {
      return checkIfMatches(msg, rem31 - 1, idx - 8);
    } else if (valid42.some((m) => m === currentSlice)) {
      return checkIfMatches(msg, 0, idx - 8);
    }

    return false;
  }

  return messages.reduce((count, msg) => {
    const max31 = Math.floor((msg.length - 8) / 16);
    return count + checkIfMatches(msg, max31, msg.length);
  }, 0)
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const [rules, messages] = data.split('\r\n\r\n');
  const ruleList = rules.split('\r\n');
  const messageList = messages.split('\r\n');
  // console.log(messageList);
  console.log(countValidWithLoops(ruleList, messageList));
});

/*

*/