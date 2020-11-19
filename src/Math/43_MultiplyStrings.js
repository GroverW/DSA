/*
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

 

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
*/

var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') return '0';

  const result = new Array(num1.length + num2.length).fill(0);

  for (let i = num1.length - 1; i >= 0; i -= 1) {
    const iDigits = num1.length - i;
    for (let j = num2.length - 1; j >= 0; j -= 1) {
      const jDigits = num2.length - j;
      const start = iDigits + jDigits - 2;

      let currProd = num1[i] * num2[j];
      let offset = 0;
      let carry = 0;

      while (currProd || carry) {
        const digit = currProd % 10;
        currProd = Math.floor(currProd / 10);
        const nextResult = result[start + offset] + digit + carry;
        carry = nextResult > 9;
        result[start + offset] = nextResult % 10;
        offset += 1;
      }
    }
  }
  while (!result[result.length - 1]) result.pop();
  return result.reverse().join('');
};