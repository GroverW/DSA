var decodeString = function (s) {
  const oneCode = '1'.charCodeAt(0);

  const helper = (start) => {
    let currStr = '';
    let currRepeat = '';

    for (let i = start; i < s.length; i += 1) {
      if (s[i] === ']') {
        return [currStr, i];
      } else if (s[i] === '[') {
        const [subStr, nextIdx] = helper(i+1);

        for (let j = 0; j < +currRepeat; j += 1) currStr += subStr;

        currRepeat = '';
        i = nextIdx;
      } else if (s.charCodeAt(i) - oneCode < 9) {
        currRepeat += s[i];
      } else {
        currStr += s[i];
      }
    }

    return [currStr, s.length - 1];
  }

  const [resultStr] = helper(0);

  return resultStr;
};