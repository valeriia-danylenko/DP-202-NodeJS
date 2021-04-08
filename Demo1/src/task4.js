import { isNum } from './validator.js';

const failure = {
  status: 'failed'
}

function paramsValidation(args) {
  if (args.length != 1) {
    failure.reason = 'Function takes only 1 parameter';
    return false};
  args = args[0];
  if (!( typeof args === 'number' || typeof args === 'string'))  {
    failure.reason = 'Parameter must be a number or a string';
    return false};
  if (!isNum(Number(args))) {
        failure.reason = 'Parameter must be a valid number';
        return false};
    if (Number(args) % 1 !== 0)  {
    failure.reason = 'Parameter must not be a decimal number';
    return false};
  const len = args.toString().length;
  if (len < 2 || len > 20) {
    failure.reason = 'Parameter\'s length must be within range (2, 20)';
    return false};
  return true;
}

function isPalindrome(...args) {
  if (!paramsValidation(args)) return failure
  const polindromeArray = [];
  const stringNum = args[0].toString();
  for (let i = 0; i < stringNum.length; i++) {
    let notCenter = 0;
    const newPolindrome = [];
    if (stringNum[i] === stringNum[i + 1] || stringNum[i-1] === stringNum[i + 1]) {
      if (stringNum[i] === stringNum[i + 1]) {
        newPolindrome.push(stringNum[i], stringNum[i + 1]);
        notCenter = 1;
      } else {
        newPolindrome.push(stringNum[i]);
      }
      for (let j = 1; j <= i; j++) {
        if (stringNum[i-j] == stringNum[i + j + notCenter]) {
          newPolindrome.push(stringNum[i + j + notCenter]);
          newPolindrome.unshift(stringNum[i - j]);
        } else {
            break;
      }}
    polindromeArray.push(newPolindrome.join(''));
  }}
  const longestPolindrome = polindromeArray.reduce((acc, el)=> {
    el.length > acc.length ? acc = el : null;
    return acc;
  }, '0')
  return longestPolindrome
}

export const task4 = isPalindrome;
