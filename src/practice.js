/*
    input
    message = 'takes this text!'
    rows = 4
    cols = 4

    maps text to array
    [
        ['t', 'a', 'k', 'e'],
        ['s', ' ', 't', 'h'],
        ['i', 's', ' ', 't'],
        ['e', 'x', 't', '!'],
    ]

    then reads text by column
    output = 'tsiea sx kt teht!
*/

const transcribe = (message, rows, cols) => {
  const matrix = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(''));
  let msgIdx = 0;

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      matrix[r][c] = message[msgIdx];
      msgIdx += 1;
    }
  }

  let transcribed = '';

  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      transcribed += matrix[r][c];
    }
  }

  return transcribed;
}

/*
  key = 'The quick onyx goblin jumps over the lazy dwarf.'
  take first occurrence of each letter as mapping for cipher
  cipher =  T H E Q U I C K O N Y X G B L J M P S V R A Z D W F
  maps to = A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
  message = 'Hey there buddy! This is a message I dont want anyone else to read..'

  output
  Kuw vkupu hrqqw! Vkos os t gusstcu O qlbv ztbv tbwlbu uxsu vl putq..
*/


const encipher = (message, key) => {
  const hasCharacter = new Set();
  const charIdx = 'A'.charCodeAt(0);
  const cipher = new Array(26).fill(null);
  let currCipherIdx = 0;

  for (let char of key) {
    const charUpper = char.toUpperCase();
    const charCode = charUpper.charCodeAt(0) - charIdx;

    if (
      !hasCharacter.has(charUpper)
      && (charCode >= 0 && charCode <= 25)
    ) {
      cipher[currCipherIdx] = charUpper;
      hasCharacter.add(charUpper);
      currCipherIdx += 1;
    }
  }

  let enciphered = '';
  for (let char of message) {
    const charUpper = char.toUpperCase();

    if (hasCharacter.has(charUpper)) {
      const charCase = charUpper === char ? 'upper' : 'lower';
      const cipherIdx = charUpper.charCodeAt(0) - charIdx;
      let encipheredChar = cipher[cipherIdx];
      encipheredChar = charCase === 'upper' ? encipheredChar : encipheredChar.toLowerCase();
      enciphered += encipheredChar;
    } else {
      enciphered += char;
    }
  }

  return enciphered;
}