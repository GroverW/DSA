const fs = require('fs');

const countQuestionsAnswered = (groups) => {
  return groups.reduce((sum, group) => {
    return sum + group.reduce((uniqueCount, questions) => {
      questions.split('').forEach((question) => uniqueCount.add(question));
      return uniqueCount;
    }, new Set()).size;
  }, 0);
}
const countQuestionsAnswered2 = (groups) => {
  const aCode = 'a'.charCodeAt(0);
  return groups.reduce((sum, group) => {
    const numGroupMembers = group.length;
    return sum + group.reduce((answerFreq, questions) => {
      questions
        .split('')
        .forEach((question) => {
          const letterCode = question.charCodeAt(0) - aCode;
          answerFreq[letterCode] += 1;
        });
      return answerFreq;
    }, new Array(26).fill(0))
    .filter((count) => count === numGroupMembers).length;
  }, 0);
}

fs.readFile('./input.txt', 'utf8', (_, data) => {
  const groups = data.split('\n\n');
  const replies = groups.map((group) => group.split('\n'));
  // console.log(replies`);
  console.log(countQuestionsAnswered2(replies));
});